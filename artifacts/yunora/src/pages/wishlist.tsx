import React from 'react';
import { useWishlistStore, useCartStore } from '@/lib/store';
import { useGetProduct, getGetProductQueryKey } from '@workspace/api-client-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';

function WishlistItem({ id }: { id: number }) {
  const { data: product, isLoading } = useGetProduct(id, { 
    query: { enabled: !!id, queryKey: getGetProductQueryKey(id) } 
  });
  
  const toggleWishlist = useWishlistStore(state => state.toggleItem);
  const addToCart = useCartStore(state => state.addItem);

  if (isLoading) return <div className="rounded-[18px] border border-gray-100 p-4 h-[300px] bg-gray-50 animate-pulse" />;
  if (!product) return null;

  return (
    <div className="group rounded-[18px] border border-gray-100 bg-white overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col">
      <Link href={`/products/${product.id}`} className="block relative aspect-square overflow-hidden bg-gray-50">
        <img 
          src={product.images[0] || 'https://via.placeholder.com/400'} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <button
          onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
          className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-red-500 hover:bg-white transition-colors shadow-sm z-10"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-gray-900 truncate mb-1 group-hover:text-primary transition-colors">{product.name}</h3>
        </Link>
        <div className="font-bold text-lg text-primary mb-4">₹{product.price}</div>
        
        <Button 
          onClick={() => addToCart({ productId: product.id, name: product.name, price: product.price, quantity: 1 })}
          className="w-full rounded-xl bg-gray-900 hover:bg-gray-800 text-white mt-auto"
        >
          <ShoppingCart className="mr-2 h-4 w-4" /> Move to Cart
        </Button>
      </div>
    </div>
  );
}

export default function Wishlist() {
  const { items } = useWishlistStore();

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12 min-h-[60vh]">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <Heart className="h-8 w-8 text-primary fill-primary" /> My Wishlist
        </h1>
        <span className="text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full">{items.length} Items</span>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100">
          <Heart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-semibold mb-2 text-gray-900">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-8 max-w-sm mx-auto">Save items you love here and buy them later.</p>
          <Link href="/shop">
            <Button size="lg" className="rounded-xl px-8">Discover Products</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map(id => (
            <WishlistItem key={id} id={id} />
          ))}
        </div>
      )}
    </div>
  );
}
