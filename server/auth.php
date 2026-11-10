<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

function respond(int $status, array $data): never {
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_SLASHES);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, ['message' => 'Use a POST request.']);
}

$action = $_GET['action'] ?? '';
if (!in_array($action, ['signup', 'signin'], true)) {
    respond(404, ['message' => 'Unknown authentication action.']);
}

try {
    $host = getenv('CANA_DB_HOST') ?: '127.0.0.1';
    $database = getenv('CANA_DB_NAME') ?: 'cana_db';
    $dbUser = getenv('CANA_DB_USER') ?: 'root';
    $dbPassword = getenv('CANA_DB_PASSWORD') ?: '';
    $pdo = new PDO(
        "mysql:host={$host};dbname={$database};charset=utf8mb4",
        $dbUser,
        $dbPassword,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]
    );
} catch (Throwable $error) {
    error_log($error->getMessage());
    respond(500, ['message' => 'Database connection failed. Check the PHP server and database settings.']);
}

$input = json_decode(file_get_contents('php://input') ?: '', true);
if (!is_array($input)) {
    respond(400, ['message' => 'Invalid JSON request.']);
}

$email = strtolower(trim((string)($input['email'] ?? '')));
$password = (string)($input['password'] ?? '');
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($password) < 8) {
    respond(422, ['message' => 'Enter a valid email and a password with at least 8 characters.']);
}

if ($action === 'signup') {
    $fullName = trim((string)($input['fullName'] ?? ''));
    $birthday = (string)($input['birthday'] ?? '');
    $date = DateTime::createFromFormat('!Y-m-d', $birthday);
    $today = new DateTimeImmutable('today');
    if ($fullName === '' || !$date || $date->format('Y-m-d') !== $birthday || $date > $today) {
        respond(422, ['message' => 'Enter your name and a valid date of birth.']);
    }
    $age = $date->diff($today)->y;
    if ($age < 21) {
        respond(422, ['message' => 'You must be 21 or older to create an account.']);
    }

    try {
        $statement = $pdo->prepare('INSERT INTO users (full_name, email, password_hash, address, birthday, contact_number, country) VALUES (?, ?, ?, ?, ?, ?, ?)');
        $statement->execute([
            $fullName,
            $email,
            password_hash($password, PASSWORD_DEFAULT),
            trim((string)($input['address'] ?? '')),
            $birthday,
            trim((string)($input['contactNumber'] ?? '')),
            trim((string)($input['country'] ?? '')),
        ]);
        $id = (string)$pdo->lastInsertId();
    } catch (PDOException $error) {
        if ($error->getCode() === '23000') {
            respond(409, ['message' => 'An account with this email already exists.']);
        }
        throw $error;
    }
} else {
    $statement = $pdo->prepare('SELECT id, full_name, email, password_hash, address, birthday, contact_number, country FROM users WHERE email = ? LIMIT 1');
    $statement->execute([$email]);
    $record = $statement->fetch();
    if (!$record || !password_verify($password, $record['password_hash'])) {
        respond(401, ['message' => 'Invalid email or password.']);
    }
    $id = (string)$record['id'];
    $fullName = $record['full_name'];
    $email = $record['email'];
    $birthday = $record['birthday'];
    $address = $record['address'];
    $contactNumber = $record['contact_number'];
    $country = $record['country'];
}

$birthdayDate = new DateTimeImmutable($birthday);
$sessionToken = bin2hex(random_bytes(32));
try {
    $session = $pdo->prepare('INSERT INTO auth_sessions (token_hash,user_id,expires_at) VALUES (?,?,DATE_ADD(NOW(), INTERVAL 30 DAY))');
    $session->execute([hash('sha256', $sessionToken), $id]);
} catch (PDOException $error) {
    error_log($error->getMessage());
    if ($error->getCode() === '42S02') {
        respond(500, ['message' => 'The CANA database needs the latest schema. Import server/schema.sql in phpMyAdmin, then try signing in again.']);
    }
    respond(500, ['message' => 'Could not create a sign-in session. Check the PHP server error log.']);
}
$user = [
    'id' => $id,
    'fullName' => $fullName,
    'email' => $email,
    'address' => $address ?? trim((string)($input['address'] ?? '')),
    'age' => $birthdayDate->diff(new DateTimeImmutable('today'))->y,
    'birthday' => $birthday,
    'contactNumber' => $contactNumber ?? trim((string)($input['contactNumber'] ?? '')),
    'country' => $country ?? trim((string)($input['country'] ?? '')),
];
respond($action === 'signup' ? 201 : 200, ['user' => $user, 'token' => $sessionToken]);
