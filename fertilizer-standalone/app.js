// Data Storage
const data = {
    sales: [
        {
            id: 1,
            productName: "Ammonium Nitrate",
            quantity: 100,
            totalAmount: 15000,
            saleDate: new Date('2024-01-15'),
            clientName: "Ahmed Mohamed Farm",
            clientContact: "01234567890",
            createdAt: new Date('2024-01-15')
        },
        {
            id: 2,
            productName: "Phosphate Fertilizer",
            quantity: 75,
            totalAmount: 18500,
            saleDate: new Date('2024-01-20'),
            clientName: "Green Valley Agriculture",
            clientContact: "01987654321",
            createdAt: new Date('2024-01-20')
        },
        {
            id: 3,
            productName: "Potassium Chloride",
            quantity: 50,
            totalAmount: 12000,
            saleDate: new Date('2024-02-01'),
            clientName: "Desert Oasis Farms",
            clientContact: "01555444333",
            createdAt: new Date('2024-02-01')
        }
    ],
    expenses: [
        {
            id: 1,
            name: "Electricity Bill",
            amount: 15000,
            category: "utilities",
            expenseDate: new Date('2024-01-10'),
            createdAt: new Date('2024-01-10')
        },
        {
            id: 2,
            name: "Raw Materials Purchase",
            amount: 50000,
            category: "materials",
            expenseDate: new Date('2024-01-15'),
            createdAt: new Date('2024-01-15')
        },
        {
            id: 3,
            name: "Equipment Maintenance",
            amount: 8000,
            category: "maintenance",
            expenseDate: new Date('2024-01-25'),
            createdAt: new Date('2024-01-25')
        },
        {
            id: 4,
            name: "Transportation Costs",
            amount: 12000,
            category: "transport",
            expenseDate: new Date('2024-02-05'),
            createdAt: new Date('2024-02-05')
        },
        {
            id: 5,
            name: "Worker Salaries",
            amount: 35000,
            category: "salaries",
            expenseDate: new Date('2024-02-01'),
            createdAt: new Date('2024-02-01')
        }
    ],
    workers: [
        {
            id: 1,
            name: "محمد أحمد",
            position: "supervisor",
            department: "production",
            salary: 8000,
            phone: "01234567890",
            hireDate: new Date('2023-06-01'),
            createdAt: new Date('2023-06-01')
        },
        {
            id: 2,
            name: "فاطمة علي",
            position: "technician",
            department: "quality",
            salary: 6500,
            phone: "01987654321",
            hireDate: new Date('2023-08-15'),
            createdAt: new Date('2023-08-15')
        },
        {
            id: 3,
            name: "عبدالله محمود",
            position: "operator",
            department: "production",
            salary: 5500,
            phone: "01555444333",
            hireDate: new Date('2023-09-01'),
            createdAt: new Date('2023-09-01')
        },
        {
            id: 4,
            name: "سارة حسن",
            position: "manager",
            department: "administration",
            salary: 12000,
            phone: "01777888999",
            hireDate: new Date('2023-03-01'),
            createdAt: new Date('2023-03-01')
        }
    ],
    storageItems: [
        {
            id: 1,
            itemName: "Ammonium Nitrate",
            itemType: "raw_material",
            quantity: 500,
            unit: "ton",
            minLevel: 50,
            createdAt: new Date('2024-01-01')
        },
        {
            id: 2,
            itemName: "Phosphate Rock",
            itemType: "raw_material",
            quantity: 300,
            unit: "ton",
            minLevel: 100,
            createdAt: new Date('2024-01-01')
        },
        {
            id: 3,
            itemName: "Potassium Chloride",
            itemType: "finished_product",
            quantity: 25,
            unit: "ton",
            minLevel: 30,
            createdAt: new Date('2024-01-01')
        },
        {
            id: 4,
            itemName: "Packaging Bags",
            itemType: "packaging",
            quantity: 1000,
            unit: "piece",
            minLevel: 200,
            createdAt: new Date('2024-01-01')
        }
    ],
    activityLogs: [
        {
            id: 1,
            title: "تم تحديث خط الإنتاج الأول",
            description: "تم إجراء صيانة شاملة لخط الإنتاج الأول وتحديث المعدات",
            logDate: new Date('2024-01-20'),
            createdAt: new Date('2024-01-20')
        },
        {
            id: 2,
            title: "استلام شحنة مواد خام جديدة",
            description: "تم استلام 100 طن من فوسفات الصخور من المورد الرئيسي",
            logDate: new Date('2024-01-25'),
            createdAt: new Date('2024-01-25')
        },
        {
            id: 3,
            title: "اجتماع فريق مراقبة الجودة",
            description: "مراجعة معايير الجودة الجديدة وتحديث إجراءات الفحص",
            logDate: new Date('2024-02-01'),
            createdAt: new Date('2024-02-01')
        }
    ]
};

