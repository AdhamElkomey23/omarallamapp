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
        companyName: "الواصلون",
        factorySubtitle: "للتعدين والصناعات الكيماوية",
        managementSystem: "نظام الإدارة",
        heroSubtitle: "نظام إدارة متطور ومتكامل",
        
        // Navigation
        home: "الرئيسية",
        dashboard: "لوحة التحكم",
        products: "المنتجات",
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
        quickOverview: "نظرة سريعة",
        totalIncome: "إجمالي الإيرادات",
        totalExpenses: "إجمالي المصروفات",
        netProfit: "صافي الربح",
        totalProducts: "إجمالي المنتجات",
        totalWorkers: "عدد العمال",
        recentActivities: "الأنشطة الحديثة",
        noActivities: "لا توجد أنشطة حديثة",
        activitiesDescription: "ستظهر آخر العمليات والأنشطة هنا",
        mainFeatures: "الميزات الرئيسية",
        manageProducts: "إدارة منتجات الأسمدة والمخزون الخاص بك",
        viewProducts: "عرض المنتجات",
        trackSales: "تتبع وتحليل أداء مبيعاتك",
        viewSales: "عرض المبيعات",
        manageWorkers: "إدارة العمال وأعضاء فريقك",
        viewWorkers: "عرض العمال",
        manageInventory: "إدارة مخزون المنتجات الخاص بك",
        viewStorage: "عرض المخزون",
        trackExpenses: "تتبع وتصنيف مصروفاتك",
        viewExpenses: "عرض المصروفات",
        viewReportsDesc: "عرض التقارير التفصيلية والتحليلات",
        viewDetailedReports: "عرض التقارير التفصيلية والتحليلات",
        readyToStart: "هل أنت مستعد للبدء؟",
        startManaging: "ابدأ في إدارة عمليات مصنع الأسمدة بكفاءة",
        goToDashboard: "الذهاب إلى لوحة التحكم",
        
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
        recordSale: "تسجيل بيع",
        totalRevenue: "إجمالي الإيرادات",
        totalSales: "إجمالي المبيعات",
        unitsSold: "الوحدات المباعة",
        sortProductsByBest: "ترتيب المنتجات حسب الأفضل",
        product: "المنتج",
        allProducts: "جميع المنتجات",
        filterProducts: "تصفية المنتجات",
        recentSales: "المبيعات الأخيرة",
        exportAllSales: "تصدير جميع المبيعات",
        lastSalesIn30Days: "آخر المبيعات خلال ٣٠ يوم",
        client: "عميل",
        pricePerUnit: "ثمن كل وحدة",
        
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
        companyName: "Al-Wasiloon",
        factorySubtitle: "For Mining & Chemical Industries",
        managementSystem: "Management System",
        heroSubtitle: "Built for mobile-first management",
        
        // Navigation
        home: "Home",
        dashboard: "Dashboard",
        products: "Products",
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
        quickOverview: "Quick Overview",
        totalIncome: "Total Income",
        totalExpenses: "Total Expenses",
        netProfit: "Net Profit",
        totalProducts: "Total Products",
        totalWorkers: "Total Workers",
        recentActivities: "Recent Activities",
        noActivities: "No recent activities",
        activitiesDescription: "Latest operations and activities will appear here",
        mainFeatures: "Main Features",
        manageProducts: "Manage your fertilizer products and inventory",
        viewProducts: "View Products",
        trackSales: "Track and analyze your sales performance",
        viewSales: "View Sales",
        manageWorkers: "Manage your workers and team members",
        viewWorkers: "View Workers",
        manageInventory: "Manage your product inventory",
        viewStorage: "View Storage",
        trackExpenses: "Track and categorize your expenses",
        viewExpenses: "View Expenses",
        viewReportsDesc: "View detailed reports and analytics",
        viewDetailedReports: "View detailed reports and analytics",
        readyToStart: "Ready to get started?",
        startManaging: "Start managing your fertilizer factory operations efficiently",
        goToDashboard: "Go to Dashboard",
        
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
        recordSale: "Record Sale",
        totalRevenue: "Total Revenue",
        totalSales: "Total Sales",
        unitsSold: "Units Sold",
        sortProductsByBest: "Sort products by best selling",
        product: "Product",
        allProducts: "All Products",
        filterProducts: "Filter Products",
        recentSales: "Recent Sales",
        exportAllSales: "Export All Sales",
        lastSalesIn30Days: "Last sales in 30 days",
        client: "Client",
        pricePerUnit: "Price per unit",
        
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

