<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once 'config/database.php';

try {
    $database = new Database();
    $db = $database->getConnection();
    
    if ($db) {
        // Test query
        $query = "SELECT COUNT(*) as table_count FROM information_schema.tables WHERE table_schema = 'u179479756_newomar'";
        $stmt = $db->prepare($query);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        
        echo json_encode([
            'status' => 'success',
            'message' => 'Database connection successful',
            'database' => 'u179479756_newomar',
            'tables_found' => (int)$result['table_count'],
            'timestamp' => date('Y-m-d H:i:s')
        ]);
    } else {
        throw new Exception('Failed to establish database connection');
    }
    
} catch(Exception $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Database connection failed: ' . $e->getMessage(),
        'timestamp' => date('Y-m-d H:i:s')
    ]);
}
?>