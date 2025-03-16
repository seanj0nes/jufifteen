import { pgTable, text, serial, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const rsvps = pgTable("rsvps", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  guests: text("guests").notNull(),
  attending: boolean("attending").notNull(),
  dietaryRestrictions: text("dietary_restrictions"),
  message: text("message"),
  usesBus: boolean("uses_bus").default(false),
  dni: text("dni"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertRsvpSchema = createInsertSchema(rsvps).pick({
  name: true,
  email: true,
  guests: true,
  attending: true,
  dietaryRestrictions: true,
  message: true,
  usesBus:true,
  dni: true
});

export type InsertRsvp = z.infer<typeof insertRsvpSchema>;
export type Rsvp = typeof rsvps.$inferSelect;