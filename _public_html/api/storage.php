<?php
// Storage Items API for managing inventory
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
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
            if ($id) {
                // Get single storage item
                $stmt = $db->prepare("SELECT * FROM storage_items WHERE id = ?");
                $stmt->execute([$id]);
                $item = $stmt->fetch(PDO::FETCH_ASSOC);
                
                if ($item) {
                    // Convert field names to camelCase for frontend compatibility
                    $convertedItem = [
                        'id' => (int)$item['id'],
                        'itemName' => $item['item_name'],
                        'quantityInTons' => (float)$item['quantity_in_tons'],
                        'purchasePricePerTon' => (float)$item['purchase_price_per_ton'],
                        'dealerName' => $item['dealer_name'],
                        'dealerContact' => $item['dealer_contact'],
                        'purchaseDate' => $item['purchase_date'],
                        'createdAt' => $item['created_at']
                    ];
                    echo json_encode($convertedItem);
                } else {
                    http_response_code(404);
                    echo json_encode(['message' => 'Storage item not found']);
                }
            } else {
                // Get all storage items
                $stmt = $db->query("SELECT * FROM storage_items ORDER BY created_at DESC");
                $items = $stmt->fetchAll(PDO::FETCH_ASSOC);
                
                // Convert field names to camelCase for frontend compatibility
                $convertedItems = array_map(function($item) {
                    return [
                        'id' => (int)$item['id'],
                        'itemName' => $item['item_name'],
                        'quantityInTons' => (float)$item['quantity_in_tons'],
                        'purchasePricePerTon' => (float)$item['purchase_price_per_ton'],
                        'dealerName' => $item['dealer_name'],
                        'dealerContact' => $item['dealer_contact'],
                        'purchaseDate' => $item['purchase_date'],
                        'createdAt' => $item['created_at']
                    ];
                }, $items);
                
                echo json_encode($convertedItems);
            }
            break;

        case 'POST':
            // Handle special endpoint for adding quantity
            if (isset($path_parts[2]) && $path_parts[2] === 'add') {
                $input = json_decode(file_get_contents('php://input'), true);
                
                if (!isset($input['itemName']) || !isset($input['quantity'])) {
                    http_response_code(400);
                    echo json_encode(['message' => 'Item name and quantity are required']);
                    break;
                }
                
                $itemName = $input['itemName'];
                $quantity = (float)$input['quantity'];
                
                // Find the most recent item with this name
                $stmt = $db->prepare("SELECT * FROM storage_items WHERE item_name = ? ORDER BY created_at DESC LIMIT 1");
                $stmt->execute([$itemName]);
                $item = $stmt->fetch(PDO::FETCH_ASSOC);
                
                if ($item) {
                    // Update the quantity
                    $newQuantity = $item['quantity_in_tons'] + $quantity;
                    $updateStmt = $db->prepare("UPDATE storage_items SET quantity_in_tons = ? WHERE id = ?");
                    $updateStmt->execute([$newQuantity, $item['id']]);
                    
                    echo json_encode(['success' => true, 'message' => 'Quantity added back successfully']);
                } else {
                    http_response_code(400);
                    echo json_encode(['success' => false, 'message' => 'Item not found in storage']);
                }
                break;
            }
            
            // Create new storage item
            $input = json_decode(file_get_contents('php://input'), true);
            
            $required_fields = ['itemName', 'quantityInTons', 'purchasePricePerTon', 'dealerName', 'purchaseDate'];
            foreach ($required_fields as $field) {
                if (!isset($input[$field])) {
                    http_response_code(400);
                    echo json_encode(['message' => "Field $field is required"]);
                    exit;
                }
            }
            
            $stmt = $db->prepare("
                INSERT INTO storage_items (item_name, quantity_in_tons, purchase_price_per_ton, dealer_name, dealer_contact, purchase_date)
                VALUES (?, ?, ?, ?, ?, ?)
            ");
            
            $stmt->execute([
                $input['itemName'],
                $input['quantityInTons'],
                $input['purchasePricePerTon'],
                $input['dealerName'],
                $input['dealerContact'] ?? null,
                $input['purchaseDate']
            ]);
            
            $newId = $db->lastInsertId();
            
            // Fetch the created item
            $stmt = $db->prepare("SELECT * FROM storage_items WHERE id = ?");
            $stmt->execute([$newId]);
            $newItem = $stmt->fetch(PDO::FETCH_ASSOC);
            
            // Convert field names to camelCase for frontend compatibility
            $convertedNewItem = [
                'id' => (int)$newItem['id'],
                'itemName' => $newItem['item_name'],
                'quantityInTons' => (float)$newItem['quantity_in_tons'],
                'purchasePricePerTon' => (float)$newItem['purchase_price_per_ton'],
                'dealerName' => $newItem['dealer_name'],
                'dealerContact' => $newItem['dealer_contact'],
                'purchaseDate' => $newItem['purchase_date'],
                'createdAt' => $newItem['created_at']
            ];
            
            http_response_code(201);
            echo json_encode($convertedNewItem);
            break;

        case 'PUT':
            if (!$id) {
                http_response_code(400);
                echo json_encode(['message' => 'ID is required for updating']);
                break;
            }
            
            $input = json_decode(file_get_contents('php://input'), true);
            
            // Build dynamic update query
            $updateFields = [];
            $updateValues = [];
            
            $allowedFields = [
                'itemName' => 'item_name',
                'quantityInTons' => 'quantity_in_tons',
                'purchasePricePerTon' => 'purchase_price_per_ton',
                'dealerName' => 'dealer_name',
                'dealerContact' => 'dealer_contact',
                'purchaseDate' => 'purchase_date'
            ];
            
            foreach ($allowedFields as $inputField => $dbField) {
                if (isset($input[$inputField])) {
                    $updateFields[] = "$dbField = ?";
                    $updateValues[] = $input[$inputField];
                }
            }
            
            if (empty($updateFields)) {
                http_response_code(400);
                echo json_encode(['message' => 'No valid fields to update']);
                break;
            }
            
            $updateValues[] = $id;
            
            $stmt = $db->prepare("UPDATE storage_items SET " . implode(', ', $updateFields) . " WHERE id = ?");
            $stmt->execute($updateValues);
            
            // Fetch updated item
            $stmt = $db->prepare("SELECT * FROM storage_items WHERE id = ?");
            $stmt->execute([$id]);
            $updatedItem = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($updatedItem) {
                // Convert field names to camelCase for frontend compatibility
                $convertedUpdatedItem = [
                    'id' => (int)$updatedItem['id'],
                    'itemName' => $updatedItem['item_name'],
                    'quantityInTons' => (float)$updatedItem['quantity_in_tons'],
                    'purchasePricePerTon' => (float)$updatedItem['purchase_price_per_ton'],
                    'dealerName' => $updatedItem['dealer_name'],
                    'dealerContact' => $updatedItem['dealer_contact'],
                    'purchaseDate' => $updatedItem['purchase_date'],
                    'createdAt' => $updatedItem['created_at']
                ];
                echo json_encode($convertedUpdatedItem);
            } else {
                http_response_code(404);
                echo json_encode(['message' => 'Storage item not found']);
            }
            break;

        case 'DELETE':
            if (!$id) {
                http_response_code(400);
                echo json_encode(['message' => 'ID is required for deletion']);
                break;
            }
            
            $stmt = $db->prepare("DELETE FROM storage_items WHERE id = ?");
            $stmt->execute([$id]);
            
            if ($stmt->rowCount() > 0) {
                http_response_code(204);
            } else {
                http_response_code(404);
                echo json_encode(['message' => 'Storage item not found']);
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