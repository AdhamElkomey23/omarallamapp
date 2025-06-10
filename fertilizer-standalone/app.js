// Al-Wasiloon Fertilizer Factory Management System
// Complete working application with all pages functional and translation support

// Global data storage
let appData = {
    sales: JSON.parse(localStorage.getItem('al-wasiloon-sales') || '[]'),
    expenses: JSON.parse(localStorage.getItem('al-wasiloon-expenses') || '[]'),
    workers: JSON.parse(localStorage.getItem('al-wasiloon-workers') || '[]'),
    storage: JSON.parse(localStorage.getItem('al-wasiloon-storage') || '[]'),
    activities: JSON.parse(localStorage.getItem('al-wasiloon-activities') || '[]'),
    language: localStorage.getItem('al-wasiloon-language') || 'ar',
    currentTimeFilter: 7 // Default to 7 days
};

// Translation data
const translations = {
    ar: {
        // Navigation
        home: 'الرئيسية',
        dashboard: 'لوحة التحكم',
        sales: 'المبيعات',
        expenses: 'المصروفات',
        workers: 'العمال',
        storage: 'المخزون',
        activityLogs: 'سجل الأنشطة',
        reports: 'التقارير',
        settings: 'الإعدادات',
        
        // Common actions
        add: 'إضافة',
        edit: 'تعديل',
        delete: 'حذف',
        save: 'حفظ',
        cancel: 'إلغاء',
        view: 'عرض',
        
        // Forms
        productName: 'اسم المنتج',
        quantity: 'الكمية',
        price: 'السعر',
        customerName: 'اسم العميل',
        saleDate: 'تاريخ البيع',
        expenseName: 'اسم المصروف',
        amount: 'المبلغ',
        category: 'الفئة',
        date: 'التاريخ',
        
        // Messages
        saveSuccess: 'تم الحفظ بنجاح',
        deleteSuccess: 'تم الحذف بنجاح',
        updateSuccess: 'تم التحديث بنجاح',
        deleteConfirm: 'هل أنت متأكد من الحذف؟',
        fillRequired: 'يرجى ملء جميع الحقول المطلوبة'
    },
    en: {
        // Navigation
        home: 'Home',
        dashboard: 'Dashboard',
        sales: 'Sales',
        expenses: 'Expenses',
        workers: 'Workers',
        storage: 'Storage',
        activityLogs: 'Activity Logs',
        reports: 'Reports',
        settings: 'Settings',
        
        // Common actions
        add: 'Add',
        edit: 'Edit',
        delete: 'Delete',
        save: 'Save',
        cancel: 'Cancel',
        view: 'View',
        
        // Forms
        productName: 'Product Name',
        quantity: 'Quantity',
        price: 'Price',
        customerName: 'Customer Name',
        saleDate: 'Sale Date',
        expenseName: 'Expense Name',
        amount: 'Amount',
        category: 'Category',
        date: 'Date',
        
        // Messages
        saveSuccess: 'Saved successfully',
        deleteSuccess: 'Deleted successfully',
        updateSuccess: 'Updated successfully',
        deleteConfirm: 'Are you sure you want to delete?',
        fillRequired: 'Please fill all required fields'
    }
};

// Materials configuration
const MATERIALS = ['الجبس', 'الفلسبار', 'الكاولينا', 'التلك', 'كاربونات الكالسيوم'];

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Set current language
    setLanguage(appData.language);
    
    // Set current dates in forms
    setCurrentDates();
    
    // Initialize all form handlers
    initializeFormHandlers();
    
    // Update all displays
    updateAllDisplays();
    
    // Initialize dashboard data
    updateDashboard();
}

// Language functions
function toggleLanguage() {
    const newLang = appData.language === 'ar' ? 'en' : 'ar';
    setLanguage(newLang);
}

function setLanguage(lang) {
    appData.language = lang;
    localStorage.setItem('al-wasiloon-language', lang);
    
    // Update body class and direction
    document.body.className = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    
    // Update language toggle button
    const toggleBtn = document.getElementById('lang-toggle');
    if (toggleBtn) {
        toggleBtn.textContent = lang === 'ar' ? 'English' : 'العربية';
    }
    
    // Update all translated elements
    updateTranslations();
}

function updateTranslations() {
    const elements = document.querySelectorAll('[data-ar], [data-en]');
    elements.forEach(element => {
        const key = appData.language === 'ar' ? 'data-ar' : 'data-en';
        const text = element.getAttribute(key);
        if (text) {
            if (element.tagName === 'INPUT' && (element.type === 'text' || element.type === 'tel' || element.type === 'number')) {
                const placeholderKey = appData.language === 'ar' ? 'data-ar-placeholder' : 'data-en-placeholder';
                const placeholder = element.getAttribute(placeholderKey);
                if (placeholder) {
                    element.placeholder = placeholder;
                }
            } else {
                element.textContent = text;
            }
        }
    });
}

// Page navigation
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Update navigation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.dataset.page === pageId) {
            item.classList.add('active');
        }
    });
    
    // Initialize page-specific functionality
    switch(pageId) {
        case 'home':
            updateHomeOverview();
            break;
        case 'dashboard':
            updateDashboard();
            updateDashboardAnalytics();
            break;
        case 'sales':
            updateSalesTable();
            break;
        case 'expenses':
            updateExpensesTable();
            break;
        case 'workers':
            updateWorkersTable();
            break;
        case 'storage':
            updateStorageDisplay();
            break;
        case 'activity-logs':
            updateActivitiesTable();
            break;
        case 'reports':
            updateReportsPage();
            break;
    }
}