// COMPLETE WORKERS MANAGEMENT FUNCTIONALITY WITH ATTENDANCE
function initWorkers() {
    updateWorkersCards();
    updateWorkersStats();
    loadTodayAttendance();
    populateWorkerSelects();
    
    const addWorkerForm = document.getElementById('add-worker-form');
    if (addWorkerForm) {
        addWorkerForm.addEventListener('submit', addWorker);
    }
    
    const attendanceForm = document.getElementById('attendance-form');
    if (attendanceForm) {
        attendanceForm.addEventListener('submit', recordAttendance);
    }
    
    const salaryDeductionForm = document.getElementById('salary-deduction-form');
    if (salaryDeductionForm) {
        salaryDeductionForm.addEventListener('submit', addSalaryDeduction);
    }
    
    // Set today's date as default
    const hireDateInput = document.getElementById('new-worker-hire-date');
    const attendanceDateInput = document.getElementById('attendance-date');
    const attendanceRecordDate = document.getElementById('attendance-record-date');
    const deductionDateInput = document.getElementById('deduction-date');
    
    const today = getCurrentDate();
    if (hireDateInput) hireDateInput.value = today;
    if (attendanceDateInput) attendanceDateInput.value = today;
    if (attendanceRecordDate) attendanceRecordDate.value = today;
    if (deductionDateInput) deductionDateInput.value = today;
    
    // Initialize attendance and deduction data if not exists
    if (!appData.attendance) appData.attendance = [];
    if (!appData.salaryDeductions) appData.salaryDeductions = [];
}

function updateWorkersCards() {
    const container = document.getElementById('workers-cards-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    appData.workers.forEach(worker => {
        const workerCard = document.createElement('div');
        workerCard.className = 'worker-card';
        
        const todayAttendance = getTodayAttendanceForWorker(worker.id);
        const attendanceStatus = todayAttendance ? todayAttendance.status : 'not-recorded';
        
        workerCard.innerHTML = `
            <div class="worker-header">
                <div>
                    <h4 class="worker-name">${worker.name}</h4>
                    <p class="worker-position">${worker.position}</p>
                </div>
                <span class="worker-status active">Active</span>
            </div>
            <div class="worker-details">
                <div class="worker-detail">
                    <span class="label">Department:</span>
                    <span class="value">${worker.department}</span>
                </div>
                <div class="worker-detail">
                    <span class="label">Salary:</span>
                    <span class="value">${formatCurrency(worker.salary)}</span>
                </div>
                <div class="worker-detail">
                    <span class="label">Phone:</span>
                    <span class="value">${worker.phone || 'N/A'}</span>
                </div>
                <div class="worker-detail">
                    <span class="label">Hire Date:</span>
                    <span class="value">${formatDate(worker.hireDate)}</span>
                </div>
                <div class="worker-detail">
                    <span class="label">Today Status:</span>
                    <span class="value attendance-status ${attendanceStatus}">${getAttendanceStatusText(attendanceStatus)}</span>
                </div>
            </div>
            <div class="worker-actions">
                <button class="worker-action-btn edit" onclick="editWorker(${worker.id})">Edit</button>
                <button class="worker-action-btn attendance" onclick="quickAttendance(${worker.id})">Attendance</button>
                <button class="worker-action-btn deduction" onclick="quickDeduction(${worker.id})">Deduction</button>
            </div>
        `;
        container.appendChild(workerCard);
    });
}

