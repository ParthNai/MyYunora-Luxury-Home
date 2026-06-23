import { Router, type IRouter } from "express";
import { db, ordersTable } from "@workspace/db";
import { CreateOrderBody } from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/orders", async (req, res): Promise<void> => {
  const parsed = CreateOrderBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const data = parsed.data;
  const orderId = `YUN-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const [order] = await db
    .insert(ordersTable)
    .values({
      orderId,
      status: "pending",
      fullName: data.fullName,
      phone: data.phone,
      email: data.email ?? null,
      address: data.address,
      city: data.city,
      state: data.state,
      pinCode: data.pinCode,
      items: data.items,
      totalAmount: String(data.totalAmount),
      couponCode: data.couponCode ?? null,
      paymentMethod: data.paymentMethod,
      razorpayOrderId: data.razorpayOrderId ?? null,
    })
    .returning();

  res.status(201).json({
    id: order.id,
    orderId: order.orderId,
    status: order.status,
    totalAmount: parseFloat(order.totalAmount),
    fullName: order.fullName,
    phone: order.phone,
    createdAt: order.createdAt.toISOString(),
  });
});

export default router;
