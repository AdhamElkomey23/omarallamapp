import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { formatCurrency } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BarChart, Package, ShoppingCart } from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams();
  const productId = parseInt(id);
  
  // Fetch product details
  const { data: product, isLoading: productLoading } = useQuery({
    queryKey: ['/api/products', productId],
    queryFn: () => apiRequest(`/api/products/${productId}`),
    enabled: !isNaN(productId)
  });
  
  // Fetch sales for this product
  const { data: productSales, isLoading: salesLoading } = useQuery({
    queryKey: ['/api/sales/product', productId],
    queryFn: () => apiRequest(`/api/sales/product/${productId}`),
    enabled: !isNaN(productId)
  });
  
  const isLoading = productLoading || salesLoading;
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-4">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <p className="text-muted-foreground">The product you're looking for doesn't exist or has been deleted.</p>
        <Button asChild>
          <Link href="/products">Back to Products</Link>
        </Button>
      </div>
    );
  }
  
  // Calculate total sales and revenue
  const sales = productSales || [];
  const totalSold = sales.reduce((sum: number, sale: any) => sum + sale.quantity, 0);
  const totalRevenue = sales.reduce((sum: number, sale: any) => sum + sale.totalAmount, 0);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
        <Button variant="outline" asChild>
          <Link href="/products" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* Product Information */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Package className="h-8 w-8 text-primary" />
            </div>
            <div>
              <CardTitle>Product Details</CardTitle>
              <CardDescription>
                Basic information about this product
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Unit Price</dt>
                <dd className="text-lg font-bold">{formatCurrency(product.unitPrice)}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Stock Quantity</dt>
                <dd className="text-lg font-bold">{product.stockQuantity} units</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Stock Value</dt>
                <dd className="text-lg font-bold">{formatCurrency(product.unitPrice * product.stockQuantity)}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Created On</dt>
                <dd className="text-base">{new Date(product.createdAt).toLocaleDateString()}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-sm font-medium text-muted-foreground">Product ID</dt>
                <dd className="text-base font-mono">{product.id}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
        
        {/* Sales Information */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="bg-green-100 p-3 rounded-full">
              <BarChart className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <CardTitle>Sales Performance</CardTitle>
              <CardDescription>
                Revenue and sales statistics
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Total Units Sold</dt>
                <dd className="text-lg font-bold">{totalSold} units</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Total Revenue</dt>
                <dd className="text-lg font-bold text-green-600">{formatCurrency(totalRevenue)}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Number of Transactions</dt>
                <dd className="text-lg font-bold">{sales.length}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Average Sale Amount</dt>
                <dd className="text-lg font-bold">
                  {sales.length > 0 
                    ? formatCurrency(totalRevenue / sales.length) 
                    : formatCurrency(0)
                  }
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Sales Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Recent Sales
          </CardTitle>
          <CardDescription>
            Recent transactions for this product
          </CardDescription>
        </CardHeader>
        <CardContent>
          {sales.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-2 text-left font-medium">Date</th>
                    <th className="px-4 py-2 text-right font-medium">Quantity</th>
                    <th className="px-4 py-2 text-right font-medium">Amount</th>
                    <th className="px-4 py-2 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sales.slice(0, 5).map((sale: any) => (
                    <tr key={sale.id} className="border-b hover:bg-muted/50">
                      <td className="px-4 py-2">
                        {new Date(sale.saleDate).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2 text-right">{sale.quantity}</td>
                      <td className="px-4 py-2 text-right">{formatCurrency(sale.totalAmount)}</td>
                      <td className="px-4 py-2 text-right">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/sales/${sale.id}`}>
                            View
                          </Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-muted-foreground">No sales records found for this product.</p>
              <Button variant="link" asChild className="mt-2">
                <Link href="/sales">
                  Record a sale
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-2">
        <Button asChild className="sm:w-auto">
          <Link href={`/sales/new?productId=${productId}`} className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            Record Sale
          </Link>
        </Button>
        <Button variant="outline" asChild className="sm:w-auto">
          <Link href={`/products/edit/${productId}`} className="flex items-center gap-2">
            Edit Product
          </Link>
        </Button>
      </div>
    </div>
  );
}