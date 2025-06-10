// Al-Wasiloon Fertilizer Factory Management System
// Complete working application with all pages functional and translation support

// Global data storage
let appData = {
    sales: JSON.parse(localStorage.getItem('al-wasiloon-sales') || '[]'),
    expenses: JSON.parse(localStorage.getItem('al-wasiloon-expenses') || '[]'),
    workers: JSON.parse(localStorage.getItem('al-wasiloon-workers') || '[]'),
    storage: JSON.parse(localStorage.getItem('al-wasiloon-storage') || '[]'),
    activities: JSON.parse(localStorage.getItem('al-wasiloon-activities') || '[]'),
    language: localStorage.getItem('al-wasiloon-language') || 'ar'
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
        case 'dashboard':
            updateDashboard();
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