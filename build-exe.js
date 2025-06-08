#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🏗️  Building Windows Executable for Fertilizer Factory Management App...');

// Create electron app directory
const electronDir = 'electron-app';
if (fs.existsSync(electronDir)) {
  execSync(`rm -rf ${electronDir}`);
}
fs.mkdirSync(electronDir, { recursive: true });

// Copy electron files
console.log('📦 Setting up Electron application...');
execSync(`cp electron-main.js ${electronDir}/main.js`);
execSync(`cp preload.js ${electronDir}/`);
execSync(`cp electron-package.json ${electronDir}/package.json`);
execSync(`cp -r renderer ${electronDir}/`);

// Create simple icon (placeholder)
const iconSvg = `<svg width="256" height="256" xmlns="http://www.w3.org/2000/svg">
  <rect width="256" height="256" fill="#4299e1"/>
  <circle cx="128" cy="128" r="80" fill="white"/>
  <text x="128" y="140" text-anchor="middle" font-size="24" fill="#4299e1" font-family="Arial">مصنع</text>
</svg>`;

fs.mkdirSync(`${electronDir}/assets`, { recursive: true });
fs.writeFileSync(`${electronDir}/assets/icon.svg`, iconSvg);

// Install electron dependencies
console.log('📥 Installing Electron dependencies...');
execSync(`cd ${electronDir} && npm install`, { stdio: 'inherit' });

// Build the executable
console.log('🔨 Building Windows executable...');
try {
  execSync(`cd ${electronDir} && npm run build-win`, { stdio: 'inherit' });
  console.log('✅ Executable built successfully!');
  
  // Move the executable to main directory
  if (fs.existsSync(`${electronDir}/dist`)) {
    execSync(`cp -r ${electronDir}/dist ./fertilizer-factory-exe`);
    console.log('📦 Executable package created in: fertilizer-factory-exe/');
  }
} catch (error) {
  console.log('⚠️  Building with alternative method...');
  
  // Alternative: Create portable executable using pkg
  const standaloneScript = `
const { app, BrowserWindow } = require('electron');
const express = require('express');
const path = require('path');
const http = require('http');

let mainWindow;
let server;

const appData = {
  storage: [
    { id: 1, itemName: "نترات الأمونيوم", quantity: 150, unitPrice: 500, supplier: "شركة الكيماويات" },
    { id: 2, itemName: "صخر الفوسفات", quantity: 200, unitPrice: 300, supplier: "مناجم الفوسفات" },
    { id: 3, itemName: "كلوريد البوتاسيوم", quantity: 100, unitPrice: 400, supplier: "البوتاس العربية" }
  ],
  sales: [
    { id: 1, productName: "نترات الأمونيوم", quantity: 50, totalAmount: 25000, clientName: "مزارع الوادي الأخضر", saleDate: "2024-12-01" }
  ],
  expenses: [
    { id: 1, name: "مواد خام", amount: 15000, category: "materials", expenseDate: "2024-12-01" },
    { id: 2, name: "كهرباء ومياه", amount: 5000, category: "utilities", expenseDate: "2024-12-01" }
  ],
  workers: [
    { id: 1, name: "أحمد محمد علي", position: "عامل إنتاج", department: "الإنتاج", salary: 3000, hireDate: "2024-01-01" }
  ]
};

const expressApp = express();
expressApp.use(express.json());
expressApp.use(express.static(path.join(__dirname, 'public')));

// API routes with embedded data
expressApp.get('/api/dashboard', (req, res) => {
  const totalIncome = appData.sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
  const totalExpenses = appData.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  res.json({ totalIncome, totalExpenses, profit: totalIncome - totalExpenses });
});

expressApp.get('/api/storage', (req, res) => res.json(appData.storage));
expressApp.post('/api/storage', (req, res) => {
  const newItem = { id: appData.storage.length + 1, ...req.body };
  appData.storage.push(newItem);
  res.json(newItem);
});

expressApp.get('/api/sales', (req, res) => res.json(appData.sales));
expressApp.post('/api/sales', (req, res) => {
  const newSale = { id: appData.sales.length + 1, ...req.body };
  appData.sales.push(newSale);
  const item = appData.storage.find(i => i.itemName === newSale.productName);
  if (item) item.quantity -= newSale.quantity;
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

function createServer() {
  server = http.createServer(expressApp);
  server.listen(3000, '127.0.0.1');
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: { nodeIntegration: true, contextIsolation: false },
    title: 'نظام إدارة مصنع الأسمدة - شركة الواصلون',
    autoHideMenuBar: true
  });
  
  mainWindow.loadURL('http://127.0.0.1:3000');
}

app.whenReady().then(() => {
  createServer();
  setTimeout(createWindow, 1000);
});

app.on('window-all-closed', () => {
  if (server) server.close();
  app.quit();
});
`;

  // Create standalone app
  fs.mkdirSync('standalone-app', { recursive: true });
  fs.writeFileSync('standalone-app/app.js', standaloneScript);
  
  // Copy HTML and assets
  execSync('cp -r renderer standalone-app/public');
  
  const standalonePkg = {
    name: "fertilizer-factory-app",
    version: "1.0.0",
    main: "app.js",
    dependencies: { "electron": "^28.0.0", "express": "^4.21.2" }
  };
  
  fs.writeFileSync('standalone-app/package.json', JSON.stringify(standalonePkg, null, 2));
  
  console.log('📦 Standalone application created in: standalone-app/');
}

console.log('');
console.log('🎉 Build completed!');
console.log('');
console.log('📁 Check these directories:');
console.log('   - fertilizer-factory-exe/ (Windows installer)');
console.log('   - standalone-app/ (Portable version)');
console.log('');
console.log('🚀 To run the portable version:');
console.log('   cd standalone-app && npm install && npm start');