// Modal functions
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
        // Reset form when opening modal
        resetModalForm(modalId);
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
    }
}

function resetModalForm(modalId) {
    const modal = document.getElementById(modalId);
    const form = modal.querySelector('form');
    if (form) {
        form.reset();
        form.removeAttribute('data-edit-id');
        
        // Set current date for date inputs
        const dateInputs = form.querySelectorAll('input[type="date"]');
        dateInputs.forEach(input => {
            input.value = new Date().toISOString().split('T')[0];
        });
        
        // Reset modal title
        const modalTitle = modal.querySelector('.modal-title');
        if (modalTitle) {
            const addText = modalTitle.getAttribute('data-ar');
            if (addText) {
                modalTitle.textContent = addText;
            }
        }
    }
}

// Form initialization
function initializeFormHandlers() {
    // Sales form
    const salesForm = document.getElementById('sale-form');
    if (salesForm) {
        salesForm.addEventListener('submit', handleSaleSubmit);
    }
    
    // Expenses form
    const expensesForm = document.getElementById('expense-form');
    if (expensesForm) {
        expensesForm.addEventListener('submit', handleExpenseSubmit);
    }
    
    // Workers form
    const workersForm = document.getElementById('worker-form');
    if (workersForm) {
        workersForm.addEventListener('submit', handleWorkerSubmit);
    }
    
    // Storage form
    const storageForm = document.getElementById('storage-form');
    if (storageForm) {
        storageForm.addEventListener('submit', handleStorageSubmit);
    }
    
    // Activities form
    const activitiesForm = document.getElementById('activity-form');
    if (activitiesForm) {
        activitiesForm.addEventListener('submit', handleActivitySubmit);
    }
}

function setCurrentDates() {
    const today = new Date().toISOString().split('T')[0];
    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach(input => {
        if (!input.value) {
            input.value = today;
        }
    });
}

// Sales functionality
function handleSaleSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const editId = form.dataset.editId;
    
    const formData = {
        productName: document.getElementById('sale-product').value,
        quantity: parseFloat(document.getElementById('sale-quantity').value) || 0,
        totalAmount: parseFloat(document.getElementById('sale-amount').value) || 0,
        clientName: document.getElementById('sale-customer').value,
        clientContact: document.getElementById('sale-contact').value || '',
        saleDate: document.getElementById('sale-date').value
    };
    
    if (!formData.productName || !formData.quantity || !formData.totalAmount || !formData.clientName) {
        showErrorMessage(translations[appData.language].fillRequired);
        return;
    }
    
    if (editId) {
        // Edit existing sale
        const index = appData.sales.findIndex(item => item.id === parseInt(editId));
        if (index !== -1) {
            appData.sales[index] = { ...appData.sales[index], ...formData };
            showSuccessMessage(translations[appData.language].updateSuccess);
        }
    } else {
        // Add new sale
        formData.id = Date.now();
        formData.createdAt = new Date().toISOString();
        appData.sales.push(formData);
        showSuccessMessage(translations[appData.language].saveSuccess);
    }
    
    localStorage.setItem('al-wasiloon-sales', JSON.stringify(appData.sales));
    updateSalesTable();
    updateDashboard();
    closeModal('add-sale-modal');
}

