// Al-Wasiloon Fertilizer Factory Management System
// Complete JavaScript Application with Full CRUD Operations

// Application data with comprehensive sample data matching Replit version
let appData = JSON.parse(localStorage.getItem('al-wasiloon-fertilizer-data')) || {
    sales: [
        { 
            id: 1, 
            productName: "نترات الأمونيوم", 
            quantity: 25.5, 
            totalAmount: 56100, 
            clientName: "مزارع الدلتا", 
            clientContact: "01123456789", 
            saleDate: "2024-12-01", 
            createdAt: new Date().toISOString() 
        },
        { 
            id: 2, 
            productName: "فوسفات الصخر", 
            quantity: 18.2, 
            totalAmount: 32760, 
            clientName: "الشركة المصرية للزراعة", 
            clientContact: "01234567890", 
            saleDate: "2024-12-03", 
            createdAt: new Date().toISOString() 
        },
        { 
            id: 3, 
            productName: "كبريتات البوتاسيوم", 
            quantity: 30.0, 
            totalAmount: 48000, 
            clientName: "مجموعة النيل الزراعية", 
            clientContact: "01345678901", 
            saleDate: "2024-12-05", 
            createdAt: new Date().toISOString() 
        },
        { 
            id: 4, 
            productName: "اليوريا 46%", 
            quantity: 22.3, 
            totalAmount: 32240, 
            clientName: "أراضي المستقبل", 
            clientContact: "01456789012", 
            saleDate: "2024-12-07", 
            createdAt: new Date().toISOString() 
        }
    ],
    storage: [
        { 
            id: 1, 
            itemName: "نترات الأمونيوم", 
            itemType: "fertilizer", 
            quantity: 145.8, 
            unit: "tons", 
            location: "مستودع أ", 
            minStock: 50, 
            purchasePrice: 2200, 
            createdAt: new Date().toISOString() 
        },
        { 
            id: 2, 
            itemName: "فوسفات الصخر", 
            itemType: "chemical", 
            quantity: 89.5, 
            unit: "tons", 
            location: "مستودع ب", 
            minStock: 30, 
            purchasePrice: 1800, 
            createdAt: new Date().toISOString() 
        },
        { 
            id: 3, 
            itemName: "كبريتات البوتاسيوم", 
            itemType: "fertilizer", 
            quantity: 67.2, 
            unit: "tons", 
            location: "مستودع أ", 
            minStock: 40, 
            purchasePrice: 1600, 
            createdAt: new Date().toISOString() 
        },
        { 
            id: 4, 
            itemName: "اليوريا 46%", 
            itemType: "fertilizer", 
            quantity: 23.1, 
            unit: "tons", 
            location: "مستودع ج", 
            minStock: 50, 
            purchasePrice: 1450, 
            createdAt: new Date().toISOString() 
        },
        { 
            id: 5, 
            itemName: "كلوريد البوتاسيوم", 
            itemType: "chemical", 
            quantity: 42.7, 
            unit: "tons", 
            location: "مستودع ب", 
            minStock: 25, 
            purchasePrice: 1750, 
            createdAt: new Date().toISOString() 
        }
    ],
    expenses: [
        { 
            id: 1, 
            name: "فاتورة الكهرباء", 
            amount: 15000, 
            category: "utilities", 
            expenseDate: "2024-12-01", 
            createdAt: new Date().toISOString() 
        },
        { 
            id: 2, 
            name: "رواتب العمال", 
            amount: 45000, 
            category: "labor", 
            expenseDate: "2024-12-01", 
            createdAt: new Date().toISOString() 
        },
        { 
            id: 3, 
            name: "صيانة المعدات", 
            amount: 8500, 
            category: "maintenance", 
            expenseDate: "2024-12-03", 
            createdAt: new Date().toISOString() 
        },
        { 
            id: 4, 
            name: "شراء مواد خام", 
            amount: 32000, 
            category: "rawmaterials", 
            expenseDate: "2024-12-04", 
            createdAt: new Date().toISOString() 
        },
        { 
            id: 5, 
            name: "نقل البضائع", 
            amount: 12500, 
            category: "transportation", 
            expenseDate: "2024-12-06", 
            createdAt: new Date().toISOString() 
        },
        { 
            id: 6, 
            name: "لوازم مكتبية", 
            amount: 7000, 
            category: "administrative", 
            expenseDate: "2024-12-08", 
            createdAt: new Date().toISOString() 
        }
    ],
    workers: [
        { 
            id: 1, 
            name: "أحمد محمد علي", 
            position: "supervisor", 
            salary: 8500, 
            phone: "01123456789", 
            department: "production", 
            hireDate: "2023-01-15", 
            createdAt: new Date().toISOString() 
        },
        { 
            id: 2, 
            name: "فاطمة حسن محمود", 
            position: "operator", 
            salary: 5800, 
            phone: "01234567890", 
            department: "production", 
            hireDate: "2023-03-20", 
            createdAt: new Date().toISOString() 
        },
        { 
            id: 3, 
            name: "عمر علي إبراهيم", 
            position: "technician", 
            salary: 6700, 
            phone: "01345678901", 
            department: "maintenance", 
            hireDate: "2023-02-10", 
            createdAt: new Date().toISOString() 
        },
        { 
            id: 4, 
            name: "منى إبراهيم أحمد", 
            position: "manager", 
            salary: 12000, 
            phone: "01456789012", 
            department: "administration", 
            hireDate: "2022-11-05", 
            createdAt: new Date().toISOString() 
        },
        { 
            id: 5, 
            name: "خالد محمود سعد", 
            position: "driver", 
            salary: 4800, 
            phone: "01567890123", 
            department: "logistics", 
            hireDate: "2023-04-18", 
            createdAt: new Date().toISOString() 
        }
    ],
    activities: [
        { 
            id: 1, 
            title: "إنتاج دفعة جديدة من الأسمدة", 
            type: "production", 
            description: "إنتاج 50 طن من نترات الأمونيوم", 
            activityDate: "2024-12-01", 
            createdAt: new Date().toISOString() 
        },
        { 
            id: 2, 
            title: "صيانة دورية للمعدات", 
            type: "maintenance", 
            description: "فحص وصيانة خطوط الإنتاج الرئيسية", 
            activityDate: "2024-12-03", 
            createdAt: new Date().toISOString() 
        },
        { 
            id: 3, 
            title: "فحص جودة المنتجات", 
            type: "quality", 
            description: "تحليل عينات من اليوريا وفوسفات الصخر", 
            activityDate: "2024-12-04", 
            createdAt: new Date().toISOString() 
        },
        { 
            id: 4, 
            title: "توصيل طلبية للعميل", 
            type: "delivery", 
            description: "توصيل 25 طن نترات أمونيوم لمزارع الدلتا", 
            activityDate: "2024-12-05", 
            createdAt: new Date().toISOString() 
        },
        { 
            id: 5, 
            title: "دورة تدريبية للعمال", 
            type: "training", 
            description: "تدريب على معايير السلامة والأمان", 
            activityDate: "2024-12-07", 
            createdAt: new Date().toISOString() 
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
        // Navigation
        home: "الرئيسية",
        dashboard: "لوحة التحكم",
        sales: "المبيعات",
        storage: "المخزون",
        expenses: "المصروفات",
        workers: "العمال",
        activityLogs: "سجل الأنشطة",
        reports: "التقارير",
        settings: "الإعدادات",
        
        // Company info
        companyName: "مصنع الواصلون للأسمدة",
        managementSystem: "نظام الإدارة المالية",
        version: "الإصدار 2.0.0",
        currentTime: "الوقت الحالي:",
        
        // Hero section
        heroTitle: "مصنع الواصلون للأسمدة",
        heroSubtitle: "نظام إدارة مالية شامل ومتطور",
        viewSales: "عرض المبيعات",
        
        // Stats
        totalIncome: "إجمالي الدخل",
        totalExpenses: "إجمالي المصروفات",
        netProfit: "صافي الربح",
        totalProducts: "إجمالي المنتجات",
        totalRevenue: "إجمالي الإيرادات",
        incomeIncrease: "+20.1% من الشهر الماضي",
        expenseIncrease: "+5.2% من الشهر الماضي",
        profitMargin: "هامش 29.1%",
        activeProducts: "منتجات نشطة",
        salesOverview: "نظرة عامة على المبيعات",
        
        // Sales
        recordSale: "تسجيل بيع جديد",
        saleDescription: "أدخل تفاصيل البيع الجديد",
        salesHistory: "تاريخ المبيعات",
        salesHistoryDesc: "جميع المبيعات المسجلة",
        productName: "المنتج",
        quantity: "الكمية",
        amount: "المبلغ",
        clientName: "اسم العميل",
        clientContact: "رقم الهاتف",
        saleDate: "تاريخ البيع",
        selectProduct: "اختر المنتج",
        actions: "الإجراءات",
        editSale: "تعديل البيع",
        
        // Storage
        addStorageItem: "إضافة عنصر جديد للمخزون",
        storageDescription: "أدخل تفاصيل العنصر الجديد",
        storageInventory: "مخزون العناصر",
        storageInventoryDesc: "جميع عناصر المخزون",
        itemName: "اسم العنصر",
        itemType: "نوع العنصر",
        unit: "الوحدة",
        location: "الموقع",
        minStock: "الحد الأدنى للمخزون",
        status: "الحالة",
        fertilizer: "سماد",
        chemical: "مادة كيميائية",
        rawmaterial: "مادة خام",
        equipment: "معدات",
        tons: "طن",
        kg: "كيلوجرام",
        liters: "لتر",
        pieces: "قطعة",
        
        // Expenses
        addExpense: "إضافة مصروف جديد",
        expenseDescription: "أدخل تفاصيل المصروف",
        expenseHistory: "تاريخ المصروفات",
        expenseHistoryDesc: "جميع المصروفات المسجلة",
        expenseName: "اسم المصروف",
        category: "الفئة",
        expenseDate: "تاريخ المصروف",
        rawmaterials: "مواد خام",
        labor: "تكاليف العمالة",
        utilities: "المرافق",
        maintenance: "الصيانة",
        transportation: "النقل",
        administrative: "إدارية",
        other: "أخرى",
        
        // Workers
        addWorker: "إضافة عامل جديد",
        workerDescription: "أدخل بيانات العامل",
        workersList: "قائمة العمال",
        workersListDesc: "جميع العمال المسجلين",
        workerName: "اسم العامل",
        position: "المنصب",
        salary: "الراتب الشهري (ج.م)",
        phone: "رقم الهاتف",
        department: "القسم",
        hireDate: "تاريخ التوظيف",
        operator: "مشغل آلة",
        supervisor: "مشرف",
        technician: "فني",
        manager: "مدير",
        driver: "سائق",
        cleaner: "عامل نظافة",
        security: "أمن",
        production: "الإنتاج",
        maintenance2: "الصيانة",
        quality: "مراقبة الجودة",
        logistics: "اللوجستيات",
        administration: "الإدارة",
        
        // Activities
        addActivity: "إضافة نشاط جديد",
        activityDescription: "تسجيل نشاط أو حدث",
        activityHistory: "سجل الأنشطة",
        activityHistoryDesc: "جميع الأنشطة المسجلة",
        activityTitle: "عنوان النشاط",
        activityType: "نوع النشاط",
        qualitycheck: "فحص جودة",
        delivery: "توصيل",
        training: "تدريب",
        meeting: "اجتماع",
        
        // Reports
        monthlyIncome: "الدخل الشهري",
        monthlyExpenses: "المصروفات الشهرية",
        lowStockItems: "عناصر منخفضة المخزون",
        totalWorkers: "إجمالي العمال",
        financialReport: "التقرير المالي",
        financialReportDesc: "ملخص الوضع المالي",
        inventoryReport: "تقرير المخزون",
        inventoryReportDesc: "حالة المخزون الحالية",
        exportData: "تصدير البيانات",
        exportDataDesc: "تصدير البيانات كملف JSON",
        exportAll: "تصدير جميع البيانات",
        exportSales: "تصدير المبيعات",
        exportExpenses: "تصدير المصروفات",
        exportWorkers: "تصدير العمال",
        
        // Settings
        companySettings: "إعدادات الشركة",
        companySettingsDesc: "معلومات الشركة الأساسية",
        companyAddress: "العنوان",
        companyPhone: "رقم الهاتف",
        companyEmail: "البريد الإلكتروني",
        systemSettings: "إعدادات النظام",
        systemSettingsDesc: "إعدادات عامة للنظام",
        currency: "العملة",
        dateFormat: "تنسيق التاريخ",
        timeFormat: "تنسيق الوقت",
        fiscalYear: "السنة المالية",
        dataManagement: "إدارة البيانات",
        dataManagementDesc: "نسخ احتياطي ومسح البيانات",
        backupData: "عمل نسخة احتياطية",
        clearData: "مسح جميع البيانات",
        
        // Actions
        saveChanges: "حفظ التغييرات",
        cancel: "إلغاء",
        edit: "تعديل",
        delete: "حذف",
        confirmDelete: "هل أنت متأكد من الحذف؟"
    },
    en: {
        // Navigation
        home: "Home",
        dashboard: "Dashboard",
        sales: "Sales",
        storage: "Storage",
        expenses: "Expenses",
        workers: "Workers",
        activityLogs: "Activity Logs",
        reports: "Reports",
        settings: "Settings",
        
        // Company info
        companyName: "Al-Wasiloon Fertilizer Factory",
        managementSystem: "Financial Management System",
        version: "Version 2.0.0",
        currentTime: "Current Time:",
        
        // Hero section
        heroTitle: "Al-Wasiloon Fertilizer Factory",
        heroSubtitle: "Comprehensive and Advanced Financial Management System",
        viewSales: "View Sales",
        
        // Stats
        totalIncome: "Total Income",
        totalExpenses: "Total Expenses",
        netProfit: "Net Profit",
        totalProducts: "Total Products",
        totalRevenue: "Total Revenue",
        incomeIncrease: "+20.1% from last month",
        expenseIncrease: "+5.2% from last month",
        profitMargin: "29.1% margin",
        activeProducts: "Active products",
        salesOverview: "Sales Overview",
        
        // Sales
        recordSale: "Record New Sale",
        saleDescription: "Enter new sale details",
        salesHistory: "Sales History",
        salesHistoryDesc: "All recorded sales",
        productName: "Product",
        quantity: "Quantity",
        amount: "Amount",
        clientName: "Client Name",
        clientContact: "Phone Number",
        saleDate: "Sale Date",
        selectProduct: "Select Product",
        actions: "Actions",
        editSale: "Edit Sale",
        
        // Storage
        addStorageItem: "Add New Storage Item",
        storageDescription: "Enter new item details",
        storageInventory: "Storage Inventory",
        storageInventoryDesc: "All storage items",
        itemName: "Item Name",
        itemType: "Item Type",
        unit: "Unit",
        location: "Location",
        minStock: "Minimum Stock",
        status: "Status",
        fertilizer: "Fertilizer",
        chemical: "Chemical",
        rawmaterial: "Raw Material",
        equipment: "Equipment",
        tons: "Tons",
        kg: "Kilograms",
        liters: "Liters",
        pieces: "Pieces",
        
        // Other translations would continue similarly...
        saveChanges: "Save Changes",
        cancel: "Cancel",
        edit: "Edit",
        delete: "Delete",
        confirmDelete: "Are you sure you want to delete?"
    }
};

// Utility functions
function formatCurrency(amount) {
    const symbol = currentLanguage === 'ar' ? 'ج.م' : 'EGP';
    return `${symbol} ${amount.toLocaleString()}`;
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
    localStorage.setItem('al-wasiloon-fertilizer-data', JSON.stringify(appData));
}

function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.parentNode.removeChild(successDiv);
        }
    }, 3000);
}

