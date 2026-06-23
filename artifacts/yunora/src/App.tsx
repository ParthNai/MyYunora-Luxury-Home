import React, { Suspense } from "react";
import { Switch, Route, Router as WouterRouter, useLocation, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/lib/auth";
import { isAdminLoggedIn } from "@/lib/adminAuth";

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

// Admin pages
const AdminLogin = React.lazy(() => import("@/pages/admin/AdminLogin"));
const AdminDashboard = React.lazy(() => import("@/pages/admin/AdminDashboard"));
const AdminProducts = React.lazy(() => import("@/pages/admin/AdminProducts"));
const AdminOrders = React.lazy(() => import("@/pages/admin/AdminOrders"));
const AdminCategories = React.lazy(() => import("@/pages/admin/AdminCategories"));
const AdminInventory = React.lazy(() => import("@/pages/admin/AdminInventory"));
const AdminSubscribers = React.lazy(() => import("@/pages/admin/AdminSubscribers"));
const AdminReviews = React.lazy(() => import("@/pages/admin/AdminReviews"));
const AdminEnquiries = React.lazy(() => import("@/pages/admin/AdminEnquiries"));
const AdminCMS = React.lazy(() => import("@/pages/admin/AdminCMS"));
const AdminAnalytics = React.lazy(() => import("@/pages/admin/AdminAnalytics"));
const AdminSettings = React.lazy(() => import("@/pages/admin/AdminSettings"));

const queryClient = new QueryClient();

function PageLoader() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-screen bg-white">
      <div className="h-8 w-8 rounded-full border-4 border-orange-400 border-t-transparent animate-spin" />
    </div>
  );
}

function ProtectedAdminRoute({ children }: { children: React.ReactNode }) {
  if (!isAdminLoggedIn()) {
    return <Redirect to="/admin" />;
  }
  return <>{children}</>;
}

function AdminRouter() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/admin" component={AdminLogin} />
        <Route path="/admin/dashboard">
          <ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>
        </Route>
        <Route path="/admin/products">
          <ProtectedAdminRoute><AdminProducts /></ProtectedAdminRoute>
        </Route>
        <Route path="/admin/orders">
          <ProtectedAdminRoute><AdminOrders /></ProtectedAdminRoute>
        </Route>
        <Route path="/admin/categories">
          <ProtectedAdminRoute><AdminCategories /></ProtectedAdminRoute>
        </Route>
        <Route path="/admin/inventory">
          <ProtectedAdminRoute><AdminInventory /></ProtectedAdminRoute>
        </Route>
        <Route path="/admin/subscribers">
          <ProtectedAdminRoute><AdminSubscribers /></ProtectedAdminRoute>
        </Route>
        <Route path="/admin/reviews">
          <ProtectedAdminRoute><AdminReviews /></ProtectedAdminRoute>
        </Route>
        <Route path="/admin/enquiries">
          <ProtectedAdminRoute><AdminEnquiries /></ProtectedAdminRoute>
        </Route>
        <Route path="/admin/cms">
          <ProtectedAdminRoute><AdminCMS /></ProtectedAdminRoute>
        </Route>
        <Route path="/admin/analytics">
          <ProtectedAdminRoute><AdminAnalytics /></ProtectedAdminRoute>
        </Route>
        <Route path="/admin/settings">
          <ProtectedAdminRoute><AdminSettings /></ProtectedAdminRoute>
        </Route>
      </Switch>
    </Suspense>
  );
}

function PublicRouter() {
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

function AppShell() {
  const [location] = useLocation();
  const isAdmin = location.startsWith("/admin");

  if (isAdmin) {
    return <AdminRouter />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Preloader />
      <OfferStrip />
      <Header />
      <AuthPopup />
      <main className="flex-1 flex flex-col">
        <PublicRouter />
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <AppShell />
          </WouterRouter>
          <Toaster />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