function updateSalesTable() {
    const tbody = document.getElementById('sales-table-body');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    appData.sales.forEach(sale => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${sale.productName}</td>
            <td>${sale.quantity.toLocaleString()}</td>
            <td>${formatCurrency(sale.totalAmount)}</td>
            <td>${sale.clientName}</td>
            <td>${new Date(sale.saleDate).toLocaleDateString(appData.language === 'ar' ? 'ar-EG' : 'en-US')}</td>
            <td>
                <button class="btn btn-secondary" onclick="editSale(${sale.id})" style="margin-left: 8px;">
                    ✏️ ${translations[appData.language].edit}
                </button>
                <button class="btn btn-destructive" onclick="deleteSale(${sale.id})">
                    🗑️ ${translations[appData.language].delete}
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function editSale(id) {
    const sale = appData.sales.find(item => item.id === id);
    if (!sale) return;
    
    document.getElementById('sale-product').value = sale.productName;
    document.getElementById('sale-quantity').value = sale.quantity;
    document.getElementById('sale-amount').value = sale.totalAmount;
    document.getElementById('sale-customer').value = sale.clientName;
    document.getElementById('sale-contact').value = sale.clientContact || '';
    document.getElementById('sale-date').value = sale.saleDate;
    
    const form = document.getElementById('sale-form');
    form.dataset.editId = id;
    
    showModal('add-sale-modal');
}

function deleteSale(id) {
    if (!confirm(translations[appData.language].deleteConfirm)) return;
    
    appData.sales = appData.sales.filter(item => item.id !== id);
    localStorage.setItem('al-wasiloon-sales', JSON.stringify(appData.sales));
    updateSalesTable();
    updateDashboard();
    showSuccessMessage(translations[appData.language].deleteSuccess);
}

// Expenses functionality
function handleExpenseSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const editId = form.dataset.editId;
    
    const formData = {
        name: document.getElementById('expense-name').value,
        amount: parseFloat(document.getElementById('expense-amount').value) || 0,
        category: document.getElementById('expense-category').value,
        expenseDate: document.getElementById('expense-date').value
    };
    
    if (!formData.name || !formData.amount || !formData.category) {
        showErrorMessage(translations[appData.language].fillRequired);
        return;
    }
    
    if (editId) {
        const index = appData.expenses.findIndex(item => item.id === parseInt(editId));
        if (index !== -1) {
            appData.expenses[index] = { ...appData.expenses[index], ...formData };
            showSuccessMessage(translations[appData.language].updateSuccess);
        }
    } else {
        formData.id = Date.now();
        formData.createdAt = new Date().toISOString();
        appData.expenses.push(formData);
        showSuccessMessage(translations[appData.language].saveSuccess);
    }
    
    localStorage.setItem('al-wasiloon-expenses', JSON.stringify(appData.expenses));
    updateExpensesTable();
    updateDashboard();
    closeModal('add-expense-modal');
}

function updateExpensesTable() {
    const tbody = document.getElementById('expenses-table-body');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    appData.expenses.forEach(expense => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${expense.name}</td>
            <td>${formatCurrency(expense.amount)}</td>
            <td>${getCategoryName(expense.category)}</td>
            <td>${new Date(expense.expenseDate).toLocaleDateString(appData.language === 'ar' ? 'ar-EG' : 'en-US')}</td>
            <td>
                <button class="btn btn-secondary" onclick="editExpense(${expense.id})" style="margin-left: 8px;">
                    ✏️ ${translations[appData.language].edit}
                </button>
                <button class="btn btn-destructive" onclick="deleteExpense(${expense.id})">
                    🗑️ ${translations[appData.language].delete}
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function getCategoryName(category) {
    const categories = {
        ar: {
            raw_materials: 'مواد خام',
            utilities: 'خدمات',
            maintenance: 'صيانة',
            transportation: 'نقل',
            other: 'أخرى'
        },
        en: {
            raw_materials: 'Raw Materials',
            utilities: 'Utilities',
            maintenance: 'Maintenance',
            transportation: 'Transportation',
            other: 'Other'
        }
    };
    return categories[appData.language][category] || category;
}

function editExpense(id) {
    const expense = appData.expenses.find(item => item.id === id);
    if (!expense) return;
    
    document.getElementById('expense-name').value = expense.name;
    document.getElementById('expense-amount').value = expense.amount;
    document.getElementById('expense-category').value = expense.category;
    document.getElementById('expense-date').value = expense.expenseDate;
    
    const form = document.getElementById('expense-form');
    form.dataset.editId = id;
    
    showModal('add-expense-modal');
}

function deleteExpense(id) {
    if (!confirm(translations[appData.language].deleteConfirm)) return;
    
    appData.expenses = appData.expenses.filter(item => item.id !== id);
    localStorage.setItem('al-wasiloon-expenses', JSON.stringify(appData.expenses));
    updateExpensesTable();
    updateDashboard();
    showSuccessMessage(translations[appData.language].deleteSuccess);
}

// Workers functionality
function handleWorkerSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const editId = form.dataset.editId;
    
    const formData = {
        fullName: document.getElementById('worker-name').value,
        position: document.getElementById('worker-position').value,
        department: document.getElementById('worker-department').value,
        monthlySalary: parseFloat(document.getElementById('worker-salary').value) || 0,
        phoneNumber: document.getElementById('worker-phone').value || '',
        hireDate: document.getElementById('worker-hire-date').value
    };
    
    if (!formData.fullName || !formData.position || !formData.department || !formData.monthlySalary) {
        showErrorMessage(translations[appData.language].fillRequired);
        return;
    }
    
    if (editId) {
        const index = appData.workers.findIndex(item => item.id === parseInt(editId));
        if (index !== -1) {
            appData.workers[index] = { ...appData.workers[index], ...formData };
            showSuccessMessage(translations[appData.language].updateSuccess);
        }
    } else {
        formData.id = Date.now();
        formData.createdAt = new Date().toISOString();
        appData.workers.push(formData);
        showSuccessMessage(translations[appData.language].saveSuccess);
    }
    
    localStorage.setItem('al-wasiloon-workers', JSON.stringify(appData.workers));
    updateWorkersTable();
    updateDashboard();
    closeModal('add-worker-modal');
}

function updateWorkersTable() {
    const tbody = document.getElementById('workers-table-body');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    appData.workers.forEach(worker => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${worker.fullName}</td>
            <td>${worker.position}</td>
            <td>${getDepartmentName(worker.department)}</td>
            <td>${formatCurrency(worker.monthlySalary)}</td>
            <td>${worker.phoneNumber || '-'}</td>
            <td>
                <button class="btn btn-secondary" onclick="editWorker(${worker.id})" style="margin-left: 8px;">
                    ✏️ ${translations[appData.language].edit}
                </button>
                <button class="btn btn-destructive" onclick="deleteWorker(${worker.id})">
                    🗑️ ${translations[appData.language].delete}
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function getDepartmentName(department) {
    const departments = {
        ar: {
            production: 'الإنتاج',
            quality_control: 'مراقبة الجودة',
            maintenance: 'الصيانة',
            administration: 'الإدارة',
            security: 'الأمن'
        },
        en: {
            production: 'Production',
            quality_control: 'Quality Control',
            maintenance: 'Maintenance',
            administration: 'Administration',
            security: 'Security'
        }
    };
    return departments[appData.language][department] || department;
}

function editWorker(id) {
    const worker = appData.workers.find(item => item.id === id);
    if (!worker) return;
    
    document.getElementById('worker-name').value = worker.fullName;
    document.getElementById('worker-position').value = worker.position;
    document.getElementById('worker-department').value = worker.department;
    document.getElementById('worker-salary').value = worker.monthlySalary;
    document.getElementById('worker-phone').value = worker.phoneNumber || '';
    document.getElementById('worker-hire-date').value = worker.hireDate;
    
    const form = document.getElementById('worker-form');
    form.dataset.editId = id;
    
    showModal('add-worker-modal');
}

function deleteWorker(id) {
    if (!confirm(translations[appData.language].deleteConfirm)) return;
    
    appData.workers = appData.workers.filter(item => item.id !== id);
    localStorage.setItem('al-wasiloon-workers', JSON.stringify(appData.workers));
    updateWorkersTable();
    updateDashboard();
    showSuccessMessage(translations[appData.language].deleteSuccess);
}

// Storage functionality
function handleStorageSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const editId = form.dataset.editId;
    
    const formData = {
        itemName: document.getElementById('storage-item').value,
        quantityInTons: parseFloat(document.getElementById('storage-quantity').value) || 0,
        purchasePricePerTon: parseFloat(document.getElementById('storage-price').value) || 0,
        dealerName: document.getElementById('storage-dealer').value,
        dealerContact: document.getElementById('storage-contact').value || '',
        purchaseDate: document.getElementById('storage-date').value
    };
    
    if (!formData.itemName || !formData.quantityInTons || !formData.purchasePricePerTon || !formData.dealerName) {
        showErrorMessage(translations[appData.language].fillRequired);
        return;
    }
    
    if (editId) {
        const index = appData.storage.findIndex(item => item.id === parseInt(editId));
        if (index !== -1) {
            appData.storage[index] = { ...appData.storage[index], ...formData };
            showSuccessMessage(translations[appData.language].updateSuccess);
        }
    } else {
        formData.id = Date.now();
        formData.createdAt = new Date().toISOString();
        appData.storage.push(formData);
        showSuccessMessage(translations[appData.language].saveSuccess);
    }
    
    localStorage.setItem('al-wasiloon-storage', JSON.stringify(appData.storage));
    updateStorageDisplay();
    closeModal('add-storage-modal');
}

function updateStorageDisplay() {
    updateMaterialTotals();
    updateStorageSections();
}

function updateMaterialTotals() {
    MATERIALS.forEach(material => {
        const totalQuantity = appData.storage
            .filter(item => item.itemName === material)
            .reduce((sum, item) => sum + item.quantityInTons, 0);
        
        const elementId = getMaterialElementId(material);
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = totalQuantity.toLocaleString(appData.language === 'ar' ? 'ar-EG' : 'en-US');
        }
    });
}

function getMaterialElementId(material) {
    const idMap = {
        'الجبس': 'gypsum-total',
        'الفلسبار': 'feldspar-total',
        'الكاولينا': 'kaolin-total',
        'التلك': 'talc-total',
        'كاربونات الكالسيوم': 'calcium-total'
    };
    return idMap[material] || '';
}

function updateStorageSections() {
    const container = document.getElementById('storage-sections');
    if (!container) return;
    
    container.innerHTML = '';
    
    MATERIALS.forEach(material => {
        const materialItems = appData.storage.filter(item => item.itemName === material);
        
        if (materialItems.length === 0) return;
        
        const section = createMaterialSection(material, materialItems);
        container.appendChild(section);
    });
}

function createMaterialSection(material, items) {
    const section = document.createElement('div');
    section.className = 'card';
    
    const materialName = appData.language === 'ar' ? material : getMaterialEnglishName(material);
    
    section.innerHTML = `
        <div class="card-header">
            <h2 class="card-title">${materialName}</h2>
        </div>
        <div class="table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>${appData.language === 'ar' ? 'شركة المورد' : 'Supplier Company'}</th>
                        <th>${appData.language === 'ar' ? 'جهة الاتصال' : 'Contact Info'}</th>
                        <th>${appData.language === 'ar' ? 'تاريخ الشراء' : 'Purchase Date'}</th>
                        <th>${appData.language === 'ar' ? 'الكمية (طن)' : 'Quantity (Tons)'}</th>
                        <th>${appData.language === 'ar' ? 'السعر للطن' : 'Price per Ton'}</th>
                        <th>${appData.language === 'ar' ? 'التكلفة الإجمالية' : 'Total Cost'}</th>
                        <th>${appData.language === 'ar' ? 'الإجراءات' : 'Actions'}</th>
                    </tr>
                </thead>
                <tbody>
                    ${items.map(item => createStorageTableRow(item)).join('')}
                </tbody>
            </table>
        </div>
    `;
    
    return section;
}

function getMaterialEnglishName(material) {
    const names = {
        'الجبس': 'Gypsum',
        'الفلسبار': 'Feldspar',
        'الكاولينا': 'Kaolin',
        'التلك': 'Talc',
        'كاربونات الكالسيوم': 'Calcium Carbonate'
    };
    return names[material] || material;
}

function createStorageTableRow(item) {
    const totalCost = item.quantityInTons * item.purchasePricePerTon;
    const formattedDate = new Date(item.purchaseDate).toLocaleDateString(appData.language === 'ar' ? 'ar-EG' : 'en-US');
    
    return `
        <tr>
            <td style="color: var(--primary);">${item.dealerName}</td>
            <td style="color: var(--muted-foreground);">${item.dealerContact || '-'}</td>
            <td>${formattedDate}</td>
            <td>${item.quantityInTons.toLocaleString(appData.language === 'ar' ? 'ar-EG' : 'en-US')}</td>
            <td>${formatCurrency(item.purchasePricePerTon)}</td>
            <td>${formatCurrency(totalCost)}</td>
            <td>
                <button class="btn btn-secondary" onclick="editStorageItem(${item.id})" style="margin-left: 8px;">
                    ✏️ ${translations[appData.language].edit}
                </button>
                <button class="btn btn-destructive" onclick="deleteStorageItem(${item.id})">
                    🗑️ ${translations[appData.language].delete}
                </button>
            </td>
        </tr>
    `;
}

function editStorageItem(id) {
    const item = appData.storage.find(item => item.id === id);
    if (!item) return;
    
    document.getElementById('storage-item').value = item.itemName;
    document.getElementById('storage-quantity').value = item.quantityInTons;
    document.getElementById('storage-price').value = item.purchasePricePerTon;
    document.getElementById('storage-dealer').value = item.dealerName;
    document.getElementById('storage-contact').value = item.dealerContact || '';
    document.getElementById('storage-date').value = item.purchaseDate;
    
    const form = document.getElementById('storage-form');
    form.dataset.editId = id;
    
    showModal('add-storage-modal');
}

function deleteStorageItem(id) {
    if (!confirm(translations[appData.language].deleteConfirm)) return;
    
    appData.storage = appData.storage.filter(item => item.id !== id);
    localStorage.setItem('al-wasiloon-storage', JSON.stringify(appData.storage));
    updateStorageDisplay();
    showSuccessMessage(translations[appData.language].deleteSuccess);
}

// Activities functionality
function handleActivitySubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const editId = form.dataset.editId;
    
    const formData = {
        title: document.getElementById('activity-title').value,
        description: document.getElementById('activity-description').value,
        logDate: document.getElementById('activity-date').value
    };
    
    if (!formData.title || !formData.description) {
        showErrorMessage(translations[appData.language].fillRequired);
        return;
    }
    
    if (editId) {
        const index = appData.activities.findIndex(item => item.id === parseInt(editId));
        if (index !== -1) {
            appData.activities[index] = { ...appData.activities[index], ...formData };
            showSuccessMessage(translations[appData.language].updateSuccess);
        }
    } else {
        formData.id = Date.now();
        formData.createdAt = new Date().toISOString();
        appData.activities.push(formData);
        showSuccessMessage(translations[appData.language].saveSuccess);
    }
    
    localStorage.setItem('al-wasiloon-activities', JSON.stringify(appData.activities));
    updateActivitiesTable();
    closeModal('add-activity-modal');
}

function updateActivitiesTable() {
    const tbody = document.getElementById('activities-table-body');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    appData.activities.forEach(activity => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${activity.title}</td>
            <td>${activity.description}</td>
            <td>${new Date(activity.logDate).toLocaleDateString(appData.language === 'ar' ? 'ar-EG' : 'en-US')}</td>
            <td>
                <button class="btn btn-secondary" onclick="editActivity(${activity.id})" style="margin-left: 8px;">
                    ✏️ ${translations[appData.language].edit}
                </button>
                <button class="btn btn-destructive" onclick="deleteActivity(${activity.id})">
                    🗑️ ${translations[appData.language].delete}
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function editActivity(id) {
    const activity = appData.activities.find(item => item.id === id);
    if (!activity) return;
    
    document.getElementById('activity-title').value = activity.title;
    document.getElementById('activity-description').value = activity.description;
    document.getElementById('activity-date').value = activity.logDate;
    
    const form = document.getElementById('activity-form');
    form.dataset.editId = id;
    
    showModal('add-activity-modal');
}

function deleteActivity(id) {
    if (!confirm(translations[appData.language].deleteConfirm)) return;
    
    appData.activities = appData.activities.filter(item => item.id !== id);
    localStorage.setItem('al-wasiloon-activities', JSON.stringify(appData.activities));
    updateActivitiesTable();
    showSuccessMessage(translations[appData.language].deleteSuccess);
}

// Dashboard functionality
function updateDashboard() {
    const totalIncome = appData.sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
    const totalExpenses = appData.expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const profit = totalIncome - totalExpenses;
    const totalWorkers = appData.workers.length;
    
    updateElement('total-income', formatCurrency(totalIncome));
    updateElement('total-expenses', formatCurrency(totalExpenses));
    updateElement('profit', formatCurrency(profit));
    updateElement('total-workers', totalWorkers.toString());
}

function updateElement(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = value;
    }
}

// Utility functions
function formatCurrency(amount) {
    return new Intl.NumberFormat(appData.language === 'ar' ? 'ar-EG' : 'en-US', {
        style: 'currency',
        currency: 'EGP',
        minimumFractionDigits: 2
    }).format(amount);
}

function showSuccessMessage(message) {
    const messageElement = document.getElementById('success-message');
    if (messageElement) {
        messageElement.textContent = message;
        messageElement.classList.add('show');
        
        setTimeout(() => {
            messageElement.classList.remove('show');
        }, 3000);
    }
}

function showErrorMessage(message) {
    alert(message);
}

function updateAllDisplays() {
    updateSalesTable();
    updateExpensesTable();
    updateWorkersTable();
    updateStorageDisplay();
    updateActivitiesTable();
    updateDashboard();
    updateHomeOverview();
    updateDashboardAnalytics();
    updateReportsPage();
}

// Home page overview
function updateHomeOverview() {
    const totalIncome = appData.sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
    const totalExpenses = appData.expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const profit = totalIncome - totalExpenses;
    const totalProducts = getUniqueProducts().length;
    
    updateElement('home-total-income', formatCurrency(totalIncome));
    updateElement('home-total-expenses', formatCurrency(totalExpenses));
    updateElement('home-net-profit', formatCurrency(profit));
    updateElement('home-total-products', totalProducts.toString());
}

// Dashboard time filter
function setTimeFilter(days) {
    appData.currentTimeFilter = parseInt(days);
    
    // Update active filter button
    document.querySelectorAll('.time-filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.period === days) {
            btn.classList.add('active');
        }
    });
    
    // Update dashboard with filtered data
    updateDashboard();
    updateDashboardAnalytics();
}

