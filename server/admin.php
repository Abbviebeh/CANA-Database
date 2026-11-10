<?php
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }
function reply(int $status, array $body): never { http_response_code($status); echo json_encode($body); exit; }
try {
    $pdo = new PDO('mysql:host='.(getenv('CANA_DB_HOST') ?: '127.0.0.1').';dbname='.(getenv('CANA_DB_NAME') ?: 'cana_db').';charset=utf8mb4', getenv('CANA_DB_USER') ?: 'root', getenv('CANA_DB_PASSWORD') ?: '', [PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE=>PDO::FETCH_ASSOC]);
} catch (Throwable $e) { reply(500, ['message'=>'Database connection failed.']); }
$action = $_GET['action'] ?? '';
$input = json_decode(file_get_contents('php://input') ?: '{}', true) ?: [];
if ($action === 'register' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = strtolower(trim((string)($input['email'] ?? ''))); $password = (string)($input['password'] ?? '');
    if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($password) < 12) reply(422, ['message'=>'Enter a valid email and a password with at least 12 characters.']);
    $lock = $pdo->query("SELECT GET_LOCK('cana_admin_bootstrap', 5)")->fetchColumn();
    if ((int)$lock !== 1) reply(503, ['message'=>'Could not start admin setup. Please try again.']);
    try {
        $count = (int)$pdo->query('SELECT COUNT(*) FROM admins')->fetchColumn();
        if ($count > 0) reply(403, ['message'=>'Admin sign-up is closed because an admin account already exists.']);
        $q=$pdo->prepare('INSERT INTO admins(email,password_hash) VALUES(?,?)'); $q->execute([$email,password_hash($password,PASSWORD_DEFAULT)]);
        $adminId=(int)$pdo->lastInsertId(); $token=bin2hex(random_bytes(32));
        $q=$pdo->prepare('INSERT INTO admin_sessions(token_hash,admin_id,expires_at) VALUES(?,?,DATE_ADD(NOW(), INTERVAL 12 HOUR))'); $q->execute([hash('sha256',$token),$adminId]);
        reply(201,['token'=>$token]);
    } catch (PDOException $error) {
        error_log($error->getMessage());
        reply(500,['message'=>'Could not create the admin account. Check that the latest database schema is imported.']);
    } finally { $pdo->query("SELECT RELEASE_LOCK('cana_admin_bootstrap')"); }
}
if ($action === 'login' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = strtolower(trim((string)($input['email'] ?? ''))); $password = (string)($input['password'] ?? '');
    $q=$pdo->prepare('SELECT id,password_hash FROM admins WHERE email=?'); $q->execute([$email]); $admin=$q->fetch();
    if (!$admin || !password_verify($password, $admin['password_hash'])) reply(401,['message'=>'Invalid admin email or password.']);
    $token=bin2hex(random_bytes(32)); $q=$pdo->prepare('INSERT INTO admin_sessions(token_hash,admin_id,expires_at) VALUES(?,?,DATE_ADD(NOW(), INTERVAL 12 HOUR))'); $q->execute([hash('sha256',$token),$admin['id']]);
    reply(200,['token'=>$token]);
}
$headers=function_exists('getallheaders') ? getallheaders() : [];
$authorization=$headers['Authorization'] ?? $headers['authorization'] ?? '';
if (!preg_match('/^Bearer\s+([a-f0-9]{64})$/i',$authorization,$matches)) reply(401,['message'=>'Admin sign-in required.']);
$q=$pdo->prepare('SELECT a.id FROM admin_sessions s JOIN admins a ON a.id=s.admin_id WHERE s.token_hash=? AND s.expires_at>NOW()'); $q->execute([hash('sha256',$matches[1])]);
if (!$q->fetch()) reply(401,['message'=>'Admin session expired. Please sign in again.']);
if ($action === 'dashboard' && $_SERVER['REQUEST_METHOD'] === 'GET') {
    $metrics=$pdo->query("SELECT COUNT(*) order_count, COALESCE(SUM(CASE WHEN status<>'cancelled' THEN total ELSE 0 END),0) revenue, COUNT(DISTINCT user_id) customers FROM orders")->fetch();
    $salesRows=$pdo->query("SELECT DATE(created_at) day, SUM(total) revenue, COUNT(*) orders FROM orders WHERE status<>'cancelled' AND created_at>=DATE_SUB(CURDATE(),INTERVAL 29 DAY) GROUP BY DATE(created_at) ORDER BY day")->fetchAll();
    $byDay=[]; foreach($salesRows as $row) $byDay[$row['day']]=$row;
    $sales=[]; for($offset=29;$offset>=0;$offset--) { $day=(new DateTimeImmutable('today'))->modify("-{$offset} days")->format('Y-m-d'); $sales[]=$byDay[$day] ?? ['day'=>$day,'revenue'=>0,'orders'=>0]; }
    $orders=$pdo->query('SELECT id,customer_name,total,status,created_at FROM orders ORDER BY created_at DESC LIMIT 100')->fetchAll();
    $inventory=$pdo->query('SELECT product_id id,name,category,price,stock,updated_at FROM inventory ORDER BY category,name')->fetchAll();
    reply(200,['metrics'=>$metrics,'sales'=>$sales,'orders'=>$orders,'inventory'=>$inventory]);
}
if ($action === 'stock' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $id=(int)($input['productId'] ?? 0); $stock=filter_var($input['stock'] ?? null,FILTER_VALIDATE_INT);
    if ($id<1 || $stock===false || $stock<0) reply(422,['message'=>'Enter a valid stock quantity.']);
    $q=$pdo->prepare('UPDATE inventory SET stock=? WHERE product_id=?'); $q->execute([$stock,$id]);
    if (!$q->rowCount()) { $q=$pdo->prepare('SELECT 1 FROM inventory WHERE product_id=?'); $q->execute([$id]); if (!$q->fetch()) reply(404,['message'=>'Product not found.']); }
    reply(200,['message'=>'Inventory updated.']);
}
if ($action === 'status' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $id=(int)($input['orderId'] ?? 0); $status=(string)($input['status'] ?? '');
    if (!in_array($status,['pending','preparing','to_ship','shipped','to_deliver','received','cancelled'],true)) reply(422,['message'=>'Invalid order status.']);
    $pdo->beginTransaction(); $q=$pdo->prepare('SELECT status FROM orders WHERE id=? FOR UPDATE'); $q->execute([$id]); $old=$q->fetch();
    if (!$old) { $pdo->rollBack(); reply(404,['message'=>'Order not found.']); }
    if ($old['status']==='cancelled' && $status!=='cancelled') { $pdo->rollBack(); reply(409,['message'=>'Cancelled orders cannot be reopened.']); }
    if ($old['status']!==$status) {
        if ($status==='cancelled') { $restore=$pdo->prepare('UPDATE inventory i JOIN order_items oi ON oi.product_id=i.product_id SET i.stock=i.stock+oi.quantity WHERE oi.order_id=?'); $restore->execute([$id]); }
        $q=$pdo->prepare('UPDATE orders SET status=? WHERE id=?'); $q->execute([$status,$id]);
    }
    $pdo->commit();
    reply(200,['message'=>'Order status updated.']);
}
reply(404,['message'=>'Unknown admin action.']);
