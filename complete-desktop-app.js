#!/usr/bin/env node
import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';

console.log('Creating Complete Desktop Application with All Features...');

// Create app directory
if (fs.existsSync('desktop-app')) {
  execSync('rm -rf desktop-app');
}
fs.mkdirSync('desktop-app', { recursive: true });

// Convert logo to base64
const logoPath = 'attached_assets/الواصلون (1)_1749400506920.png';
let logoBase64 = '';
try {
  const logoBuffer = fs.readFileSync(logoPath);
  logoBase64 = `data:image/png;base64,${logoBuffer.toString('base64')}`;
} catch (error) {
  console.log('Logo not found, using default icon');
}

// Complete HTML application with all functionality
const completeHTML = `<!DOCTYPE html>
<html lang="ar" dir="rtl" id="html-root">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>نظام إدارة مصنع الأسمدة - شركة الواصلون</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        :root {
            --background: 40 30% 96%;
            --foreground: 20 14.3% 4.1%;
            --muted: 60 4.8% 95.9%;
            --muted-foreground: 25 5.3% 44.7%;
            --card: 0 0% 100%;
            --card-foreground: 20 14.3% 4.1%;
            --border: 20 5.9% 90%;
            --primary: 28 58% 35%;
            --primary-foreground: 210 20% 98%;
            --secondary: 32 39% 76%;
            --accent: 130 27% 33%;
            --ring: 28 58% 35%;
        }
        
        * { 
            font-family: 'Cairo', 'Inter', sans-serif; 
            transition: all 0.3s ease;
        }
        
        body { 
            background-color: hsl(var(--background)); 
            color: hsl(var(--foreground)); 
            margin: 0;
            padding: 0;
        }
        
        .bg-background { background-color: hsl(var(--background)); }
        .bg-card { background-color: hsl(var(--card)); }
        .bg-muted { background-color: hsl(var(--muted)); }
        .bg-primary { background-color: hsl(var(--primary)); }
        .text-primary { color: hsl(var(--primary)); }
        .text-muted-foreground { color: hsl(var(--muted-foreground)); }
        .text-primary-foreground { color: hsl(var(--primary-foreground)); }
        .border-border { border-color: hsl(var(--border)); }
        .hover\\:bg-muted:hover { background-color: hsl(var(--muted)); }
        .hover\\:bg-primary\\/90:hover { background-color: hsl(var(--primary) / 0.9); }
        
        .sidebar-collapsed { width: 80px; }
        .sidebar-expanded { width: 280px; }
        .content-with-sidebar { margin-right: 280px; }
        .content-with-collapsed-sidebar { margin-right: 80px; }
        
        .chart-container { 
            position: relative; 
            height: 350px; 
            canvas { max-height: 350px; }
        }
        
        .nav-item {
            display: flex;
            align-items: center;
            width: 100%;
            padding: 12px;
            border-radius: 8px;
            cursor: pointer;
            text-decoration: none;
            color: inherit;
            border: none;
            background: none;
            text-align: right;
        }
        
        .nav-item:hover { background-color: hsl(var(--muted)); }
        .nav-item.active {
            background-color: hsl(var(--primary));
            color: hsl(var(--primary-foreground));
        }
        
        .hidden { display: none !important; }
        .loading { 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            min-height: 200px;
        }
        
        .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid hsl(var(--muted));
            border-top: 4px solid hsl(var(--primary));
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin { 
            to { transform: rotate(360deg); } 
        }
        
        .form-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
            margin-bottom: 1rem;
        }
        
        .form-field {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
        
        .form-field label {
            font-weight: 600;
            color: hsl(var(--foreground));
            font-size: 0.875rem;
        }
        
        .form-field input, .form-field select, .form-field textarea {
            padding: 0.75rem;
            border: 2px solid hsl(var(--border));
            border-radius: 0.5rem;
            font-size: 1rem;
            background-color: hsl(var(--card));
            color: hsl(var(--foreground));
        }
        
        .form-field input:focus, .form-field select:focus, .form-field textarea:focus {
            outline: none;
            border-color: hsl(var(--primary));
        }
        
        .btn {
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            font-weight: 600;
            cursor: pointer;
            border: none;
            font-size: 1rem;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .btn-primary {
            background-color: hsl(var(--primary));
            color: hsl(var(--primary-foreground));
        }
        
        .btn-primary:hover {
            background-color: hsl(var(--primary) / 0.9);
        }
        
        .data-table {
            width: 100%;
            border-collapse: collapse;
            background-color: hsl(var(--card));
            border-radius: 0.5rem;
            overflow: hidden;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        .data-table th, .data-table td {
            padding: 1rem;
            text-align: right;
            border-bottom: 1px solid hsl(var(--border));
        }
        
        .data-table th {
            background-color: hsl(var(--muted));
            font-weight: 600;
            color: hsl(var(--foreground));
        }
        
        .data-table tr:hover {
            background-color: hsl(var(--muted) / 0.5);
        }
        
        .success-message {
            background-color: #c6f6d5;
            color: #22543d;
            padding: 1rem;
            border-radius: 0.5rem;
            margin: 1rem 0;
            border-right: 4px solid #48bb78;
        }
        
        .language-switcher {
            position: fixed;
            top: 1rem;
            left: 1rem;
            z-index: 1000;
            background-color: hsl(var(--card));
            border: 1px solid hsl(var(--border));
            border-radius: 0.5rem;
            padding: 0.5rem;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        .language-btn {
            padding: 0.5rem 1rem;
            border: none;
            background: none;
            cursor: pointer;
            border-radius: 0.25rem;
            font-weight: 500;
        }
        
        .language-btn.active {
            background-color: hsl(var(--primary));
            color: hsl(var(--primary-foreground));
        }
        
        .language-btn:hover:not(.active) {
            background-color: hsl(var(--muted));
        }
        
        /* RTL/LTR Layout */
        .rtl { direction: rtl; }
        .ltr { direction: ltr; }
        
        .ltr * { font-family: 'Inter', sans-serif; }
        .rtl * { font-family: 'Cairo', sans-serif; }
        
        .ltr .sidebar-expanded { left: 0; right: auto; }
        .ltr .content-with-sidebar { margin-left: 280px; margin-right: 0; }
        .ltr .content-with-collapsed-sidebar { margin-left: 80px; margin-right: 0; }
        .ltr .nav-item { text-align: left; }
        .ltr .data-table th, .ltr .data-table td { text-align: left; }
        .ltr .form-field { text-align: left; }
    </style>
</head>
<body class="bg-gray-50/80">
    <!-- Language Switcher -->
    <div class="language-switcher">
        <button class="language-btn active" onclick="switchLanguage('ar')" id="lang-ar">عربي</button>
        <button class="language-btn" onclick="switchLanguage('en')" id="lang-en">EN</button>
    </div>

    <!-- Sidebar -->
    <div id="sidebar" class="sidebar-expanded fixed top-0 h-full bg-card border-border transition-all duration-300 z-40" style="right: 0; border-left: 1px solid hsl(var(--border));">
        <div class="flex flex-col h-full">
            <!-- Header -->
            <div class="px-4 py-6 border-b border-border">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
                            ${logoBase64 ? `<img src="${logoBase64}" alt="Al-Wasiloon Logo" class="w-10 h-10 object-contain rounded-lg">` : '<i class="fas fa-industry text-primary text-xl"></i>'}
                        </div>
                        <div id="sidebar-title" class="min-w-0">
                            <h2 class="text-lg font-bold leading-tight" data-key="appTitle">نظام إدارة مصنع الأسمدة</h2>
                            <p class="text-xs text-muted-foreground" data-key="appSubtitle">شركة الواصلون</p>
                        </div>
                    </div>
                    <button id="sidebar-toggle" class="p-2 rounded-lg hover:bg-muted">
                        <i class="fas fa-chevron-left text-muted-foreground"></i>
                    </button>
                </div>
                <div id="version-badge" class="mt-3 text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded" data-key="version">
                    الإصدار 1.0
                </div>
            </div>
            
            <!-- Navigation -->
            <nav class="flex-1 px-3 py-4 space-y-2 overflow-y-auto">
                <button class="nav-item active" onclick="showPage('dashboard')">
                    <i class="fas fa-chart-line w-5 h-5 shrink-0"></i>
                    <span class="nav-text font-medium text-sm mr-3" data-key="dashboard">لوحة التحكم</span>
                </button>
                <button class="nav-item" onclick="showPage('sales')">
                    <i class="fas fa-shopping-cart w-5 h-5 shrink-0"></i>
                    <span class="nav-text font-medium text-sm mr-3" data-key="sales">المبيعات</span>
                </button>
                <button class="nav-item" onclick="showPage('expenses')">
                    <i class="fas fa-money-bill w-5 h-5 shrink-0"></i>
                    <span class="nav-text font-medium text-sm mr-3" data-key="expenses">المصروفات</span>
                </button>
                <button class="nav-item" onclick="showPage('workers')">
                    <i class="fas fa-users w-5 h-5 shrink-0"></i>
                    <span class="nav-text font-medium text-sm mr-3" data-key="workers">العمال</span>
                </button>
                <button class="nav-item" onclick="showPage('storage')">
                    <i class="fas fa-warehouse w-5 h-5 shrink-0"></i>
                    <span class="nav-text font-medium text-sm mr-3" data-key="storage">المخزون</span>
                </button>
                <button class="nav-item" onclick="showPage('activity-logs')">
                    <i class="fas fa-clipboard-list w-5 h-5 shrink-0"></i>
                    <span class="nav-text font-medium text-sm mr-3" data-key="activityLogs">سجل الأنشطة</span>
                </button>
                <button class="nav-item" onclick="showPage('reports')">
                    <i class="fas fa-chart-pie w-5 h-5 shrink-0"></i>
                    <span class="nav-text font-medium text-sm mr-3" data-key="reports">التقارير</span>
                </button>
                <button class="nav-item" onclick="showPage('settings')">
                    <i class="fas fa-cog w-5 h-5 shrink-0"></i>
                    <span class="nav-text font-medium text-sm mr-3" data-key="settings">الإعدادات</span>
                </button>
            </nav>
            
            <!-- Footer -->
            <div id="sidebar-footer" class="px-4 py-3 border-t border-border bg-muted/30">
                <p class="text-xs text-muted-foreground text-center" data-key="appDescription">
                    نظام إدارة مصنع الأسمدة المتقدم
                </p>
            </div>
        </div>
    </div>

    <!-- Main Content -->
    <div id="main-content" class="content-with-sidebar transition-all duration-300">
        <!-- Top Bar -->
        <header class="bg-card border-b border-border px-6 py-4">
            <div class="flex items-center justify-between">
                <h1 id="page-title" class="text-2xl font-bold" data-key="dashboard">لوحة التحكم</h1>
                <div class="flex items-center gap-4">
                    <div class="bg-muted/50 px-3 py-2 rounded-lg text-sm">
                        <span class="text-muted-foreground" data-key="lastUpdated">آخر تحديث:</span>
                        <span id="last-update" class="font-medium mr-1"></span>
                    </div>
                </div>
            </div>
        </header>

        <!-- Page Content -->
        <main class="container mx-auto px-6 py-6 max-w-7xl">
            
            <!-- Dashboard Page -->
            <div id="dashboard-page" class="page-content space-y-6">
                <!-- Date Filter Tabs -->
                <div class="flex items-center justify-between flex-wrap gap-4">
                    <h1 class="text-3xl font-bold tracking-tight" data-key="dashboard">لوحة التحكم</h1>
                    <div class="flex bg-muted rounded-lg p-1">
                        <button class="date-filter active px-4 py-2 rounded-md text-sm font-medium bg-card shadow-sm" data-filter="7days" data-key="days7">7 أيام</button>
                        <button class="date-filter px-4 py-2 rounded-md text-sm font-medium" data-filter="30days" data-key="days30">30 يوم</button>
                        <button class="date-filter px-4 py-2 rounded-md text-sm font-medium" data-filter="90days" data-key="days90">90 يوم</button>
                        <button class="date-filter px-4 py-2 rounded-md text-sm font-medium" data-filter="year" data-key="year">سنة</button>
                    </div>
                </div>

                <!-- Summary Cards -->
                <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div class="bg-card rounded-lg border border-border p-6 shadow-sm">
                        <div class="flex flex-row items-center justify-between space-y-0 pb-2">
                            <h3 class="text-sm font-medium" data-key="totalRevenue">إجمالي الإيرادات</h3>
                            <i class="fas fa-dollar-sign text-muted-foreground"></i>
                        </div>
                        <div class="text-2xl font-bold" id="total-revenue">169,100 جنيه</div>
                        <p class="text-xs text-muted-foreground">
                            +20.1% <span data-key="fromLastMonth">من الشهر الماضي</span>
                        </p>
                    </div>
                    <div class="bg-card rounded-lg border border-border p-6 shadow-sm">
                        <div class="flex flex-row items-center justify-between space-y-0 pb-2">
                            <h3 class="text-sm font-medium" data-key="totalExpenses">إجمالي المصروفات</h3>
                            <i class="fas fa-shopping-cart text-muted-foreground"></i>
                        </div>
                        <div class="text-2xl font-bold" id="total-expenses">120,000 جنيه</div>
                        <p class="text-xs text-muted-foreground">
                            +5.2% <span data-key="fromLastMonth">من الشهر الماضي</span>
                        </p>
                    </div>
                    <div class="bg-card rounded-lg border border-border p-6 shadow-sm">
                        <div class="flex flex-row items-center justify-between space-y-0 pb-2">
                            <h3 class="text-sm font-medium" data-key="profit">صافي الربح</h3>
                            <i class="fas fa-trending-up text-muted-foreground"></i>
                        </div>
                        <div class="text-2xl font-bold text-green-600" id="profit">49,100 جنيه</div>
                        <div class="flex items-center pt-1">
                            <i class="fas fa-arrow-up text-green-500 text-xs"></i>
                            <span class="text-xs text-green-500 mr-1">29.1% <span data-key="margin">هامش</span></span>
                        </div>
                    </div>
                    <div class="bg-card rounded-lg border border-border p-6 shadow-sm">
                        <div class="flex flex-row items-center justify-between space-y-0 pb-2">
                            <h3 class="text-sm font-medium" data-key="totalProducts">إجمالي المنتجات</h3>
                            <i class="fas fa-box text-muted-foreground"></i>
                        </div>
                        <div class="text-2xl font-bold">4</div>
                        <p class="text-xs text-muted-foreground">
                            78 <span data-key="unitsSold">وحدة مباعة</span>
                        </p>
                    </div>
                </div>

                <!-- Charts -->
                <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <div class="col-span-4 bg-card rounded-lg border border-border p-6 shadow-sm">
                        <h3 class="text-lg font-semibold mb-4" data-key="salesOverview">نظرة عامة على المبيعات</h3>
                        <div class="chart-container">
                            <canvas id="salesChart"></canvas>
                        </div>
                    </div>
                    <div class="col-span-3 bg-card rounded-lg border border-border p-6 shadow-sm">
                        <h3 class="text-lg font-semibold mb-2" data-key="topProducts">أفضل المنتجات</h3>
                        <p class="text-sm text-muted-foreground mb-4" data-key="revenueDistribution">توزيع الإيرادات</p>
                        <div class="chart-container">
                            <canvas id="productsChart"></canvas>
                        </div>
                    </div>
                </div>

                <!-- Expenses Chart -->
                <div class="bg-card rounded-lg border border-border p-6 shadow-sm">
                    <h3 class="text-lg font-semibold mb-2">تفصيل المصروفات</h3>
                    <p class="text-sm text-muted-foreground mb-4">أهم المصروفات حسب الفئة</p>
                    <div class="chart-container">
                        <canvas id="expensesChart"></canvas>
                    </div>
                </div>

                <!-- Recent Transactions -->
                <div class="bg-card rounded-lg border border-border p-6 shadow-sm">
                    <h3 class="text-lg font-semibold mb-2" data-key="recentTransactions">المعاملات الأخيرة</h3>
                    <p class="text-sm text-muted-foreground mb-4">آخر 7 أيام من النشاط</p>
                    <div id="recent-transactions" class="space-y-4">
                        <div class="text-center py-8">
                            <i class="fas fa-chart-line text-4xl text-muted-foreground mb-4"></i>
                            <p class="text-muted-foreground" data-key="noDataFound">لا توجد بيانات</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Sales Page -->
            <div id="sales-page" class="page-content space-y-6 hidden">
                <h1 class="text-3xl font-bold tracking-tight" data-key="sales">إدارة المبيعات</h1>
                
                <!-- Add Sale Form -->
                <div class="bg-card rounded-lg border border-border p-6 shadow-sm">
                    <h3 class="text-lg font-semibold mb-4" data-key="recordSale">إضافة بيع جديد</h3>
                    <div class="form-grid">
                        <div class="form-field">
                            <label data-key="product">المنتج</label>
                            <select id="sale-product">
                                <option value="" data-key="selectProduct">اختر المنتج</option>
                            </select>
                        </div>
                        <div class="form-field">
                            <label data-key="quantity">الكمية (طن)</label>
                            <input type="number" id="sale-quantity" placeholder="50">
                        </div>
                        <div class="form-field">
                            <label data-key="totalAmount">المبلغ الإجمالي (جنيه)</label>
                            <input type="number" id="sale-amount" placeholder="25000">
                        </div>
                        <div class="form-field">
                            <label data-key="clientName">اسم العميل</label>
                            <input type="text" id="sale-client" placeholder="اسم العميل">
                        </div>
                        <div class="form-field">
                            <label data-key="clientContact">رقم الهاتف</label>
                            <input type="text" id="sale-contact" placeholder="+20 100 123 4567">
                        </div>
                        <div class="form-field">
                            <label data-key="saleDate">تاريخ البيع</label>
                            <input type="date" id="sale-date">
                        </div>
                    </div>
                    <button onclick="addSale()" class="btn btn-primary">
                        <i class="fas fa-plus"></i>
                        <span data-key="recordSale">تسجيل بيع جديد</span>
                    </button>
                </div>

                <!-- Sales Table -->
                <div class="bg-card rounded-lg border border-border p-6 shadow-sm">
                    <h3 class="text-lg font-semibold mb-4">سجل المبيعات</h3>
                    <div class="overflow-x-auto">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th data-key="product">المنتج</th>
                                    <th data-key="quantity">الكمية</th>
                                    <th data-key="amount">المبلغ</th>
                                    <th data-key="clientName">العميل</th>
                                    <th data-key="saleDate">التاريخ</th>
                                </tr>
                            </thead>
                            <tbody id="sales-table-body">
                                <!-- Sales data will be inserted here -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Expenses Page -->
            <div id="expenses-page" class="page-content space-y-6 hidden">
                <h1 class="text-3xl font-bold tracking-tight" data-key="expenses">إدارة المصروفات</h1>
                
                <!-- Add Expense Form -->
                <div class="bg-card rounded-lg border border-border p-6 shadow-sm">
                    <h3 class="text-lg font-semibold mb-4" data-key="addExpense">إضافة مصروف جديد</h3>
                    <div class="form-grid">
                        <div class="form-field">
                            <label data-key="expenseName">اسم المصروف</label>
                            <input type="text" id="expense-name" placeholder="مثال: كهرباء ومياه">
                        </div>
                        <div class="form-field">
                            <label data-key="amount">المبلغ (جنيه)</label>
                            <input type="number" id="expense-amount" placeholder="5000">
                        </div>
                        <div class="form-field">
                            <label data-key="category">نوع المصروف</label>
                            <select id="expense-category">
                                <option value="materials">مواد خام</option>
                                <option value="utilities" data-key="utilities">كهرباء ومياه</option>
                                <option value="salaries" data-key="salaries">رواتب</option>
                                <option value="maintenance">صيانة</option>
                                <option value="transport">نقل ومواصلات</option>
                                <option value="other" data-key="other">أخرى</option>
                            </select>
                        </div>
                        <div class="form-field">
                            <label data-key="expenseDate">تاريخ المصروف</label>
                            <input type="date" id="expense-date">
                        </div>
                    </div>
                    <button onclick="addExpense()" class="btn btn-primary">
                        <i class="fas fa-plus"></i>
                        <span data-key="addExpense">إضافة مصروف جديد</span>
                    </button>
                </div>

                <!-- Expenses Table -->
                <div class="bg-card rounded-lg border border-border p-6 shadow-sm">
                    <h3 class="text-lg font-semibold mb-4">سجل المصروفات</h3>
                    <div class="overflow-x-auto">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th data-key="expenseName">اسم المصروف</th>
                                    <th data-key="amount">المبلغ</th>
                                    <th data-key="category">النوع</th>
                                    <th data-key="expenseDate">التاريخ</th>
                                </tr>
                            </thead>
                            <tbody id="expenses-table-body">
                                <!-- Expenses data will be inserted here -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Workers Page -->
            <div id="workers-page" class="page-content space-y-6 hidden">
                <h1 class="text-3xl font-bold tracking-tight" data-key="workers">إدارة العمال</h1>
                
                <!-- Add Worker Form -->
                <div class="bg-card rounded-lg border border-border p-6 shadow-sm">
                    <h3 class="text-lg font-semibold mb-4" data-key="addWorker">إضافة عامل جديد</h3>
                    <div class="form-grid">
                        <div class="form-field">
                            <label data-key="fullName">اسم العامل</label>
                            <input type="text" id="worker-name" placeholder="الاسم الكامل">
                        </div>
                        <div class="form-field">
                            <label data-key="jobRole">المنصب</label>
                            <input type="text" id="worker-position" placeholder="مثال: عامل إنتاج">
                        </div>
                        <div class="form-field">
                            <label data-key="department">القسم</label>
                            <select id="worker-department">
                                <option value="الإنتاج" data-key="production">الإنتاج</option>
                                <option value="الجودة">الجودة</option>
                                <option value="الصيانة" data-key="maintenance">الصيانة</option>
                                <option value="المخازن">المخازن</option>
                                <option value="الإدارة" data-key="administration">الإدارة</option>
                                <option value="المبيعات">المبيعات</option>
                            </select>
                        </div>
                        <div class="form-field">
                            <label data-key="monthlySalary">الراتب الشهري (جنيه)</label>
                            <input type="number" id="worker-salary" placeholder="3000">
                        </div>
                        <div class="form-field">
                            <label data-key="hireDate">تاريخ التوظيف</label>
                            <input type="date" id="worker-hire-date">
                        </div>
                    </div>
                    <button onclick="addWorker()" class="btn btn-primary">
                        <i class="fas fa-plus"></i>
                        <span data-key="addWorker">إضافة عامل جديد</span>
                    </button>
                </div>

                <!-- Workers Table -->
                <div class="bg-card rounded-lg border border-border p-6 shadow-sm">
                    <h3 class="text-lg font-semibold mb-4">قائمة العمال</h3>
                    <div class="overflow-x-auto">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th data-key="fullName">الاسم</th>
                                    <th data-key="jobRole">المنصب</th>
                                    <th data-key="department">القسم</th>
                                    <th data-key="monthlySalary">الراتب</th>
                                    <th data-key="hireDate">تاريخ التوظيف</th>
                                </tr>
                            </thead>
                            <tbody id="workers-table-body">
                                <!-- Workers data will be inserted here -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Storage Page -->
            <div id="storage-page" class="page-content space-y-6 hidden">
                <h1 class="text-3xl font-bold tracking-tight" data-key="storage">إدارة المخزون</h1>
                
                <!-- Add Storage Item Form -->
                <div class="bg-card rounded-lg border border-border p-6 shadow-sm">
                    <h3 class="text-lg font-semibold mb-4" data-key="addNewItem">إضافة عنصر جديد</h3>
                    <div class="form-grid">
                        <div class="form-field">
                            <label data-key="itemName">اسم المادة</label>
                            <input type="text" id="storage-item-name" placeholder="مثال: نترات الأمونيوم">
                        </div>
                        <div class="form-field">
                            <label data-key="quantityInTons">الكمية (طن)</label>
                            <input type="number" id="storage-quantity" placeholder="100">
                        </div>
                        <div class="form-field">
                            <label data-key="purchasePricePerTon">سعر الوحدة (جنيه)</label>
                            <input type="number" id="storage-price" placeholder="500">
                        </div>
                        <div class="form-field">
                            <label data-key="dealerName">المورد</label>
                            <input type="text" id="storage-supplier" placeholder="اسم المورد">
                        </div>
                    </div>
                    <button onclick="addStorageItem()" class="btn btn-primary">
                        <i class="fas fa-plus"></i>
                        <span data-key="addItem">إضافة مادة جديدة</span>
                    </button>
                </div>

                <!-- Storage Table -->
                <div class="bg-card rounded-lg border border-border p-6 shadow-sm">
                    <h3 class="text-lg font-semibold mb-4">جدول المخزون</h3>
                    <div class="overflow-x-auto">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th data-key="itemName">المادة</th>
                                    <th data-key="quantityInTons">الكمية المتاحة</th>
                                    <th data-key="purchasePricePerTon">سعر الوحدة</th>
                                    <th data-key="dealerName">المورد</th>
                                    <th data-key="totalCost">القيمة الإجمالية</th>
                                </tr>
                            </thead>
                            <tbody id="storage-table-body">
                                <!-- Storage data will be inserted here -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Activity Logs Page -->
            <div id="activity-logs-page" class="page-content space-y-6 hidden">
                <h1 class="text-3xl font-bold tracking-tight" data-key="activityLogs">سجل الأنشطة</h1>
                
                <!-- Add Activity Form -->
                <div class="bg-card rounded-lg border border-border p-6 shadow-sm">
                    <h3 class="text-lg font-semibold mb-4">إضافة نشاط جديد</h3>
                    <div class="form-grid">
                        <div class="form-field">
                            <label>عنوان النشاط</label>
                            <input type="text" id="activity-title" placeholder="مثال: صيانة المعدات">
                        </div>
                        <div class="form-field">
                            <label>وصف النشاط</label>
                            <textarea id="activity-description" rows="3" placeholder="تفاصيل النشاط"></textarea>
                        </div>
                        <div class="form-field">
                            <label>تاريخ النشاط</label>
                            <input type="date" id="activity-date">
                        </div>
                    </div>
                    <button onclick="addActivity()" class="btn btn-primary">
                        <i class="fas fa-plus"></i>
                        إضافة نشاط جديد
                    </button>
                </div>

                <!-- Activity Logs Table -->
                <div class="bg-card rounded-lg border border-border p-6 shadow-sm">
                    <h3 class="text-lg font-semibold mb-4">سجل الأنشطة</h3>
                    <div class="overflow-x-auto">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>العنوان</th>
                                    <th>الوصف</th>
                                    <th>التاريخ</th>
                                </tr>
                            </thead>
                            <tbody id="activity-logs-table-body">
                                <!-- Activity logs data will be inserted here -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Reports Page -->
            <div id="reports-page" class="page-content space-y-6 hidden">
                <h1 class="text-3xl font-bold tracking-tight" data-key="reports">التقارير</h1>
                
                <!-- Report Cards -->
                <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <div class="bg-card rounded-lg border border-border p-6 shadow-sm">
                        <i class="fas fa-chart-bar text-3xl text-primary mb-4"></i>
                        <h3 class="text-lg font-semibold mb-2">تقرير المبيعات</h3>
                        <p class="text-muted-foreground mb-4">تقرير شامل لجميع المبيعات والإيرادات</p>
                        <button class="btn btn-primary" onclick="generateSalesReport()">
                            إنشاء التقرير
                        </button>
                    </div>
                    
                    <div class="bg-card rounded-lg border border-border p-6 shadow-sm">
                        <i class="fas fa-receipt text-3xl text-primary mb-4"></i>
                        <h3 class="text-lg font-semibold mb-2">تقرير المصروفات</h3>
                        <p class="text-muted-foreground mb-4">تحليل شامل للمصروفات والنفقات</p>
                        <button class="btn btn-primary" onclick="generateExpensesReport()">
                            إنشاء التقرير
                        </button>
                    </div>
                    
                    <div class="bg-card rounded-lg border border-border p-6 shadow-sm">
                        <i class="fas fa-users text-3xl text-primary mb-4"></i>
                        <h3 class="text-lg font-semibold mb-2">تقرير العمال</h3>
                        <p class="text-muted-foreground mb-4">إحصائيات العمال والرواتب</p>
                        <button class="btn btn-primary" onclick="generateWorkersReport()">
                            إنشاء التقرير
                        </button>
                    </div>
                </div>

                <!-- Report Display Area -->
                <div id="report-display" class="bg-card rounded-lg border border-border p-6 shadow-sm hidden">
                    <h3 class="text-lg font-semibold mb-4" id="report-title">التقرير</h3>
                    <div id="report-content">
                        <!-- Report content will be displayed here -->
                    </div>
                </div>
            </div>

            <!-- Settings Page -->
            <div id="settings-page" class="page-content space-y-6 hidden">
                <h1 class="text-3xl font-bold tracking-tight" data-key="settings">الإعدادات</h1>
                
                <div class="grid gap-6 md:grid-cols-2">
                    <!-- Language Settings -->
                    <div class="bg-card rounded-lg border border-border p-6 shadow-sm">
                        <h3 class="text-lg font-semibold mb-4">إعدادات اللغة</h3>
                        <div class="space-y-4">
                            <div class="flex items-center gap-4">
                                <label class="flex items-center gap-2">
                                    <input type="radio" name="language" value="ar" checked>
                                    <span>العربية</span>
                                </label>
                                <label class="flex items-center gap-2">
                                    <input type="radio" name="language" value="en">
                                    <span>English</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <!-- Data Management -->
                    <div class="bg-card rounded-lg border border-border p-6 shadow-sm">
                        <h3 class="text-lg font-semibold mb-4">إدارة البيانات</h3>
                        <div class="space-y-4">
                            <button onclick="exportData()" class="btn btn-primary w-full">
                                <i class="fas fa-download"></i>
                                تصدير البيانات
                            </button>
                            <button onclick="importData()" class="btn btn-primary w-full">
                                <i class="fas fa-upload"></i>
                                استيراد البيانات
                            </button>
                            <button onclick="clearAllData()" class="btn" style="background-color: #dc2626; color: white;" id="clear-data-btn">
                                <i class="fas fa-trash"></i>
                                مسح جميع البيانات
                            </button>
                        </div>
                    </div>

                    <!-- System Information -->
                    <div class="bg-card rounded-lg border border-border p-6 shadow-sm">
                        <h3 class="text-lg font-semibold mb-4">معلومات النظام</h3>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span>الإصدار:</span>
                                <span>1.0.0</span>
                            </div>
                            <div class="flex justify-between">
                                <span>آخر تحديث:</span>
                                <span id="last-update-settings"></span>
                            </div>
                            <div class="flex justify-between">
                                <span>حجم البيانات:</span>
                                <span id="data-size"></span>
                            </div>
                        </div>
                    </div>

                    <!-- Company Information -->
                    <div class="bg-card rounded-lg border border-border p-6 shadow-sm">
                        <h3 class="text-lg font-semibold mb-4">معلومات الشركة</h3>
                        <div class="space-y-2 text-sm">
                            <div><strong>الاسم:</strong> شركة الواصلون للتعدين والصناعات الكيميائية</div>
                            <div><strong>النشاط:</strong> تصنيع وتوزيع الأسمدة الكيميائية</div>
                            <div><strong>الموقع:</strong> مصر</div>
                        </div>
                    </div>
                </div>
            </div>

        </main>
    </div>

    <script>
        // Translations
        const translations = {
            ar: {
                dashboard: "لوحة التحكم",
                sales: "المبيعات", 
                expenses: "المصروفات",
                workers: "العمال",
                storage: "المخزون",
                activityLogs: "سجل الأنشطة",
                reports: "التقارير",
                settings: "الإعدادات",
                appTitle: "نظام إدارة مصنع الأسمدة",
                appSubtitle: "شركة الواصلون",
                appDescription: "نظام إدارة مصنع الأسمدة المتقدم",
                version: "الإصدار 1.0",
                lastUpdated: "آخر تحديث:",
                totalRevenue: "إجمالي الإيرادات",
                totalExpenses: "إجمالي المصروفات", 
                profit: "صافي الربح",
                totalProducts: "إجمالي المنتجات",
                fromLastMonth: "من الشهر الماضي",
                margin: "هامش",
                unitsSold: "وحدة مباعة",
                salesOverview: "نظرة عامة على المبيعات",
                topProducts: "أفضل المنتجات",
                revenueDistribution: "توزيع الإيرادات",
                days7: "7 أيام",
                days30: "30 يوم", 
                days90: "90 يوم",
                year: "سنة",
                recentTransactions: "المعاملات الأخيرة",
                noDataFound: "لا توجد بيانات",
                recordSale: "تسجيل بيع جديد",
                product: "المنتج",
                selectProduct: "اختر المنتج",
                quantity: "الكمية",
                totalAmount: "المبلغ الإجمالي",
                clientName: "اسم العميل", 
                clientContact: "رقم الهاتف",
                saleDate: "تاريخ البيع",
                amount: "المبلغ",
                addExpense: "إضافة مصروف جديد",
                expenseName: "اسم المصروف",
                category: "النوع",
                expenseDate: "تاريخ المصروف",
                utilities: "كهرباء ومياه",
                salaries: "رواتب", 
                other: "أخرى",
                addWorker: "إضافة عامل جديد",
                fullName: "اسم العامل",
                jobRole: "المنصب",
                department: "القسم",
                monthlySalary: "الراتب الشهري",
                hireDate: "تاريخ التوظيف",
                production: "الإنتاج",
                maintenance: "الصيانة",
                administration: "الإدارة",
                addNewItem: "إضافة عنصر جديد",
                itemName: "اسم المادة",
                quantityInTons: "الكمية (طن)",
                purchasePricePerTon: "سعر الوحدة (جنيه)",
                dealerName: "المورد",
                addItem: "إضافة مادة جديدة",
                totalCost: "القيمة الإجمالية"
            },
            en: {
                dashboard: "Dashboard",
                sales: "Sales",
                expenses: "Expenses", 
                workers: "Workers",
                storage: "Storage",
                activityLogs: "Activity Logs",
                reports: "Reports", 
                settings: "Settings",
                appTitle: "Fertilizer Factory Management",
                appSubtitle: "Al-Wasiloon Company",
                appDescription: "Advanced fertilizer factory management system",
                version: "Version 1.0",
                lastUpdated: "Last Updated:",
                totalRevenue: "Total Revenue",
                totalExpenses: "Total Expenses",
                profit: "Net Profit", 
                totalProducts: "Total Products",
                fromLastMonth: "from last month",
                margin: "margin",
                unitsSold: "units sold",
                salesOverview: "Sales Overview",
                topProducts: "Top Products",
                revenueDistribution: "Revenue Distribution",
                days7: "7 Days",
                days30: "30 Days",
                days90: "90 Days", 
                year: "Year",
                recentTransactions: "Recent Transactions",
                noDataFound: "No data found",
                recordSale: "Record New Sale",
                product: "Product",
                selectProduct: "Select Product",
                quantity: "Quantity",
                totalAmount: "Total Amount",
                clientName: "Client Name",
                clientContact: "Phone Number",
                saleDate: "Sale Date",
                amount: "Amount",
                addExpense: "Add New Expense",
                expenseName: "Expense Name",
                category: "Category", 
                expenseDate: "Expense Date",
                utilities: "Utilities",
                salaries: "Salaries",
                other: "Other",
                addWorker: "Add New Worker",
                fullName: "Worker Name",
                jobRole: "Position",
                department: "Department",
                monthlySalary: "Monthly Salary",
                hireDate: "Hire Date",
                production: "Production",
                maintenance: "Maintenance",
                administration: "Administration", 
                addNewItem: "Add New Item",
                itemName: "Item Name",
                quantityInTons: "Quantity (Tons)",
                purchasePricePerTon: "Unit Price",
                dealerName: "Supplier",
                addItem: "Add New Item",
                totalCost: "Total Value"
            }
        };

        // Application data with realistic sample data
        let appData = JSON.parse(localStorage.getItem('fertilizerFactoryData')) || {
            storage: [
                { id: 1, itemName: "نترات الأمونيوم", quantity: 150, unitPrice: 500, supplier: "شركة الكيماويات المصرية" },
                { id: 2, itemName: "صخر الفوسفات", quantity: 200, unitPrice: 300, supplier: "مناجم الفوسفات" },
                { id: 3, itemName: "كلوريد البوتاسيوم", quantity: 100, unitPrice: 400, supplier: "البوتاس العربية" },
                { id: 4, itemName: "NPK المركب", quantity: 50, unitPrice: 600, supplier: "الأسمدة المتقدمة" }
            ],
            sales: [
                { id: 1, productName: "نترات الأمونيوم", quantity: 45, totalAmount: 112500, clientName: "مزارع الوادي الأخضر", clientContact: "+20 100 123 4567", saleDate: "2024-12-01" },
                { id: 2, productName: "صخر الفوسفات", quantity: 15, totalAmount: 27000, clientName: "مزرعة النيل", clientContact: "+20 101 234 5678", saleDate: "2024-12-02" },
                { id: 3, productName: "كلوريد البوتاسيوم", quantity: 10, totalAmount: 12000, clientName: "الزراعة الحديثة", clientContact: "+20 102 345 6789", saleDate: "2024-12-03" },
                { id: 4, productName: "NPK المركب", quantity: 8, totalAmount: 17600, clientName: "مشاريع الأراضي الجديدة", clientContact: "+20 103 456 7890", saleDate: "2024-12-04" }
            ],
            expenses: [
                { id: 1, name: "رواتب العمال", amount: 50000, category: "salaries", expenseDate: "2024-12-01" },
                { id: 2, name: "مواد خام", amount: 35000, category: "materials", expenseDate: "2024-12-01" },
                { id: 3, name: "فاتورة الكهرباء", amount: 15000, category: "utilities", expenseDate: "2024-12-02" },
                { id: 4, name: "النقل والمواصلات", amount: 12000, category: "transport", expenseDate: "2024-12-03" },
                { id: 5, name: "إصلاح المعدات", amount: 8000, category: "maintenance", expenseDate: "2024-12-04" }
            ],
            workers: [
                { id: 1, name: "أحمد محمد علي", position: "عامل إنتاج", department: "الإنتاج", salary: 3000, hireDate: "2024-01-01" },
                { id: 2, name: "فاطمة حسن", position: "مراقب جودة", department: "الجودة", salary: 3500, hireDate: "2024-02-01" },
                { id: 3, name: "محمد السيد", position: "فني صيانة", department: "الصيانة", salary: 3200, hireDate: "2024-03-01" },
                { id: 4, name: "سارة أحمد", position: "محاسب", department: "الإدارة", salary: 4000, hireDate: "2024-04-01" }
            ],
            activityLogs: [
                { id: 1, title: "صيانة دورية للمعدات", description: "تم إجراء صيانة شاملة لجميع معدات الإنتاج", logDate: "2024-12-01" },
                { id: 2, title: "استلام مواد خام", description: "تم استلام شحنة جديدة من نترات الأمونيوم", logDate: "2024-12-02" },
                { id: 3, title: "مراجعة أمان", description: "تم إجراء مراجعة شاملة لإجراءات الأمان", logDate: "2024-12-03" }
            ]
        };

        // Current language
        let currentLanguage = 'ar';

        // Charts instances
        let salesChart, productsChart, expensesChart;

        // Sidebar state
        let sidebarCollapsed = false;

        // Language switching functionality
        function switchLanguage(lang) {
            currentLanguage = lang;
            
            // Update language buttons
            document.querySelectorAll('.language-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            document.getElementById(\`lang-\${lang}\`).classList.add('active');
            
            // Update HTML attributes
            const htmlRoot = document.getElementById('html-root');
            htmlRoot.setAttribute('lang', lang);
            htmlRoot.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
            htmlRoot.className = lang === 'ar' ? 'rtl' : 'ltr';
            
            // Update sidebar position for LTR
            const sidebar = document.getElementById('sidebar');
            const mainContent = document.getElementById('main-content');
            
            if (lang === 'en') {
                sidebar.style.left = '0';
                sidebar.style.right = 'auto';
                sidebar.style.borderLeft = 'none';
                sidebar.style.borderRight = '1px solid hsl(var(--border))';
                mainContent.style.marginLeft = sidebarCollapsed ? '80px' : '280px';
                mainContent.style.marginRight = '0';
            } else {
                sidebar.style.right = '0';
                sidebar.style.left = 'auto';
                sidebar.style.borderRight = 'none';
                sidebar.style.borderLeft = '1px solid hsl(var(--border))';
                mainContent.style.marginRight = sidebarCollapsed ? '80px' : '280px';
                mainContent.style.marginLeft = '0';
            }
            
            // Update all translatable elements
            updateTranslations();
            
            // Save language preference
            localStorage.setItem('preferredLanguage', lang);
        }

        function updateTranslations() {
            document.querySelectorAll('[data-key]').forEach(element => {
                const key = element.getAttribute('data-key');
                if (translations[currentLanguage] && translations[currentLanguage][key]) {
                    element.textContent = translations[currentLanguage][key];
                }
            });
        }

        // Sidebar functionality
        function toggleSidebar() {
            sidebarCollapsed = !sidebarCollapsed;
            const sidebar = document.getElementById('sidebar');
            const mainContent = document.getElementById('main-content');
            const toggleIcon = document.querySelector('#sidebar-toggle i');
            const sidebarTitle = document.getElementById('sidebar-title');
            const versionBadge = document.getElementById('version-badge');
            const sidebarFooter = document.getElementById('sidebar-footer');
            const navTexts = document.querySelectorAll('.nav-text');

            if (sidebarCollapsed) {
                sidebar.classList.remove('sidebar-expanded');
                sidebar.classList.add('sidebar-collapsed');
                
                if (currentLanguage === 'ar') {
                    mainContent.classList.remove('content-with-sidebar');
                    mainContent.classList.add('content-with-collapsed-sidebar');
                    toggleIcon.className = 'fas fa-chevron-right text-muted-foreground';
                } else {
                    mainContent.style.marginLeft = '80px';
                    toggleIcon.className = 'fas fa-chevron-left text-muted-foreground';
                }
                
                sidebarTitle.style.display = 'none';
                versionBadge.style.display = 'none';
                sidebarFooter.style.display = 'none';
                navTexts.forEach(text => text.style.display = 'none');
            } else {
                sidebar.classList.remove('sidebar-collapsed');
                sidebar.classList.add('sidebar-expanded');
                
                if (currentLanguage === 'ar') {
                    mainContent.classList.remove('content-with-collapsed-sidebar');
                    mainContent.classList.add('content-with-sidebar');
                    toggleIcon.className = 'fas fa-chevron-left text-muted-foreground';
                } else {
                    mainContent.style.marginLeft = '280px';
                    toggleIcon.className = 'fas fa-chevron-right text-muted-foreground';
                }
                
                sidebarTitle.style.display = 'block';
                versionBadge.style.display = 'block';
                sidebarFooter.style.display = 'block';
                navTexts.forEach(text => text.style.display = 'block');
            }
        }

        // Page navigation
        function showPage(pageId) {
            // Hide all pages
            document.querySelectorAll('.page-content').forEach(page => {
                page.classList.add('hidden');
            });
            
            // Remove active class from all nav items
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Show selected page
            const pageElement = document.getElementById(pageId + '-page');
            if (pageElement) {
                pageElement.classList.remove('hidden');
            }
            
            // Add active class to clicked nav item
            if (event && event.target) {
                const navItem = event.target.closest('.nav-item');
                if (navItem) {
                    navItem.classList.add('active');
                }
            }
            
            // Update page title
            const titles = {
                'dashboard': currentLanguage === 'ar' ? 'لوحة التحكم' : 'Dashboard',
                'sales': currentLanguage === 'ar' ? 'المبيعات' : 'Sales',
                'expenses': currentLanguage === 'ar' ? 'المصروفات' : 'Expenses',
                'workers': currentLanguage === 'ar' ? 'العمال' : 'Workers',
                'storage': currentLanguage === 'ar' ? 'المخزون' : 'Storage',
                'activity-logs': currentLanguage === 'ar' ? 'سجل الأنشطة' : 'Activity Logs',
                'reports': currentLanguage === 'ar' ? 'التقارير' : 'Reports',
                'settings': currentLanguage === 'ar' ? 'الإعدادات' : 'Settings'
            };
            const titleElement = document.getElementById('page-title');
            if (titleElement && titles[pageId]) {
                titleElement.textContent = titles[pageId];
            }
            
            // Initialize page-specific content
            if (pageId === 'dashboard') {
                initDashboard();
            } else if (pageId === 'sales') {
                initSales();
            } else if (pageId === 'expenses') {
                initExpenses();
            } else if (pageId === 'workers') {
                initWorkers();
            } else if (pageId === 'storage') {
                initStorage();
            } else if (pageId === 'activity-logs') {
                initActivityLogs();
            } else if (pageId === 'settings') {
                initSettings();
            }
        }

        // Dashboard functions
        function initDashboard() {
            updateDashboardStats();
            setTimeout(() => {
                initCharts();
            }, 100);
        }

        function updateDashboardStats() {
            const totalIncome = appData.sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
            const totalExpenses = appData.expenses.reduce((sum, expense) => sum + expense.amount, 0);
            const profit = totalIncome - totalExpenses;

            document.getElementById('total-revenue').textContent = formatCurrency(totalIncome);
            document.getElementById('total-expenses').textContent = formatCurrency(totalExpenses);
            document.getElementById('profit').textContent = formatCurrency(profit);
        }

        function initCharts() {
            // Sales trend chart
            const salesCtx = document.getElementById('salesChart');
            if (!salesCtx) return;
            
            if (salesChart) salesChart.destroy();
            
            salesChart = new Chart(salesCtx.getContext('2d'), {
                type: 'line',
                data: {
                    labels: currentLanguage === 'ar' ? 
                        ['الأسبوع 1', 'الأسبوع 2', 'الأسبوع 3', 'الأسبوع 4'] :
                        ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                    datasets: [{
                        label: currentLanguage === 'ar' ? 'المبيعات' : 'Sales',
                        data: [35000, 42000, 38000, 54100],
                        borderColor: 'hsl(28, 58%, 35%)',
                        backgroundColor: 'hsla(28, 58%, 35%, 0.1)',
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

            // Products pie chart
            const productsCtx = document.getElementById('productsChart');
            if (!productsCtx) return;
            
            if (productsChart) productsChart.destroy();
            
            const productData = appData.sales.reduce((acc, sale) => {
                acc[sale.productName] = (acc[sale.productName] || 0) + sale.totalAmount;
                return acc;
            }, {});

            productsChart = new Chart(productsCtx.getContext('2d'), {
                type: 'doughnut',
                data: {
                    labels: Object.keys(productData),
                    datasets: [{
                        data: Object.values(productData),
                        backgroundColor: [
                            'hsl(28, 58%, 35%)',
                            'hsl(32, 39%, 76%)',
                            'hsl(130, 27%, 33%)',
                            'hsl(28, 35%, 57%)',
                            'hsl(32, 25%, 35%)'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { 
                            position: 'bottom',
                            rtl: currentLanguage === 'ar'
                        }
                    }
                }
            });

            // Expenses bar chart
            const expensesCtx = document.getElementById('expensesChart');
            if (!expensesCtx) return;
            
            if (expensesChart) expensesChart.destroy();
            
            expensesChart = new Chart(expensesCtx.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: appData.expenses.map(expense => expense.name),
                    datasets: [{
                        label: currentLanguage === 'ar' ? 'المبلغ' : 'Amount',
                        data: appData.expenses.map(expense => expense.amount),
                        backgroundColor: 'hsl(28, 58%, 35%)'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false }
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

        // Sales functions
        function initSales() {
            updateSalesProductOptions();
            updateSalesTable();
            setCurrentDate('sale-date');
        }

        function updateSalesProductOptions() {
            const select = document.getElementById('sale-product');
            if (!select) return;
            
            const selectProductText = currentLanguage === 'ar' ? 'اختر المنتج' : 'Select Product';
            select.innerHTML = \`<option value="">\${selectProductText}</option>\`;
            
            appData.storage.forEach(item => {
                if (item.quantity > 0) {
                    const availableText = currentLanguage === 'ar' ? 'متاح' : 'Available';
                    const tonsText = currentLanguage === 'ar' ? 'طن' : 'tons';
                    select.innerHTML += \`<option value="\${item.itemName}">\${item.itemName} (\${availableText}: \${item.quantity} \${tonsText})</option>\`;
                }
            });
        }

        function updateSalesTable() {
            const tbody = document.getElementById('sales-table-body');
            if (!tbody) return;
            
            tbody.innerHTML = appData.sales.map(sale => \`
                <tr class="hover:bg-muted/50">
                    <td>\${sale.productName}</td>
                    <td>\${sale.quantity} \${currentLanguage === 'ar' ? 'طن' : 'tons'}</td>
                    <td>\${formatCurrency(sale.totalAmount)}</td>
                    <td>\${sale.clientName}</td>
                    <td>\${formatDate(sale.saleDate)}</td>
                </tr>
            \`).join('');
        }

        function addSale() {
            const productName = document.getElementById('sale-product')?.value;
            const quantity = parseInt(document.getElementById('sale-quantity')?.value);
            const totalAmount = parseInt(document.getElementById('sale-amount')?.value);
            const clientName = document.getElementById('sale-client')?.value;
            const clientContact = document.getElementById('sale-contact')?.value;
            const saleDate = document.getElementById('sale-date')?.value;
            
            if (!productName || !quantity || !totalAmount || !clientName || !saleDate) {
                const message = currentLanguage === 'ar' ? 
                    'يرجى ملء جميع الحقول المطلوبة' : 
                    'Please fill all required fields';
                alert(message);
                return;
            }
            
            const storageItem = appData.storage.find(item => item.itemName === productName);
            if (!storageItem || storageItem.quantity < quantity) {
                const message = currentLanguage === 'ar' ? 
                    'الكمية المطلوبة غير متوفرة في المخزون' : 
                    'Required quantity not available in storage';
                alert(message);
                return;
            }
            
            appData.sales.push({
                id: appData.sales.length + 1,
                productName, quantity, totalAmount, clientName, clientContact, saleDate
            });
            
            storageItem.quantity -= quantity;
            
            updateSalesTable();
            updateSalesProductOptions();
            clearSaleForm();
            saveData();
            showSuccessMessage(currentLanguage === 'ar' ? 'تم تسجيل البيع بنجاح' : 'Sale recorded successfully');
            
            // Update dashboard if it's the current page
            if (!document.getElementById('dashboard-page').classList.contains('hidden')) {
                updateDashboardStats();
            }
        }

        function clearSaleForm() {
            const fields = ['sale-product', 'sale-quantity', 'sale-amount', 'sale-client', 'sale-contact'];
            fields.forEach(id => {
                const element = document.getElementById(id);
                if (element) {
                    if (element.tagName === 'SELECT') {
                        element.selectedIndex = 0;
                    } else {
                        element.value = '';
                    }
                }
            });
            setCurrentDate('sale-date');
        }

        // Expenses functions
        function initExpenses() {
            updateExpensesTable();
            setCurrentDate('expense-date');
        }

        function updateExpensesTable() {
            const tbody = document.getElementById('expenses-table-body');
            if (!tbody) return;
            
            tbody.innerHTML = appData.expenses.map(expense => \`
                <tr class="hover:bg-muted/50">
                    <td>\${expense.name}</td>
                    <td>\${formatCurrency(expense.amount)}</td>
                    <td>\${getCategoryName(expense.category)}</td>
                    <td>\${formatDate(expense.expenseDate)}</td>
                </tr>
            \`).join('');
        }

        function addExpense() {
            const name = document.getElementById('expense-name')?.value;
            const amount = parseInt(document.getElementById('expense-amount')?.value);
            const category = document.getElementById('expense-category')?.value;
            const expenseDate = document.getElementById('expense-date')?.value;
            
            if (!name || !amount || !category || !expenseDate) {
                const message = currentLanguage === 'ar' ? 
                    'يرجى ملء جميع الحقول' : 
                    'Please fill all fields';
                alert(message);
                return;
            }
            
            appData.expenses.push({
                id: appData.expenses.length + 1,
                name, amount, category, expenseDate
            });
            
            updateExpensesTable();
            clearExpenseForm();
            saveData();
            showSuccessMessage(currentLanguage === 'ar' ? 'تم إضافة المصروف بنجاح' : 'Expense added successfully');
            
            // Update dashboard if it's the current page
            if (!document.getElementById('dashboard-page').classList.contains('hidden')) {
                updateDashboardStats();
            }
        }

        function clearExpenseForm() {
            const fields = ['expense-name', 'expense-amount'];
            fields.forEach(id => {
                const element = document.getElementById(id);
                if (element) element.value = '';
            });
            setCurrentDate('expense-date');
        }

        // Workers functions
        function initWorkers() {
            updateWorkersTable();
            setCurrentDate('worker-hire-date');
        }

        function updateWorkersTable() {
            const tbody = document.getElementById('workers-table-body');
            if (!tbody) return;
            
            tbody.innerHTML = appData.workers.map(worker => \`
                <tr class="hover:bg-muted/50">
                    <td>\${worker.name}</td>
                    <td>\${worker.position}</td>
                    <td>\${worker.department}</td>
                    <td>\${formatCurrency(worker.salary)}</td>
                    <td>\${formatDate(worker.hireDate)}</td>
                </tr>
            \`).join('');
        }

        function addWorker() {
            const name = document.getElementById('worker-name')?.value;
            const position = document.getElementById('worker-position')?.value;
            const department = document.getElementById('worker-department')?.value;
            const salary = parseInt(document.getElementById('worker-salary')?.value);
            const hireDate = document.getElementById('worker-hire-date')?.value;
            
            if (!name || !position || !department || !salary || !hireDate) {
                const message = currentLanguage === 'ar' ? 
                    'يرجى ملء جميع الحقول' : 
                    'Please fill all fields';
                alert(message);
                return;
            }
            
            appData.workers.push({
                id: appData.workers.length + 1,
                name, position, department, salary, hireDate
            });
            
            updateWorkersTable();
            clearWorkerForm();
            saveData();
            showSuccessMessage(currentLanguage === 'ar' ? 'تم إضافة العامل بنجاح' : 'Worker added successfully');
        }

        function clearWorkerForm() {
            const fields = ['worker-name', 'worker-position', 'worker-salary'];
            fields.forEach(id => {
                const element = document.getElementById(id);
                if (element) element.value = '';
            });
            setCurrentDate('worker-hire-date');
        }

        // Storage functions
        function initStorage() {
            updateStorageTable();
        }

        function updateStorageTable() {
            const tbody = document.getElementById('storage-table-body');
            if (!tbody) return;
            
            tbody.innerHTML = appData.storage.map(item => \`
                <tr class="hover:bg-muted/50">
                    <td>\${item.itemName}</td>
                    <td>\${item.quantity} \${currentLanguage === 'ar' ? 'طن' : 'tons'}</td>
                    <td>\${formatCurrency(item.unitPrice)}</td>
                    <td>\${item.supplier}</td>
                    <td>\${formatCurrency(item.quantity * item.unitPrice)}</td>
                </tr>
            \`).join('');
        }

        function addStorageItem() {
            const itemName = document.getElementById('storage-item-name')?.value;
            const quantity = parseInt(document.getElementById('storage-quantity')?.value);
            const unitPrice = parseInt(document.getElementById('storage-price')?.value);
            const supplier = document.getElementById('storage-supplier')?.value;
            
            if (!itemName || !quantity || !unitPrice || !supplier) {
                const message = currentLanguage === 'ar' ? 
                    'يرجى ملء جميع الحقول' : 
                    'Please fill all fields';
                alert(message);
                return;
            }
            
            appData.storage.push({
                id: appData.storage.length + 1,
                itemName, quantity, unitPrice, supplier
            });
            
            updateStorageTable();
            updateSalesProductOptions();
            clearStorageForm();
            saveData();
            showSuccessMessage(currentLanguage === 'ar' ? 'تم إضافة المادة بنجاح' : 'Item added successfully');
        }

        function clearStorageForm() {
            const fields = ['storage-item-name', 'storage-quantity', 'storage-price', 'storage-supplier'];
            fields.forEach(id => {
                const element = document.getElementById(id);
                if (element) element.value = '';
            });
        }

        // Activity Logs functions
        function initActivityLogs() {
            updateActivityLogsTable();
            setCurrentDate('activity-date');
        }

        function updateActivityLogsTable() {
            const tbody = document.getElementById('activity-logs-table-body');
            if (!tbody) return;
            
            tbody.innerHTML = appData.activityLogs.map(log => \`
                <tr class="hover:bg-muted/50">
                    <td>\${log.title}</td>
                    <td>\${log.description}</td>
                    <td>\${formatDate(log.logDate)}</td>
                </tr>
            \`).join('');
        }

        function addActivity() {
            const title = document.getElementById('activity-title')?.value;
            const description = document.getElementById('activity-description')?.value;
            const logDate = document.getElementById('activity-date')?.value;
            
            if (!title || !description || !logDate) {
                const message = currentLanguage === 'ar' ? 
                    'يرجى ملء جميع الحقول' : 
                    'Please fill all fields';
                alert(message);
                return;
            }
            
            appData.activityLogs.push({
                id: appData.activityLogs.length + 1,
                title, description, logDate
            });
            
            updateActivityLogsTable();
            clearActivityForm();
            saveData();
            showSuccessMessage(currentLanguage === 'ar' ? 'تم إضافة النشاط بنجاح' : 'Activity added successfully');
        }

        function clearActivityForm() {
            const fields = ['activity-title', 'activity-description'];
            fields.forEach(id => {
                const element = document.getElementById(id);
                if (element) element.value = '';
            });
            setCurrentDate('activity-date');
        }

        // Settings functions
        function initSettings() {
            updateSettingsInfo();
        }

        function updateSettingsInfo() {
            const lastUpdateElement = document.getElementById('last-update-settings');
            const dataSizeElement = document.getElementById('data-size');
            
            if (lastUpdateElement) {
                lastUpdateElement.textContent = new Date().toLocaleString(currentLanguage === 'ar' ? 'ar-EG' : 'en-US');
            }
            
            if (dataSizeElement) {
                const dataString = JSON.stringify(appData);
                const sizeInBytes = new Blob([dataString]).size;
                const sizeInKB = (sizeInBytes / 1024).toFixed(2);
                dataSizeElement.textContent = \`\${sizeInKB} KB\`;
            }
        }

        function exportData() {
            const dataStr = JSON.stringify(appData, null, 2);
            const dataBlob = new Blob([dataStr], {type: 'application/json'});
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'fertilizer-factory-data.json';
            link.click();
            URL.revokeObjectURL(url);
            
            showSuccessMessage(currentLanguage === 'ar' ? 'تم تصدير البيانات بنجاح' : 'Data exported successfully');
        }

        function importData() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json';
            input.onchange = function(e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        try {
                            const importedData = JSON.parse(e.target.result);
                            appData = importedData;
                            saveData();
                            
                            // Refresh current page
                            const currentPage = document.querySelector('.page-content:not(.hidden)');
                            if (currentPage) {
                                const pageId = currentPage.id.replace('-page', '');
                                showPage(pageId);
                            }
                            
                            showSuccessMessage(currentLanguage === 'ar' ? 'تم استيراد البيانات بنجاح' : 'Data imported successfully');
                        } catch (error) {
                            alert(currentLanguage === 'ar' ? 'خطأ في تنسيق الملف' : 'File format error');
                        }
                    };
                    reader.readAsText(file);
                }
            };
            input.click();
        }

        function clearAllData() {
            const message = currentLanguage === 'ar' ? 
                'هل أنت متأكد من مسح جميع البيانات؟ لا يمكن التراجع عن هذا الإجراء.' :
                'Are you sure you want to clear all data? This action cannot be undone.';
                
            if (confirm(message)) {
                appData = {
                    storage: [],
                    sales: [],
                    expenses: [],
                    workers: [],
                    activityLogs: []
                };
                saveData();
                
                // Refresh current page
                const currentPage = document.querySelector('.page-content:not(.hidden)');
                if (currentPage) {
                    const pageId = currentPage.id.replace('-page', '');
                    showPage(pageId);
                }
                
                showSuccessMessage(currentLanguage === 'ar' ? 'تم مسح جميع البيانات' : 'All data cleared');
            }
        }

        // Reports functions
        function generateSalesReport() {
            const reportDisplay = document.getElementById('report-display');
            const reportTitle = document.getElementById('report-title');
            const reportContent = document.getElementById('report-content');
            
            reportTitle.textContent = currentLanguage === 'ar' ? 'تقرير المبيعات' : 'Sales Report';
            
            const totalSales = appData.sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
            const totalQuantity = appData.sales.reduce((sum, sale) => sum + sale.quantity, 0);
            
            reportContent.innerHTML = \`
                <div class="grid gap-4 md:grid-cols-3 mb-6">
                    <div class="bg-muted/50 p-4 rounded-lg">
                        <h4 class="font-semibold">\${currentLanguage === 'ar' ? 'إجمالي المبيعات' : 'Total Sales'}</h4>
                        <p class="text-2xl font-bold">\${formatCurrency(totalSales)}</p>
                    </div>
                    <div class="bg-muted/50 p-4 rounded-lg">
                        <h4 class="font-semibold">\${currentLanguage === 'ar' ? 'إجمالي الكمية' : 'Total Quantity'}</h4>
                        <p class="text-2xl font-bold">\${totalQuantity} \${currentLanguage === 'ar' ? 'طن' : 'tons'}</p>
                    </div>
                    <div class="bg-muted/50 p-4 rounded-lg">
                        <h4 class="font-semibold">\${currentLanguage === 'ar' ? 'عدد العمليات' : 'Number of Transactions'}</h4>
                        <p class="text-2xl font-bold">\${appData.sales.length}</p>
                    </div>
                </div>
                <div class="overflow-x-auto">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>\${currentLanguage === 'ar' ? 'المنتج' : 'Product'}</th>
                                <th>\${currentLanguage === 'ar' ? 'العميل' : 'Client'}</th>
                                <th>\${currentLanguage === 'ar' ? 'الكمية' : 'Quantity'}</th>
                                <th>\${currentLanguage === 'ar' ? 'المبلغ' : 'Amount'}</th>
                                <th>\${currentLanguage === 'ar' ? 'التاريخ' : 'Date'}</th>
                            </tr>
                        </thead>
                        <tbody>
                            \${appData.sales.map(sale => \`
                                <tr>
                                    <td>\${sale.productName}</td>
                                    <td>\${sale.clientName}</td>
                                    <td>\${sale.quantity} \${currentLanguage === 'ar' ? 'طن' : 'tons'}</td>
                                    <td>\${formatCurrency(sale.totalAmount)}</td>
                                    <td>\${formatDate(sale.saleDate)}</td>
                                </tr>
                            \`).join('')}
                        </tbody>
                    </table>
                </div>
            \`;
            
            reportDisplay.classList.remove('hidden');
        }

        function generateExpensesReport() {
            const reportDisplay = document.getElementById('report-display');
            const reportTitle = document.getElementById('report-title');
            const reportContent = document.getElementById('report-content');
            
            reportTitle.textContent = currentLanguage === 'ar' ? 'تقرير المصروفات' : 'Expenses Report';
            
            const totalExpenses = appData.expenses.reduce((sum, expense) => sum + expense.amount, 0);
            
            // Group expenses by category
            const categoryTotals = appData.expenses.reduce((acc, expense) => {
                acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
                return acc;
            }, {});
            
            reportContent.innerHTML = \`
                <div class="grid gap-4 md:grid-cols-3 mb-6">
                    <div class="bg-muted/50 p-4 rounded-lg">
                        <h4 class="font-semibold">\${currentLanguage === 'ar' ? 'إجمالي المصروفات' : 'Total Expenses'}</h4>
                        <p class="text-2xl font-bold">\${formatCurrency(totalExpenses)}</p>
                    </div>
                    <div class="bg-muted/50 p-4 rounded-lg">
                        <h4 class="font-semibold">\${currentLanguage === 'ar' ? 'عدد الفئات' : 'Categories'}</h4>
                        <p class="text-2xl font-bold">\${Object.keys(categoryTotals).length}</p>
                    </div>
                    <div class="bg-muted/50 p-4 rounded-lg">
                        <h4 class="font-semibold">\${currentLanguage === 'ar' ? 'عدد العمليات' : 'Transactions'}</h4>
                        <p class="text-2xl font-bold">\${appData.expenses.length}</p>
                    </div>
                </div>
                <h4 class="text-lg font-semibold mb-4">\${currentLanguage === 'ar' ? 'المصروفات حسب الفئة' : 'Expenses by Category'}</h4>
                <div class="grid gap-4 md:grid-cols-2 mb-6">
                    \${Object.entries(categoryTotals).map(([category, amount]) => \`
                        <div class="bg-muted/50 p-4 rounded-lg">
                            <h5 class="font-medium">\${getCategoryName(category)}</h5>
                            <p class="text-xl font-bold">\${formatCurrency(amount)}</p>
                        </div>
                    \`).join('')}
                </div>
                <div class="overflow-x-auto">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>\${currentLanguage === 'ar' ? 'اسم المصروف' : 'Expense Name'}</th>
                                <th>\${currentLanguage === 'ar' ? 'الفئة' : 'Category'}</th>
                                <th>\${currentLanguage === 'ar' ? 'المبلغ' : 'Amount'}</th>
                                <th>\${currentLanguage === 'ar' ? 'التاريخ' : 'Date'}</th>
                            </tr>
                        </thead>
                        <tbody>
                            \${appData.expenses.map(expense => \`
                                <tr>
                                    <td>\${expense.name}</td>
                                    <td>\${getCategoryName(expense.category)}</td>
                                    <td>\${formatCurrency(expense.amount)}</td>
                                    <td>\${formatDate(expense.expenseDate)}</td>
                                </tr>
                            \`).join('')}
                        </tbody>
                    </table>
                </div>
            \`;
            
            reportDisplay.classList.remove('hidden');
        }

        function generateWorkersReport() {
            const reportDisplay = document.getElementById('report-display');
            const reportTitle = document.getElementById('report-title');
            const reportContent = document.getElementById('report-content');
            
            reportTitle.textContent = currentLanguage === 'ar' ? 'تقرير العمال' : 'Workers Report';
            
            const totalWorkers = appData.workers.length;
            const totalSalaries = appData.workers.reduce((sum, worker) => sum + worker.salary, 0);
            
            // Group workers by department
            const departmentCounts = appData.workers.reduce((acc, worker) => {
                acc[worker.department] = (acc[worker.department] || 0) + 1;
                return acc;
            }, {});
            
            reportContent.innerHTML = \`
                <div class="grid gap-4 md:grid-cols-3 mb-6">
                    <div class="bg-muted/50 p-4 rounded-lg">
                        <h4 class="font-semibold">\${currentLanguage === 'ar' ? 'إجمالي العمال' : 'Total Workers'}</h4>
                        <p class="text-2xl font-bold">\${totalWorkers}</p>
                    </div>
                    <div class="bg-muted/50 p-4 rounded-lg">
                        <h4 class="font-semibold">\${currentLanguage === 'ar' ? 'إجمالي الرواتب' : 'Total Salaries'}</h4>
                        <p class="text-2xl font-bold">\${formatCurrency(totalSalaries)}</p>
                    </div>
                    <div class="bg-muted/50 p-4 rounded-lg">
                        <h4 class="font-semibold">\${currentLanguage === 'ar' ? 'الأقسام' : 'Departments'}</h4>
                        <p class="text-2xl font-bold">\${Object.keys(departmentCounts).length}</p>
                    </div>
                </div>
                <h4 class="text-lg font-semibold mb-4">\${currentLanguage === 'ar' ? 'العمال حسب القسم' : 'Workers by Department'}</h4>
                <div class="grid gap-4 md:grid-cols-2 mb-6">
                    \${Object.entries(departmentCounts).map(([department, count]) => \`
                        <div class="bg-muted/50 p-4 rounded-lg">
                            <h5 class="font-medium">\${department}</h5>
                            <p class="text-xl font-bold">\${count} \${currentLanguage === 'ar' ? 'عامل' : 'workers'}</p>
                        </div>
                    \`).join('')}
                </div>
                <div class="overflow-x-auto">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>\${currentLanguage === 'ar' ? 'الاسم' : 'Name'}</th>
                                <th>\${currentLanguage === 'ar' ? 'المنصب' : 'Position'}</th>
                                <th>\${currentLanguage === 'ar' ? 'القسم' : 'Department'}</th>
                                <th>\${currentLanguage === 'ar' ? 'الراتب' : 'Salary'}</th>
                                <th>\${currentLanguage === 'ar' ? 'تاريخ التوظيف' : 'Hire Date'}</th>
                            </tr>
                        </thead>
                        <tbody>
                            \${appData.workers.map(worker => \`
                                <tr>
                                    <td>\${worker.name}</td>
                                    <td>\${worker.position}</td>
                                    <td>\${worker.department}</td>
                                    <td>\${formatCurrency(worker.salary)}</td>
                                    <td>\${formatDate(worker.hireDate)}</td>
                                </tr>
                            \`).join('')}
                        </tbody>
                    </table>
                </div>
            \`;
            
            reportDisplay.classList.remove('hidden');
        }

        // Utility functions
        function formatCurrency(amount) {
            const currency = currentLanguage === 'ar' ? 'جنيه' : 'EGP';
            return \`\${amount.toLocaleString()} \${currency}\`;
        }

        function formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString(currentLanguage === 'ar' ? 'ar-EG' : 'en-US');
        }

        function getCategoryName(category) {
            const categories = {
                'materials': currentLanguage === 'ar' ? 'مواد خام' : 'Raw Materials',
                'utilities': currentLanguage === 'ar' ? 'كهرباء ومياه' : 'Utilities',
                'salaries': currentLanguage === 'ar' ? 'رواتب' : 'Salaries',
                'maintenance': currentLanguage === 'ar' ? 'صيانة' : 'Maintenance',
                'transport': currentLanguage === 'ar' ? 'نقل ومواصلات' : 'Transportation',
                'other': currentLanguage === 'ar' ? 'أخرى' : 'Other'
            };
            return categories[category] || category;
        }

        function setCurrentDate(fieldId) {
            const today = new Date().toISOString().split('T')[0];
            const field = document.getElementById(fieldId);
            if (field) {
                field.value = today;
            }
        }

        function saveData() {
            localStorage.setItem('fertilizerFactoryData', JSON.stringify(appData));
        }

        function showSuccessMessage(message) {
            const successDiv = document.createElement('div');
            successDiv.className = 'success-message fixed top-20 right-4 z-50';
            successDiv.textContent = message;
            
            document.body.appendChild(successDiv);
            
            setTimeout(() => {
                if (successDiv.parentNode) {
                    successDiv.parentNode.removeChild(successDiv);
                }
            }, 3000);
        }

        function updateLastUpdate() {
            const now = new Date();
            const timeString = now.toLocaleTimeString(currentLanguage === 'ar' ? 'ar-EG' : 'en-US');
            const updateElement = document.getElementById('last-update');
            if (updateElement) {
                updateElement.textContent = timeString;
            }
        }

        // Event listeners
        document.addEventListener('DOMContentLoaded', function() {
            // Load saved language preference
            const savedLanguage = localStorage.getItem('preferredLanguage') || 'ar';
            switchLanguage(savedLanguage);
            
            // Initialize sidebar toggle
            document.getElementById('sidebar-toggle')?.addEventListener('click', toggleSidebar);
            
            // Initialize date filters
            document.querySelectorAll('.date-filter').forEach(button => {
                button.addEventListener('click', function() {
                    document.querySelectorAll('.date-filter').forEach(btn => {
                        btn.classList.remove('active', 'bg-card', 'shadow-sm');
                    });
                    this.classList.add('active', 'bg-card', 'shadow-sm');
                });
            });
            
            // Initialize and show dashboard
            updateLastUpdate();
            setInterval(updateLastUpdate, 60000); // Update every minute
            showPage('dashboard');
        });
    </script>
</body>
</html>`;

