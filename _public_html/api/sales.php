<?php
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

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
    error_log("Sales API Connection Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
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
            // Add new sale with comprehensive validation
            $rawInput = file_get_contents('php://input');
            error_log("Sales POST raw input: " . $rawInput);
            
            if (empty($rawInput)) {
                http_response_code(400);
                echo json_encode(['error' => 'No input data received']);
                exit();
            }
            
            $input = json_decode($rawInput, true);
            
            if (json_last_error() !== JSON_ERROR_NONE) {
                error_log("Sales POST JSON error: " . json_last_error_msg());
                http_response_code(400);
                echo json_encode(['error' => 'Invalid JSON data']);
                exit();
            }
            
            // Validate required fields - support both frontend field names
            $required = ['productName', 'quantity', 'totalAmount'];
            foreach ($required as $field) {
                if (!isset($input[$field]) || (is_string($input[$field]) && trim($input[$field]) === '')) {
                    http_response_code(400);
                    echo json_encode(['error' => "Missing required field: $field"]);
                    exit();
                }
            }
            
            // Check for client name (support both clientName and buyerName for compatibility)
            $clientName = $input['clientName'] ?? $input['buyerName'] ?? '';
            if (empty(trim($clientName))) {
                http_response_code(400);
                echo json_encode(['error' => 'Client name is required']);
                exit();
            }
            
            // Validate numeric fields
            if (!is_numeric($input['quantity']) || $input['quantity'] <= 0) {
                http_response_code(400);
                echo json_encode(['error' => 'Quantity must be a positive number']);
                exit();
            }
            
            if (!is_numeric($input['totalAmount']) || $input['totalAmount'] <= 0) {
                http_response_code(400);
                echo json_encode(['error' => 'Total amount must be a positive number']);
                exit();
            }
            
            // Insert with proper error handling
            try {
                $query = "INSERT INTO sales (product_name, quantity, total_amount, sale_date, client_name, client_contact) 
                         VALUES (?, ?, ?, ?, ?, ?)";
                
                $stmt = $db->prepare($query);
                $result = $stmt->execute([
                    $input['productName'],
                    (int)$input['quantity'],
                    (float)$input['totalAmount'],
                    $input['saleDate'] ?? date('Y-m-d'),
                    $clientName, // Use the resolved client name
                    $input['clientContact'] ?? ''
                ]);
                
                if ($result) {
                    $newId = $db->lastInsertId();
                    echo json_encode([
                        'success' => true,
                        'id' => (int)$newId,
                        'message' => 'Sale added successfully'
                    ]);
                } else {
                    throw new Exception('Insert operation failed');
                }
            } catch (PDOException $e) {
                error_log("Sales POST database error: " . $e->getMessage());
                http_response_code(500);
                echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
                exit();
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
            $rawInput = file_get_contents('php://input');
            
            if (empty($rawInput)) {
                http_response_code(400);
                echo json_encode(['error' => 'No input data received']);
                exit();
            }
            
            $input = json_decode($rawInput, true);
            
            if (json_last_error() !== JSON_ERROR_NONE) {
                http_response_code(400);
                echo json_encode(['error' => 'Invalid JSON data']);
                exit();
            }
            
            if (!$input || !isset($input['id'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Missing sale ID']);
                exit();
            }
            
            $saleId = $input['id'];
            
            // Check if record exists
            $checkStmt = $db->prepare("SELECT id FROM sales WHERE id = ?");
            $checkStmt->execute([$saleId]);
            
            if ($checkStmt->rowCount() == 0) {
                http_response_code(404);
                echo json_encode(['error' => 'Sale not found']);
                exit();
            }
            
            // Perform delete
            $stmt = $db->prepare("DELETE FROM sales WHERE id = ?");
            $result = $stmt->execute([$saleId]);
            
            if ($result && $stmt->rowCount() > 0) {
                echo json_encode(['success' => true, 'message' => 'Sale deleted successfully']);
            } else {
                throw new Exception('Failed to delete sale - no rows affected');
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