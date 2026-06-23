import { Router, type IRouter, type Request, type Response, type NextFunction } from "express";
import { db, productsTable, ordersTable, categoriesTable } from "@workspace/db";
import { newsletterTable } from "@workspace/db";
import { eq, desc, count, sum, sql } from "drizzle-orm";

const router: IRouter = Router();

const ADMIN_KEY = "yunora-admin-2026";

function adminAuth(req: Request, res: Response, next: NextFunction): void {
  const key = req.headers["x-admin-key"];
  if (key !== ADMIN_KEY) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}

router.use("/admin", adminAuth);

// ─── STATS ───
router.get("/admin/stats", async (_req, res): Promise<void> => {
  const [totalProducts] = await db.select({ count: count() }).from(productsTable);
  const [totalOrders] = await db.select({ count: count() }).from(ordersTable);
  const [totalRevenue] = await db.select({ sum: sum(ordersTable.totalAmount) }).from(ordersTable);
  const [pendingOrders] = await db.select({ count: count() }).from(ordersTable).where(eq(ordersTable.status, "pending"));
  const [completedOrders] = await db.select({ count: count() }).from(ordersTable).where(eq(ordersTable.status, "delivered"));
  const [outOfStock] = await db.select({ count: count() }).from(productsTable).where(eq(productsTable.inStock, false));
  const [totalCategories] = await db.select({ count: count() }).from(categoriesTable);
  const [totalSubscribers] = await db.select({ count: count() }).from(newsletterTable);

  const recentOrders = await db.select().from(ordersTable).orderBy(desc(ordersTable.createdAt)).limit(5);
  const recentProducts = await db.select().from(productsTable).orderBy(desc(productsTable.createdAt)).limit(5);

  const monthlySales = await db.execute(sql`
    SELECT
      TO_CHAR(created_at, 'Mon YYYY') AS month,
      COUNT(*) AS orders,
      COALESCE(SUM(total_amount::numeric), 0) AS revenue
    FROM orders
    GROUP BY TO_CHAR(created_at, 'Mon YYYY'), DATE_TRUNC('month', created_at)
    ORDER BY DATE_TRUNC('month', created_at) DESC
    LIMIT 6
  `);

  res.json({
    totalProducts: totalProducts.count,
    totalOrders: totalOrders.count,
    totalRevenue: parseFloat(String(totalRevenue.sum ?? 0)),
    pendingOrders: pendingOrders.count,
    completedOrders: completedOrders.count,
    outOfStock: outOfStock.count,
    totalCategories: totalCategories.count,
    totalSubscribers: totalSubscribers.count,
    recentOrders: recentOrders.map(o => ({
      id: o.id, orderId: o.orderId, status: o.status,
      fullName: o.fullName, phone: o.phone,
      totalAmount: parseFloat(o.totalAmount), createdAt: o.createdAt,
    })),
    recentProducts: recentProducts.map(p => ({
      id: p.id, name: p.name, category: p.category,
      price: parseFloat(p.price), inStock: p.inStock,
    })),
    monthlySales: (monthlySales.rows as any[]).map(r => ({
      month: r.month,
      orders: Number(r.orders),
      revenue: Number(r.revenue),
    })).reverse(),
  });
});

// ─── PRODUCTS CRUD ───
router.get("/admin/products", async (_req, res): Promise<void> => {
  const products = await db.select().from(productsTable).orderBy(desc(productsTable.createdAt));
  res.json(products.map(p => ({
    id: p.id, name: p.name, slug: p.slug,
    price: parseFloat(p.price),
    originalPrice: p.originalPrice ? parseFloat(p.originalPrice) : null,
    category: p.category, subcategory: p.subcategory ?? null,
    images: (p.images as string[]) ?? [],
    shortDescription: p.shortDescription,
    description: p.description ?? null,
    features: (p.features as string[]) ?? [],
    colors: (p.colors as string[]) ?? [],
    sizes: (p.sizes as string[]) ?? [],
    warrantyYears: p.warrantyYears ?? null,
    rating: p.rating ? parseFloat(p.rating) : null,
    reviewCount: p.reviewCount ?? 0,
    inStock: p.inStock, isFeatured: p.isFeatured,
    badge: p.badge ?? null, material: p.material ?? null,
    createdAt: p.createdAt,
  })));
});

