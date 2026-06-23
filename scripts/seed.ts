import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { productsTable, categoriesTable, ordersTable, newsletterTable } from "../lib/db/src/schema/index.js";

const { Pool } = pg;

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL not set");

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

// ─── CATEGORIES ───
const categories = [
  { name: "Mattresses", slug: "mattresses", description: "Orthopedic and luxury mattresses for perfect sleep", image: null, productCount: 0 },
  { name: "Pillows", slug: "pillows", description: "Premium comfort pillows for every sleep style", image: null, productCount: 0 },
  { name: "Sofas", slug: "sofas", description: "Designer sofas and sectionals for every living space", image: null, productCount: 0 },
  { name: "Curtains", slug: "curtains", description: "Luxury curtains and drapes to dress your windows", image: null, productCount: 0 },
  { name: "Bean Bags", slug: "bean-bags", description: "Premium bean bags and loungers for ultimate relaxation", image: null, productCount: 0 },
  { name: "Bedsheets", slug: "bedsheets", description: "High-thread-count bedsheets for a hotel-quality sleep", image: null, productCount: 0 },
];

// ─── PRODUCTS ───
const products = [
  // MATTRESSES
  {
    name: "Yunora ActivePro Orthopedic Mattress",
    slug: "yunora-activepro-orthopedic-mattress",
    price: "18999",
    originalPrice: "26999",
    category: "mattresses",
    shortDescription: "7-zone orthopedic support with dual-side comfort for all sleeping positions",
    description: "The Yunora ActivePro is engineered for those who demand restorative sleep. Featuring 7-zone independent pocket spring support, dual-sided firmness (soft/medium), and OekoTex-certified memory foam layers, this mattress adapts perfectly to your body shape. Motion isolation ensures your partner's movements don't disturb your sleep.",
    features: ["7-zone pocket spring system", "Dual-side firmness (soft & medium)", "OekoTex certified memory foam", "Motion isolation technology", "Anti-dust-mite fabric cover", "15 year warranty"],
    colors: ["White", "Cream"],
    sizes: ["Single", "Double", "Queen", "King"],
    warrantyYears: 15,
    rating: "4.8",
    reviewCount: 342,
    inStock: true,
    isFeatured: true,
    badge: "Best Seller",
    material: "Memory Foam + Pocket Springs",
  },
  {
    name: "Yunora CloudSleep Memory Foam Mattress",
    slug: "yunora-cloudsleep-memory-foam-mattress",
    price: "14499",
    originalPrice: "19999",
    category: "mattresses",
    shortDescription: "Pure memory foam with body-contouring comfort and pressure relief",
    description: "Sink into cloud-like comfort with the Yunora CloudSleep. 6 inches of high-density memory foam contours to every curve of your body, relieving pressure points and aligning your spine perfectly. The breathable CoolGel layer keeps you cool throughout the night.",
    features: ["6-inch high-density memory foam", "CoolGel temperature regulation", "Pressure point relief", "Hypoallergenic materials", "Medium firmness", "10 year warranty"],
    colors: ["White"],
    sizes: ["Single", "Double", "Queen", "King", "Custom"],
    warrantyYears: 10,
    rating: "4.6",
    reviewCount: 218,
    inStock: true,
    isFeatured: true,
    badge: "Top Rated",
    material: "High-Density Memory Foam",
  },
  {
    name: "Yunora NatureSleep Natural Latex Mattress",
    slug: "yunora-naturesleep-natural-latex-mattress",
    price: "29999",
    originalPrice: "39999",
    category: "mattresses",
    shortDescription: "100% natural latex for eco-conscious luxury sleep",
    description: "Crafted from sustainably sourced 100% natural latex, the NatureSleep offers exceptional buoyancy and breathability. Naturally anti-bacterial, dust-mite resistant, and biodegradable — this is luxury sleep that's kind to the planet. Certified by GOLS (Global Organic Latex Standard).",
    features: ["100% natural latex (GOLS certified)", "Naturally anti-bacterial & dust-mite resistant", "Superior breathability & airflow", "Eco-friendly & biodegradable", "Firm orthopedic support", "20 year warranty"],
    colors: ["Natural White"],
    sizes: ["Single", "Double", "Queen", "King"],
    warrantyYears: 20,
    rating: "4.9",
    reviewCount: 97,
    inStock: true,
    isFeatured: true,
    badge: "Premium",
    material: "Natural Latex",
  },
  {
    name: "Yunora BonelSpring Economy Mattress",
    slug: "yunora-bonelspring-economy-mattress",
    price: "7999",
    originalPrice: "11999",
    category: "mattresses",
    shortDescription: "Quality bonell spring mattress at an unbeatable price",
    description: "Great sleep doesn't have to break the bank. The Yunora BonelSpring delivers reliable support with a traditional bonell spring system topped with a high-density foam comfort layer. Perfect for guest rooms or budget-conscious buyers.",
    features: ["Bonell spring support system", "High-density foam comfort layer", "Knitted fabric cover", "Medium-firm support", "Good air circulation", "5 year warranty"],
    colors: ["White", "Grey"],
    sizes: ["Single", "Double", "Queen"],
    warrantyYears: 5,
    rating: "4.2",
    reviewCount: 184,
    inStock: true,
    isFeatured: false,
    badge: null,
    material: "Bonell Springs + HR Foam",
  },
  // PILLOWS
  {
    name: "Yunora CloudPuff Memory Foam Pillow",
    slug: "yunora-cloudpuff-memory-foam-pillow",
    price: "1499",
    originalPrice: "2199",
    category: "pillows",
    shortDescription: "Ergonomic memory foam pillow for neck and shoulder support",
    description: "Wake up without aches with the Yunora CloudPuff. The ergonomic contoured design supports your neck at the perfect angle while the breathable CoolTouch cover keeps you cool. Made with CertiPUR certified memory foam.",
    features: ["Ergonomic cervical contour design", "CertiPUR certified memory foam", "CoolTouch breathable cover", "Machine washable cover", "Hypoallergenic", "2 year warranty"],
    colors: ["White", "Cream"],
    sizes: ["Standard", "Queen", "King"],
    warrantyYears: 2,
    rating: "4.7",
    reviewCount: 512,
    inStock: true,
    isFeatured: true,
    badge: "Popular",
    material: "Memory Foam",
  },
  {
    name: "Yunora SilkTouch Microfibre Pillow",
    slug: "yunora-silktouch-microfibre-pillow",
    price: "799",
    originalPrice: "1199",
    category: "pillows",
    shortDescription: "Ultra-soft microfibre fill with a silky smooth cover",
    description: "Experience the softness of silk at an accessible price. The Yunora SilkTouch pillow features premium microfibre fill that's both plush and supportive, encased in a 300-thread-count sateen weave cover that feels incredibly smooth against your skin.",
    features: ["Premium microfibre fill", "300 TC sateen cover", "Hypoallergenic & dust-mite resistant", "Machine washable", "Soft support level", "1 year warranty"],
    colors: ["White", "Ivory", "Light Grey"],
    sizes: ["Standard", "Queen"],
    warrantyYears: 1,
    rating: "4.5",
    reviewCount: 287,
    inStock: true,
    isFeatured: false,
    badge: null,
    material: "Microfibre",
  },
  {
    name: "Yunora LuxeDown Alternative Pillow",
    slug: "yunora-luxedown-alternative-pillow",
    price: "1899",
    originalPrice: "2799",
    category: "pillows",
    shortDescription: "Hotel-grade down alternative for cloud-soft comfort",
    description: "Get the plushness of real goose down without the ethical concerns. Our LuxeDown Alternative uses ultra-fine hollow-fibre fill that mimics the loft and softness of genuine down, machine washable and hypoallergenic.",
    features: ["Ultra-fine hollow-fibre fill", "Down-like softness & loft", "Machine washable", "Vegan & cruelty-free", "Medium-soft support", "2 year warranty"],
    colors: ["White"],
    sizes: ["Standard", "Queen", "King"],
    warrantyYears: 2,
    rating: "4.6",
    reviewCount: 143,
    inStock: true,
    isFeatured: false,
    badge: "Vegan",
    material: "Hollow Fibre",
  },
  // SOFAS
  {
    name: "Yunora Palazzo 3-Seater Fabric Sofa",
    slug: "yunora-palazzo-3-seater-fabric-sofa",
    price: "34999",
    originalPrice: "49999",
    category: "sofas",
    shortDescription: "Italian-inspired modern sofa with premium fabric upholstery",
    description: "Make a bold statement with the Yunora Palazzo. Inspired by Italian design, this 3-seater sofa features deep cushioning, high-density foam seats rated for 20 years, solid hardwood frame, and premium woven fabric that's both beautiful and durable.",
    features: ["Solid hardwood frame (teak + pine)", "High-density foam (20-year rated)", "Premium woven fabric upholstery", "Sinuous spring support system", "Anti-pilling fabric treatment", "Stain-resistant finish"],
    colors: ["Charcoal Grey", "Navy Blue", "Olive Green", "Cream Beige"],
    sizes: ["2-Seater", "3-Seater", "L-Shape"],
    warrantyYears: 5,
    rating: "4.7",
    reviewCount: 89,
    inStock: true,
    isFeatured: true,
    badge: "New Arrival",
    material: "Solid Hardwood + Premium Fabric",
  },
  {
    name: "Yunora Royale Leatherette Sectional",
    slug: "yunora-royale-leatherette-sectional",
    price: "54999",
    originalPrice: "74999",
    category: "sofas",
    shortDescription: "Statement L-shape sectional in premium leatherette",
    description: "The Yunora Royale commands any living room with its generous proportions and rich leatherette finish. The modular L-shape design lets you configure it to your space. Built on a solid hardwood frame with high-resilience foam and sinuous spring support.",
    features: ["Premium PU leatherette", "Modular L-shape configuration", "Solid hardwood frame", "High-resilience foam seats", "USB charging port (armrest)", "Easy-clean surface"],
    colors: ["Espresso Brown", "Black", "Dark Grey"],
    sizes: ["L-Shape (Left)", "L-Shape (Right)", "U-Shape"],
    warrantyYears: 3,
    rating: "4.5",
    reviewCount: 62,
    inStock: true,
    isFeatured: true,
    badge: "Premium",
    material: "Leatherette + Solid Hardwood",
  },
  {
    name: "Yunora Breeze 2-Seater Loveseat",
    slug: "yunora-breeze-2-seater-loveseat",
    price: "19999",
    originalPrice: "27999",
    category: "sofas",
    shortDescription: "Compact and stylish loveseat perfect for apartments and studios",
    description: "The Yunora Breeze is designed for modern city living. Its compact footprint fits perfectly in apartments and studios without compromising on comfort or style. The Scandinavian-inspired design works beautifully with any interior.",
    features: ["Compact Scandinavian design", "High-density foam cushions", "Solid beech wood legs", "Premium linen-look fabric", "Easy assembly", "Removable & washable covers"],
    colors: ["Dusty Rose", "Sky Blue", "Sage Green", "Natural Beige"],
    sizes: ["2-Seater"],
    warrantyYears: 3,
    rating: "4.6",
    reviewCount: 134,
    inStock: true,
    isFeatured: false,
    badge: null,
    material: "Linen-look Fabric + Beech Wood",
  },
  // CURTAINS
  {
    name: "Yunora Velvet Luxe Blackout Curtains",
    slug: "yunora-velvet-luxe-blackout-curtains",
    price: "3499",
    originalPrice: "4999",
    category: "curtains",
    shortDescription: "Heavy velvet blackout curtains for complete darkness and luxury",
    description: "Transform your bedroom into a sleep sanctuary with Yunora Velvet Luxe. These heavyweight velvet curtains block 99% of light, reduce outside noise by up to 40%, and add a dramatic, luxurious look to any room. Available in rich jewel tones.",
    features: ["99% blackout capability", "40% noise reduction", "Heavyweight velvet (400 GSM)", "Thermal insulation", "8 eyelet rings included", "Dry clean or gentle machine wash"],
    colors: ["Deep Burgundy", "Navy Blue", "Forest Green", "Charcoal", "Royal Purple", "Blush Pink"],
    sizes: ["4x7 ft", "4x9 ft", "5x7 ft", "5x9 ft", "Custom"],
    warrantyYears: null,
    rating: "4.8",
    reviewCount: 203,
    inStock: true,
    isFeatured: true,
    badge: "Best Seller",
    material: "400 GSM Heavy Velvet",
  },
  {
    name: "Yunora Sheer Linen Eyelet Curtains",
    slug: "yunora-sheer-linen-eyelet-curtains",
    price: "1799",
    originalPrice: "2599",
    category: "curtains",
    shortDescription: "Elegant sheer linen curtains for soft, diffused natural light",
    description: "Create an airy, Hamptons-inspired feel with Yunora Sheer Linen curtains. The natural linen weave filters sunlight beautifully, filling your room with warm, soft light while maintaining privacy. Perfect for living rooms and dining spaces.",
    features: ["Natural linen-cotton blend", "Light-filtering (not blackout)", "8 silver eyelet rings", "Pre-stitched hem", "Machine washable", "Eco-friendly dyes"],
    colors: ["Natural Ivory", "Warm White", "Soft Taupe", "Pale Grey"],
    sizes: ["4x7 ft", "4x9 ft", "5x7 ft", "5x9 ft"],
    warrantyYears: null,
    rating: "4.6",
    reviewCount: 178,
    inStock: true,
    isFeatured: false,
    badge: null,
    material: "Linen-Cotton Blend",
  },
  {
    name: "Yunora Jacquard Gold Weave Curtains",
    slug: "yunora-jacquard-gold-weave-curtains",
    price: "4299",
    originalPrice: "6499",
    category: "curtains",
    shortDescription: "Opulent jacquard curtains with gold thread weave pattern",
    description: "Elevate your interiors to five-star luxury with the Yunora Jacquard Gold Weave. Hand-finished with delicate gold thread patterns woven into rich base fabrics, these curtains are a statement piece in any room.",
    features: ["Intricate jacquard gold weave", "Semi-blackout (70% light block)", "Heavyweight fabric (350 GSM)", "Pinch pleat heading", "Dry clean recommended", "Set of 2 panels"],
    colors: ["Gold & Cream", "Gold & Maroon", "Gold & Teal"],
    sizes: ["4x9 ft", "5x9 ft", "Custom"],
    warrantyYears: null,
    rating: "4.9",
    reviewCount: 56,
    inStock: true,
    isFeatured: false,
    badge: "Luxury",
    material: "Jacquard Woven Fabric",
  },
  // BEAN BAGS
  {
    name: "Yunora Giant XL Bean Bag Chair",
    slug: "yunora-giant-xl-bean-bag-chair",
    price: "4999",
    originalPrice: "6999",
    category: "bean-bags",
    shortDescription: "Oversized XL bean bag for ultimate lounge comfort",
    description: "The Yunora Giant XL is the ultimate in lounge furniture. Stuffed with ultra-fine virgin EPS beads for instant comfort that molds to your body, covered in premium leatherette that's easy to clean and looks incredible.",
    features: ["Giant XL size (fits adults comfortably)", "Ultra-fine virgin EPS beads", "Premium leatherette cover", "Double-stitched seams", "Refillable design", "Easy-clean surface"],
    colors: ["Black", "Chocolate Brown", "Red", "Navy Blue", "Dark Grey"],
    sizes: ["XL (4.5 ft)"],
    warrantyYears: 1,
    rating: "4.7",
    reviewCount: 389,
    inStock: true,
    isFeatured: true,
    badge: "Popular",
    material: "Premium Leatherette + EPS Beads",
  },
  {
    name: "Yunora Velvet Round Pouffe Bean Bag",
    slug: "yunora-velvet-round-pouffe-bean-bag",
    price: "2499",
    originalPrice: "3499",
    category: "bean-bags",
    shortDescription: "Chic velvet pouffe bean bag — footrest or extra seating",
    description: "The Yunora Velvet Pouffe does double duty as a stylish footrest and extra seating. The soft velvet cover in rich colors adds a luxurious touch to any room, while the EPS bead fill provides just the right amount of firmness.",
    features: ["Premium velvet cover", "Round pouffe design", "EPS bead fill", "Handles for easy moving", "Removable & washable cover", "Supports up to 120kg"],
    colors: ["Teal", "Blush Pink", "Mustard Yellow", "Sage Green", "Charcoal"],
    sizes: ["Standard (2.5 ft)", "Large (3 ft)"],
    warrantyYears: 1,
    rating: "4.5",
    reviewCount: 231,
    inStock: true,
    isFeatured: false,
    badge: null,
    material: "Premium Velvet + EPS Beads",
  },
  {
    name: "Yunora Kids PlayPuff Bean Bag",
    slug: "yunora-kids-playpuff-bean-bag",
    price: "1799",
    originalPrice: "2499",
    category: "bean-bags",
    shortDescription: "Fun and safe bean bag specially designed for children",
    description: "Give your little ones their own cosy corner with the Yunora PlayPuff. Made with child-safe materials, a double-lock zipper safety system, and a machine-washable cover in fun colours they'll love.",
    features: ["Child-safe materials (non-toxic)", "Double-lock child-proof zipper", "Machine-washable cover", "Lightweight & portable", "Virgin EPS beads fill", "Bright fun colours"],
    colors: ["Sky Blue", "Sunny Yellow", "Coral Pink", "Lime Green"],
    sizes: ["Kids (3 ft)"],
    warrantyYears: 1,
    rating: "4.8",
    reviewCount: 167,
    inStock: true,
    isFeatured: false,
    badge: null,
    material: "Child-Safe Fabric + EPS Beads",
  },
  // BEDSHEETS
  {
    name: "Yunora 1000TC Egyptian Cotton Bedsheet Set",
    slug: "yunora-1000tc-egyptian-cotton-bedsheet-set",
    price: "5999",
    originalPrice: "8999",
    category: "bedsheets",
    shortDescription: "Hotel-luxury 1000 thread count Egyptian cotton, set of 4",
    description: "Sleep like royalty with Yunora's 1000 thread count Egyptian cotton bedsheet set. The long-staple cotton fibres create a fabric so smooth and lustrous it rivals five-star hotel linen. Set includes 1 fitted sheet, 1 flat sheet, and 2 pillowcases.",
    features: ["1000 TC Egyptian cotton", "Long-staple extra-fine fibres", "Sateen weave (silky sheen)", "Set of 4 pieces", "Deep pocket fitted sheet (up to 14 inch)", "Machine washable"],
    colors: ["Bright White", "Ivory", "Pearl Grey", "Dusty Rose", "Sky Blue"],
    sizes: ["Single", "Double", "Queen", "King"],
    warrantyYears: null,
    rating: "4.9",
    reviewCount: 274,
    inStock: true,
    isFeatured: true,
    badge: "Hotel Luxury",
    material: "1000 TC Egyptian Cotton",
  },
  {
    name: "Yunora 600TC Pure Cotton Bedsheet Set",
    slug: "yunora-600tc-pure-cotton-bedsheet-set",
    price: "2999",
    originalPrice: "4499",
    category: "bedsheets",
    shortDescription: "Crisp and cool 600 TC percale cotton — set of 4",
    description: "The Yunora 600TC Percale set offers that satisfying crisp, cool feel that gets softer with every wash. Made from pure long-staple cotton in a tight percale weave, it's breathable, durable, and perfect for hot Indian summers.",
    features: ["600 TC pure cotton", "Percale weave (crisp & cool feel)", "Gets softer with every wash", "Set of 4 pieces", "Breathable for Indian summers", "Machine washable up to 60°C"],
    colors: ["White", "Cream", "Light Blue", "Mint Green", "Lavender", "Coral"],
    sizes: ["Single", "Double", "Queen", "King"],
    warrantyYears: null,
    rating: "4.6",
    reviewCount: 412,
    inStock: true,
    isFeatured: false,
    badge: "Top Rated",
    material: "600 TC Percale Cotton",
  },
  {
    name: "Yunora Bamboo Silk Bedsheet Set",
    slug: "yunora-bamboo-silk-bedsheet-set",
    price: "4499",
    originalPrice: "6499",
    category: "bedsheets",
    shortDescription: "Eco-friendly bamboo-silk blend for temperature-regulating sleep",
    description: "The future of sleep is here. Yunora's bamboo-silk blend is naturally temperature regulating, moisture-wicking, and softer than conventional cotton. Bamboo is one of the most sustainable plants on earth — sleep well and feel good about it.",
    features: ["70% bamboo / 30% silk blend", "Naturally temperature regulating", "Moisture-wicking & anti-bacterial", "Ultra-smooth, silky feel", "Eco-certified sustainable bamboo", "Gentle machine washable"],
    colors: ["Warm White", "Dove Grey", "Sage Green", "Soft Blush"],
    sizes: ["Single", "Double", "Queen", "King"],
    warrantyYears: null,
    rating: "4.8",
    reviewCount: 128,
    inStock: true,
    isFeatured: true,
    badge: "Eco Luxury",
    material: "Bamboo-Silk Blend",
  },
];

