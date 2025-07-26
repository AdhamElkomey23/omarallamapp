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
            // Get all expenses
            $query = "SELECT * FROM expenses ORDER BY expense_date DESC, created_at DESC";
            $stmt = $db->prepare($query);
            $stmt->execute();
            $expenses = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            $result = array_map(function($expense) {
                return [
                    'id' => (int)$expense['id'],
                    'name' => $expense['name'],
                    'category' => $expense['category'],
                    'amount' => (float)$expense['amount'],
                    'expenseDate' => $expense['expense_date'],
                    'createdAt' => $expense['created_at']
                ];
            }, $expenses);
            
            echo json_encode($result);
            break;
            
        case 'POST':
            // Create new expense
            $data = json_decode(file_get_contents('php://input'), true);
            
            $query = "INSERT INTO expenses (description, category, amount, expense_date, notes) 
                     VALUES (?, ?, ?, ?, ?)";
            $stmt = $db->prepare($query);
            
            $result = $stmt->execute([
                $data['description'],
                $data['category'],
                $data['amount'],
                $data['expenseDate'],
                $data['notes'] ?? ''
            ]);
            
            if ($result) {
                $id = $db->lastInsertId();
                $response = array_merge($data, ['id' => (int)$id, 'createdAt' => date('Y-m-d H:i:s')]);
                http_response_code(201);
                echo json_encode($response);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Failed to create expense']);
            }
            break;
            
        case 'PUT':
            // Update expense
            $id = ltrim($path_info, '/');
            $data = json_decode(file_get_contents('php://input'), true);
            
            $query = "UPDATE expenses SET 
                     description = ?, category = ?, amount = ?, 
                     expense_date = ?, notes = ? WHERE id = ?";
            $stmt = $db->prepare($query);
            
            $result = $stmt->execute([
                $data['description'],
                $data['category'],
                $data['amount'],
                $data['expenseDate'],
                $data['notes'] ?? '',
                $id
            ]);
            
            if ($result) {
                echo json_encode(['message' => 'Expense updated successfully']);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Failed to update expense']);
            }
            break;
            
        case 'DELETE':
            // Delete expense
            $id = ltrim($path_info, '/');
            
            $query = "DELETE FROM expenses WHERE id = ?";
            $stmt = $db->prepare($query);
            $result = $stmt->execute([$id]);
            
            if ($result) {
                echo json_encode(['message' => 'Expense deleted successfully']);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Failed to delete expense']);
            }
            break;
    }
} catch(Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>