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
            // Get all salary deductions with worker names
            $query = "SELECT sd.*, w.name as worker_name 
                     FROM salary_deductions sd 
                     JOIN workers w ON sd.worker_id = w.id 
                     ORDER BY sd.deduction_month DESC, w.name";
            $stmt = $db->prepare($query);
            $stmt->execute();
            $deductions = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            // Convert to camelCase for frontend
            $formattedDeductions = array_map(function($deduction) {
                return [
                    'id' => (int)$deduction['id'],
                    'workerId' => (int)$deduction['worker_id'],
                    'workerName' => $deduction['worker_name'],
                    'deductionMonth' => $deduction['deduction_month'],
                    'deductionAmount' => (float)$deduction['deduction_amount'],
                    'deductionType' => $deduction['deduction_type'],
                    'description' => $deduction['description'] ?? '',
                    'createdAt' => $deduction['created_at']
                ];
            }, $deductions);
            
            echo json_encode($formattedDeductions);
            break;
            
        case 'POST':
            // Add new salary deduction
            $input = json_decode(file_get_contents('php://input'), true);
            
            if (!$input || !isset($input['workerId']) || !isset($input['deductionAmount']) || !isset($input['deductionType'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Missing required fields']);
                exit();
            }
            
            $query = "INSERT INTO salary_deductions (worker_id, deduction_month, deduction_amount, deduction_type, description) 
                     VALUES (:worker_id, :deduction_month, :deduction_amount, :deduction_type, :description)";
            
            $stmt = $db->prepare($query);
            $result = $stmt->execute([
                ':worker_id' => $input['workerId'],
                ':deduction_month' => $input['deductionMonth'] ?? date('Y-m'),
                ':deduction_amount' => $input['deductionAmount'],
                ':deduction_type' => $input['deductionType'],
                ':description' => $input['description'] ?? ''
            ]);
            
            if ($result) {
                $newId = $db->lastInsertId();
                echo json_encode(['id' => $newId, 'message' => 'Salary deduction added successfully']);
            } else {
                throw new Exception('Failed to add salary deduction');
            }
            break;
            
        case 'PUT':
            // Update salary deduction
            $input = json_decode(file_get_contents('php://input'), true);
            
            if (!$input || !isset($input['id'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Missing deduction ID']);
                exit();
            }
            
            $query = "UPDATE salary_deductions SET 
                     deduction_month = :deduction_month, deduction_amount = :deduction_amount, 
                     deduction_type = :deduction_type, description = :description
                     WHERE id = :id";
            
            $stmt = $db->prepare($query);
            $result = $stmt->execute([
                ':id' => $input['id'],
                ':deduction_month' => $input['deductionMonth'],
                ':deduction_amount' => $input['deductionAmount'],
                ':deduction_type' => $input['deductionType'],
                ':description' => $input['description'] ?? ''
            ]);
            
            if ($result) {
                echo json_encode(['message' => 'Salary deduction updated successfully']);
            } else {
                throw new Exception('Failed to update salary deduction');
            }
            break;
            
        case 'DELETE':
            // Delete salary deduction
            $input = json_decode(file_get_contents('php://input'), true);
            
            if (!$input || !isset($input['id'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Missing deduction ID']);
                exit();
            }
            
            $query = "DELETE FROM salary_deductions WHERE id = :id";
            $stmt = $db->prepare($query);
            $result = $stmt->execute([':id' => $input['id']]);
            
            if ($result) {
                echo json_encode(['message' => 'Salary deduction deleted successfully']);
            } else {
                throw new Exception('Failed to delete salary deduction');
            }
            break;
            
        default:
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
            break;
    }
    
} catch(Exception $e) {
    error_log("Salary Deductions API Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Server error occurred']);
}
?>