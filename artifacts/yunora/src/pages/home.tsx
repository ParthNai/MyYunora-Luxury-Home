import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useListFeaturedProducts, useSubscribeNewsletter } from '@workspace/api-client-react';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, Heart } from 'lucide-react';
import { useCartStore, useWishlistStore } from '@/lib/store';

import heroBg from '@assets/e78948d9-787e-4d94-ba0f-dddc6690730c_1782191160787.jpg';
import mattressImg from '@assets/e5e0e026-5762-42f2-8179-798708c0be68_1782191177966.jpg';
import pillowImg from '@assets/acb04f3a-ff68-4f10-9573-8a352159e257_1782191208758.jpg';
import sofaImg from '@assets/eb59e23c-77b3-4e9e-aad6-36d4f319a4be_1782191151335.jpg';
import curtainImg from '@assets/7278f6a4-3588-4878-8043-12715e50fd5b_1782191234202.jpg';
import beanbagImg from '@assets/image_1782191247115.png';

export default function Home() {
  const { data: featuredProducts, isLoading } = useListFeaturedProducts();
  const subscribeNewsletter = useSubscribeNewsletter();
  const { toast } = useToast();
  
  const addToCart = useCartStore(state => state.addItem);
  const toggleWishlist = useWishlistStore(state => state.toggleItem);
  const isInWishlist = useWishlistStore(state => state.isInWishlist);

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    if (email) {
      subscribeNewsletter.mutate({ data: { email } }, {
        onSuccess: () => {
          toast({ title: 'Subscribed Successfully!', description: 'Thank you for subscribing.' });
          (e.target as HTMLFormElement).reset();
        },
        onError: () => {
          toast({ title: 'Subscription Failed', description: 'Please try again later.', variant: 'destructive' });
        }
      });
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroBg} alt="Yunora Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="container relative z-10 text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Crafting Luxury.<br/>Manufacturing Comfort.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto"
          >
            Premium Mattresses, Curtains, Sofas & Home Furnishings Since 2018
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/shop" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto text-base rounded-xl h-14 px-8 bg-primary hover:bg-primary/90 text-white" data-testid="hero-shop-now">
                Shop Now
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-base rounded-xl h-14 px-8 border-white text-white hover:bg-white/10" data-testid="hero-customize">
              Customize Product
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop By Category</h2>
            <p className="text-gray-600">Explore our premium range of home furnishings</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
            <CategoryCard href="/shop?category=mattresses" title="Mattresses" image={mattressImg} />
            <CategoryCard href="/shop?category=pillows" title="Pillows" image={pillowImg} />
            <CategoryCard href="/shop?category=sofas" title="Sofas" image={sofaImg} />
            <CategoryCard href="/shop?category=curtains" title="Curtains" image={curtainImg} />
            <CategoryCard href="/shop?category=bean-bags" title="Bean Bags" image={beanbagImg} />
            <CategoryCard href="/shop?category=bedsheets" title="Bedsheets" fallbackColor="bg-slate-200" />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-gray-600">Our most loved and highest rated products</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="rounded-2xl border border-gray-100 p-4 h-[400px] bg-gray-50 animate-pulse" />
              ))
            ) : (
              featuredProducts?.slice(0, 4).map((product) => (
                <div key={product.id} className="group rounded-[18px] border border-gray-100 bg-white overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <Link href={`/products/${product.id}`} className="block relative aspect-square overflow-hidden bg-gray-50">
                    <img 
                      src={product.images[0] || 'https://via.placeholder.com/400'} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    {product.originalPrice && (
                      <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                        SALE
                      </div>
                    )}
                  </Link>
                  <div className="p-5">
                    <Link href={`/products/${product.id}`}>
                      <h3 className="font-semibold text-gray-900 truncate mb-1">{product.name}</h3>
                    </Link>
                    <div className="flex items-center justify-between mt-3">
                      <div>
                        <span className="font-bold text-lg text-primary">₹{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-400 line-through ml-2">₹{product.originalPrice}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                      <Button 
                        onClick={() => addToCart({ productId: product.id, name: product.name, price: product.price, quantity: 1 })}
                        className="flex-1 rounded-xl"
                        data-testid={`btn-add-cart-${product.id}`}
                      >
                        Add to Cart
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => toggleWishlist(product.id)}
                        className={`rounded-xl flex-shrink-0 ${isInWishlist(product.id) ? 'text-red-500 border-red-200 bg-red-50' : ''}`}
                        data-testid={`btn-wishlist-${product.id}`}
                      >
                        <Heart className="h-5 w-5" fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="text-center mt-10">
            <Link href="/shop">
              <Button variant="outline" size="lg" className="rounded-xl px-8 h-12">View All Products</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Yunora</h2>
            <p className="text-gray-600">The Yunora promise of quality and trust</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center">
            {[
              { title: "Factory Direct Pricing", desc: "No middlemen, ever." },
              { title: "Premium Materials", desc: "Certified & highest quality." },
              { title: "Custom Sizes", desc: "Made to fit your home." },
              { title: "Pro Installation", desc: "Hassle-free setup." },
              { title: "Trusted Since 2018", desc: "Thousands of happy homes." }
            ].map((pillar, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary font-bold text-xl">
                  {i + 1}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{pillar.title}</h3>
                <p className="text-sm text-gray-500">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIyIiBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPjwvc3ZnPg==')] opacity-30" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Stay Updated with Yunora</h2>
            <p className="text-white/80 mb-8">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <Input 
                type="email" 
                name="email"
                placeholder="Enter your email address" 
                required
                className="h-14 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-xl px-6 flex-1 focus-visible:ring-white"
              />
              <Button type="submit" size="lg" className="h-14 rounded-xl px-8 bg-white text-primary hover:bg-gray-100">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

function CategoryCard({ href, title, image, fallbackColor }: { href: string, title: string, image?: string, fallbackColor?: string }) {
  return (
    <Link href={href} className="group relative rounded-2xl overflow-hidden aspect-[4/5] block bg-gray-100">
      {image ? (
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
      ) : (
        <div className={`w-full h-full ${fallbackColor}`} />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
        <h3 className="text-white font-medium text-lg">{title}</h3>
      </div>
    </Link>
  );
}
