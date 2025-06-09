// Data Storage
var data = {
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
var currentLanguage = 'ar';
var editingId = null;
var charts = {};

// Translation system
var translations = {
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
    var date = new Date(dateString);
    return date.toLocaleDateString(currentLanguage === 'ar' ? 'ar-EG' : 'en-US');
}

function getCurrentDate() {
    return new Date().toISOString().split('T')[0];
}

function generateId(array) {
    var maxId = 0;
    for (var i = 0; i < array.length; i++) {
        if (array[i].id > maxId) {
            maxId = array[i].id;
        }
    }
    return maxId + 1;
}

function saveData() {
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem('fertilizerFactoryData', JSON.stringify(data));
    }
}

function showSuccessMessage(message) {
    var successMsg = document.getElementById('success-message');
    var successText = document.getElementById('success-text');
    successText.textContent = message;
    successMsg.classList.add('show');
    setTimeout(function() {
        successMsg.classList.remove('show');
    }, 3000);
}

// Language switching
function switchLanguage(lang) {
    currentLanguage = lang;
    var html = document.documentElement;
    var body = document.body;
    
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
    
    // Update charts if they exist
    if (charts.financial) {
        initFinancialChart();
    }
}

function updateTranslations() {
    var elements = document.querySelectorAll('[data-key]');
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        var key = element.getAttribute('data-key');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    }
    
    // Update select options
    var selectOptions = document.querySelectorAll('select option[data-key]');
    for (var i = 0; i < selectOptions.length; i++) {
        var option = selectOptions[i];
        var key = option.getAttribute('data-key');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            option.textContent = translations[currentLanguage][key];
        }
    }
}

// Page navigation
function showPage(pageId) {
    // Hide all pages
    var pages = document.querySelectorAll('.page');
    for (var i = 0; i < pages.length; i++) {
        pages[i].classList.remove('active');
    }
    
    // Remove active class from all nav items
    var navItems = document.querySelectorAll('.nav-item');
    for (var i = 0; i < navItems.length; i++) {
        navItems[i].classList.remove('active');
    }
    
    // Show selected page
    document.getElementById(pageId).classList.add('active');
    
    // Add active class to corresponding nav item
    var navItem = document.querySelector('[data-page="' + pageId + '"]');
    if (navItem) {
        navItem.classList.add('active');
    }
    
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
    var dateInputs = document.querySelectorAll('input[type="date"]');
    for (var i = 0; i < dateInputs.length; i++) {
        if (!dateInputs[i].value) {
            dateInputs[i].value = getCurrentDate();
        }
    }
}

function updateFinancialSummary() {
    var totalIncome = 0;
    for (var i = 0; i < data.sales.length; i++) {
        totalIncome += data.sales[i].totalAmount;
    }
    
    var totalExpenses = 0;
    for (var i = 0; i < data.expenses.length; i++) {
        totalExpenses += data.expenses[i].amount;
    }
    
    var netProfit = totalIncome - totalExpenses;
    var totalWorkers = data.workers.length;
    
    document.getElementById('total-income').textContent = formatCurrency(totalIncome);
    document.getElementById('total-expenses').textContent = formatCurrency(totalExpenses);
    document.getElementById('net-profit').textContent = formatCurrency(netProfit);
    document.getElementById('total-workers').textContent = totalWorkers;
}

// Sales Management
function initSales() {
    updateSalesTable();
    
    // Set today's date as default
    document.getElementById('sale-date').value = getCurrentDate();
    
    // Setup form submission
    var salesForm = document.getElementById('sales-form');
    salesForm.onsubmit = addSale;
    
    // Setup edit form submission
    var editSalesForm = document.getElementById('edit-sale-form');
    editSalesForm.onsubmit = updateSale;
}

