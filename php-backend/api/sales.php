<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$method = $_SERVER['REQUEST_METHOD'];
$path_info = isset($_SERVER['PATH_INFO']) ? $_SERVER['PATH_INFO'] : '';

try {
    switch($method) {
        case 'GET':
            // Get all sales records
            $query = "SELECT * FROM sales ORDER BY sale_date DESC, created_at DESC";
            $stmt = $db->prepare($query);
            $stmt->execute();
            $sales = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            $result = array_map(function($sale) {
                return [
                    'id' => (int)$sale['id'],
                    'customerName' => $sale['customer_name'],
                    'product' => $sale['product'],
                    'quantity' => (float)$sale['quantity'],
                    'unitPrice' => (float)$sale['unit_price'],
                    'totalAmount' => (float)$sale['total_amount'],
                    'saleDate' => $sale['sale_date'],
                    'notes' => $sale['notes'],
                    'createdAt' => $sale['created_at']
                ];
            }, $sales);
            
            echo json_encode($result);
            break;
            
        case 'POST':
            // Create new sale
            $data = json_decode(file_get_contents('php://input'), true);
            
            $query = "INSERT INTO sales (customer_name, product, quantity, unit_price, total_amount, sale_date, notes) 
                     VALUES (?, ?, ?, ?, ?, ?, ?)";
            $stmt = $db->prepare($query);
            
            $result = $stmt->execute([
                $data['customerName'],
                $data['product'],
                $data['quantity'],
                $data['unitPrice'],
                $data['totalAmount'],
                $data['saleDate'],
                $data['notes'] ?? ''
            ]);
            
            if ($result) {
                $id = $db->lastInsertId();
                $response = array_merge($data, ['id' => (int)$id, 'createdAt' => date('Y-m-d H:i:s')]);
                http_response_code(201);
                echo json_encode($response);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Failed to create sale']);
            }
            break;
            
        case 'PUT':
            // Update sale
            $id = ltrim($path_info, '/');
            $data = json_decode(file_get_contents('php://input'), true);
            
            $query = "UPDATE sales SET 
                     customer_name = ?, product = ?, quantity = ?, unit_price = ?, 
                     total_amount = ?, sale_date = ?, notes = ? WHERE id = ?";
            $stmt = $db->prepare($query);
            
            $result = $stmt->execute([
                $data['customerName'],
                $data['product'],
                $data['quantity'],
                $data['unitPrice'],
                $data['totalAmount'],
                $data['saleDate'],
                $data['notes'] ?? '',
                $id
            ]);
            
            if ($result) {
                echo json_encode(['message' => 'Sale updated successfully']);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Failed to update sale']);
            }
            break;
            
        case 'DELETE':
            // Delete sale
            $id = ltrim($path_info, '/');
            
            $query = "DELETE FROM sales WHERE id = ?";
            $stmt = $db->prepare($query);
            $result = $stmt->execute([$id]);
            
            if ($result) {
                echo json_encode(['message' => 'Sale deleted successfully']);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Failed to delete sale']);
            }
            break;
    }
} catch(Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>