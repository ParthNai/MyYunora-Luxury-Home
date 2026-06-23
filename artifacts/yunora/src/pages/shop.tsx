import React, { useState } from 'react';
import { useListProducts } from '@workspace/api-client-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, Filter, Star, ArrowRight, SlidersHorizontal } from 'lucide-react';
import { useCartStore, useWishlistStore } from '@/lib/store';
import { motion } from 'framer-motion';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { getProductImages } from '@/lib/images';
import { cn } from '@/lib/utils';

const CATEGORIES = [
  { id: undefined, label: 'All Products' },
  { id: 'mattresses', label: 'Mattresses' },
  { id: 'pillows', label: 'Pillows' },
  { id: 'sofas', label: 'Sofas' },
  { id: 'curtains', label: 'Curtains' },
  { id: 'bean-bags', label: 'Bean Bags' },
];

const SORT_OPTIONS = [
  { id: 'popular', label: 'Most Popular' },
  { id: 'newest', label: 'Newest Arrivals' },
  { id: 'price_asc', label: 'Price: Low to High' },
  { id: 'price_desc', label: 'Price: High to Low' },
] as const;

export default function Shop() {
  const searchParams = new URLSearchParams(window.location.search);
  const initCategory = searchParams.get('category') || undefined;
  const searchString = searchParams.get('search') || undefined;

  const [category, setCategory] = useState<string | undefined>(initCategory);
  const [sort, setSort] = useState<'price_asc' | 'price_desc' | 'newest' | 'popular' | undefined>(undefined);

  const { data: products, isLoading } = useListProducts({ category, search: searchString, sort });
  const addToCart = useCartStore(state => state.addItem);
  const toggleWishlist = useWishlistStore(state => state.toggleItem);
  const isInWishlist = useWishlistStore(state => state.isInWishlist);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-8 lg:py-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <p className="text-primary font-semibold text-xs uppercase tracking-widest mb-1">Yunora Collection</p>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                {category ? CATEGORIES.find(c => c.id === category)?.label ?? 'Products' : 'All Products'}
              </h1>
              {!isLoading && <p className="text-gray-500 mt-1 text-sm">{products?.length ?? 0} products found</p>}
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="gap-2 rounded-xl border-gray-200 h-11 flex-1 md:flex-none">
                    <SlidersHorizontal className="h-4 w-4" />
                    Filters & Sort
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-80">
                  <SheetHeader>
                    <SheetTitle>Filter Products</SheetTitle>
                  </SheetHeader>
                  <div className="py-6 space-y-8">
                    <div>
                      <h3 className="font-semibold mb-4 text-gray-900">Category</h3>
                      <div className="flex flex-col gap-2">
                        {CATEGORIES.map((cat) => (
                          <button
                            key={String(cat.id)}
                            onClick={() => setCategory(cat.id)}
                            className={cn(
                              'text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all',
                              category === cat.id
                                ? 'bg-primary text-white shadow-sm'
                                : 'bg-gray-50 text-gray-700 hover:bg-primary/10 hover:text-primary'
                            )}
                          >
                            {cat.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-4 text-gray-900">Sort By</h3>
                      <div className="flex flex-col gap-2">
                        {SORT_OPTIONS.map((opt) => (
                          <button
                            key={opt.id}
                            onClick={() => setSort(opt.id)}
                            className={cn(
                              'text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all',
                              sort === opt.id
                                ? 'bg-primary text-white shadow-sm'
                                : 'bg-gray-50 text-gray-700 hover:bg-primary/10 hover:text-primary'
                            )}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Category pills */}
          <div className="flex items-center gap-2 mt-6 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={String(cat.id)}
                onClick={() => setCategory(cat.id)}
                className={cn(
                  'px-4 py-1.5 rounded-full text-sm font-medium border transition-all',
                  category === cat.id
                    ? 'bg-primary text-white border-primary shadow-sm'
                    : 'border-gray-200 text-gray-600 hover:border-primary hover:text-primary bg-white'
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-10">
        {isLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-3xl bg-white h-[420px] animate-pulse border border-gray-100" />
            ))}
          </div>
        ) : products?.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-gray-100">
            <div className="text-6xl text-gray-200 mb-4">◻</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No products found</h2>
            <p className="text-gray-500 mb-6">Try clearing your filters or search terms.</p>
            <Button onClick={() => { setCategory(undefined); setSort(undefined); }} className="rounded-xl">
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {products?.map((product, i) => {
              const imgs = getProductImages(product.images as string[]);
              const img = imgs[0];
              const inWish = isInWishlist(product.id);
              const discount = product.originalPrice
                ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.04, 0.3) }}
                  className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-400 hover:-translate-y-1 flex flex-col"
                >
                  <Link href={`/products/${product.id}`} className="block relative overflow-hidden bg-gray-50" style={{ aspectRatio: '1/1' }}>
                    {img ? (
                      <img src={img} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center">
                        <span className="text-gray-300 text-5xl">◻</span>
                      </div>
                    )}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      {discount > 0 && (
                        <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">-{discount}%</span>
                      )}
                    </div>
                    {product.badge && (
                      <div className="absolute top-3 right-3 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow" style={{ background: 'linear-gradient(135deg,#FF7A4D,#e85f2a)' }}>
                        {product.badge}
                      </div>
                    )}
                    <button
                      onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
                      className={cn(
                        'absolute bottom-3 right-3 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-sm shadow-lg transition-all',
                        inWish ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-400 hover:text-red-400 opacity-0 group-hover:opacity-100'
                      )}
                    >
                      <Heart className="h-4 w-4" fill={inWish ? 'currentColor' : 'none'} />
                    </button>
                  </Link>

                  <div className="p-4 flex flex-col flex-1">
                    <Link href={`/products/${product.id}`}>
                      <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-1 group-hover:text-primary transition-colors line-clamp-2">{product.name}</h3>
                    </Link>
                    <p className="text-xs text-gray-400 font-medium mb-2">{product.category}</p>
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, s) => (
                        <Star key={s} className={`h-3 w-3 ${s < Math.round(Number(product.rating)) ? 'fill-amber-400 text-amber-400' : 'fill-gray-100 text-gray-100'}`} />
                      ))}
                      <span className="text-[10px] text-gray-400 ml-1">({product.reviewCount})</span>
                    </div>
                    <div className="flex items-baseline gap-1.5 mb-4 mt-auto">
                      <span className="text-lg font-bold text-primary">₹{product.price.toLocaleString('en-IN')}</span>
                      {product.originalPrice && (
                        <span className="text-xs text-gray-400 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                      )}
                    </div>
                    <Button
                      onClick={() => addToCart({ productId: product.id, name: product.name, price: product.price, quantity: 1 })}
                      className="w-full rounded-xl font-semibold h-10 text-sm shadow-sm"
                      style={{ background: 'linear-gradient(135deg, #FF7A4D, #e85f2a)' }}
                    >
                      <ShoppingCart className="mr-1.5 h-3.5 w-3.5" />
                      Add to Cart
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
