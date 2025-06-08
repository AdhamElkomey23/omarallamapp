#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Creating standalone application package...');

// Step 1: Clean previous builds
if (fs.existsSync('build')) {
  console.log('Cleaning previous build...');
  execSync('rm -rf build', { stdio: 'inherit' });
}

if (fs.existsSync('release')) {
  execSync('rm -rf release', { stdio: 'inherit' });
}

// Step 2: Run the build script
console.log('Running build process...');
try {
  execSync('node build.js', { stdio: 'inherit' });
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}

// Step 3: Create release directory and organize files
console.log('Organizing release files...');
fs.mkdirSync('release', { recursive: true });

// Create Windows package
console.log('Creating Windows package...');
const windowsDir = 'release/Fertilizer-Factory-Windows';
fs.mkdirSync(windowsDir, { recursive: true });

if (fs.existsSync('build/fertilizer-factory-app.exe')) {
  execSync(`cp build/fertilizer-factory-app.exe "${windowsDir}/"`, { stdio: 'inherit' });
}
if (fs.existsSync('build/start-app.bat')) {
  execSync(`cp build/start-app.bat "${windowsDir}/"`, { stdio: 'inherit' });
}
if (fs.existsSync('build/README.md')) {
  execSync(`cp build/README.md "${windowsDir}/"`, { stdio: 'inherit' });
}
if (fs.existsSync('build/اقرأني.md')) {
  execSync(`cp "build/اقرأني.md" "${windowsDir}/"`, { stdio: 'inherit' });
}

// Create Linux package
console.log('Creating Linux package...');
const linuxDir = 'release/Fertilizer-Factory-Linux';
fs.mkdirSync(linuxDir, { recursive: true });

if (fs.existsSync('build/fertilizer-factory-app')) {
  execSync(`cp build/fertilizer-factory-app "${linuxDir}/"`, { stdio: 'inherit' });
  execSync(`chmod +x "${linuxDir}/fertilizer-factory-app"`, { stdio: 'inherit' });
}
if (fs.existsSync('build/start-app.sh')) {
  execSync(`cp build/start-app.sh "${linuxDir}/"`, { stdio: 'inherit' });
  execSync(`chmod +x "${linuxDir}/start-app.sh"`, { stdio: 'inherit' });
}
if (fs.existsSync('build/README.md')) {
  execSync(`cp build/README.md "${linuxDir}/"`, { stdio: 'inherit' });
}
if (fs.existsSync('build/اقرأني.md')) {
  execSync(`cp "build/اقرأني.md" "${linuxDir}/"`, { stdio: 'inherit' });
}

// Step 4: Create zip files
console.log('Creating zip packages...');
try {
  // Windows zip
  if (fs.existsSync(windowsDir)) {
    execSync(`cd release && zip -r "Fertilizer-Factory-Windows.zip" "Fertilizer-Factory-Windows/"`, { stdio: 'inherit' });
    console.log('Windows package created: release/Fertilizer-Factory-Windows.zip');
  }
  
  // Linux zip
  if (fs.existsSync(linuxDir)) {
    execSync(`cd release && zip -r "Fertilizer-Factory-Linux.zip" "Fertilizer-Factory-Linux/"`, { stdio: 'inherit' });
    console.log('Linux package created: release/Fertilizer-Factory-Linux.zip');
  }
} catch (error) {
  console.error('Warning: zip creation failed, files are available in release/ directory');
}

// Step 5: Create installation instructions
const installInstructions = `# Fertilizer Factory Management App
## نظام إدارة مصنع الأسمدة

### Installation Instructions / تعليمات التثبيت

#### Windows Installation:
1. Download "Fertilizer-Factory-Windows.zip"
2. Extract the zip file to a folder of your choice
3. Double-click "start-app.bat" to run the application
4. Open your web browser and go to: http://localhost:5000

#### Linux Installation:
1. Download "Fertilizer-Factory-Linux.zip"
2. Extract the zip file: \`unzip Fertilizer-Factory-Linux.zip\`
3. Make the script executable: \`chmod +x start-app.sh\`
4. Run the application: \`./start-app.sh\`
5. Open your web browser and go to: http://localhost:5000

### Features / المميزات:
- Complete Arabic interface / واجهة عربية كاملة
- Storage management / إدارة المخزون
- Sales tracking / تتبع المبيعات
- Expense management / إدارة المصروفات
- Worker management / إدارة العمال
- Reports and analytics / التقارير والتحليلات
- Offline operation / يعمل بدون إنترنت

### System Requirements / متطلبات النظام:
- Windows 10+ or Linux (Ubuntu 18.04+)
- No additional software installation required
- 100MB free disk space
- Web browser (Chrome, Firefox, Safari, Edge)

### Support / الدعم الفني:
Contact: Al-Wasiloon for Mining and Chemical Industries
شركة الواصلون للتعدين والصناعات الكيميائية
`;

fs.writeFileSync('release/INSTALLATION-GUIDE.md', installInstructions);
fs.writeFileSync('release/دليل-التثبيت.md', installInstructions);

console.log('\nPackaging completed successfully!');
console.log('\nAvailable packages in release/ directory:');
console.log('- Fertilizer-Factory-Windows.zip (Windows users)');
console.log('- Fertilizer-Factory-Linux.zip (Linux users)');
console.log('- INSTALLATION-GUIDE.md (English instructions)');
console.log('- دليل-التثبيت.md (Arabic instructions)');
console.log('\nUsers can download and run the app without any technical setup!');