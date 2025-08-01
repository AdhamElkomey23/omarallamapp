# Artisana - Hostinger Deployment Package

## Overview
This repository contains the complete deployment package for the Artisana handcrafted products marketplace, ready for upload to Hostinger shared hosting.

## Upload Instructions

1. **Download the `_public_html` folder**
2. **Upload all contents** of the `_public_html` folder to your Hostinger public_html directory
3. **Configure database connection** in `config/database.php` with your Hostinger database credentials
4. **Import database schema** by running the SQL commands in `database/schema.sql`
5. **Your application will be ready to use**

## What's Included

- **api/**: Complete PHP backend with all API endpoints
  - Sales management (sales.php)
  - Expense tracking (expenses.php) 
  - Storage management (storage.php)
  - Worker management (workers.php)
  - Dashboard analytics (dashboard.php)
  - Activity logging (activity-logs.php)
  - Salary deductions (salary-deductions.php)

- **assets/**: Optimized frontend JavaScript and CSS files
- **config/**: Database configuration file
- **database/**: Complete SQL schema with all required tables
- **index.html**: Main application entry point

## Database Setup
Your database should include these tables:
- users
- products  
- sales
- expenses
- storage_items
- workers
- activity_logs
- salary_deductions
- worker_attendance

## Features
- Complete sales management system
- Expense tracking and reporting
- Storage/inventory management
- Worker attendance and salary deductions
- Real-time dashboard analytics
- Activity logging
- Responsive design for all devices

The application is fully functional and ready for production use on Hostinger shared hosting.