import { pgTable, text, serial, integer, doublePrecision, timestamp, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users Table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Products Table
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  unitPrice: doublePrecision("unit_price").notNull(),
  stockQuantity: integer("stock_quantity").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertProductSchema = createInsertSchema(products).omit({ id: true, createdAt: true });
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

// Sales Table
export const sales = pgTable("sales", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").notNull(),
  quantity: integer("quantity").notNull(),
  totalAmount: doublePrecision("total_amount").notNull(),
  saleDate: date("sale_date").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// For the insert schema, we need to handle dates properly
export const insertSaleSchema = createInsertSchema(sales).omit({ id: true, createdAt: true });
export type InsertSale = z.infer<typeof insertSaleSchema>;
export type Sale = {
  id: number;
  productId: number;
  quantity: number;
  totalAmount: number;
  saleDate: Date;
  createdAt: Date;
};

// Expense Categories Enum
export const expenseCategoryEnum = z.enum([
  "Utilities",
  "Salaries",
  "Maintenance",
  "RawMaterials",
  "Transportation",
  "Other"
]);

export type ExpenseCategory = z.infer<typeof expenseCategoryEnum>;

// Expenses Table
export const expenses = pgTable("expenses", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  amount: doublePrecision("amount").notNull(),
  category: text("category").notNull(), // Will store ExpenseCategory values
  expenseDate: date("expense_date").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertExpenseSchema = createInsertSchema(expenses).omit({ id: true, createdAt: true });
export type InsertExpense = z.infer<typeof insertExpenseSchema>;
export type Expense = {
  id: number;
  name: string;
  amount: number;
  category: string;
  expenseDate: Date;
  createdAt: Date;
};

// Activity Logs Table
export const activityLogs = pgTable("activity_logs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  logDate: date("log_date").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertActivityLogSchema = createInsertSchema(activityLogs).omit({ id: true, createdAt: true });
export type InsertActivityLog = z.infer<typeof insertActivityLogSchema>;
export type ActivityLog = {
  id: number;
  title: string;
  description: string;
  logDate: Date;
  createdAt: Date;
};

// Dashboard Filter Schema (for client-side only)
export const dateRangeFilterSchema = z.object({
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  productId: z.number().optional(),
  category: z.string().optional(),
});

export type DateRangeFilter = z.infer<typeof dateRangeFilterSchema>;