// Global variables
let currentLanguage = 'ar';
let editingId = null;
let charts = {};

// Translation system
const translations = {
    ar: {
        // Company info
        companyName: "مصنع الواصلون",
        factorySubtitle: "للتعدين والصناعات الكيماوية",
        managementSystem: "نظام الإدارة",
        
        // Navigation
        home: "الرئيسية",
        sales: "المبيعات",
        storage: "المخزون",
        expenses: "المصروفات",
        workers: "العمال",
        activities: "سجل الأنشطة",
        reports: "التقارير",
        
        // Home page
        welcomeTitle: "مرحباً بك في نظام إدارة مصنع الواصلون",
        welcomeSubtitle: "نظام شامل لإدارة العمليات المالية والإنتاجية",
        quickSale: "بيع سريع",
        checkStorage: "فحص المخزون",
        viewReports: "عرض التقارير",
        totalIncome: "إجمالي الإيرادات",
        totalExpenses: "إجمالي المصروفات",
        netProfit: "صافي الربح",
        totalWorkers: "عدد العمال",
        recentActivities: "الأنشطة الحديثة",
        noActivities: "لا توجد أنشطة حديثة",
        activitiesDescription: "ستظهر آخر العمليات والأنشطة هنا",
        
        // Sales
        salesManagement: "إدارة المبيعات",
        addNewSale: "إضافة بيع جديد",
        salesList: "قائمة المبيعات",
        productName: "اسم المنتج",
        quantity: "الكمية",
        totalAmount: "المبلغ الإجمالي",
        saleDate: "تاريخ البيع",
        clientName: "اسم العميل",
        clientContact: "بيانات الاتصال",
        addSale: "إضافة البيع",
        editSale: "تعديل البيع",
        updateSale: "تحديث البيع",
        
        // Storage
        storageManagement: "إدارة المخزون",
        addStorageItem: "إضافة عنصر للمخزون",
        storageList: "قائمة المخزون",
        itemName: "اسم العنصر",
        itemType: "نوع العنصر",
        unit: "الوحدة",
        minLevel: "الحد الأدنى",
        status: "الحالة",
        addItem: "إضافة العنصر",
        rawMaterial: "مادة خام",
        finishedProduct: "منتج نهائي",
        packaging: "تعبئة وتغليف",
        equipment: "معدات",
        kg: "كيلوجرام",
        ton: "طن",
        piece: "قطعة",
        liter: "لتر",
        bag: "كيس",
        inStock: "متوفر",
        lowStock: "مخزون منخفض",
        outOfStock: "نفد المخزون",
        
        // Expenses
        expensesManagement: "إدارة المصروفات",
        addNewExpense: "إضافة مصروف جديد",
        expensesList: "قائمة المصروفات",
        expenseName: "اسم المصروف",
        amount: "المبلغ",
        category: "الفئة",
        expenseDate: "تاريخ المصروف",
        addExpense: "إضافة المصروف",
        operations: "عمليات",
        utilities: "مرافق",
        maintenance: "صيانة",
        salaries: "رواتب",
        materials: "مواد",
        transport: "نقل",
        administrative: "إدارية",
        other: "أخرى",
        
        // Workers
        workersManagement: "إدارة العمال",
        addNewWorker: "إضافة عامل جديد",
        workersList: "قائمة العمال",
        workerName: "اسم العامل",
        position: "المنصب",
        department: "القسم",
        salary: "الراتب",
        phone: "رقم الهاتف",
        hireDate: "تاريخ التوظيف",
        addWorker: "إضافة العامل",
        operator: "مشغل",
        technician: "فني",
        supervisor: "مشرف",
        manager: "مدير",
        maintenanceWorker: "عامل صيانة",
        security: "أمن",
        driver: "سائق",
        cleaner: "عامل نظافة",
        production: "الإنتاج",
        quality: "مراقبة الجودة",
        maintenanceDept: "الصيانة",
        warehouse: "المستودع",
        administrationDept: "الإدارة",
        salesDept: "المبيعات",
        securityDept: "الأمن",
        
        // Activities
        activitiesManagement: "إدارة سجل الأنشطة",
        addNewActivity: "إضافة نشاط جديد",
        activitiesList: "قائمة الأنشطة",
        activityTitle: "عنوان النشاط",
        activityDescription: "وصف النشاط",
        activityDate: "تاريخ النشاط",
        addActivity: "إضافة النشاط",
        
        // Reports
        reportsAnalytics: "التقارير والتحليلات",
        monthlyIncome: "الإيرادات الشهرية",
        monthlyExpenses: "المصروفات الشهرية",
        monthlyProfit: "الربح الشهري",
        storageItems: "عناصر المخزون",
        financialChart: "الرسم البياني المالي",
        exportData: "تصدير البيانات",
        exportSales: "تصدير المبيعات",
        exportExpenses: "تصدير المصروفات",
        exportStorage: "تصدير المخزون",
        exportWorkers: "تصدير العمال",
        
        // Common
        actions: "الإجراءات",
        edit: "تعديل",
        delete: "حذف",
        cancel: "إلغاء",
        save: "حفظ",
        close: "إغلاق",
        loading: "جاري التحميل...",
        success: "تم بنجاح!",
        error: "حدث خطأ!",
        confirm: "تأكيد",
        confirmDelete: "هل أنت متأكد من الحذف؟",
        egp: "ج.م"
    },
    en: {
        // Company info
        companyName: "Al-Wasiloon Factory",
        factorySubtitle: "For Mining & Chemical Industries",
        managementSystem: "Management System",
        
        // Navigation
        home: "Home",
        sales: "Sales",
        storage: "Storage",
        expenses: "Expenses",
        workers: "Workers",
        activities: "Activity Log",
        reports: "Reports",
        
        // Home page
        welcomeTitle: "Welcome to Al-Wasiloon Factory Management System",
        welcomeSubtitle: "Comprehensive system for financial and production operations management",
        quickSale: "Quick Sale",
        checkStorage: "Check Storage",
        viewReports: "View Reports",
        totalIncome: "Total Income",
        totalExpenses: "Total Expenses",
        netProfit: "Net Profit",
        totalWorkers: "Total Workers",
        recentActivities: "Recent Activities",
        noActivities: "No recent activities",
        activitiesDescription: "Latest operations and activities will appear here",
        
        // Sales
        salesManagement: "Sales Management",
        addNewSale: "Add New Sale",
        salesList: "Sales List",
        productName: "Product Name",
        quantity: "Quantity",
        totalAmount: "Total Amount",
        saleDate: "Sale Date",
        clientName: "Client Name",
        clientContact: "Contact Info",
        addSale: "Add Sale",
        editSale: "Edit Sale",
        updateSale: "Update Sale",
        
        // Storage
        storageManagement: "Storage Management",
        addStorageItem: "Add Storage Item",
        storageList: "Storage List",
        itemName: "Item Name",
        itemType: "Item Type",
        unit: "Unit",
        minLevel: "Min Level",
        status: "Status",
        addItem: "Add Item",
        rawMaterial: "Raw Material",
        finishedProduct: "Finished Product",
        packaging: "Packaging",
        equipment: "Equipment",
        kg: "Kilogram",
        ton: "Ton",
        piece: "Piece",
        liter: "Liter",
        bag: "Bag",
        inStock: "In Stock",
        lowStock: "Low Stock",
        outOfStock: "Out of Stock",
        
        // Expenses
        expensesManagement: "Expenses Management",
        addNewExpense: "Add New Expense",
        expensesList: "Expenses List",
        expenseName: "Expense Name",
        amount: "Amount",
        category: "Category",
        expenseDate: "Expense Date",
        addExpense: "Add Expense",
        operations: "Operations",
        utilities: "Utilities",
        maintenance: "Maintenance",
        salaries: "Salaries",
        materials: "Materials",
        transport: "Transport",
        administrative: "Administrative",
        other: "Other",
        
        // Workers
        workersManagement: "Workers Management",
        addNewWorker: "Add New Worker",
        workersList: "Workers List",
        workerName: "Worker Name",
        position: "Position",
        department: "Department",
        salary: "Salary",
        phone: "Phone",
        hireDate: "Hire Date",
        addWorker: "Add Worker",
        operator: "Operator",
        technician: "Technician",
        supervisor: "Supervisor",
        manager: "Manager",
        maintenanceWorker: "Maintenance Worker",
        security: "Security",
        driver: "Driver",
        cleaner: "Cleaner",
        production: "Production",
        quality: "Quality Control",
        maintenanceDept: "Maintenance",
        warehouse: "Warehouse",
        administrationDept: "Administration",
        salesDept: "Sales",
        securityDept: "Security",
        
        // Activities
        activitiesManagement: "Activity Log Management",
        addNewActivity: "Add New Activity",
        activitiesList: "Activities List",
        activityTitle: "Activity Title",
        activityDescription: "Activity Description",
        activityDate: "Activity Date",
        addActivity: "Add Activity",
        
        // Reports
        reportsAnalytics: "Reports & Analytics",
        monthlyIncome: "Monthly Income",
        monthlyExpenses: "Monthly Expenses",
        monthlyProfit: "Monthly Profit",
        storageItems: "Storage Items",
        financialChart: "Financial Chart",
        exportData: "Export Data",
        exportSales: "Export Sales",
        exportExpenses: "Export Expenses",
        exportStorage: "Export Storage",
        exportWorkers: "Export Workers",
        
        // Common
        actions: "Actions",
        edit: "Edit",
        delete: "Delete",
        cancel: "Cancel",
        save: "Save",
        close: "Close",
        loading: "Loading...",
        success: "Success!",
        error: "Error!",
        confirm: "Confirm",
        confirmDelete: "Are you sure you want to delete?",
        egp: "EGP"
    }
};

