import pg from "pg";
const { Pool } = pg;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const products = [
  // MATTRESSES
  { name: "Yunora ActivePro Orthopedic Mattress", slug: "yunora-activepro-orthopedic-mattress", price: "18999", original_price: "26999", category: "mattresses", subcategory: null, short_description: "7-zone orthopedic support with dual-side comfort for all sleeping positions", description: "The Yunora ActivePro is engineered for those who demand restorative sleep. Featuring 7-zone independent pocket spring support, dual-sided firmness (soft/medium), and OekoTex-certified memory foam layers, this mattress adapts perfectly to your body shape.", features: ["7-zone pocket spring system","Dual-side firmness (soft & medium)","OekoTex certified memory foam","Motion isolation technology","Anti-dust-mite fabric cover","15 year warranty"], colors: ["White","Cream"], sizes: ["Single","Double","Queen","King"], warranty_years: 15, rating: "4.8", review_count: 342, in_stock: true, is_featured: true, badge: "Best Seller", material: "Memory Foam + Pocket Springs" },
  { name: "Yunora CloudSleep Memory Foam Mattress", slug: "yunora-cloudsleep-memory-foam-mattress", price: "14499", original_price: "19999", category: "mattresses", subcategory: null, short_description: "Pure memory foam with body-contouring comfort and pressure relief", description: "Sink into cloud-like comfort with the Yunora CloudSleep. 6 inches of high-density memory foam contours to every curve of your body, relieving pressure points and aligning your spine perfectly.", features: ["6-inch high-density memory foam","CoolGel temperature regulation","Pressure point relief","Hypoallergenic materials","Medium firmness","10 year warranty"], colors: ["White"], sizes: ["Single","Double","Queen","King","Custom"], warranty_years: 10, rating: "4.6", review_count: 218, in_stock: true, is_featured: true, badge: "Top Rated", material: "High-Density Memory Foam" },
  { name: "Yunora NatureSleep Natural Latex Mattress", slug: "yunora-naturesleep-natural-latex-mattress", price: "29999", original_price: "39999", category: "mattresses", subcategory: null, short_description: "100% natural latex for eco-conscious luxury sleep", description: "Crafted from sustainably sourced 100% natural latex, the NatureSleep offers exceptional buoyancy and breathability. Naturally anti-bacterial and dust-mite resistant. Certified by GOLS.", features: ["100% natural latex (GOLS certified)","Naturally anti-bacterial & dust-mite resistant","Superior breathability","Eco-friendly & biodegradable","Firm orthopedic support","20 year warranty"], colors: ["Natural White"], sizes: ["Single","Double","Queen","King"], warranty_years: 20, rating: "4.9", review_count: 97, in_stock: true, is_featured: true, badge: "Premium", material: "Natural Latex" },
  { name: "Yunora BonelSpring Economy Mattress", slug: "yunora-bonelspring-economy-mattress", price: "7999", original_price: "11999", category: "mattresses", subcategory: null, short_description: "Quality bonell spring mattress at an unbeatable price", description: "Great sleep doesn't have to break the bank. The Yunora BonelSpring delivers reliable support with a traditional bonell spring system topped with a high-density foam comfort layer.", features: ["Bonell spring support system","High-density foam comfort layer","Knitted fabric cover","Medium-firm support","Good air circulation","5 year warranty"], colors: ["White","Grey"], sizes: ["Single","Double","Queen"], warranty_years: 5, rating: "4.2", review_count: 184, in_stock: true, is_featured: false, badge: null, material: "Bonell Springs + HR Foam" },
  // PILLOWS
  { name: "Yunora CloudPuff Memory Foam Pillow", slug: "yunora-cloudpuff-memory-foam-pillow", price: "1499", original_price: "2199", category: "pillows", subcategory: null, short_description: "Ergonomic memory foam pillow for neck and shoulder support", description: "Wake up without aches with the Yunora CloudPuff. The ergonomic contoured design supports your neck at the perfect angle while the breathable CoolTouch cover keeps you cool.", features: ["Ergonomic cervical contour design","CertiPUR certified memory foam","CoolTouch breathable cover","Machine washable cover","Hypoallergenic","2 year warranty"], colors: ["White","Cream"], sizes: ["Standard","Queen","King"], warranty_years: 2, rating: "4.7", review_count: 512, in_stock: true, is_featured: true, badge: "Popular", material: "Memory Foam" },
  { name: "Yunora SilkTouch Microfibre Pillow", slug: "yunora-silktouch-microfibre-pillow", price: "799", original_price: "1199", category: "pillows", subcategory: null, short_description: "Ultra-soft microfibre fill with a silky smooth cover", description: "Experience the softness of silk at an accessible price. Premium microfibre fill encased in a 300-thread-count sateen weave cover.", features: ["Premium microfibre fill","300 TC sateen cover","Hypoallergenic & dust-mite resistant","Machine washable","Soft support level","1 year warranty"], colors: ["White","Ivory","Light Grey"], sizes: ["Standard","Queen"], warranty_years: 1, rating: "4.5", review_count: 287, in_stock: true, is_featured: false, badge: null, material: "Microfibre" },
  { name: "Yunora LuxeDown Alternative Pillow", slug: "yunora-luxedown-alternative-pillow", price: "1899", original_price: "2799", category: "pillows", subcategory: null, short_description: "Hotel-grade down alternative for cloud-soft comfort", description: "Get the plushness of real goose down without the ethical concerns. Ultra-fine hollow-fibre fill that mimics the loft and softness of genuine down.", features: ["Ultra-fine hollow-fibre fill","Down-like softness & loft","Machine washable","Vegan & cruelty-free","Medium-soft support","2 year warranty"], colors: ["White"], sizes: ["Standard","Queen","King"], warranty_years: 2, rating: "4.6", review_count: 143, in_stock: true, is_featured: false, badge: "Vegan", material: "Hollow Fibre" },
  // SOFAS
  { name: "Yunora Palazzo 3-Seater Fabric Sofa", slug: "yunora-palazzo-3-seater-fabric-sofa", price: "34999", original_price: "49999", category: "sofas", subcategory: null, short_description: "Italian-inspired modern sofa with premium fabric upholstery", description: "Make a bold statement with the Yunora Palazzo. Deep cushioning, high-density foam seats rated for 20 years, solid hardwood frame, and premium woven fabric.", features: ["Solid hardwood frame (teak + pine)","High-density foam (20-year rated)","Premium woven fabric upholstery","Sinuous spring support system","Anti-pilling fabric treatment","Stain-resistant finish"], colors: ["Charcoal Grey","Navy Blue","Olive Green","Cream Beige"], sizes: ["2-Seater","3-Seater","L-Shape"], warranty_years: 5, rating: "4.7", review_count: 89, in_stock: true, is_featured: true, badge: "New Arrival", material: "Solid Hardwood + Premium Fabric" },
  { name: "Yunora Royale Leatherette Sectional", slug: "yunora-royale-leatherette-sectional", price: "54999", original_price: "74999", category: "sofas", subcategory: null, short_description: "Statement L-shape sectional in premium leatherette", description: "The Yunora Royale commands any living room with its generous proportions and rich leatherette finish. Modular L-shape design with solid hardwood frame.", features: ["Premium PU leatherette","Modular L-shape configuration","Solid hardwood frame","High-resilience foam seats","USB charging port (armrest)","Easy-clean surface"], colors: ["Espresso Brown","Black","Dark Grey"], sizes: ["L-Shape (Left)","L-Shape (Right)","U-Shape"], warranty_years: 3, rating: "4.5", review_count: 62, in_stock: true, is_featured: true, badge: "Premium", material: "Leatherette + Solid Hardwood" },
  { name: "Yunora Breeze 2-Seater Loveseat", slug: "yunora-breeze-2-seater-loveseat", price: "19999", original_price: "27999", category: "sofas", subcategory: null, short_description: "Compact and stylish loveseat perfect for apartments", description: "Designed for modern city living. Compact footprint with Scandinavian-inspired design, high-density foam cushions, solid beech wood legs.", features: ["Compact Scandinavian design","High-density foam cushions","Solid beech wood legs","Premium linen-look fabric","Easy assembly","Removable & washable covers"], colors: ["Dusty Rose","Sky Blue","Sage Green","Natural Beige"], sizes: ["2-Seater"], warranty_years: 3, rating: "4.6", review_count: 134, in_stock: true, is_featured: false, badge: null, material: "Linen-look Fabric + Beech Wood" },
  // CURTAINS
  { name: "Yunora Velvet Luxe Blackout Curtains", slug: "yunora-velvet-luxe-blackout-curtains", price: "3499", original_price: "4999", category: "curtains", subcategory: null, short_description: "Heavy velvet blackout curtains for complete darkness and luxury", description: "Transform your bedroom into a sleep sanctuary. 99% blackout capability, 40% noise reduction, heavyweight velvet in rich jewel tones.", features: ["99% blackout capability","40% noise reduction","Heavyweight velvet (400 GSM)","Thermal insulation","8 eyelet rings included","Dry clean or gentle machine wash"], colors: ["Deep Burgundy","Navy Blue","Forest Green","Charcoal","Royal Purple","Blush Pink"], sizes: ["4x7 ft","4x9 ft","5x7 ft","5x9 ft","Custom"], warranty_years: null, rating: "4.8", review_count: 203, in_stock: true, is_featured: true, badge: "Best Seller", material: "400 GSM Heavy Velvet" },
  { name: "Yunora Sheer Linen Eyelet Curtains", slug: "yunora-sheer-linen-eyelet-curtains", price: "1799", original_price: "2599", category: "curtains", subcategory: null, short_description: "Elegant sheer linen curtains for soft, diffused natural light", description: "Create an airy, Hamptons-inspired feel. Natural linen weave filters sunlight beautifully, filling your room with warm, soft light while maintaining privacy.", features: ["Natural linen-cotton blend","Light-filtering (not blackout)","8 silver eyelet rings","Pre-stitched hem","Machine washable","Eco-friendly dyes"], colors: ["Natural Ivory","Warm White","Soft Taupe","Pale Grey"], sizes: ["4x7 ft","4x9 ft","5x7 ft","5x9 ft"], warranty_years: null, rating: "4.6", review_count: 178, in_stock: true, is_featured: false, badge: null, material: "Linen-Cotton Blend" },
  { name: "Yunora Jacquard Gold Weave Curtains", slug: "yunora-jacquard-gold-weave-curtains", price: "4299", original_price: "6499", category: "curtains", subcategory: null, short_description: "Opulent jacquard curtains with gold thread weave pattern", description: "Elevate your interiors to five-star luxury. Hand-finished with delicate gold thread patterns woven into rich base fabrics.", features: ["Intricate jacquard gold weave","Semi-blackout (70% light block)","Heavyweight fabric (350 GSM)","Pinch pleat heading","Dry clean recommended","Set of 2 panels"], colors: ["Gold & Cream","Gold & Maroon","Gold & Teal"], sizes: ["4x9 ft","5x9 ft","Custom"], warranty_years: null, rating: "4.9", review_count: 56, in_stock: true, is_featured: false, badge: "Luxury", material: "Jacquard Woven Fabric" },
  // BEAN BAGS
  { name: "Yunora Giant XL Bean Bag Chair", slug: "yunora-giant-xl-bean-bag-chair", price: "4999", original_price: "6999", category: "bean-bags", subcategory: null, short_description: "Oversized XL bean bag for ultimate lounge comfort", description: "The ultimate lounge furniture. Ultra-fine virgin EPS beads for instant comfort that molds to your body, covered in premium leatherette.", features: ["Giant XL size (fits adults comfortably)","Ultra-fine virgin EPS beads","Premium leatherette cover","Double-stitched seams","Refillable design","Easy-clean surface"], colors: ["Black","Chocolate Brown","Red","Navy Blue","Dark Grey"], sizes: ["XL (4.5 ft)"], warranty_years: 1, rating: "4.7", review_count: 389, in_stock: true, is_featured: true, badge: "Popular", material: "Premium Leatherette + EPS Beads" },
  { name: "Yunora Velvet Round Pouffe Bean Bag", slug: "yunora-velvet-round-pouffe-bean-bag", price: "2499", original_price: "3499", category: "bean-bags", subcategory: null, short_description: "Chic velvet pouffe bean bag — footrest or extra seating", description: "The Yunora Velvet Pouffe does double duty as a stylish footrest and extra seating. Soft velvet cover in rich colors with EPS bead fill.", features: ["Premium velvet cover","Round pouffe design","EPS bead fill","Handles for easy moving","Removable & washable cover","Supports up to 120kg"], colors: ["Teal","Blush Pink","Mustard Yellow","Sage Green","Charcoal"], sizes: ["Standard (2.5 ft)","Large (3 ft)"], warranty_years: 1, rating: "4.5", review_count: 231, in_stock: true, is_featured: false, badge: null, material: "Premium Velvet + EPS Beads" },
  { name: "Yunora Kids PlayPuff Bean Bag", slug: "yunora-kids-playpuff-bean-bag", price: "1799", original_price: "2499", category: "bean-bags", subcategory: null, short_description: "Fun and safe bean bag specially designed for children", description: "Give your little ones their own cosy corner. Child-safe materials, double-lock zipper, and machine-washable cover.", features: ["Child-safe materials (non-toxic)","Double-lock child-proof zipper","Machine-washable cover","Lightweight & portable","Virgin EPS beads fill","Bright fun colours"], colors: ["Sky Blue","Sunny Yellow","Coral Pink","Lime Green"], sizes: ["Kids (3 ft)"], warranty_years: 1, rating: "4.8", review_count: 167, in_stock: true, is_featured: false, badge: null, material: "Child-Safe Fabric + EPS Beads" },
  // BEDSHEETS
  { name: "Yunora 1000TC Egyptian Cotton Bedsheet Set", slug: "yunora-1000tc-egyptian-cotton-bedsheet-set", price: "5999", original_price: "8999", category: "bedsheets", subcategory: null, short_description: "Hotel-luxury 1000 thread count Egyptian cotton, set of 4", description: "Sleep like royalty with 1000 TC Egyptian cotton. Long-staple fibres create a fabric so smooth it rivals five-star hotel linen. Set of 4 pieces.", features: ["1000 TC Egyptian cotton","Long-staple extra-fine fibres","Sateen weave (silky sheen)","Set of 4 pieces","Deep pocket fitted sheet (up to 14 inch)","Machine washable"], colors: ["Bright White","Ivory","Pearl Grey","Dusty Rose","Sky Blue"], sizes: ["Single","Double","Queen","King"], warranty_years: null, rating: "4.9", review_count: 274, in_stock: true, is_featured: true, badge: "Hotel Luxury", material: "1000 TC Egyptian Cotton" },
  { name: "Yunora 600TC Pure Cotton Bedsheet Set", slug: "yunora-600tc-pure-cotton-bedsheet-set", price: "2999", original_price: "4499", category: "bedsheets", subcategory: null, short_description: "Crisp and cool 600 TC percale cotton — set of 4", description: "Crisp, cool percale feel that gets softer with every wash. Made from pure long-staple cotton, breathable and perfect for hot Indian summers.", features: ["600 TC pure cotton","Percale weave (crisp & cool feel)","Gets softer with every wash","Set of 4 pieces","Breathable for Indian summers","Machine washable up to 60°C"], colors: ["White","Cream","Light Blue","Mint Green","Lavender","Coral"], sizes: ["Single","Double","Queen","King"], warranty_years: null, rating: "4.6", review_count: 412, in_stock: true, is_featured: false, badge: "Top Rated", material: "600 TC Percale Cotton" },
  { name: "Yunora Bamboo Silk Bedsheet Set", slug: "yunora-bamboo-silk-bedsheet-set", price: "4499", original_price: "6499", category: "bedsheets", subcategory: null, short_description: "Eco-friendly bamboo-silk blend for temperature-regulating sleep", description: "Naturally temperature regulating, moisture-wicking, and softer than conventional cotton. Eco-certified sustainable bamboo.", features: ["70% bamboo / 30% silk blend","Naturally temperature regulating","Moisture-wicking & anti-bacterial","Ultra-smooth, silky feel","Eco-certified sustainable bamboo","Gentle machine washable"], colors: ["Warm White","Dove Grey","Sage Green","Soft Blush"], sizes: ["Single","Double","Queen","King"], warranty_years: null, rating: "4.8", review_count: 128, in_stock: true, is_featured: true, badge: "Eco Luxury", material: "Bamboo-Silk Blend" },
];

