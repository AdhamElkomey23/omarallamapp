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
            // Get all workers
            $query = "SELECT * FROM workers ORDER BY created_at DESC";
            $stmt = $db->prepare($query);
            $stmt->execute();
            $workers = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            // Convert to camelCase for frontend
            $formattedWorkers = array_map(function($worker) {
                return [
                    'id' => (int)$worker['id'],
                    'name' => $worker['name'],
                    'role' => $worker['role'],
                    'department' => $worker['department'],
                    'salary' => (int)$worker['salary'],
                    'hireDate' => $worker['hire_date'],
                    'email' => $worker['email'] ?? '',
                    'phone' => $worker['phone'] ?? '',
                    'status' => $worker['status'],
                    'createdAt' => $worker['created_at']
                ];
            }, $workers);
            
            echo json_encode($formattedWorkers);
            break;
            
        case 'POST':
            // Add new worker
            $input = json_decode(file_get_contents('php://input'), true);
            
            if (!$input || !isset($input['name']) || !isset($input['role']) || !isset($input['department']) || !isset($input['salary'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Missing required fields']);
                exit();
            }
            
            $query = "INSERT INTO workers (name, role, department, salary, hire_date, email, phone, status) 
                     VALUES (:name, :role, :department, :salary, :hire_date, :email, :phone, :status)";
            
            $stmt = $db->prepare($query);
            $result = $stmt->execute([
                ':name' => $input['name'],
                ':role' => $input['role'],
                ':department' => $input['department'],
                ':salary' => $input['salary'],
                ':hire_date' => $input['hireDate'] ?? date('Y-m-d'),
                ':email' => $input['email'] ?? '',
                ':phone' => $input['phone'] ?? '',
                ':status' => $input['status'] ?? 'active'
            ]);
            
            if ($result) {
                $newId = $db->lastInsertId();
                echo json_encode(['id' => $newId, 'message' => 'Worker added successfully']);
            } else {
                throw new Exception('Failed to add worker');
            }
            break;
            
        case 'PUT':
            // Update worker
            $input = json_decode(file_get_contents('php://input'), true);
            
            if (!$input || !isset($input['id'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Missing worker ID']);
                exit();
            }
            
            $query = "UPDATE workers SET 
                     name = :name, role = :role, department = :department, 
                     salary = :salary, email = :email, phone = :phone, status = :status
                     WHERE id = :id";
            
            $stmt = $db->prepare($query);
            $result = $stmt->execute([
                ':id' => $input['id'],
                ':name' => $input['name'],
                ':role' => $input['role'],
                ':department' => $input['department'],
                ':salary' => $input['salary'],
                ':email' => $input['email'] ?? '',
                ':phone' => $input['phone'] ?? '',
                ':status' => $input['status'] ?? 'active'
            ]);
            
            if ($result) {
                echo json_encode(['message' => 'Worker updated successfully']);
            } else {
                throw new Exception('Failed to update worker');
            }
            break;
            
        case 'DELETE':
            // Delete worker
            $input = json_decode(file_get_contents('php://input'), true);
            
            if (!$input || !isset($input['id'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Missing worker ID']);
                exit();
            }
            
            $query = "DELETE FROM workers WHERE id = :id";
            $stmt = $db->prepare($query);
            $result = $stmt->execute([':id' => $input['id']]);
            
            if ($result) {
                echo json_encode(['message' => 'Worker deleted successfully']);
            } else {
                throw new Exception('Failed to delete worker');
            }
            break;
            
        default:
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
            break;
    }
    
} catch(Exception $e) {
    error_log("Workers API Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Server error occurred']);
}
?>