function updateWorkersStats() {
    const totalWorkers = appData.workers.length;
    const todayDate = getCurrentDate();
    const presentToday = appData.attendance.filter(a => 
        a.date === todayDate && a.status === 'present'
    ).length;
    const totalSalaries = appData.workers.reduce((sum, worker) => sum + worker.salary, 0);
    
    const totalWorkersElement = document.getElementById('total-workers-count');
    const presentTodayElement = document.getElementById('present-today-count');
    const totalSalariesElement = document.getElementById('total-salaries');
    
    if (totalWorkersElement) totalWorkersElement.textContent = totalWorkers;
    if (presentTodayElement) presentTodayElement.textContent = presentToday;
    if (totalSalariesElement) totalSalariesElement.textContent = formatCurrency(totalSalaries);
}

function populateWorkerSelects() {
    const attendanceSelect = document.getElementById('attendance-worker');
    const deductionSelect = document.getElementById('deduction-worker');
    
    if (attendanceSelect) {
        attendanceSelect.innerHTML = '<option value="">Choose Worker</option>';
        appData.workers.forEach(worker => {
            const option = document.createElement('option');
            option.value = worker.id;
            option.textContent = `${worker.name} - ${worker.department}`;
            attendanceSelect.appendChild(option);
        });
    }
    
    if (deductionSelect) {
        deductionSelect.innerHTML = '<option value="">Choose Worker</option>';
        appData.workers.forEach(worker => {
            const option = document.createElement('option');
            option.value = worker.id;
            option.textContent = `${worker.name} - ${worker.department}`;
            deductionSelect.appendChild(option);
        });
    }
}

function loadTodayAttendance() {
    const todayDate = getCurrentDate();
    loadAttendanceForDate(todayDate);
}

function loadAttendanceForDate(date = null) {
    if (!date) {
        const dateInput = document.getElementById('attendance-date');
        date = dateInput ? dateInput.value : getCurrentDate();
    }
    
    const container = document.getElementById('attendance-grid');
    if (!container) return;
    
    container.innerHTML = '';
    
    const dayAttendance = appData.attendance.filter(a => a.date === date);
    
    if (dayAttendance.length === 0) {
        container.innerHTML = '<p>No attendance records for this date.</p>';
        return;
    }
    
    dayAttendance.forEach(attendance => {
        const worker = appData.workers.find(w => w.id === attendance.workerId);
        if (!worker) return;
        
        const attendanceCard = document.createElement('div');
        attendanceCard.className = `attendance-card ${attendance.status}`;
        attendanceCard.innerHTML = `
            <div class="attendance-worker-name">${worker.name}</div>
            <div class="attendance-details">Department: ${worker.department}</div>
            <div class="attendance-details">Check In: ${attendance.checkIn || 'N/A'}</div>
            <div class="attendance-details">Check Out: ${attendance.checkOut || 'N/A'}</div>
            <div class="attendance-details">
                <span class="attendance-status ${attendance.status}">${getAttendanceStatusText(attendance.status)}</span>
            </div>
            ${attendance.deduction ? `<div class="attendance-details">Deduction: ${formatCurrency(attendance.deduction)}</div>` : ''}
            ${attendance.notes ? `<div class="attendance-details">Notes: ${attendance.notes}</div>` : ''}
        `;
        container.appendChild(attendanceCard);
    });
}

function getTodayAttendanceForWorker(workerId) {
    const todayDate = getCurrentDate();
    return appData.attendance.find(a => a.workerId === workerId && a.date === todayDate);
}

function getAttendanceStatusText(status) {
    const statusTexts = {
        'present': 'Present',
        'absent': 'Absent',
        'late': 'Late',
        'halfday': 'Half Day',
        'not-recorded': 'Not Recorded'
    };
    return statusTexts[status] || status;
}

function addWorker(event) {
    event.preventDefault();
    
    const worker = {
        id: generateId(appData.workers),
        name: document.getElementById('new-worker-name').value,
        position: document.getElementById('new-worker-position').value,
        department: document.getElementById('new-worker-department').value,
        salary: parseFloat(document.getElementById('new-worker-salary').value),
        phone: document.getElementById('new-worker-phone').value,
        hireDate: document.getElementById('new-worker-hire-date').value
    };
    
    appData.workers.push(worker);
    updateWorkersCards();
    updateWorkersStats();
    populateWorkerSelects();
    saveData();
    
    // Reset form and close modal
    event.target.reset();
    document.getElementById('new-worker-hire-date').value = getCurrentDate();
    closeModal('add-worker-modal');
    
    showSuccessMessage('Worker added successfully');
}

