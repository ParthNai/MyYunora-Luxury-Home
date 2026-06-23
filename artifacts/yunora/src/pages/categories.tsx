import React from 'react';
import { useListCategories } from '@workspace/api-client-react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { categoryImages } from '@/lib/images';

export default function Categories() {
  const { data: categories, isLoading } = useListCategories();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="relative bg-gray-950 py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ background: 'radial-gradient(circle at 30% 50%, #FF7A4D, transparent 60%), radial-gradient(circle at 70% 50%, #e85f2a, transparent 60%)' }} />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary font-semibold text-sm uppercase tracking-widest mb-3"
          >
            Yunora Collections
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="text-5xl md:text-6xl font-bold text-white mb-5"
          >
            Shop by Category
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="text-white/60 text-lg max-w-2xl mx-auto"
          >
            Browse our premium home furnishing collections crafted directly from our factory in Palanpur, Gujarat.
          </motion.p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-4 py-16 lg:py-20">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-80 rounded-3xl bg-gray-100 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories?.map((cat, i) => {
              const img = categoryImages[cat.slug] || '';
              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    href={`/shop?category=${cat.slug}`}
                    className="group relative block rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                    style={{ aspectRatio: '4/3' }}
                  >
                    {img ? (
                      <img src={img} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-100" />
                    )}

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/5 transition-opacity duration-300" />
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-400" />

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-7 flex items-end justify-between">
                      <div>
                        <h2 className="text-2xl font-bold text-white mb-1.5">{cat.name}</h2>
                        <p className="text-white/70 text-sm font-medium">{cat.productCount} Products</p>
                        {cat.description && (
                          <p className="text-white/50 text-xs mt-1 max-w-[200px] line-clamp-2 leading-relaxed">{cat.description}</p>
                        )}
                      </div>
                      <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300 shadow-lg flex-shrink-0 ml-4">
                        <ArrowRight className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
