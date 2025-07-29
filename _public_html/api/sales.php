<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Direct database connection with error handling
try {
    $host = 'localhost';
    $db_name = 'u179479756_newomar';
    $username = 'u179479756_newomarapp';
    $password = '#sS9ei3lK+';
    
    $db = new PDO(
        "mysql:host=$host;dbname=$db_name;charset=utf8mb4",
        $username,
        $password,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false
        ]
    );
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];

try {
    switch($method) {
        case 'GET':
            // Get all sales
            $query = "SELECT * FROM sales ORDER BY created_at DESC";
            $stmt = $db->prepare($query);
            $stmt->execute();
            $sales = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            // Convert to camelCase for frontend
            $formattedSales = array_map(function($sale) {
                return [
                    'id' => (int)$sale['id'],
                    'productName' => $sale['product_name'],
                    'quantity' => (int)$sale['quantity'],
                    'totalAmount' => (float)$sale['total_amount'],
                    'saleDate' => $sale['sale_date'],
                    'clientName' => $sale['client_name'],
                    'clientContact' => $sale['client_contact'] ?? '',
                    'createdAt' => $sale['created_at']
                ];
            }, $sales);
            
            echo json_encode($formattedSales);
            break;
            
        case 'POST':
            // Add new sale
            $input = json_decode(file_get_contents('php://input'), true);
            
            if (!$input || !isset($input['productName']) || !isset($input['quantity']) || !isset($input['totalAmount']) || !isset($input['clientName'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Missing required fields']);
                exit();
            }
            
            $query = "INSERT INTO sales (product_name, quantity, total_amount, sale_date, client_name, client_contact) 
                     VALUES (:product_name, :quantity, :total_amount, :sale_date, :client_name, :client_contact)";
            
            $stmt = $db->prepare($query);
            $result = $stmt->execute([
                ':product_name' => $input['productName'],
                ':quantity' => $input['quantity'],
                ':total_amount' => $input['totalAmount'],
                ':sale_date' => $input['saleDate'] ?? date('Y-m-d'),
                ':client_name' => $input['clientName'],
                ':client_contact' => $input['clientContact'] ?? ''
            ]);
            
            if ($result) {
                $newId = $db->lastInsertId();
                echo json_encode(['id' => $newId, 'message' => 'Sale added successfully']);
            } else {
                throw new Exception('Failed to add sale');
            }
            break;
            
        case 'PUT':
            // Update sale
            $input = json_decode(file_get_contents('php://input'), true);
            
            if (!$input || !isset($input['id'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Missing sale ID']);
                exit();
            }
            
            $query = "UPDATE sales SET 
                     product_name = :product_name, quantity = :quantity, total_amount = :total_amount,
                     sale_date = :sale_date, client_name = :client_name, client_contact = :client_contact
                     WHERE id = :id";
            
            $stmt = $db->prepare($query);
            $result = $stmt->execute([
                ':id' => $input['id'],
                ':product_name' => $input['productName'],
                ':quantity' => $input['quantity'],
                ':total_amount' => $input['totalAmount'],
                ':sale_date' => $input['saleDate'],
                ':client_name' => $input['clientName'],
                ':client_contact' => $input['clientContact'] ?? ''
            ]);
            
            if ($result) {
                echo json_encode(['message' => 'Sale updated successfully']);
            } else {
                throw new Exception('Failed to update sale');
            }
            break;
            
        case 'DELETE':
            // Delete sale
            $input = json_decode(file_get_contents('php://input'), true);
            
            if (!$input || !isset($input['id'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Missing sale ID']);
                exit();
            }
            
            $query = "DELETE FROM sales WHERE id = :id";
            $stmt = $db->prepare($query);
            $result = $stmt->execute([':id' => $input['id']]);
            
            if ($result) {
                echo json_encode(['message' => 'Sale deleted successfully']);
            } else {
                throw new Exception('Failed to delete sale');
            }
            break;
            
        default:
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
            break;
    }
    
} catch(Exception $e) {
    error_log("Sales API Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Server error occurred']);
}
?>