// Get filtered data based on time range
function getFilteredData(dataArray, dateField) {
    if (!appData.currentTimeFilter) return dataArray;
    
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - appData.currentTimeFilter);
    
    return dataArray.filter(item => {
        const itemDate = new Date(item[dateField]);
        return itemDate >= cutoffDate;
    });
}

// Enhanced dashboard with time filtering
function updateDashboard() {
    const filteredSales = getFilteredData(appData.sales, 'saleDate');
    const filteredExpenses = getFilteredData(appData.expenses, 'expenseDate');
    
    const totalIncome = filteredSales.reduce((sum, sale) => sum + sale.totalAmount, 0);
    const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const profit = totalIncome - totalExpenses;
    const totalWorkers = appData.workers.length;
    
    updateElement('total-income', formatCurrency(totalIncome));
    updateElement('total-expenses', formatCurrency(totalExpenses));
    updateElement('profit', formatCurrency(profit));
    updateElement('total-workers', totalWorkers.toString());
}

// Dashboard analytics
function updateDashboardAnalytics() {
    updateTopProducts();
    updateExpenseCategories();
    updateRecentActivity();
}

// Top products analysis
function updateTopProducts() {
    const filteredSales = getFilteredData(appData.sales, 'saleDate');
    const productSales = {};
    
    filteredSales.forEach(sale => {
        if (!productSales[sale.productName]) {
            productSales[sale.productName] = {
                quantity: 0,
                revenue: 0,
                sales: 0
            };
        }
        productSales[sale.productName].quantity += sale.quantity;
        productSales[sale.productName].revenue += sale.totalAmount;
        productSales[sale.productName].sales += 1;
    });
    
    const topProducts = Object.entries(productSales)
        .map(([name, data]) => ({ name, ...data }))
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 5);
    
    const container = document.getElementById('top-products-list');
    if (container) {
        container.innerHTML = topProducts.length > 0 
            ? topProducts.map(product => `
                <div class="product-item">
                    <div class="product-name">${product.name}</div>
                    <div class="product-sales">${formatCurrency(product.revenue)}</div>
                </div>
            `).join('')
            : `<div class="product-item"><div style="color: var(--muted-foreground); text-align: center;">${appData.language === 'ar' ? 'لا توجد بيانات' : 'No data available'}</div></div>`;
    }
}

