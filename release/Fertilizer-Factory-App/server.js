import express from 'express';
import { createServer } from 'http';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = createServer(app);

// In-memory data storage
let storage = [
  { id: 1, itemName: "Ammonium Nitrate", quantity: 150, totalQuantity: 150, unitPrice: 500, category: "fertilizer", supplier: "Chemical Corp", createdAt: new Date() },
  { id: 2, itemName: "Phosphate Rock", quantity: 200, totalQuantity: 200, unitPrice: 300, category: "fertilizer", supplier: "Rock Industries", createdAt: new Date() },
  { id: 3, itemName: "Potassium Chloride", quantity: 100, totalQuantity: 100, unitPrice: 400, category: "fertilizer", supplier: "Potash Corp", createdAt: new Date() }
];

let sales = [
  { id: 1, productName: "Ammonium Nitrate", quantity: 50, totalAmount: 25000, saleDate: new Date("2024-12-01"), clientName: "مزارع الوادي الأخضر", clientContact: "+20 100 123 4567", createdAt: new Date() },
  { id: 2, productName: "Phosphate Rock", quantity: 30, totalAmount: 9000, saleDate: new Date("2024-12-02"), clientName: "شركة الأسمدة المتطورة", clientContact: "+20 101 234 5678", createdAt: new Date() }
];

let expenses = [
  { id: 1, name: "Raw Materials", amount: 15000, category: "materials", expenseDate: new Date("2024-12-01"), createdAt: new Date() },
  { id: 2, name: "Electricity", amount: 5000, category: "utilities", expenseDate: new Date("2024-12-01"), createdAt: new Date() },
  { id: 3, name: "Worker Salaries", amount: 20000, category: "salaries", expenseDate: new Date("2024-12-01"), createdAt: new Date() }
];

let workers = [
  { id: 1, name: "أحمد محمد علي", position: "عامل إنتاج", department: "الإنتاج", salary: 3000, hireDate: new Date("2024-01-01"), createdAt: new Date() },
  { id: 2, name: "فاطمة أحمد", position: "مشرفة جودة", department: "الجودة", salary: 4000, hireDate: new Date("2024-02-15"), createdAt: new Date() },
  { id: 3, name: "محمد حسن", position: "فني صيانة", department: "الصيانة", salary: 3500, hireDate: new Date("2024-03-01"), createdAt: new Date() }
];

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (this will serve the built React app)
app.use(express.static(join(__dirname, 'public')));

// API Routes
app.get('/api/dashboard', (req, res) => {
  const totalIncome = sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const profit = totalIncome - totalExpenses;
  
  res.json({
    totalIncome,
    totalExpenses,
    profit,
    topSellingProducts: sales.slice(0, 5).map(sale => ({
      productId: sale.id,
      productName: sale.productName,
      totalSold: sale.quantity,
      totalRevenue: sale.totalAmount
    })),
    topExpenses: expenses.slice(0, 5).map(expense => ({
      expenseName: expense.name,
      amount: expense.amount,
      category: expense.category
    })),
    recentTransactions: [
      ...sales.map(sale => ({ id: sale.id, type: 'sale', amount: sale.totalAmount, description: `Sale: ${sale.productName}`, date: sale.saleDate })),
      ...expenses.map(expense => ({ id: expense.id, type: 'expense', amount: expense.amount, description: `Expense: ${expense.name}`, date: expense.expenseDate }))
    ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10)
  });
});

app.get('/api/storage', (req, res) => res.json(storage));
app.post('/api/storage', (req, res) => {
  const newItem = { id: storage.length + 1, ...req.body, totalQuantity: req.body.quantity, createdAt: new Date() };
  storage.push(newItem);
  res.json(newItem);
});

app.get('/api/sales', (req, res) => res.json(sales));
app.post('/api/sales', (req, res) => {
  const newSale = { id: sales.length + 1, ...req.body, saleDate: new Date(req.body.saleDate), createdAt: new Date() };
  sales.push(newSale);
  // Update storage
  const storageItem = storage.find(item => item.itemName === newSale.productName);
  if (storageItem) storageItem.quantity -= newSale.quantity;
  res.json(newSale);
});

app.get('/api/expenses', (req, res) => res.json(expenses));
app.post('/api/expenses', (req, res) => {
  const newExpense = { id: expenses.length + 1, ...req.body, expenseDate: new Date(req.body.expenseDate), createdAt: new Date() };
  expenses.push(newExpense);
  res.json(newExpense);
});

app.get('/api/workers', (req, res) => res.json(workers));
app.post('/api/workers', (req, res) => {
  const newWorker = { id: workers.length + 1, ...req.body, hireDate: new Date(req.body.hireDate), createdAt: new Date() };
  workers.push(newWorker);
  res.json(newWorker);
});

// Handle all other routes by serving the React app
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(join(__dirname, 'public', 'index.html'));
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, '0.0.0.0', () => {
  console.log('🚀 تم تشغيل نظام إدارة مصنع الأسمدة بنجاح!');
  console.log('🚀 Fertilizer Factory Management System Started Successfully!');
  console.log('');
  console.log(`🌐 افتح المتصفح على: http://localhost:${PORT}`);
  console.log(`🌐 Open browser at: http://localhost:${PORT}`);
  console.log('');
  console.log('اضغط Ctrl+C لإيقاف البرنامج | Press Ctrl+C to stop');
});

process.on('SIGINT', () => {
  console.log('\n🔒 تم إغلاق البرنامج | Application closed');
  process.exit(0);
});