router.post("/admin/products", async (req, res): Promise<void> => {
  try {
    const body = req.body;
    const slug = body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const [product] = await db.insert(productsTable).values({
      name: body.name,
      slug: `${slug}-${Date.now()}`,
      price: String(body.price),
      originalPrice: body.originalPrice ? String(body.originalPrice) : null,
      category: body.category,
      subcategory: body.subcategory ?? null,
      images: body.images ?? [],
      shortDescription: body.shortDescription ?? "",
      description: body.description ?? null,
      features: body.features ?? [],
      colors: body.colors ?? [],
      sizes: body.sizes ?? [],
      warrantyYears: body.warrantyYears ?? null,
      inStock: body.inStock ?? true,
      isFeatured: body.isFeatured ?? false,
      badge: body.badge ?? null,
      material: body.material ?? null,
    }).returning();
    res.status(201).json({ id: product.id, message: "Product created" });
  } catch (err) {
    res.status(500).json({ error: "Failed to create product" });
  }
});

router.put("/admin/products/:id", async (req, res): Promise<void> => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid ID" }); return; }
  try {
    const body = req.body;
    await db.update(productsTable).set({
      name: body.name,
      price: body.price !== undefined ? String(body.price) : undefined,
      originalPrice: body.originalPrice !== undefined ? (body.originalPrice ? String(body.originalPrice) : null) : undefined,
      category: body.category,
      subcategory: body.subcategory ?? null,
      shortDescription: body.shortDescription,
      description: body.description ?? null,
      features: body.features ?? [],
      colors: body.colors ?? [],
      sizes: body.sizes ?? [],
      warrantyYears: body.warrantyYears ?? null,
      inStock: body.inStock,
      isFeatured: body.isFeatured,
      badge: body.badge ?? null,
      material: body.material ?? null,
    }).where(eq(productsTable.id, id));
    res.json({ message: "Product updated" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update product" });
  }
});

router.delete("/admin/products/:id", async (req, res): Promise<void> => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid ID" }); return; }
  await db.delete(productsTable).where(eq(productsTable.id, id));
  res.json({ message: "Product deleted" });
});

// ─── ORDERS ───
router.get("/admin/orders", async (_req, res): Promise<void> => {
  const orders = await db.select().from(ordersTable).orderBy(desc(ordersTable.createdAt));
  res.json(orders.map(o => ({
    id: o.id, orderId: o.orderId, status: o.status,
    fullName: o.fullName, phone: o.phone, email: o.email ?? null,
    address: o.address, city: o.city, state: o.state, pinCode: o.pinCode,
    items: o.items, totalAmount: parseFloat(o.totalAmount),
    couponCode: o.couponCode ?? null,
    paymentMethod: o.paymentMethod, createdAt: o.createdAt,
  })));
});

router.put("/admin/orders/:id", async (req, res): Promise<void> => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid ID" }); return; }
  const { status } = req.body;
  if (!status) { res.status(400).json({ error: "Status required" }); return; }
  await db.update(ordersTable).set({ status }).where(eq(ordersTable.id, id));
  res.json({ message: "Order updated" });
});

// ─── CATEGORIES CRUD ───
router.get("/admin/categories", async (_req, res): Promise<void> => {
  const cats = await db.select().from(categoriesTable);
  res.json(cats);
});

router.post("/admin/categories", async (req, res): Promise<void> => {
  const { name, slug, image, description } = req.body;
  const [cat] = await db.insert(categoriesTable).values({ name, slug, image: image ?? null, description: description ?? null }).returning();
  res.status(201).json(cat);
});

router.put("/admin/categories/:id", async (req, res): Promise<void> => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid ID" }); return; }
  const { name, slug, image, description } = req.body;
  await db.update(categoriesTable).set({ name, slug, image: image ?? null, description: description ?? null }).where(eq(categoriesTable.id, id));
  res.json({ message: "Category updated" });
});

router.delete("/admin/categories/:id", async (req, res): Promise<void> => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid ID" }); return; }
  await db.delete(categoriesTable).where(eq(categoriesTable.id, id));
  res.json({ message: "Category deleted" });
});

// ─── NEWSLETTER / SUBSCRIBERS ───
router.get("/admin/subscribers", async (_req, res): Promise<void> => {
  const subs = await db.select().from(newsletterTable).orderBy(desc(newsletterTable.createdAt));
  res.json(subs);
});

export default router;
