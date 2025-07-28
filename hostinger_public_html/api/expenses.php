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

if (!$db) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];

try {
    switch($method) {
        case 'GET':
            // Get all expenses
            $query = "SELECT * FROM expenses ORDER BY created_at DESC";
            $stmt = $db->prepare($query);
            $stmt->execute();
            $expenses = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            // Convert to camelCase for frontend
            $formattedExpenses = array_map(function($expense) {
                return [
                    'id' => (int)$expense['id'],
                    'name' => $expense['name'],
                    'amount' => (float)$expense['amount'],
                    'category' => $expense['category'],
                    'expenseDate' => $expense['expense_date'],
                    'createdAt' => $expense['created_at']
                ];
            }, $expenses);
            
            echo json_encode($formattedExpenses);
            break;
            
        case 'POST':
            // Add new expense
            $input = json_decode(file_get_contents('php://input'), true);
            
            if (!$input || !isset($input['name']) || !isset($input['amount']) || !isset($input['category'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Missing required fields']);
                exit();
            }
            
            $query = "INSERT INTO expenses (name, amount, category, expense_date) 
                     VALUES (:name, :amount, :category, :expense_date)";
            
            $stmt = $db->prepare($query);
            $result = $stmt->execute([
                ':name' => $input['name'],
                ':amount' => $input['amount'],
                ':category' => $input['category'],
                ':expense_date' => $input['expenseDate'] ?? date('Y-m-d')
            ]);
            
            if ($result) {
                $newId = $db->lastInsertId();
                echo json_encode(['id' => $newId, 'message' => 'Expense added successfully']);
            } else {
                throw new Exception('Failed to add expense');
            }
            break;
            
        case 'PUT':
            // Update expense
            $input = json_decode(file_get_contents('php://input'), true);
            
            if (!$input || !isset($input['id'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Missing expense ID']);
                exit();
            }
            
            $query = "UPDATE expenses SET 
                     name = :name, amount = :amount, category = :category, expense_date = :expense_date
                     WHERE id = :id";
            
            $stmt = $db->prepare($query);
            $result = $stmt->execute([
                ':id' => $input['id'],
                ':name' => $input['name'],
                ':amount' => $input['amount'],
                ':category' => $input['category'],
                ':expense_date' => $input['expenseDate']
            ]);
            
            if ($result) {
                echo json_encode(['message' => 'Expense updated successfully']);
            } else {
                throw new Exception('Failed to update expense');
            }
            break;
            
        case 'DELETE':
            // Delete expense
            $input = json_decode(file_get_contents('php://input'), true);
            
            if (!$input || !isset($input['id'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Missing expense ID']);
                exit();
            }
            
            $query = "DELETE FROM expenses WHERE id = :id";
            $stmt = $db->prepare($query);
            $result = $stmt->execute([':id' => $input['id']]);
            
            if ($result) {
                echo json_encode(['message' => 'Expense deleted successfully']);
            } else {
                throw new Exception('Failed to delete expense');
            }
            break;
            
        default:
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
            break;
    }
    
} catch(Exception $e) {
    error_log("Expenses API Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Server error occurred']);
}
?>