function updateSalesTable() {
    var tableBody = document.getElementById('sales-table');
    tableBody.innerHTML = '';
    
    for (var i = 0; i < data.sales.length; i++) {
        var sale = data.sales[i];
        var row = document.createElement('tr');
        row.innerHTML = 
            '<td>' + sale.productName + '</td>' +
            '<td>' + sale.quantity + '</td>' +
            '<td>' + formatCurrency(sale.totalAmount) + '</td>' +
            '<td>' + formatDate(sale.saleDate) + '</td>' +
            '<td>' + sale.clientName + '</td>' +
            '<td class="action-buttons">' +
                '<button class="btn btn-warning" onclick="editSale(' + sale.id + ')">' +
                    translations[currentLanguage].edit +
                '</button>' +
                '<button class="btn btn-danger" onclick="deleteSale(' + sale.id + ')">' +
                    translations[currentLanguage].delete +
                '</button>' +
            '</td>';
        tableBody.appendChild(row);
    }
}

function addSale(event) {
    event.preventDefault();
    
    var newSale = {
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
    var sale = null;
    for (var i = 0; i < data.sales.length; i++) {
        if (data.sales[i].id === id) {
            sale = data.sales[i];
            break;
        }
    }
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
    
    var saleIndex = -1;
    for (var i = 0; i < data.sales.length; i++) {
        if (data.sales[i].id === editingId) {
            saleIndex = i;
            break;
        }
    }
    if (saleIndex === -1) return;
    
    data.sales[saleIndex].productName = document.getElementById('edit-sale-product').value;
    data.sales[saleIndex].quantity = parseInt(document.getElementById('edit-sale-quantity').value);
    data.sales[saleIndex].totalAmount = parseFloat(document.getElementById('edit-sale-amount').value);
    data.sales[saleIndex].saleDate = new Date(document.getElementById('edit-sale-date').value);
    data.sales[saleIndex].clientName = document.getElementById('edit-sale-client').value;
    data.sales[saleIndex].clientContact = document.getElementById('edit-sale-contact').value;
    
    saveData();
    updateSalesTable();
    updateFinancialSummary();
    closeModal('edit-sale-modal');
    
    showSuccessMessage(translations[currentLanguage].success);
}

function deleteSale(id) {
    if (confirm(translations[currentLanguage].confirmDelete)) {
        var newSales = [];
        for (var i = 0; i < data.sales.length; i++) {
            if (data.sales[i].id !== id) {
                newSales.push(data.sales[i]);
            }
        }
        data.sales = newSales;
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
    var storageForm = document.getElementById('storage-form');
    storageForm.onsubmit = addStorageItem;
}

function updateStorageTable() {
    var tableBody = document.getElementById('storage-table');
    tableBody.innerHTML = '';
    
    for (var i = 0; i < data.storageItems.length; i++) {
        var item = data.storageItems[i];
        var status = item.quantity <= item.minLevel ? 
            (item.quantity === 0 ? 'outOfStock' : 'lowStock') : 'inStock';
        
        var statusClass = status === 'outOfStock' ? 'btn-danger' : 
                         status === 'lowStock' ? 'btn-warning' : 'btn-secondary';
        
        var row = document.createElement('tr');
        row.innerHTML = 
            '<td>' + item.itemName + '</td>' +
            '<td>' + translations[currentLanguage][item.itemType] + '</td>' +
            '<td>' + item.quantity + '</td>' +
            '<td>' + translations[currentLanguage][item.unit] + '</td>' +
            '<td>' + item.minLevel + '</td>' +
            '<td>' +
                '<span class="btn ' + statusClass + '" style="font-size: 12px; padding: 4px 8px;">' +
                    translations[currentLanguage][status] +
                '</span>' +
            '</td>' +
            '<td class="action-buttons">' +
                '<button class="btn btn-danger" onclick="deleteStorageItem(' + item.id + ')">' +
                    translations[currentLanguage].delete +
                '</button>' +
            '</td>';
        tableBody.appendChild(row);
    }
}

function addStorageItem(event) {
    event.preventDefault();
    
    var newItem = {
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
        var newItems = [];
        for (var i = 0; i < data.storageItems.length; i++) {
            if (data.storageItems[i].id !== id) {
                newItems.push(data.storageItems[i]);
            }
        }
        data.storageItems = newItems;
        saveData();
        updateStorageTable();
        showSuccessMessage(translations[currentLanguage].success);
    }
}

// Expenses Management
function initExpenses() {
    updateExpensesTable();
    
    // Set today's date as default
    document.getElementById('expense-date').value = getCurrentDate();
    
    // Setup form submission
    var expensesForm = document.getElementById('expenses-form');
    expensesForm.onsubmit = addExpense;
}

function updateExpensesTable() {
    var tableBody = document.getElementById('expenses-table');
    tableBody.innerHTML = '';
    
    for (var i = 0; i < data.expenses.length; i++) {
        var expense = data.expenses[i];
        var row = document.createElement('tr');
        row.innerHTML = 
            '<td>' + expense.name + '</td>' +
            '<td>' + formatCurrency(expense.amount) + '</td>' +
            '<td>' + translations[currentLanguage][expense.category] + '</td>' +
            '<td>' + formatDate(expense.expenseDate) + '</td>' +
            '<td class="action-buttons">' +
                '<button class="btn btn-danger" onclick="deleteExpense(' + expense.id + ')">' +
                    translations[currentLanguage].delete +
                '</button>' +
            '</td>';
        tableBody.appendChild(row);
    }
}

function addExpense(event) {
    event.preventDefault();
    
    var newExpense = {
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
        var newExpenses = [];
        for (var i = 0; i < data.expenses.length; i++) {
            if (data.expenses[i].id !== id) {
                newExpenses.push(data.expenses[i]);
            }
        }
        data.expenses = newExpenses;
        saveData();
        updateExpensesTable();
        updateFinancialSummary();
        showSuccessMessage(translations[currentLanguage].success);
    }
}

// Workers Management
function initWorkers() {
    updateWorkersTable();
    
    // Set today's date as default
    document.getElementById('worker-hire-date').value = getCurrentDate();
    
    // Setup form submission
    var workersForm = document.getElementById('workers-form');
    workersForm.onsubmit = addWorker;
}

function updateWorkersTable() {
    var tableBody = document.getElementById('workers-table');
    tableBody.innerHTML = '';
    
    for (var i = 0; i < data.workers.length; i++) {
        var worker = data.workers[i];
        var row = document.createElement('tr');
        row.innerHTML = 
            '<td>' + worker.name + '</td>' +
            '<td>' + translations[currentLanguage][worker.position] + '</td>' +
            '<td>' + translations[currentLanguage][worker.department] + '</td>' +
            '<td>' + formatCurrency(worker.salary) + '</td>' +
            '<td>' + worker.phone + '</td>' +
            '<td>' + formatDate(worker.hireDate) + '</td>' +
            '<td class="action-buttons">' +
                '<button class="btn btn-danger" onclick="deleteWorker(' + worker.id + ')">' +
                    translations[currentLanguage].delete +
                '</button>' +
            '</td>';
        tableBody.appendChild(row);
    }
}

function addWorker(event) {
    event.preventDefault();
    
    var newWorker = {
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
        var newWorkers = [];
        for (var i = 0; i < data.workers.length; i++) {
            if (data.workers[i].id !== id) {
                newWorkers.push(data.workers[i]);
            }
        }
        data.workers = newWorkers;
        saveData();
        updateWorkersTable();
        updateFinancialSummary();
        showSuccessMessage(translations[currentLanguage].success);
    }
}

// Activity Logs Management
function initActivityLogs() {
    updateActivitiesTable();
    
    // Set today's date as default
    document.getElementById('activity-date').value = getCurrentDate();
    
    // Setup form submission
    var activitiesForm = document.getElementById('activities-form');
    activitiesForm.onsubmit = addActivity;
}

function updateActivitiesTable() {
    var tableBody = document.getElementById('activities-table');
    tableBody.innerHTML = '';
    
    for (var i = 0; i < data.activityLogs.length; i++) {
        var activity = data.activityLogs[i];
        var row = document.createElement('tr');
        row.innerHTML = 
            '<td>' + activity.title + '</td>' +
            '<td>' + activity.description + '</td>' +
            '<td>' + formatDate(activity.logDate) + '</td>' +
            '<td class="action-buttons">' +
                '<button class="btn btn-danger" onclick="deleteActivity(' + activity.id + ')">' +
                    translations[currentLanguage].delete +
                '</button>' +
            '</td>';
        tableBody.appendChild(row);
    }
}

function addActivity(event) {
    event.preventDefault();
    
    var newActivity = {
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
        var newActivities = [];
        for (var i = 0; i < data.activityLogs.length; i++) {
            if (data.activityLogs[i].id !== id) {
                newActivities.push(data.activityLogs[i]);
            }
        }
        data.activityLogs = newActivities;
        saveData();
        updateActivitiesTable();
        showSuccessMessage(translations[currentLanguage].success);
    }
}

// Reports and Analytics
function initReports() {
    updateReportsData();
    initFinancialChart();
}

function updateReportsData() {
    var totalIncome = 0;
    for (var i = 0; i < data.sales.length; i++) {
        totalIncome += data.sales[i].totalAmount;
    }
    
    var totalExpenses = 0;
    for (var i = 0; i < data.expenses.length; i++) {
        totalExpenses += data.expenses[i].amount;
    }
    
    var netProfit = totalIncome - totalExpenses;
    var storageItemsCount = data.storageItems.length;
    
    document.getElementById('report-income').textContent = formatCurrency(totalIncome);
    document.getElementById('report-expenses').textContent = formatCurrency(totalExpenses);
    document.getElementById('report-profit').textContent = formatCurrency(netProfit);
    document.getElementById('report-storage-items').textContent = storageItemsCount;
}

function initFinancialChart() {
    var ctx = document.getElementById('financial-chart');
    if (!ctx) return;
    
    // Destroy existing chart if it exists
    if (charts.financial) {
        charts.financial.destroy();
    }
    
    var totalIncome = 0;
    for (var i = 0; i < data.sales.length; i++) {
        totalIncome += data.sales[i].totalAmount;
    }
    
    var totalExpenses = 0;
    for (var i = 0; i < data.expenses.length; i++) {
        totalExpenses += data.expenses[i].amount;
    }
    
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

// Data Export Functions
function exportData(type) {
    var dataToExport = [];
    var filename = '';
    
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
    
    var jsonData = JSON.stringify(dataToExport, null, 2);
    var blob = new Blob([jsonData], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showSuccessMessage(translations[currentLanguage].success);
}

// Modal Functions
function showModal(modalId) {
    document.getElementById(modalId).classList.remove('hidden');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
    editingId = null;
}

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    // Load saved data
    if (typeof(Storage) !== "undefined") {
        var savedData = localStorage.getItem('fertilizerFactoryData');
        if (savedData) {
            var parsedData = JSON.parse(savedData);
            
            // Merge saved data with default data
            if (parsedData.sales) {
                data.sales = parsedData.sales;
                // Convert date strings back to Date objects
                for (var i = 0; i < data.sales.length; i++) {
                    data.sales[i].saleDate = new Date(data.sales[i].saleDate);
                    data.sales[i].createdAt = new Date(data.sales[i].createdAt);
                }
            }
            if (parsedData.expenses) {
                data.expenses = parsedData.expenses;
                for (var i = 0; i < data.expenses.length; i++) {
                    data.expenses[i].expenseDate = new Date(data.expenses[i].expenseDate);
                    data.expenses[i].createdAt = new Date(data.expenses[i].createdAt);
                }
            }
            if (parsedData.workers) {
                data.workers = parsedData.workers;
                for (var i = 0; i < data.workers.length; i++) {
                    data.workers[i].hireDate = new Date(data.workers[i].hireDate);
                    data.workers[i].createdAt = new Date(data.workers[i].createdAt);
                }
            }
            if (parsedData.storageItems) {
                data.storageItems = parsedData.storageItems;
                for (var i = 0; i < data.storageItems.length; i++) {
                    data.storageItems[i].createdAt = new Date(data.storageItems[i].createdAt);
                }
            }
            if (parsedData.activityLogs) {
                data.activityLogs = parsedData.activityLogs;
                for (var i = 0; i < data.activityLogs.length; i++) {
                    data.activityLogs[i].logDate = new Date(data.activityLogs[i].logDate);
                    data.activityLogs[i].createdAt = new Date(data.activityLogs[i].createdAt);
                }
            }
        }
    }
    
    // Initialize translations
    updateTranslations();
    
    // Initialize dashboard
    initDashboard();
    
    // Add click event listeners for modal close
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            var modalId = e.target.id;
            closeModal(modalId);
        }
    });
});