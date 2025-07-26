<?php
// Activity Logs API for system logging
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

require_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

if (!$db) {
    http_response_code(500);
    echo json_encode(['message' => 'Database connection failed']);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path_parts = explode('/', trim($path, '/'));

// Extract ID from URL if present
$id = null;
if (count($path_parts) >= 3 && is_numeric($path_parts[2])) {
    $id = (int)$path_parts[2];
}

try {
    switch ($method) {
        case 'GET':
            // Get all activity logs with optional date range filtering
            $startDate = $_GET['startDate'] ?? null;
            $endDate = $_GET['endDate'] ?? null;
            
            $query = "SELECT * FROM activity_logs";
            $params = [];
            
            if ($startDate && $endDate) {
                $query .= " WHERE log_date BETWEEN ? AND ?";
                $params[] = $startDate;
                $params[] = $endDate;
            } elseif ($startDate) {
                $query .= " WHERE log_date >= ?";
                $params[] = $startDate;
            } elseif ($endDate) {
                $query .= " WHERE log_date <= ?";
                $params[] = $endDate;
            }
            
            $query .= " ORDER BY log_date DESC, created_at DESC";
            
            $stmt = $db->prepare($query);
            $stmt->execute($params);
            $logs = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            // Convert field names to camelCase for frontend compatibility
            $convertedLogs = array_map(function($log) {
                return [
                    'id' => (int)$log['id'],
                    'title' => $log['title'],
                    'description' => $log['description'],
                    'logDate' => $log['log_date'],
                    'createdAt' => $log['created_at']
                ];
            }, $logs);
            
            echo json_encode($convertedLogs);
            break;

        case 'POST':
            // Create new activity log
            $input = json_decode(file_get_contents('php://input'), true);
            
            $required_fields = ['title', 'description', 'logDate'];
            foreach ($required_fields as $field) {
                if (!isset($input[$field])) {
                    http_response_code(400);
                    echo json_encode(['message' => "Field $field is required"]);
                    exit;
                }
            }
            
            $stmt = $db->prepare("
                INSERT INTO activity_logs (title, description, log_date)
                VALUES (?, ?, ?)
            ");
            
            $stmt->execute([
                $input['title'],
                $input['description'],
                $input['logDate']
            ]);
            
            $newId = $db->lastInsertId();
            
            // Fetch the created log
            $stmt = $db->prepare("SELECT * FROM activity_logs WHERE id = ?");
            $stmt->execute([$newId]);
            $newLog = $stmt->fetch(PDO::FETCH_ASSOC);
            
            // Convert field names to camelCase for frontend compatibility
            $convertedNewLog = [
                'id' => (int)$newLog['id'],
                'title' => $newLog['title'],
                'description' => $newLog['description'],
                'logDate' => $newLog['log_date'],
                'createdAt' => $newLog['created_at']
            ];
            
            http_response_code(201);
            echo json_encode($convertedNewLog);
            break;

        case 'DELETE':
            if (!$id) {
                http_response_code(400);
                echo json_encode(['message' => 'ID is required for deletion']);
                break;
            }
            
            $stmt = $db->prepare("DELETE FROM activity_logs WHERE id = ?");
            $stmt->execute([$id]);
            
            if ($stmt->rowCount() > 0) {
                http_response_code(204);
            } else {
                http_response_code(404);
                echo json_encode(['message' => 'Activity log not found']);
            }
            break;

        default:
            http_response_code(405);
            echo json_encode(['message' => 'Method not allowed']);
            break;
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['message' => 'Database error: ' . $e->getMessage()]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['message' => 'Server error: ' . $e->getMessage()]);
}
?>