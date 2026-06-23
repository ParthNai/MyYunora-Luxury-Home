import React from 'react';
import { useListCategories } from '@workspace/api-client-react';
import { Link } from 'wouter';
import { ChevronRight } from 'lucide-react';

export default function Categories() {
  const { data: categories, isLoading } = useListCategories();

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Shop by Category</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">Browse our premium collections of luxury home furnishings, crafted with care directly from our factory to your home.</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-80 rounded-3xl bg-white animate-pulse border border-gray-100" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {categories?.map((cat) => (
              <Link 
                key={cat.id} 
                href={`/shop?category=${cat.slug}`}
                className="group block bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                  <img 
                    src={cat.image || 'https://via.placeholder.com/600x400'} 
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8 flex items-end justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-1">{cat.name}</h2>
                      <p className="text-white/80 text-sm font-medium">{cat.productCount} Products</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-primary transition-colors">
                      <ChevronRight className="h-6 w-6" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