// ─── ORDERS ───
const orders = [
  {
    orderId: "YUN-1748900001-042",
    status: "delivered",
    fullName: "Priya Mehta", phone: "9876543210", email: "priya@example.com",
    address: "204, Sunshine Apartments, SG Highway", city: "Ahmedabad", state: "Gujarat", pinCode: "380054",
    items: [{ id: 1, name: "Yunora ActivePro Orthopedic Mattress", quantity: 1, price: 18999, size: "Queen" }],
    totalAmount: "18999", paymentMethod: "razorpay", couponCode: null, razorpayOrderId: "pay_abc123",
  },
  {
    orderId: "YUN-1748900002-017",
    status: "shipped",
    fullName: "Rajesh Kumar", phone: "9812345670", email: "rajesh@example.com",
    address: "12, Green Park Colony", city: "Surat", state: "Gujarat", pinCode: "395003",
    items: [
      { id: 8, name: "Yunora Palazzo 3-Seater Fabric Sofa", quantity: 1, price: 34999, color: "Charcoal Grey" },
      { id: 11, name: "Yunora Velvet Luxe Blackout Curtains", quantity: 2, price: 3499 },
    ],
    totalAmount: "41997", paymentMethod: "cod", couponCode: null, razorpayOrderId: null,
  },
  {
    orderId: "YUN-1748900003-089",
    status: "processing",
    fullName: "Sneha Patel", phone: "9900112233", email: null,
    address: "Flat 5B, Lotus Tower, Andheri West", city: "Mumbai", state: "Maharashtra", pinCode: "400053",
    items: [{ id: 2, name: "Yunora CloudSleep Memory Foam Mattress", quantity: 1, price: 14499, size: "Double" }],
    totalAmount: "14499", paymentMethod: "razorpay", couponCode: "FIRST10", razorpayOrderId: "pay_def456",
  },
  {
    orderId: "YUN-1748900004-133",
    status: "confirmed",
    fullName: "Amit Shah", phone: "9988776655", email: "amit.shah@gmail.com",
    address: "B-7, Patel Nagar", city: "Palanpur", state: "Gujarat", pinCode: "385001",
    items: [
      { id: 5, name: "Yunora CloudPuff Memory Foam Pillow", quantity: 2, price: 1499 },
      { id: 17, name: "Yunora 1000TC Egyptian Cotton Bedsheet Set", quantity: 1, price: 5999, size: "Queen" },
    ],
    totalAmount: "8997", paymentMethod: "upi", couponCode: null, razorpayOrderId: null,
  },
  {
    orderId: "YUN-1748900005-201",
    status: "pending",
    fullName: "Kavya Sharma", phone: "9765432180", email: "kavya@example.com",
    address: "22, Model Town", city: "Jaipur", state: "Rajasthan", pinCode: "302001",
    items: [{ id: 13, name: "Yunora Giant XL Bean Bag Chair", quantity: 1, price: 4999, color: "Navy Blue" }],
    totalAmount: "4999", paymentMethod: "cod", couponCode: null, razorpayOrderId: null,
  },
  {
    orderId: "YUN-1748900006-078",
    status: "delivered",
    fullName: "Vikram Nair", phone: "9654321890", email: "vikram@example.com",
    address: "Flat 301, Palm Grove, Indiranagar", city: "Bengaluru", state: "Karnataka", pinCode: "560038",
    items: [
      { id: 3, name: "Yunora NatureSleep Natural Latex Mattress", quantity: 1, price: 29999, size: "King" },
      { id: 5, name: "Yunora CloudPuff Memory Foam Pillow", quantity: 2, price: 1499 },
    ],
    totalAmount: "32997", paymentMethod: "razorpay", couponCode: "LUXURY20", razorpayOrderId: "pay_ghi789",
  },
];

