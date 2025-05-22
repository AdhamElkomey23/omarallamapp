import express, { type Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertProductSchema, 
  insertSaleSchema, 
  insertExpenseSchema,
  insertActivityLogSchema,
  dateRangeFilterSchema
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes
  const apiRouter = express.Router();
  
  // Products Routes
  apiRouter.get("/products", async (req, res) => {
    try {
      const products = await storage.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  apiRouter.get("/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }

      const product = await storage.getProduct(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  apiRouter.post("/products", async (req, res) => {
    try {
      // Validate request body
      const validatedData = insertProductSchema.parse(req.body);
      
      const newProduct = await storage.createProduct(validatedData);
      res.status(201).json(newProduct);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid product data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create product" });
    }
  });

  apiRouter.put("/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }

      // Partial validation of request body
      const validatedData = insertProductSchema.partial().parse(req.body);
      
      const updatedProduct = await storage.updateProduct(id, validatedData);
      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.json(updatedProduct);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid product data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update product" });
    }
  });

  apiRouter.delete("/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }

      const success = await storage.deleteProduct(id);
      if (!success) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete product" });
    }
  });

  // Sales Routes
  apiRouter.get("/sales", async (req, res) => {
    try {
      const sales = await storage.getAllSales();
      res.json(sales);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch sales" });
    }
  });

  apiRouter.get("/sales/product/:productId", async (req, res) => {
    try {
      const productId = parseInt(req.params.productId);
      if (isNaN(productId)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }

      const sales = await storage.getSalesByProductId(productId);
      res.json(sales);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch sales for product" });
    }
  });

  apiRouter.get("/sales/date-range", async (req, res) => {
    try {
      const startDate = req.query.startDate ? new Date(req.query.startDate as string) : undefined;
      const endDate = req.query.endDate ? new Date(req.query.endDate as string) : undefined;

      const sales = await storage.getSalesByDateRange(startDate, endDate);
      res.json(sales);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch sales by date range" });
    }
  });

  apiRouter.post("/sales", async (req, res) => {
    try {
      // Validate request body
      const validatedData = insertSaleSchema.parse(req.body);
      
      const newSale = await storage.createSale(validatedData);
      res.status(201).json(newSale);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid sale data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create sale" });
    }
  });

  apiRouter.delete("/sales/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid sale ID" });
      }

      const success = await storage.deleteSale(id);
      if (!success) {
        return res.status(404).json({ message: "Sale not found" });
      }
      
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete sale" });
    }
  });

  // Expenses Routes
  apiRouter.get("/expenses", async (req, res) => {
    try {
      const expenses = await storage.getAllExpenses();
      res.json(expenses);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch expenses" });
    }
  });

  apiRouter.get("/expenses/category/:category", async (req, res) => {
    try {
      const expenses = await storage.getExpensesByCategory(req.params.category);
      res.json(expenses);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch expenses by category" });
    }
  });

  apiRouter.get("/expenses/date-range", async (req, res) => {
    try {
      const startDate = req.query.startDate ? new Date(req.query.startDate as string) : undefined;
      const endDate = req.query.endDate ? new Date(req.query.endDate as string) : undefined;

      const expenses = await storage.getExpensesByDateRange(startDate, endDate);
      res.json(expenses);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch expenses by date range" });
    }
  });

  apiRouter.post("/expenses", async (req, res) => {
    try {
      // Validate request body
      const validatedData = insertExpenseSchema.parse(req.body);
      
      const newExpense = await storage.createExpense(validatedData);
      res.status(201).json(newExpense);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid expense data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create expense" });
    }
  });

  apiRouter.delete("/expenses/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid expense ID" });
      }

      const success = await storage.deleteExpense(id);
      if (!success) {
        return res.status(404).json({ message: "Expense not found" });
      }
      
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete expense" });
    }
  });

  // Activity Logs Routes
  apiRouter.get("/activity-logs", async (req, res) => {
    try {
      const logs = await storage.getAllActivityLogs();
      res.json(logs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch activity logs" });
    }
  });

  apiRouter.get("/activity-logs/date-range", async (req, res) => {
    try {
      const startDate = req.query.startDate ? new Date(req.query.startDate as string) : undefined;
      const endDate = req.query.endDate ? new Date(req.query.endDate as string) : undefined;

      const logs = await storage.getActivityLogsByDateRange(startDate, endDate);
      res.json(logs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch activity logs by date range" });
    }
  });

  apiRouter.post("/activity-logs", async (req, res) => {
    try {
      // Validate request body
      const validatedData = insertActivityLogSchema.parse(req.body);
      
      const newLog = await storage.createActivityLog(validatedData);
      res.status(201).json(newLog);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid activity log data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create activity log" });
    }
  });

  apiRouter.delete("/activity-logs/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid activity log ID" });
      }

      const success = await storage.deleteActivityLog(id);
      if (!success) {
        return res.status(404).json({ message: "Activity log not found" });
      }
      
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete activity log" });
    }
  });

  // Dashboard Data Route
  apiRouter.get("/dashboard", async (req, res) => {
    try {
      const filter: any = {};

      // Parse date range
      if (req.query.startDate) {
        filter.startDate = new Date(req.query.startDate as string);
      }
      if (req.query.endDate) {
        filter.endDate = new Date(req.query.endDate as string);
      }
      
      // Parse product filter
      if (req.query.productId) {
        filter.productId = parseInt(req.query.productId as string);
      }
      
      // Parse category filter
      if (req.query.category) {
        filter.category = req.query.category as string;
      }

      // Validate filter
      const validatedFilter = dateRangeFilterSchema.parse(filter);
      
      const dashboardData = await storage.getDashboardData(validatedFilter);
      res.json(dashboardData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid filter parameters", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to fetch dashboard data" });
    }
  });

  // Authentication Routes (simple for now)
  apiRouter.post("/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      // Simple authentication for now
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // In a real app, we'd use JWT or sessions here
      res.json({ 
        id: user.id, 
        username: user.username,
        token: "dummy-token" // This would be a real JWT in a production app
      });
    } catch (error) {
      res.status(500).json({ message: "Authentication failed" });
    }
  });

  // Register API routes with prefix
  app.use("/api", apiRouter);

  // Create HTTP server
  const httpServer = createServer(app);
  return httpServer;
}
