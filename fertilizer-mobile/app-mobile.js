// Al-Wasiloon Fertilizer Factory Mobile App
// Progressive Web App with Full Offline Functionality

// Application data with comprehensive sample data
let appData = JSON.parse(localStorage.getItem('al-wasiloon-fertilizer-mobile-data')) || {
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
let charts = {};
let deferredPrompt;

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
        
        // Company info
        companyName: "مصنع الواصلون للأسمدة",
        managementSystem: "نظام الإدارة المالية",
        
        // Stats
        totalIncome: "إجمالي الدخل",
        totalExpenses: "إجمالي المصروفات", 
        netProfit: "صافي الربح",
        totalProducts: "إجمالي المنتجات",
        totalRevenue: "إجمالي الإيرادات",
        financialOverview: "نظرة مالية عامة",
        salesChart: "مخطط المبيعات",
        monthlyIncome: "الدخل الشهري",
        monthlyExpenses: "المصروفات الشهرية",
        lowStockItems: "مخزون منخفض",
        totalWorkers: "إجمالي العمال",
        
        // Quick Access
        quickAccess: "الوصول السريع",
        quickAccessDesc: "انتقل بسرعة إلى أي قسم",
        
        // Sales
        recordSale: "تسجيل بيع جديد",
        salesHistory: "تاريخ المبيعات",
        productName: "المنتج",
        quantity: "الكمية",
        amount: "المبلغ",
        clientName: "اسم العميل",
        clientContact: "رقم الهاتف",
        saleDate: "تاريخ البيع",
        selectProduct: "اختر المنتج",
        actions: "الإجراءات",
        
        // Storage
        addStorageItem: "إضافة للمخزون",
        storageInventory: "المخزون",
        itemName: "اسم العنصر",
        location: "الموقع",
        status: "الحالة",
        
        // Expenses
        addExpense: "إضافة مصروف",
        expenseHistory: "المصروفات",
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
        addWorker: "إضافة عامل",
        workersList: "العمال",
        workerName: "اسم العامل",
        salary: "الراتب الشهري (ج.م)",
        phone: "رقم الهاتف",
        
        // Activities
        addActivity: "إضافة نشاط",
        activityHistory: "الأنشطة",
        activityTitle: "عنوان النشاط",
        activityDescription: "وصف النشاط",
        activityDate: "تاريخ النشاط",
        
        // Reports
        exportData: "تصدير البيانات",
        exportAll: "تصدير جميع البيانات",
        
        // Actions
        edit: "تعديل",
        delete: "حذف",
        confirmDelete: "هل أنت متأكد من الحذف؟",
        
        // PWA
        installApp: "تثبيت التطبيق"
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
        
        // Company info
        companyName: "Al-Wasiloon Fertilizer Factory",
        managementSystem: "Financial Management System",
        
        // Stats
        totalIncome: "Total Income",
        totalExpenses: "Total Expenses",
        netProfit: "Net Profit", 
        totalProducts: "Total Products",
        totalRevenue: "Total Revenue",
        financialOverview: "Financial Overview",
        salesChart: "Sales Chart",
        monthlyIncome: "Monthly Income",
        monthlyExpenses: "Monthly Expenses",
        lowStockItems: "Low Stock",
        totalWorkers: "Total Workers",
        
        // Quick Access
        quickAccess: "Quick Access",
        quickAccessDesc: "Navigate quickly to any section",
        
        // Sales
        recordSale: "Record New Sale",
        salesHistory: "Sales History", 
        productName: "Product",
        quantity: "Quantity",
        amount: "Amount",
        clientName: "Client Name",
        clientContact: "Phone Number",
        saleDate: "Sale Date",
        selectProduct: "Select Product",
        actions: "Actions",
        
        // Storage
        addStorageItem: "Add to Storage",
        storageInventory: "Storage",
        itemName: "Item Name",
        location: "Location",
        status: "Status",
        
        // Expenses
        addExpense: "Add Expense",
        expenseHistory: "Expenses",
        expenseName: "Expense Name",
        category: "Category",
        expenseDate: "Expense Date",
        rawmaterials: "Raw Materials",
        labor: "Labor Costs",
        utilities: "Utilities",
        maintenance: "Maintenance",
        transportation: "Transportation", 
        administrative: "Administrative",
        other: "Other",
        
        // Workers
        addWorker: "Add Worker",
        workersList: "Workers",
        workerName: "Worker Name",
        salary: "Monthly Salary (EGP)",
        phone: "Phone Number",
        
        // Activities
        addActivity: "Add Activity",
        activityHistory: "Activities",
        activityTitle: "Activity Title",
        activityDescription: "Activity Description",
        activityDate: "Activity Date",
        
        // Reports
        exportData: "Export Data",
        exportAll: "Export All Data",
        
        // Actions
        edit: "Edit",
        delete: "Delete",
        confirmDelete: "Are you sure you want to delete?",
        
        // PWA
        installApp: "Install App"
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
    localStorage.setItem('al-wasiloon-fertilizer-mobile-data', JSON.stringify(appData));
}