function recordAttendance(event) {
    event.preventDefault();
    
    const workerId = parseInt(document.getElementById('attendance-worker').value);
    const date = document.getElementById('attendance-record-date').value;
    const checkIn = document.getElementById('check-in-time').value;
    const checkOut = document.getElementById('check-out-time').value;
    const status = document.getElementById('attendance-status').value;
    const deduction = parseFloat(document.getElementById('salary-deduction').value) || 0;
    const notes = document.getElementById('attendance-notes').value;
    
    // Check if attendance already exists for this worker and date
    const existingIndex = appData.attendance.findIndex(a => a.workerId === workerId && a.date === date);
    
    const attendanceRecord = {
        id: existingIndex !== -1 ? appData.attendance[existingIndex].id : generateId(appData.attendance),
        workerId: workerId,
        date: date,
        checkIn: checkIn,
        checkOut: checkOut,
        status: status,
        deduction: deduction,
        notes: notes
    };
    
    if (existingIndex !== -1) {
        appData.attendance[existingIndex] = attendanceRecord;
    } else {
        appData.attendance.push(attendanceRecord);
    }
    
    // If there's a deduction, also add it to salary deductions
    if (deduction > 0) {
        const worker = appData.workers.find(w => w.id === workerId);
        const salaryDeduction = {
            id: generateId(appData.salaryDeductions),
            workerId: workerId,
            amount: deduction,
            date: date,
            reason: status === 'late' ? 'late' : status === 'absent' ? 'absent' : 'other',
            description: `Attendance deduction for ${status}${notes ? ': ' + notes : ''}`
        };
        appData.salaryDeductions.push(salaryDeduction);
    }
    
    updateWorkersCards();
    updateWorkersStats();
    loadAttendanceForDate(date);
    saveData();
    
    // Reset form and close modal
    event.target.reset();
    document.getElementById('attendance-record-date').value = getCurrentDate();
    closeModal('attendance-modal');
    
    showSuccessMessage('Attendance recorded successfully');
}

function addSalaryDeduction(event) {
    event.preventDefault();
    
    const workerId = parseInt(document.getElementById('deduction-worker').value);
    const amount = parseFloat(document.getElementById('deduction-amount').value);
    const date = document.getElementById('deduction-date').value;
    const reason = document.getElementById('deduction-reason').value;
    const description = document.getElementById('deduction-description').value;
    
    const deduction = {
        id: generateId(appData.salaryDeductions),
        workerId: workerId,
        amount: amount,
        date: date,
        reason: reason,
        description: description
    };
    
    appData.salaryDeductions.push(deduction);
    saveData();
    
    // Reset form and close modal
    event.target.reset();
    document.getElementById('deduction-date').value = getCurrentDate();
    closeModal('salary-deduction-modal');
    
    showSuccessMessage('Salary deduction added successfully');
}

function quickAttendance(workerId) {
    const worker = appData.workers.find(w => w.id === workerId);
    if (!worker) return;
    
    document.getElementById('attendance-worker').value = workerId;
    document.getElementById('attendance-record-date').value = getCurrentDate();
    document.getElementById('check-in-time').value = '08:00';
    document.getElementById('check-out-time').value = '17:00';
    document.getElementById('attendance-status').value = 'present';
    
    showModal('attendance-modal');
}

function quickDeduction(workerId) {
    const worker = appData.workers.find(w => w.id === workerId);
    if (!worker) return;
    
    document.getElementById('deduction-worker').value = workerId;
    document.getElementById('deduction-date').value = getCurrentDate();
    
    showModal('salary-deduction-modal');
}

function editWorker(id) {
    const worker = appData.workers.find(w => w.id === id);
    if (!worker) return;
    
    document.getElementById('worker-name').value = worker.name;
    document.getElementById('worker-position').value = worker.position;
    document.getElementById('worker-department').value = worker.department;
    document.getElementById('worker-salary').value = worker.salary;
    document.getElementById('worker-phone').value = worker.phone || '';
    document.getElementById('worker-hire-date').value = worker.hireDate;
    
    // Change form to update mode
    const form = document.getElementById('workers-form');
    form.onsubmit = function(event) {
        event.preventDefault();
        updateWorker(id, event);
    };
    
    const submitBtn = form.querySelector('button[type="submit"] span');
    submitBtn.textContent = currentLanguage === 'ar' ? 'تحديث العامل' : 'Update Worker';
}