// Language switching
function switchLanguage(lang) {
    currentLanguage = lang;
    
    // Update active language button
    document.querySelectorAll('.language-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`lang-${lang}`).classList.add('active');
    
    // Update HTML attributes
    const htmlRoot = document.querySelector('html');
    htmlRoot.setAttribute('lang', lang);
    htmlRoot.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    htmlRoot.className = lang === 'ar' ? 'rtl' : 'ltr';
    
    // Update translations
    updateTranslations();
    
    // Update currency display
    updateFinancialSummary();
    
    // Save preference
    localStorage.setItem('preferredLanguage', lang);
}

function updateTranslations() {
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            if (element.tagName === 'INPUT' && element.type !== 'submit') {
                element.placeholder = translations[currentLanguage][key];
            } else {
                element.textContent = translations[currentLanguage][key];
            }
        }
    });
}

// Page navigation
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page-content').forEach(page => {
        page.classList.remove('active');
    });
    
    // Remove active class from navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Show selected page
    const targetPage = document.getElementById(`${pageId}-page`);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Add active class to navigation
    if (event && event.target) {
        const navLink = event.target.closest('.nav-link');
        if (navLink) {
            navLink.classList.add('active');
        }
    }
    
    // Update page title
    const pageTitles = {
        'home': translations[currentLanguage].home,
        'dashboard': translations[currentLanguage].dashboard,
        'sales': translations[currentLanguage].sales,
        'storage': translations[currentLanguage].storage,
        'expenses': translations[currentLanguage].expenses,
        'workers': translations[currentLanguage].workers,
        'activity-logs': translations[currentLanguage].activityLogs,
        'reports': translations[currentLanguage].reports,
        'settings': translations[currentLanguage].settings
    };
    
    const titleElement = document.getElementById('page-title');
    if (titleElement && pageTitles[pageId]) {
        titleElement.textContent = pageTitles[pageId];
    }
    
    // Initialize page-specific content
    initializePage(pageId);
}

