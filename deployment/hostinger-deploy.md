# Hostinger Deployment Guide

## Step 1: Prepare Your Files

### Backend Files (Upload to public_html)
```
public_html/
├── api/
│   ├── workers.php
│   ├── attendance.php
│   ├── salary-deductions.php
│   ├── sales.php
│   ├── expenses.php
│   └── dashboard.php
├── config/
│   └── database.php
├── .htaccess
└── index.php
```

### Frontend Files (Build and Upload)
1. Build the React app: `npm run build`
2. Upload the `dist` folder contents to `public_html/`

## Step 2: Database Setup

1. **Create MySQL Database in Hostinger:**
   - Go to Hostinger Control Panel
   - Navigate to "MySQL Databases"
   - Create new database: `yourusername_fertilizer`
   - Create database user with full privileges

2. **Import Database Schema:**
   - Go to phpMyAdmin
   - Select your database
   - Import the `schema.sql` file

3. **Update Database Configuration:**
   Edit `config/database.php` with your credentials:
   ```php
   private $host = 'localhost';
   private $db_name = 'yourusername_fertilizer';
   private $username = 'yourusername_dbuser';
   private $password = 'your_secure_password';
   ```

## Step 3: Frontend Configuration

Update the API base URL in your React app before building:

**File: `client/src/lib/queryClient.ts`**
```javascript
const API_BASE_URL = 'https://yourdomain.com/api';
// Replace yourdomain.com with your actual domain
```

## Step 4: Build and Deploy

1. **Build Frontend:**
   ```bash
   npm run build
   ```

2. **Upload Files:**
   - Upload `php-backend/*` to `public_html/`
   - Upload `dist/*` contents to `public_html/`

3. **Set Permissions:**
   - Ensure `.htaccess` is readable (644)
   - Ensure PHP files are executable (644)

## Step 5: Test Deployment

Visit these URLs to test:
- `https://yourdomain.com/` - Frontend app
- `https://yourdomain.com/api/dashboard` - API test
- `https://yourdomain.com/index.php` - Backend status

## Troubleshooting

### Common Issues:
1. **Database Connection Failed:**
   - Check database credentials in `config/database.php`
   - Ensure database exists and user has proper privileges

2. **API Not Working:**
   - Check if `.htaccess` is uploaded correctly
   - Verify mod_rewrite is enabled on server

3. **CORS Issues:**
   - Ensure CORS headers are set in PHP files
   - Check if `.htaccess` CORS rules are working

### Quick Tests:
```bash
# Test API endpoints
curl https://yourdomain.com/api/dashboard
curl https://yourdomain.com/api/workers
```

## Features Maintained:
✓ All worker management functionality
✓ Attendance tracking with daily/monthly views
✓ Salary deduction system with month filtering
✓ Sales and expense management with delete functionality
✓ Arabic/English bilingual support
✓ Dashboard with statistics and charts
✓ Responsive design for mobile and desktop

Your fertilizer factory management system is now ready for production use on Hostinger!