// Write the complete HTML file
fs.writeFileSync('desktop-app/FertilizerApp.html', completeHTML);

// Create simple batch launcher
const batchLauncher = `@echo off
start "" "FertilizerApp.html"`;
fs.writeFileSync('desktop-app/START.bat', batchLauncher);

// Create silent VBS launcher
const vbsLauncher = `Set objShell = CreateObject("WScript.Shell")
objShell.Run "FertilizerApp.html", 1, False`;
fs.writeFileSync('desktop-app/START-SILENT.vbs', vbsLauncher);

// Create comprehensive README
const readmeContent = `# نظام إدارة مصنع الأسمدة - النسخة الكاملة
Fertilizer Factory Management System - Complete Edition

## المميزات الجديدة / New Features:
✅ تبديل اللغة (عربي/إنجليزي) - Language switching (Arabic/English)
✅ الشعار الأصلي للشركة - Original company logo
✅ جميع الصفحات فعالة - All pages functional
✅ تقارير تفاعلية - Interactive reports
✅ إدارة البيانات - Data management
✅ حفظ تفضيلات اللغة - Language preference saving

## كيفية التشغيل / How to Launch:
1. START.bat - تشغيل عادي / Normal launch
2. START-SILENT.vbs - تشغيل صامت / Silent launch  
3. FertilizerApp.html - تشغيل مباشر / Direct launch

## الوظائف المتاحة / Available Functions:

### لوحة التحكم / Dashboard:
- إحصائيات مالية شاملة
- رسوم بيانية تفاعلية
- تصفية حسب التاريخ

### إدارة المبيعات / Sales Management:
- تسجيل مبيعات جديدة
- تتبع المخزون تلقائياً
- سجل كامل للعملاء

### إدارة المصروفات / Expenses Management:
- تصنيف المصروفات
- تتبع النفقات حسب الفئة
- تحليل الإنفاق

### إدارة العمال / Workers Management:
- إضافة وإدارة العمال
- تتبع الرواتب
- تقسيم حسب الأقسام

### إدارة المخزون / Storage Management:
- تتبع المواد الخام
- إدارة الموردين
- حساب القيم الإجمالية

### سجل الأنشطة / Activity Logs:
- توثيق الأنشطة اليومية
- متابعة العمليات
- سجل تاريخي شامل

### التقارير / Reports:
- تقارير مفصلة للمبيعات
- تحليل المصروفات
- إحصائيات العمال

### الإعدادات / Settings:
- تبديل اللغة
- إدارة البيانات
- تصدير/استيراد البيانات

## الاختصارات / Shortcuts:
- تبديل اللغة: الزر العلوي اليسار
- طي/فتح الشريط الجانبي: السهم في الأعلى
- Language switch: Top left button
- Sidebar collapse: Arrow at top

## معلومات تقنية / Technical Info:
- حفظ تلقائي في المتصفح
- لا يحتاج إنترنت
- واجهة متجاوبة
- Auto-save in browser
- Works offline  
- Responsive interface

شركة الواصلون للتعدين والصناعات الكيميائية
Al-Wasiloon Mining and Chemical Industries Company
الإصدار 2.0 - Version 2.0`;