function initializePage(pageId) {
    switch(pageId) {
        case 'dashboard':
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
        case 'activity-logs':
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
    
    setTimeout(() => {
        const canvas = document.getElementById('salesChart');
        if (canvas && canvas.getContext) {
            if (charts.sales) {
                charts.sales.destroy();
            }
            
            charts.sales = new Chart(canvas.getContext('2d'), {
                type: 'line',
                data: {
                    labels: ['الأسبوع 1', 'الأسبوع 2', 'الأسبوع 3', 'الأسبوع 4'],
                    datasets: [{
                        label: 'المبيعات',
                        data: [35000, 42000, 38000, 54100],
                        borderColor: '#16a34a',
                        backgroundColor: 'rgba(22, 163, 74, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { 
                        legend: { display: false } 
                    },
                    scales: { 
                        y: { beginAtZero: true } 
                    }
                }
            });
        }
    }, 100);
}

function updateFinancialSummary() {
    const totalIncome = appData.sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
    const totalExpenses = appData.expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const netProfit = totalIncome - totalExpenses;
    const totalProducts = appData.storage.length;
    
    // Update home page stats
    const homeIncomeEl = document.getElementById('home-total-income');
    const homeExpensesEl = document.getElementById('home-total-expenses');
    const homeProfitEl = document.getElementById('home-net-profit');
    const homeProductsEl = document.getElementById('home-total-products');
    
    if (homeIncomeEl) homeIncomeEl.textContent = formatCurrency(totalIncome);
    if (homeExpensesEl) homeExpensesEl.textContent = formatCurrency(totalExpenses);
    if (homeProfitEl) homeProfitEl.textContent = formatCurrency(netProfit);
    if (homeProductsEl) homeProductsEl.textContent = totalProducts;
    
    // Update dashboard stats
    const dashRevenueEl = document.getElementById('dash-revenue');
    const dashExpensesEl = document.getElementById('dash-expenses');
    const dashProfitEl = document.getElementById('dash-profit');
    
    if (dashRevenueEl) dashRevenueEl.textContent = formatCurrency(totalIncome);
    if (dashExpensesEl) dashExpensesEl.textContent = formatCurrency(totalExpenses);
    if (dashProfitEl) dashProfitEl.textContent = formatCurrency(netProfit);
}

// Sales management
function initSales() {
    updateSalesTable();
    updateSalesProductOptions();
    document.getElementById('sale-date').value = getCurrentDate();
}

function updateSalesProductOptions() {
    const select = document.getElementById('sale-product');
    const editSelect = document.getElementById('edit-sale-product');
    
    if (!select) return;
    
    const options = `<option value="">${translations[currentLanguage].selectProduct}</option>` + 
        appData.storage.filter(item => item.quantity > 0)
            .map(item => `<option value="${item.itemName}">${item.itemName} (${item.quantity} ${item.unit})</option>`)
            .join('');
    
    select.innerHTML = options;
    if (editSelect) editSelect.innerHTML = options;
}

function updateSalesTable() {
    const tbody = document.getElementById('sales-table-body');
    if (!tbody) return;
    
    tbody.innerHTML = appData.sales.map(sale => `
        <tr>
            <td>${sale.productName}</td>
            <td>${sale.quantity} طن</td>
            <td>${formatCurrency(sale.totalAmount)}</td>
            <td>${sale.clientName}</td>
            <td>${sale.clientContact}</td>
            <td>${formatDate(sale.saleDate)}</td>
            <td>
                <div class="action-buttons">
                    <button onclick="editSale(${sale.id})" class="btn btn-warning">
                        ${translations[currentLanguage].edit}
                    </button>
                    <button onclick="deleteSale(${sale.id})" class="btn btn-danger">
                        ${translations[currentLanguage].delete}
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function addSale() {
    const productName = document.getElementById('sale-product').value;
    const quantity = parseFloat(document.getElementById('sale-quantity').value);
    const clientName = document.getElementById('sale-client').value;
    const clientContact = document.getElementById('sale-contact').value;
    const saleDate = document.getElementById('sale-date').value;
    
    if (!productName || !quantity || !clientName || !clientContact || !saleDate) {
        alert(currentLanguage === 'ar' ? 'يرجى ملء جميع الحقول' : 'Please fill all fields');
        return;
    }
    
    const storageItem = appData.storage.find(item => item.itemName === productName);
    if (!storageItem || storageItem.quantity < quantity) {
        alert(currentLanguage === 'ar' ? 'الكمية غير متوفرة في المخزون' : 'Insufficient stock');
        return;
    }
    
    const totalAmount = quantity * storageItem.purchasePrice * 1.2; // 20% markup
    
    const newSale = {
        id: generateId(appData.sales),
        productName,
        quantity,
        totalAmount,
        clientName,
        clientContact,
        saleDate,
        createdAt: new Date().toISOString()
    };
    
    appData.sales.unshift(newSale);
    storageItem.quantity -= quantity;
    
    updateSalesTable();
    updateSalesProductOptions();
    updateStorageTable();
    updateFinancialSummary();
    saveData();
    
    // Clear form
    document.getElementById('sale-product').selectedIndex = 0;
    document.getElementById('sale-quantity').value = '';
    document.getElementById('sale-client').value = '';
    document.getElementById('sale-contact').value = '';
    
    showSuccessMessage(currentLanguage === 'ar' ? 'تم تسجيل البيع بنجاح' : 'Sale recorded successfully');
}

function editSale(id) {
    const sale = appData.sales.find(s => s.id === id);
    if (!sale) return;
    
    editingId = id;
    
    document.getElementById('edit-sale-product').value = sale.productName;
    document.getElementById('edit-sale-quantity').value = sale.quantity;
    document.getElementById('edit-sale-client').value = sale.clientName;
    document.getElementById('edit-sale-contact').value = sale.clientContact;
    document.getElementById('edit-sale-date').value = sale.saleDate;
    
    showModal('edit-sale-modal');
}

function updateSale() {
    if (!editingId) return;
    
    const productName = document.getElementById('edit-sale-product').value;
    const quantity = parseFloat(document.getElementById('edit-sale-quantity').value);
    const clientName = document.getElementById('edit-sale-client').value;
    const clientContact = document.getElementById('edit-sale-contact').value;
    const saleDate = document.getElementById('edit-sale-date').value;
    
    if (!productName || !quantity || !clientName || !clientContact || !saleDate) {
        alert(currentLanguage === 'ar' ? 'يرجى ملء جميع الحقول' : 'Please fill all fields');
        return;
    }
    
    const saleIndex = appData.sales.findIndex(s => s.id === editingId);
    if (saleIndex === -1) return;
    
    const oldSale = appData.sales[saleIndex];
    const oldStorageItem = appData.storage.find(item => item.itemName === oldSale.productName);
    const newStorageItem = appData.storage.find(item => item.itemName === productName);
    
    // Restore old quantity
    if (oldStorageItem) {
        oldStorageItem.quantity += oldSale.quantity;
    }
    
    // Check new quantity
    if (!newStorageItem || newStorageItem.quantity < quantity) {
        if (oldStorageItem) {
            oldStorageItem.quantity -= oldSale.quantity; // Restore back
        }
        alert(currentLanguage === 'ar' ? 'الكمية غير متوفرة في المخزون' : 'Insufficient stock');
        return;
    }
    
    const totalAmount = quantity * newStorageItem.purchasePrice * 1.2;
    
    appData.sales[saleIndex] = {
        ...oldSale,
        productName,
        quantity,
        totalAmount,
        clientName,
        clientContact,
        saleDate
    };
    
    newStorageItem.quantity -= quantity;
    
    updateSalesTable();
    updateSalesProductOptions();
    updateStorageTable();
    updateFinancialSummary();
    saveData();
    closeModal('edit-sale-modal');
    
    showSuccessMessage(currentLanguage === 'ar' ? 'تم تحديث البيع بنجاح' : 'Sale updated successfully');
}

function deleteSale(id) {
    if (!confirm(translations[currentLanguage].confirmDelete)) return;
    
    const sale = appData.sales.find(s => s.id === id);
    if (sale) {
        const storageItem = appData.storage.find(item => item.itemName === sale.productName);
        if (storageItem) {
            storageItem.quantity += sale.quantity; // Restore stock
        }
    }
    
    appData.sales = appData.sales.filter(s => s.id !== id);
    
    updateSalesTable();
    updateSalesProductOptions();
    updateStorageTable();
    updateFinancialSummary();
    saveData();
    
    showSuccessMessage(currentLanguage === 'ar' ? 'تم حذف البيع بنجاح' : 'Sale deleted successfully');
}

// Storage management
function initStorage() {
    updateStorageTable();
    document.getElementById('storage-location').value = 'مستودع أ';
}

function updateStorageTable() {
    const tbody = document.getElementById('storage-table-body');
    if (!tbody) return;
    
    tbody.innerHTML = appData.storage.map(item => {
        const status = item.quantity <= item.minStock ? 
            `<span class="status-badge status-low">منخفض</span>` :
            item.quantity === 0 ?
            `<span class="status-badge status-out">نفد</span>` :
            `<span class="status-badge status-available">متوفر</span>`;
            
        return `
            <tr>
                <td>${item.itemName}</td>
                <td>${getItemTypeLabel(item.itemType)}</td>
                <td>${item.quantity} ${getUnitLabel(item.unit)}</td>
                <td>${getUnitLabel(item.unit)}</td>
                <td>${item.location}</td>
                <td>${status}</td>
                <td>
                    <div class="action-buttons">
                        <button onclick="deleteStorageItem(${item.id})" class="btn btn-danger">
                            ${translations[currentLanguage].delete}
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function addStorageItem() {
    const itemName = document.getElementById('storage-item-name').value;
    const itemType = document.getElementById('storage-item-type').value;
    const quantity = parseFloat(document.getElementById('storage-quantity').value);
    const unit = document.getElementById('storage-unit').value;
    const location = document.getElementById('storage-location').value;
    const minStock = parseFloat(document.getElementById('storage-min-stock').value);
    
    if (!itemName || !quantity || !location || !minStock) {
        alert(currentLanguage === 'ar' ? 'يرجى ملء جميع الحقول' : 'Please fill all fields');
        return;
    }
    
    const newItem = {
        id: generateId(appData.storage),
        itemName,
        itemType,
        quantity,
        unit,
        location,
        minStock,
        purchasePrice: 1500, // Default price
        createdAt: new Date().toISOString()
    };
    
    appData.storage.unshift(newItem);
    
    updateStorageTable();
    updateSalesProductOptions();
    saveData();
    
    // Clear form
    document.getElementById('storage-item-name').value = '';
    document.getElementById('storage-quantity').value = '';
    document.getElementById('storage-location').value = 'مستودع أ';
    document.getElementById('storage-min-stock').value = '';
    
    showSuccessMessage(currentLanguage === 'ar' ? 'تم إضافة العنصر للمخزون بنجاح' : 'Storage item added successfully');
}

function deleteStorageItem(id) {
    if (!confirm(translations[currentLanguage].confirmDelete)) return;
    
    appData.storage = appData.storage.filter(item => item.id !== id);
    
    updateStorageTable();
    updateSalesProductOptions();
    saveData();
    
    showSuccessMessage(currentLanguage === 'ar' ? 'تم حذف العنصر من المخزون بنجاح' : 'Storage item deleted successfully');
}

function getItemTypeLabel(type) {
    const types = {
        fertilizer: currentLanguage === 'ar' ? 'سماد' : 'Fertilizer',
        chemical: currentLanguage === 'ar' ? 'مادة كيميائية' : 'Chemical',
        rawmaterial: currentLanguage === 'ar' ? 'مادة خام' : 'Raw Material',
        equipment: currentLanguage === 'ar' ? 'معدات' : 'Equipment'
    };
    return types[type] || type;
}

function getUnitLabel(unit) {
    const units = {
        tons: currentLanguage === 'ar' ? 'طن' : 'Tons',
        kg: currentLanguage === 'ar' ? 'كيلوجرام' : 'Kilograms',
        liters: currentLanguage === 'ar' ? 'لتر' : 'Liters',
        pieces: currentLanguage === 'ar' ? 'قطعة' : 'Pieces'
    };
    return units[unit] || unit;
}

// Expenses management
function initExpenses() {
    updateExpensesTable();
    document.getElementById('expense-date').value = getCurrentDate();
}

function updateExpensesTable() {
    const tbody = document.getElementById('expenses-table-body');
    if (!tbody) return;
    
    tbody.innerHTML = appData.expenses.map(expense => `
        <tr>
            <td>${expense.name}</td>
            <td>${formatCurrency(expense.amount)}</td>
            <td>${getCategoryLabel(expense.category)}</td>
            <td>${formatDate(expense.expenseDate)}</td>
            <td>
                <div class="action-buttons">
                    <button onclick="deleteExpense(${expense.id})" class="btn btn-danger">
                        ${translations[currentLanguage].delete}
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function addExpense() {
    const name = document.getElementById('expense-name').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);
    const category = document.getElementById('expense-category').value;
    const expenseDate = document.getElementById('expense-date').value;
    
    if (!name || !amount || !category || !expenseDate) {
        alert(currentLanguage === 'ar' ? 'يرجى ملء جميع الحقول' : 'Please fill all fields');
        return;
    }
    
    const newExpense = {
        id: generateId(appData.expenses),
        name,
        amount,
        category,
        expenseDate,
        createdAt: new Date().toISOString()
    };
    
    appData.expenses.unshift(newExpense);
    
    updateExpensesTable();
    updateFinancialSummary();
    saveData();
    
    // Clear form
    document.getElementById('expense-name').value = '';
    document.getElementById('expense-amount').value = '';
    
    showSuccessMessage(currentLanguage === 'ar' ? 'تم إضافة المصروف بنجاح' : 'Expense added successfully');
}

function deleteExpense(id) {
    if (!confirm(translations[currentLanguage].confirmDelete)) return;
    
    appData.expenses = appData.expenses.filter(expense => expense.id !== id);
    
    updateExpensesTable();
    updateFinancialSummary();
    saveData();
    
    showSuccessMessage(currentLanguage === 'ar' ? 'تم حذف المصروف بنجاح' : 'Expense deleted successfully');
}

function getCategoryLabel(category) {
    const categories = {
        rawmaterials: currentLanguage === 'ar' ? 'مواد خام' : 'Raw Materials',
        labor: currentLanguage === 'ar' ? 'تكاليف العمالة' : 'Labor Costs',
        utilities: currentLanguage === 'ar' ? 'المرافق' : 'Utilities',
        maintenance: currentLanguage === 'ar' ? 'الصيانة' : 'Maintenance',
        transportation: currentLanguage === 'ar' ? 'النقل' : 'Transportation',
        administrative: currentLanguage === 'ar' ? 'إدارية' : 'Administrative',
        other: currentLanguage === 'ar' ? 'أخرى' : 'Other'
    };
    return categories[category] || category;
}

// Workers management
function initWorkers() {
    updateWorkersTable();
    document.getElementById('worker-hire-date').value = getCurrentDate();
}

function updateWorkersTable() {
    const tbody = document.getElementById('workers-table-body');
    if (!tbody) return;
    
    tbody.innerHTML = appData.workers.map(worker => `
        <tr>
            <td>${worker.name}</td>
            <td>${getPositionLabel(worker.position)}</td>
            <td>${formatCurrency(worker.salary)}</td>
            <td>${worker.phone}</td>
            <td>${getDepartmentLabel(worker.department)}</td>
            <td>${formatDate(worker.hireDate)}</td>
            <td>
                <div class="action-buttons">
                    <button onclick="deleteWorker(${worker.id})" class="btn btn-danger">
                        ${translations[currentLanguage].delete}
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function addWorker() {
    const name = document.getElementById('worker-name').value;
    const position = document.getElementById('worker-position').value;
    const salary = parseFloat(document.getElementById('worker-salary').value);
    const phone = document.getElementById('worker-phone').value;
    const department = document.getElementById('worker-department').value;
    const hireDate = document.getElementById('worker-hire-date').value;
    
    if (!name || !salary || !phone || !hireDate) {
        alert(currentLanguage === 'ar' ? 'يرجى ملء جميع الحقول' : 'Please fill all fields');
        return;
    }
    
    const newWorker = {
        id: generateId(appData.workers),
        name,
        position,
        salary,
        phone,
        department,
        hireDate,
        createdAt: new Date().toISOString()
    };
    
    appData.workers.unshift(newWorker);
    
    updateWorkersTable();
    saveData();
    
    // Clear form
    document.getElementById('worker-name').value = '';
    document.getElementById('worker-salary').value = '';
    document.getElementById('worker-phone').value = '';
    
    showSuccessMessage(currentLanguage === 'ar' ? 'تم إضافة العامل بنجاح' : 'Worker added successfully');
}

function deleteWorker(id) {
    if (!confirm(translations[currentLanguage].confirmDelete)) return;
    
    appData.workers = appData.workers.filter(worker => worker.id !== id);
    
    updateWorkersTable();
    saveData();
    
    showSuccessMessage(currentLanguage === 'ar' ? 'تم حذف العامل بنجاح' : 'Worker deleted successfully');
}

function getPositionLabel(position) {
    const positions = {
        operator: currentLanguage === 'ar' ? 'مشغل آلة' : 'Machine Operator',
        supervisor: currentLanguage === 'ar' ? 'مشرف' : 'Supervisor',
        technician: currentLanguage === 'ar' ? 'فني' : 'Technician',
        manager: currentLanguage === 'ar' ? 'مدير' : 'Manager',
        driver: currentLanguage === 'ar' ? 'سائق' : 'Driver',
        cleaner: currentLanguage === 'ar' ? 'عامل نظافة' : 'Cleaner',
        security: currentLanguage === 'ar' ? 'أمن' : 'Security'
    };
    return positions[position] || position;
}

function getDepartmentLabel(department) {
    const departments = {
        production: currentLanguage === 'ar' ? 'الإنتاج' : 'Production',
        maintenance: currentLanguage === 'ar' ? 'الصيانة' : 'Maintenance',
        quality: currentLanguage === 'ar' ? 'مراقبة الجودة' : 'Quality Control',
        logistics: currentLanguage === 'ar' ? 'اللوجستيات' : 'Logistics',
        administration: currentLanguage === 'ar' ? 'الإدارة' : 'Administration'
    };
    return departments[department] || department;
}

// Activity logs management
function initActivityLogs() {
    updateActivitiesTable();
    document.getElementById('activity-date').value = getCurrentDate();
}

function updateActivitiesTable() {
    const tbody = document.getElementById('activities-table-body');
    if (!tbody) return;
    
    tbody.innerHTML = appData.activities.map(activity => `
        <tr>
            <td>${activity.title}</td>
            <td>${getActivityTypeLabel(activity.type)}</td>
            <td>${activity.description}</td>
            <td>${formatDate(activity.activityDate)}</td>
            <td>
                <div class="action-buttons">
                    <button onclick="deleteActivity(${activity.id})" class="btn btn-danger">
                        ${translations[currentLanguage].delete}
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function addActivity() {
    const title = document.getElementById('activity-title').value;
    const type = document.getElementById('activity-type').value;
    const description = document.getElementById('activity-description').value;
    const activityDate = document.getElementById('activity-date').value;
    
    if (!title || !description || !activityDate) {
        alert(currentLanguage === 'ar' ? 'يرجى ملء جميع الحقول' : 'Please fill all fields');
        return;
    }
    
    const newActivity = {
        id: generateId(appData.activities),
        title,
        type,
        description,
        activityDate,
        createdAt: new Date().toISOString()
    };
    
    appData.activities.unshift(newActivity);
    
    updateActivitiesTable();
    saveData();
    
    // Clear form
    document.getElementById('activity-title').value = '';
    document.getElementById('activity-description').value = '';
    
    showSuccessMessage(currentLanguage === 'ar' ? 'تم إضافة النشاط بنجاح' : 'Activity added successfully');
}

function deleteActivity(id) {
    if (!confirm(translations[currentLanguage].confirmDelete)) return;
    
    appData.activities = appData.activities.filter(activity => activity.id !== id);
    
    updateActivitiesTable();
    saveData();
    
    showSuccessMessage(currentLanguage === 'ar' ? 'تم حذف النشاط بنجاح' : 'Activity deleted successfully');
}

function getActivityTypeLabel(type) {
    const types = {
        production: currentLanguage === 'ar' ? 'إنتاج' : 'Production',
        maintenance: currentLanguage === 'ar' ? 'صيانة' : 'Maintenance',
        quality: currentLanguage === 'ar' ? 'فحص جودة' : 'Quality Check',
        delivery: currentLanguage === 'ar' ? 'توصيل' : 'Delivery',
        training: currentLanguage === 'ar' ? 'تدريب' : 'Training',
        meeting: currentLanguage === 'ar' ? 'اجتماع' : 'Meeting',
        other: currentLanguage === 'ar' ? 'أخرى' : 'Other'
    };
    return types[type] || type;
}

// Reports initialization
function initReports() {
    updateReportsData();
    initFinancialChart();
    generateInventoryReport();
}

function updateReportsData() {
    const totalIncome = appData.sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
    const totalExpenses = appData.expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const lowStockCount = appData.storage.filter(item => item.quantity <= item.minStock).length;
    const totalWorkers = appData.workers.length;
    
    document.getElementById('monthly-income').textContent = formatCurrency(totalIncome);
    document.getElementById('monthly-expenses').textContent = formatCurrency(totalExpenses);
    document.getElementById('low-stock-count').textContent = lowStockCount;
    document.getElementById('total-workers').textContent = totalWorkers;
}

function initFinancialChart() {
    setTimeout(() => {
        const canvas = document.getElementById('financialChart');
        if (canvas && canvas.getContext) {
            if (charts.financial) {
                charts.financial.destroy();
            }
            
            const totalIncome = appData.sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
            const totalExpenses = appData.expenses.reduce((sum, expense) => sum + expense.amount, 0);
            
            charts.financial = new Chart(canvas.getContext('2d'), {
                type: 'doughnut',
                data: {
                    labels: ['الإيرادات', 'المصروفات'],
                    datasets: [{
                        data: [totalIncome, totalExpenses],
                        backgroundColor: ['#16a34a', '#ef4444'],
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
        }
    }, 100);
}

function generateInventoryReport() {
    const reportContent = document.getElementById('inventory-report-content');
    if (!reportContent) return;
    
    const lowStockItems = appData.storage.filter(item => item.quantity <= item.minStock);
    
    reportContent.innerHTML = `
        <div style="margin-bottom: 16px;">
            <h4 style="color: var(--warning-500); margin-bottom: 8px;">عناصر منخفضة المخزون</h4>
            ${lowStockItems.length === 0 ? 
                '<p>جميع العناصر في المخزون بكميات كافية</p>' :
                lowStockItems.map(item => `
                    <div style="padding: 8px; background: #fef3c7; border-radius: 4px; margin-bottom: 8px;">
                        <strong>${item.itemName}</strong> - متبقي: ${item.quantity} ${getUnitLabel(item.unit)} (الحد الأدنى: ${item.minStock})
                    </div>
                `).join('')
            }
        </div>
        
        <div>
            <h4 style="margin-bottom: 8px;">إجمالي قيمة المخزون</h4>
            <p style="font-size: 18px; font-weight: 600; color: var(--success-600);">
                ${formatCurrency(appData.storage.reduce((sum, item) => sum + (item.quantity * item.purchasePrice), 0))}
            </p>
        </div>
    `;
}

// Data export functions
function exportData(type) {
    let data;
    let filename;
    
    switch(type) {
        case 'all':
            data = appData;
            filename = 'fertilizer-factory-complete-data';
            break;
        case 'sales':
            data = appData.sales;
            filename = 'fertilizer-factory-sales';
            break;
        case 'expenses':
            data = appData.expenses;
            filename = 'fertilizer-factory-expenses';
            break;
        case 'workers':
            data = appData.workers;
            filename = 'fertilizer-factory-workers';
            break;
        default:
            return;
    }
    
    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showSuccessMessage(currentLanguage === 'ar' ? 'تم تصدير البيانات بنجاح' : 'Data exported successfully');
}

// Settings functions
function backupData() {
    exportData('all');
}

function clearAllData() {
    if (confirm(currentLanguage === 'ar' ? 'هل أنت متأكد من مسح جميع البيانات؟ هذا الإجراء لا يمكن التراجع عنه.' : 'Are you sure you want to clear all data? This action cannot be undone.')) {
        localStorage.removeItem('al-wasiloon-fertilizer-data');
        location.reload();
    }
}

// Modal functions
function showModal(modalId) {
    document.getElementById(modalId).classList.remove('hidden');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
    editingId = null;
}

// Time update
function updateCurrentTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString(currentLanguage === 'ar' ? 'ar-EG' : 'en-US');
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
        timeElement.textContent = timeString;
    }
}

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    // Set saved language or default to Arabic
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'ar';
    switchLanguage(savedLanguage);
    
    // Update time
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);
    
    // Initialize financial summary
    updateFinancialSummary();
    
    // Initialize home page (default)
    showPage('home');
});

// Handle modal clicks outside content
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        const modalId = event.target.id;
        closeModal(modalId);
    }
});