// ─── NEWSLETTER SUBSCRIBERS ───
const subscribers = [
  { email: "priya.m@gmail.com", name: "Priya Mehta" },
  { email: "rajesh.k@yahoo.in", name: "Rajesh Kumar" },
  { email: "sneha.p@gmail.com", name: "Sneha Patel" },
  { email: "amit.shah@gmail.com", name: "Amit Shah" },
  { email: "kavya.s@outlook.com", name: "Kavya Sharma" },
  { email: "vikram.n@gmail.com", name: "Vikram Nair" },
  { email: "rohit.v@gmail.com", name: "Rohit Verma" },
  { email: "ananya.d@gmail.com", name: "Ananya Desai" },
  { email: "suresh.r@yahoo.co.in", name: "Suresh Rao" },
  { email: "meera.j@gmail.com", name: "Meera Joshi" },
  { email: "furniture.lover@gmail.com", name: null },
  { email: "homedecor.fan@gmail.com", name: null },
];

async function seed() {
  console.log("🌱 Starting Yunora database seed...\n");

  // Clear existing data
  console.log("🗑️  Clearing existing data...");
  await db.delete(newsletterTable);
  await db.delete(ordersTable);
  await db.delete(productsTable);
  await db.delete(categoriesTable);

  // Seed categories
  console.log("📂 Seeding categories...");
  const insertedCats = await db.insert(categoriesTable).values(categories).returning();
  console.log(`   ✅ ${insertedCats.length} categories created`);

  // Seed products
  console.log("📦 Seeding products...");
  const insertedProducts = await db.insert(productsTable).values(products).returning();
  console.log(`   ✅ ${insertedProducts.length} products created`);

  // Update category product counts
  const catCounts: Record<string, number> = {};
  for (const p of products) {
    catCounts[p.category] = (catCounts[p.category] ?? 0) + 1;
  }
  for (const cat of insertedCats) {
    await db.update(categoriesTable)
      .set({ productCount: catCounts[cat.slug] ?? 0 })
      .where(eq(categoriesTable.id, cat.id));
  }
  console.log("   ✅ Category product counts updated");

  // Seed orders
  console.log("🛒 Seeding orders...");
  const insertedOrders = await db.insert(ordersTable).values(orders).returning();
  console.log(`   ✅ ${insertedOrders.length} orders created`);

  // Seed newsletter subscribers
  console.log("📧 Seeding newsletter subscribers...");
  const insertedSubs = await db.insert(newsletterTable).values(subscribers).returning();
  console.log(`   ✅ ${insertedSubs.length} subscribers created`);

  console.log("\n🎉 Seed complete! Yunora database is ready.\n");
  console.log("Summary:");
  console.log(`  • ${insertedCats.length} categories`);
  console.log(`  • ${insertedProducts.length} products`);
  console.log(`  • ${insertedOrders.length} orders`);
  console.log(`  • ${insertedSubs.length} newsletter subscribers`);

  await pool.end();
}

// Need to import eq for the update
import { eq } from "drizzle-orm";

seed().catch(err => {
  console.error("❌ Seed failed:", err);
  pool.end();
  process.exit(1);
});