// Expense categories analysis
function updateExpenseCategories() {
    const filteredExpenses = getFilteredData(appData.expenses, 'expenseDate');
    const categoryTotals = {};
    
    filteredExpenses.forEach(expense => {
        if (!categoryTotals[expense.category]) {
            categoryTotals[expense.category] = 0;
        }
        categoryTotals[expense.category] += expense.amount;
    });
    
    const container = document.getElementById('expense-categories-chart');
    if (container) {
        const categories = Object.entries(categoryTotals)
            .sort(([,a], [,b]) => b - a);
        
        container.innerHTML = categories.length > 0
            ? categories.map(([category, amount]) => `
                <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid var(--border);">
                    <span>${getCategoryName(category)}</span>
                    <span style="font-weight: 600; color: var(--primary);">${formatCurrency(amount)}</span>
                </div>
            `).join('')
            : `<div style="color: var(--muted-foreground); text-align: center; padding: 20px;">${appData.language === 'ar' ? 'لا توجد بيانات' : 'No data available'}</div>`;
    }
}

// Recent activity
function updateRecentActivity() {
    const allActivities = [
        ...appData.sales.map(sale => ({
            type: 'sale',
            description: `${appData.language === 'ar' ? 'بيع' : 'Sale'}: ${sale.productName}`,
            amount: sale.totalAmount,
            date: new Date(sale.saleDate)
        })),
        ...appData.expenses.map(expense => ({
            type: 'expense',
            description: `${appData.language === 'ar' ? 'مصروف' : 'Expense'}: ${expense.name}`,
            amount: expense.amount,
            date: new Date(expense.expenseDate)
        }))
    ].sort((a, b) => b.date - a.date).slice(0, 5);
    
    const container = document.getElementById('recent-activity-list');
    if (container) {
        container.innerHTML = allActivities.length > 0
            ? allActivities.map(activity => `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid var(--border);">
                    <div>
                        <div style="font-weight: 500; font-size: 14px;">${activity.description}</div>
                        <div style="font-size: 12px; color: var(--muted-foreground);">${activity.date.toLocaleDateString(appData.language === 'ar' ? 'ar-EG' : 'en-US')}</div>
                    </div>
                    <div style="font-weight: 600; color: ${activity.type === 'sale' ? 'var(--success-500)' : 'var(--destructive-500)'};">
                        ${activity.type === 'sale' ? '+' : '-'}${formatCurrency(activity.amount)}
                    </div>
                </div>
            `).join('')
            : `<div style="color: var(--muted-foreground); text-align: center; padding: 20px;">${appData.language === 'ar' ? 'لا توجد أنشطة حديثة' : 'No recent activity'}</div>`;
    }
}

