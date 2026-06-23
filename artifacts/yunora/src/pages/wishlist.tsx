import React from 'react';
import { useWishlistStore, useCartStore } from '@/lib/store';
import { useGetProduct, getGetProductQueryKey } from '@workspace/api-client-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, Trash2, ArrowRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { getProductImages } from '@/lib/images';

function WishlistItem({ id }: { id: number }) {
  const { data: product, isLoading } = useGetProduct(id, {
    query: { enabled: !!id, queryKey: getGetProductQueryKey(id) }
  });
  const toggleWishlist = useWishlistStore(state => state.toggleItem);
  const addToCart = useCartStore(state => state.addItem);

  if (isLoading) return (
    <div className="rounded-3xl bg-white border border-gray-100 overflow-hidden animate-pulse">
      <div className="aspect-square bg-gray-100" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-gray-100 rounded-full w-3/4" />
        <div className="h-4 bg-gray-100 rounded-full w-1/2" />
        <div className="h-10 bg-gray-100 rounded-xl" />
      </div>
    </div>
  );
  if (!product) return null;

  const imgs = getProductImages(product.images as string[]);
  const img = imgs[0];
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="group bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-400 hover:-translate-y-1 flex flex-col"
    >
      <Link href={`/products/${product.id}`} className="block relative overflow-hidden bg-gray-50 aspect-square">
        {img ? (
          <img src={img} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center">
            <span className="text-gray-200 text-5xl">◻</span>
          </div>
        )}
        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-emerald-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">-{discount}%</div>
        )}
        <button
          onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
          className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white shadow-md transition-all"
          aria-label="Remove from wishlist"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm leading-snug mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, s) => (
            <Star key={s} className={`h-3 w-3 ${s < Math.round(Number(product.rating)) ? 'fill-amber-400 text-amber-400' : 'fill-gray-100 text-gray-100'}`} />
          ))}
        </div>
        <div className="flex items-baseline gap-2 mb-4 mt-auto">
          <span className="text-lg font-bold text-primary">₹{product.price.toLocaleString('en-IN')}</span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
          )}
        </div>
        <Button
          onClick={() => addToCart({ productId: product.id, name: product.name, price: product.price, quantity: 1 })}
          className="w-full rounded-xl h-11 font-semibold text-sm"
          style={{ background: 'linear-gradient(135deg, #FF7A4D, #e85f2a)' }}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Move to Cart
        </Button>
      </div>
    </motion.div>
  );
}

export default function Wishlist() {
  const { items } = useWishlistStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <Heart className="h-6 w-6 text-primary fill-primary" />
                <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
              </div>
              <p className="text-gray-500 text-sm">{items.length} saved item{items.length !== 1 ? 's' : ''}</p>
            </div>
            {items.length > 0 && (
              <Link href="/shop">
                <Button variant="outline" className="rounded-xl border-gray-200 gap-2 hidden sm:flex">
                  Continue Shopping <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-3xl border border-gray-100 shadow-sm"
          >
            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6">
              <Heart className="h-12 w-12 text-red-200" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Your wishlist is empty</h2>
            <p className="text-gray-500 max-w-sm mb-8">Save the products you love and come back to them anytime.</p>
            <Link href="/shop">
              <Button size="lg" className="rounded-2xl px-10 h-13 font-semibold" style={{ background: 'linear-gradient(135deg, #FF7A4D, #e85f2a)' }}>
                Discover Products
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {items.map(id => <WishlistItem key={id} id={id} />)}
          </div>
        )}
      </div>
    </div>
  );
}
