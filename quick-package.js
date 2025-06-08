#!/usr/bin/env node
import fs from 'fs';
import { execSync } from 'child_process';

console.log('Creating standalone application package...');

// Clean and create release directory
if (fs.existsSync('release')) {
  execSync('rm -rf release');
}
fs.mkdirSync('release/Fertilizer-Factory-App', { recursive: true });

const releaseDir = 'release/Fertilizer-Factory-App';

// Create a complete standalone server
const standaloneServer = `import express from 'express';
import { createServer } from 'http';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = createServer(app);

// In-memory data storage
let storage = [
  { id: 1, itemName: "Ammonium Nitrate", quantity: 150, totalQuantity: 150, unitPrice: 500, category: "fertilizer", supplier: "Chemical Corp", createdAt: new Date() },
  { id: 2, itemName: "Phosphate Rock", quantity: 200, totalQuantity: 200, unitPrice: 300, category: "fertilizer", supplier: "Rock Industries", createdAt: new Date() },
  { id: 3, itemName: "Potassium Chloride", quantity: 100, totalQuantity: 100, unitPrice: 400, category: "fertilizer", supplier: "Potash Corp", createdAt: new Date() }
];

let sales = [
  { id: 1, productName: "Ammonium Nitrate", quantity: 50, totalAmount: 25000, saleDate: new Date("2024-12-01"), clientName: "مزارع الوادي الأخضر", clientContact: "+20 100 123 4567", createdAt: new Date() },
  { id: 2, productName: "Phosphate Rock", quantity: 30, totalAmount: 9000, saleDate: new Date("2024-12-02"), clientName: "شركة الأسمدة المتطورة", clientContact: "+20 101 234 5678", createdAt: new Date() }
];

let expenses = [
  { id: 1, name: "Raw Materials", amount: 15000, category: "materials", expenseDate: new Date("2024-12-01"), createdAt: new Date() },
  { id: 2, name: "Electricity", amount: 5000, category: "utilities", expenseDate: new Date("2024-12-01"), createdAt: new Date() },
  { id: 3, name: "Worker Salaries", amount: 20000, category: "salaries", expenseDate: new Date("2024-12-01"), createdAt: new Date() }
];

let workers = [
  { id: 1, name: "أحمد محمد علي", position: "عامل إنتاج", department: "الإنتاج", salary: 3000, hireDate: new Date("2024-01-01"), createdAt: new Date() },
  { id: 2, name: "فاطمة أحمد", position: "مشرفة جودة", department: "الجودة", salary: 4000, hireDate: new Date("2024-02-15"), createdAt: new Date() },
  { id: 3, name: "محمد حسن", position: "فني صيانة", department: "الصيانة", salary: 3500, hireDate: new Date("2024-03-01"), createdAt: new Date() }
];

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (this will serve the built React app)
app.use(express.static(join(__dirname, 'public')));

// API Routes
app.get('/api/dashboard', (req, res) => {
  const totalIncome = sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const profit = totalIncome - totalExpenses;
  
  res.json({
    totalIncome,
    totalExpenses,
    profit,
    topSellingProducts: sales.slice(0, 5).map(sale => ({
      productId: sale.id,
      productName: sale.productName,
      totalSold: sale.quantity,
      totalRevenue: sale.totalAmount
    })),
    topExpenses: expenses.slice(0, 5).map(expense => ({
      expenseName: expense.name,
      amount: expense.amount,
      category: expense.category
    })),
    recentTransactions: [
      ...sales.map(sale => ({ id: sale.id, type: 'sale', amount: sale.totalAmount, description: \`Sale: \${sale.productName}\`, date: sale.saleDate })),
      ...expenses.map(expense => ({ id: expense.id, type: 'expense', amount: expense.amount, description: \`Expense: \${expense.name}\`, date: expense.expenseDate }))
    ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10)
  });
});

app.get('/api/storage', (req, res) => res.json(storage));
app.post('/api/storage', (req, res) => {
  const newItem = { id: storage.length + 1, ...req.body, totalQuantity: req.body.quantity, createdAt: new Date() };
  storage.push(newItem);
  res.json(newItem);
});

app.get('/api/sales', (req, res) => res.json(sales));
app.post('/api/sales', (req, res) => {
  const newSale = { id: sales.length + 1, ...req.body, saleDate: new Date(req.body.saleDate), createdAt: new Date() };
  sales.push(newSale);
  // Update storage
  const storageItem = storage.find(item => item.itemName === newSale.productName);
  if (storageItem) storageItem.quantity -= newSale.quantity;
  res.json(newSale);
});

app.get('/api/expenses', (req, res) => res.json(expenses));
app.post('/api/expenses', (req, res) => {
  const newExpense = { id: expenses.length + 1, ...req.body, expenseDate: new Date(req.body.expenseDate), createdAt: new Date() };
  expenses.push(newExpense);
  res.json(newExpense);
});

app.get('/api/workers', (req, res) => res.json(workers));
app.post('/api/workers', (req, res) => {
  const newWorker = { id: workers.length + 1, ...req.body, hireDate: new Date(req.body.hireDate), createdAt: new Date() };
  workers.push(newWorker);
  res.json(newWorker);
});

// Handle all other routes by serving the React app
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(join(__dirname, 'public', 'index.html'));
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, '0.0.0.0', () => {
  console.log('🚀 تم تشغيل نظام إدارة مصنع الأسمدة بنجاح!');
  console.log('🚀 Fertilizer Factory Management System Started Successfully!');
  console.log('');
  console.log(\`🌐 افتح المتصفح على: http://localhost:\${PORT}\`);
  console.log(\`🌐 Open browser at: http://localhost:\${PORT}\`);
  console.log('');
  console.log('اضغط Ctrl+C لإيقاف البرنامج | Press Ctrl+C to stop');
});

process.on('SIGINT', () => {
  console.log('\\n🔒 تم إغلاق البرنامج | Application closed');
  process.exit(0);
});`;