// Reports page functionality
function updateReportsPage() {
    updateReportSummary();
    updateSalesAnalysis();
    updateExpenseBreakdown();
    updateStorageReport();
    updateWorkersReport();
}

// Report summary
function updateReportSummary() {
    const totalSales = appData.sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
    const totalExpenses = appData.expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const profitMargin = totalSales > 0 ? ((totalSales - totalExpenses) / totalSales * 100) : 0;
    const avgSale = appData.sales.length > 0 ? totalSales / appData.sales.length : 0;
    
    updateElement('report-total-sales', formatCurrency(totalSales));
    updateElement('report-total-expenses', formatCurrency(totalExpenses));
    updateElement('report-profit-margin', profitMargin.toFixed(1) + '%');
    updateElement('report-avg-sale', formatCurrency(avgSale));
}

// Sales analysis for reports
function updateSalesAnalysis() {
    const salesByMonth = {};
    const productPerformance = {};
    
    appData.sales.forEach(sale => {
        const monthKey = new Date(sale.saleDate).toLocaleDateString(appData.language === 'ar' ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'long' });
        
        if (!salesByMonth[monthKey]) salesByMonth[monthKey] = 0;
        salesByMonth[monthKey] += sale.totalAmount;
        
        if (!productPerformance[sale.productName]) {
            productPerformance[sale.productName] = { count: 0, revenue: 0 };
        }
        productPerformance[sale.productName].count += 1;
        productPerformance[sale.productName].revenue += sale.totalAmount;
    });
    
    const container = document.getElementById('sales-analysis-content');
    if (container) {
        const topMonth = Object.entries(salesByMonth).sort(([,a], [,b]) => b - a)[0];
        const topProduct = Object.entries(productPerformance).sort(([,a], [,b]) => b.revenue - a.revenue)[0];
        
        container.innerHTML = `
            <div style="padding: 16px 0;">
                <div style="margin-bottom: 16px;">
                    <strong>${appData.language === 'ar' ? 'أفضل شهر:' : 'Best Month:'}</strong>
                    <div style="color: var(--muted-foreground);">${topMonth ? `${topMonth[0]} - ${formatCurrency(topMonth[1])}` : (appData.language === 'ar' ? 'لا توجد بيانات' : 'No data')}</div>
                </div>
                <div style="margin-bottom: 16px;">
                    <strong>${appData.language === 'ar' ? 'أفضل منتج:' : 'Best Product:'}</strong>
                    <div style="color: var(--muted-foreground);">${topProduct ? `${topProduct[0]} - ${formatCurrency(topProduct[1].revenue)}` : (appData.language === 'ar' ? 'لا توجد بيانات' : 'No data')}</div>
                </div>
                <div>
                    <strong>${appData.language === 'ar' ? 'إجمالي المعاملات:' : 'Total Transactions:'}</strong>
                    <div style="color: var(--muted-foreground);">${appData.sales.length}</div>
                </div>
            </div>
        `;
    }
}