const categories = [
  { name: "Mattresses", slug: "mattresses", description: "Orthopedic and luxury mattresses for perfect sleep", product_count: 4 },
  { name: "Pillows", slug: "pillows", description: "Premium comfort pillows for every sleep style", product_count: 3 },
  { name: "Sofas", slug: "sofas", description: "Designer sofas and sectionals for every living space", product_count: 3 },
  { name: "Curtains", slug: "curtains", description: "Luxury curtains and drapes to dress your windows", product_count: 3 },
  { name: "Bean Bags", slug: "bean-bags", description: "Premium bean bags and loungers for ultimate relaxation", product_count: 3 },
  { name: "Bedsheets", slug: "bedsheets", description: "High-thread-count bedsheets for a hotel-quality sleep", product_count: 3 },
];

const orders = [
  { order_id: "YUN-1748900001-042", status: "delivered", full_name: "Priya Mehta", phone: "9876543210", email: "priya@example.com", address: "204, Sunshine Apartments, SG Highway", city: "Ahmedabad", state: "Gujarat", pin_code: "380054", items: JSON.stringify([{ name: "Yunora ActivePro Orthopedic Mattress", quantity: 1, price: 18999, size: "Queen" }]), total_amount: "18999", payment_method: "razorpay", coupon_code: null, razorpay_order_id: "pay_abc123" },
  { order_id: "YUN-1748900002-017", status: "shipped", full_name: "Rajesh Kumar", phone: "9812345670", email: "rajesh@example.com", address: "12, Green Park Colony", city: "Surat", state: "Gujarat", pin_code: "395003", items: JSON.stringify([{ name: "Yunora Palazzo 3-Seater Fabric Sofa", quantity: 1, price: 34999 }, { name: "Yunora Velvet Luxe Blackout Curtains", quantity: 2, price: 3499 }]), total_amount: "41997", payment_method: "cod", coupon_code: null, razorpay_order_id: null },
  { order_id: "YUN-1748900003-089", status: "processing", full_name: "Sneha Patel", phone: "9900112233", email: null, address: "Flat 5B, Lotus Tower, Andheri West", city: "Mumbai", state: "Maharashtra", pin_code: "400053", items: JSON.stringify([{ name: "Yunora CloudSleep Memory Foam Mattress", quantity: 1, price: 14499, size: "Double" }]), total_amount: "14499", payment_method: "razorpay", coupon_code: "FIRST10", razorpay_order_id: "pay_def456" },
  { order_id: "YUN-1748900004-133", status: "confirmed", full_name: "Amit Shah", phone: "9988776655", email: "amit.shah@gmail.com", address: "B-7, Patel Nagar", city: "Palanpur", state: "Gujarat", pin_code: "385001", items: JSON.stringify([{ name: "Yunora CloudPuff Memory Foam Pillow", quantity: 2, price: 1499 }, { name: "Yunora 1000TC Egyptian Cotton Bedsheet Set", quantity: 1, price: 5999, size: "Queen" }]), total_amount: "8997", payment_method: "upi", coupon_code: null, razorpay_order_id: null },
  { order_id: "YUN-1748900005-201", status: "pending", full_name: "Kavya Sharma", phone: "9765432180", email: "kavya@example.com", address: "22, Model Town", city: "Jaipur", state: "Rajasthan", pin_code: "302001", items: JSON.stringify([{ name: "Yunora Giant XL Bean Bag Chair", quantity: 1, price: 4999, color: "Navy Blue" }]), total_amount: "4999", payment_method: "cod", coupon_code: null, razorpay_order_id: null },
  { order_id: "YUN-1748900006-078", status: "delivered", full_name: "Vikram Nair", phone: "9654321890", email: "vikram@example.com", address: "Flat 301, Palm Grove, Indiranagar", city: "Bengaluru", state: "Karnataka", pin_code: "560038", items: JSON.stringify([{ name: "Yunora NatureSleep Natural Latex Mattress", quantity: 1, price: 29999, size: "King" }, { name: "Yunora CloudPuff Memory Foam Pillow", quantity: 2, price: 1499 }]), total_amount: "32997", payment_method: "razorpay", coupon_code: "LUXURY20", razorpay_order_id: "pay_ghi789" },
  { order_id: "YUN-1748900007-055", status: "delivered", full_name: "Rohan Desai", phone: "9123456780", email: "rohan@example.com", address: "15, Rose Garden Society", city: "Pune", state: "Maharashtra", pin_code: "411001", items: JSON.stringify([{ name: "Yunora Velvet Luxe Blackout Curtains", quantity: 4, price: 3499 }]), total_amount: "13996", payment_method: "razorpay", coupon_code: null, razorpay_order_id: "pay_jkl012" },
  { order_id: "YUN-1748900008-099", status: "delivered", full_name: "Meera Joshi", phone: "9871234560", email: "meera@example.com", address: "C-42, Sector 18", city: "Noida", state: "Uttar Pradesh", pin_code: "201301", items: JSON.stringify([{ name: "Yunora 1000TC Egyptian Cotton Bedsheet Set", quantity: 2, price: 5999, size: "King" }]), total_amount: "11998", payment_method: "upi", coupon_code: "NEWUSER", razorpay_order_id: null },
];

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
  { email: "luxury.sleep@gmail.com", name: null },
  { email: "rohan.d@gmail.com", name: "Rohan Desai" },
  { email: "pooja.sharma@gmail.com", name: "Pooja Sharma" },
];

