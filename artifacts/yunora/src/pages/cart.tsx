import React, { useState } from 'react';
import { useCartStore } from '@/lib/store';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Shield, Truck, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Cart() {
  const [_, setLocation] = useLocation();
  const { items, updateQuantity, removeItem, getCartTotal } = useCartStore();
  const [coupon, setCoupon] = useState('');

  const subtotal = getCartTotal();
  const delivery = subtotal > 5000 || subtotal === 0 ? 0 : 500;
  const total = subtotal + delivery;
  const freeDeliveryRemaining = Math.max(0, 5000 - subtotal);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20 max-w-sm"
        >
          <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl border border-gray-100">
            <ShoppingBag className="h-14 w-14 text-gray-200" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Your Cart is Empty</h1>
          <p className="text-gray-500 mb-8 leading-relaxed">Looks like you haven't added any luxury items to your cart yet.</p>
          <Link href="/shop">
            <Button size="lg" className="rounded-2xl px-10 h-14 font-semibold text-base shadow-lg" style={{ background: 'linear-gradient(135deg, #FF7A4D, #e85f2a)' }}>
              Continue Shopping
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-500 mt-1 text-sm">{items.reduce((a, b) => a + b.quantity, 0)} items in your cart</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 lg:py-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Cart Items */}
          <div className="lg:w-[60%]">
            {/* Free delivery banner */}
            {freeDeliveryRemaining > 0 && (
              <div className="bg-primary/5 border border-primary/10 rounded-2xl px-5 py-3.5 mb-5 flex items-center gap-3">
                <Truck className="h-5 w-5 text-primary flex-shrink-0" />
                <p className="text-sm text-gray-700">
                  Add <span className="font-bold text-primary">₹{freeDeliveryRemaining.toLocaleString('en-IN')}</span> more for free delivery
                </p>
              </div>
            )}

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <AnimatePresence>
                {items.map((item, index) => (
                  <motion.div
                    key={`${item.productId}-${item.size}-${item.color}`}
                    initial={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex items-center gap-5 p-5 ${index < items.length - 1 ? 'border-b border-gray-100' : ''}`}
                  >
                    {/* Product image placeholder */}
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl overflow-hidden flex-shrink-0 border border-gray-100 flex items-center justify-center">
                      <span className="text-gray-300 text-2xl font-bold">{item.name.charAt(0)}</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <Link href={`/products/${item.productId}`}>
                        <h3 className="font-semibold text-gray-900 text-base hover:text-primary transition-colors line-clamp-2 leading-snug">{item.name}</h3>
                      </Link>
                      <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-1.5 text-xs text-gray-400">
                        {item.size && <span>Size: {item.size}</span>}
                        {item.color && <span>Color: {item.color}</span>}
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-lg font-bold text-primary">₹{item.price.toLocaleString('en-IN')}</span>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden h-9">
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity - 1, item.size ?? undefined, item.color ?? undefined)}
                              className="w-9 h-9 flex items-center justify-center text-gray-500 hover:text-primary hover:bg-gray-50 transition-colors"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-8 text-center font-semibold text-sm">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity + 1, item.size ?? undefined, item.color ?? undefined)}
                              className="w-9 h-9 flex items-center justify-center text-gray-500 hover:text-primary hover:bg-gray-50 transition-colors"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.productId, item.size ?? undefined, item.color ?? undefined)}
                            className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all"
                            aria-label="Remove"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-[40%]">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7 lg:sticky lg:top-28">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-3.5 mb-6 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({items.reduce((a, b) => a + b.quantity, 0)} items)</span>
                  <span className="font-semibold text-gray-900">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Charges</span>
                  {delivery === 0 ? (
                    <span className="font-semibold text-emerald-600">Free</span>
                  ) : (
                    <span className="font-semibold text-gray-900">₹{delivery.toLocaleString('en-IN')}</span>
                  )}
                </div>
              </div>

              <div className="h-px bg-gray-100 mb-5" />

              <div className="flex justify-between items-center mb-7">
                <span className="text-base font-bold text-gray-900">Total Amount</span>
                <span className="text-2xl font-bold text-primary">₹{total.toLocaleString('en-IN')}</span>
              </div>

              {/* Coupon */}
              <div className="mb-7">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      placeholder="Coupon code"
                      className="pl-9 rounded-xl h-11 border-gray-200 bg-gray-50 focus-visible:bg-white"
                    />
                  </div>
                  <Button variant="outline" className="rounded-xl h-11 px-5 border-gray-200 font-semibold">Apply</Button>
                </div>
              </div>

              <Button
                onClick={() => setLocation('/checkout')}
                size="lg"
                className="w-full h-14 rounded-2xl text-base font-bold shadow-lg mb-4"
                style={{ background: 'linear-gradient(135deg, #FF7A4D, #e85f2a)', boxShadow: '0 4px 20px rgba(255,122,77,0.35)' }}
              >
                Proceed to Checkout
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              {/* Trust signals */}
              <div className="flex items-center justify-center gap-5 mt-5">
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <Shield className="h-3.5 w-3.5 text-emerald-500" />
                  Secure Checkout
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <Truck className="h-3.5 w-3.5 text-primary" />
                  Fast Delivery
                </div>
              </div>
              <p className="text-xs text-gray-400 text-center mt-3">UPI, Net Banking, Credit & Debit Cards accepted</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
