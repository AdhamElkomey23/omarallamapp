const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const express = require('express');
const http = require('http');

let mainWindow;
let server;
let serverPort = 3000;

// In-memory data storage
let appData = {
  storage: [
    { id: 1, itemName: "نترات الأمونيوم", quantity: 150, totalQuantity: 150, unitPrice: 500, category: "fertilizer", supplier: "شركة الكيماويات", createdAt: new Date() },
    { id: 2, itemName: "صخر الفوسفات", quantity: 200, totalQuantity: 200, unitPrice: 300, category: "fertilizer", supplier: "مناجم الفوسفات", createdAt: new Date() },
    { id: 3, itemName: "كلوريد البوتاسيوم", quantity: 100, totalQuantity: 100, unitPrice: 400, category: "fertilizer", supplier: "البوتاس العربية", createdAt: new Date() }
  ],
  sales: [
    { id: 1, productName: "نترات الأمونيوم", quantity: 50, totalAmount: 25000, saleDate: new Date("2024-12-01"), clientName: "مزارع الوادي الأخضر", clientContact: "+20 100 123 4567", createdAt: new Date() },
    { id: 2, productName: "صخر الفوسفات", quantity: 30, totalAmount: 9000, saleDate: new Date("2024-12-02"), clientName: "شركة الأسمدة المتطورة", clientContact: "+20 101 234 5678", createdAt: new Date() }
  ],
  expenses: [
    { id: 1, name: "مواد خام", amount: 15000, category: "materials", expenseDate: new Date("2024-12-01"), createdAt: new Date() },
    { id: 2, name: "كهرباء ومياه", amount: 5000, category: "utilities", expenseDate: new Date("2024-12-01"), createdAt: new Date() },
    { id: 3, name: "رواتب العمال", amount: 20000, category: "salaries", expenseDate: new Date("2024-12-01"), createdAt: new Date() }
  ],
  workers: [
    { id: 1, name: "أحمد محمد علي", position: "عامل إنتاج", department: "الإنتاج", salary: 3000, hireDate: new Date("2024-01-01"), createdAt: new Date() },
    { id: 2, name: "فاطمة أحمد", position: "مشرفة جودة", department: "الجودة", salary: 4000, hireDate: new Date("2024-02-15"), createdAt: new Date() },
    { id: 3, name: "محمد حسن", position: "فني صيانة", department: "الصيانة", salary: 3500, hireDate: new Date("2024-03-01"), createdAt: new Date() }
  ]
};

function createServer() {
  const expressApp = express();
  expressApp.use(express.json());
  expressApp.use(express.static(path.join(__dirname, 'renderer')));

  // API Routes
  expressApp.get('/api/dashboard', (req, res) => {
    const totalIncome = appData.sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
    const totalExpenses = appData.expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const profit = totalIncome - totalExpenses;
    
    res.json({
      totalIncome,
      totalExpenses,
      profit,
      topSellingProducts: appData.sales.slice(0, 5).map(sale => ({
        productId: sale.id,
        productName: sale.productName,
        totalSold: sale.quantity,
        totalRevenue: sale.totalAmount
      })),
      topExpenses: appData.expenses.slice(0, 5).map(expense => ({
        expenseName: expense.name,
        amount: expense.amount,
        category: expense.category
      })),
      recentTransactions: [
        ...appData.sales.map(sale => ({ id: sale.id, type: 'sale', amount: sale.totalAmount, description: `Sale: ${sale.productName}`, date: sale.saleDate })),
        ...appData.expenses.map(expense => ({ id: expense.id, type: 'expense', amount: expense.amount, description: `Expense: ${expense.name}`, date: expense.expenseDate }))
      ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10)
    });
  });

  expressApp.get('/api/storage', (req, res) => res.json(appData.storage));
  expressApp.post('/api/storage', (req, res) => {
    const newItem = { 
      id: appData.storage.length + 1, 
      ...req.body, 
      totalQuantity: req.body.quantity, 
      createdAt: new Date() 
    };
    appData.storage.push(newItem);
    res.json(newItem);
  });

  expressApp.get('/api/sales', (req, res) => res.json(appData.sales));
  expressApp.post('/api/sales', (req, res) => {
    const newSale = { 
      id: appData.sales.length + 1, 
      ...req.body, 
      saleDate: new Date(req.body.saleDate), 
      createdAt: new Date() 
    };
    appData.sales.push(newSale);
    
    // Update storage
    const storageItem = appData.storage.find(item => item.itemName === newSale.productName);
    if (storageItem && storageItem.quantity >= newSale.quantity) {
      storageItem.quantity -= newSale.quantity;
    }
    
    res.json(newSale);
  });

  expressApp.get('/api/expenses', (req, res) => res.json(appData.expenses));
  expressApp.post('/api/expenses', (req, res) => {
    const newExpense = { 
      id: appData.expenses.length + 1, 
      ...req.body, 
      expenseDate: new Date(req.body.expenseDate), 
      createdAt: new Date() 
    };
    appData.expenses.push(newExpense);
    res.json(newExpense);
  });

  expressApp.get('/api/workers', (req, res) => res.json(appData.workers));
  expressApp.post('/api/workers', (req, res) => {
    const newWorker = { 
      id: appData.workers.length + 1, 
      ...req.body, 
      hireDate: new Date(req.body.hireDate), 
      createdAt: new Date() 
    };
    appData.workers.push(newWorker);
    res.json(newWorker);
  });

  server = http.createServer(expressApp);
  server.listen(serverPort, 'localhost', () => {
    console.log(`Server running on port ${serverPort}`);
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, 'assets', 'icon.ico'),
    title: 'نظام إدارة مصنع الأسمدة - شركة الواصلون',
    show: false,
    autoHideMenuBar: true
  });

  // Show window when ready
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Load the app
  mainWindow.loadURL(`http://localhost:${serverPort}`);

  // Handle window closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createServer();
  setTimeout(() => {
    createWindow();
  }, 1000);
});

app.on('window-all-closed', () => {
  if (server) {
    server.close();
  }
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// IPC handlers for data operations
ipcMain.handle('get-app-data', () => appData);
ipcMain.handle('update-app-data', (event, newData) => {
  appData = { ...appData, ...newData };
  return appData;
});