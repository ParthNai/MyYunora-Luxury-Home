import { Router, type IRouter } from "express";
import { db, categoriesTable } from "@workspace/db";
import { asc } from "drizzle-orm";

const router: IRouter = Router();

router.get("/categories", async (_req, res): Promise<void> => {
  const categories = await db
    .select()
    .from(categoriesTable)
    .orderBy(asc(categoriesTable.name));

  res.json(
    categories.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      image: c.image ?? null,
      productCount: c.productCount,
      description: c.description ?? null,
    }))
  );
});

export default router;