async function seed() {
  const client = await pool.connect();
  try {
    console.log("🌱 Starting Yunora database seed...\n");

    console.log("🗑️  Clearing existing data...");
    await client.query("DELETE FROM newsletter");
    await client.query("DELETE FROM orders");
    await client.query("DELETE FROM products");
    await client.query("DELETE FROM categories");

    // Seed categories
    console.log("📂 Seeding 6 categories...");
    for (const c of categories) {
      await client.query(
        `INSERT INTO categories (name, slug, description, product_count) VALUES ($1, $2, $3, $4)`,
        [c.name, c.slug, c.description, c.product_count]
      );
    }
    console.log("   ✅ Categories done");

    // Seed products
    console.log("📦 Seeding 19 products...");
    for (const p of products) {
      await client.query(
        `INSERT INTO products (name, slug, price, original_price, category, subcategory, short_description, description, features, colors, sizes, warranty_years, rating, review_count, in_stock, is_featured, badge, material)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18)`,
        [
          p.name, p.slug, p.price, p.original_price, p.category, p.subcategory,
          p.short_description, p.description,
          JSON.stringify(p.features), JSON.stringify(p.colors), JSON.stringify(p.sizes),
          p.warranty_years, p.rating, p.review_count, p.in_stock, p.is_featured, p.badge, p.material
        ]
      );
    }
    console.log("   ✅ Products done");

    // Seed orders
    console.log("🛒 Seeding 8 orders...");
    for (const o of orders) {
      await client.query(
        `INSERT INTO orders (order_id, status, full_name, phone, email, address, city, state, pin_code, items, total_amount, payment_method, coupon_code, razorpay_order_id)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)`,
        [o.order_id, o.status, o.full_name, o.phone, o.email, o.address, o.city, o.state, o.pin_code, o.items, o.total_amount, o.payment_method, o.coupon_code, o.razorpay_order_id]
      );
    }
    console.log("   ✅ Orders done");

    // Seed newsletter
    console.log("📧 Seeding 15 newsletter subscribers...");
    for (const s of subscribers) {
      await client.query(`INSERT INTO newsletter (email, name) VALUES ($1, $2)`, [s.email, s.name]);
    }
    console.log("   ✅ Subscribers done");

    // Revenue check
    const { rows } = await client.query("SELECT SUM(total_amount::numeric) as total FROM orders");
    const total = parseFloat(rows[0].total).toLocaleString("en-IN");

    console.log("\n🎉 Seed complete!\n");
    console.log("  📂 6 categories");
    console.log("  📦 19 products (mattresses, pillows, sofas, curtains, bean bags, bedsheets)");
    console.log("  🛒 8 orders — Total revenue: ₹" + total);
    console.log("  📧 15 newsletter subscribers");

  } finally {
    client.release();
    await pool.end();
  }
}

seed().catch(err => {
  console.error("❌ Seed failed:", err.message);
  process.exit(1);
});
