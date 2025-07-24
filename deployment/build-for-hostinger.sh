#!/bin/bash

# Build script for Hostinger deployment

echo "🏗️  Building React frontend for production..."

# Build the React app
npm run build

echo "📁 Creating deployment package..."

# Create deployment directory
mkdir -p deployment/hostinger-package

# Copy PHP backend files
cp -r php-backend/* deployment/hostinger-package/

# Copy built frontend files
cp -r dist/* deployment/hostinger-package/

echo "📦 Deployment package created in deployment/hostinger-package/"
echo ""
echo "📋 Next steps:"
echo "1. Update database credentials in deployment/hostinger-package/config/database.php"
echo "2. Upload all files from deployment/hostinger-package/ to your Hostinger public_html directory"
echo "3. Import deployment/hostinger-package/database/schema.sql to your MySQL database"
echo "4. Visit your domain to test the application"
echo ""
echo "✅ Deployment package ready for Hostinger!"