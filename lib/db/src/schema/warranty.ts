import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const warrantyRegistrationsTable = pgTable("warranty_registrations", {
  id: serial("id").primaryKey(),
  registrationId: text("registration_id").notNull().unique(),
  status: text("status").notNull().default("active"),
  fullName: text("full_name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  productName: text("product_name").notNull(),
  purchaseDate: text("purchase_date").notNull(),
  invoiceNumber: text("invoice_number").notNull(),
  dealerName: text("dealer_name"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const warrantyClaimsTable = pgTable("warranty_claims", {
  id: serial("id").primaryKey(),
  claimId: text("claim_id").notNull().unique(),
  status: text("status").notNull().default("submitted"),
  fullName: text("full_name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  registrationId: text("registration_id").notNull(),
  issueDescription: text("issue_description").notNull(),
  productName: text("product_name"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertWarrantyRegistrationSchema = createInsertSchema(warrantyRegistrationsTable).omit({ id: true, createdAt: true });
export type InsertWarrantyRegistration = z.infer<typeof insertWarrantyRegistrationSchema>;
export type WarrantyRegistration = typeof warrantyRegistrationsTable.$inferSelect;

export const insertWarrantyClaimSchema = createInsertSchema(warrantyClaimsTable).omit({ id: true, createdAt: true });
export type InsertWarrantyClaim = z.infer<typeof insertWarrantyClaimSchema>;
export type WarrantyClaim = typeof warrantyClaimsTable.$inferSelect;
