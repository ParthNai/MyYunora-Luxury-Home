import React, { useState } from 'react';
import { useClaimWarranty } from '@workspace/api-client-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'wouter';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function WarrantyClaim() {
  const claimWarranty = useClaimWarranty();
  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);
  const [claimId, setClaimId] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    registrationId: '',
    productName: '',
    issueDescription: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    claimWarranty.mutate({ data: formData }, {
      onSuccess: (data) => {
        setIsSuccess(true);
        setClaimId(data.claimId);
      },
      onError: () => {
        toast({ title: 'Claim Submission Failed', description: 'Please check your details and try again.', variant: 'destructive' });
      }
    });
  };

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-20 max-w-2xl text-center">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="h-12 w-12 text-green-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Claim Submitted Successfully</h1>
        <p className="text-lg text-gray-600 mb-2">Our support team will contact you within 24-48 hours.</p>
        <p className="text-gray-500 mb-8 bg-gray-50 py-3 px-6 rounded-xl inline-block">
          Claim ID: <span className="font-bold text-gray-900">{claimId}</span>
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/warranty">
            <Button variant="outline" size="lg" className="rounded-xl h-12 px-8">Warranty Hub</Button>
          </Link>
          <Link href="/">
            <Button size="lg" className="rounded-xl h-12 px-8 bg-primary">Back to Home</Button>
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
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Claim Warranty</h1>
            <p className="text-gray-500">Provide details about the issue you are facing with your product.</p>
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
                <Label htmlFor="registrationId">Warranty Registration ID / Invoice No.</Label>
                <Input id="registrationId" name="registrationId" value={formData.registrationId} onChange={handleChange} required className="h-12 rounded-xl bg-gray-50 border-transparent focus-visible:bg-white" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="productName">Product Name (Optional)</Label>
                <Input id="productName" name="productName" value={formData.productName} onChange={handleChange} className="h-12 rounded-xl bg-gray-50 border-transparent focus-visible:bg-white" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="issueDescription">Issue Description</Label>
                <Textarea 
                  id="issueDescription" 
                  name="issueDescription" 
                  value={formData.issueDescription} 
                  onChange={handleChange} 
                  required 
                  className="min-h-[120px] rounded-xl bg-gray-50 border-transparent focus-visible:bg-white resize-y" 
                  placeholder="Please describe the defect or issue in detail..."
                />
              </div>
            </div>

            <Button 
              type="submit" 
              size="lg" 
              className="w-full h-14 rounded-xl text-base font-bold bg-primary shadow-lg shadow-primary/25 mt-8"
              disabled={claimWarranty.isPending}
              data-testid="btn-submit-claim"
            >
              {claimWarranty.isPending ? 'Submitting...' : 'Submit Claim Request'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
