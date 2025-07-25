# 🚀 COMPLETE HOSTINGER DEPLOYMENT GUIDE

## 📋 BEFORE YOU START

### What You Need:
1. **Hostinger hosting account** with PHP + MySQL support
2. **Domain name** (e.g., `yoursite.com`)
3. **FTP/File Manager access** to upload files
4. **MySQL database** created in Hostinger control panel

---

## ⚡ STEP 1: PREPARE YOUR DOMAIN

### Replace Domain in Configuration:
1. Open `client/src/config/production.ts`
2. **Replace `yourdomain.com` with your actual domain**:
   ```javascript
   API_BASE_URL: 'https://YOURSITE.com/api',
   ```

---

## 🏗️ STEP 2: BUILD THE FRONTEND

Run this command in your project folder:
```bash
npm run build
```

This creates a `dist/` folder with your built website.

---

## 🗄️ STEP 3: SET UP DATABASE

### Create MySQL Database:
1. **Login to Hostinger Control Panel**
2. **Go to "MySQL Databases"**
3. **Create new database**: `yourname_fertilizer`
4. **Create database user** with full privileges
5. **Remember these credentials**:
   - Database name: `yourname_fertilizer`
   - Username: `yourname_dbuser` 
   - Password: `your_secure_password`
   - Host: `localhost`

### Import Database Schema:
1. **Go to phpMyAdmin** in Hostinger
2. **Select your database**
3. **Click "Import" tab**
4. **Upload file**: `php-backend/database/schema.sql`
5. **Click "Go"** to import

---

## 📁 STEP 4: UPLOAD FILES TO HOSTINGER

### Upload Backend Files:
Upload these files from `php-backend/` to your `public_html/` folder:

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
├── index.php
└── test-connection.php
```

### Upload Frontend Files:
Upload ALL contents from the `dist/` folder to `public_html/`:

```
public_html/
├── index.html          (from dist/)
├── assets/             (from dist/)
├── [other dist files]
```

---

## ⚙️ STEP 5: CONFIGURE DATABASE CONNECTION

### Edit Database Credentials:
1. **Open `public_html/config/database.php`**
2. **Update these lines**:
   ```php
   private $host = 'localhost';
   private $db_name = 'yourname_fertilizer';    // Your database name
   private $username = 'yourname_dbuser';       // Your database user
   private $password = 'your_secure_password';  // Your database password
   ```

---

## 🧪 STEP 6: TEST YOUR DEPLOYMENT

### Test Database Connection:
Visit: `https://yoursite.com/test-connection.php`

**Expected Result:**
```json
{
  "database": {
    "status": "connected",
    "connection_test": true,
    "tables_count": 5
  }
}
```

### Test API Endpoints:
- `https://yoursite.com/api/dashboard` - Should return stats
- `https://yoursite.com/api/workers` - Should return worker list

### Test Frontend:
- `https://yoursite.com/` - Should load your app

---

## ✅ STEP 7: VERIFY EVERYTHING WORKS

### Test Adding Data:
1. **Open your website**: `https://yoursite.com`
2. **Try adding a worker** - Should work without errors
3. **Try adding an expense** - Should save to database
4. **Check dashboard** - Should show updated stats

---

## 🚨 TROUBLESHOOTING

### If Database Connection Fails:
1. **Check credentials** in `config/database.php`
2. **Verify database exists** in Hostinger control panel
3. **Check user permissions** - user needs full access to database

### If API Doesn't Work:
1. **Check .htaccess uploaded** correctly
2. **Verify file permissions** (644 for PHP files)
3. **Check error logs** in Hostinger control panel

### If Frontend Shows Errors:
1. **Check browser console** for JavaScript errors
2. **Verify API URL** in `client/src/config/production.ts`
3. **Ensure dist/ files uploaded** correctly

---

## 📞 QUICK TEST CHECKLIST

- [ ] Database created and schema imported
- [ ] `config/database.php` has correct credentials
- [ ] All PHP files uploaded to `public_html/`
- [ ] `.htaccess` file uploaded
- [ ] Frontend built with `npm run build`
- [ ] All `dist/` contents uploaded to `public_html/`
- [ ] `test-connection.php` returns success
- [ ] Website loads at your domain
- [ ] Can add/edit workers, expenses, sales
- [ ] Dashboard shows correct data

---

## 🎉 SUCCESS!

If all tests pass, your application is fully deployed and working on Hostinger!

Your users can now access it from any device at: **https://yoursite.com**

---

## 📝 IMPORTANT NOTES

1. **Always use your actual domain** - Replace `yoursite.com` everywhere
2. **Keep database credentials secure** - Don't share them publicly
3. **Test thoroughly** before announcing it's ready
4. **Backup your database** regularly through phpMyAdmin

**Need help?** Check the `test-connection.php` output for detailed diagnostics.