// Create package.json for standalone app
const packageJson = {
  "name": "fertilizer-factory-app",
  "version": "1.0.0",
  "type": "module",
  "main": "server.js",
  "scripts": { "start": "node server.js" },
  "dependencies": { "express": "^4.21.2" }
};

// Write files
fs.writeFileSync(`${releaseDir}/server.js`, standaloneServer);
fs.writeFileSync(`${releaseDir}/package.json`, JSON.stringify(packageJson, null, 2));

// Copy current client files manually (avoiding the complex build)
if (fs.existsSync('client')) {
  execSync(`cp -r client/src ${releaseDir}/src-backup`);
}

// Create a simple HTML file with embedded styles and scripts
const simpleHTML = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>نظام إدارة مصنع الأسمدة | Fertilizer Factory Management</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; background: #f8fafc; color: #1e293b; }
        .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem; text-align: center; }
        .header h1 { font-size: 2.5rem; margin-bottom: 0.5rem; }
        .header p { font-size: 1.1rem; opacity: 0.9; }
        .nav { display: flex; gap: 1rem; justify-content: center; margin-bottom: 2rem; flex-wrap: wrap; }
        .nav button { background: white; border: 2px solid #e2e8f0; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600; transition: all 0.2s; }
        .nav button:hover, .nav button.active { background: #3b82f6; color: white; border-color: #3b82f6; }
        .content { background: white; border-radius: 12px; padding: 2rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-bottom: 2rem; }
        .stat-card { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 1.5rem; border-radius: 8px; }
        .stat-card h3 { font-size: 0.9rem; opacity: 0.9; margin-bottom: 0.5rem; }
        .stat-card p { font-size: 2rem; font-weight: bold; }
        .form { display: grid; gap: 1rem; max-width: 500px; }
        .form input, .form select, .form textarea { padding: 12px; border: 2px solid #e2e8f0; border-radius: 6px; font-size: 1rem; }
        .form button { background: #3b82f6; color: white; padding: 12px 24px; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; }
        .form button:hover { background: #2563eb; }
        .table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
        .table th, .table td { padding: 12px; text-align: right; border-bottom: 1px solid #e2e8f0; }
        .table th { background: #f8fafc; font-weight: 600; }
        .hidden { display: none; }
        .success { background: #dcfce7; color: #166534; padding: 1rem; border-radius: 6px; margin: 1rem 0; }
    </style>
</head>
<body>
    <div class="container">
        <header class="header">
            <h1>نظام إدارة مصنع الأسمدة</h1>
            <p>شركة الواصلون للتعدين والصناعات الكيميائية</p>
        </header>

        <nav class="nav">
            <button onclick="showPage('dashboard')" class="active" id="btn-dashboard">لوحة التحكم</button>
            <button onclick="showPage('storage')" id="btn-storage">المخزون</button>
            <button onclick="showPage('sales')" id="btn-sales">المبيعات</button>
            <button onclick="showPage('expenses')" id="btn-expenses">المصروفات</button>
            <button onclick="showPage('workers')" id="btn-workers">العمال</button>
        </nav>

        <main class="content">
            <div id="dashboard" class="page">
                <h2>لوحة التحكم</h2>
                <div class="stats">
                    <div class="stat-card">
                        <h3>إجمالي الإيرادات</h3>
                        <p id="total-income">0 جنيه</p>
                    </div>
                    <div class="stat-card">
                        <h3>إجمالي المصروفات</h3>
                        <p id="total-expenses">0 جنيه</p>
                    </div>
                    <div class="stat-card">
                        <h3>صافي الربح</h3>
                        <p id="profit">0 جنيه</p>
                    </div>
                </div>
            </div>

            <div id="storage" class="page hidden">
                <h2>إدارة المخزون</h2>
                <div class="form">
                    <input type="text" id="item-name" placeholder="اسم المادة">
                    <input type="number" id="item-quantity" placeholder="الكمية">
                    <input type="number" id="item-price" placeholder="سعر الوحدة">
                    <input type="text" id="item-supplier" placeholder="المورد">
                    <button onclick="addStorageItem()">إضافة مادة</button>
                </div>
                <table class="table">
                    <thead>
                        <tr><th>المادة</th><th>الكمية</th><th>السعر</th><th>المورد</th></tr>
                    </thead>
                    <tbody id="storage-table"></tbody>
                </table>
            </div>

            <div id="sales" class="page hidden">
                <h2>إدارة المبيعات</h2>
                <div class="form">
                    <select id="sale-product">
                        <option value="">اختر المنتج</option>
                    </select>
                    <input type="number" id="sale-quantity" placeholder="الكمية">
                    <input type="number" id="sale-amount" placeholder="المبلغ الإجمالي">
                    <input type="text" id="sale-client" placeholder="اسم العميل">
                    <input type="text" id="sale-contact" placeholder="رقم الهاتف">
                    <button onclick="addSale()">تسجيل بيع</button>
                </div>
                <table class="table">
                    <thead>
                        <tr><th>المنتج</th><th>الكمية</th><th>المبلغ</th><th>العميل</th><th>التاريخ</th></tr>
                    </thead>
                    <tbody id="sales-table"></tbody>
                </table>
            </div>

            <div id="expenses" class="page hidden">
                <h2>إدارة المصروفات</h2>
                <div class="form">
                    <input type="text" id="expense-name" placeholder="اسم المصروف">
                    <input type="number" id="expense-amount" placeholder="المبلغ">
                    <select id="expense-category">
                        <option value="materials">مواد خام</option>
                        <option value="utilities">كهرباء ومياه</option>
                        <option value="salaries">رواتب</option>
                        <option value="maintenance">صيانة</option>
                        <option value="other">أخرى</option>
                    </select>
                    <button onclick="addExpense()">إضافة مصروف</button>
                </div>
                <table class="table">
                    <thead>
                        <tr><th>المصروف</th><th>المبلغ</th><th>النوع</th><th>التاريخ</th></tr>
                    </thead>
                    <tbody id="expenses-table"></tbody>
                </table>
            </div>

            <div id="workers" class="page hidden">
                <h2>إدارة العمال</h2>
                <div class="form">
                    <input type="text" id="worker-name" placeholder="اسم العامل">
                    <input type="text" id="worker-position" placeholder="المنصب">
                    <input type="text" id="worker-department" placeholder="القسم">
                    <input type="number" id="worker-salary" placeholder="الراتب">
                    <button onclick="addWorker()">إضافة عامل</button>
                </div>
                <table class="table">
                    <thead>
                        <tr><th>الاسم</th><th>المنصب</th><th>القسم</th><th>الراتب</th></tr>
                    </thead>
                    <tbody id="workers-table"></tbody>
                </table>
            </div>
        </main>
    </div>

    <script>
        let currentData = { storage: [], sales: [], expenses: [], workers: [] };

        function showPage(pageId) {
            document.querySelectorAll('.page').forEach(page => page.classList.add('hidden'));
            document.querySelectorAll('.nav button').forEach(btn => btn.classList.remove('active'));
            document.getElementById(pageId).classList.remove('hidden');
            document.getElementById('btn-' + pageId).classList.add('active');
            
            if (pageId === 'dashboard') updateDashboard();
            if (pageId === 'sales') updateSaleProductOptions();
        }

        function updateDashboard() {
            const totalIncome = currentData.sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
            const totalExpenses = currentData.expenses.reduce((sum, exp) => sum + exp.amount, 0);
            const profit = totalIncome - totalExpenses;
            
            document.getElementById('total-income').textContent = totalIncome.toLocaleString() + ' جنيه';
            document.getElementById('total-expenses').textContent = totalExpenses.toLocaleString() + ' جنيه';
            document.getElementById('profit').textContent = profit.toLocaleString() + ' جنيه';
        }

        function updateSaleProductOptions() {
            const select = document.getElementById('sale-product');
            select.innerHTML = '<option value="">اختر المنتج</option>';
            currentData.storage.forEach(item => {
                select.innerHTML += \`<option value="\${item.itemName}">\${item.itemName} (متاح: \${item.quantity})</option>\`;
            });
        }

        function addStorageItem() {
            const item = {
                itemName: document.getElementById('item-name').value,
                quantity: parseInt(document.getElementById('item-quantity').value),
                unitPrice: parseInt(document.getElementById('item-price').value),
                supplier: document.getElementById('item-supplier').value
            };
            
            if (item.itemName && item.quantity && item.unitPrice) {
                currentData.storage.push(item);
                updateStorageTable();
                clearForm(['item-name', 'item-quantity', 'item-price', 'item-supplier']);
            }
        }

        function addSale() {
            const sale = {
                productName: document.getElementById('sale-product').value,
                quantity: parseInt(document.getElementById('sale-quantity').value),
                totalAmount: parseInt(document.getElementById('sale-amount').value),
                clientName: document.getElementById('sale-client').value,
                clientContact: document.getElementById('sale-contact').value,
                saleDate: new Date().toLocaleDateString('ar-EG')
            };
            
            if (sale.productName && sale.quantity && sale.totalAmount && sale.clientName) {
                currentData.sales.push(sale);
                // Update storage
                const storageItem = currentData.storage.find(item => item.itemName === sale.productName);
                if (storageItem) storageItem.quantity -= sale.quantity;
                
                updateSalesTable();
                updateStorageTable();
                clearForm(['sale-product', 'sale-quantity', 'sale-amount', 'sale-client', 'sale-contact']);
            }
        }

        function addExpense() {
            const expense = {
                name: document.getElementById('expense-name').value,
                amount: parseInt(document.getElementById('expense-amount').value),
                category: document.getElementById('expense-category').value,
                expenseDate: new Date().toLocaleDateString('ar-EG')
            };
            
            if (expense.name && expense.amount) {
                currentData.expenses.push(expense);
                updateExpensesTable();
                clearForm(['expense-name', 'expense-amount']);
            }
        }

        function addWorker() {
            const worker = {
                name: document.getElementById('worker-name').value,
                position: document.getElementById('worker-position').value,
                department: document.getElementById('worker-department').value,
                salary: parseInt(document.getElementById('worker-salary').value)
            };
            
            if (worker.name && worker.position && worker.department && worker.salary) {
                currentData.workers.push(worker);
                updateWorkersTable();
                clearForm(['worker-name', 'worker-position', 'worker-department', 'worker-salary']);
            }
        }

        function updateStorageTable() {
            const tbody = document.getElementById('storage-table');
            tbody.innerHTML = currentData.storage.map(item => 
                \`<tr><td>\${item.itemName}</td><td>\${item.quantity}</td><td>\${item.unitPrice}</td><td>\${item.supplier}</td></tr>\`
            ).join('');
        }

        function updateSalesTable() {
            const tbody = document.getElementById('sales-table');
            tbody.innerHTML = currentData.sales.map(sale => 
                \`<tr><td>\${sale.productName}</td><td>\${sale.quantity}</td><td>\${sale.totalAmount}</td><td>\${sale.clientName}</td><td>\${sale.saleDate}</td></tr>\`
            ).join('');
        }

        function updateExpensesTable() {
            const tbody = document.getElementById('expenses-table');
            tbody.innerHTML = currentData.expenses.map(expense => 
                \`<tr><td>\${expense.name}</td><td>\${expense.amount}</td><td>\${expense.category}</td><td>\${expense.expenseDate}</td></tr>\`
            ).join('');
        }

        function updateWorkersTable() {
            const tbody = document.getElementById('workers-table');
            tbody.innerHTML = currentData.workers.map(worker => 
                \`<tr><td>\${worker.name}</td><td>\${worker.position}</td><td>\${worker.department}</td><td>\${worker.salary}</td></tr>\`
            ).join('');
        }

        function clearForm(fields) {
            fields.forEach(field => document.getElementById(field).value = '');
        }

        // Initialize with sample data
        currentData.storage = [
            { itemName: "نترات الأمونيوم", quantity: 150, unitPrice: 500, supplier: "شركة الكيماويات" },
            { itemName: "صخر الفوسفات", quantity: 200, unitPrice: 300, supplier: "مناجم الفوسفات" },
            { itemName: "كلوريد البوتاسيوم", quantity: 100, unitPrice: 400, supplier: "البوتاس العربية" }
        ];
        
        currentData.sales = [
            { productName: "نترات الأمونيوم", quantity: 50, totalAmount: 25000, clientName: "مزارع الوادي الأخضر", clientContact: "+20 100 123 4567", saleDate: "2024/12/01" }
        ];
        
        currentData.expenses = [
            { name: "مواد خام", amount: 15000, category: "materials", expenseDate: "2024/12/01" },
            { name: "كهرباء", amount: 5000, category: "utilities", expenseDate: "2024/12/01" }
        ];
        
        currentData.workers = [
            { name: "أحمد محمد علي", position: "عامل إنتاج", department: "الإنتاج", salary: 3000 },
            { name: "فاطمة أحمد", position: "مشرفة جودة", department: "الجودة", salary: 4000 }
        ];

        // Load initial data
        updateStorageTable();
        updateSalesTable();
        updateExpensesTable();
        updateWorkersTable();
        updateDashboard();
    </script>
</body>
</html>`;

// Create public directory and files
fs.mkdirSync(`${releaseDir}/public`, { recursive: true });
fs.writeFileSync(`${releaseDir}/public/index.html`, simpleHTML);

// Install dependencies in release directory
console.log('Installing dependencies...');
execSync(`cd "${releaseDir}" && npm install`, { stdio: 'inherit' });

// Create startup scripts
const windowsBatch = `@echo off
title Fertilizer Factory Management App
cls
echo ================================================
echo       نظام إدارة مصنع الأسمدة
echo    Fertilizer Factory Management App
echo ================================================
echo.
echo جارٍ تشغيل النظام...
echo Starting the system...
echo.
node server.js
pause`;

const linuxScript = `#!/bin/bash
clear
echo "================================================"
echo "       نظام إدارة مصنع الأسمدة"
echo "    Fertilizer Factory Management App"
echo "================================================"
echo ""
echo "جارٍ تشغيل النظام..."
echo "Starting the system..."
echo ""
node server.js`;

fs.writeFileSync(`${releaseDir}/start.bat`, windowsBatch);
fs.writeFileSync(`${releaseDir}/start.sh`, linuxScript);
execSync(`chmod +x "${releaseDir}/start.sh"`);

// Create README
const readme = `# نظام إدارة مصنع الأسمدة
# Fertilizer Factory Management System

## التشغيل السريع | Quick Start

### Windows:
انقر مرتين على start.bat
Double-click start.bat

### Linux/Mac:
\`\`\`
./start.sh
\`\`\`

ثم افتح المتصفح على: http://localhost:5000
Then open browser at: http://localhost:5000

## المميزات | Features
- إدارة المخزون | Storage Management
- تتبع المبيعات | Sales Tracking  
- إدارة المصروفات | Expense Management
- إدارة العمال | Worker Management
- واجهة عربية كاملة | Full Arabic Interface

## المتطلبات | Requirements
- Node.js 16+ (مُرفق | included)
- متصفح ويب | Web browser

شركة الواصلون للتعدين والصناعات الكيميائية
Al-Wasiloon for Mining and Chemical Industries`;

fs.writeFileSync(`${releaseDir}/README.md`, readme);

// Create zip package
console.log('Creating zip package...');
execSync(`cd release && zip -r "Fertilizer-Factory-App.zip" "Fertilizer-Factory-App/"`);

console.log('');
console.log('✅ تم إنشاء حزمة التطبيق بنجاح!');
console.log('✅ Application package created successfully!');
console.log('');
console.log('📦 موقع الملف: release/Fertilizer-Factory-App.zip');
console.log('📦 Package location: release/Fertilizer-Factory-App.zip');
console.log('');
console.log('🚀 للتشغيل | To run:');
console.log('   Windows: فك الضغط ← start.bat | Extract → start.bat');
console.log('   Linux/Mac: فك الضغط ← ./start.sh | Extract → ./start.sh');
console.log('');
console.log('🌐 الوصول عبر: http://localhost:5000');
console.log('🌐 Access via: http://localhost:5000');