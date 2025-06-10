// Al-Wasiloon Fertilizer Factory Management System
// Exact replica of Replit application functionality

// Storage data structure
let storageData = JSON.parse(localStorage.getItem('al-wasiloon-storage') || '[]');

// Materials configuration - matching Replit exactly
const MATERIALS = ['الجبس', 'الفلسبار', 'الكاولينا', 'التلك', 'كاربونات الكالسيوم'];

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Set current date in form
    const dateInput = document.getElementById('storage-date');
    if (dateInput) {
        dateInput.value = new Date().toISOString().split('T')[0];
    }
    
    // Initialize storage form
    const storageForm = document.getElementById('storage-form');
    if (storageForm) {
        storageForm.addEventListener('submit', handleStorageSubmit);
    }
    
    // Update displays
    updateMaterialTotals();
    updateStorageSections();
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
    if (pageId === 'storage') {
        updateMaterialTotals();
        updateStorageSections();
    }
}

// Modal functions
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
    }
}

// Storage form submission
function handleStorageSubmit(event) {
    event.preventDefault();
    
    const formData = {
        id: Date.now(), // Simple ID generation
        itemName: document.getElementById('storage-item').value,
        quantityInTons: parseFloat(document.getElementById('storage-quantity').value) || 0,
        purchasePricePerTon: parseFloat(document.getElementById('storage-price').value) || 0,
        dealerName: document.getElementById('storage-dealer').value,
        dealerContact: document.getElementById('storage-contact').value || '',
        purchaseDate: document.getElementById('storage-date').value
    };
    
    // Validate required fields
    if (!formData.itemName || !formData.quantityInTons || !formData.purchasePricePerTon || !formData.dealerName) {
        showErrorMessage('يرجى ملء جميع الحقول المطلوبة');
        return;
    }
    
    // Add to storage data
    storageData.push(formData);
    
    // Save to localStorage
    localStorage.setItem('al-wasiloon-storage', JSON.stringify(storageData));
    
    // Update displays
    updateMaterialTotals();
    updateStorageSections();
    
    // Reset form and close modal
    document.getElementById('storage-form').reset();
    document.getElementById('storage-date').value = new Date().toISOString().split('T')[0];
    closeModal('add-storage-modal');
    
    // Show success message
    showSuccessMessage('تم إضافة العنصر بنجاح');
}

// Update material totals in summary cards
function updateMaterialTotals() {
    MATERIALS.forEach(material => {
        const totalQuantity = storageData
            .filter(item => item.itemName === material)
            .reduce((sum, item) => sum + item.quantityInTons, 0);
        
        const elementId = getMaterialElementId(material);
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = totalQuantity.toLocaleString('ar-EG');
        }
    });
}

// Get element ID for material
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

// Update storage sections with supplier breakdown
function updateStorageSections() {
    const container = document.getElementById('storage-sections');
    if (!container) return;
    
    container.innerHTML = '';
    
    MATERIALS.forEach(material => {
        const materialItems = storageData.filter(item => item.itemName === material);
        
        if (materialItems.length === 0) return;
        
        const section = createMaterialSection(material, materialItems);
        container.appendChild(section);
    });
}

// Create material section with supplier breakdown
function createMaterialSection(material, items) {
    const section = document.createElement('div');
    section.className = 'card';
    
    section.innerHTML = `
        <div class="card-header">
            <h2 class="card-title">${material}</h2>
        </div>
        <div class="table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>شركة المورد</th>
                        <th>جهة الاتصال</th>
                        <th>تاريخ الشراء</th>
                        <th>الكمية (طن)</th>
                        <th>السعر للطن</th>
                        <th>التكلفة الإجمالية</th>
                        <th>الإجراءات</th>
                    </tr>
                </thead>
                <tbody>
                    ${items.map(item => createTableRow(item)).join('')}
                </tbody>
            </table>
        </div>
    `;
    
    return section;
}

