// Application data
let appData = {
    storage: [],
    sales: [],
    expenses: [],
    workers: []
};

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    updateDashboard();
    updateAllTables();
    setCurrentDate();
});

// Load data from API
async function loadData() {
    try {
        const response = await fetch('/api/dashboard');
        if (response.ok) {
            // Load individual datasets
            appData.storage = await fetch('/api/storage').then(r => r.json());
            appData.sales = await fetch('/api/sales').then(r => r.json());
            appData.expenses = await fetch('/api/expenses').then(r => r.json());
            appData.workers = await fetch('/api/workers').then(r => r.json());
        }
    } catch (error) {
        console.log('Using offline mode');
        // Initialize with sample data for offline mode
        appData = {
            storage: [
                { id: 1, itemName: "نترات الأمونيوم", quantity: 150, totalQuantity: 150, unitPrice: 500, category: "fertilizer", supplier: "شركة الكيماويات" },
                { id: 2, itemName: "صخر الفوسفات", quantity: 200, totalQuantity: 200, unitPrice: 300, category: "fertilizer", supplier: "مناجم الفوسفات" },
                { id: 3, itemName: "كلوريد البوتاسيوم", quantity: 100, totalQuantity: 100, unitPrice: 400, category: "fertilizer", supplier: "البوتاس العربية" }
            ],
            sales: [
                { id: 1, productName: "نترات الأمونيوم", quantity: 50, totalAmount: 25000, saleDate: "2024-12-01", clientName: "مزارع الوادي الأخضر", clientContact: "+20 100 123 4567" },
                { id: 2, productName: "صخر الفوسفات", quantity: 30, totalAmount: 9000, saleDate: "2024-12-02", clientName: "شركة الأسمدة المتطورة", clientContact: "+20 101 234 5678" }
            ],
            expenses: [
                { id: 1, name: "مواد خام", amount: 15000, category: "materials", expenseDate: "2024-12-01" },
                { id: 2, name: "كهرباء ومياه", amount: 5000, category: "utilities", expenseDate: "2024-12-01" },
                { id: 3, name: "رواتب العمال", amount: 20000, category: "salaries", expenseDate: "2024-12-01" }
            ],
            workers: [
                { id: 1, name: "أحمد محمد علي", position: "عامل إنتاج", department: "الإنتاج", salary: 3000, hireDate: "2024-01-01" },
                { id: 2, name: "فاطمة أحمد", position: "مشرفة جودة", department: "الجودة", salary: 4000, hireDate: "2024-02-15" },
                { id: 3, name: "محمد حسن", position: "فني صيانة", department: "الصيانة", salary: 3500, hireDate: "2024-03-01" }
            ]
        };
    }
}

// Navigation functions
function showPanel(panelId) {
    // Hide all panels
    document.querySelectorAll('.panel').forEach(panel => {
        panel.classList.remove('active');
    });
    
    // Remove active class from all tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected panel
    document.getElementById(panelId).classList.add('active');
    
    // Add active class to clicked tab
    event.target.classList.add('active');
    
    // Update specific panel data
    if (panelId === 'dashboard') updateDashboard();
    if (panelId === 'sales') updateSalesProductOptions();
}

// Dashboard functions
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
    tbody.innerHTML = appData.storage.map(item => `
        <tr>
            <td>${item.itemName}</td>
            <td>${item.quantity} طن</td>
            <td>${item.unitPrice.toLocaleString()} جنيه</td>
            <td>${item.supplier}</td>
            <td>${(item.quantity * item.unitPrice).toLocaleString()} جنيه</td>
        </tr>
    `).join('');
}

async function addStorageItem() {
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
        itemName,
        quantity,
        totalQuantity: quantity,
        unitPrice,
        supplier,
        category: 'fertilizer'
    };
    
    try {
        const response = await fetch('/api/storage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newItem)
        });
        
        if (response.ok) {
            appData.storage.push(newItem);
        }
    } catch (error) {
        appData.storage.push(newItem);
    }
    
    updateStorageTable();
    updateSalesProductOptions();
    clearStorageForm();
    showSuccessMessage('تم إضافة المادة بنجاح');
}

function clearStorageForm() {
    document.getElementById('storage-item-name').value = '';
    document.getElementById('storage-quantity').value = '';
    document.getElementById('storage-price').value = '';
    document.getElementById('storage-supplier').value = '';
}

// Sales functions
function updateSalesTable() {
    const tbody = document.getElementById('sales-table-body');
    tbody.innerHTML = appData.sales.map(sale => `
        <tr>
            <td>${sale.productName}</td>
            <td>${sale.quantity} طن</td>
            <td>${sale.totalAmount.toLocaleString()} جنيه</td>
            <td>${sale.clientName}</td>
            <td>${sale.clientContact || '-'}</td>
            <td>${formatDate(sale.saleDate)}</td>
        </tr>
    `).join('');
}

