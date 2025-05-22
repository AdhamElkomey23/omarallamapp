import { 
  categories, 
  artisans, 
  products, 
  reviews,
  type Category, 
  type InsertCategory,
  type Artisan, 
  type InsertArtisan,
  type Product, 
  type InsertProduct,
  type Review, 
  type InsertReview,
  type ProductFilter,
  type User,
  type InsertUser,
  users
} from "@shared/schema";
import { seedData } from "./data/seed-data";

// Modify the interface with any CRUD methods needed
export interface IStorage {
  // Categories
  getAllCategories(): Promise<Category[]>;
  getCategory(id: number): Promise<Category | undefined>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;

  // Artisans
  getAllArtisans(): Promise<Artisan[]>;
  getFeaturedArtisans(limit?: number): Promise<Artisan[]>;
  getArtisan(id: number): Promise<Artisan | undefined>;
  createArtisan(artisan: InsertArtisan): Promise<Artisan>;

  // Products
  getAllProducts(): Promise<Product[]>;
  getProductsWithFilters(filters: ProductFilter): Promise<Product[]>;
  getFeaturedProducts(filters: ProductFilter, limit?: number): Promise<Product[]>;
  getProductWithDetails(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Reviews
  getAllReviews(): Promise<Review[]>;
  getFeaturedReviews(limit?: number): Promise<Review[]>;
  getReviewsByProductId(productId: number): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
  
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private categories: Map<number, Category>;
  private artisans: Map<number, Artisan>;
  private products: Map<number, Product>;
  private reviews: Map<number, Review>;
  
  private userCounter: number;
  private categoryCounter: number;
  private artisanCounter: number;
  private productCounter: number;
  private reviewCounter: number;

  constructor() {
    // Initialize maps
    this.users = new Map();
    this.categories = new Map();
    this.artisans = new Map();
    this.products = new Map();
    this.reviews = new Map();
    
    // Initialize counters
    this.userCounter = 1;
    this.categoryCounter = 1;
    this.artisanCounter = 1;
    this.productCounter = 1;
    this.reviewCounter = 1;
    
    // Load seed data
    this.loadSeedData();
  }

  private loadSeedData() {
    // Load categories
    seedData.categories.forEach(category => {
      const newCategory: Category = {
        ...category,
        id: this.categoryCounter++
      };
      this.categories.set(newCategory.id, newCategory);
    });
    
    // Load artisans
    seedData.artisans.forEach(artisan => {
      const newArtisan: Artisan = {
        ...artisan,
        id: this.artisanCounter++
      };
      this.artisans.set(newArtisan.id, newArtisan);
    });
    
    // Load products
    seedData.products.forEach(product => {
      const newProduct: Product = {
        ...product,
        id: this.productCounter++
      };
      this.products.set(newProduct.id, newProduct);
    });
    
    // Load reviews
    seedData.reviews.forEach(review => {
      const newReview: Review = {
        ...review,
        id: this.reviewCounter++
      };
      this.reviews.set(newReview.id, newReview);
      
      // Update product's average rating and review count
      this.updateProductRatingStats(review.productId);
    });
  }

  private updateProductRatingStats(productId: number) {
    const product = this.products.get(productId);
    if (!product) return;
    
    // Get all reviews for this product
    const productReviews = Array.from(this.reviews.values())
      .filter(review => review.productId === productId);
    
    // Calculate average rating
    const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0);
    const avgRating = productReviews.length > 0 ? totalRating / productReviews.length : 0;
    
    // Update product
    this.products.set(productId, {
      ...product,
      averageRating: parseFloat(avgRating.toFixed(1)),
      reviewCount: productReviews.length
    });
  }

  // Category Methods
  async getAllCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategory(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(
      category => category.slug === slug
    );
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.categoryCounter++;
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }

  // Artisan Methods
  async getAllArtisans(): Promise<Artisan[]> {
    return Array.from(this.artisans.values());
  }

  async getFeaturedArtisans(limit = 3): Promise<Artisan[]> {
    return Array.from(this.artisans.values()).slice(0, limit);
  }

  async getArtisan(id: number): Promise<Artisan | undefined> {
    return this.artisans.get(id);
  }

  async createArtisan(insertArtisan: InsertArtisan): Promise<Artisan> {
    const id = this.artisanCounter++;
    const artisan: Artisan = { ...insertArtisan, id };
    this.artisans.set(id, artisan);
    return artisan;
  }

  // Product Methods
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductsWithFilters(filters: ProductFilter): Promise<Product[]> {
    let filteredProducts = Array.from(this.products.values());
    
    // Apply category filter
    if (filters.categoryIds && filters.categoryIds.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        filters.categoryIds!.includes(product.categoryId)
      );
    }
    
    // Apply artisan filter
    if (filters.artisanIds && filters.artisanIds.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        filters.artisanIds!.includes(product.artisanId)
      );
    }
    
    // Apply price range filter
    if (filters.priceRanges && filters.priceRanges.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        filters.priceRanges!.some(([min, max]) => 
          product.price >= min && (max === Infinity || product.price <= max)
        )
      );
    }
    
    // Apply customizable filter
    if (filters.isCustomizable !== undefined) {
      filteredProducts = filteredProducts.filter(product => 
        product.isCustomizable === filters.isCustomizable
      );
    }
    
    // Apply search query filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filteredProducts = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
      );
    }
    
    // Add artisan name to each product
    return filteredProducts.map(product => {
      const artisan = this.artisans.get(product.artisanId);
      return {
        ...product,
        artisanName: artisan ? artisan.businessName : 'Unknown Artisan'
      };
    });
  }

  async getFeaturedProducts(filters: ProductFilter, limit = 6): Promise<Product[]> {
    // Get filtered products
    const filteredProducts = await this.getProductsWithFilters(filters);
    
    // Sort by rating and limit results
    return filteredProducts
      .sort((a, b) => b.averageRating - a.averageRating)
      .slice(0, limit);
  }

  async getProductWithDetails(id: number): Promise<Product | undefined> {
    const product = this.products.get(id);
    if (!product) return undefined;
    
    // Get artisan details
    const artisan = this.artisans.get(product.artisanId);
    
    return {
      ...product,
      artisanName: artisan ? artisan.businessName : 'Unknown Artisan'
    };
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.productCounter++;
    const product: Product = { 
      ...insertProduct, 
      id, 
      averageRating: 0, 
      reviewCount: 0,
      createdAt: new Date()
    };
    this.products.set(id, product);
    return product;
  }

  // Review Methods
  async getAllReviews(): Promise<Review[]> {
    return Array.from(this.reviews.values());
  }

  async getFeaturedReviews(limit = 3): Promise<Review[]> {
    return Array.from(this.reviews.values())
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
  }

  async getReviewsByProductId(productId: number): Promise<Review[]> {
    return Array.from(this.reviews.values())
      .filter(review => review.productId === productId)
      .sort((a, b) => 
        // Sort by verified purchase first, then by date (newest first)
        (b.isVerifiedPurchase ? 1 : 0) - (a.isVerifiedPurchase ? 1 : 0) ||
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = this.reviewCounter++;
    const review: Review = { 
      ...insertReview, 
      id,
      createdAt: new Date()
    };
    this.reviews.set(id, review);
    
    // Update product's average rating and review count
    this.updateProductRatingStats(review.productId);
    
    return review;
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
}

export const storage = new MemStorage();
