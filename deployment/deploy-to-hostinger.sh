#!/bin/bash

# Automated Hostinger Deployment Script
# Run this script to prepare everything for deployment

echo "🚀 Starting Hostinger Deployment Preparation..."

# Step 1: Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf dist/
rm -rf deployment/hostinger-ready/

# Step 2: Build the React frontend
echo "🏗️  Building React frontend..."
npm run build

if [ ! -d "dist" ]; then
    echo "❌ Build failed! Make sure 'npm run build' works."
    exit 1
fi

# Step 3: Create deployment package
echo "📦 Creating deployment package..."
mkdir -p deployment/hostinger-ready

# Copy PHP backend files
echo "📁 Copying PHP backend files..."
cp -r php-backend/* deployment/hostinger-ready/

# Copy built frontend files
echo "📁 Copying built frontend files..."
cp -r dist/* deployment/hostinger-ready/

# Create configuration template
echo "⚙️  Creating configuration template..."
cat > deployment/hostinger-ready/CONFIGURE-ME.txt << 'EOF'
🔧 CONFIGURATION REQUIRED BEFORE UPLOAD

1. EDIT config/database.php:
   - Change database name to your Hostinger database
   - Change username to your Hostinger database user
   - Change password to your Hostinger database password

2. EDIT assets/index-*.js (find the file in assets/):
   - Search for "yourdomain.com" 
   - Replace with your actual domain name

3. Upload ALL files to your public_html/ directory

4. Import database/schema.sql to your MySQL database

5. Test: visit https://yourdomain.com/test-connection.php
EOF

# Step 4: Show final instructions
echo ""
echo "✅ DEPLOYMENT PACKAGE READY!"
echo ""
echo "📁 Your files are in: deployment/hostinger-ready/"
echo ""
echo "🔧 NEXT STEPS:"
echo "1. Edit deployment/hostinger-ready/config/database.php with your database credentials"
echo "2. Replace 'yourdomain.com' in deployment/hostinger-ready/client/src/config/production.ts"
echo "3. Run this script again to rebuild with your domain"
echo "4. Upload ALL files from deployment/hostinger-ready/ to your public_html/"
echo "5. Import deployment/hostinger-ready/database/schema.sql to MySQL"
echo "6. Test at: https://yourdomain.com/test-connection.php"
echo ""
echo "📖 Full guide: deployment/COMPLETE-DEPLOYMENT-GUIDE.md"