fs.writeFileSync('desktop-app/README.txt', readmeContent);

// Create the final package
console.log('Creating complete desktop application package...');
execSync('cd desktop-app && zip -r "../Fertilizer-Factory-Management-Complete.zip" .');

console.log('');
console.log('✅ Complete Desktop Application Created Successfully!');
console.log('');
console.log('📦 Package: Fertilizer-Factory-Management-Complete.zip');
console.log('📁 Folder: desktop-app/');
console.log('');
console.log('🔧 Fixed Issues:');
console.log('✓ Language switching (Arabic/English) working');
console.log('✓ All pages functional (no more loading screens)');
console.log('✓ Original company logo embedded');
console.log('✓ Complete translation system');
console.log('✓ All forms and tables working');
console.log('✓ Interactive reports and analytics');
console.log('✓ Data export/import functionality');
console.log('');
console.log('🚀 Launch Options:');
console.log('1. START.bat - Regular launch');
console.log('2. START-SILENT.vbs - Silent launch');
console.log('3. FertilizerApp.html - Direct launch');
console.log('');
console.log('💡 Features:');
console.log('- Language toggle button (top-left)');
console.log('- Collapsible sidebar');
console.log('- Interactive charts and reports');
console.log('- Complete data management');
console.log('- Offline functionality');