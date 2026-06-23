import React, { useState } from 'react';
import { useCartStore } from '@/lib/store';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function Cart() {
  const [_, setLocation] = useLocation();
  const { items, updateQuantity, removeItem, getCartTotal } = useCartStore();
  const [coupon, setCoupon] = useState('');
  
  const subtotal = getCartTotal();
  const delivery = subtotal > 5000 || subtotal === 0 ? 0 : 500;
  const total = subtotal + delivery;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-gray-400">
          <ShoppingBag className="h-10 w-10" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
        <p className="text-gray-500 mb-8 max-w-md">Looks like you haven't added any luxury items to your cart yet.</p>
        <Link href="/shop">
          <Button size="lg" className="rounded-xl px-8 h-14 text-base">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6">
              {items.map((item, index) => (
                <div key={`${item.productId}-${item.size}-${item.color}`} className="flex flex-col sm:flex-row items-center gap-6 py-6 border-b border-gray-100 last:border-0 last:pb-0 first:pt-0">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0 border border-gray-100">
                    {/* Placeholder for image since cart store only saves ID and basic info right now */}
                    <img src={`https://via.placeholder.com/200?text=Product+${item.productId}`} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-1 flex flex-col sm:flex-row justify-between w-full">
                    <div className="mb-4 sm:mb-0">
                      <h3 className="font-semibold text-gray-900 text-lg mb-1"><Link href={`/products/${item.productId}`} className="hover:text-primary transition-colors">{item.name}</Link></h3>
                      <div className="text-sm text-gray-500 space-y-1">
                        {item.size && <p>Size: {item.size}</p>}
                        {item.color && <p>Color: {item.color}</p>}
                      </div>
                      <div className="font-bold text-primary text-lg mt-2">₹{item.price.toLocaleString('en-IN')}</div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="flex items-center border border-gray-200 rounded-xl h-10 w-28 bg-white">
                        <button onClick={() => updateQuantity(item.productId, item.quantity - 1, item.size, item.color)} className="flex-1 flex justify-center text-gray-500 hover:text-primary"><Minus className="h-3 w-3" /></button>
                        <span className="font-semibold text-sm w-8 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.productId, item.quantity + 1, item.size, item.color)} className="flex-1 flex justify-center text-gray-500 hover:text-primary"><Plus className="h-3 w-3" /></button>
                      </div>
                      <button 
                        onClick={() => removeItem(item.productId, item.size, item.color)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-2"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-gray-50 rounded-[24px] p-6 lg:p-8 sticky top-28">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal ({items.reduce((a, b) => a + b.quantity, 0)} items)</span>
                <span className="font-medium">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Delivery</span>
                {delivery === 0 ? (
                  <span className="text-green-600 font-medium">Free</span>
                ) : (
                  <span className="font-medium">₹{delivery.toLocaleString('en-IN')}</span>
                )}
              </div>
              {delivery > 0 && (
                <div className="text-xs text-primary bg-primary/10 p-2 rounded-lg text-center mt-2">
                  Add ₹{(5000 - subtotal).toLocaleString('en-IN')} more for free delivery
                </div>
              )}
            </div>
            
            <Separator className="mb-6 bg-gray-200" />
            
            <div className="flex justify-between items-center mb-8">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-primary">₹{total.toLocaleString('en-IN')}</span>
            </div>

            <div className="mb-8">
              <p className="text-sm font-medium mb-3 text-gray-700">Have a coupon code?</p>
              <div className="flex gap-2">
                <Input 
                  value={coupon} 
                  onChange={(e) => setCoupon(e.target.value)} 
                  placeholder="Enter code" 
                  className="bg-white border-gray-200 rounded-xl"
                />
                <Button variant="outline" className="rounded-xl">Apply</Button>
              </div>
            </div>

            <Button 
              onClick={() => setLocation('/checkout')} 
              size="lg" 
              className="w-full h-14 rounded-xl text-base bg-primary hover:bg-primary/90 text-white shadow-md"
              data-testid="btn-checkout"
            >
              Proceed to Checkout <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <div className="mt-6 flex justify-center">
              <p className="text-xs text-gray-400 text-center max-w-[250px]">Secure checkout powered by Razorpay. All major credit cards & UPI accepted.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