// Utility Functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('ar-EG', {
        style: 'currency',
        currency: 'EGP',
        minimumFractionDigits: 0
    }).format(amount);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString(currentLanguage === 'ar' ? 'ar-EG' : 'en-US');
}

function getCurrentDate() {
    return new Date().toISOString().split('T')[0];
}

function generateId(array) {
    return Math.max(...array.map(item => item.id), 0) + 1;
}

function saveData() {
    localStorage.setItem('fertilizerFactoryData', JSON.stringify(data));
}

function showSuccessMessage(message) {
    const successMsg = document.getElementById('success-message');
    const successText = document.getElementById('success-text');
    successText.textContent = message;
    successMsg.classList.add('show');
    setTimeout(() => {
        successMsg.classList.remove('show');
    }, 3000);
}

// Language switching
function switchLanguage(lang) {
    currentLanguage = lang;
    const html = document.documentElement;
    const body = document.body;
    
    if (lang === 'en') {
        html.lang = 'en';
        html.dir = 'ltr';
        body.classList.add('ltr');
        document.getElementById('lang-en').classList.add('active');
        document.getElementById('lang-ar').classList.remove('active');
    } else {
        html.lang = 'ar';
        html.dir = 'rtl';
        body.classList.remove('ltr');
        document.getElementById('lang-ar').classList.add('active');
        document.getElementById('lang-en').classList.remove('active');
    }
    
    updateTranslations();
    updateCurrentTime();
    
    // Update charts if they exist
    if (charts.financial) {
        initFinancialChart();
    }
}

