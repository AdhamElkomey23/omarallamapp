<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: text/plain');
header('Access-Control-Allow-Origin: *');

echo "=== Simple Database Test ===\n";

try {
    // Direct database connection test
    echo "Connecting to database...\n";
    
    $host = 'localhost';
    $db_name = 'u179479756_newomar';
    $username = 'u179479756_newomarapp';
    $password = '#sS9ei3lK+';
    
    $pdo = new PDO(
        "mysql:host=$host;dbname=$db_name;charset=utf8mb4",
        $username,
        $password,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]
    );
    
    echo "✅ Database connection successful!\n";
    
    // Test table existence
    echo "\nChecking workers table...\n";
    $stmt = $pdo->query("SHOW TABLES LIKE 'workers'");
    if ($stmt->rowCount() > 0) {
        echo "✅ Workers table exists\n";
        
        // Test select
        $stmt = $pdo->query("SELECT COUNT(*) as count FROM workers");
        $count = $stmt->fetch()['count'];
        echo "✅ Workers table has $count records\n";
        
        // Test insert
        echo "\nTesting insert...\n";
        $stmt = $pdo->prepare("INSERT INTO workers (name, role, department, salary, hire_date, status) VALUES (?, ?, ?, ?, ?, ?)");
        $result = $stmt->execute(['Test Worker', 'Test Role', 'Test Dept', 1000, date('Y-m-d'), 'active']);
        
        if ($result) {
            $id = $pdo->lastInsertId();
            echo "✅ Insert successful! ID: $id\n";
            
            // Clean up
            $stmt = $pdo->prepare("DELETE FROM workers WHERE id = ?");
            $stmt->execute([$id]);
            echo "✅ Test record cleaned up\n";
        } else {
            echo "❌ Insert failed\n";
        }
        
    } else {
        echo "❌ Workers table does not exist\n";
    }
    
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
    echo "File: " . $e->getFile() . " Line: " . $e->getLine() . "\n";
}

echo "\n=== Test Complete ===\n";
?>