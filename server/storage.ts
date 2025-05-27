import { 
  products,
  sales,
  expenses,
  activityLogs,
  users,
  workers,
  storageItems,
  type Product, 
  type InsertProduct,
  type Sale,
  type InsertSale,
  type Expense,
  type InsertExpense,
  type ActivityLog,
  type InsertActivityLog,
  type User,
  type InsertUser,
  type Worker,
  type InsertWorker,
  type StorageItem,
  type InsertStorageItem,
  type DateRangeFilter
} from "@shared/schema";

// Storage interface with CRUD methods for our Fertilizer Factory Finance Management app
export interface IStorage {
  // Products
  getAllProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<boolean>;
  
  // Sales
  getAllSales(): Promise<Sale[]>;
  getSalesByDateRange(startDate?: Date, endDate?: Date): Promise<Sale[]>;
  getSalesByProductId(productId: number): Promise<Sale[]>;
  createSale(sale: InsertSale): Promise<Sale>;
  deleteSale(id: number): Promise<boolean>;
  
  // Expenses
  getAllExpenses(): Promise<Expense[]>;
  getExpensesByDateRange(startDate?: Date, endDate?: Date): Promise<Expense[]>;
  getExpensesByCategory(category: string): Promise<Expense[]>;
  createExpense(expense: InsertExpense): Promise<Expense>;
  deleteExpense(id: number): Promise<boolean>;
  
  // Activity Logs
  getAllActivityLogs(): Promise<ActivityLog[]>;
  getActivityLogsByDateRange(startDate?: Date, endDate?: Date): Promise<ActivityLog[]>;
  createActivityLog(log: InsertActivityLog): Promise<ActivityLog>;
  deleteActivityLog(id: number): Promise<boolean>;
  
  // Dashboard Data
  getDashboardData(filter?: DateRangeFilter): Promise<{
    totalIncome: number;
    totalExpenses: number;
    profit: number;
    topSellingProducts: Array<{productId: number, productName: string, totalSold: number, totalRevenue: number}>;
    topExpenses: Array<{expenseName: string, amount: number, category: string}>;
    recentTransactions: Array<{id: number, type: 'sale' | 'expense', amount: number, description: string, date: Date}>;
  }>;
  
  // Workers
  getAllWorkers(): Promise<Worker[]>;
  getWorker(id: number): Promise<Worker | undefined>;
  createWorker(worker: InsertWorker): Promise<Worker>;
  updateWorker(id: number, worker: Partial<InsertWorker>): Promise<Worker | undefined>;
  deleteWorker(id: number): Promise<boolean>;
  getWorkersByDepartment(department: string): Promise<Worker[]>;
  
  // Storage Items
  getAllStorageItems(): Promise<StorageItem[]>;
  getStorageItem(id: number): Promise<StorageItem | undefined>;
  createStorageItem(item: InsertStorageItem): Promise<StorageItem>;
  updateStorageItem(id: number, item: Partial<InsertStorageItem>): Promise<StorageItem | undefined>;
  deleteStorageItem(id: number): Promise<boolean>;
  
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private sales: Map<number, Sale>;
  private expenses: Map<number, Expense>;
  private activityLogs: Map<number, ActivityLog>;
  private workers: Map<number, Worker>;
  private storageItems: Map<number, StorageItem>;
  
  private userCounter: number;
  private productCounter: number;
  private saleCounter: number;
  private expenseCounter: number;
  private activityLogCounter: number;
  private workerCounter: number;
  private storageItemCounter: number;

  constructor() {
    // Initialize maps
    this.users = new Map();
    this.products = new Map();
    this.sales = new Map();
    this.expenses = new Map();
    this.activityLogs = new Map();
    this.workers = new Map();
    this.storageItems = new Map();
    
    // Initialize counters
    this.userCounter = 1;
    this.productCounter = 1;
    this.saleCounter = 1;
    this.expenseCounter = 1;
    this.activityLogCounter = 1;
    this.workerCounter = 1;
    this.storageItemCounter = 1;
    
    // Load seed data
    this.loadSeedData();
  }