function updateWorker(id, event) {
    const workerIndex = appData.workers.findIndex(w => w.id === id);
    if (workerIndex === -1) return;
    
    appData.workers[workerIndex] = {
        ...appData.workers[workerIndex],
        name: document.getElementById('worker-name').value,
        position: document.getElementById('worker-position').value,
        department: document.getElementById('worker-department').value,
        salary: parseFloat(document.getElementById('worker-salary').value),
        phone: document.getElementById('worker-phone').value,
        hireDate: document.getElementById('worker-hire-date').value
    };
    
    updateWorkersTable();
    saveData();
    
    // Reset form to add mode
    event.target.reset();
    document.getElementById('worker-hire-date').value = getCurrentDate();
    event.target.onsubmit = addWorker;
    
    const submitBtn = event.target.querySelector('button[type="submit"] span');
    submitBtn.setAttribute('data-key', 'addWorker');
    submitBtn.textContent = currentLanguage === 'ar' ? 'إضافة العامل' : 'Add Worker';
    
    showSuccessMessage('تم تحديث بيانات العامل بنجاح');
}

function deleteWorker(id) {
    if (confirm(currentLanguage === 'ar' ? 'هل أنت متأكد من حذف هذا العامل؟' : 'Are you sure you want to delete this worker?')) {
        appData.workers = appData.workers.filter(w => w.id !== id);
        updateWorkersTable();
        saveData();
        showSuccessMessage('تم حذف العامل بنجاح');
    }
}

// COMPLETE STORAGE MANAGEMENT FUNCTIONALITY
function initStorage() {
    updateStorageTable();
    
    const storageForm = document.getElementById('storage-form');
    if (storageForm) {
        storageForm.addEventListener('submit', addStorageItem);
    }
}

