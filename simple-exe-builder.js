#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs';

console.log('Creating Windows Desktop Application...');

// Clean and create directory
if (fs.existsSync('desktop-app')) {
  execSync('rm -rf desktop-app');
}
fs.mkdirSync('desktop-app', { recursive: true });

// Create the complete standalone application
const standaloneApp = `const { app, BrowserWindow } = require('electron');
const express = require('express');
const path = require('path');
const http = require('http');

let mainWindow;
let server;

// In-memory data with Arabic content
const appData = {
  storage: [
    { id: 1, itemName: "نترات الأمونيوم", quantity: 150, totalQuantity: 150, unitPrice: 500, supplier: "شركة الكيماويات" },
    { id: 2, itemName: "صخر الفوسفات", quantity: 200, totalQuantity: 200, unitPrice: 300, supplier: "مناجم الفوسفات" },
    { id: 3, itemName: "كلوريد البوتاسيوم", quantity: 100, totalQuantity: 100, unitPrice: 400, supplier: "البوتاس العربية" }
  ],
  sales: [
    { id: 1, productName: "نترات الأمونيوم", quantity: 50, totalAmount: 25000, saleDate: "2024-12-01", clientName: "مزارع الوادي الأخضر", clientContact: "+20 100 123 4567" },
    { id: 2, productName: "صخر الفوسفات", quantity: 30, totalAmount: 9000, saleDate: "2024-12-02", clientName: "شركة الأسمدة المتطورة", clientContact: "+20 101 234 5678" }
  ],
  expenses: [
    { id: 1, name: "مواد خام", amount: 15000, category: "materials", expenseDate: "2024-12-01" },
    { id: 2, name: "كهرباء ومياه", amount: 5000, category: "utilities", expenseDate: "2024-12-01" },
    { id: 3, name: "رواتب العمال", amount: 20000, category: "salaries", expenseDate: "2024-12-01" }
  ],
  workers: [
    { id: 1, name: "أحمد محمد علي", position: "عامل إنتاج", department: "الإنتاج", salary: 3000, hireDate: "2024-01-01" },
    { id: 2, name: "فاطمة أحمد", position: "مشرفة جودة", department: "الجودة", salary: 4000, hireDate: "2024-02-15" },
    { id: 3, name: "محمد حسن", position: "فني صيانة", department: "الصيانة", salary: 3500, hireDate: "2024-03-01" }
  ]
};

function createServer() {
  const expressApp = express();
  expressApp.use(express.json());
  expressApp.use(express.static(path.join(__dirname, 'public')));

  // API Routes
  expressApp.get('/api/dashboard', (req, res) => {
    const totalIncome = appData.sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
    const totalExpenses = appData.expenses.reduce((sum, expense) => sum + expense.amount, 0);
    res.json({ totalIncome, totalExpenses, profit: totalIncome - totalExpenses });
  });

  expressApp.get('/api/storage', (req, res) => res.json(appData.storage));
  expressApp.post('/api/storage', (req, res) => {
    const newItem = { id: appData.storage.length + 1, ...req.body, totalQuantity: req.body.quantity };
    appData.storage.push(newItem);
    res.json(newItem);
  });

  expressApp.get('/api/sales', (req, res) => res.json(appData.sales));
  expressApp.post('/api/sales', (req, res) => {
    const newSale = { id: appData.sales.length + 1, ...req.body };
    appData.sales.push(newSale);
    const item = appData.storage.find(i => i.itemName === newSale.productName);
    if (item && item.quantity >= newSale.quantity) {
      item.quantity -= newSale.quantity;
    }
    res.json(newSale);
  });

  expressApp.get('/api/expenses', (req, res) => res.json(appData.expenses));
  expressApp.post('/api/expenses', (req, res) => {
    const newExpense = { id: appData.expenses.length + 1, ...req.body };
    appData.expenses.push(newExpense);
    res.json(newExpense);
  });

  expressApp.get('/api/workers', (req, res) => res.json(appData.workers));
  expressApp.post('/api/workers', (req, res) => {
    const newWorker = { id: appData.workers.length + 1, ...req.body };
    appData.workers.push(newWorker);
    res.json(newWorker);
  });

  server = http.createServer(expressApp);
  server.listen(3000, '127.0.0.1', () => {
    console.log('Server running on port 3000');
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    },
    title: 'نظام إدارة مصنع الأسمدة - شركة الواصلون للتعدين والصناعات الكيميائية',
    autoHideMenuBar: true,
    show: false
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    mainWindow.maximize();
  });

  mainWindow.loadURL('http://127.0.0.1:3000');

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
  app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});`;

// Write the main application file
fs.writeFileSync('desktop-app/main.js', standaloneApp);

// Create package.json
const packageJson = {
  "name": "fertilizer-factory-desktop",
  "version": "1.0.0",
  "description": "نظام إدارة مصنع الأسمدة",
  "main": "main.js",
  "scripts": {
    "start": "electron .",
    "build": "electron-packager . fertilizer-factory --platform=win32 --arch=x64 --out=dist --overwrite"
  },
  "author": "Al-Wasiloon for Mining and Chemical Industries",
  "dependencies": {
    "electron": "^28.0.0",
    "express": "^4.21.2"
  },
  "devDependencies": {
    "electron-packager": "^17.1.1"
  }
};

fs.writeFileSync('desktop-app/package.json', JSON.stringify(packageJson, null, 2));

// Copy the UI files
execSync('cp -r renderer desktop-app/public');

// Install minimal dependencies and build
console.log('Installing dependencies...');
execSync('cd desktop-app && npm install --production', { stdio: 'inherit' });

console.log('Installing electron-packager...');
execSync('cd desktop-app && npm install electron-packager --save-dev', { stdio: 'inherit' });

console.log('Building Windows executable...');
execSync('cd desktop-app && npx electron-packager . "نظام إدارة مصنع الأسمدة" --platform=win32 --arch=x64 --out=dist --overwrite --app-version=1.0.0', { stdio: 'inherit' });

// Create startup batch file
const batchFile = `@echo off
title نظام إدارة مصنع الأسمدة
echo ================================================
echo       نظام إدارة مصنع الأسمدة
echo    شركة الواصلون للتعدين والصناعات الكيميائية
echo ================================================
echo.
echo جارٍ تشغيل النظام...
echo Starting the application...
echo.
cd /d "%~dp0"
"نظام إدارة مصنع الأسمدة-win32-x64\\نظام إدارة مصنع الأسمدة.exe"
pause`;

if (fs.existsSync('desktop-app/dist')) {
  fs.writeFileSync('desktop-app/dist/تشغيل-النظام.bat', batchFile);
}

console.log('');
console.log('✅ Windows Desktop Application created successfully!');
console.log('');
console.log('📁 Application location: desktop-app/dist/');
console.log('');
console.log('🚀 To run the application:');
console.log('   1. Navigate to desktop-app/dist/');
console.log('   2. Double-click "تشغيل-النظام.bat"');
console.log('   OR');
console.log('   3. Run the .exe file directly');
console.log('');
console.log('📦 The entire dist/ folder can be distributed to users');
console.log('💡 No installation required - just copy and run!');