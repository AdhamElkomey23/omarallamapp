import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { formatCurrency } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Plus, Filter } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { format } from "date-fns";

// Form schema for sales
const saleFormSchema = z.object({
  productId: z.coerce.number().min(1, "Please select a product"),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  saleDate: z.date({
    required_error: "Sale date is required",
  }),
});

type SaleFormValues = z.infer<typeof saleFormSchema>;

export default function Sales() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);

  // Fetch products for the dropdown
  const { data: products } = useQuery({
    queryKey: ['/api/products'],
    queryFn: () => apiRequest('/api/products')
  });

  // Fetch sales with optional date filter
  const { data: sales, isLoading } = useQuery({
    queryKey: ['/api/sales', dateFilter],
    queryFn: () => {
      const queryParams = dateFilter 
        ? `?startDate=${dateFilter.toISOString()}&endDate=${new Date(dateFilter.getTime() + 86400000).toISOString()}`
        : '';
      return apiRequest(`/api/sales${queryParams}`);
    }
  });

  const addSaleMutation = useMutation({
    mutationFn: (values: SaleFormValues & { totalAmount: number }) => 
      apiRequest('/api/sales', {
        method: 'POST',
        body: JSON.stringify(values)
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/sales'] });
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      queryClient.invalidateQueries({ queryKey: ['/api/dashboard'] });
      setIsAddDialogOpen(false);
    }
  });

  const form = useForm<SaleFormValues>({
    resolver: zodResolver(saleFormSchema),
    defaultValues: {
      productId: undefined,
      quantity: 1,
      saleDate: new Date(),
    }
  });

  function onSubmit(values: SaleFormValues) {
    const selectedProduct = products?.find((p: any) => p.id === values.productId);
    if (!selectedProduct) return;

    const totalAmount = selectedProduct.unitPrice * values.quantity;

    addSaleMutation.mutate({
      ...values,
      totalAmount
    });

    form.reset();
  }

  // Calculate total sales amount
  const totalSalesAmount = (sales || []).reduce((sum: number, sale: any) => sum + sale.totalAmount, 0);

  // Get the selected product for the form
  const selectedProductId = form.watch("productId");
  const selectedProduct = selectedProductId 
    ? products?.find((p: any) => p.id === Number(selectedProductId)) 
    : null;

  // Calculate estimated total based on current form values
  const quantity = form.watch("quantity") || 0;
  const estimatedTotal = selectedProduct ? selectedProduct.unitPrice * quantity : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Sales</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-1">
              <LuPlus className="h-4 w-4" />
              Record Sale
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Record New Sale</DialogTitle>
              <DialogDescription>
                Record a new product sale
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="productId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product</FormLabel>
                      <Select 
                        onValueChange={(value) => field.onChange(Number(value))}
                        defaultValue={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a product" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {products?.map((product: any) => (
                            <SelectItem 
                              key={product.id} 
                              value={product.id.toString()}
                            >
                              {product.name} (₹{product.unitPrice.toFixed(2)}) - {product.stockQuantity} in stock
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="1" 
                          max={selectedProduct?.stockQuantity || 999} 
                          {...field}
                        />
                      </FormControl>
                      {selectedProduct && (
                        <FormDescription>
                          Maximum available: {selectedProduct.stockQuantity}
                        </FormDescription>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="saleDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Sale Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className="w-full pl-3 text-left font-normal"
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {selectedProductId && (
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Sale Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>Product:</div>
                        <div className="font-medium">{selectedProduct?.name}</div>
                        <div>Unit Price:</div>
                        <div className="font-medium">{formatCurrency(selectedProduct?.unitPrice || 0)}</div>
                        <div>Quantity:</div>
                        <div className="font-medium">{quantity}</div>
                        <div className="text-base pt-2">Total:</div>
                        <div className="text-base font-bold pt-2">{formatCurrency(estimatedTotal)}</div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <DialogFooter>
                  <Button 
                    type="submit" 
                    disabled={addSaleMutation.isPending || (selectedProduct && quantity > selectedProduct.stockQuantity)}
                  >
                    {addSaleMutation.isPending ? "Recording..." : "Record Sale"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary card */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {sales?.length || 0} transactions
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalSalesAmount)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Date filter */}
      <div className="flex items-center space-x-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              size="sm"
            >
              <LuFilter className="h-4 w-4" />
              {dateFilter ? format(dateFilter, "PPP") : "Filter by Date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={dateFilter}
              onSelect={setDateFilter}
              initialFocus
            />
            {dateFilter && (
              <div className="border-t p-3 text-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDateFilter(undefined)}
                >
                  Clear Filter
                </Button>
              </div>
            )}
          </PopoverContent>
        </Popover>
      </div>

      {/* Sales Table */}
      <Card>
        <CardHeader>
          <CardTitle>Sales History</CardTitle>
          <CardDescription>
            {dateFilter 
              ? `Sales on ${format(dateFilter, "PPP")}` 
              : "View all sales transactions"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : sales && sales.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead className="text-right">Total Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sales.map((sale: any) => {
                  const product = products?.find((p: any) => p.id === sale.productId);
                  return (
                    <TableRow key={sale.id}>
                      <TableCell>
                        {new Date(sale.saleDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="font-medium">
                        {product?.name || `Product ID: ${sale.productId}`}
                      </TableCell>
                      <TableCell className="text-right">{sale.quantity}</TableCell>
                      <TableCell className="text-right">{formatCurrency(sale.totalAmount)}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No sales found</p>
              <Button
                variant="link"
                onClick={() => setIsAddDialogOpen(true)}
                className="mt-2"
              >
                Record your first sale
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}