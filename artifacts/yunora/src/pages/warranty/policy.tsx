import React from 'react';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';

export default function WarrantyPolicy() {
  return (
    <div className="bg-white min-h-screen py-12 lg:py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href="/warranty" className="inline-flex items-center text-gray-500 hover:text-primary mb-8 font-medium transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Warranty Hub
        </Link>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Yunora Warranty Policy</h1>
        
        <div className="prose prose-lg max-w-none text-gray-600">
          <p className="lead text-xl text-gray-800 font-medium mb-8">
            All Yunora products come with a manufacturer's warranty. As a direct manufacturer, we ensure that resolving warranty claims is seamless, transparent, and hassle-free.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Warranty Duration by Category</h2>
          <div className="bg-gray-50 rounded-2xl p-6 md:p-8 mb-10 border border-gray-100">
            <ul className="space-y-4">
              <li className="flex items-center justify-between border-b border-gray-200 pb-4">
                <span className="font-semibold text-gray-900">Mattresses</span>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-lg font-bold">15 Years</span>
              </li>
              <li className="flex items-center justify-between border-b border-gray-200 pb-4">
                <span className="font-semibold text-gray-900">Pillows</span>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-lg font-bold">2 Years</span>
              </li>
              <li className="flex items-center justify-between border-b border-gray-200 pb-4">
                <span className="font-semibold text-gray-900">Sofas</span>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-lg font-bold">5 Years</span>
              </li>
              <li className="flex items-center justify-between border-b border-gray-200 pb-4">
                <span className="font-semibold text-gray-900">Bean Bags</span>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-lg font-bold">2 Years</span>
              </li>
              <li className="flex items-center justify-between pt-2">
                <span className="font-semibold text-gray-900">Curtains</span>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-lg font-bold">1 Year</span>
              </li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">What is Covered</h2>
          <ul className="list-disc pl-6 space-y-2 mb-8">
            <li>Manufacturing defects in materials or workmanship.</li>
            <li>Visible indentation or sag greater than 1.5 inches for mattresses (not associated with an improper foundation).</li>
            <li>Defects in the zipper assembly of the mattress/pillow cover.</li>
            <li>Structural damage to the sofa frame under normal usage.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">What is NOT Covered</h2>
          <ul className="list-disc pl-6 space-y-2 mb-8">
            <li>Normal increase in softness of the foam which does not affect the pressure-relieving qualities.</li>
            <li>Comfort preference or changes in comfort preference over time.</li>
            <li>Physical abuse or damage to the structure and/or cover material, including but not limited to, burns, cuts, tears, liquid damage, or stains.</li>
            <li>Damage caused by using an improper bed frame, foundation, or platform.</li>
            <li>Products sold "as-is" or floor models.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">How to Make a Claim</h2>
          <p>
            To file a warranty claim, please visit our <Link href="/warranty/claim" className="text-primary hover:underline">Claim Warranty</Link> page. You will need your original proof of purchase and photographs showing the defect. Our support team will review your claim and respond within 48 hours.
          </p>
        </div>
      </div>
    </div>
  );
}
