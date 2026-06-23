import { Router, type IRouter } from "express";
import { eq, ilike, and, gte, lte, desc, asc, sql } from "drizzle-orm";
import { db, productsTable } from "@workspace/db";
import {
  ListProductsQueryParams,
  GetProductParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/products", async (req, res): Promise<void> => {
  const params = ListProductsQueryParams.safeParse(req.query);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const { category, search, sort, minPrice, maxPrice } = params.data;

  const conditions = [];

  if (category) {
    conditions.push(eq(productsTable.category, category));
  }

  if (search) {
    conditions.push(ilike(productsTable.name, `%${search}%`));
  }

  if (minPrice !== undefined) {
    conditions.push(gte(productsTable.price, String(minPrice)));
  }

  if (maxPrice !== undefined) {
    conditions.push(lte(productsTable.price, String(maxPrice)));
  }

  let query = db.select().from(productsTable);

  if (conditions.length > 0) {
    query = query.where(and(...conditions)) as typeof query;
  }

  let products;
  if (sort === "price_asc") {
    products = await query.orderBy(asc(productsTable.price));
  } else if (sort === "price_desc") {
    products = await query.orderBy(desc(productsTable.price));
  } else if (sort === "popular") {
    products = await query.orderBy(desc(productsTable.reviewCount));
  } else {
    products = await query.orderBy(desc(productsTable.createdAt));
  }

  res.json(products.map(formatProduct));
});

router.get("/products/featured", async (_req, res): Promise<void> => {
  const products = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.isFeatured, true))
    .orderBy(desc(productsTable.createdAt))
    .limit(8);

  res.json(products.map(formatProduct));
});

router.get("/products/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);

  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid product ID" });
    return;
  }

  const params = GetProductParams.safeParse({ id });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [product] = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.id, params.data.id));

  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }

  res.json(formatProduct(product));
});

function formatProduct(p: typeof productsTable.$inferSelect) {
  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    price: parseFloat(p.price),
    originalPrice: p.originalPrice ? parseFloat(p.originalPrice) : null,
    category: p.category,
    subcategory: p.subcategory ?? null,
    images: (p.images as string[]) ?? [],
    shortDescription: p.shortDescription,
    description: p.description ?? null,
    features: (p.features as string[]) ?? [],
    colors: (p.colors as string[]) ?? [],
    sizes: (p.sizes as string[]) ?? [],
    warrantyYears: p.warrantyYears ?? null,
    rating: p.rating ? parseFloat(p.rating) : null,
    reviewCount: p.reviewCount ?? null,
    inStock: p.inStock,
    isFeatured: p.isFeatured,
    badge: p.badge ?? null,
    material: p.material ?? null,
  };
}

export default router;
