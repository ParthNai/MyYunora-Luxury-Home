import React, { Suspense } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/lib/auth";

import { Preloader } from "@/components/layout/Preloader";
import { OfferStrip } from "@/components/layout/OfferStrip";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { AuthPopup } from "@/components/layout/AuthPopup";
import NotFound from "@/pages/not-found";

const Home = React.lazy(() => import("@/pages/home"));
const Shop = React.lazy(() => import("@/pages/shop"));
const ProductDetail = React.lazy(() => import("@/pages/product-detail"));
const Categories = React.lazy(() => import("@/pages/categories"));
const About = React.lazy(() => import("@/pages/about"));
const Contact = React.lazy(() => import("@/pages/contact"));
const Cart = React.lazy(() => import("@/pages/cart"));
const Wishlist = React.lazy(() => import("@/pages/wishlist"));
const Checkout = React.lazy(() => import("@/pages/checkout"));
const Profile = React.lazy(() => import("@/pages/profile"));
const Login = React.lazy(() => import("@/pages/login"));
const Signup = React.lazy(() => import("@/pages/signup"));
const WarrantyHub = React.lazy(() => import("@/pages/warranty/index"));
const WarrantyRegister = React.lazy(() => import("@/pages/warranty/register"));
const WarrantyPolicy = React.lazy(() => import("@/pages/warranty/policy"));
const WarrantyTerms = React.lazy(() => import("@/pages/warranty/terms"));
const WarrantyClaim = React.lazy(() => import("@/pages/warranty/claim"));

const queryClient = new QueryClient();

function PageLoader() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[50vh]">
      <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/shop" component={Shop} />
        <Route path="/products/:id" component={ProductDetail} />
        <Route path="/categories" component={Categories} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/cart" component={Cart} />
        <Route path="/wishlist" component={Wishlist} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/profile" component={Profile} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/warranty" component={WarrantyHub} />
        <Route path="/warranty/register" component={WarrantyRegister} />
        <Route path="/warranty/policy" component={WarrantyPolicy} />
        <Route path="/warranty/terms" component={WarrantyTerms} />
        <Route path="/warranty/claim" component={WarrantyClaim} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <div className="flex flex-col min-h-screen bg-background">
              <Preloader />
              <OfferStrip />
              <Header />
              <AuthPopup />
              <main className="flex-1 flex flex-col">
                <Router />
              </main>
              <Footer />
              <BottomNav />
            </div>
          </WouterRouter>
          <Toaster />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
