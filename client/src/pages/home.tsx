import { useState } from 'react';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { CategoryCard } from '@/components/category-card';
import { ProductCard } from '@/components/product-card';
import { ArtisanCard } from '@/components/artisan-card';
import { TestimonialCard } from '@/components/testimonial-card';
import { ProductFilters } from '@/components/product-filters';
import { useFilter } from '@/hooks/use-filter';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Category, Product, Artisan, Review } from '@shared/schema';

export default function Home() {
  const { toast } = useToast();
  const { appliedFilters } = useFilter();
  const [email, setEmail] = useState('');

  // Fetch categories
  const { data: categories = [], isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  // Fetch featured products with filters
  const { 
    data: products = [], 
    isLoading: productsLoading 
  } = useQuery<Product[]>({
    queryKey: ['/api/products/featured', appliedFilters],
  });

  // Fetch artisans
  const { 
    data: artisans = [], 
    isLoading: artisansLoading 
  } = useQuery<Artisan[]>({
    queryKey: ['/api/artisans/featured'],
  });

  // Fetch testimonials
  const { 
    data: testimonials = [], 
    isLoading: testimonialsLoading 
  } = useQuery<Review[]>({
    queryKey: ['/api/reviews/featured'],
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Thank you for subscribing!",
      description: "You've been added to our newsletter."
    });
    setEmail('');
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative">
        <div className="relative h-[500px] md:h-[600px] w-full overflow-hidden">
          <img 
            src="https://pixabay.com/get/g07d8d65a863488ad1814b6e221cbd13df944fcef45df256593a661acfba385b7e4912d5c659ea57d8c0e66b721e582f53751e6d6dfdae6d5d77e8f40f8e66f12_1280.jpg" 
            alt="Artisan crafting handmade pottery" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="container mx-auto px-4 text-center text-white">
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Handcrafted with Love</h1>
              <p className="text-lg md:text-xl font-light max-w-2xl mx-auto mb-8">Discover unique handmade products created by talented artisans in your community</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="#featured-products">
                  <Button className="bg-primary hover:bg-primary-dark text-white font-accent font-medium px-8 py-3 rounded-md transition-all">
                    Shop Now
                  </Button>
                </Link>
                <Link href="#artisans">
                  <Button variant="outline" className="bg-transparent hover:bg-white/20 border-2 border-white text-white font-accent font-medium px-8 py-3 rounded-md transition-all">
                    Meet Our Artisans
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-neutral">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-center mb-12">Shop by Category</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categoriesLoading ? (
              // Loading skeleton
              [...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 rounded-lg aspect-square mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-20 mx-auto"></div>
                </div>
              ))
            ) : (
              categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Featured Products with Filters */}
      <section id="featured-products" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-center mb-4">Featured Products</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Discover our collection of handcrafted items, each made with passion and attention to detail
          </p>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters sidebar */}
            <div className="w-full lg:w-1/4">
              <ProductFilters 
                categories={categories} 
                artisans={artisans}
              />
            </div>
            
            {/* Products grid */}
            <div className="w-full lg:w-3/4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {productsLoading ? (
                  // Loading skeleton
                  [...Array(6)].map((_, i) => (
                    <div key={i} className="animate-pulse bg-white border border-gray-200 rounded-lg p-4">
                      <div className="bg-gray-200 aspect-square rounded-lg mb-4"></div>
                      <div className="h-5 bg-gray-200 rounded mb-2 w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded mb-3 w-1/2"></div>
                      <div className="h-4 bg-gray-200 rounded mb-4 w-1/3"></div>
                      <div className="h-10 bg-gray-200 rounded"></div>
                    </div>
                  ))
                ) : products.length > 0 ? (
                  products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))
                ) : (
                  <div className="col-span-3 py-8 text-center">
                    <p className="text-gray-500">No products found matching your filters.</p>
                    <Button 
                      onClick={() => window.location.reload()}
                      variant="outline"
                      className="mt-4"
                    >
                      Reset Filters
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="mt-10 flex justify-center">
                <Link href="/categories">
                  <Button className="bg-secondary hover:bg-secondary-dark text-primary font-medium px-6 py-3 rounded-md transition-all">
                    Load More Products
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-neutral">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-center mb-4">Customer Testimonials</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Don't just take our word for it. Hear what our happy customers have to say about our artisanal products.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonialsLoading ? (
              // Loading skeleton
              [...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse bg-white p-6 rounded-lg">
                  <div className="h-4 bg-gray-200 rounded mb-4 w-1/3"></div>
                  <div className="h-20 bg-gray-200 rounded mb-4"></div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                    <div>
                      <div className="h-4 bg-gray-200 rounded mb-2 w-24"></div>
                      <div className="h-3 bg-gray-200 rounded w-20"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} review={testimonial} />
              ))
            )}
          </div>
          
          <div className="mt-10">
            <h3 className="font-heading text-2xl font-bold text-center mb-6">Share Your Experience</h3>
            <Link href="/reviews/new">
              <Button className="block mx-auto bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-md transition-all">
                Write a Review
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Artisans Section */}
      <section id="artisans" className="py-16 bg-secondary bg-opacity-30">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-center mb-4">Meet Our Artisans</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Each product in our marketplace is crafted by skilled artisans who pour their heart and expertise into their creations.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artisansLoading ? (
              // Loading skeleton
              [...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse bg-white rounded-lg overflow-hidden shadow-md">
                  <div className="aspect-video bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-3 w-1/2"></div>
                    <div className="h-16 bg-gray-200 rounded mb-4"></div>
                    <div className="flex space-x-2 mb-4">
                      <div className="h-6 bg-gray-200 rounded w-16"></div>
                      <div className="h-6 bg-gray-200 rounded w-16"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))
            ) : (
              artisans.map((artisan) => (
                <ArtisanCard key={artisan.id} artisan={artisan} />
              ))
            )}
          </div>
          
          <div className="mt-10 text-center">
            <Link href="/artisans">
              <Button className="bg-accent hover:bg-accent-dark text-white font-medium px-6 py-3 rounded-md transition-all inline-flex items-center">
                Meet All Our Artisans <i className="ri-arrow-right-line ml-2"></i>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA / Newsletter Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-primary rounded-xl p-8 lg:p-12 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10"></div>
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between">
              <div className="mb-8 lg:mb-0 text-center lg:text-left">
                <h2 className="font-heading text-white text-3xl md:text-4xl font-bold mb-3">
                  Join our artisan community
                </h2>
                <p className="text-white text-opacity-90 max-w-xl">
                  Sign up to receive updates on new arrivals, special offers and other discount information.
                </p>
              </div>
              
              <div className="w-full lg:w-auto">
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full sm:w-72 px-4 py-3 rounded-md border-0 focus:outline-none focus:ring-2 focus:ring-white"
                    required
                  />
                  <Button 
                    type="submit"
                    className="bg-white text-primary hover:bg-neutral hover:text-primary-dark font-accent font-medium px-6 py-3 rounded-md transition-all"
                  >
                    Subscribe
                  </Button>
                </form>
                <p className="text-white text-opacity-80 text-sm mt-2">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
