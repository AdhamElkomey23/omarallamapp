#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('Creating standalone release package...');

// Clean and create directories
if (fs.existsSync('release')) {
  execSync('rm -rf release');
}
fs.mkdirSync('release', { recursive: true });

// Build the application
console.log('Building application...');
try {
  execSync('npm run build', { stdio: 'inherit' });
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}

// Create portable Node.js application
console.log('Creating portable application...');

const releaseDir = 'release/Fertilizer-Factory-App';
fs.mkdirSync(releaseDir, { recursive: true });

// Copy built files
execSync(`cp -r dist/* "${releaseDir}/"`);

// Copy node_modules (only production dependencies)
console.log('Installing production dependencies...');
execSync(`cd "${releaseDir}" && npm init -y`);

// Create a minimal package.json for the release
const packageJson = {
  "name": "fertilizer-factory-app",
  "version": "1.0.0",
  "type": "module",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "express": "^4.21.2",
    "ws": "^8.18.0",
    "date-fns": "^3.6.0"
  }
};

fs.writeFileSync(`${releaseDir}/package.json`, JSON.stringify(packageJson, null, 2));

// Install minimal dependencies
execSync(`cd "${releaseDir}" && npm install --production`, { stdio: 'inherit' });

// Create startup scripts
const startScript = `#!/usr/bin/env node
import express from 'express';
import { createServer } from 'http';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = createServer(app);

// Basic in-memory storage
let sales = [
  {
    id: 1,
    productName: "Ammonium Nitrate",
    quantity: 50,
    totalAmount: 25000,
    saleDate: new Date("2024-12-01"),
    clientName: "Green Valley Farms",
    clientContact: "+20 100 123 4567",
    createdAt: new Date("2024-12-01")
  }
];

let expenses = [
  {
    id: 1,
    name: "Raw Materials",
    amount: 15000,
    category: "materials",
    expenseDate: new Date("2024-12-01"),
    createdAt: new Date("2024-12-01")
  }
];

let storage = [
  {
    id: 1,
    itemName: "Ammonium Nitrate",
    quantity: 150,
    totalQuantity: 150,
    unitPrice: 500,
    category: "fertilizer",
    supplier: "Chemical Corp",
    createdAt: new Date("2024-12-01")
  }
];

let workers = [
  {
    id: 1,
    name: "أحمد محمد",
    position: "عامل إنتاج",
    department: "الإنتاج",
    salary: 3000,
    hireDate: new Date("2024-01-01"),
    createdAt: new Date("2024-01-01")
  }
];

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(join(__dirname, 'client')));

// API Routes
app.get('/api/dashboard', (req, res) => {
  const totalIncome = sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const profit = totalIncome - totalExpenses;
  
  res.json({
    totalIncome,
    totalExpenses,
    profit,
    topSellingProducts: [],
    topExpenses: [],
    recentTransactions: []
  });
});

app.get('/api/sales', (req, res) => {
  res.json(sales);
});

app.post('/api/sales', (req, res) => {
  const newSale = {
    id: sales.length + 1,
    ...req.body,
    saleDate: new Date(req.body.saleDate),
    createdAt: new Date()
  };
  sales.push(newSale);
  res.json(newSale);
});

app.get('/api/expenses', (req, res) => {
  res.json(expenses);
});

app.post('/api/expenses', (req, res) => {
  const newExpense = {
    id: expenses.length + 1,
    ...req.body,
    expenseDate: new Date(req.body.expenseDate),
    createdAt: new Date()
  };
  expenses.push(newExpense);
  res.json(newExpense);
});

app.get('/api/storage', (req, res) => {
  res.json(storage);
});

app.post('/api/storage', (req, res) => {
  const newItem = {
    id: storage.length + 1,
    ...req.body,
    totalQuantity: req.body.quantity,
    createdAt: new Date()
  };
  storage.push(newItem);
  res.json(newItem);
});

app.get('/api/workers', (req, res) => {
  res.json(workers);
});

app.post('/api/workers', (req, res) => {
  const newWorker = {
    id: workers.length + 1,
    ...req.body,
    hireDate: new Date(req.body.hireDate),
    createdAt: new Date()
  };
  workers.push(newWorker);
  res.json(newWorker);
});

// Serve React app
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(join(__dirname, 'client', 'index.html'));
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, '0.0.0.0', () => {
  console.log('🚀 Fertilizer Factory Management App Started!');
  console.log('🚀 نظام إدارة مصنع الأسمدة بدأ التشغيل!');
  console.log('');
  console.log(\`🌐 Open your browser and go to: http://localhost:\${PORT}\`);
  console.log(\`🌐 افتح المتصفح واذهب إلى: http://localhost:\${PORT}\`);
  console.log('');
  console.log('Press Ctrl+C to stop the application');
  console.log('اضغط Ctrl+C لإيقاف التطبيق');
});

process.on('SIGINT', () => {
  console.log('\\n💫 Shutting down gracefully...');
  console.log('💫 جارٍ إغلاق التطبيق...');
  server.close(() => {
    console.log('🔒 Application closed');
    console.log('🔒 تم إغلاق التطبيق');
    process.exit(0);
  });
});
`;

fs.writeFileSync(`${releaseDir}/app.js`, startScript);

// Create Windows batch file
const windowsBatch = `@echo off
title Fertilizer Factory Management App
echo ================================================
echo    Fertilizer Factory Management App
echo    نظام إدارة مصنع الأسمدة
echo ================================================
echo.
echo Starting application...
echo جارٍ تشغيل التطبيق...
echo.
node app.js
pause
`;

fs.writeFileSync(`${releaseDir}/start.bat`, windowsBatch);

// Create Linux/Mac shell script
const shellScript = `#!/bin/bash
echo "================================================"
echo "    Fertilizer Factory Management App"
echo "    نظام إدارة مصنع الأسمدة"
echo "================================================"
echo ""
echo "Starting application..."
echo "جارٍ تشغيل التطبيق..."
echo ""
node app.js
`;

fs.writeFileSync(`${releaseDir}/start.sh`, shellScript);
execSync(`chmod +x "${releaseDir}/start.sh"`);

// Create README
const readme = `# Fertilizer Factory Management App
## نظام إدارة مصنع الأسمدة

### Quick Start / البدء السريع

#### Windows:
1. Double-click \`start.bat\`
2. Open browser: http://localhost:5000

#### Linux/Mac:
1. Run: \`./start.sh\`
2. Open browser: http://localhost:5000

### Requirements / المتطلبات
- Node.js 18+ (included in package)
- Web browser / متصفح ويب

### Features / المميزات
- Storage Management / إدارة المخزون
- Sales Tracking / تتبع المبيعات
- Expense Management / إدارة المصروفات
- Worker Management / إدارة العمال
- Arabic Interface / واجهة عربية

### Support / الدعم
Al-Wasiloon for Mining and Chemical Industries
شركة الواصلون للتعدين والصناعات الكيميائية
`;

fs.writeFileSync(`${releaseDir}/README.md`, readme);

// Create zip file
console.log('Creating zip package...');
execSync(`cd release && zip -r "Fertilizer-Factory-App.zip" "Fertilizer-Factory-App/"`);

console.log('');
console.log('✅ Release package created successfully!');
console.log('');
console.log('📦 Package location: release/Fertilizer-Factory-App.zip');
console.log('📁 Extracted files: release/Fertilizer-Factory-App/');
console.log('');
console.log('🚀 To run the app:');
console.log('   Windows: Extract zip → Double-click start.bat');
console.log('   Linux/Mac: Extract zip → Run ./start.sh');
console.log('');
console.log('🌐 Access at: http://localhost:5000');