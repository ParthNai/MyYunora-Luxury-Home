import { Router, type IRouter } from "express";
import { db, warrantyRegistrationsTable, warrantyClaimsTable } from "@workspace/db";
import { RegisterWarrantyBody, ClaimWarrantyBody } from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/warranty/register", async (req, res): Promise<void> => {
  const parsed = RegisterWarrantyBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const data = parsed.data;
  const registrationId = `WREG-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const [registration] = await db
    .insert(warrantyRegistrationsTable)
    .values({
      registrationId,
      status: "active",
      fullName: data.fullName,
      phone: data.phone,
      email: data.email ?? null,
      productName: data.productName,
      purchaseDate: data.purchaseDate,
      invoiceNumber: data.invoiceNumber,
      dealerName: data.dealerName ?? null,
    })
    .returning();

  res.status(201).json({
    id: registration.id,
    registrationId: registration.registrationId,
    status: registration.status,
    createdAt: registration.createdAt.toISOString(),
  });
});

router.post("/warranty/claim", async (req, res): Promise<void> => {
  const parsed = ClaimWarrantyBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const data = parsed.data;
  const claimId = `WCLM-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const [claim] = await db
    .insert(warrantyClaimsTable)
    .values({
      claimId,
      status: "submitted",
      fullName: data.fullName,
      phone: data.phone,
      email: data.email ?? null,
      registrationId: data.registrationId,
      issueDescription: data.issueDescription,
      productName: data.productName ?? null,
    })
    .returning();

  res.status(201).json({
    id: claim.id,
    claimId: claim.claimId,
    status: claim.status,
    createdAt: claim.createdAt.toISOString(),
  });
});

export default router;