  private loadSeedData() {
    // Sample user
    const user: User = {
      id: this.userCounter++,
      username: 'admin',
      password: 'admin123' // In a real app, this would be hashed
    };
    this.users.set(user.id, user);
    
    // Sample products
    const sampleProducts = [
      { name: 'NPK Fertilizer', unitPrice: 2500, stockQuantity: 150 },
      { name: 'Urea', unitPrice: 1800, stockQuantity: 200 },
      { name: 'Organic Compost', unitPrice: 1200, stockQuantity: 100 },
      { name: 'Phosphate', unitPrice: 2200, stockQuantity: 80 },
      { name: 'Potassium Nitrate', unitPrice: 3000, stockQuantity: 60 }
    ];
    
    sampleProducts.forEach(prod => {
      const product: Product = {
        id: this.productCounter++,
        name: prod.name,
        unitPrice: prod.unitPrice,
        stockQuantity: prod.stockQuantity || 0,
        createdAt: new Date()
      };
      this.products.set(product.id, product);
    });
    
    // Sample sales (last 30 days)
    const today = new Date();
    const sampleSales = [
      { productId: 1, quantity: 20, totalAmount: 50000, saleDate: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000) },
      { productId: 2, quantity: 15, totalAmount: 27000, saleDate: new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000) },
      { productId: 3, quantity: 10, totalAmount: 12000, saleDate: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000) },
      { productId: 1, quantity: 25, totalAmount: 62500, saleDate: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000) },
      { productId: 4, quantity: 8, totalAmount: 17600, saleDate: new Date(today.getTime() - 15 * 24 * 60 * 60 * 1000) }
    ];
    
    const clients = [
      { name: "Green Valley Farms", contact: "+20 100 123 4567" },
      { name: "Nile Delta Agriculture Co.", contact: "+20 101 234 5678" },
      { name: "Cairo Agricultural Supplies", contact: "+20 102 345 6789" },
      { name: "Alexandria Fertilizer Trading", contact: "+20 103 456 7890" },
      { name: "Upper Egypt Farm Supply", contact: "+20 104 567 8901" }
    ];

    sampleSales.forEach((sale, index) => {
      const client = clients[index % clients.length];
      const newSale: Sale = {
        id: this.saleCounter++,
        productId: sale.productId,
        quantity: sale.quantity,
        totalAmount: sale.totalAmount,
        saleDate: sale.saleDate,
        clientName: client.name,
        clientContact: client.contact,
        createdAt: new Date()
      };
      this.sales.set(newSale.id, newSale);
      
      // Update product stock
      const product = this.products.get(sale.productId);
      if (product) {
        this.products.set(product.id, {
          ...product,
          stockQuantity: product.stockQuantity - sale.quantity
        });
      }
    });
    
    // Sample expenses
    const sampleExpenses = [
      { name: 'Electricity Bill', amount: 15000, category: 'Utilities', expenseDate: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000) },
      { name: 'Worker Salaries', amount: 50000, category: 'Salaries', expenseDate: new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000) },
      { name: 'Equipment Repair', amount: 8000, category: 'Maintenance', expenseDate: new Date(today.getTime() - 8 * 24 * 60 * 60 * 1000) },
      { name: 'Raw Materials', amount: 35000, category: 'RawMaterials', expenseDate: new Date(today.getTime() - 12 * 24 * 60 * 60 * 1000) },
      { name: 'Transportation', amount: 12000, category: 'Transportation', expenseDate: new Date(today.getTime() - 18 * 24 * 60 * 60 * 1000) }
    ];
    
    sampleExpenses.forEach(expense => {
      const newExpense: Expense = {
        id: this.expenseCounter++,
        name: expense.name,
        amount: expense.amount,
        category: expense.category,
        expenseDate: expense.expenseDate,
        createdAt: new Date()
      };
      this.expenses.set(newExpense.id, newExpense);
    });
    
    // Sample activity logs
    const sampleLogs = [
      { title: 'Equipment Maintenance', description: 'Mixer machine repaired', logDate: new Date(today.getTime() - 4 * 24 * 60 * 60 * 1000) },
      { title: 'Inventory Check', description: 'Monthly inventory verification completed', logDate: new Date(today.getTime() - 9 * 24 * 60 * 60 * 1000) },
      { title: 'Process Improvement', description: 'Implemented new mixing procedure for higher efficiency', logDate: new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000) }
    ];
    
    sampleLogs.forEach(log => {
      const newLog: ActivityLog = {
        id: this.activityLogCounter++,
        title: log.title,
        description: log.description,
        logDate: log.logDate,
        createdAt: new Date()
      };
      this.activityLogs.set(newLog.id, newLog);
    });

    // Sample storage items with dealer information
    const dealers = [
      { name: "Global Chemical Industries", contact: "+20 120 555 0001" },
      { name: "Nile Valley Chemicals Ltd.", contact: "+20 122 555 0002" },
      { name: "Egyptian Raw Materials Co.", contact: "+20 121 555 0003" },
      { name: "Mediterranean Chemical Supply", contact: "+20 123 555 0004" },
      { name: "Cairo Chemical Trading", contact: "+20 124 555 0005" },
      { name: "Delta Mining & Chemicals", contact: "+20 125 555 0006" },
      { name: "Suez Industrial Supplies", contact: "+20 126 555 0007" }
    ];

    const sampleStorageItems = [
      { itemName: 'Ammonium Nitrate', quantityInTons: 150, purchasePricePerTon: 350 },
      { itemName: 'Potassium Chloride', quantityInTons: 120, purchasePricePerTon: 420 },
      { itemName: 'Phosphoric Acid', quantityInTons: 80, purchasePricePerTon: 650 },
      { itemName: 'Urea', quantityInTons: 200, purchasePricePerTon: 300 },
      { itemName: 'Sulfuric Acid', quantityInTons: 95, purchasePricePerTon: 280 },
      { itemName: 'Limestone', quantityInTons: 300, purchasePricePerTon: 45 },
      { itemName: 'Potassium Sulfate', quantityInTons: 60, purchasePricePerTon: 580 }
    ];
    
    sampleStorageItems.forEach((item, index) => {
      const dealer = dealers[index % dealers.length];
      const newItem: StorageItem = {
        id: this.storageItemCounter++,
        itemName: item.itemName,
        quantityInTons: item.quantityInTons,
        purchasePricePerTon: item.purchasePricePerTon,
        dealerName: dealer.name,
        dealerContact: dealer.contact,
        createdAt: new Date()
      };
      this.storageItems.set(newItem.id, newItem);
    });
  }

  // Product Methods
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.productCounter++;
    const product: Product = { 
      ...insertProduct, 
      id,
      createdAt: new Date()
    };
    this.products.set(id, product);
    return product;
  }
  
  async updateProduct(id: number, productUpdate: Partial<InsertProduct>): Promise<Product | undefined> {
    const existingProduct = this.products.get(id);
    if (!existingProduct) return undefined;
    
    const updatedProduct: Product = {
      ...existingProduct,
      ...productUpdate
    };
    
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }
  
  async deleteProduct(id: number): Promise<boolean> {
    return this.products.delete(id);
  }

  // Sale Methods
  async getAllSales(): Promise<Sale[]> {
    return Array.from(this.sales.values());
  }
  
  async getSalesByDateRange(startDate?: Date, endDate?: Date): Promise<Sale[]> {
    let filteredSales = Array.from(this.sales.values());
    
    if (startDate) {
      filteredSales = filteredSales.filter(sale => {
        const saleDate = sale.saleDate instanceof Date ? sale.saleDate : new Date(sale.saleDate);
        return saleDate >= startDate;
      });
    }
    
    if (endDate) {
      filteredSales = filteredSales.filter(sale => {
        const saleDate = sale.saleDate instanceof Date ? sale.saleDate : new Date(sale.saleDate);
        return saleDate <= endDate;
      });
    }
    
    return filteredSales.sort((a, b) => {
      const dateA = a.saleDate instanceof Date ? a.saleDate : new Date(a.saleDate);
      const dateB = b.saleDate instanceof Date ? b.saleDate : new Date(b.saleDate);
      return dateB.getTime() - dateA.getTime();
    });
  }
  
  async getSalesByProductId(productId: number): Promise<Sale[]> {
    return Array.from(this.sales.values())
      .filter(sale => sale.productId === productId)
      .sort((a, b) => {
        const dateA = a.saleDate instanceof Date ? a.saleDate : new Date(a.saleDate);
        const dateB = b.saleDate instanceof Date ? b.saleDate : new Date(b.saleDate);
        return dateB.getTime() - dateA.getTime();
      });
  }
  
  async createSale(insertSale: InsertSale): Promise<Sale> {
    const id = this.saleCounter++;
    
    // Ensure saleDate is a Date object
    const saleDate = insertSale.saleDate instanceof Date 
      ? insertSale.saleDate 
      : new Date(insertSale.saleDate);
    
    const sale: Sale = {
      ...insertSale,
      saleDate,
      id,
      createdAt: new Date()
    };
    this.sales.set(id, sale);
    
    // Update product stock
    const product = this.products.get(sale.productId);
    if (product) {
      this.products.set(product.id, {
        ...product,
        stockQuantity: product.stockQuantity - sale.quantity
      });
    }
    
    return sale;
  }
  
  async deleteSale(id: number): Promise<boolean> {
    const sale = this.sales.get(id);
    if (!sale) return false;
    
    // Restore product stock
    const product = this.products.get(sale.productId);
    if (product) {
      this.products.set(product.id, {
        ...product,
        stockQuantity: product.stockQuantity + sale.quantity
      });
    }
    
    return this.sales.delete(id);
  }

  // Expense Methods
  async getAllExpenses(): Promise<Expense[]> {
    return Array.from(this.expenses.values());
  }
  
  async getExpensesByDateRange(startDate?: Date, endDate?: Date): Promise<Expense[]> {
    let filteredExpenses = Array.from(this.expenses.values());
    
    if (startDate) {
      filteredExpenses = filteredExpenses.filter(expense => {
        const expenseDate = expense.expenseDate instanceof Date ? expense.expenseDate : new Date(expense.expenseDate);
        return expenseDate >= startDate;
      });
    }
    
    if (endDate) {
      filteredExpenses = filteredExpenses.filter(expense => {
        const expenseDate = expense.expenseDate instanceof Date ? expense.expenseDate : new Date(expense.expenseDate);
        return expenseDate <= endDate;
      });
    }
    
    return filteredExpenses.sort((a, b) => {
      const dateA = a.expenseDate instanceof Date ? a.expenseDate : new Date(a.expenseDate);
      const dateB = b.expenseDate instanceof Date ? b.expenseDate : new Date(b.expenseDate);
      return dateB.getTime() - dateA.getTime();
    });
  }
  
  async getExpensesByCategory(category: string): Promise<Expense[]> {
    return Array.from(this.expenses.values())
      .filter(expense => expense.category === category)
      .sort((a, b) => {
        const dateA = a.expenseDate instanceof Date ? a.expenseDate : new Date(a.expenseDate);
        const dateB = b.expenseDate instanceof Date ? b.expenseDate : new Date(b.expenseDate);
        return dateB.getTime() - dateA.getTime();
      });
  }
  
  async createExpense(insertExpense: InsertExpense): Promise<Expense> {
    const id = this.expenseCounter++;
    
    // Ensure expenseDate is a Date object
    const expenseDate = insertExpense.expenseDate instanceof Date 
      ? insertExpense.expenseDate 
      : new Date(insertExpense.expenseDate);
    
    const expense: Expense = {
      ...insertExpense,
      expenseDate,
      id,
      createdAt: new Date()
    };
    this.expenses.set(id, expense);
    return expense;
  }
  
  async deleteExpense(id: number): Promise<boolean> {
    return this.expenses.delete(id);
  }

  // Activity Log Methods
  async getAllActivityLogs(): Promise<ActivityLog[]> {
    return Array.from(this.activityLogs.values());
  }
  
  async getActivityLogsByDateRange(startDate?: Date, endDate?: Date): Promise<ActivityLog[]> {
    let filteredLogs = Array.from(this.activityLogs.values());
    
    if (startDate) {
      filteredLogs = filteredLogs.filter(log => {
        const logDate = log.logDate instanceof Date ? log.logDate : new Date(log.logDate);
        return logDate >= startDate;
      });
    }
    
    if (endDate) {
      filteredLogs = filteredLogs.filter(log => {
        const logDate = log.logDate instanceof Date ? log.logDate : new Date(log.logDate);
        return logDate <= endDate;
      });
    }
    
    return filteredLogs.sort((a, b) => {
      const dateA = a.logDate instanceof Date ? a.logDate : new Date(a.logDate);
      const dateB = b.logDate instanceof Date ? b.logDate : new Date(b.logDate);
      return dateB.getTime() - dateA.getTime();
    });
  }
  
  async createActivityLog(insertLog: InsertActivityLog): Promise<ActivityLog> {
    const id = this.activityLogCounter++;
    
    // Ensure logDate is a Date object
    const logDate = insertLog.logDate instanceof Date 
      ? insertLog.logDate 
      : new Date(insertLog.logDate);
    
    const log: ActivityLog = {
      ...insertLog,
      logDate,
      id,
      createdAt: new Date()
    };
    this.activityLogs.set(id, log);
    return log;
  }
  
  async deleteActivityLog(id: number): Promise<boolean> {
    return this.activityLogs.delete(id);
  }

  // Dashboard Data Methods
  async getDashboardData(filter?: DateRangeFilter): Promise<{
    totalIncome: number;
    totalExpenses: number;
    profit: number;
    topSellingProducts: Array<{productId: number, productName: string, totalSold: number, totalRevenue: number}>;
    topExpenses: Array<{expenseName: string, amount: number, category: string}>;
    recentTransactions: Array<{id: number, type: 'sale' | 'expense', amount: number, description: string, date: Date}>;
  }> {
    // Filter data by date range if provided
    let filteredSales = Array.from(this.sales.values());
    let filteredExpenses = Array.from(this.expenses.values());
    
    if (filter?.startDate) {
      filteredSales = filteredSales.filter(sale => {
        const saleDate = sale.saleDate instanceof Date ? sale.saleDate : new Date(sale.saleDate);
        return saleDate >= filter.startDate!;
      });
      
      filteredExpenses = filteredExpenses.filter(expense => {
        const expenseDate = expense.expenseDate instanceof Date ? expense.expenseDate : new Date(expense.expenseDate);
        return expenseDate >= filter.startDate!;
      });
    }
    
    if (filter?.endDate) {
      filteredSales = filteredSales.filter(sale => {
        const saleDate = sale.saleDate instanceof Date ? sale.saleDate : new Date(sale.saleDate);
        return saleDate <= filter.endDate!;
      });
      
      filteredExpenses = filteredExpenses.filter(expense => {
        const expenseDate = expense.expenseDate instanceof Date ? expense.expenseDate : new Date(expense.expenseDate);
        return expenseDate <= filter.endDate!;
      });
    }
    
    // Filter by product if specified
    if (filter?.productId) {
      filteredSales = filteredSales.filter(sale => sale.productId === filter.productId);
    }
    
    // Filter by expense category if specified
    if (filter?.category) {
      filteredExpenses = filteredExpenses.filter(expense => expense.category === filter.category);
    }
    
    // Calculate total income
    const totalIncome = filteredSales.reduce((sum, sale) => sum + sale.totalAmount, 0);
    
    // Calculate total expenses
    const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    
    // Calculate profit/loss
    const profit = totalIncome - totalExpenses;
    
    // Calculate top selling products
    const productSales = new Map<number, {totalSold: number, totalRevenue: number}>();
    
    filteredSales.forEach(sale => {
      const existing = productSales.get(sale.productId) || {totalSold: 0, totalRevenue: 0};
      productSales.set(sale.productId, {
        totalSold: existing.totalSold + sale.quantity,
        totalRevenue: existing.totalRevenue + sale.totalAmount
      });
    });
    
    const topSellingProducts = Array.from(productSales.entries())
      .map(([productId, data]) => {
        const product = this.products.get(productId);
        return {
          productId,
          productName: product ? product.name : 'Unknown Product',
          totalSold: data.totalSold,
          totalRevenue: data.totalRevenue
        };
      })
      .sort((a, b) => b.totalRevenue - a.totalRevenue)
      .slice(0, 5); // Top 5 products
    
    // Get top expenses
    const topExpenses = filteredExpenses
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5) // Top 5 expenses
      .map(expense => ({
        expenseName: expense.name,
        amount: expense.amount,
        category: expense.category
      }));
    
    // Get recent transactions (last 7 days if no filter)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    let recentSales = filteredSales;
    let recentExpenses = filteredExpenses;
    
    if (!filter?.startDate && !filter?.endDate) {
      recentSales = recentSales.filter(sale => {
        const saleDate = sale.saleDate instanceof Date ? sale.saleDate : new Date(sale.saleDate);
        return saleDate >= sevenDaysAgo;
      });
      
      recentExpenses = recentExpenses.filter(expense => {
        const expenseDate = expense.expenseDate instanceof Date ? expense.expenseDate : new Date(expense.expenseDate);
        return expenseDate >= sevenDaysAgo;
      });
    }
    
    // Combine and sort sales and expenses for recent transactions
    const recentTransactions = [
      ...recentSales.map(sale => {
        const product = this.products.get(sale.productId);
        const saleDate = sale.saleDate instanceof Date ? sale.saleDate : new Date(sale.saleDate);
        return {
          id: sale.id,
          type: 'sale' as const,
          amount: sale.totalAmount,
          description: `Sale: ${product?.name || 'Unknown Product'} (${sale.quantity} units)`,
          date: saleDate
        };
      }),
      ...recentExpenses.map(expense => {
        const expenseDate = expense.expenseDate instanceof Date ? expense.expenseDate : new Date(expense.expenseDate);
        return {
          id: expense.id,
          type: 'expense' as const,
          amount: expense.amount,
          description: `Expense: ${expense.name} (${expense.category})`,
          date: expenseDate
        };
      })
    ].sort((a, b) => b.date.getTime() - a.date.getTime());
    
    return {
      totalIncome,
      totalExpenses,
      profit,
      topSellingProducts,
      topExpenses,
      recentTransactions
    };
  }

  // User Methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Workers Methods
  async getAllWorkers(): Promise<Worker[]> {
    return Array.from(this.workers.values());
  }

  async getWorker(id: number): Promise<Worker | undefined> {
    return this.workers.get(id);
  }

  async createWorker(insertWorker: InsertWorker): Promise<Worker> {
    const id = this.workerCounter++;
    const worker: Worker = { 
      ...insertWorker, 
      id,
      createdAt: new Date()
    };
    this.workers.set(id, worker);
    return worker;
  }

  async updateWorker(id: number, workerUpdate: Partial<InsertWorker>): Promise<Worker | undefined> {
    const existingWorker = this.workers.get(id);
    if (!existingWorker) {
      return undefined;
    }

    const updatedWorker: Worker = {
      ...existingWorker,
      ...workerUpdate
    };
    this.workers.set(id, updatedWorker);
    return updatedWorker;
  }

  async deleteWorker(id: number): Promise<boolean> {
    return this.workers.delete(id);
  }

  async getWorkersByDepartment(department: string): Promise<Worker[]> {
    return Array.from(this.workers.values()).filter(worker => worker.department === department);
  }

  // Storage Items Methods
  async getAllStorageItems(): Promise<StorageItem[]> {
    return Array.from(this.storageItems.values());
  }

  async getStorageItem(id: number): Promise<StorageItem | undefined> {
    return this.storageItems.get(id);
  }

  async createStorageItem(insertItem: InsertStorageItem): Promise<StorageItem> {
    const id = this.storageItemCounter++;
    const storageItem: StorageItem = { 
      ...insertItem, 
      id,
      createdAt: new Date()
    };
    this.storageItems.set(id, storageItem);
    return storageItem;
  }

  async updateStorageItem(id: number, itemUpdate: Partial<InsertStorageItem>): Promise<StorageItem | undefined> {
    const existingItem = this.storageItems.get(id);
    if (!existingItem) {
      return undefined;
    }

    const updatedItem: StorageItem = {
      ...existingItem,
      ...itemUpdate
    };
    this.storageItems.set(id, updatedItem);
    return updatedItem;
  }

  async deleteStorageItem(id: number): Promise<boolean> {
    return this.storageItems.delete(id);
  }
}

export const storage = new MemStorage();
