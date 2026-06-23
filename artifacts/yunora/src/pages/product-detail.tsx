import React, { useState } from 'react';
import { useGetProduct, getGetProductQueryKey } from '@workspace/api-client-react';
import { useParams, Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, Plus, Minus, Star, ChevronRight, MessageCircle } from 'lucide-react';
import { FaWhatsapp, FaAmazon } from 'react-icons/fa';
import { SiFlipkart } from 'react-icons/si';
import { useCartStore, useWishlistStore } from '@/lib/store';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function ProductDetail() {
  const { id } = useParams();
  const productId = parseInt(id || '0');
  
  const { data: product, isLoading, isError } = useGetProduct(productId, { 
    query: { enabled: !!productId, queryKey: getGetProductQueryKey(productId) } 
  });

  const [mainImage, setMainImage] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  
  const addToCart = useCartStore(state => state.addItem);
  const toggleWishlist = useWishlistStore(state => state.toggleItem);
  const isInWishlist = useWishlistStore(state => state.isInWishlist);
  const { toast } = useToast();

  React.useEffect(() => {
    if (product) {
      setMainImage(product.images[0]);
      if (product.sizes?.length) setSelectedSize(product.sizes[0]);
      if (product.colors?.length) setSelectedColor(product.colors[0]);
    }
  }, [product]);

  if (isLoading) return <div className="container mx-auto px-4 py-12"><div className="h-96 bg-gray-100 animate-pulse rounded-3xl" /></div>;
  if (isError || !product) return <div className="container mx-auto px-4 py-20 text-center"><h1 className="text-2xl font-bold mb-4">Product not found</h1><Link href="/shop"><Button>Back to Shop</Button></Link></div>;

  const handleAddToCart = () => {
    if (product.sizes?.length && !selectedSize) {
      toast({ title: 'Select a size', variant: 'destructive' });
      return;
    }
    if (product.colors?.length && !selectedColor) {
      toast({ title: 'Select a color', variant: 'destructive' });
      return;
    }

    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      size: selectedSize || undefined,
      color: selectedColor || undefined
    });

    toast({ title: 'Added to cart', description: `${product.name} added successfully.` });
  };

  const whatsappMessage = encodeURIComponent(`Hi Yunora, I'm interested in customizing the ${product.name}. Could you help me with this?`);

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100 py-3">
        <div className="container mx-auto px-4 flex items-center text-sm text-gray-500">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-gray-900 font-medium truncate">{product.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 relative">
              <img src={mainImage} alt={product.name} className="w-full h-full object-cover" />
              {product.badge && (
                <div className="absolute top-4 right-4 bg-primary text-white font-bold px-3 py-1.5 rounded-lg">
                  {product.badge}
                </div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setMainImage(img)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${mainImage === img ? 'border-primary' : 'border-transparent hover:border-gray-200'}`}
                  >
                    <img src={img} alt={`${product.name} ${idx+1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating || 5) ? 'fill-current' : 'text-gray-300'}`} />
                ))}
                <span className="text-gray-500 text-sm ml-2">({product.reviewCount || 0} reviews)</span>
              </div>
              <span className="text-gray-300">|</span>
              <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-md">In Stock</span>
            </div>

            <div className="mb-6">
              <div className="flex items-end gap-3 mb-1">
                <span className="text-3xl font-bold text-primary">₹{product.price.toLocaleString('en-IN')}</span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-400 line-through mb-1">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                )}
              </div>
              <p className="text-sm text-gray-500">Inclusive of all taxes</p>
            </div>

            <p className="text-gray-600 mb-8 leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Color: <span className="text-gray-500 font-normal">{selectedColor}</span></h3>
                <div className="flex gap-3">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${selectedColor === color ? 'border-primary scale-110' : 'border-gray-200 hover:border-gray-300'}`}
                      style={{ backgroundColor: color.toLowerCase() }}
                      aria-label={`Select color ${color}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-semibold text-gray-900">Size</h3>
                  <button className="text-xs text-primary font-medium hover:underline">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${selectedSize === size ? 'border-primary bg-primary/5 text-primary' : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <div className="flex items-center border border-gray-200 rounded-xl h-14 w-32 bg-white">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="flex-1 flex justify-center text-gray-500 hover:text-primary transition-colors"><Minus className="h-4 w-4" /></button>
                <span className="font-semibold w-8 text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="flex-1 flex justify-center text-gray-500 hover:text-primary transition-colors"><Plus className="h-4 w-4" /></button>
              </div>
              
              <Button onClick={handleAddToCart} size="lg" className="flex-1 h-14 rounded-xl text-base bg-primary hover:bg-primary/90 text-white shadow-sm" data-testid="btn-add-to-cart">
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
              </Button>
              
              <Button onClick={() => toggleWishlist(product.id)} variant="outline" size="lg" className={`h-14 w-14 rounded-xl flex-shrink-0 ${isInWishlist(product.id) ? 'text-red-500 border-red-200 bg-red-50' : ''}`} data-testid="btn-wishlist">
                <Heart className="h-6 w-6" fill={isInWishlist(product.id) ? "currentColor" : "none"} />
              </Button>
            </div>

            {/* Customization */}
            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5 mb-8">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                Need a Custom Size?
              </h3>
              <p className="text-sm text-gray-600 mb-4">We manufacture directly. Talk to our experts for a perfectly tailored product for your home.</p>
              
              <Accordion type="single" collapsible className="w-full bg-white rounded-xl mb-4 border border-orange-100">
                <AccordionItem value="custom-form" className="border-0">
                  <AccordionTrigger className="px-4 py-3 text-sm font-medium hover:no-underline hover:text-primary">
                    Fill Customization Form
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      const fd = new FormData(e.currentTarget);
                      const l = fd.get('length');
                      const w = fd.get('width');
                      const h = fd.get('height');
                      const f = fd.get('fabric');
                      const n = fd.get('notes');
                      const msg = encodeURIComponent(`Hi Yunora, I want a custom ${product.name}. Details:\nLength: ${l}\nWidth: ${w}\nHeight: ${h}\nFabric: ${f}\nNotes: ${n}`);
                      window.open(`https://wa.me/919624818530?text=${msg}`, '_blank');
                    }} className="space-y-3 pt-2">
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="text-xs text-gray-500 mb-1 block">Length</label>
                          <input name="length" type="text" className="w-full text-sm border-gray-200 rounded-lg p-2" required placeholder="e.g. 72 inch" />
                        </div>
                        <div>
                          <label className="text-xs text-gray-500 mb-1 block">Width</label>
                          <input name="width" type="text" className="w-full text-sm border-gray-200 rounded-lg p-2" required placeholder="e.g. 36 inch" />
                        </div>
                        <div>
                          <label className="text-xs text-gray-500 mb-1 block">Height</label>
                          <input name="height" type="text" className="w-full text-sm border-gray-200 rounded-lg p-2" placeholder="e.g. 6 inch" />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">Fabric Preference</label>
                        <input name="fabric" type="text" className="w-full text-sm border-gray-200 rounded-lg p-2" placeholder="e.g. Cotton, Velvet" />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">Notes</label>
                        <textarea name="notes" className="w-full text-sm border-gray-200 rounded-lg p-2 h-16" placeholder="Any special requirements?"></textarea>
                      </div>
                      <Button type="submit" className="w-full text-sm h-10 rounded-lg bg-green-500 hover:bg-green-600 text-white">
                        <FaWhatsapp className="mr-2 h-4 w-4" /> Send Details on WhatsApp
                      </Button>
                    </form>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <a href={`https://wa.me/919624818530?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-full bg-white border border-green-500 text-green-600 hover:bg-green-50 font-medium py-3 px-4 rounded-xl transition-colors">
                <FaWhatsapp className="mr-2 h-5 w-5" /> Quick WhatsApp Chat
              </a>
            </div>

            {/* Also Available On */}
            <div className="flex items-center gap-4 py-4 border-t border-gray-100">
              <span className="text-sm text-gray-500">Also available on:</span>
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-800 hover:border-gray-400 transition-colors cursor-pointer">
                  <FaAmazon className="h-5 w-5" />
                </div>
                <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-blue-600 hover:border-blue-400 transition-colors cursor-pointer">
                  <SiFlipkart className="h-5 w-5" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Details Accordion */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Information</h2>
          <Accordion type="multiple" defaultValue={["description"]} className="w-full">
            <AccordionItem value="description" className="border-b border-gray-200 py-2">
              <AccordionTrigger className="text-lg font-medium hover:text-primary">Description</AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed text-base pt-2 pb-4">
                {product.description || product.shortDescription}
              </AccordionContent>
            </AccordionItem>
            
            {product.features && product.features.length > 0 && (
              <AccordionItem value="features" className="border-b border-gray-200 py-2">
                <AccordionTrigger className="text-lg font-medium hover:text-primary">Key Features</AccordionTrigger>
                <AccordionContent className="pt-2 pb-4">
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 text-base">
                    {product.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            )}

            <AccordionItem value="warranty" className="border-b border-gray-200 py-2">
              <AccordionTrigger className="text-lg font-medium hover:text-primary">Warranty & Guarantee</AccordionTrigger>
              <AccordionContent className="text-gray-600 text-base pt-2 pb-4">
                <p className="mb-2"><strong>{product.warrantyYears || 1} Year Manufacturer Warranty</strong></p>
                <p>This product is backed by Yunora's factory-direct warranty against manufacturing defects. As the direct manufacturer, we ensure seamless claim processing.</p>
                <Link href="/warranty" className="text-primary hover:underline mt-2 inline-block">Read full warranty terms</Link>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="shipping" className="border-b border-gray-200 py-2">
              <AccordionTrigger className="text-lg font-medium hover:text-primary">Shipping & Delivery</AccordionTrigger>
              <AccordionContent className="text-gray-600 text-base pt-2 pb-4">
                <ul className="space-y-2">
                  <li>• Free shipping on orders above ₹5000</li>
                  <li>• Delivered securely rolled and compressed (for mattresses)</li>
                  <li>• Ships directly from our Palanpur factory within 3-5 business days</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