function updateStorageTable() {
    const tableBody = document.getElementById('storage-table');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    appData.storage.forEach(item => {
        const status = item.quantity <= item.minLevel ? 'low' : 'normal';
        const statusText = status === 'low' ? 
            (currentLanguage === 'ar' ? 'منخفض' : 'Low') : 
            (currentLanguage === 'ar' ? 'عادي' : 'Normal');
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td><span data-key="${item.type}">${item.type}</span></td>
            <td>${item.quantity}</td>
            <td><span data-key="${item.unit}">${item.unit}</span></td>
            <td>${item.minLevel}</td>
            <td><span class="status ${status}">${statusText}</span></td>
            <td>
                <button onclick="editStorageItem(${item.id})" class="btn btn-sm btn-secondary">
                    <span data-key="edit">تعديل</span>
                </button>
                <button onclick="deleteStorageItem(${item.id})" class="btn btn-sm btn-danger">
                    <span data-key="delete">حذف</span>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
    updateTranslations();
}

function addStorageItem(event) {
    event.preventDefault();
    
    const item = {
        id: generateId(appData.storage),
        name: document.getElementById('storage-item-name').value,
        type: document.getElementById('storage-item-type').value,
        quantity: parseInt(document.getElementById('storage-quantity').value),
        unit: document.getElementById('storage-unit').value,
        minLevel: parseInt(document.getElementById('storage-min-level').value)
    };
    
    appData.storage.push(item);
    updateStorageTable();
    saveData();
    
    // Reset form
    event.target.reset();
    
    showSuccessMessage('تم إضافة عنصر المخزون بنجاح');
}

function editStorageItem(id) {
    const item = appData.storage.find(s => s.id === id);
    if (!item) return;
    
    document.getElementById('storage-item-name').value = item.name;
    document.getElementById('storage-item-type').value = item.type;
    document.getElementById('storage-quantity').value = item.quantity;
    document.getElementById('storage-unit').value = item.unit;
    document.getElementById('storage-min-level').value = item.minLevel;
    
    // Change form to update mode
    const form = document.getElementById('storage-form');
    form.onsubmit = function(event) {
        event.preventDefault();
        updateStorageItem(id, event);
    };
    
    const submitBtn = form.querySelector('button[type="submit"] span');
    submitBtn.textContent = currentLanguage === 'ar' ? 'تحديث العنصر' : 'Update Item';
}

function updateStorageItem(id, event) {
    const itemIndex = appData.storage.findIndex(s => s.id === id);
    if (itemIndex === -1) return;
    
    appData.storage[itemIndex] = {
        ...appData.storage[itemIndex],
        name: document.getElementById('storage-item-name').value,
        type: document.getElementById('storage-item-type').value,
        quantity: parseInt(document.getElementById('storage-quantity').value),
        unit: document.getElementById('storage-unit').value,
        minLevel: parseInt(document.getElementById('storage-min-level').value)
    };
    
    updateStorageTable();
    saveData();
    
    // Reset form to add mode
    event.target.reset();
    event.target.onsubmit = addStorageItem;
    
    const submitBtn = event.target.querySelector('button[type="submit"] span');
    submitBtn.setAttribute('data-key', 'addStorageItem');
    submitBtn.textContent = currentLanguage === 'ar' ? 'إضافة للمخزون' : 'Add Storage Item';
    
    showSuccessMessage('تم تحديث عنصر المخزون بنجاح');
}

// COMPLETE EXPENSES MANAGEMENT FUNCTIONALITY
function initExpenses() {
    updateExpensesTable();
    updateExpensesStats();
    
    const expensesForm = document.getElementById('add-expense-form');
    if (expensesForm) {
        expensesForm.addEventListener('submit', addExpense);
    }
    
    // Set today's date as default
    const expenseDateInput = document.getElementById('new-expense-date');
    if (expenseDateInput) {
        expenseDateInput.value = getCurrentDate();
    }
}

function updateExpensesTable() {
    const container = document.getElementById('expenses-table-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    appData.expenses.forEach(expense => {
        const expenseItem = document.createElement('div');
        expenseItem.className = 'expense-item';
        expenseItem.innerHTML = `
            <div class="expense-item-info">
                <h4 class="expense-name">${expense.name}</h4>
                <p class="expense-details">${expense.category} • ${formatDate(expense.expenseDate)}</p>
            </div>
            <div class="expense-item-actions">
                <div class="expense-amount">-${formatCurrency(expense.amount)}</div>
                <div class="action-buttons">
                    <button class="btn-icon edit-btn" onclick="editExpense(${expense.id})">✏️</button>
                    <button class="btn-icon copy-btn" onclick="copyExpense(${expense.id})">📋</button>
                    <button class="btn-icon delete-btn" onclick="deleteExpense(${expense.id})">🗑️</button>
                </div>
            </div>
        `;
        container.appendChild(expenseItem);
    });
}

function updateExpensesStats() {
    const totalExpenses = appData.expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const thisMonthExpenses = appData.expenses
        .filter(expense => {
            const expenseDate = new Date(expense.expenseDate);
            const now = new Date();
            return expenseDate.getMonth() === now.getMonth() && expenseDate.getFullYear() === now.getFullYear();
        })
        .reduce((sum, expense) => sum + expense.amount, 0);
    const expenseCount = appData.expenses.length;
    
    const statsElements = document.querySelectorAll('.expenses-stats-grid .stat-value');
    if (statsElements[0]) statsElements[0].textContent = formatCurrency(totalExpenses);
    if (statsElements[1]) statsElements[1].textContent = formatCurrency(thisMonthExpenses);
    if (statsElements[2]) statsElements[2].textContent = expenseCount;
}

function addExpense(event) {
    event.preventDefault();
    
    const expense = {
        id: generateId(appData.expenses),
        name: document.getElementById('new-expense-name').value,
        amount: parseFloat(document.getElementById('new-expense-amount').value),
        category: document.getElementById('new-expense-category').value,
        expenseDate: document.getElementById('new-expense-date').value
    };
    
    appData.expenses.push(expense);
    updateExpensesTable();
    updateExpensesStats();
    updateFinancialSummary();
    saveData();
    
    // Reset form and close modal
    event.target.reset();
    document.getElementById('new-expense-date').value = getCurrentDate();
    closeModal('add-expense-modal');
    
    showSuccessMessage('تم إضافة المصروف بنجاح');
}

function editExpense(id) {
    const expense = appData.expenses.find(e => e.id === id);
    if (!expense) return;
    
    document.getElementById('new-expense-name').value = expense.name;
    document.getElementById('new-expense-amount').value = expense.amount;
    document.getElementById('new-expense-category').value = expense.category;
    document.getElementById('new-expense-date').value = expense.expenseDate;
    
    showModal('add-expense-modal');
    
    // Change form to update mode
    const form = document.getElementById('add-expense-form');
    form.onsubmit = function(event) {
        event.preventDefault();
        updateExpense(id, event);
    };
    
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.textContent = currentLanguage === 'ar' ? 'تحديث المصروف' : 'Update Expense';
}

function updateExpense(id, event) {
    const expenseIndex = appData.expenses.findIndex(e => e.id === id);
    if (expenseIndex === -1) return;
    
    appData.expenses[expenseIndex] = {
        ...appData.expenses[expenseIndex],
        name: document.getElementById('new-expense-name').value,
        amount: parseFloat(document.getElementById('new-expense-amount').value),
        category: document.getElementById('new-expense-category').value,
        expenseDate: document.getElementById('new-expense-date').value
    };
    
    updateExpensesTable();
    updateExpensesStats();
    updateFinancialSummary();
    saveData();
    
    // Reset form to add mode
    event.target.reset();
    document.getElementById('new-expense-date').value = getCurrentDate();
    event.target.onsubmit = addExpense;
    closeModal('add-expense-modal');
    
    const submitBtn = event.target.querySelector('button[type="submit"]');
    submitBtn.setAttribute('data-key', 'addExpense');
    submitBtn.textContent = currentLanguage === 'ar' ? 'إضافة المصروف' : 'Add Expense';
    
    showSuccessMessage('تم تحديث المصروف بنجاح');
}

function copyExpense(id) {
    const expense = appData.expenses.find(e => e.id === id);
    if (!expense) return;
    
    const newExpense = {
        ...expense,
        id: generateId(appData.expenses),
        expenseDate: getCurrentDate()
    };
    
    appData.expenses.push(newExpense);
    updateExpensesTable();
    updateExpensesStats();
    saveData();
    
    showSuccessMessage('تم نسخ المصروف بنجاح');
}

function exportExpensesData() {
    const csvContent = "data:text/csv;charset=utf-8," 
        + "Name,Amount,Category,Date\n"
        + appData.expenses.map(e => `${e.name},${e.amount},${e.category},${e.expenseDate}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "expenses_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function exportSalesData() {
    const csvContent = "data:text/csv;charset=utf-8," 
        + "Product,Quantity,Amount,Date,Client\n"
        + appData.sales.map(s => `${s.productName},${s.quantity},${s.totalAmount},${s.saleDate},${s.clientName}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "sales_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// UPDATED SALES FUNCTIONALITY
function updateSalesTable() {
    const container = document.getElementById('sales-table-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    appData.sales.forEach(sale => {
        const saleItem = document.createElement('div');
        saleItem.className = 'sales-item';
        saleItem.innerHTML = `
            <div class="sales-item-info">
                <h4 class="product-name">${sale.productName}</h4>
                <p class="sale-details">Quantity: ${sale.quantity} • ${formatDate(sale.saleDate)}</p>
                <p class="client-name">Client: ${sale.clientName}</p>
            </div>
            <div class="sales-item-actions">
                <div class="sale-amount">${formatCurrency(sale.totalAmount)}</div>
                <div class="sale-price">${formatCurrency(sale.totalAmount / sale.quantity)} per unit</div>
                <div class="action-buttons">
                    <button class="btn-icon edit-btn" onclick="editSale(${sale.id})">✏️</button>
                    <button class="btn-icon copy-btn" onclick="copySale(${sale.id})">📋</button>
                    <button class="btn-icon delete-btn" onclick="deleteSale(${sale.id})">🗑️</button>
                </div>
            </div>
        `;
        container.appendChild(saleItem);
    });
}

function updateSalesStats() {
    const totalRevenue = appData.sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
    const totalSales = appData.sales.length;
    const totalUnits = appData.sales.reduce((sum, sale) => sum + sale.quantity, 0);
    
    const statsElements = document.querySelectorAll('.sales-stats-grid .stat-value');
    if (statsElements[0]) statsElements[0].textContent = formatCurrency(totalRevenue);
    if (statsElements[1]) statsElements[1].textContent = totalSales;
    if (statsElements[2]) statsElements[2].textContent = totalUnits;
}

function initSales() {
    updateSalesTable();
    updateSalesStats();
    
    const salesForm = document.getElementById('add-sale-form');
    if (salesForm) {
        salesForm.addEventListener('submit', addSale);
    }
    
    // Set today's date as default
    const saleDateInput = document.getElementById('sale-date');
    if (saleDateInput) {
        saleDateInput.value = getCurrentDate();
    }
}

function addSale(event) {
    event.preventDefault();
    
    const sale = {
        id: generateId(appData.sales),
        productName: document.getElementById('sale-product').value,
        quantity: parseInt(document.getElementById('sale-quantity').value),
        totalAmount: parseFloat(document.getElementById('sale-amount').value),
        saleDate: document.getElementById('sale-date').value,
        clientName: document.getElementById('sale-client').value,
        clientContact: document.getElementById('sale-contact').value
    };
    
    appData.sales.push(sale);
    updateSalesTable();
    updateSalesStats();
    updateFinancialSummary();
    saveData();
    
    // Reset form and close modal
    event.target.reset();
    document.getElementById('sale-date').value = getCurrentDate();
    closeModal('add-sale-modal');
    
    showSuccessMessage('تم إضافة البيع بنجاح');
}

function editSale(id) {
    const sale = appData.sales.find(s => s.id === id);
    if (!sale) return;
    
    document.getElementById('sale-product').value = sale.productName;
    document.getElementById('sale-quantity').value = sale.quantity;
    document.getElementById('sale-amount').value = sale.totalAmount;
    document.getElementById('sale-date').value = sale.saleDate;
    document.getElementById('sale-client').value = sale.clientName;
    document.getElementById('sale-contact').value = sale.clientContact || '';
    
    showModal('add-sale-modal');
    
    // Change form to update mode
    const form = document.getElementById('add-sale-form');
    form.onsubmit = function(event) {
        event.preventDefault();
        updateSale(id, event);
    };
    
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.textContent = currentLanguage === 'ar' ? 'تحديث البيع' : 'Update Sale';
}

function updateSale(id, event) {
    const saleIndex = appData.sales.findIndex(s => s.id === id);
    if (saleIndex === -1) return;
    
    appData.sales[saleIndex] = {
        ...appData.sales[saleIndex],
        productName: document.getElementById('sale-product').value,
        quantity: parseInt(document.getElementById('sale-quantity').value),
        totalAmount: parseFloat(document.getElementById('sale-amount').value),
        saleDate: document.getElementById('sale-date').value,
        clientName: document.getElementById('sale-client').value,
        clientContact: document.getElementById('sale-contact').value
    };
    
    updateSalesTable();
    updateSalesStats();
    updateFinancialSummary();
    saveData();
    
    // Reset form to add mode
    event.target.reset();
    document.getElementById('sale-date').value = getCurrentDate();
    event.target.onsubmit = addSale;
    closeModal('add-sale-modal');
    
    const submitBtn = event.target.querySelector('button[type="submit"]');
    submitBtn.setAttribute('data-key', 'addSale');
    submitBtn.textContent = currentLanguage === 'ar' ? 'إضافة البيع' : 'Add Sale';
    
    showSuccessMessage('تم تحديث البيع بنجاح');
}

function copySale(id) {
    const sale = appData.sales.find(s => s.id === id);
    if (!sale) return;
    
    const newSale = {
        ...sale,
        id: generateId(appData.sales),
        saleDate: getCurrentDate()
    };
    
    appData.sales.push(newSale);
    updateSalesTable();
    updateSalesStats();
    saveData();
    
    showSuccessMessage('تم نسخ البيع بنجاح');
}