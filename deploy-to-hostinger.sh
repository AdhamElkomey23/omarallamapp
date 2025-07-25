#!/bin/bash

# Automated deployment script for Hostinger
echo "🚀 Starting Hostinger deployment preparation..."

# Create deployment directory
rm -rf deployment/hostinger-ready
mkdir -p deployment/hostinger-ready

echo "📦 Building React frontend..."
# Build the React app
npm run build

if [ ! -d "dist" ]; then
    echo "❌ Build failed! dist/ folder not created."
    exit 1
fi

echo "📁 Copying PHP backend files..."
# Copy PHP backend files
cp -r php-backend/* deployment/hostinger-ready/

echo "📁 Copying built frontend files..."
# Copy built frontend files to the same directory
cp -r dist/* deployment/hostinger-ready/

echo "📝 Creating deployment instructions..."
# Create a deployment checklist file
cat > deployment/hostinger-ready/DEPLOYMENT-CHECKLIST.txt << 'EOF'
HOSTINGER DEPLOYMENT CHECKLIST
==============================

✅ BEFORE UPLOADING:
1. Update your domain in client/src/config/production.ts
2. Make sure you've run: npm run build
3. Create MySQL database in Hostinger control panel
4. Import php-backend/database/schema.sql to your database

✅ UPLOAD THESE FILES TO public_html/:
- All files from this folder (hostinger-ready/) go to public_html/
- Make sure .htaccess file is included
- Verify config/database.php is present

✅ CONFIGURE DATABASE:
1. Edit config/database.php with your Hostinger database credentials:
   - Host: localhost (usually)
   - Database name: your_database_name
   - Username: your_database_user
   - Password: your_secure_password

✅ TEST YOUR DEPLOYMENT:
1. Visit: https://yourdomain.com/test-connection.php
   Should show: "status": "connected"
2. Visit: https://yourdomain.com/api/dashboard
   Should return JSON data
3. Visit: https://yourdomain.com/
   Should load your application

✅ TROUBLESHOOTING:
- If database connection fails: Check credentials in config/database.php
- If API doesn't work: Ensure .htaccess is uploaded
- If website doesn't load: Check that index.html is in public_html/

🎉 SUCCESS INDICATORS:
- Can add/edit workers without errors
- Dashboard shows correct statistics
- Data persists after refresh
- Accessible from any device at your domain
EOF

echo "✅ Deployment package ready!"
echo ""
echo "📋 Next Steps:"
echo "1. Update your domain in client/src/config/production.ts"
echo "2. Run this script again after updating domain"
echo "3. Upload all files from deployment/hostinger-ready/ to your public_html/"
echo "4. Update database credentials in config/database.php on your server"
echo "5. Import database/schema.sql to your MySQL database"
echo "6. Test at https://yourdomain.com/test-connection.php"
echo ""
echo "📁 Files ready in: deployment/hostinger-ready/"
ls -la deployment/hostinger-ready/