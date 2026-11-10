<?php
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
if ($_SERVER['REQUEST_METHOD']==='OPTIONS') { http_response_code(204); exit; }
function reply(int $status,array $body): never { http_response_code($status); echo json_encode($body); exit; }
if (!in_array($_SERVER['REQUEST_METHOD'],['GET','POST'],true)) reply(405,['message'=>'Use GET or POST.']);
try { $pdo=new PDO('mysql:host='.(getenv('CANA_DB_HOST')?:'127.0.0.1').';dbname='.(getenv('CANA_DB_NAME')?:'cana_db').';charset=utf8mb4',getenv('CANA_DB_USER')?:'root',getenv('CANA_DB_PASSWORD')?:'',[PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION,PDO::ATTR_DEFAULT_FETCH_MODE=>PDO::FETCH_ASSOC]); } catch(Throwable $e) { reply(500,['message'=>'Database connection failed.']); }
$isPost=$_SERVER['REQUEST_METHOD']==='POST';
$in=$isPost?(json_decode(file_get_contents('php://input')?:'',true) ?: []):[];
if($isPost && (!is_array($in)||!is_array($in['items']??null)||count($in['items'])<1)) reply(422,['message'=>'Order must contain products.']);
$userId=(int)($in['userId']??0); $name=trim((string)($in['customerName']??'')); if($isPost && ($userId<1||$name==='')) reply(422,['message'=>'Sign in before placing an order.']);
$headers=function_exists('getallheaders')?getallheaders():[]; $authorization=$headers['Authorization']??$headers['authorization']??'';
if(!preg_match('/^Bearer\s+([a-f0-9]{64})$/i',$authorization,$matches)) reply(401,['message'=>'Sign in before placing an order.']);
$auth=$pdo->prepare('SELECT user_id FROM auth_sessions WHERE token_hash=? AND expires_at>NOW()'); $auth->execute([hash('sha256',$matches[1])]); $session=$auth->fetch();
if(!$session || ($isPost && (int)$session['user_id']!==$userId)) reply(401,['message'=>'Your sign-in expired. Please sign in again.']);
if(!$isPost) { $q=$pdo->prepare('SELECT CAST(id AS CHAR) id,status,total,DATE_FORMAT(created_at,\'%Y-%m-%d\') date FROM orders WHERE user_id=? ORDER BY created_at DESC'); $q->execute([$session['user_id']]); reply(200,['orders'=>$q->fetchAll()]); }
try {
 $pdo->beginTransaction(); $subtotal=0.0; $lines=[];
 foreach($in['items'] as $item) {
  $pid=(int)($item['id']??0); $qty=(int)($item['quantity']??0); if($pid<1||$qty<1||$qty>99) throw new RuntimeException('Invalid product quantity.');
  $q=$pdo->prepare('SELECT name,price,stock FROM inventory WHERE product_id=? FOR UPDATE'); $q->execute([$pid]); $product=$q->fetch();
  if(!$product || $product['stock']<$qty) throw new RuntimeException(($product['name']??'A product').' has insufficient stock.');
  $subtotal+=(float)$product['price']*$qty; $lines[]=[$pid,$product['name'],$qty,$product['price']];
 }
 $total=round($subtotal+$subtotal*0.0875+($subtotal>50?0:9.99),2);
 $q=$pdo->prepare("INSERT INTO orders(user_id,customer_name,total,status) VALUES(?,?,?,'pending')"); $q->execute([$userId,$name,$total]); $orderId=(int)$pdo->lastInsertId();
 $itemInsert=$pdo->prepare('INSERT INTO order_items(order_id,product_id,product_name,quantity,unit_price) VALUES(?,?,?,?,?)'); $stockUpdate=$pdo->prepare('UPDATE inventory SET stock=stock-? WHERE product_id=?');
 foreach($lines as [$pid,$productName,$qty,$price]) { $itemInsert->execute([$orderId,$pid,$productName,$qty,$price]); $stockUpdate->execute([$qty,$pid]); }
 $pdo->commit(); reply(201,['id'=>(string)$orderId,'total'=>$total,'date'=>date('Y-m-d')]);
} catch(Throwable $e) { if($pdo->inTransaction()) $pdo->rollBack(); reply($e instanceof RuntimeException?409:500,['message'=>$e->getMessage()]); }
