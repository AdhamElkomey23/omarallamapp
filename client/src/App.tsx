import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";
import Dashboard from "@/pages/dashboard";
import Products from "@/pages/products";
import ProductDetail from "@/pages/product-detail";
import Sales from "@/pages/sales";
import SaleDetail from "@/pages/sale-detail";
import Expenses from "@/pages/expenses";
import ExpenseDetail from "@/pages/expense-detail";
import ActivityLogs from "@/pages/activity-logs";
import ActivityLogDetail from "@/pages/activity-log-detail";
import Settings from "@/pages/settings";
import Login from "@/pages/login";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard}/>
      <Route path="/dashboard" component={Dashboard}/>
      <Route path="/products" component={Products}/>
      <Route path="/products/:id" component={ProductDetail}/>
      <Route path="/sales" component={Sales}/>
      <Route path="/sales/:id" component={SaleDetail}/>
      <Route path="/expenses" component={Expenses}/>
      <Route path="/expenses/:id" component={ExpenseDetail}/>
      <Route path="/activity-logs" component={ActivityLogs}/>
      <Route path="/activity-logs/:id" component={ActivityLogDetail}/>
      <Route path="/settings" component={Settings}/>
      <Route path="/login" component={Login}/>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <div className="flex min-h-screen bg-gray-50">
          <Sidebar />
          <div className="flex-1">
            <Navbar />
            <main className="container mx-auto px-4 py-6">
              <Router />
            </main>
          </div>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
