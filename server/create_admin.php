<?php
declare(strict_types=1);
if (PHP_SAPI !== 'cli') { http_response_code(404); exit; }
$email = strtolower(trim($argv[1] ?? readline('Admin email: ')));
$password = readline('Admin password (minimum 12 characters): ');
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($password) < 12) { fwrite(STDERR, "Use a valid email and a password with at least 12 characters.\n"); exit(1); }
try {
    $pdo = new PDO('mysql:host='.(getenv('CANA_DB_HOST') ?: '127.0.0.1').';dbname='.(getenv('CANA_DB_NAME') ?: 'cana_db').';charset=utf8mb4', getenv('CANA_DB_USER') ?: 'root', getenv('CANA_DB_PASSWORD') ?: '', [PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION]);
    $query = $pdo->prepare('INSERT INTO admins(email,password_hash) VALUES(?,?) ON DUPLICATE KEY UPDATE password_hash=VALUES(password_hash)');
    $query->execute([$email, password_hash($password, PASSWORD_DEFAULT)]);
    fwrite(STDOUT, "Admin account ready for {$email}.\n");
} catch (Throwable $error) { fwrite(STDERR, "Could not create admin: {$error->getMessage()}\n"); exit(1); }
