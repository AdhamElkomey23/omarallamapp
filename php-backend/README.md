# Al-Wasiloon Fertilizer Factory Management System - PHP Backend

## Overview
This is the PHP + MySQL backend for the Al-Wasiloon Fertilizer Factory Management System. It provides RESTful API endpoints for managing workers, attendance, salary deductions, sales, and expenses.

## Requirements
- PHP 7.4 or higher
- MySQL 5.7 or higher
- Apache server with mod_rewrite enabled

## Installation on Hostinger

### 1. Database Setup
1. Create a new MySQL database in your Hostinger control panel
2. Import the `database/schema.sql` file to create the required tables
3. Update database credentials in `config/database.php`

### 2. File Upload
1. Upload all files to your domain's public_html directory
2. Ensure the `.htaccess` file is uploaded for proper routing

### 3. Configuration
Update `config/database.php` with your Hostinger database credentials:
```php
private $host = 'your-database-host';
private $db_name = 'your-database-name';
private $username = 'your-database-username';
private $password = 'your-database-password';
```

### 4. Frontend Configuration
Update your React frontend's API base URL to point to your domain:
```javascript
// In client/src/lib/queryClient.ts
const API_BASE_URL = 'https://yourdomain.com/api';
```

## API Endpoints

### Workers
- `GET /api/workers` - Get all workers
- `POST /api/workers` - Create new worker
- `PUT /api/workers/{id}` - Update worker
- `DELETE /api/workers/{id}` - Delete worker

### Attendance
- `GET /api/attendance` - Get all attendance records
- `GET /api/attendance/date?date=YYYY-MM-DD` - Get attendance by date
- `GET /api/attendance/summary?workerId=X&month=YYYY-MM` - Get monthly summary
- `POST /api/attendance` - Create attendance record
- `PUT /api/attendance/{id}` - Update attendance record
- `DELETE /api/attendance/{id}` - Delete attendance record

### Salary Deductions
- `GET /api/salary-deductions?month=YYYY-MM` - Get salary deductions (optional month filter)
- `POST /api/salary-deductions` - Create salary deduction
- `PUT /api/salary-deductions/{id}` - Update salary deduction
- `DELETE /api/salary-deductions/{id}` - Delete salary deduction

### Sales
- `GET /api/sales` - Get all sales
- `POST /api/sales` - Create new sale
- `PUT /api/sales/{id}` - Update sale
- `DELETE /api/sales/{id}` - Delete sale

### Expenses
- `GET /api/expenses` - Get all expenses
- `POST /api/expenses` - Create new expense
- `PUT /api/expenses/{id}` - Update expense
- `DELETE /api/expenses/{id}` - Delete expense

### Dashboard
- `GET /api/dashboard` - Get dashboard statistics

## Database Schema

### Tables
- `workers` - Employee information
- `worker_attendance` - Daily attendance records
- `salary_deductions` - Salary deduction records
- `sales` - Sales transactions
- `expenses` - Business expenses

## Features
- Full CRUD operations for all entities
- Arabic and English language support
- Proper data validation and error handling
- CORS headers for frontend integration
- RESTful API design
- Secure database operations with prepared statements

## Deployment Notes
- All API responses are in JSON format
- CORS is enabled for frontend integration
- The system uses PDO for secure database operations
- Error handling provides meaningful feedback
- The frontend React app can be deployed separately or in the same directory

## Support
This backend is designed to work seamlessly with the React frontend, maintaining all existing functionality while providing better performance and compatibility with shared hosting providers like Hostinger.