import React from 'react';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';

export default function WarrantyTerms() {
  return (
    <div className="bg-white min-h-screen py-12 lg:py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href="/warranty" className="inline-flex items-center text-gray-500 hover:text-primary mb-8 font-medium transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Warranty Hub
        </Link>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Warranty Terms & Conditions</h1>
        
        <div className="prose prose-lg max-w-none text-gray-600">
          <p className="mb-6">
            These terms and conditions apply to the warranty provided by Yunora Universal ("Yunora", "we", "us") for products purchased directly from our factory, official website, or authorized dealers.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">1. General Terms</h3>
          <p className="mb-4">
            The warranty begins on the date of purchase. To be eligible for warranty claims, the purchaser must present the original invoice. The warranty is valid only for the original purchaser and is not transferable.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">2. Repair or Replacement</h3>
          <p className="mb-4">
            If a defect occurs during the warranty period, Yunora will, at its sole discretion, repair or replace the defective product or component. If identical materials are not available at the time of repair or replacement, Yunora reserves the right to substitute materials of equal or superior quality.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">3. Pro-rated Warranty (Mattresses)</h3>
          <p className="mb-4">
            For mattresses with a 15-year warranty, the first 5 years are fully covered for repair or replacement of manufacturing defects. Years 6 to 15 are covered on a pro-rated basis. The customer will be responsible for a percentage of the original purchase price for a replacement, which increases annually based on the age of the mattress.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">4. Transportation Costs</h3>
          <p className="mb-4">
            Any transportation costs associated with the repair or replacement of the product are the responsibility of the purchaser unless otherwise specified in writing by Yunora.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">5. Voiding of Warranty</h3>
          <p className="mb-4">
            The warranty shall be considered void if:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>The product is used for commercial purposes (unless specifically sold as a commercial product).</li>
            <li>The product is found to be unsanitary, stained, or subjected to abuse.</li>
            <li>The mattress is not used on a proper foundation or bed frame.</li>
            <li>The product has been altered or repaired by unauthorized personnel.</li>
          </ul>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">6. Limitation of Liability</h3>
          <p className="mb-4">
            Yunora's liability is limited to the repair or replacement of the defective product. In no event shall Yunora be liable for any incidental or consequential damages arising out of the use or inability to use the product.
          </p>
        </div>
      </div>
    </div>
  );
}
