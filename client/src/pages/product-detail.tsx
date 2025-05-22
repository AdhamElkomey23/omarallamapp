import { useState } from 'react';
import { useParams, Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { StarRating } from '@/components/ui/star-rating';
import { ReviewForm } from '@/components/review-form';
import { TestimonialCard } from '@/components/testimonial-card';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Product, Review } from '@shared/schema';
import { generateProductId } from '@/lib/utils';

export default function ProductDetail() {
  const { id } = useParams();
  const productId = parseInt(id || '0');
  const { toast } = useToast();
  const { addItem } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [customizations, setCustomizations] = useState<Record<string, string>>({
    color: 'natural',
    size: 'medium',
    personalization: ''
  });
  
  // Fetch product details
  const { 
    data: product, 
    isLoading: productLoading,
    isError: productError
  } = useQuery<Product>({
    queryKey: ['/api/products', productId],
    enabled: !!productId,
  });
  
  // Fetch product reviews
  const { 
    data: reviews = [], 
    isLoading: reviewsLoading
  } = useQuery<Review[]>({
    queryKey: ['/api/reviews', productId],
    enabled: !!productId,
  });

  if (productLoading) {
    return (
      <div className="py-16 container mx-auto px-4">
        <div className="animate-pulse bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-1/2">
              <div className="bg-gray-200 rounded-lg aspect-square mb-4"></div>
              <div className="grid grid-cols-4 gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-gray-200 rounded-md aspect-square"></div>
                ))}
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="h-10 bg-gray-200 rounded mb-2 w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded mb-3 w-24"></div>
              <div className="h-6 bg-gray-200 rounded mb-3 w-20"></div>
              <div className="h-20 bg-gray-200 rounded mb-4"></div>
              {/* Continued loading skeleton */}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (productError || !product) {
    return (
      <div className="py-16 container mx-auto px-4 text-center">
        <h2 className="text-2xl font-heading font-bold mb-4">Product Not Found</h2>
        <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Link href="/categories">
          <Button>Back to Products</Button>
        </Link>
      </div>
    );
  }

  // Parse customization options
  const customizationOptions = product.customizationOptions ? 
    JSON.parse(product.customizationOptions) : 
    { colors: [], sizes: [] };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleCustomizationChange = (type: string, value: string) => {
    setCustomizations({
      ...customizations,
      [type]: value
    });
  };

  const handleAddToCart = () => {
    // Only include customizations if product is customizable
    const cartCustomizations = product.isCustomizable ? customizations : undefined;
    
    addItem({
      id: generateProductId(),
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity,
      customizations: cartCustomizations
    });
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <section className="py-16 bg-neutral">
      <div className="container mx-auto px-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Product Images */}
            <div className="w-full lg:w-1/2">
              <div className="mb-4 rounded-lg overflow-hidden">
                <img 
                  src={product.imageUrls[selectedImage] || product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-auto rounded-lg" 
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.imageUrls.map((image, index) => (
                  <div 
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-md overflow-hidden border-2 cursor-pointer ${
                      selectedImage === index ? 'border-primary' : 'border-gray-200'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} view ${index + 1}`} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Product Info and Customization */}
            <div className="w-full lg:w-1/2">
              <div className="mb-6">
                <h1 className="font-heading text-3xl font-bold mb-2">{product.name}</h1>
                <div className="flex items-center mb-3">
                  <StarRating 
                    rating={product.averageRating} 
                    showCount 
                    count={product.reviewCount} 
                  />
                </div>
                <p className="text-xl font-accent font-medium text-primary mb-3">
                  ${product.price.toFixed(2)}
                </p>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex items-center text-sm text-gray-600 mb-6">
                  <div className="flex items-center mr-4">
                    <i className="ri-truck-line mr-1"></i>
                    <span>Free shipping over $50</span>
                  </div>
                  <div className="flex items-center">
                    <i className="ri-recycle-line mr-1"></i>
                    <span>Eco-friendly packaging</span>
                  </div>
                </div>
              </div>
              
              {product.isCustomizable && (
                <div className="border-t border-gray-200 pt-6 mb-6">
                  <h3 className="font-heading font-bold text-lg mb-4">Customize Your {product.name}</h3>
                  
                  {customizationOptions.colors?.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-medium mb-2">Color:</h4>
                      <div className="flex space-x-2">
                        {customizationOptions.colors.map((color: any) => (
                          <button 
                            key={color.value}
                            onClick={() => handleCustomizationChange('color', color.value)}
                            className={`w-10 h-10 rounded-full bg-[${color.hex}] border border-gray-300 shadow-sm ${
                              customizations.color === color.value ? 'ring-2 ring-accent' : ''
                            }`}
                            style={{ backgroundColor: color.hex }}
                            aria-label={`Select ${color.name} color`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {customizationOptions.sizes?.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-medium mb-2">Size:</h4>
                      <div className="flex flex-wrap gap-2">
                        {customizationOptions.sizes.map((size: any) => (
                          <button 
                            key={size.value}
                            onClick={() => handleCustomizationChange('size', size.value)}
                            className={`px-4 py-2 border border-gray-300 rounded-md hover:border-primary ${
                              customizations.size === size.value ? 'ring-2 ring-accent' : ''
                            }`}
                          >
                            {size.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {customizationOptions.personalization && (
                    <div className="mb-6">
                      <h4 className="font-medium mb-2">Add Personalization:</h4>
                      <Input
                        type="text"
                        placeholder="Enter name or initials (optional)"
                        value={customizations.personalization || ''}
                        onChange={(e) => handleCustomizationChange('personalization', e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        maxLength={customizationOptions.personalization.maxLength || 10}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        * Up to {customizationOptions.personalization.maxLength || 10} characters, 
                        {customizationOptions.personalization.additionalFee > 0 
                          ? ` additional $${customizationOptions.personalization.additionalFee.toFixed(2)} fee applies` 
                          : ' no additional fee'}
                      </p>
                    </div>
                  )}
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex border border-gray-300 rounded-md">
                  <button 
                    onClick={decreaseQuantity}
                    className="px-3 py-2 border-r border-gray-300 text-gray-600 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <input 
                    type="number" 
                    value={quantity} 
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    min="1" 
                    className="w-12 text-center focus:outline-none"
                  />
                  <button 
                    onClick={increaseQuantity}
                    className="px-3 py-2 border-l border-gray-300 text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                <Button
                  onClick={handleAddToCart}
                  className="flex-grow bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-md transition-all flex items-center justify-center"
                >
                  <i className="ri-shopping-cart-line mr-2"></i> Add to Cart
                </Button>
                <Button
                  variant="outline"
                  className="bg-white border border-primary text-primary hover:bg-primary hover:text-white font-medium py-3 px-4 rounded-md transition-all"
                >
                  <i className="ri-heart-line"></i>
                </Button>
              </div>
              
              <div className="mt-6 text-sm">
                <p>
                  <i className="ri-user-line mr-1"></i> Made by{' '}
                  <Link href={`/artisans/${product.artisanId}`} className="text-primary hover:underline">
                    {product.artisanName}
                  </Link>
                </p>
                <p className="mt-1"><i className="ri-map-pin-line mr-1"></i> Ships from Portland, OR</p>
              </div>
            </div>
          </div>
          
          {/* Product Tabs */}
          <div className="mt-12">
            <Tabs defaultValue="description">
              <TabsList className="border-b border-gray-200 w-full justify-start">
                <TabsTrigger value="description" className="py-4 px-1">Description</TabsTrigger>
                <TabsTrigger value="reviews" className="py-4 px-1">Reviews ({product.reviewCount})</TabsTrigger>
                <TabsTrigger value="shipping" className="py-4 px-1">Shipping</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="py-6">
                <h3 className="font-heading font-bold text-xl mb-4">Product Description</h3>
                <div className="text-gray-600 space-y-4">
                  <p>{product.description}</p>
                  
                  <h4 className="font-bold mt-6 mb-2">Features:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Handmade from locally sourced materials</li>
                    <li>Food-safe, lead-free finish</li>
                    <li>Available in multiple colors and sizes</li>
                    {product.isCustomizable && <li>Optional personalization available</li>}
                    <li>Each piece is unique with slight variations</li>
                  </ul>
                  
                  <h4 className="font-bold mt-6 mb-2">Care Instructions:</h4>
                  <p>Please see product details for specific care instructions. Most handcrafted items require gentle handling to maintain their quality and appearance.</p>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="py-6">
                <h3 className="font-heading font-bold text-xl mb-4">Customer Reviews</h3>
                
                {reviewsLoading ? (
                  <div className="animate-pulse space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="bg-neutral p-4 rounded-lg">
                        <div className="h-4 bg-gray-200 rounded mb-2 w-24"></div>
                        <div className="h-16 bg-gray-200 rounded mb-2"></div>
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gray-200 rounded-full mr-2"></div>
                          <div className="h-4 bg-gray-200 rounded w-32"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : reviews.length > 0 ? (
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <TestimonialCard key={review.id} review={review} />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">This product has no reviews yet. Be the first to leave a review!</p>
                )}
                
                <div className="mt-8">
                  <h4 className="font-heading font-bold text-lg mb-4">Write a Review</h4>
                  <ReviewForm productId={product.id} />
                </div>
              </TabsContent>
              
              <TabsContent value="shipping" className="py-6">
                <h3 className="font-heading font-bold text-xl mb-4">Shipping Information</h3>
                <div className="text-gray-600 space-y-4">
                  <p>We want to ensure your handcrafted items reach you safely and promptly. Here's what you need to know about our shipping process:</p>
                  
                  <h4 className="font-bold mt-4 mb-2">Processing Time:</h4>
                  <p>Since our items are handmade, please allow 3-5 business days for processing before shipping. Customized items may require additional processing time.</p>
                  
                  <h4 className="font-bold mt-4 mb-2">Shipping Methods:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Standard Shipping (5-7 business days): $4.99</li>
                    <li>Expedited Shipping (2-3 business days): $9.99</li>
                    <li>Free standard shipping on orders over $50</li>
                  </ul>
                  
                  <h4 className="font-bold mt-4 mb-2">International Shipping:</h4>
                  <p>We currently ship to select international destinations. International shipping rates and delivery times vary by location.</p>
                  
                  <h4 className="font-bold mt-4 mb-2">Returns & Exchanges:</h4>
                  <p>We accept returns within 30 days of delivery. Custom orders cannot be returned unless damaged or defective. Please contact our customer service team to initiate a return or exchange.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
}
