import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, FileText, FileSignature, AlertCircle } from 'lucide-react';
import { Link } from 'wouter';

export default function WarrantyHub() {
  return (
    <div className="bg-gray-50 min-h-[70vh] py-12 lg:py-20">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Warranty Hub</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Yunora products are built to last. We stand behind our quality with industry-leading warranties to ensure your peace of mind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <Link href="/warranty/register" className="group">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1 h-full flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Warranty Registration</h2>
              <p className="text-gray-500 mb-6">Register your newly purchased Yunora product to activate your warranty coverage.</p>
              <span className="text-primary font-medium mt-auto group-hover:underline">Register Now →</span>
            </div>
          </Link>

          <Link href="/warranty/claim" className="group">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1 h-full flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <AlertCircle className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Claim Warranty</h2>
              <p className="text-gray-500 mb-6">Facing an issue? Submit a claim request and our team will resolve it swiftly.</p>
              <span className="text-primary font-medium mt-auto group-hover:underline">Submit Claim →</span>
            </div>
          </Link>

          <Link href="/warranty/policy" className="group">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1 h-full flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FileText className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Warranty Policy</h2>
              <p className="text-gray-500 mb-6">Read about the duration and coverage details for different product categories.</p>
              <span className="text-primary font-medium mt-auto group-hover:underline">Read Policy →</span>
            </div>
          </Link>

          <Link href="/warranty/terms" className="group">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1 h-full flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-purple-50 text-purple-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FileSignature className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Warranty Terms</h2>
              <p className="text-gray-500 mb-6">Detailed terms, conditions, and limitations of the Yunora warranty program.</p>
              <span className="text-primary font-medium mt-auto group-hover:underline">View Terms →</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
