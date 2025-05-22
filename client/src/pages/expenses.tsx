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
import { 
  Plus, 
  Filter, 
  CalendarIcon,
  PieChart
} from "lucide-react";
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
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip
} from "recharts";

// Expense categories
const EXPENSE_CATEGORIES = [
  "Utilities",
  "Salaries",
  "Maintenance",
  "RawMaterials",
  "Transportation",
  "Other"
];

// Colors for the pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD', '#FF6B6B'];

// Form schema for expenses
const expenseFormSchema = z.object({
  name: z.string().min(1, "Expense name is required"),
  amount: z.coerce.number().min(0.01, "Amount must be greater than 0"),
  category: z.string().min(1, "Category is required"),
  expenseDate: z.date({
    required_error: "Expense date is required",
  }),
});

type ExpenseFormValues = z.infer<typeof expenseFormSchema>;

export default function Expenses() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [dateFilter, setDateFilter] = useState<{startDate?: Date, endDate?: Date}>({});
  const [categoryFilter, setCategoryFilter] = useState<string | undefined>(undefined);

  // Fetch expenses with filters
  const { data: expenses, isLoading } = useQuery({
    queryKey: ['/api/expenses', dateFilter, categoryFilter],
    queryFn: () => {
      let queryParams = '';
      const params = new URLSearchParams();
      
      if (dateFilter.startDate) {
        params.append('startDate', dateFilter.startDate.toISOString());
      }
      
      if (dateFilter.endDate) {
        params.append('endDate', dateFilter.endDate.toISOString());
      }
      
      if (categoryFilter) {
        params.append('category', categoryFilter);
      }
      
      if (params.toString()) {
        queryParams = `?${params.toString()}`;
      }
      
      return apiRequest(`/api/expenses${queryParams}`);
    }
  });

  const addExpenseMutation = useMutation({
    mutationFn: (values: ExpenseFormValues) => 
      apiRequest('/api/expenses', {
        method: 'POST',
        body: JSON.stringify(values)
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/expenses'] });
      queryClient.invalidateQueries({ queryKey: ['/api/dashboard'] });
      setIsAddDialogOpen(false);
    }
  });

  const form = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseFormSchema),
    defaultValues: {
      name: "",
      amount: 0,
      category: "",
      expenseDate: new Date(),
    }
  });

  function onSubmit(values: ExpenseFormValues) {
    addExpenseMutation.mutate(values);
    form.reset();
  }

  // Calculate totals and prepare chart data
  const totalExpenseAmount = (expenses || []).reduce((sum: number, expense: any) => sum + expense.amount, 0);
  
  // Group expenses by category for the pie chart
  const expensesByCategory = (expenses || []).reduce((acc: Record<string, number>, expense: any) => {
    if (!acc[expense.category]) {
      acc[expense.category] = 0;
    }
    acc[expense.category] += expense.amount;
    return acc;
  }, {});
  
  const pieChartData = Object.entries(expensesByCategory).map(([name, value]) => ({ name, value }));

  // Handle date range filter
  const handleDateRangeSelect = (range: { from?: Date; to?: Date }) => {
    setDateFilter({
      startDate: range.from,
      endDate: range.to
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setDateFilter({});
    setCategoryFilter(undefined);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Expenses</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-1">
              <LuPlus className="h-4 w-4" />
              Add Expense
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Expense</DialogTitle>
              <DialogDescription>
                Record a new expense
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expense Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Electricity Bill" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount (₹)</FormLabel>
                      <FormControl>
                        <Input type="number" min="0.01" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select 
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {EXPENSE_CATEGORIES.map(category => (
                            <SelectItem key={category} value={category}>
                              {category}
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
                  name="expenseDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Expense Date</FormLabel>
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
                              <LuCalendar className="ml-auto h-4 w-4 opacity-50" />
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

                <DialogFooter>
                  <Button type="submit" disabled={addExpenseMutation.isPending}>
                    {addExpenseMutation.isPending ? "Adding..." : "Add Expense"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary and Chart */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalExpenseAmount)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              From {expenses?.length || 0} transactions
            </p>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <LuPieChart className="mr-2 h-4 w-4" />
              Expense Breakdown
            </CardTitle>
            <CardDescription>
              Distribution by category
            </CardDescription>
          </CardHeader>
          <CardContent>
            {pieChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    labelLine={false}
                    label={({ name, percent }) => 
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]} 
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => formatCurrency(value as number)} 
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex justify-center items-center h-[200px] text-muted-foreground">
                No expense data to display
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              size="sm"
            >
              <LuCalendar className="h-4 w-4" />
              {dateFilter.startDate && dateFilter.endDate
                ? `${format(dateFilter.startDate, "MMM d")} - ${format(dateFilter.endDate, "MMM d, yyyy")}`
                : dateFilter.startDate
                ? `From ${format(dateFilter.startDate, "MMM d, yyyy")}`
                : dateFilter.endDate
                ? `Until ${format(dateFilter.endDate, "MMM d, yyyy")}`
                : "Date Range"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="range"
              selected={{
                from: dateFilter.startDate,
                to: dateFilter.endDate
              }}
              onSelect={handleDateRangeSelect}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Select 
          value={categoryFilter || ""} 
          onValueChange={(value) => setCategoryFilter(value || undefined)}
        >
          <SelectTrigger className="h-9 w-[180px]">
            <SelectValue placeholder="Filter by Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Categories</SelectItem>
            {EXPENSE_CATEGORIES.map(category => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {(dateFilter.startDate || dateFilter.endDate || categoryFilter) && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearFilters}
          >
            Clear Filters
          </Button>
        )}
      </div>

      {/* Expenses Table */}
      <Card>
        <CardHeader>
          <CardTitle>Expense History</CardTitle>
          <CardDescription>
            {categoryFilter 
              ? `Filtered by category: ${categoryFilter}`
              : "All expense transactions"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : expenses && expenses.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenses.map((expense: any) => (
                  <TableRow key={expense.id}>
                    <TableCell>
                      {new Date(expense.expenseDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="font-medium">
                      {expense.name}
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700">
                        {expense.category}
                      </span>
                    </TableCell>
                    <TableCell className="text-right text-red-600">
                      {formatCurrency(expense.amount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No expenses found</p>
              <Button
                variant="link"
                onClick={() => setIsAddDialogOpen(true)}
                className="mt-2"
              >
                Add your first expense
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}