function showToast(message) {
    const toast = document.getElementById('toast-mobile');
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Language switching
function switchLanguage() {
    currentLanguage = currentLanguage === 'ar' ? 'en' : 'ar';
    
    // Update HTML attributes
    const htmlRoot = document.querySelector('html');
    htmlRoot.setAttribute('lang', currentLanguage);
    htmlRoot.setAttribute('dir', currentLanguage === 'ar' ? 'rtl' : 'ltr');
    htmlRoot.className = currentLanguage === 'ar' ? 'rtl' : 'ltr';
    
    // Update body class
    document.body.className = currentLanguage === 'ar' ? 'rtl' : 'ltr';
    
    // Update language button
    document.getElementById('lang-text').textContent = currentLanguage === 'ar' ? 'EN' : 'عر';
    
    // Update translations
    updateTranslations();
    
    // Update currency display
    updateFinancialSummary();
    
    // Save preference
    localStorage.setItem('preferredLanguageMobile', currentLanguage);
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

// Sidebar functions
function toggleSidebar() {
    const sidebar = document.querySelector('.mobile-sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    
    sidebar.classList.add('open');
    overlay.classList.add('show');
}

function closeSidebar() {
    const sidebar = document.querySelector('.mobile-sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
}

// Page navigation
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page-content').forEach(page => {
        page.classList.remove('active');
    });
    
    // Remove active class from sidebar navigation
    document.querySelectorAll('.nav-link-mobile').forEach(link => {
        link.classList.remove('active');
    });
    
    // Remove active class from bottom navigation
    document.querySelectorAll('.bottom-nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Show selected page
    const targetPage = document.getElementById(`${pageId}-page`);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Add active class to navigation
    const sidebarLink = document.querySelector(`.nav-link-mobile[onclick*="${pageId}"]`);
    if (sidebarLink) {
        sidebarLink.classList.add('active');
    }
    
    const bottomNavItem = document.querySelector(`.bottom-nav-item[onclick*="${pageId}"]`);
    if (bottomNavItem) {
        bottomNavItem.classList.add('active');
    }
    
    // Initialize page-specific content
    initializePage(pageId);
    
    // Close sidebar
    closeSidebar();
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
        const canvas = document.getElementById('salesChartMobile');
        if (canvas && canvas.getContext) {
            if (charts.salesMobile) {
                charts.salesMobile.destroy();
            }
            
            charts.salesMobile = new Chart(canvas.getContext('2d'), {
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
    const homeIncomeEl = document.getElementById('home-income-mobile');
    const homeExpensesEl = document.getElementById('home-expenses-mobile');
    const homeProfitEl = document.getElementById('home-profit-mobile');
    const homeProductsEl = document.getElementById('home-products-mobile');
    
    if (homeIncomeEl) homeIncomeEl.textContent = formatCurrency(totalIncome);
    if (homeExpensesEl) homeExpensesEl.textContent = formatCurrency(totalExpenses);
    if (homeProfitEl) homeProfitEl.textContent = formatCurrency(netProfit);
    if (homeProductsEl) homeProductsEl.textContent = totalProducts;
    
    // Update dashboard stats
    const dashRevenueEl = document.getElementById('dash-revenue-mobile');
    const dashExpensesEl = document.getElementById('dash-expenses-mobile');
    const dashProfitEl = document.getElementById('dash-profit-mobile');
    
    if (dashRevenueEl) dashRevenueEl.textContent = formatCurrency(totalIncome);
    if (dashExpensesEl) dashExpensesEl.textContent = formatCurrency(totalExpenses);
    if (dashProfitEl) dashProfitEl.textContent = formatCurrency(netProfit);
    
    // Update reports stats
    const monthlyIncomeEl = document.getElementById('monthly-income-mobile');
    const monthlyExpensesEl = document.getElementById('monthly-expenses-mobile');
    const lowStockEl = document.getElementById('low-stock-count-mobile');
    const totalWorkersEl = document.getElementById('total-workers-mobile');
    
    if (monthlyIncomeEl) monthlyIncomeEl.textContent = formatCurrency(totalIncome);
    if (monthlyExpensesEl) monthlyExpensesEl.textContent = formatCurrency(totalExpenses);
    if (lowStockEl) lowStockEl.textContent = appData.storage.filter(item => item.quantity <= item.minStock).length;
    if (totalWorkersEl) totalWorkersEl.textContent = appData.workers.length;
}

// Sales management
function initSales() {
    updateSalesTable();
    updateSalesProductOptions();
    document.getElementById('sale-date-mobile').value = getCurrentDate();
}

function updateSalesProductOptions() {
    const select = document.getElementById('sale-product-mobile');
    if (!select) return;
    
    const options = `<option value="">${translations[currentLanguage].selectProduct}</option>` + 
        appData.storage.filter(item => item.quantity > 0)
            .map(item => `<option value="${item.itemName}">${item.itemName} (${item.quantity} طن)</option>`)
            .join('');
    
    select.innerHTML = options;
}

function updateSalesTable() {
    const tbody = document.getElementById('sales-table-mobile');
    if (!tbody) return;
    
    tbody.innerHTML = appData.sales.map(sale => `
        <tr>
            <td>${sale.productName}</td>
            <td>${sale.quantity} طن</td>
            <td>${formatCurrency(sale.totalAmount)}</td>
            <td>${sale.clientName}</td>
            <td>
                <div class="action-buttons-mobile">
                    <button onclick="deleteSaleMobile(${sale.id})" class="btn-mobile btn-danger-mobile">
                        ${translations[currentLanguage].delete}
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function addSaleMobile() {
    const productName = document.getElementById('sale-product-mobile').value;
    const quantity = parseFloat(document.getElementById('sale-quantity-mobile').value);
    const clientName = document.getElementById('sale-client-mobile').value;
    const clientContact = document.getElementById('sale-contact-mobile').value;
    const saleDate = document.getElementById('sale-date-mobile').value;
    
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
    document.getElementById('sale-product-mobile').selectedIndex = 0;
    document.getElementById('sale-quantity-mobile').value = '';
    document.getElementById('sale-client-mobile').value = '';
    document.getElementById('sale-contact-mobile').value = '';
    
    showToast(currentLanguage === 'ar' ? 'تم تسجيل البيع بنجاح' : 'Sale recorded successfully');
}

function deleteSaleMobile(id) {
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
    
    showToast(currentLanguage === 'ar' ? 'تم حذف البيع بنجاح' : 'Sale deleted successfully');
}

// Storage management
function initStorage() {
    updateStorageTable();
}

function updateStorageTable() {
    const tbody = document.getElementById('storage-table-mobile');
    if (!tbody) return;
    
    tbody.innerHTML = appData.storage.map(item => {
        const status = item.quantity <= item.minStock ? 
            `<span class="status-badge-mobile status-low">منخفض</span>` :
            item.quantity === 0 ?
            `<span class="status-badge-mobile status-out">نفد</span>` :
            `<span class="status-badge-mobile status-available">متوفر</span>`;
            
        return `
            <tr>
                <td>${item.itemName}</td>
                <td>${item.quantity} طن</td>
                <td>${status}</td>
                <td>
                    <div class="action-buttons-mobile">
                        <button onclick="deleteStorageItemMobile(${item.id})" class="btn-mobile btn-danger-mobile">
                            ${translations[currentLanguage].delete}
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function addStorageItemMobile() {
    const itemName = document.getElementById('storage-item-name-mobile').value;
    const quantity = parseFloat(document.getElementById('storage-quantity-mobile').value);
    const location = document.getElementById('storage-location-mobile').value;
    
    if (!itemName || !quantity || !location) {
        alert(currentLanguage === 'ar' ? 'يرجى ملء جميع الحقول' : 'Please fill all fields');
        return;
    }
    
    const newItem = {
        id: generateId(appData.storage),
        itemName,
        itemType: 'fertilizer',
        quantity,
        unit: 'tons',
        location,
        minStock: 30,
        purchasePrice: 1500,
        createdAt: new Date().toISOString()
    };
    
    appData.storage.unshift(newItem);
    
    updateStorageTable();
    updateSalesProductOptions();
    saveData();
    
    // Clear form
    document.getElementById('storage-item-name-mobile').value = '';
    document.getElementById('storage-quantity-mobile').value = '';
    document.getElementById('storage-location-mobile').value = 'مستودع أ';
    
    showToast(currentLanguage === 'ar' ? 'تم إضافة العنصر للمخزون بنجاح' : 'Storage item added successfully');
}

function deleteStorageItemMobile(id) {
    if (!confirm(translations[currentLanguage].confirmDelete)) return;
    
    appData.storage = appData.storage.filter(item => item.id !== id);
    
    updateStorageTable();
    updateSalesProductOptions();
    saveData();
    
    showToast(currentLanguage === 'ar' ? 'تم حذف العنصر من المخزون بنجاح' : 'Storage item deleted successfully');
}

// Expenses management
function initExpenses() {
    updateExpensesTable();
    document.getElementById('expense-date-mobile').value = getCurrentDate();
}

function updateExpensesTable() {
    const tbody = document.getElementById('expenses-table-mobile');
    if (!tbody) return;
    
    tbody.innerHTML = appData.expenses.map(expense => `
        <tr>
            <td>${expense.name}</td>
            <td>${formatCurrency(expense.amount)}</td>
            <td>${getCategoryLabel(expense.category)}</td>
            <td>
                <div class="action-buttons-mobile">
                    <button onclick="deleteExpenseMobile(${expense.id})" class="btn-mobile btn-danger-mobile">
                        ${translations[currentLanguage].delete}
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function addExpenseMobile() {
    const name = document.getElementById('expense-name-mobile').value;
    const amount = parseFloat(document.getElementById('expense-amount-mobile').value);
    const category = document.getElementById('expense-category-mobile').value;
    const expenseDate = document.getElementById('expense-date-mobile').value;
    
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
    document.getElementById('expense-name-mobile').value = '';
    document.getElementById('expense-amount-mobile').value = '';
    
    showToast(currentLanguage === 'ar' ? 'تم إضافة المصروف بنجاح' : 'Expense added successfully');
}

function deleteExpenseMobile(id) {
    if (!confirm(translations[currentLanguage].confirmDelete)) return;
    
    appData.expenses = appData.expenses.filter(expense => expense.id !== id);
    
    updateExpensesTable();
    updateFinancialSummary();
    saveData();
    
    showToast(currentLanguage === 'ar' ? 'تم حذف المصروف بنجاح' : 'Expense deleted successfully');
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
}

function updateWorkersTable() {
    const tbody = document.getElementById('workers-table-mobile');
    if (!tbody) return;
    
    tbody.innerHTML = appData.workers.map(worker => `
        <tr>
            <td>${worker.name}</td>
            <td>${formatCurrency(worker.salary)}</td>
            <td>${worker.phone}</td>
            <td>
                <div class="action-buttons-mobile">
                    <button onclick="deleteWorkerMobile(${worker.id})" class="btn-mobile btn-danger-mobile">
                        ${translations[currentLanguage].delete}
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function addWorkerMobile() {
    const name = document.getElementById('worker-name-mobile').value;
    const salary = parseFloat(document.getElementById('worker-salary-mobile').value);
    const phone = document.getElementById('worker-phone-mobile').value;
    
    if (!name || !salary || !phone) {
        alert(currentLanguage === 'ar' ? 'يرجى ملء جميع الحقول' : 'Please fill all fields');
        return;
    }
    
    const newWorker = {
        id: generateId(appData.workers),
        name,
        position: 'operator',
        salary,
        phone,
        department: 'production',
        hireDate: getCurrentDate(),
        createdAt: new Date().toISOString()
    };
    
    appData.workers.unshift(newWorker);
    
    updateWorkersTable();
    updateFinancialSummary();
    saveData();
    
    // Clear form
    document.getElementById('worker-name-mobile').value = '';
    document.getElementById('worker-salary-mobile').value = '';
    document.getElementById('worker-phone-mobile').value = '';
    
    showToast(currentLanguage === 'ar' ? 'تم إضافة العامل بنجاح' : 'Worker added successfully');
}

function deleteWorkerMobile(id) {
    if (!confirm(translations[currentLanguage].confirmDelete)) return;
    
    appData.workers = appData.workers.filter(worker => worker.id !== id);
    
    updateWorkersTable();
    updateFinancialSummary();
    saveData();
    
    showToast(currentLanguage === 'ar' ? 'تم حذف العامل بنجاح' : 'Worker deleted successfully');
}

// Activity logs management
function initActivityLogs() {
    updateActivitiesTable();
    document.getElementById('activity-date-mobile').value = getCurrentDate();
}

function updateActivitiesTable() {
    const tbody = document.getElementById('activities-table-mobile');
    if (!tbody) return;
    
    tbody.innerHTML = appData.activities.map(activity => `
        <tr>
            <td>${activity.title}</td>
            <td>${formatDate(activity.activityDate)}</td>
            <td>
                <div class="action-buttons-mobile">
                    <button onclick="deleteActivityMobile(${activity.id})" class="btn-mobile btn-danger-mobile">
                        ${translations[currentLanguage].delete}
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function addActivityMobile() {
    const title = document.getElementById('activity-title-mobile').value;
    const description = document.getElementById('activity-description-mobile').value;
    const activityDate = document.getElementById('activity-date-mobile').value;
    
    if (!title || !description || !activityDate) {
        alert(currentLanguage === 'ar' ? 'يرجى ملء جميع الحقول' : 'Please fill all fields');
        return;
    }
    
    const newActivity = {
        id: generateId(appData.activities),
        title,
        type: 'production',
        description,
        activityDate,
        createdAt: new Date().toISOString()
    };
    
    appData.activities.unshift(newActivity);
    
    updateActivitiesTable();
    saveData();
    
    // Clear form
    document.getElementById('activity-title-mobile').value = '';
    document.getElementById('activity-description-mobile').value = '';
    
    showToast(currentLanguage === 'ar' ? 'تم إضافة النشاط بنجاح' : 'Activity added successfully');
}

function deleteActivityMobile(id) {
    if (!confirm(translations[currentLanguage].confirmDelete)) return;
    
    appData.activities = appData.activities.filter(activity => activity.id !== id);
    
    updateActivitiesTable();
    saveData();
    
    showToast(currentLanguage === 'ar' ? 'تم حذف النشاط بنجاح' : 'Activity deleted successfully');
}

// Reports initialization
function initReports() {
    updateFinancialSummary();
}

// Data export functions
function exportData(type) {
    let data;
    let filename;
    
    switch(type) {
        case 'all':
            data = appData;
            filename = 'fertilizer-factory-mobile-data';
            break;
        default:
            return;
    }
    
    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    
    // For mobile, use the Web Share API if available
    if (navigator.share) {
        const file = new File([blob], `${filename}-${new Date().toISOString().split('T')[0]}.json`, {
            type: 'application/json'
        });
        
        navigator.share({
            files: [file],
            title: 'Export Data',
            text: 'Factory management data export'
        }).then(() => {
            showToast(currentLanguage === 'ar' ? 'تم تصدير البيانات بنجاح' : 'Data exported successfully');
        }).catch(() => {
            // Fallback to download
            downloadFile(blob, filename);
        });
    } else {
        // Fallback to download
        downloadFile(blob, filename);
    }
}

function downloadFile(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast(currentLanguage === 'ar' ? 'تم تصدير البيانات بنجاح' : 'Data exported successfully');
}

// PWA functionality
function installPWA() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                showToast(currentLanguage === 'ar' ? 'جاري تثبيت التطبيق...' : 'Installing app...');
            }
            deferredPrompt = null;
            document.getElementById('pwa-install-btn').style.display = 'none';
        });
    }
}

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    // Set saved language or default to Arabic
    const savedLanguage = localStorage.getItem('preferredLanguageMobile') || 'ar';
    currentLanguage = savedLanguage;
    
    // Update HTML attributes
    const htmlRoot = document.querySelector('html');
    htmlRoot.setAttribute('lang', currentLanguage);
    htmlRoot.setAttribute('dir', currentLanguage === 'ar' ? 'rtl' : 'ltr');
    htmlRoot.className = currentLanguage === 'ar' ? 'rtl' : 'ltr';
    document.body.className = currentLanguage === 'ar' ? 'rtl' : 'ltr';
    
    // Update language button
    document.getElementById('lang-text').textContent = currentLanguage === 'ar' ? 'EN' : 'عر';
    
    // Update translations
    updateTranslations();
    
    // Initialize financial summary
    updateFinancialSummary();
    
    // Initialize home page (default)
    showPage('home');
    
    // PWA install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        document.getElementById('pwa-install-btn').style.display = 'block';
    });
    
    // Service worker registration
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
            .then(() => console.log('Service Worker registered'))
            .catch(err => console.log('Service Worker registration failed'));
    }
    
    // Viewport height fix for mobile browsers
    function setViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
});

// Prevent zoom on input focus (iOS Safari)
document.addEventListener('touchstart', function() {
    if (window.innerWidth < 768) {
        const viewport = document.querySelector('meta[name=viewport]');
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
    }
});

// Handle back button
window.addEventListener('popstate', function() {
    showPage('home');
});