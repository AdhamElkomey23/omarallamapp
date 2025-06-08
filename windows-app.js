#!/usr/bin/env node
import fs from 'fs';
import { execSync } from 'child_process';

console.log('Creating Windows Desktop Application...');

// Create app directory
if (fs.existsSync('fertilizer-desktop-app')) {
  execSync('rm -rf fertilizer-desktop-app');
}
fs.mkdirSync('fertilizer-desktop-app', { recursive: true });

// Create a complete HTML desktop application
const desktopHTML = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>نظام إدارة مصنع الأسمدة - شركة الواصلون</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: 'Cairo', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #2d3748;
            min-height: 100vh;
            direction: rtl;
            overflow-x: hidden;
        }
        
        .app-container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .header {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 30px;
            margin-bottom: 30px;
            text-align: center;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
        
        .header h1 {
            font-size: 2.5rem;
            font-weight: 700;
            color: #2d3748;
            margin-bottom: 10px;
        }
        
        .header p {
            font-size: 1.1rem;
            color: #4a5568;
            font-weight: 300;
        }
        
        .nav-tabs {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-bottom: 30px;
            flex-wrap: wrap;
        }
        
        .nav-tab {
            background: rgba(255, 255, 255, 0.9);
            border: none;
            padding: 15px 30px;
            border-radius: 15px;
            font-weight: 600;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }
        
        .nav-tab:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }
        
        .nav-tab.active {
            background: linear-gradient(135deg, #4299e1, #3182ce);
            color: white;
        }
        
        .content-panel {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 30px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            min-height: 600px;
        }
        
        .panel { display: none; }
        .panel.active { display: block; }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .stat-card {
            background: linear-gradient(135deg, #48bb78, #38a169);
            color: white;
            padding: 25px;
            border-radius: 15px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }
        
        .stat-card h3 {
            font-size: 0.9rem;
            opacity: 0.9;
            margin-bottom: 10px;
            font-weight: 400;
        }
        
        .stat-card p {
            font-size: 2.2rem;
            font-weight: 700;
        }
        
        .form-container {
            background: #f7fafc;
            padding: 25px;
            border-radius: 15px;
            margin-bottom: 25px;
        }
        
        .form-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 15px;
            margin-bottom: 20px;
        }
        
        .form-field {
            display: flex;
            flex-direction: column;
            gap: 5px;
        }
        
        .form-field label {
            font-weight: 600;
            color: #2d3748;
            font-size: 0.9rem;
        }
        
        .form-field input, .form-field select {
            padding: 12px 15px;
            border: 2px solid #e2e8f0;
            border-radius: 10px;
            font-size: 1rem;
            transition: border-color 0.3s;
        }
        
        .form-field input:focus, .form-field select:focus {
            outline: none;
            border-color: #4299e1;
        }
        
        .btn {
            background: linear-gradient(135deg, #4299e1, #3182ce);
            color: white;
            border: none;
            padding: 12px 25px;
            border-radius: 10px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            font-size: 1rem;
        }
        
        .btn:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 15px rgba(66, 153, 225, 0.4);
        }
        
        .data-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        }
        
        .data-table th, .data-table td {
            padding: 15px;
            text-align: right;
            border-bottom: 1px solid #e2e8f0;
        }
        
        .data-table th {
            background: #f7fafc;
            font-weight: 600;
            color: #2d3748;
        }
        
        .data-table tr:hover {
            background: #f7fafc;
        }
        
        .success-message {
            background: #c6f6d5;
            color: #22543d;
            padding: 15px;
            border-radius: 10px;
            margin: 15px 0;
            border-left: 4px solid #48bb78;
            animation: slideIn 0.3s ease;
        }
        
        @keyframes slideIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .section-title {
            font-size: 1.5rem;
            font-weight: 700;
            color: #2d3748;
            margin-bottom: 20px;
            border-bottom: 3px solid #4299e1;
            padding-bottom: 10px;
        }
        
        .footer {
            text-align: center;
            padding: 20px;
            color: rgba(255, 255, 255, 0.8);
            font-size: 0.9rem;
        }
    </style>
