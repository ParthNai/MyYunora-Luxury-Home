import React, { useState } from 'react';
import { useLocation, Link } from 'wouter';
import { useCartStore } from '@/lib/store';
import { useAuth } from '@/lib/auth';
import { useCreateOrder } from '@workspace/api-client-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function Checkout() {
  const [_, setLocation] = useLocation();
  const { user } = useAuth();
  const { items, getCartTotal, clearCart } = useCartStore();
  const createOrder = useCreateOrder();
  
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');
  
  const subtotal = getCartTotal();
  const delivery = subtotal > 5000 || subtotal === 0 ? 0 : 500;
  const total = subtotal + delivery;

  // Form state
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    address: '',
    city: '',
    state: '',
    pinCode: '',
    paymentMethod: 'online'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (items.length === 0) {
      toast({ title: 'Cart is empty', variant: 'destructive' });
      return;
    }

    // Simulate Razorpay opening and succeeding
    if (formData.paymentMethod === 'online') {
      toast({ title: 'Redirecting to secure payment gateway...' });
      setTimeout(() => {
        submitOrder('simulated_razorpay_pay_' + Math.floor(Math.random() * 1000000));
      }, 1500);
    } else {
      submitOrder();
    }
  };

  const submitOrder = (razorpayId?: string) => {
    createOrder.mutate({
      data: {
        ...formData,
        items: items.map(i => ({
          productId: i.productId,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          size: i.size,
          color: i.color
        })),
        totalAmount: total,
        razorpayOrderId: razorpayId
      }
    }, {
      onSuccess: (order) => {
        setIsSuccess(true);
        setOrderId(order.orderId);
        clearCart();
        window.scrollTo(0, 0);
      },
      onError: () => {
        toast({ title: 'Failed to place order', description: 'Please try again', variant: 'destructive' });
      }
    });
  };

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-20 max-w-2xl text-center">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="h-12 w-12 text-green-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
        <p className="text-lg text-gray-600 mb-2">Thank you for choosing Yunora.</p>
        <p className="text-gray-500 mb-8 bg-gray-50 py-3 px-6 rounded-xl inline-block">
          Order ID: <span className="font-bold text-gray-900">{orderId}</span>
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/profile">
            <Button variant="outline" size="lg" className="rounded-xl h-12 px-8">Track Order</Button>
          </Link>
          <Link href="/shop">
            <Button size="lg" className="rounded-xl h-12 px-8 bg-primary">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Button onClick={() => setLocation('/shop')}>Return to Shop</Button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="bg-white border-b border-gray-200 py-4 mb-8">
        <div className="container mx-auto px-4 flex items-center">
          <Link href="/cart" className="text-gray-500 hover:text-gray-900 flex items-center text-sm font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Cart
          </Link>
          <h1 className="text-xl font-bold text-gray-900 ml-auto">Secure Checkout</h1>
          <div className="ml-auto text-green-600 flex items-center text-sm font-medium">
            <ShieldCheck className="mr-1 h-4 w-4" /> 100% Secure
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <form onSubmit={handleCheckout} className="flex flex-col lg:flex-row gap-8">
          
          {/* Form Fields */}
          <div className="lg:w-2/3 space-y-6">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Delivery Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required className="h-12 rounded-xl bg-gray-50 border-transparent focus-visible:bg-white" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required className="h-12 rounded-xl bg-gray-50 border-transparent focus-visible:bg-white" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className="h-12 rounded-xl bg-gray-50 border-transparent focus-visible:bg-white" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Complete Address</Label>
                  <Input id="address" name="address" value={formData.address} onChange={handleChange} required className="h-12 rounded-xl bg-gray-50 border-transparent focus-visible:bg-white" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" value={formData.city} onChange={handleChange} required className="h-12 rounded-xl bg-gray-50 border-transparent focus-visible:bg-white" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" name="state" value={formData.state} onChange={handleChange} required className="h-12 rounded-xl bg-gray-50 border-transparent focus-visible:bg-white" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pinCode">PIN Code</Label>
                  <Input id="pinCode" name="pinCode" value={formData.pinCode} onChange={handleChange} required className="h-12 rounded-xl bg-gray-50 border-transparent focus-visible:bg-white" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Method</h2>
              <RadioGroup 
                value={formData.paymentMethod} 
                onValueChange={(val) => setFormData({...formData, paymentMethod: val})}
                className="space-y-4"
              >
                <div className={`flex items-center space-x-3 p-4 rounded-xl border-2 transition-colors ${formData.paymentMethod === 'online' ? 'border-primary bg-primary/5' : 'border-gray-100 hover:border-gray-200'}`}>
                  <RadioGroupItem value="online" id="online" />
                  <Label htmlFor="online" className="flex-1 cursor-pointer font-medium text-base">Pay Online (UPI, Card, NetBanking)</Label>
                </div>
                <div className={`flex items-center space-x-3 p-4 rounded-xl border-2 transition-colors ${formData.paymentMethod === 'cod' ? 'border-primary bg-primary/5' : 'border-gray-100 hover:border-gray-200'}`}>
                  <RadioGroupItem value="cod" id="cod" />
                  <Label htmlFor="cod" className="flex-1 cursor-pointer font-medium text-base flex flex-col">
                    <span>Cash on Delivery (COD)</span>
                    <span className="text-sm font-normal text-gray-500 mt-1">Pay when your order arrives</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 sticky top-28">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Details</h2>
              
              <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
                {items.map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-gray-900 truncate">{item.name}</h4>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      <p className="font-semibold text-sm mt-1">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-6" />

              <div className="space-y-3 mb-6 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span>{delivery === 0 ? 'Free' : `₹${delivery.toLocaleString('en-IN')}`}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-3 border-t">
                  <span>Total To Pay</span>
                  <span className="text-primary">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full h-14 rounded-xl text-base font-bold bg-primary shadow-lg shadow-primary/25"
                disabled={createOrder.isPending}
                data-testid="btn-place-order"
              >
                {createOrder.isPending ? 'Processing...' : (formData.paymentMethod === 'online' ? 'Pay Securely' : 'Place Order')}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