function updateSalesProductOptions() {
    const select = document.getElementById('sales-product');
    select.innerHTML = '<option value="">اختر المنتج</option>';
    appData.storage.forEach(item => {
        if (item.quantity > 0) {
            select.innerHTML += `<option value="${item.itemName}">${item.itemName} (متاح: ${item.quantity} طن)</option>`;
        }
    });
}

async function addSale() {
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
    
    // Check stock availability
    const storageItem = appData.storage.find(item => item.itemName === productName);
    if (!storageItem || storageItem.quantity < quantity) {
        alert('الكمية المطلوبة غير متوفرة في المخزون');
        return;
    }
    
    const newSale = {
        id: appData.sales.length + 1,
        productName,
        quantity,
        totalAmount,
        clientName,
        clientContact,
        saleDate
    };
    
    try {
        const response = await fetch('/api/sales', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newSale)
        });
        
        if (response.ok) {
            appData.sales.push(newSale);
            storageItem.quantity -= quantity;
        }
    } catch (error) {
        appData.sales.push(newSale);
        storageItem.quantity -= quantity;
    }
    
    updateSalesTable();
    updateStorageTable();
    updateSalesProductOptions();
    updateDashboard();
    clearSalesForm();
    showSuccessMessage('تم تسجيل البيع بنجاح');
}

function clearSalesForm() {
    document.getElementById('sales-product').value = '';
    document.getElementById('sales-quantity').value = '';
    document.getElementById('sales-amount').value = '';
    document.getElementById('sales-client').value = '';
    document.getElementById('sales-contact').value = '';
    document.getElementById('sales-date').value = '';
}

// Expenses functions
function updateExpensesTable() {
    const tbody = document.getElementById('expenses-table-body');
    tbody.innerHTML = appData.expenses.map(expense => `
        <tr>
            <td>${expense.name}</td>
            <td>${expense.amount.toLocaleString()} جنيه</td>
            <td>${getCategoryNameArabic(expense.category)}</td>
            <td>${formatDate(expense.expenseDate)}</td>
        </tr>
    `).join('');
}

async function addExpense() {
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
        name,
        amount,
        category,
        expenseDate
    };
    
    try {
        const response = await fetch('/api/expenses', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newExpense)
        });
        
        if (response.ok) {
            appData.expenses.push(newExpense);
        }
    } catch (error) {
        appData.expenses.push(newExpense);
    }
    
    updateExpensesTable();
    updateDashboard();
    clearExpensesForm();
    showSuccessMessage('تم إضافة المصروف بنجاح');
}

function clearExpensesForm() {
    document.getElementById('expense-name').value = '';
    document.getElementById('expense-amount').value = '';
    document.getElementById('expense-category').value = 'materials';
    document.getElementById('expense-date').value = '';
}

// Workers functions
function updateWorkersTable() {
    const tbody = document.getElementById('workers-table-body');
    tbody.innerHTML = appData.workers.map(worker => `
        <tr>
            <td>${worker.name}</td>
            <td>${worker.position}</td>
            <td>${worker.department}</td>
            <td>${worker.salary.toLocaleString()} جنيه</td>
            <td>${formatDate(worker.hireDate)}</td>
        </tr>
    `).join('');
}

async function addWorker() {
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
        name,
        position,
        department,
        salary,
        hireDate
    };
    
    try {
        const response = await fetch('/api/workers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newWorker)
        });
        
        if (response.ok) {
            appData.workers.push(newWorker);
        }
    } catch (error) {
        appData.workers.push(newWorker);
    }
    
    updateWorkersTable();
    clearWorkersForm();
    showSuccessMessage('تم إضافة العامل بنجاح');
}

function clearWorkersForm() {
    document.getElementById('worker-name').value = '';
    document.getElementById('worker-position').value = '';
    document.getElementById('worker-department').value = 'الإنتاج';
    document.getElementById('worker-salary').value = '';
    document.getElementById('worker-hire-date').value = '';
}

// Utility functions
function updateAllTables() {
    updateStorageTable();
    updateSalesTable();
    updateExpensesTable();
    updateWorkersTable();
}

function setCurrentDate() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('sales-date').value = today;
    document.getElementById('expense-date').value = today;
    document.getElementById('worker-hire-date').value = today;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG');
}

function getCategoryNameArabic(category) {
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

function showSuccessMessage(message) {
    // Create and show success message
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    
    // Insert at the top of the current panel
    const activePanel = document.querySelector('.panel.active');
    activePanel.insertBefore(successDiv, activePanel.firstChild);
    
    // Remove after 3 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}