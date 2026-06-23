import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useListFeaturedProducts, useSubscribeNewsletter } from '@workspace/api-client-react';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, Heart, Star, ChevronLeft, ChevronRight, ArrowRight, Check, Truck, Shield, Zap, Award, Factory } from 'lucide-react';
import { useCartStore, useWishlistStore } from '@/lib/store';
import { getProductImages, categoryImages, heroImages } from '@/lib/images';

export default function Home() {
  const { data: featuredProducts, isLoading } = useListFeaturedProducts();
  const subscribeNewsletter = useSubscribeNewsletter();
  const { toast } = useToast();
  const addToCart = useCartStore(state => state.addItem);
  const toggleWishlist = useWishlistStore(state => state.toggleItem);
  const isInWishlist = useWishlistStore(state => state.isInWishlist);

  const [heroIndex, setHeroIndex] = useState(0);
  const [heroDir, setHeroDir] = useState(1);

  const goTo = useCallback((idx: number) => {
    setHeroDir(idx > heroIndex ? 1 : -1);
    setHeroIndex(idx);
  }, [heroIndex]);

  useEffect(() => {
    const t = setInterval(() => {
      setHeroDir(1);
      setHeroIndex(p => (p + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    if (email) {
      subscribeNewsletter.mutate({ data: { email } }, {
        onSuccess: () => {
          toast({ title: 'Subscribed!', description: 'Thank you for joining the Yunora family.' });
          (e.target as HTMLFormElement).reset();
        },
        onError: () => {
          toast({ title: 'Error', description: 'Please try again later.', variant: 'destructive' });
        }
      });
    }
  };

  return (
    <div className="w-full overflow-x-hidden">

      {/* ─── HERO SLIDER ─── */}
      <section className="relative h-[92vh] min-h-[600px] max-h-[900px] w-full overflow-hidden">
        <AnimatePresence initial={false} custom={heroDir}>
          <motion.div
            key={heroIndex}
            custom={heroDir}
            variants={{
              enter: (d: number) => ({ x: d * 120, opacity: 0, scale: 1.04 }),
              center: { x: 0, opacity: 1, scale: 1 },
              exit: (d: number) => ({ x: d * -120, opacity: 0, scale: 0.97 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.75, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-0"
          >
            <img
              src={heroImages[heroIndex].src}
              alt="Yunora"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.15) 100%)' }} />
          </motion.div>
        </AnimatePresence>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col items-start justify-center container mx-auto px-6 lg:px-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${heroIndex}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 mb-5">
                <span className="h-px w-8 bg-primary" />
                <span className="text-primary font-semibold text-sm uppercase tracking-[0.2em]">
                  {heroImages[heroIndex].tag}
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.08] mb-3 drop-shadow-lg">
                {heroImages[heroIndex].headline}
              </h1>
              <h1 className="text-5xl md:text-7xl font-bold leading-[1.08] mb-6 drop-shadow-lg" style={{ color: '#FF9A6C' }}>
                {heroImages[heroIndex].sub}
              </h1>
              <p className="text-white/80 text-lg md:text-xl mb-10 font-light leading-relaxed max-w-xl">
                Premium Mattresses, Curtains, Sofas & Home Furnishings.<br />
                Factory direct from Palanpur, Gujarat. Since 2018.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/shop">
                  <Button size="lg" className="h-14 px-10 text-base rounded-2xl font-semibold shadow-2xl" style={{ background: 'linear-gradient(135deg, #FF7A4D, #e85f2a)', boxShadow: '0 8px 32px rgba(255,122,77,0.4)' }}>
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <a href="https://wa.me/919624818530" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="h-14 px-10 text-base rounded-2xl font-semibold border-white/40 text-white bg-white/10 backdrop-blur-md hover:bg-white/20 hover:border-white/60 transition-all">
                    Customize Product
                  </Button>
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slider Controls */}
        <div className="absolute bottom-8 left-0 right-0 z-10 flex items-center justify-center gap-3">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`transition-all duration-300 rounded-full ${i === heroIndex ? 'w-8 h-2.5 bg-primary' : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        <button
          onClick={() => goTo((heroIndex - 1 + heroImages.length) % heroImages.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 flex items-center justify-center hover:bg-white/25 transition-all"
          aria-label="Previous"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => goTo((heroIndex + 1) % heroImages.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 flex items-center justify-center hover:bg-white/25 transition-all"
          aria-label="Next"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-white/10 backdrop-blur-md border-t border-white/10">
          <div className="container mx-auto px-4 py-3 flex items-center justify-center gap-8 md:gap-16">
            {[
              { val: '5000+', label: 'Happy Homes' },
              { val: '15 Yr', label: 'Max Warranty' },
              { val: '100%', label: 'Factory Direct' },
              { val: '2018', label: 'Est. Palanpur' },
            ].map(s => (
              <div key={s.val} className="text-center">
                <div className="text-white font-bold text-lg leading-none">{s.val}</div>
                <div className="text-white/60 text-xs mt-0.5 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SHOP BY CATEGORY ─── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-4">
            <div>
              <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">Collections</p>
              <h2 className="text-4xl font-bold text-gray-900">Shop By Category</h2>
            </div>
            <Link href="/categories">
              <Button variant="outline" className="rounded-xl border-gray-200 hover:border-primary hover:text-primary transition-colors gap-2">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { slug: 'mattresses', label: 'Mattresses' },
              { slug: 'pillows', label: 'Pillows' },
              { slug: 'sofas', label: 'Sofas' },
              { slug: 'curtains', label: 'Curtains' },
              { slug: 'bean-bags', label: 'Bean Bags' },
              { slug: 'bedsheets', label: 'Bedsheets' },
            ].map((cat, i) => (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
              >
                <Link
                  href={`/shop?category=${cat.slug}`}
                  className="group relative block rounded-3xl overflow-hidden aspect-[3/4] bg-gray-100 shadow-sm hover:shadow-xl transition-all duration-500"
                >
                  <img
                    src={categoryImages[cat.slug]}
                    alt={cat.label}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/15 transition-colors duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-bold text-base leading-tight">{cat.label}</h3>
                    <div className="flex items-center gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                      <span className="text-white/80 text-xs">Explore</span>
                      <ArrowRight className="h-3 w-3 text-white/80" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED PRODUCTS ─── */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-4">
            <div>
              <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">Bestsellers</p>
              <h2 className="text-4xl font-bold text-gray-900">Featured Products</h2>
            </div>
            <Link href="/shop">
              <Button variant="outline" className="rounded-xl border-gray-200 hover:border-primary hover:text-primary gap-2">
                Shop All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="rounded-3xl bg-white h-[440px] animate-pulse" />
              ))
              : featuredProducts?.slice(0, 4).map((product, i) => {
                const imgs = getProductImages(product.images as string[]);
                const img = imgs[0];
                const inWish = isInWishlist(product.id);
                const discount = product.originalPrice
                  ? Math.round((1 - product.price / product.originalPrice) * 100)
                  : 0;
                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-400 border border-gray-100/80 flex flex-col"
                  >
                    <Link href={`/products/${product.id}`} className="block relative overflow-hidden aspect-square bg-gray-50">
                      {img ? (
                        <img src={img} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108" loading="lazy" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-4xl text-gray-200">▢</span>
                        </div>
                      )}
                      {discount > 0 && (
                        <div className="absolute top-3 left-3 bg-emerald-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
                          -{discount}%
                        </div>
                      )}
                      {product.badge && (
                        <div className="absolute top-3 right-3 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow" style={{ background: 'linear-gradient(135deg, #FF7A4D, #e85f2a)' }}>
                          {product.badge}
                        </div>
                      )}
                      <button
                        onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
                        className={`absolute bottom-3 right-3 w-9 h-9 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm transition-all ${inWish ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-400 hover:text-red-400'}`}
                      >
                        <Heart className="h-4 w-4" fill={inWish ? 'currentColor' : 'none'} />
                      </button>
                    </Link>

                    <div className="p-5 flex flex-col flex-1">
                      <Link href={`/products/${product.id}`}>
                        <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-1 group-hover:text-primary transition-colors line-clamp-2">{product.name}</h3>
                      </Link>
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, s) => (
                          <Star key={s} className={`h-3 w-3 ${s < Math.round(Number(product.rating)) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}`} />
                        ))}
                        <span className="text-xs text-gray-400 ml-1">({product.reviewCount})</span>
                      </div>
                      <div className="flex items-baseline gap-2 mb-4 mt-auto">
                        <span className="text-xl font-bold text-primary">₹{product.price.toLocaleString('en-IN')}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                        )}
                      </div>
                      <Button
                        onClick={() => addToCart({ productId: product.id, name: product.name, price: product.price, quantity: 1 })}
                        className="w-full rounded-xl font-semibold h-11 shadow-sm"
                        style={{ background: 'linear-gradient(135deg, #FF7A4D, #e85f2a)' }}
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE YUNORA ─── */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">Our Promise</p>
            <h2 className="text-4xl font-bold text-gray-900">Why Choose Yunora</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">The Yunora promise — quality you can feel, service you can trust, and prices that make sense.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { icon: Factory, title: 'Factory Direct', desc: 'We manufacture & sell directly. No middlemen — you save up to 40%.', color: 'from-orange-400 to-red-400' },
              { icon: Award, title: 'Premium Materials', desc: 'OekoTex certified fabrics, high-density foam, and premium stitching.', color: 'from-amber-400 to-orange-400' },
              { icon: Zap, title: 'Custom Sizes', desc: 'Your sofa, your mattress — made to your exact dimensions.', color: 'from-primary to-orange-400' },
              { icon: Truck, title: 'Pan India Delivery', desc: 'Fast, safe delivery across India with free shipping above ₹5,000.', color: 'from-rose-400 to-primary' },
              { icon: Shield, title: 'Up to 15 Yr Warranty', desc: 'Industry-leading warranty because we stand behind every product.', color: 'from-orange-500 to-red-500' },
            ].map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative bg-white border border-gray-100 rounded-3xl p-7 shadow-sm hover:shadow-xl transition-all duration-400 hover:-translate-y-1"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${pillar.color} flex items-center justify-center mb-5 shadow-md shadow-orange-100 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-base mb-2">{pillar.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{pillar.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIAL STRIP ─── */}
      <section className="py-14 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <div className="flex-shrink-0 text-center md:text-left">
              <div className="text-5xl font-bold text-primary">4.8</div>
              <div className="flex items-center gap-1 justify-center md:justify-start my-2">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />)}
              </div>
              <div className="text-sm text-gray-500 font-medium">from 5000+ reviews</div>
            </div>
            <div className="h-px md:h-20 w-full md:w-px bg-gray-200" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 flex-1">
              {[
                { name: 'Priya M., Ahmedabad', text: '"The mattress is incredible. Best sleep I have had in years. The quality is outstanding for the price."' },
                { name: 'Rahul K., Surat', text: '"Ordered a custom sofa and curtains. Delivered on time, impeccable finish. Yunora is our go-to for home furnishings."' },
                { name: 'Sneha P., Mumbai', text: '"The bean bag is so comfortable and the leather looks premium. Fast delivery and great customer support!"' },
              ].map((r, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, s) => <Star key={s} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />)}
                  </div>
                  <p className="text-sm text-gray-600 italic leading-relaxed mb-3">{r.text}</p>
                  <p className="text-xs font-semibold text-gray-800">{r.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── NEWSLETTER ─── */}
      <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #FF7A4D 0%, #FF9A6C 40%, #FFB38A 70%, #FF9A6C 100%)' }}>
        {/* Decorative circles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-16 -left-16 w-72 h-72 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #fff, transparent)' }} />
          <div className="absolute -bottom-10 -right-10 w-56 h-56 rounded-full opacity-15" style={{ background: 'radial-gradient(circle, #fff, transparent)' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #fff, transparent)' }} />
        </div>
        {/* Glossy top strip */}
        <div className="absolute inset-x-0 top-0 h-1 pointer-events-none" style={{ background: 'rgba(255,255,255,0.35)' }} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/25 backdrop-blur-sm rounded-full px-5 py-2 mb-6 border border-white/40 shadow-sm">
              <Check className="h-4 w-4 text-white" />
              <span className="text-white text-sm font-semibold">Join 5000+ Yunora Subscribers</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">Stay Updated with Yunora</h2>
            <p className="text-white/85 mb-10 text-lg font-medium">Exclusive deals, new arrivals, and home styling tips delivered to your inbox.</p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <Input
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
                className="h-14 bg-white/90 border-white/60 text-gray-800 placeholder:text-gray-400 rounded-2xl px-6 flex-1 focus-visible:ring-white focus-visible:border-white shadow-md"
              />
              <Button
                type="submit"
                disabled={subscribeNewsletter.isPending}
                className="h-14 rounded-2xl px-8 font-bold text-primary shrink-0 bg-white hover:bg-white/90 transition-all shadow-lg"
                style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.15)' }}
              >
                {subscribeNewsletter.isPending ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
