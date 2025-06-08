// Internationalization support for Arabic/English
export const translations = {
  en: {
    // Navigation
    home: "Home",
    dashboard: "Dashboard",
    products: "Products",
    sales: "Sales",
    expenses: "Expenses",
    workers: "Workers",
    activityLogs: "Activity Logs",
    reports: "Reports",
    settings: "Settings",
    
    // App Title
    appTitle: "Al-Wasiloon",
    appSubtitle: "Mining and Chemical Industries",
    appDescription: "Built for mobile-first management",
    
    // Dashboard
    totalRevenue: "Total Revenue",
    totalExpenses: "Total Expenses",
    profit: "Profit",
    totalProducts: "Total Products",
    unitsSold: "Units Sold",
    salesOverview: "Sales Overview",
    topProducts: "Top Products",
    revenueDistribution: "Revenue distribution by product",
    thisMonth: "This Month",
    days7: "7 Days",
    days30: "30 Days",
    days90: "90 Days",
    year: "Year",
    
    // Products
    addProduct: "Add Product",
    productName: "Product Name",
    unitPrice: "Unit Price",
    stockQuantity: "Stock Quantity",
    productAdded: "Product Added",
    productUpdated: "Product Updated",
    editProduct: "Edit Product",
    
    // Sales
    recordSale: "Record Sale",
    totalSales: "Total Sales",
    quantity: "Quantity",
    totalAmount: "Total Amount",
    saleRecorded: "Sale Recorded",
    
    // Expenses
    addExpense: "Add Expense",
    expenseName: "Expense Name",
    amount: "Amount",
    category: "Category",
    expenseDate: "Expense Date",
    expenseAdded: "Expense Added",
    categories: "Categories",
    
    // Workers
    addWorker: "Add Worker",
    fullName: "Full Name",
    jobRole: "Job Role",
    department: "Department",
    monthlySalary: "Monthly Salary",
    hireDate: "Hire Date",
    email: "Email",
    phone: "Phone",
    status: "Status",
    active: "Active",
    inactive: "Inactive",
    terminated: "Terminated",
    totalWorkers: "Total Workers",
    activeWorkers: "Active Workers",
    totalSalaryExpense: "Total Salary Expense",
    departments: "Departments",
    workerAdded: "Worker Added",
    workerUpdated: "Worker Updated",
    editWorker: "Edit Worker",
    
    // Common
    cancel: "Cancel",
    save: "Save",
    edit: "Edit",
    delete: "Delete",
    add: "Add",
    update: "Update",
    loading: "Loading...",
    error: "Error",
    success: "Success",
    filters: "Filters",
    clearFilters: "Clear Filters",
    allCategories: "All categories",
    allProducts: "All products",
    allDepartments: "All departments",
    allStatuses: "All statuses",
    search: "Search...",
    profile: "Profile",
    logout: "Log out",
    optional: "Optional",
    required: "Required",
    perMonth: "per month",
    monthly: "monthly",
    
    // Form validations
    nameRequired: "Name is required",
    nameMinLength: "Name must be at least 2 characters",
    emailInvalid: "Invalid email",
    positiveNumber: "Must be a positive number",
    dateRequired: "Date is required",
    roleRequired: "Role is required",
    departmentRequired: "Department is required",
    
    // Departments
    production: "Production",
    qualityControl: "Quality Control",
    administration: "Administration",
    maintenance: "Maintenance",
    logistics: "Logistics",
    
    // Categories
    utilities: "Utilities",
    salaries: "Salaries",
    other: "Other",
    
    // Messages
    noDataFound: "No data found",
    noWorkersFound: "No workers found",
    noSalesFound: "No sales found",
    noExpensesFound: "No expenses found",
    addFirstWorker: "Add Your First Worker",
    recordFirstSale: "Record Your First Sale",
    
    // Notifications
    notifications: "Notifications",
    factoryManager: "Factory Manager",
    version: "Version 1.0.0",
    
    // Additional translations
    deleteConfirmation: "Are you sure you want to delete this product?",
    noProductsFound: "No products found",
    addFirstProduct: "Add your first product",
    manageInventory: "Manage your product inventory",
    inventoryValue: "Inventory Value",
    totalStock: "Total Stock",
    units: "units",
    searchProducts: "Search products",
    actions: "Actions",
    createdAt: "Created At",
    lastUpdated: "Last Updated",
    fromLastMonth: "from last month",
    margin: "margin",
    currentWorkers: "current workers",
    weeklyReport: "Weekly",
    monthlyReport: "Monthly", 
    yearlyReport: "Yearly",
    currentValue: "Current Value",
    change: "Change %",
    indicator: "Indicator",
    netProfit: "Net Profit",
    profitMargin: "Profit Margin",
    performanceSummary: "Performance Summary",
    overviewFinancial: "Overview of key financial indicators",
    monthlyTrend: "Monthly Trend for Revenue and Expenses",
    compareRevExp: "Compare revenue and expenses over the last six months",
    deptExpenses: "Department Expenses Distribution",
    expensesByDept: "Expense ratio for each department in the factory",
    productPerformance: "Product Performance",
    salesAndRevenue: "Sales and revenue of main products",
    recentTransactions: "Recent Transactions",
    
    // Months
    january: "January",
    february: "February", 
    march: "March",
    april: "April",
    may: "May",
    june: "June",
    
    // Products
    npkFertilizer: "NPK Fertilizer",
    ureaFertilizer: "Urea Fertilizer",
    organicCompost: "Organic Compost",
    phosphateFertilizer: "Phosphate Fertilizer",
    
    // Time periods
    weekly: "Weekly",
    yearly: "Yearly",
    
    // Additional Product form fields
    updateProductDetails: "Update product details",
    adding: "Adding...",
    updating: "Updating...",
    totalProducts: "Total Products",
    lastDaysActivity: "Last {{days}} days of activity",
    
    // Reports page translations
    netProfit: "Net Profit",
    profitMargin: "Profit margin",
    totalWorkers: "Total Workers", 
    activeWorkers: "Active workers currently",
    monthlyRevenueExpensesTrend: "Monthly Revenue and Expenses Trend",
    revenueExpensesComparison: "Comparison of revenue and expenses over the past six months",
    revenue: "Revenue",
    expenseDistributionByDepartment: "Expense Distribution by Department",
    departmentExpensePercentage: "Percentage of expenses for each department in the factory",
    productPerformance: "Product Performance",
    mainProductsSalesRevenue: "Sales and revenue of main products",
    financialPerformanceSummary: "Financial Performance Summary",
    keyFinancialIndicatorsOverview: "Overview of key financial indicators",
    indicator: "Indicator",
    currentValue: "Current Value",
    changePercent: "Change %",
    
    // Storage page translations
    storage: "Storage",
    storageManagement: "Storage Management",
    addNewItem: "Add New Item",
    itemName: "Item Name",
    quantityInTons: "Quantity (Tons)",
    purchasePricePerTon: "Purchase Price per Ton",
    totalCost: "Total Cost",
    actions: "Actions",
    edit: "Edit",
    delete: "Delete",
    addItem: "Add Item",
    editItem: "Edit Item",
    itemNamePlaceholder: "Enter item name",
    quantityPlaceholder: "Enter quantity in tons",
    pricePlaceholder: "Enter price per ton",
    save: "Save",
    cancel: "Cancel",
    confirmDelete: "Are you sure you want to delete this item?",
    deleteConfirmation: "Delete Confirmation",
    yes: "Yes",
    no: "No",
    totalStorageValue: "Total Storage Value",
    totalItems: "Total Items",
    averagePricePerTon: "Average Price per Ton",
    
    // Home page translations
    quickOverview: "Quick Overview",
    mainFeatures: "Main Features",
    manageYourProducts: "Manage your fertilizer products and inventory",
    viewProducts: "View Products",
    trackYourSales: "Track and analyze your sales performance",
    viewSales: "View Sales",
    manageYourTeam: "Manage your workers and team members",
    viewWorkers: "View Workers",
    manageInventory: "Manage storage items and inventory",
    viewStorage: "View Storage",
    trackExpenses: "Track and categorize your expenses",
    viewExpenses: "View Expenses",
    viewReports: "View detailed reports and analytics",
    getStarted: "Ready to get started?",
    startManaging: "Start managing your fertilizer factory operations efficiently",
    goToDashboard: "Go to Dashboard"
  },
  
  ar: {
    // Navigation
    home: "الرئيسية",
    dashboard: "لوحة القيادة",
    products: "المنتجات",
    sales: "المبيعات",
    expenses: "المصروفات",
    workers: "العمال",
    activityLogs: "سجل الأنشطة",
    reports: "التقارير",
    settings: "الإعدادات",
    
    // App Title
    appTitle: "الواصلون",
    appSubtitle: "للصناعات التعدينية والكيميائية",
    appDescription: "مصمم للإدارة المحمولة أولاً",
    
    // Dashboard
    totalRevenue: "إجمالي الإيرادات",
    totalExpenses: "إجمالي المصروفات",
    profit: "الربح",
    totalProducts: "إجمالي المنتجات",
    unitsSold: "الوحدات المباعة",
    salesOverview: "نظرة عامة على المبيعات",
    topProducts: "أفضل المنتجات",
    revenueDistribution: "توزيع الإيرادات حسب المنتج",
    thisMonth: "هذا الشهر",
    days7: "7 أيام",
    days30: "30 يوم",
    days90: "90 يوم",
    year: "سنة",
    
    // Products
    addProduct: "إضافة منتج",
    productName: "اسم المنتج",
    unitPrice: "سعر الوحدة",
    stockQuantity: "كمية المخزون",
    productAdded: "تم إضافة المنتج",
    productUpdated: "تم تحديث المنتج",
    editProduct: "تعديل المنتج",
    
    // Sales
    recordSale: "تسجيل مبيعة",
    totalSales: "إجمالي المبيعات",
    quantity: "الكمية",
    totalAmount: "المبلغ الإجمالي",
    saleRecorded: "تم تسجيل المبيعة",
    
    // Expenses
    addExpense: "إضافة مصروف",
    expenseName: "اسم المصروف",
    amount: "المبلغ",
    category: "الفئة",
    expenseDate: "تاريخ المصروف",
    expenseAdded: "تم إضافة المصروف",
    categories: "الفئات",
    
    // Workers
    addWorker: "إضافة عامل",
    fullName: "الاسم الكامل",
    jobRole: "المنصب الوظيفي",
    department: "القسم",
    monthlySalary: "الراتب الشهري",
    hireDate: "تاريخ التوظيف",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    status: "الحالة",
    active: "نشط",
    inactive: "غير نشط",
    terminated: "منتهي الخدمة",
    totalWorkers: "إجمالي العمال",
    activeWorkers: "العمال النشطون",
    totalSalaryExpense: "إجمالي مصروفات الرواتب",
    departments: "الأقسام",
    workerAdded: "تم إضافة العامل",
    workerUpdated: "تم تحديث بيانات العامل",
    editWorker: "تعديل بيانات العامل",
    
    // Common
    cancel: "إلغاء",
    save: "حفظ",
    edit: "تعديل",
    delete: "حذف",
    add: "إضافة",
    update: "تحديث",
    loading: "جاري التحميل...",
    error: "خطأ",
    success: "نجح",
    filters: "المرشحات",
    clearFilters: "مسح المرشحات",
    allCategories: "جميع الفئات",
    allProducts: "جميع المنتجات",
    allDepartments: "جميع الأقسام",
    allStatuses: "جميع الحالات",
    search: "بحث...",
    profile: "الملف الشخصي",
    logout: "تسجيل الخروج",
    optional: "اختياري",
    required: "مطلوب",
    perMonth: "في الشهر",
    monthly: "شهري",
    
    // Form validations
    nameRequired: "الاسم مطلوب",
    nameMinLength: "يجب أن يكون الاسم على الأقل حرفين",
    emailInvalid: "بريد إلكتروني غير صالح",
    positiveNumber: "يجب أن يكون رقم موجب",
    dateRequired: "التاريخ مطلوب",
    roleRequired: "المنصب مطلوب",
    departmentRequired: "القسم مطلوب",
    
    // Departments
    production: "الإنتاج",
    qualityControl: "مراقبة الجودة",
    administration: "الإدارة",
    maintenance: "الصيانة",
    logistics: "اللوجستيات",
    
    // Categories
    utilities: "المرافق",
    salaries: "الرواتب",
    other: "أخرى",
    
    // Messages
    noDataFound: "لا توجد بيانات",
    noWorkersFound: "لا يوجد عمال",
    noSalesFound: "لا توجد مبيعات",
    noExpensesFound: "لا توجد مصروفات",
    addFirstWorker: "أضف أول عامل",
    recordFirstSale: "سجل أول مبيعة",
    
    // Notifications
    notifications: "الإشعارات",
    factoryManager: "مدير المصنع",
    version: "الإصدار 1.0.0",
    
    // Additional translations
    deleteConfirmation: "هل أنت متأكد من حذف هذا المنتج؟",
    noProductsFound: "لا توجد منتجات",
    addFirstProduct: "أضف منتجك الأول",
    manageInventory: "إدارة مخزون المنتجات",
    inventoryValue: "قيمة المخزون",
    totalStock: "إجمالي المخزون",
    units: "وحدة",
    searchProducts: "البحث في المنتجات",
    actions: "الإجراءات",
    createdAt: "تاريخ الإنشاء",
    lastUpdated: "آخر تحديث",
    fromLastMonth: "من الشهر الماضي",
    margin: "هامش",
    currentWorkers: "عمال حاليين",
    weeklyReport: "أسبوعي",
    monthlyReport: "شهري", 
    yearlyReport: "سنوي",
    currentValue: "القيمة الحالية",
    change: "التغيير %",
    indicator: "المؤشر",
    netProfit: "صافي الربح",
    profitMargin: "هامش الربح",
    performanceSummary: "ملخص الأداء",
    overviewFinancial: "نظرة عامة على المؤشرات المالية الرئيسية",
    monthlyTrend: "الاتجاه الشهري للإيرادات والمصروفات",
    compareRevExp: "مقارنة الإيرادات والمصروفات خلال الأشهر الستة الماضية",
    deptExpenses: "توزيع مصروفات الأقسام",
    expensesByDept: "نسبة المصروفات لكل قسم في المصنع",
    productPerformance: "أداء المنتجات",
    salesAndRevenue: "مبيعات وإيرادات المنتجات الرئيسية",
    recentTransactions: "المعاملات الأخيرة",
    
    // Months
    january: "يناير",
    february: "فبراير", 
    march: "مارس",
    april: "أبريل",
    may: "مايو",
    june: "يونيو",
    
    // Products
    npkFertilizer: "سماد NPK",
    ureaFertilizer: "سماد اليوريا",
    organicCompost: "الكومبوست العضوي",
    phosphateFertilizer: "سماد الفوسفات",
    
    // Time periods
    weekly: "أسبوعي",
    yearly: "سنوي",
    
    // Additional Product form fields
    updateProductDetails: "تحديث تفاصيل المنتج",
    adding: "جاري الإضافة...",
    updating: "جاري التحديث...",
    totalProducts: "إجمالي المنتجات",
    lastDaysActivity: "آخر {{days}} أيام من النشاط",
    
    // Reports page translations
    netProfit: "صافي الربح",
    profitMargin: "هامش ربح",
    totalWorkers: "إجمالي العمال", 
    activeWorkers: "عمال نشطون حالياً",
    monthlyRevenueExpensesTrend: "الاتجاه الشهري للإيرادات والمصروفات",
    revenueExpensesComparison: "مقارنة الإيرادات والمصروفات خلال الأشهر الستة الماضية",
    revenue: "الإيرادات",
    expenseDistributionByDepartment: "توزيع المصروفات حسب القسم",
    departmentExpensePercentage: "نسبة المصروفات لكل قسم في المصنع",
    productPerformance: "أداء المنتجات",
    mainProductsSalesRevenue: "مبيعات وإيرادات المنتجات الرئيسية",
    financialPerformanceSummary: "ملخص الأداء المالي",
    keyFinancialIndicatorsOverview: "نظرة عامة على المؤشرات المالية الرئيسية",
    indicator: "المؤشر",
    currentValue: "القيمة الحالية",
    changePercent: "التغيير %",
    
    // Storage page translations
    storage: "المخزون",
    storageManagement: "إدارة المخزون",
    addNewItem: "إضافة عنصر جديد",
    itemName: "اسم العنصر",
    quantityInTons: "الكمية (طن)",
    purchasePricePerTon: "سعر الشراء للطن",
    totalCost: "التكلفة الإجمالية",
    actions: "الإجراءات",
    edit: "تعديل",
    delete: "حذف",
    addItem: "إضافة عنصر",
    editItem: "تعديل العنصر",
    itemNamePlaceholder: "أدخل اسم العنصر",
    quantityPlaceholder: "أدخل الكمية بالطن",
    pricePlaceholder: "أدخل سعر الطن",
    save: "حفظ",
    cancel: "إلغاء",
    confirmDelete: "هل أنت متأكد من حذف هذا العنصر؟",
    deleteConfirmation: "تأكيد الحذف",
    yes: "نعم",
    no: "لا",
    totalStorageValue: "قيمة المخزون الإجمالية",
    totalItems: "إجمالي العناصر",
    averagePricePerTon: "متوسط السعر للطن",
    
    // Home page translations
    quickOverview: "نظرة سريعة",
    mainFeatures: "الميزات الرئيسية",
    manageYourProducts: "إدارة منتجات الأسمدة والمخزون",
    viewProducts: "عرض المنتجات",
    trackYourSales: "تتبع وتحليل أداء المبيعات",
    viewSales: "عرض المبيعات",
    manageYourTeam: "إدارة العمال وأعضاء الفريق",
    viewWorkers: "عرض العمال",
    manageInventory: "إدارة عناصر التخزين والمخزون",
    viewStorage: "عرض المخزون",
    trackExpenses: "تتبع وتصنيف المصروفات",
    viewExpenses: "عرض المصروفات",
    viewReports: "عرض التقارير التفصيلية والتحليلات",
    getStarted: "مستعد للبدء؟",
    startManaging: "ابدأ في إدارة عمليات مصنع الأسمدة بكفاءة",
    goToDashboard: "انتقل إلى لوحة القيادة"
  }
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;

let currentLanguage: Language = 'ar'; // Default to Arabic
let languageChangeListeners: (() => void)[] = [];

export const setLanguage = (lang: Language) => {
  currentLanguage = lang;
  // Update document direction
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = lang;
  // Save to localStorage
  localStorage.setItem('language', lang);
  // Notify listeners
  languageChangeListeners.forEach(listener => listener());
};

export const getCurrentLanguage = (): Language => currentLanguage;

export const t = (key: TranslationKey): string => {
  return translations[currentLanguage][key] || translations.en[key] || key;
};

export const isRTL = (): boolean => currentLanguage === 'ar';

export const toggleLanguage = () => {
  setLanguage(currentLanguage === 'ar' ? 'en' : 'ar');
};

export const addLanguageChangeListener = (listener: () => void) => {
  languageChangeListeners.push(listener);
  return () => {
    languageChangeListeners = languageChangeListeners.filter(l => l !== listener);
  };
};

// Initialize with saved language or Arabic
const savedLanguage = localStorage.getItem('language') as Language;
if (savedLanguage && (savedLanguage === 'ar' || savedLanguage === 'en')) {
  setLanguage(savedLanguage);
} else {
  setLanguage('ar');
}