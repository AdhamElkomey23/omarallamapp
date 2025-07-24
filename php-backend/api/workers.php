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
            if (empty($path_info)) {
                // Get all workers
                $query = "SELECT * FROM workers ORDER BY created_at DESC";
                $stmt = $db->prepare($query);
                $stmt->execute();
                $workers = $stmt->fetchAll(PDO::FETCH_ASSOC);
                
                // Convert snake_case to camelCase for frontend compatibility
                $result = array_map(function($worker) {
                    return [
                        'id' => (int)$worker['id'],
                        'name' => $worker['name'],
                        'role' => $worker['role'],
                        'department' => $worker['department'],
                        'salary' => (float)$worker['salary'],
                        'hireDate' => $worker['hire_date'],
                        'email' => $worker['email'],
                        'phone' => $worker['phone'],
                        'status' => $worker['status'],
                        'createdAt' => $worker['created_at']
                    ];
                }, $workers);
                
                echo json_encode($result);
            } else {
                // Get specific worker
                $id = ltrim($path_info, '/');
                $query = "SELECT * FROM workers WHERE id = ?";
                $stmt = $db->prepare($query);
                $stmt->execute([$id]);
                $worker = $stmt->fetch(PDO::FETCH_ASSOC);
                
                if ($worker) {
                    $result = [
                        'id' => (int)$worker['id'],
                        'name' => $worker['name'],
                        'role' => $worker['role'],
                        'department' => $worker['department'],
                        'salary' => (float)$worker['salary'],
                        'hireDate' => $worker['hire_date'],
                        'email' => $worker['email'],
                        'phone' => $worker['phone'],
                        'status' => $worker['status'],
                        'createdAt' => $worker['created_at']
                    ];
                    echo json_encode($result);
                } else {
                    http_response_code(404);
                    echo json_encode(['error' => 'Worker not found']);
                }
            }
            break;
            
        case 'POST':
            // Create new worker
            $data = json_decode(file_get_contents('php://input'), true);
            
            $query = "INSERT INTO workers (name, role, department, salary, hire_date, email, phone, status) 
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
            $stmt = $db->prepare($query);
            
            $result = $stmt->execute([
                $data['name'],
                $data['role'],
                $data['department'],
                $data['salary'],
                $data['hireDate'],
                $data['email'] ?? '',
                $data['phone'] ?? '',
                $data['status'] ?? 'active'
            ]);
            
            if ($result) {
                $id = $db->lastInsertId();
                $response = array_merge($data, ['id' => (int)$id, 'createdAt' => date('Y-m-d H:i:s')]);
                http_response_code(201);
                echo json_encode($response);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Failed to create worker']);
            }
            break;
            
        case 'PUT':
            // Update worker
            $id = ltrim($path_info, '/');
            $data = json_decode(file_get_contents('php://input'), true);
            
            $query = "UPDATE workers SET name = ?, role = ?, department = ?, salary = ?, 
                     hire_date = ?, email = ?, phone = ?, status = ? WHERE id = ?";
            $stmt = $db->prepare($query);
            
            $result = $stmt->execute([
                $data['name'],
                $data['role'],
                $data['department'],
                $data['salary'],
                $data['hireDate'],
                $data['email'] ?? '',
                $data['phone'] ?? '',
                $data['status'] ?? 'active',
                $id
            ]);
            
            if ($result) {
                echo json_encode(['message' => 'Worker updated successfully']);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Failed to update worker']);
            }
            break;
            
        case 'DELETE':
            // Delete worker
            $id = ltrim($path_info, '/');
            
            $query = "DELETE FROM workers WHERE id = ?";
            $stmt = $db->prepare($query);
            $result = $stmt->execute([$id]);
            
            if ($result) {
                echo json_encode(['message' => 'Worker deleted successfully']);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Failed to delete worker']);
            }
            break;
    }
} catch(Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>