function updateTranslations() {
    const elements = document.querySelectorAll('[data-key]');
    elements.forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });
    
    // Update select options
    const selectOptions = document.querySelectorAll('select option[data-key]');
    selectOptions.forEach(option => {
        const key = option.getAttribute('data-key');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            option.textContent = translations[currentLanguage][key];
        }
    });
}

// Page navigation
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Remove active class from all nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Show selected page
    document.getElementById(pageId).classList.add('active');
    
    // Add active class to corresponding nav item
    document.querySelector(`[data-page="${pageId}"]`).classList.add('active');
    
    // Initialize page-specific functionality
    initializePage(pageId);
}

function initializePage(pageId) {
    switch(pageId) {
        case 'home':
            initDashboard();
            break;
        case 'sales':
            initSales();
            break;
        case 'storage':
            initStorage();
            break;
        case 'expenses':
            initExpenses();
            break;
        case 'workers':
            initWorkers();
            break;
        case 'activities':
            initActivityLogs();
            break;
        case 'reports':
            initReports();
            break;
    }
}

// Dashboard initialization
function initDashboard() {
    updateFinancialSummary();
    
    // Set today's date as default
    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach(input => {
        if (!input.value) {
            input.value = getCurrentDate();
        }
    });
}

function updateFinancialSummary() {
    const totalIncome = data.sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
    const totalExpenses = data.expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const netProfit = totalIncome - totalExpenses;
    const totalWorkers = data.workers.length;
    
    document.getElementById('total-income').textContent = formatCurrency(totalIncome);
    document.getElementById('total-expenses').textContent = formatCurrency(totalExpenses);
    document.getElementById('net-profit').textContent = formatCurrency(netProfit);
    document.getElementById('total-workers').textContent = totalWorkers;
}

