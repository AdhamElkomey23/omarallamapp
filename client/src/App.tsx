import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "@/lib/queryClient";
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
import Workers from "@/pages/workers";
import ActivityLogs from "@/pages/activity-logs";
import Settings from "@/pages/settings";
import Login from "@/pages/login";
import NotFound from "@/pages/not-found";

function Router() {
  const [location] = useLocation();
  
  // If we're on the login page, don't show the sidebar or navbar
  const isLoginPage = location === "/login";
  
  return (
    <>
      {!isLoginPage && (
        <div className="flex min-h-screen bg-gray-50/80">
          <Sidebar />
          <div className="flex-1 flex flex-col min-w-0">
            <Navbar />
            <main className="flex-1 overflow-auto">
              <div className="container mx-auto px-3 py-4 md:px-6 md:py-6 max-w-7xl">
                <Switch>
                  <Route path="/" component={Dashboard}/>
                  <Route path="/dashboard" component={Dashboard}/>
                  <Route path="/products" component={Products}/>
                  <Route path="/products/:id" component={ProductDetail}/>
                  <Route path="/sales" component={Sales}/>
                  <Route path="/sales/:id" component={SaleDetail}/>
                  <Route path="/expenses" component={Expenses}/>
                  <Route path="/workers" component={Workers}/>
                  <Route path="/activity-logs" component={ActivityLogs}/>
                  <Route path="/settings" component={Settings}/>
                  <Route path="/:rest*" component={NotFound} />
                </Switch>
              </div>
            </main>
          </div>
        </div>
      )}
      
      {isLoginPage && (
        <Switch>
          <Route path="/login" component={Login}/>
        </Switch>
      )}
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