</head>
<body>
    <div class="app-container">
        <header class="header">
            <h1>نظام إدارة مصنع الأسمدة</h1>
            <p>شركة الواصلون للتعدين والصناعات الكيميائية</p>
        </header>

        <nav class="nav-tabs">
            <button class="nav-tab active" onclick="showPanel('dashboard')">لوحة التحكم</button>
            <button class="nav-tab" onclick="showPanel('storage')">إدارة المخزون</button>
            <button class="nav-tab" onclick="showPanel('sales')">إدارة المبيعات</button>
            <button class="nav-tab" onclick="showPanel('expenses')">إدارة المصروفات</button>
            <button class="nav-tab" onclick="showPanel('workers')">إدارة العمال</button>
        </nav>

        <main class="content-panel">
            <!-- Dashboard Panel -->
            <div id="dashboard" class="panel active">
                <h2 class="section-title">لوحة التحكم الرئيسية</h2>
                <div class="stats-grid">
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

            <!-- Storage Panel -->
            <div id="storage" class="panel">
                <h2 class="section-title">إدارة المخزون</h2>
                <div class="form-container">
                    <div class="form-grid">
                        <div class="form-field">
                            <label>اسم المادة</label>
                            <input type="text" id="storage-item-name" placeholder="مثال: نترات الأمونيوم">
                        </div>
                        <div class="form-field">
                            <label>الكمية (طن)</label>
                            <input type="number" id="storage-quantity" placeholder="100">
                        </div>
                        <div class="form-field">
                            <label>سعر الوحدة (جنيه)</label>
                            <input type="number" id="storage-price" placeholder="500">
                        </div>
                        <div class="form-field">
                            <label>المورد</label>
                            <input type="text" id="storage-supplier" placeholder="اسم المورد">
                        </div>
                    </div>
                    <button class="btn" onclick="addStorageItem()">إضافة مادة جديدة</button>
                </div>
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>المادة</th>
                            <th>الكمية المتاحة</th>
                            <th>سعر الوحدة</th>
                            <th>المورد</th>
                            <th>القيمة الإجمالية</th>
                        </tr>
                    </thead>
                    <tbody id="storage-table-body"></tbody>
                </table>
            </div>

            <!-- Sales Panel -->
            <div id="sales" class="panel">
                <h2 class="section-title">إدارة المبيعات</h2>
                <div class="form-container">
                    <div class="form-grid">
                        <div class="form-field">
                            <label>المنتج</label>
                            <select id="sales-product">
                                <option value="">اختر المنتج</option>
                            </select>
                        </div>
                        <div class="form-field">
                            <label>الكمية (طن)</label>
                            <input type="number" id="sales-quantity" placeholder="50">
                        </div>
                        <div class="form-field">
                            <label>المبلغ الإجمالي (جنيه)</label>
                            <input type="number" id="sales-amount" placeholder="25000">
                        </div>
                        <div class="form-field">
                            <label>اسم العميل</label>
                            <input type="text" id="sales-client" placeholder="اسم العميل">
                        </div>
                        <div class="form-field">
                            <label>رقم الهاتف</label>
                            <input type="text" id="sales-contact" placeholder="+20 100 123 4567">
                        </div>
                        <div class="form-field">
                            <label>تاريخ البيع</label>
                            <input type="date" id="sales-date">
                        </div>
                    </div>
                    <button class="btn" onclick="addSale()">تسجيل بيع جديد</button>
                </div>
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>المنتج</th>
                            <th>الكمية</th>
                            <th>المبلغ</th>
                            <th>العميل</th>
                            <th>رقم الهاتف</th>
                            <th>التاريخ</th>
                        </tr>
                    </thead>
                    <tbody id="sales-table-body"></tbody>
                </table>
            </div>

            <!-- Expenses Panel -->
            <div id="expenses" class="panel">
                <h2 class="section-title">إدارة المصروفات</h2>
                <div class="form-container">
                    <div class="form-grid">
                        <div class="form-field">
                            <label>اسم المصروف</label>
                            <input type="text" id="expense-name" placeholder="مثال: كهرباء ومياه">
                        </div>
                        <div class="form-field">
                            <label>المبلغ (جنيه)</label>
                            <input type="number" id="expense-amount" placeholder="5000">
                        </div>
                        <div class="form-field">
                            <label>نوع المصروف</label>
                            <select id="expense-category">
                                <option value="materials">مواد خام</option>
                                <option value="utilities">كهرباء ومياه</option>
                                <option value="salaries">رواتب</option>
                                <option value="maintenance">صيانة</option>
                                <option value="transport">نقل ومواصلات</option>
                                <option value="other">أخرى</option>
                            </select>
                        </div>
                        <div class="form-field">
                            <label>تاريخ المصروف</label>
                            <input type="date" id="expense-date">
                        </div>
                    </div>
                    <button class="btn" onclick="addExpense()">إضافة مصروف جديد</button>
                </div>
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>اسم المصروف</th>
                            <th>المبلغ</th>
                            <th>النوع</th>
                            <th>التاريخ</th>
                        </tr>
                    </thead>
                    <tbody id="expenses-table-body"></tbody>
                </table>
            </div>

            <!-- Workers Panel -->
            <div id="workers" class="panel">
                <h2 class="section-title">إدارة العمال</h2>
                <div class="form-container">
                    <div class="form-grid">
                        <div class="form-field">
                            <label>اسم العامل</label>
                            <input type="text" id="worker-name" placeholder="الاسم الكامل">
                        </div>
                        <div class="form-field">
                            <label>المنصب</label>
                            <input type="text" id="worker-position" placeholder="مثال: عامل إنتاج">
                        </div>
                        <div class="form-field">
                            <label>القسم</label>
                            <select id="worker-department">
                                <option value="الإنتاج">الإنتاج</option>
                                <option value="الجودة">الجودة</option>
                                <option value="الصيانة">الصيانة</option>
                                <option value="المخازن">المخازن</option>
                                <option value="الإدارة">الإدارة</option>
                                <option value="المبيعات">المبيعات</option>
                            </select>
                        </div>
                        <div class="form-field">
                            <label>الراتب الشهري (جنيه)</label>
                            <input type="number" id="worker-salary" placeholder="3000">
                        </div>
                        <div class="form-field">
                            <label>تاريخ التوظيف</label>
                            <input type="date" id="worker-hire-date">
                        </div>
                    </div>
                    <button class="btn" onclick="addWorker()">إضافة عامل جديد</button>
                </div>
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>الاسم</th>
                            <th>المنصب</th>
                            <th>القسم</th>
                            <th>الراتب</th>
                            <th>تاريخ التوظيف</th>
                        </tr>
                    </thead>
                    <tbody id="workers-table-body"></tbody>
                </table>
            </div>
        </main>

        <footer class="footer">
            <p>شركة الواصلون للتعدين والصناعات الكيميائية - نظام إدارة مصنع الأسمدة v1.0</p>
        </footer>
    </div>

    <script>
        // Application data with localStorage persistence
        let appData = JSON.parse(localStorage.getItem('fertilizerFactoryData')) || {
            storage: [
                { id: 1, itemName: "نترات الأمونيوم", quantity: 150, unitPrice: 500, supplier: "شركة الكيماويات" },
                { id: 2, itemName: "صخر الفوسفات", quantity: 200, unitPrice: 300, supplier: "مناجم الفوسفات" },
                { id: 3, itemName: "كلوريد البوتاسيوم", quantity: 100, unitPrice: 400, supplier: "البوتاس العربية" }
            ],
            sales: [
                { id: 1, productName: "نترات الأمونيوم", quantity: 50, totalAmount: 25000, clientName: "مزارع الوادي الأخضر", clientContact: "+20 100 123 4567", saleDate: "2024-12-01" }
            ],
            expenses: [
                { id: 1, name: "مواد خام", amount: 15000, category: "materials", expenseDate: "2024-12-01" },
                { id: 2, name: "كهرباء ومياه", amount: 5000, category: "utilities", expenseDate: "2024-12-01" }
            ],
            workers: [
                { id: 1, name: "أحمد محمد علي", position: "عامل إنتاج", department: "الإنتاج", salary: 3000, hireDate: "2024-01-01" }
            ]
        };

        // Save data to localStorage
        function saveData() {
            localStorage.setItem('fertilizerFactoryData', JSON.stringify(appData));
        }

        // Navigation
        function showPanel(panelId) {
            document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
            document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
            document.getElementById(panelId).classList.add('active');
            event.target.classList.add('active');
            
            if (panelId === 'dashboard') updateDashboard();
            if (panelId === 'sales') updateSalesProductOptions();
        }

        // Dashboard
        function updateDashboard() {
            const totalIncome = appData.sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
            const totalExpenses = appData.expenses.reduce((sum, expense) => sum + expense.amount, 0);
            const profit = totalIncome - totalExpenses;
            
            document.getElementById('total-income').textContent = totalIncome.toLocaleString() + ' جنيه';
            document.getElementById('total-expenses').textContent = totalExpenses.toLocaleString() + ' جنيه';
            document.getElementById('profit').textContent = profit.toLocaleString() + ' جنيه';
        }

        // Storage functions
        function updateStorageTable() {
            const tbody = document.getElementById('storage-table-body');
            tbody.innerHTML = appData.storage.map(item => \`
                <tr>
                    <td>\${item.itemName}</td>
                    <td>\${item.quantity} طن</td>
                    <td>\${item.unitPrice.toLocaleString()} جنيه</td>
                    <td>\${item.supplier}</td>
                    <td>\${(item.quantity * item.unitPrice).toLocaleString()} جنيه</td>
                </tr>
            \`).join('');
        }

        function addStorageItem() {
            const itemName = document.getElementById('storage-item-name').value;
            const quantity = parseInt(document.getElementById('storage-quantity').value);
            const unitPrice = parseInt(document.getElementById('storage-price').value);
            const supplier = document.getElementById('storage-supplier').value;
            
            if (!itemName || !quantity || !unitPrice || !supplier) {
                alert('يرجى ملء جميع الحقول');
                return;
            }
            
            const newItem = {
                id: appData.storage.length + 1,
                itemName, quantity, unitPrice, supplier
            };
            
            appData.storage.push(newItem);
            updateStorageTable();
            updateSalesProductOptions();
            clearForm(['storage-item-name', 'storage-quantity', 'storage-price', 'storage-supplier']);
            showSuccess('تم إضافة المادة بنجاح');
            saveData();
        }

        // Sales functions
        function updateSalesTable() {
            const tbody = document.getElementById('sales-table-body');
            tbody.innerHTML = appData.sales.map(sale => \`
                <tr>
                    <td>\${sale.productName}</td>
                    <td>\${sale.quantity} طن</td>
                    <td>\${sale.totalAmount.toLocaleString()} جنيه</td>
                    <td>\${sale.clientName}</td>
                    <td>\${sale.clientContact || '-'}</td>
                    <td>\${formatDate(sale.saleDate)}</td>
                </tr>
            \`).join('');
        }

        function updateSalesProductOptions() {
            const select = document.getElementById('sales-product');
            select.innerHTML = '<option value="">اختر المنتج</option>';
            appData.storage.forEach(item => {
                if (item.quantity > 0) {
                    select.innerHTML += \`<option value="\${item.itemName}">\${item.itemName} (متاح: \${item.quantity} طن)</option>\`;
                }
            });
        }

        function addSale() {
            const productName = document.getElementById('sales-product').value;
            const quantity = parseInt(document.getElementById('sales-quantity').value);
            const totalAmount = parseInt(document.getElementById('sales-amount').value);
            const clientName = document.getElementById('sales-client').value;
            const clientContact = document.getElementById('sales-contact').value;
            const saleDate = document.getElementById('sales-date').value;
            
            if (!productName || !quantity || !totalAmount || !clientName || !saleDate) {
                alert('يرجى ملء جميع الحقول المطلوبة');
                return;
            }
            
            const storageItem = appData.storage.find(item => item.itemName === productName);
            if (!storageItem || storageItem.quantity < quantity) {
                alert('الكمية المطلوبة غير متوفرة في المخزون');
                return;
            }
            
            const newSale = {
                id: appData.sales.length + 1,
                productName, quantity, totalAmount, clientName, clientContact, saleDate
            };
            
            appData.sales.push(newSale);
            storageItem.quantity -= quantity;
            
            updateSalesTable();
            updateStorageTable();
            updateSalesProductOptions();
            updateDashboard();
            clearForm(['sales-product', 'sales-quantity', 'sales-amount', 'sales-client', 'sales-contact', 'sales-date']);
            showSuccess('تم تسجيل البيع بنجاح');
            saveData();
        }

        // Expenses functions
        function updateExpensesTable() {
            const tbody = document.getElementById('expenses-table-body');
            tbody.innerHTML = appData.expenses.map(expense => \`
                <tr>
                    <td>\${expense.name}</td>
                    <td>\${expense.amount.toLocaleString()} جنيه</td>
                    <td>\${getCategoryName(expense.category)}</td>
                    <td>\${formatDate(expense.expenseDate)}</td>
                </tr>
            \`).join('');
        }

        function addExpense() {
            const name = document.getElementById('expense-name').value;
            const amount = parseInt(document.getElementById('expense-amount').value);
            const category = document.getElementById('expense-category').value;
            const expenseDate = document.getElementById('expense-date').value;
            
            if (!name || !amount || !category || !expenseDate) {
                alert('يرجى ملء جميع الحقول');
                return;
            }
            
            const newExpense = {
                id: appData.expenses.length + 1,
                name, amount, category, expenseDate
            };
            
            appData.expenses.push(newExpense);
            updateExpensesTable();
            updateDashboard();
            clearForm(['expense-name', 'expense-amount', 'expense-date']);
            showSuccess('تم إضافة المصروف بنجاح');
            saveData();
        }

        // Workers functions
        function updateWorkersTable() {
            const tbody = document.getElementById('workers-table-body');
            tbody.innerHTML = appData.workers.map(worker => \`
                <tr>
                    <td>\${worker.name}</td>
                    <td>\${worker.position}</td>
                    <td>\${worker.department}</td>
                    <td>\${worker.salary.toLocaleString()} جنيه</td>
                    <td>\${formatDate(worker.hireDate)}</td>
                </tr>
            \`).join('');
        }

        function addWorker() {
            const name = document.getElementById('worker-name').value;
            const position = document.getElementById('worker-position').value;
            const department = document.getElementById('worker-department').value;
            const salary = parseInt(document.getElementById('worker-salary').value);
            const hireDate = document.getElementById('worker-hire-date').value;
            
            if (!name || !position || !department || !salary || !hireDate) {
                alert('يرجى ملء جميع الحقول');
                return;
            }
            
            const newWorker = {
                id: appData.workers.length + 1,
                name, position, department, salary, hireDate
            };
            
            appData.workers.push(newWorker);
            updateWorkersTable();
            clearForm(['worker-name', 'worker-position', 'worker-salary', 'worker-hire-date']);
            showSuccess('تم إضافة العامل بنجاح');
            saveData();
        }

        // Utility functions
        function clearForm(fieldIds) {
            fieldIds.forEach(id => {
                const field = document.getElementById(id);
                if (field.type === 'select-one') {
                    field.selectedIndex = 0;
                } else {
                    field.value = '';
                }
            });
        }

        function formatDate(dateString) {
            return new Date(dateString).toLocaleDateString('ar-EG');
        }

        function getCategoryName(category) {
            const categories = {
                'materials': 'مواد خام',
                'utilities': 'كهرباء ومياه',
                'salaries': 'رواتب',
                'maintenance': 'صيانة',
                'transport': 'نقل ومواصلات',
                'other': 'أخرى'
            };
            return categories[category] || category;
        }

        function showSuccess(message) {
            const successDiv = document.createElement('div');
            successDiv.className = 'success-message';
            successDiv.textContent = message;
            
            const activePanel = document.querySelector('.panel.active');
            activePanel.insertBefore(successDiv, activePanel.firstChild);
            
            setTimeout(() => successDiv.remove(), 3000);
        }

        function setCurrentDate() {
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('sales-date').value = today;
            document.getElementById('expense-date').value = today;
            document.getElementById('worker-hire-date').value = today;
        }

        // Initialize application
        document.addEventListener('DOMContentLoaded', function() {
            updateStorageTable();
            updateSalesTable();
            updateExpensesTable();
            updateWorkersTable();
            updateDashboard();
            updateSalesProductOptions();
            setCurrentDate();
        });
    </script>
</body>
</html>`;

// Write the complete HTML application
fs.writeFileSync('fertilizer-desktop-app/نظام-إدارة-مصنع-الأسمدة.html', desktopHTML);

// Create Windows batch file to run the application
const windowsBatch = `@echo off
title نظام إدارة مصنع الأسمدة
cls
echo ================================================
echo       نظام إدارة مصنع الأسمدة
echo    شركة الواصلون للتعدين والصناعات الكيميائية
echo ================================================
echo.
echo جارٍ تشغيل النظام...
echo Starting the application...
echo.
start "" "نظام-إدارة-مصنع-الأسمدة.html"
echo.
echo تم فتح النظام في المتصفح
echo Application opened in browser
echo.
pause`;

fs.writeFileSync('fertilizer-desktop-app/تشغيل-النظام.bat', windowsBatch);

// Create PowerShell script for alternative launch
const powershellScript = `# Fertilizer Factory Management System Launcher
Write-Host "================================================" -ForegroundColor Green
Write-Host "       نظام إدارة مصنع الأسمدة" -ForegroundColor Cyan
Write-Host "    شركة الواصلون للتعدين والصناعات الكيميائية" -ForegroundColor Yellow
Write-Host "================================================" -ForegroundColor Green
Write-Host ""
Write-Host "جارٍ تشغيل النظام..." -ForegroundColor White
Write-Host "Starting the application..." -ForegroundColor White
Write-Host ""

$htmlFile = Join-Path $PSScriptRoot "نظام-إدارة-مصنع-الأسمدة.html"
Start-Process $htmlFile

Write-Host "تم فتح النظام في المتصفح" -ForegroundColor Green
Write-Host "Application opened in browser" -ForegroundColor Green
Write-Host ""
Read-Host "اضغط Enter للخروج / Press Enter to exit"`;

fs.writeFileSync('fertilizer-desktop-app/تشغيل-النظام.ps1', powershellScript);

// Create README file
const readmeContent = `# نظام إدارة مصنع الأسمدة
## Fertilizer Factory Management System

### تشغيل النظام | Running the System

#### الطريقة الأولى (الأسهل):
انقر مرتين على ملف: تشغيل-النظام.bat
Double-click: تشغيل-النظام.bat

#### الطريقة الثانية:
انقر مرتين على ملف: نظام-إدارة-مصنع-الأسمدة.html
Double-click: نظام-إدارة-مصنع-الأسمدة.html

#### الطريقة الثالثة (PowerShell):
انقر مرتين على ملف: تشغيل-النظام.ps1
Double-click: تشغيل-النظام.ps1

### المميزات | Features:
- إدارة المخزون الكاملة | Complete Storage Management
- تتبع المبيعات والعملاء | Sales and Customer Tracking
- إدارة المصروفات | Expense Management
- إدارة العمال والموظفين | Worker and Employee Management
- لوحة تحكم تفاعلية | Interactive Dashboard
- حفظ البيانات محلياً | Local Data Storage
- واجهة عربية كاملة | Full Arabic Interface
- يعمل بدون إنترنت | Works Offline

### المتطلبات | Requirements:
- نظام تشغيل Windows | Windows Operating System
- أي متصفح ويب | Any Web Browser
- لا يحتاج تثبيت | No Installation Required

### الدعم الفني | Technical Support:
شركة الواصلون للتعدين والصناعات الكيميائية
Al-Wasiloon for Mining and Chemical Industries

### الإصدار | Version: 1.0.0`;

fs.writeFileSync('fertilizer-desktop-app/README.md', readmeContent);

// Create ZIP package
console.log('Creating desktop application package...');
execSync('cd fertilizer-desktop-app && zip -r "../نظام-إدارة-مصنع-الأسمدة-Desktop.zip" .');

console.log('');
console.log('✅ Windows Desktop Application Created Successfully!');
console.log('');
console.log('📦 Package: نظام-إدارة-مصنع-الأسمدة-Desktop.zip');
console.log('📁 Folder: fertilizer-desktop-app/');
console.log('');
console.log('🚀 How to use:');
console.log('1. Extract the ZIP file to any folder');
console.log('2. Double-click "تشغيل-النظام.bat"');
console.log('3. The application opens in your default browser');
console.log('4. All data is saved locally in your browser');
console.log('');
console.log('✨ Features:');
console.log('- Complete Arabic interface');
console.log('- Offline functionality');
console.log('- Data persistence');
console.log('- No installation required');
console.log('- Works on any Windows computer');