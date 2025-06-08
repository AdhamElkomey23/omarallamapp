#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🏗️  Building Fertilizer Factory Management App...');

// Step 1: Build the frontend and backend
console.log('📦 Building frontend and backend...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

// Step 2: Create standalone executable using pkg
console.log('🔧 Creating standalone executable...');
try {
  // Create pkg configuration
  const pkgConfig = {
    "name": "fertilizer-factory-app",
    "version": "1.0.0",
    "bin": "dist/index.js",
    "pkg": {
      "targets": ["node18-win-x64", "node18-linux-x64", "node18-macos-x64"],
      "outputPath": "build",
      "assets": [
        "dist/client/**/*",
        "package.json"
      ]
    }
  };
  
  fs.writeFileSync('pkg.json', JSON.stringify(pkgConfig, null, 2));
  
  // Build executables
  execSync('npx pkg dist/index.js --targets node18-win-x64,node18-linux-x64,node18-macos-x64 --output build/fertilizer-factory-app', { stdio: 'inherit' });
  console.log('✅ Executables created successfully');
} catch (error) {
  console.error('❌ Executable creation failed:', error.message);
  process.exit(1);
}

// Step 3: Copy static files
console.log('📂 Copying static files...');
try {
  if (!fs.existsSync('build')) {
    fs.mkdirSync('build', { recursive: true });
  }
  
  // Copy client build files
  if (fs.existsSync('dist/client')) {
    execSync('cp -r dist/client build/', { stdio: 'inherit' });
  }
  
  console.log('✅ Static files copied');
} catch (error) {
  console.error('❌ Failed to copy static files:', error.message);
}

// Step 4: Create README for users
console.log('📝 Creating user documentation...');
const readmeContent = `# Fertilizer Factory Management App

## نظام إدارة مصنع الأسمدة

### تشغيل التطبيق / Running the Application

#### Windows:
Double-click \`fertilizer-factory-app.exe\` or run from command line:
\`\`\`
fertilizer-factory-app.exe
\`\`\`

#### Linux:
\`\`\`
./fertilizer-factory-app
\`\`\`

#### macOS:
\`\`\`
./fertilizer-factory-app
\`\`\`

### الوصول للتطبيق / Accessing the App

After running the executable, open your web browser and go to:
http://localhost:5000

### المميزات / Features

- إدارة المخزون / Storage Management
- تتبع المبيعات / Sales Tracking  
- إدارة المصروفات / Expense Management
- إدارة العمال / Worker Management
- التقارير / Reports
- دعم اللغة العربية كاملاً / Full Arabic Language Support

### المتطلبات / Requirements

- No additional software required
- The executable includes all dependencies
- Works offline

### الدعم الفني / Technical Support

For technical support, please contact the development team.

---
شركة الواصلون للتعدين والصناعات الكيميائية
Al-Wasiloon for Mining and Chemical Industries
`;

fs.writeFileSync('build/README.md', readmeContent);
fs.writeFileSync('build/اقرأني.md', readmeContent);

console.log('✅ Documentation created');

// Step 5: Create batch/shell scripts for easy execution
console.log('🚀 Creating startup scripts...');

// Windows batch file
const windowsBatch = `@echo off
echo Starting Fertilizer Factory Management App...
echo نظام إدارة مصنع الأسمدة
echo.
echo The application will start shortly...
echo سيتم تشغيل التطبيق قريباً...
echo.
echo Access the app at: http://localhost:5000
echo ادخل على الرابط: http://localhost:5000
echo.
fertilizer-factory-app.exe
pause
`;

fs.writeFileSync('build/start-app.bat', windowsBatch);

// Linux/macOS shell script
const shellScript = `#!/bin/bash
echo "Starting Fertilizer Factory Management App..."
echo "نظام إدارة مصنع الأسمدة"
echo ""
echo "The application will start shortly..."
echo "سيتم تشغيل التطبيق قريباً..."
echo ""
echo "Access the app at: http://localhost:5000"
echo "ادخل على الرابط: http://localhost:5000"
echo ""
./fertilizer-factory-app
`;

fs.writeFileSync('build/start-app.sh', shellScript);

// Make shell script executable
try {
  execSync('chmod +x build/start-app.sh', { stdio: 'inherit' });
} catch (error) {
  console.log('Note: Could not make shell script executable on this platform');
}

console.log('✅ Startup scripts created');

console.log('\n🎉 Build completed successfully!');
console.log('\n📁 Output directory: build/');
console.log('\n📦 Files created:');
console.log('   - fertilizer-factory-app.exe (Windows)');
console.log('   - fertilizer-factory-app (Linux)');
console.log('   - fertilizer-factory-app (macOS)');
console.log('   - start-app.bat (Windows startup script)');
console.log('   - start-app.sh (Linux/macOS startup script)');
console.log('   - README.md (Documentation)');
console.log('   - اقرأني.md (Arabic Documentation)');

console.log('\n🚀 To run the app:');
console.log('   Windows: Double-click start-app.bat or fertilizer-factory-app.exe');
console.log('   Linux/macOS: Run ./start-app.sh or ./fertilizer-factory-app');
console.log('\n🌐 Access at: http://localhost:5000');