import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/providers/cart-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import Home from "@/pages/home";
import ProductDetail from "@/pages/product-detail";
import Categories from "@/pages/categories";
import Cart from "@/pages/cart";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home}/>
      <Route path="/product/:id" component={ProductDetail}/>
      <Route path="/categories" component={Categories}/>
      <Route path="/categories/:slug" component={Categories}/>
      <Route path="/cart" component={Cart}/>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <Toaster />
          <Navbar />
          <main>
            <Router />
          </main>
          <Footer />
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
