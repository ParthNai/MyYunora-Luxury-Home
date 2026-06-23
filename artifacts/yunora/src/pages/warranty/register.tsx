import React, { useState } from 'react';
import { useRegisterWarranty } from '@workspace/api-client-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'wouter';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function WarrantyRegister() {
  const registerWarranty = useRegisterWarranty();
  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);
  const [regId, setRegId] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    productName: '',
    purchaseDate: '',
    invoiceNumber: '',
    dealerName: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerWarranty.mutate({ data: formData }, {
      onSuccess: (data) => {
        setIsSuccess(true);
        setRegId(data.registrationId);
      },
      onError: () => {
        toast({ title: 'Registration Failed', description: 'Please check your details and try again.', variant: 'destructive' });
      }
    });
  };

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-20 max-w-2xl text-center">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="h-12 w-12 text-green-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Registration Successful!</h1>
        <p className="text-lg text-gray-600 mb-2">Your product warranty has been activated.</p>
        <p className="text-gray-500 mb-8 bg-gray-50 py-3 px-6 rounded-xl inline-block">
          Registration ID: <span className="font-bold text-gray-900">{regId}</span>
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/warranty">
            <Button variant="outline" size="lg" className="rounded-xl h-12 px-8">Warranty Hub</Button>
          </Link>
          <Link href="/shop">
            <Button size="lg" className="rounded-xl h-12 px-8 bg-primary">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link href="/warranty" className="inline-flex items-center text-gray-500 hover:text-primary mb-8 font-medium transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Warranty Hub
        </Link>
        
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Register Your Product</h1>
            <p className="text-gray-500">Activate your warranty by providing the purchase details below.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
                <Label htmlFor="email">Email Address (Optional)</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className="h-12 rounded-xl bg-gray-50 border-transparent focus-visible:bg-white" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="productName">Product Name / Model</Label>
                <Input id="productName" name="productName" value={formData.productName} onChange={handleChange} required className="h-12 rounded-xl bg-gray-50 border-transparent focus-visible:bg-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="purchaseDate">Date of Purchase</Label>
                <Input id="purchaseDate" name="purchaseDate" type="date" value={formData.purchaseDate} onChange={handleChange} required className="h-12 rounded-xl bg-gray-50 border-transparent focus-visible:bg-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="invoiceNumber">Invoice Number</Label>
                <Input id="invoiceNumber" name="invoiceNumber" value={formData.invoiceNumber} onChange={handleChange} required className="h-12 rounded-xl bg-gray-50 border-transparent focus-visible:bg-white" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="dealerName">Dealer / Store Name (Optional)</Label>
                <Input id="dealerName" name="dealerName" value={formData.dealerName} onChange={handleChange} placeholder="e.g. MyYunora.com, Amazon, local store" className="h-12 rounded-xl bg-gray-50 border-transparent focus-visible:bg-white" />
              </div>
            </div>

            <div className="pt-4 text-sm text-gray-500">
              By registering, you agree to our <Link href="/warranty/terms" className="text-primary hover:underline">Warranty Terms & Conditions</Link>.
            </div>

            <Button 
              type="submit" 
              size="lg" 
              className="w-full h-14 rounded-xl text-base font-bold bg-primary shadow-lg shadow-primary/25 mt-8"
              disabled={registerWarranty.isPending}
              data-testid="btn-submit-registration"
            >
              {registerWarranty.isPending ? 'Submitting...' : 'Register Warranty'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