// Expense breakdown for reports
function updateExpenseBreakdown() {
    const expensesByCategory = {};
    const monthlyExpenses = {};
    
    appData.expenses.forEach(expense => {
        if (!expensesByCategory[expense.category]) expensesByCategory[expense.category] = 0;
        expensesByCategory[expense.category] += expense.amount;
        
        const monthKey = new Date(expense.expenseDate).toLocaleDateString(appData.language === 'ar' ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'long' });
        if (!monthlyExpenses[monthKey]) monthlyExpenses[monthKey] = 0;
        monthlyExpenses[monthKey] += expense.amount;
    });
    
    const container = document.getElementById('expense-breakdown-content');
    if (container) {
        const topCategory = Object.entries(expensesByCategory).sort(([,a], [,b]) => b - a)[0];
        const avgMonthly = Object.values(monthlyExpenses).length > 0 
            ? Object.values(monthlyExpenses).reduce((a, b) => a + b, 0) / Object.values(monthlyExpenses).length 
            : 0;
        
        container.innerHTML = `
            <div style="padding: 16px 0;">
                <div style="margin-bottom: 16px;">
                    <strong>${appData.language === 'ar' ? 'أعلى فئة مصروفات:' : 'Top Expense Category:'}</strong>
                    <div style="color: var(--muted-foreground);">${topCategory ? `${getCategoryName(topCategory[0])} - ${formatCurrency(topCategory[1])}` : (appData.language === 'ar' ? 'لا توجد بيانات' : 'No data')}</div>
                </div>
                <div style="margin-bottom: 16px;">
                    <strong>${appData.language === 'ar' ? 'متوسط المصروفات الشهرية:' : 'Average Monthly Expenses:'}</strong>
                    <div style="color: var(--muted-foreground);">${formatCurrency(avgMonthly)}</div>
                </div>
                <div>
                    <strong>${appData.language === 'ar' ? 'إجمالي المعاملات:' : 'Total Transactions:'}</strong>
                    <div style="color: var(--muted-foreground);">${appData.expenses.length}</div>
                </div>
            </div>
        `;
    }
}

