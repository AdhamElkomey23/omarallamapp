<?php
// Simple index file for testing PHP backend
header('Content-Type: application/json');

echo json_encode([
    'message' => 'Al-Wasiloon Fertilizer Factory Management System - PHP Backend',
    'version' => '1.0.0',
    'status' => 'active',
    'endpoints' => [
        'GET /api/dashboard - Dashboard statistics',
        'GET/POST/PUT/DELETE /api/workers - Workers management',
        'GET/POST/PUT/DELETE /api/attendance - Attendance tracking',
        'GET/POST/PUT/DELETE /api/salary-deductions - Salary deductions',
        'GET/POST/PUT/DELETE /api/sales - Sales management',
        'GET/POST/PUT/DELETE /api/expenses - Expenses management'
    ]
]);
?>