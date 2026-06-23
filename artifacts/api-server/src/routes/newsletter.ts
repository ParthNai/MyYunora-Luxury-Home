import { Router, type IRouter } from "express";
import { db, newsletterTable } from "@workspace/db";
import { SubscribeNewsletterBody } from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/newsletter/subscribe", async (req, res): Promise<void> => {
  const parsed = SubscribeNewsletterBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const data = parsed.data;

  const [sub] = await db
    .insert(newsletterTable)
    .values({
      email: data.email,
      name: data.name ?? null,
    })
    .onConflictDoNothing()
    .returning();

  if (!sub) {
    const [existing] = await db
      .select()
      .from(newsletterTable)
      .limit(1);
    res.status(201).json({
      id: existing?.id ?? 0,
      email: data.email,
      createdAt: new Date().toISOString(),
    });
    return;
  }

  res.status(201).json({
    id: sub.id,
    email: sub.email,
    createdAt: sub.createdAt.toISOString(),
  });
});

export default router;