// Create table row for storage item
function createTableRow(item) {
    const totalCost = item.quantityInTons * item.purchasePricePerTon;
    const formattedDate = new Date(item.purchaseDate).toLocaleDateString('ar-EG');
    
    return `
        <tr>
            <td class="font-medium" style="color: var(--primary);">${item.dealerName}</td>
            <td style="color: var(--muted-foreground);">${item.dealerContact || '-'}</td>
            <td>${formattedDate}</td>
            <td>${item.quantityInTons.toLocaleString('ar-EG')}</td>
            <td>${formatCurrency(item.purchasePricePerTon)}</td>
            <td>${formatCurrency(totalCost)}</td>
            <td>
                <button class="btn btn-secondary" onclick="editStorageItem(${item.id})" style="margin-left: 8px;">
                    ✏️ تعديل
                </button>
                <button class="btn btn-destructive" onclick="deleteStorageItem(${item.id})">
                    🗑️ حذف
                </button>
            </td>
        </tr>
    `;
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('ar-EG', {
        style: 'currency',
        currency: 'EGP',
        minimumFractionDigits: 2
    }).format(amount);
}

// Edit storage item
function editStorageItem(id) {
    const item = storageData.find(item => item.id === id);
    if (!item) return;
    
    // Populate form with item data
    document.getElementById('storage-item').value = item.itemName;
    document.getElementById('storage-quantity').value = item.quantityInTons;
    document.getElementById('storage-price').value = item.purchasePricePerTon;
    document.getElementById('storage-dealer').value = item.dealerName;
    document.getElementById('storage-contact').value = item.dealerContact || '';
    document.getElementById('storage-date').value = item.purchaseDate;
    
    // Show modal
    showModal('add-storage-modal');
    
    // Change form to edit mode
    const form = document.getElementById('storage-form');
    form.dataset.editId = id;
    
    // Update modal title
    const modalTitle = document.querySelector('#add-storage-modal .modal-title');
    if (modalTitle) {
        modalTitle.textContent = 'تعديل العنصر';
    }
}

// Delete storage item
function deleteStorageItem(id) {
    if (!confirm('هل أنت متأكد من حذف هذا العنصر؟')) {
        return;
    }
    
    storageData = storageData.filter(item => item.id !== id);
    localStorage.setItem('al-wasiloon-storage', JSON.stringify(storageData));
    
    updateMaterialTotals();
    updateStorageSections();
    
    showSuccessMessage('تم حذف العنصر بنجاح');
}

// Show success message
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

// Show error message
function showErrorMessage(message) {
    alert(message); // Simple error display for now
}

// Handle modal clicks outside content
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        const modalId = event.target.id;
        closeModal(modalId);
    }
});

// Handle form reset when opening modal
document.addEventListener('click', function(event) {
    if (event.target.getAttribute('onclick') && event.target.getAttribute('onclick').includes('add-storage-modal')) {
        // Reset form when opening add modal
        setTimeout(() => {
            const form = document.getElementById('storage-form');
            if (form) {
                form.reset();
                form.removeAttribute('data-edit-id');
                document.getElementById('storage-date').value = new Date().toISOString().split('T')[0];
                
                // Reset modal title
                const modalTitle = document.querySelector('#add-storage-modal .modal-title');
                if (modalTitle) {
                    modalTitle.textContent = 'إضافة عنصر';
                }
            }
        }, 10);
    }
});

// Enhanced form submission to handle both add and edit
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
    
    // Validate required fields
    if (!formData.itemName || !formData.quantityInTons || !formData.purchasePricePerTon || !formData.dealerName) {
        showErrorMessage('يرجى ملء جميع الحقول المطلوبة');
        return;
    }
    
    if (editId) {
        // Edit existing item
        const index = storageData.findIndex(item => item.id === parseInt(editId));
        if (index !== -1) {
            storageData[index] = { ...storageData[index], ...formData };
            showSuccessMessage('تم تحديث العنصر بنجاح');
        }
        form.removeAttribute('data-edit-id');
    } else {
        // Add new item
        formData.id = Date.now();
        storageData.push(formData);
        showSuccessMessage('تم إضافة العنصر بنجاح');
    }
    
    // Save to localStorage
    localStorage.setItem('al-wasiloon-storage', JSON.stringify(storageData));
    
    // Update displays
    updateMaterialTotals();
    updateStorageSections();
    
    // Reset form and close modal
    form.reset();
    document.getElementById('storage-date').value = new Date().toISOString().split('T')[0];
    closeModal('add-storage-modal');
    
    // Reset modal title
    const modalTitle = document.querySelector('#add-storage-modal .modal-title');
    if (modalTitle) {
        modalTitle.textContent = 'إضافة عنصر';
    }
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}