// Storage report
function updateStorageReport() {
    const materialStats = {};
    
    MATERIALS.forEach(material => {
        const materialItems = appData.storage.filter(item => item.itemName === material);
        const totalQuantity = materialItems.reduce((sum, item) => sum + item.quantityInTons, 0);
        const totalValue = materialItems.reduce((sum, item) => sum + (item.quantityInTons * item.purchasePricePerTon), 0);
        const avgPrice = totalQuantity > 0 ? totalValue / totalQuantity : 0;
        const suppliers = [...new Set(materialItems.map(item => item.dealerName))].length;
        
        if (materialItems.length > 0) {
            materialStats[material] = {
                quantity: totalQuantity,
                value: totalValue,
                avgPrice,
                suppliers
            };
        }
    });
    
    const tbody = document.getElementById('storage-report-table');
    if (tbody) {
        tbody.innerHTML = Object.entries(materialStats).map(([material, stats]) => `
            <tr>
                <td>${appData.language === 'ar' ? material : getMaterialEnglishName(material)}</td>
                <td>${stats.quantity.toLocaleString()} ${appData.language === 'ar' ? 'طن' : 'tons'}</td>
                <td>${formatCurrency(stats.value)}</td>
                <td>${formatCurrency(stats.avgPrice)}</td>
                <td>${stats.suppliers}</td>
            </tr>
        `).join('');
    }
}

// Workers report
function updateWorkersReport() {
    // Workers by department
    const departmentCounts = {};
    const salaryStats = {
        total: 0,
        min: Infinity,
        max: 0,
        avg: 0
    };
    
    appData.workers.forEach(worker => {
        if (!departmentCounts[worker.department]) departmentCounts[worker.department] = 0;
        departmentCounts[worker.department]++;
        
        salaryStats.total += worker.monthlySalary;
        salaryStats.min = Math.min(salaryStats.min, worker.monthlySalary);
        salaryStats.max = Math.max(salaryStats.max, worker.monthlySalary);
    });
    
    salaryStats.avg = appData.workers.length > 0 ? salaryStats.total / appData.workers.length : 0;
    if (appData.workers.length === 0) salaryStats.min = 0;
    
    // Update departments
    const deptContainer = document.getElementById('workers-by-department');
    if (deptContainer) {
        deptContainer.innerHTML = Object.entries(departmentCounts).map(([dept, count]) => `
            <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid var(--border);">
                <span>${getDepartmentName(dept)}</span>
                <span style="font-weight: 600;">${count}</span>
            </div>
        `).join('');
    }
    
    // Update salary stats
    const salaryContainer = document.getElementById('salary-statistics');
    if (salaryContainer) {
        salaryContainer.innerHTML = `
            <div style="padding: 8px 0; border-bottom: 1px solid var(--border);">
                <strong>${appData.language === 'ar' ? 'إجمالي الرواتب:' : 'Total Salaries:'}</strong>
                <div style="color: var(--muted-foreground);">${formatCurrency(salaryStats.total)}</div>
            </div>
            <div style="padding: 8px 0; border-bottom: 1px solid var(--border);">
                <strong>${appData.language === 'ar' ? 'متوسط الراتب:' : 'Average Salary:'}</strong>
                <div style="color: var(--muted-foreground);">${formatCurrency(salaryStats.avg)}</div>
            </div>
            <div style="padding: 8px 0; border-bottom: 1px solid var(--border);">
                <strong>${appData.language === 'ar' ? 'أعلى راتب:' : 'Highest Salary:'}</strong>
                <div style="color: var(--muted-foreground);">${formatCurrency(salaryStats.max)}</div>
            </div>
            <div style="padding: 8px 0;">
                <strong>${appData.language === 'ar' ? 'أقل راتب:' : 'Lowest Salary:'}</strong>
                <div style="color: var(--muted-foreground);">${formatCurrency(salaryStats.min)}</div>
            </div>
        `;
    }
}

// Generate full report
function generateFullReport() {
    const reportData = {
        summary: {
            totalSales: appData.sales.reduce((sum, sale) => sum + sale.totalAmount, 0),
            totalExpenses: appData.expenses.reduce((sum, expense) => sum + expense.amount, 0),
            totalWorkers: appData.workers.length,
            totalStorageValue: appData.storage.reduce((sum, item) => sum + (item.quantityInTons * item.purchasePricePerTon), 0)
        },
        timestamp: new Date().toLocaleString(appData.language === 'ar' ? 'ar-EG' : 'en-US')
    };
    
    const message = appData.language === 'ar' 
        ? `تم إنشاء التقرير الشامل بنجاح!\n\nإجمالي المبيعات: ${formatCurrency(reportData.summary.totalSales)}\nإجمالي المصروفات: ${formatCurrency(reportData.summary.totalExpenses)}\nصافي الربح: ${formatCurrency(reportData.summary.totalSales - reportData.summary.totalExpenses)}\n\nتاريخ التقرير: ${reportData.timestamp}`
        : `Full report generated successfully!\n\nTotal Sales: ${formatCurrency(reportData.summary.totalSales)}\nTotal Expenses: ${formatCurrency(reportData.summary.totalExpenses)}\nNet Profit: ${formatCurrency(reportData.summary.totalSales - reportData.summary.totalExpenses)}\n\nReport Date: ${reportData.timestamp}`;
    
    showSuccessMessage(appData.language === 'ar' ? 'تم إنشاء التقرير بنجاح' : 'Report generated successfully');
    alert(message);
}

// Get unique products
function getUniqueProducts() {
    return [...new Set(appData.sales.map(sale => sale.productName))];
}

// Event listeners
document.addEventListener('click', function(event) {
    // Close modal when clicking outside
    if (event.target.classList.contains('modal')) {
        const modalId = event.target.id;
        closeModal(modalId);
    }
});

// Initialize when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}