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
            // Get salary deductions with optional month filter
            $month = $_GET['month'] ?? null;
            
            $query = "SELECT sd.*, w.name as worker_name, w.role as worker_role 
                     FROM salary_deductions sd 
                     JOIN workers w ON sd.worker_id = w.id";
            
            $params = [];
            if ($month) {
                $query .= " WHERE sd.month = ?";
                $params[] = $month;
            }
            
            $query .= " ORDER BY sd.deduction_date DESC, w.name";
            
            $stmt = $db->prepare($query);
            $stmt->execute($params);
            $deductions = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            $result = array_map(function($deduction) {
                return [
                    'id' => (int)$deduction['id'],
                    'workerId' => (int)$deduction['worker_id'],
                    'workerName' => $deduction['worker_name'],
                    'workerRole' => $deduction['worker_role'],
                    'month' => $deduction['month'],
                    'amount' => (float)$deduction['amount'],
                    'reason' => $deduction['reason'],
                    'details' => $deduction['details'],
                    'deductionDate' => $deduction['deduction_date'],
                    'createdAt' => $deduction['created_at']
                ];
            }, $deductions);
            
            echo json_encode($result);
            break;
            
        case 'POST':
            // Create new salary deduction
            $data = json_decode(file_get_contents('php://input'), true);
            
            $query = "INSERT INTO salary_deductions (worker_id, month, amount, reason, details, deduction_date) 
                     VALUES (?, ?, ?, ?, ?, ?)";
            $stmt = $db->prepare($query);
            
            $result = $stmt->execute([
                $data['workerId'],
                $data['month'],
                $data['amount'],
                $data['reason'],
                $data['details'] ?? '',
                $data['deductionDate']
            ]);
            
            if ($result) {
                $id = $db->lastInsertId();
                $response = array_merge($data, ['id' => (int)$id, 'createdAt' => date('Y-m-d H:i:s')]);
                http_response_code(201);
                echo json_encode($response);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Failed to create salary deduction']);
            }
            break;
            
        case 'PUT':
            // Update salary deduction
            $id = ltrim($path_info, '/');
            $data = json_decode(file_get_contents('php://input'), true);
            
            $query = "UPDATE salary_deductions SET 
                     worker_id = ?, month = ?, amount = ?, reason = ?, 
                     details = ?, deduction_date = ? WHERE id = ?";
            $stmt = $db->prepare($query);
            
            $result = $stmt->execute([
                $data['workerId'],
                $data['month'],
                $data['amount'],
                $data['reason'],
                $data['details'] ?? '',
                $data['deductionDate'],
                $id
            ]);
            
            if ($result) {
                echo json_encode(['message' => 'Salary deduction updated successfully']);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Failed to update salary deduction']);
            }
            break;
            
        case 'DELETE':
            // Delete salary deduction
            $id = ltrim($path_info, '/');
            
            $query = "DELETE FROM salary_deductions WHERE id = ?";
            $stmt = $db->prepare($query);
            $result = $stmt->execute([$id]);
            
            if ($result) {
                echo json_encode(['message' => 'Salary deduction deleted successfully']);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Failed to delete salary deduction']);
            }
            break;
    }
} catch(Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>