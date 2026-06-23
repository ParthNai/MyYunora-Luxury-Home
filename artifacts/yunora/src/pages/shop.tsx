import React, { useState } from 'react';
import { useListProducts, getListProductsQueryKey } from '@workspace/api-client-react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, Filter, ChevronDown, Check } from 'lucide-react';
import { useCartStore, useWishlistStore } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export default function Shop() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const categoryParam = searchParams.get('category') || undefined;
  const searchString = searchParams.get('search') || undefined;

  const [category, setCategory] = useState<string | undefined>(categoryParam);
  const [sort, setSort] = useState<'price_asc' | 'price_desc' | 'newest' | 'popular' | undefined>(undefined);

  const { data: products, isLoading } = useListProducts({ category, search: searchString, sort });
  
  const addToCart = useCartStore(state => state.addItem);
  const toggleWishlist = useWishlistStore(state => state.toggleItem);
  const isInWishlist = useWishlistStore(state => state.isInWishlist);

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'mattresses', label: 'Mattresses' },
    { id: 'pillows', label: 'Pillows' },
    { id: 'sofas', label: 'Sofas' },
    { id: 'curtains', label: 'Curtains' },
    { id: 'bean-bags', label: 'Bean Bags' },
  ];

  const sortOptions = [
    { id: 'popular', label: 'Most Popular' },
    { id: 'newest', label: 'Newest Arrivals' },
    { id: 'price_asc', label: 'Price: Low to High' },
    { id: 'price_desc', label: 'Price: High to Low' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {category ? categories.find(c => c.id === category)?.label : 'All Products'}
            {searchString && ` - Search: "${searchString}"`}
          </h1>
          <p className="text-gray-500 mt-2">{products?.length || 0} products found</p>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex-1 md:flex-none rounded-xl" data-testid="btn-filter">
                <Filter className="mr-2 h-4 w-4" /> Filters
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="py-6 space-y-8">
                <div>
                  <h3 className="font-semibold mb-4">Categories</h3>
                  <RadioGroup value={category || 'all'} onValueChange={(val) => setCategory(val === 'all' ? undefined : val)}>
                    {categories.map((cat) => (
                      <div key={cat.id} className="flex items-center space-x-2 mb-3">
                        <RadioGroupItem value={cat.id} id={`cat-${cat.id}`} />
                        <Label htmlFor={`cat-${cat.id}`} className="cursor-pointer">{cat.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-4">Sort By</h3>
                  <RadioGroup value={sort || 'popular'} onValueChange={(val: any) => setSort(val)}>
                    {sortOptions.map((opt) => (
                      <div key={opt.id} className="flex items-center space-x-2 mb-3">
                        <RadioGroupItem value={opt.id} id={`sort-${opt.id}`} />
                        <Label htmlFor={`sort-${opt.id}`} className="cursor-pointer">{opt.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-[18px] border border-gray-100 p-4 h-[400px] bg-gray-50 animate-pulse" />
          ))}
        </div>
      ) : products?.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl">
          <h2 className="text-2xl font-semibold mb-2">No products found</h2>
          <p className="text-gray-500 mb-6">Try adjusting your filters or search terms.</p>
          <Button onClick={() => { setCategory(undefined); setSort(undefined); }} className="rounded-xl">
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products?.map((product) => (
            <div key={product.id} className="group rounded-[18px] border border-gray-100 bg-white overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
              <Link href={`/products/${product.id}`} className="block relative aspect-[4/5] overflow-hidden bg-gray-50">
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
                {product.badge && (
                  <div className="absolute top-3 right-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded-md">
                    {product.badge}
                  </div>
                )}
              </Link>
              <div className="p-5 flex flex-col flex-1">
                <Link href={`/products/${product.id}`} className="flex-1">
                  <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
                  <div className="text-sm text-gray-500 mb-2">{product.category}</div>
                </Link>
                <div className="mt-auto">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="font-bold text-xl text-primary">₹{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through ml-2">₹{product.originalPrice}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      onClick={() => addToCart({ productId: product.id, name: product.name, price: product.price, quantity: 1 })}
                      className="flex-1 rounded-xl bg-primary hover:bg-primary/90 text-white shadow-sm"
                      data-testid={`btn-add-cart-${product.id}`}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" /> Add
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => toggleWishlist(product.id)}
                      className={`rounded-xl flex-shrink-0 border-gray-200 ${isInWishlist(product.id) ? 'text-red-500 border-red-200 bg-red-50' : 'text-gray-500 hover:text-red-500'}`}
                      data-testid={`btn-wishlist-${product.id}`}
                    >
                      <Heart className="h-5 w-5" fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