// Sales Management
function initSales() {
    updateSalesProductOptions();
    updateSalesTable();
    
    // Set today's date as default
    document.getElementById('sale-date').value = getCurrentDate();
    
    // Setup form submission
    const salesForm = document.getElementById('sales-form');
    salesForm.onsubmit = addSale;
    
    // Setup edit form submission
    const editSalesForm = document.getElementById('edit-sale-form');
    editSalesForm.onsubmit = updateSale;
}

function updateSalesProductOptions() {
    // This function would typically populate product options from storage
    // For now, it's a placeholder for future enhancement
}

function updateSalesTable() {
    const tableBody = document.getElementById('sales-table');
    tableBody.innerHTML = '';
    
    data.sales.forEach(sale => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${sale.productName}</td>
            <td>${sale.quantity}</td>
            <td>${formatCurrency(sale.totalAmount)}</td>
            <td>${formatDate(sale.saleDate)}</td>
            <td>${sale.clientName}</td>
            <td class="action-buttons">
                <button class="btn btn-warning" onclick="editSale(${sale.id})">
                    ${translations[currentLanguage].edit}
                </button>
                <button class="btn btn-danger" onclick="deleteSale(${sale.id})">
                    ${translations[currentLanguage].delete}
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function addSale(event) {
    event.preventDefault();
    
    const newSale = {
        id: generateId(data.sales),
        productName: document.getElementById('sale-product').value,
        quantity: parseInt(document.getElementById('sale-quantity').value),
        totalAmount: parseFloat(document.getElementById('sale-amount').value),
        saleDate: new Date(document.getElementById('sale-date').value),
        clientName: document.getElementById('sale-client').value,
        clientContact: document.getElementById('sale-contact').value,
        createdAt: new Date()
    };
    
    data.sales.push(newSale);
    saveData();
    updateSalesTable();
    updateFinancialSummary();
    
    // Reset form
    document.getElementById('sales-form').reset();
    document.getElementById('sale-date').value = getCurrentDate();
    
    showSuccessMessage(translations[currentLanguage].success);
}

function editSale(id) {
    const sale = data.sales.find(s => s.id === id);
    if (!sale) return;
    
    editingId = id;
    
    // Populate edit form
    document.getElementById('edit-sale-product').value = sale.productName;
    document.getElementById('edit-sale-quantity').value = sale.quantity;
    document.getElementById('edit-sale-amount').value = sale.totalAmount;
    document.getElementById('edit-sale-date').value = sale.saleDate.toISOString().split('T')[0];
    document.getElementById('edit-sale-client').value = sale.clientName;
    document.getElementById('edit-sale-contact').value = sale.clientContact || '';
    
    // Show modal
    showModal('edit-sale-modal');
}

function updateSale(event) {
    event.preventDefault();
    
    const saleIndex = data.sales.findIndex(s => s.id === editingId);
    if (saleIndex === -1) return;
    
    data.sales[saleIndex] = {
        ...data.sales[saleIndex],
        productName: document.getElementById('edit-sale-product').value,
        quantity: parseInt(document.getElementById('edit-sale-quantity').value),
        totalAmount: parseFloat(document.getElementById('edit-sale-amount').value),
        saleDate: new Date(document.getElementById('edit-sale-date').value),
        clientName: document.getElementById('edit-sale-client').value,
        clientContact: document.getElementById('edit-sale-contact').value
    };
    
    saveData();
    updateSalesTable();
    updateFinancialSummary();
    closeModal('edit-sale-modal');
    
    showSuccessMessage(translations[currentLanguage].success);
}

function deleteSale(id) {
    if (confirm(translations[currentLanguage].confirmDelete)) {
        data.sales = data.sales.filter(sale => sale.id !== id);
        saveData();
        updateSalesTable();
        updateFinancialSummary();
        showSuccessMessage(translations[currentLanguage].success);
    }
}

// Storage Management
function initStorage() {
    updateStorageTable();
    
    // Setup form submission
    const storageForm = document.getElementById('storage-form');
    storageForm.onsubmit = addStorageItem;
}

function updateStorageTable() {
    const tableBody = document.getElementById('storage-table');
    tableBody.innerHTML = '';
    
    data.storageItems.forEach(item => {
        const status = item.quantity <= item.minLevel ? 
            (item.quantity === 0 ? 'outOfStock' : 'lowStock') : 'inStock';
        
        const statusClass = status === 'outOfStock' ? 'btn-danger' : 
                           status === 'lowStock' ? 'btn-warning' : 'btn-secondary';
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.itemName}</td>
            <td>${translations[currentLanguage][item.itemType]}</td>
            <td>${item.quantity}</td>
            <td>${translations[currentLanguage][item.unit]}</td>
            <td>${item.minLevel}</td>
            <td>
                <span class="btn ${statusClass}" style="font-size: 12px; padding: 4px 8px;">
                    ${translations[currentLanguage][status]}
                </span>
            </td>
            <td class="action-buttons">
                <button class="btn btn-danger" onclick="deleteStorageItem(${item.id})">
                    ${translations[currentLanguage].delete}
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function addStorageItem(event) {
    event.preventDefault();
    
    const newItem = {
        id: generateId(data.storageItems),
        itemName: document.getElementById('storage-item').value,
        itemType: document.getElementById('storage-type').value,
        quantity: parseInt(document.getElementById('storage-quantity').value),
        unit: document.getElementById('storage-unit').value,
        minLevel: parseInt(document.getElementById('storage-min').value),
        createdAt: new Date()
    };
    
    data.storageItems.push(newItem);
    saveData();
    updateStorageTable();
    
    // Reset form
    document.getElementById('storage-form').reset();
    
    showSuccessMessage(translations[currentLanguage].success);
}

function deleteStorageItem(id) {
    if (confirm(translations[currentLanguage].confirmDelete)) {
        data.storageItems = data.storageItems.filter(item => item.id !== id);
        saveData();
        updateStorageTable();
        showSuccessMessage(translations[currentLanguage].success);
    }
}

function getItemTypeLabel(type) {
    return translations[currentLanguage][type] || type;
}

function getUnitLabel(unit) {
    return translations[currentLanguage][unit] || unit;
}

// Expenses Management
function initExpenses() {
    updateExpensesTable();
    
    // Set today's date as default
    document.getElementById('expense-date').value = getCurrentDate();
    
    // Setup form submission
    const expensesForm = document.getElementById('expenses-form');
    expensesForm.onsubmit = addExpense;
}

function updateExpensesTable() {
    const tableBody = document.getElementById('expenses-table');
    tableBody.innerHTML = '';
    
    data.expenses.forEach(expense => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${expense.name}</td>
            <td>${formatCurrency(expense.amount)}</td>
            <td>${translations[currentLanguage][expense.category]}</td>
            <td>${formatDate(expense.expenseDate)}</td>
            <td class="action-buttons">
                <button class="btn btn-danger" onclick="deleteExpense(${expense.id})">
                    ${translations[currentLanguage].delete}
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function addExpense(event) {
    event.preventDefault();
    
    const newExpense = {
        id: generateId(data.expenses),
        name: document.getElementById('expense-name').value,
        amount: parseFloat(document.getElementById('expense-amount').value),
        category: document.getElementById('expense-category').value,
        expenseDate: new Date(document.getElementById('expense-date').value),
        createdAt: new Date()
    };
    
    data.expenses.push(newExpense);
    saveData();
    updateExpensesTable();
    updateFinancialSummary();
    
    // Reset form
    document.getElementById('expenses-form').reset();
    document.getElementById('expense-date').value = getCurrentDate();
    
    showSuccessMessage(translations[currentLanguage].success);
}

function deleteExpense(id) {
    if (confirm(translations[currentLanguage].confirmDelete)) {
        data.expenses = data.expenses.filter(expense => expense.id !== id);
        saveData();
        updateExpensesTable();
        updateFinancialSummary();
        showSuccessMessage(translations[currentLanguage].success);
    }
}

function getCategoryLabel(category) {
    return translations[currentLanguage][category] || category;
}

// Workers Management
function initWorkers() {
    updateWorkersTable();
    
    // Set today's date as default
    document.getElementById('worker-hire-date').value = getCurrentDate();
    
    // Setup form submission
    const workersForm = document.getElementById('workers-form');
    workersForm.onsubmit = addWorker;
}

function updateWorkersTable() {
    const tableBody = document.getElementById('workers-table');
    tableBody.innerHTML = '';
    
    data.workers.forEach(worker => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${worker.name}</td>
            <td>${translations[currentLanguage][worker.position]}</td>
            <td>${translations[currentLanguage][worker.department]}</td>
            <td>${formatCurrency(worker.salary)}</td>
            <td>${worker.phone}</td>
            <td>${formatDate(worker.hireDate)}</td>
            <td class="action-buttons">
                <button class="btn btn-danger" onclick="deleteWorker(${worker.id})">
                    ${translations[currentLanguage].delete}
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function addWorker(event) {
    event.preventDefault();
    
    const newWorker = {
        id: generateId(data.workers),
        name: document.getElementById('worker-name').value,
        position: document.getElementById('worker-position').value,
        department: document.getElementById('worker-department').value,
        salary: parseFloat(document.getElementById('worker-salary').value),
        phone: document.getElementById('worker-phone').value,
        hireDate: new Date(document.getElementById('worker-hire-date').value),
        createdAt: new Date()
    };
    
    data.workers.push(newWorker);
    saveData();
    updateWorkersTable();
    updateFinancialSummary();
    
    // Reset form
    document.getElementById('workers-form').reset();
    document.getElementById('worker-hire-date').value = getCurrentDate();
    
    showSuccessMessage(translations[currentLanguage].success);
}

function deleteWorker(id) {
    if (confirm(translations[currentLanguage].confirmDelete)) {
        data.workers = data.workers.filter(worker => worker.id !== id);
        saveData();
        updateWorkersTable();
        updateFinancialSummary();
        showSuccessMessage(translations[currentLanguage].success);
    }
}

function getPositionLabel(position) {
    return translations[currentLanguage][position] || position;
}

function getDepartmentLabel(department) {
    return translations[currentLanguage][department] || department;
}

// Activity Logs Management
function initActivityLogs() {
    updateActivitiesTable();
    
    // Set today's date as default
    document.getElementById('activity-date').value = getCurrentDate();
    
    // Setup form submission
    const activitiesForm = document.getElementById('activities-form');
    activitiesForm.onsubmit = addActivity;
}

function updateActivitiesTable() {
    const tableBody = document.getElementById('activities-table');
    tableBody.innerHTML = '';
    
    data.activityLogs.forEach(activity => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${activity.title}</td>
            <td>${activity.description}</td>
            <td>${formatDate(activity.logDate)}</td>
            <td class="action-buttons">
                <button class="btn btn-danger" onclick="deleteActivity(${activity.id})">
                    ${translations[currentLanguage].delete}
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function addActivity(event) {
    event.preventDefault();
    
    const newActivity = {
        id: generateId(data.activityLogs),
        title: document.getElementById('activity-title').value,
        description: document.getElementById('activity-description').value,
        logDate: new Date(document.getElementById('activity-date').value),
        createdAt: new Date()
    };
    
    data.activityLogs.push(newActivity);
    saveData();
    updateActivitiesTable();
    
    // Reset form
    document.getElementById('activities-form').reset();
    document.getElementById('activity-date').value = getCurrentDate();
    
    showSuccessMessage(translations[currentLanguage].success);
}

function deleteActivity(id) {
    if (confirm(translations[currentLanguage].confirmDelete)) {
        data.activityLogs = data.activityLogs.filter(activity => activity.id !== id);
        saveData();
        updateActivitiesTable();
        showSuccessMessage(translations[currentLanguage].success);
    }
}

function getActivityTypeLabel(type) {
    return translations[currentLanguage][type] || type;
}

// Reports and Analytics
function initReports() {
    updateReportsData();
    initFinancialChart();
}

function updateReportsData() {
    const totalIncome = data.sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
    const totalExpenses = data.expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const netProfit = totalIncome - totalExpenses;
    const storageItemsCount = data.storageItems.length;
    
    document.getElementById('report-income').textContent = formatCurrency(totalIncome);
    document.getElementById('report-expenses').textContent = formatCurrency(totalExpenses);
    document.getElementById('report-profit').textContent = formatCurrency(netProfit);
    document.getElementById('report-storage-items').textContent = storageItemsCount;
}

function initFinancialChart() {
    const ctx = document.getElementById('financial-chart');
    if (!ctx) return;
    
    // Destroy existing chart if it exists
    if (charts.financial) {
        charts.financial.destroy();
    }
    
    const totalIncome = data.sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
    const totalExpenses = data.expenses.reduce((sum, expense) => sum + expense.amount, 0);
    
    charts.financial = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [
                translations[currentLanguage].totalIncome,
                translations[currentLanguage].totalExpenses,
                translations[currentLanguage].netProfit
            ],
            datasets: [{
                label: translations[currentLanguage].egp,
                data: [totalIncome, totalExpenses, totalIncome - totalExpenses],
                backgroundColor: [
                    'rgba(34, 197, 94, 0.8)',
                    'rgba(239, 68, 68, 0.8)',
                    'rgba(59, 130, 246, 0.8)'
                ],
                borderColor: [
                    'rgba(34, 197, 94, 1)',
                    'rgba(239, 68, 68, 1)',
                    'rgba(59, 130, 246, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return formatCurrency(value);
                        }
                    }
                }
            }
        }
    });
}

function generateInventoryReport() {
    const lowStockItems = data.storageItems.filter(item => item.quantity <= item.minLevel);
    console.log('Low stock items:', lowStockItems);
    showSuccessMessage('تم إنشاء تقرير المخزون');
}

// Data Export Functions
function exportData(type) {
    let dataToExport = [];
    let filename = '';
    
    switch(type) {
        case 'sales':
            dataToExport = data.sales;
            filename = 'sales_export.json';
            break;
        case 'expenses':
            dataToExport = data.expenses;
            filename = 'expenses_export.json';
            break;
        case 'storage':
            dataToExport = data.storageItems;
            filename = 'storage_export.json';
            break;
        case 'workers':
            dataToExport = data.workers;
            filename = 'workers_export.json';
            break;
        default:
            return;
    }
    
    const jsonData = JSON.stringify(dataToExport, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showSuccessMessage(translations[currentLanguage].success);
}

function backupData() {
    const backup = {
        timestamp: new Date().toISOString(),
        data: data
    };
    
    const jsonData = JSON.stringify(backup, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'factory_backup.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showSuccessMessage('تم إنشاء نسخة احتياطية');
}

function clearAllData() {
    if (confirm('هل أنت متأكد من حذف جميع البيانات؟ لا يمكن التراجع عن هذا الإجراء.')) {
        localStorage.removeItem('fertilizerFactoryData');
        location.reload();
    }
}

// Modal Functions
function showModal(modalId) {
    document.getElementById(modalId).classList.remove('hidden');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
    editingId = null;
}

// Time Functions
function updateCurrentTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString(currentLanguage === 'ar' ? 'ar-EG' : 'en-US');
    const timeElements = document.querySelectorAll('.current-time');
    timeElements.forEach(element => {
        element.textContent = timeString;
    });
}

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    // Load saved data
    const savedData = localStorage.getItem('fertilizerFactoryData');
    if (savedData) {
        const parsedData = JSON.parse(savedData);
        Object.assign(data, parsedData);
        
        // Convert date strings back to Date objects
        data.sales.forEach(sale => {
            sale.saleDate = new Date(sale.saleDate);
            sale.createdAt = new Date(sale.createdAt);
        });
        data.expenses.forEach(expense => {
            expense.expenseDate = new Date(expense.expenseDate);
            expense.createdAt = new Date(expense.createdAt);
        });
        data.workers.forEach(worker => {
            worker.hireDate = new Date(worker.hireDate);
            worker.createdAt = new Date(worker.createdAt);
        });
        data.storageItems.forEach(item => {
            item.createdAt = new Date(item.createdAt);
        });
        data.activityLogs.forEach(log => {
            log.logDate = new Date(log.logDate);
            log.createdAt = new Date(log.createdAt);
        });
    }
    
    // Initialize translations
    updateTranslations();
    
    // Initialize dashboard
    initDashboard();
    
    // Update time every second
    setInterval(updateCurrentTime, 1000);
    updateCurrentTime();
    
    // Add click event listeners for modal close
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            const modalId = e.target.id;
            closeModal(modalId);
        }
    });
});