import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { productFilterSchema, insertReviewSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes
  const apiRouter = express.Router();
  
  // Categories
  apiRouter.get("/categories", async (req, res) => {
    try {
      const categories = await storage.getAllCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  apiRouter.get("/categories/:slug", async (req, res) => {
    try {
      const category = await storage.getCategoryBySlug(req.params.slug);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch category" });
    }
  });

  // Artisans
  apiRouter.get("/artisans", async (req, res) => {
    try {
      const artisans = await storage.getAllArtisans();
      res.json(artisans);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch artisans" });
    }
  });

  apiRouter.get("/artisans/featured", async (req, res) => {
    try {
      const artisans = await storage.getFeaturedArtisans();
      res.json(artisans);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured artisans" });
    }
  });

  apiRouter.get("/artisans/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid artisan ID" });
      }

      const artisan = await storage.getArtisan(id);
      if (!artisan) {
        return res.status(404).json({ message: "Artisan not found" });
      }
      res.json(artisan);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch artisan" });
    }
  });

  // Products
  apiRouter.get("/products", async (req, res) => {
    try {
      // Parse filter parameters from query string
      const filters = parseProductFilters(req.query);
      
      const products = await storage.getProductsWithFilters(filters);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  apiRouter.get("/products/featured", async (req, res) => {
    try {
      // Parse filter parameters from query string
      const filters = parseProductFilters(req.query);
      
      const products = await storage.getFeaturedProducts(filters);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured products" });
    }
  });

  apiRouter.get("/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }

      const product = await storage.getProductWithDetails(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  // Reviews
  apiRouter.get("/reviews", async (req, res) => {
    try {
      const reviews = await storage.getAllReviews();
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch reviews" });
    }
  });

  apiRouter.get("/reviews/featured", async (req, res) => {
    try {
      const reviews = await storage.getFeaturedReviews();
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured reviews" });
    }
  });

  apiRouter.get("/reviews/:productId", async (req, res) => {
    try {
      const productId = parseInt(req.params.productId);
      if (isNaN(productId)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }

      const reviews = await storage.getReviewsByProductId(productId);
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch reviews" });
    }
  });

  apiRouter.post("/reviews", async (req, res) => {
    try {
      // Validate request body
      const validatedData = insertReviewSchema.parse(req.body);
      
      const newReview = await storage.createReview(validatedData);
      res.status(201).json(newReview);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid review data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create review" });
    }
  });

  // Register API routes with prefix
  app.use("/api", apiRouter);

  // Create HTTP server
  const httpServer = createServer(app);
  return httpServer;
};

// Helper function to parse product filter parameters from query string
function parseProductFilters(query: any) {
  try {
    const filters: Record<string, any> = {};
    
    // Parse category IDs
    if (query.categoryIds) {
      filters.categoryIds = Array.isArray(query.categoryIds)
        ? query.categoryIds.map(Number)
        : [Number(query.categoryIds)];
    }
    
    // Parse artisan IDs
    if (query.artisanIds) {
      filters.artisanIds = Array.isArray(query.artisanIds)
        ? query.artisanIds.map(Number)
        : [Number(query.artisanIds)];
    }
    
    // Parse price ranges
    if (query.priceRanges) {
      const ranges = Array.isArray(query.priceRanges)
        ? query.priceRanges
        : [query.priceRanges];
      
      filters.priceRanges = ranges.map((range: string) => {
        const [min, max] = range.split('-').map(Number);
        return [min, max === 0 ? Infinity : max]; // Use Infinity for the upper bound if it's 0
      });
    }
    
    // Parse customizable flag
    if (query.isCustomizable !== undefined) {
      filters.isCustomizable = query.isCustomizable === 'true';
    }
    
    // Parse search query
    if (query.searchQuery) {
      filters.searchQuery = query.searchQuery;
    }
    
    return productFilterSchema.parse(filters);
  } catch (error) {
    // Return empty filters on error
    return {};
  }
}
