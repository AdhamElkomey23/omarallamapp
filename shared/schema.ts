import { pgTable, text, serial, integer, boolean, doublePrecision, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Categories Table
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  imageUrl: text("image_url").notNull(),
});

export const insertCategorySchema = createInsertSchema(categories).omit({ id: true });
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categories.$inferSelect;

// Artisans Table
export const artisans = pgTable("artisans", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  businessName: text("business_name").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  tags: text("tags").array().notNull(),
});

export const insertArtisanSchema = createInsertSchema(artisans).omit({ id: true });
export type InsertArtisan = z.infer<typeof insertArtisanSchema>;
export type Artisan = typeof artisans.$inferSelect;

// Products Table
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: doublePrecision("price").notNull(),
  categoryId: integer("category_id").notNull(),
  artisanId: integer("artisan_id").notNull(),
  isCustomizable: boolean("is_customizable").notNull().default(false),
  imageUrl: text("image_url").notNull(),
  imageUrls: text("image_urls").array().notNull(),
  customizationOptions: text("customization_options").notNull(),
  averageRating: doublePrecision("average_rating").notNull().default(0),
  reviewCount: integer("review_count").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertProductSchema = createInsertSchema(products).omit({ id: true, createdAt: true, averageRating: true, reviewCount: true });
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

// Reviews Table
export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").notNull(),
  userName: text("user_name").notNull(),
  email: text("email").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  rating: integer("rating").notNull(),
  isVerifiedPurchase: boolean("is_verified_purchase").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertReviewSchema = createInsertSchema(reviews).omit({ id: true, createdAt: true });
export type InsertReview = z.infer<typeof insertReviewSchema>;
export type Review = typeof reviews.$inferSelect;

// Cart Items Schema (for client-side only)
export const cartItemSchema = z.object({
  id: z.string(),
  productId: z.number(),
  name: z.string(),
  price: z.number(),
  imageUrl: z.string(),
  quantity: z.number(),
  customizations: z.record(z.string(), z.string()).optional(),
});

export type CartItem = z.infer<typeof cartItemSchema>;

// Product Filtering Schema
export const productFilterSchema = z.object({
  categoryIds: z.array(z.number()).optional(),
  artisanIds: z.array(z.number()).optional(),
  priceRanges: z.array(z.tuple([z.number(), z.number()])).optional(),
  searchQuery: z.string().optional(),
  isCustomizable: z.boolean().optional(),
});

export type ProductFilter = z.infer<typeof productFilterSchema>;

// User schema (used for session storage only)
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
