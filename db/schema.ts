import { index, boolean, jsonb, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const demoRequests = pgTable("demo_requests", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 80 }).notNull(),
  company: varchar("company", { length: 120 }).notNull(),
  email: varchar("email", { length: 160 }).notNull(),
  phone: varchar("phone", { length: 80 }).notNull(),
  platforms: jsonb("platforms").$type<string[]>().notNull().default([]),
  primaryNeed: varchar("primary_need", { length: 120 }).notNull(),
  locale: varchar("locale", { length: 10 }).notNull().default("zh-CN"),
  consentVersion: varchar("consent_version", { length: 20 }).notNull(),
  marketingConsent: boolean("marketing_consent").notNull().default(false),
  sourceUrl: text("source_url").notNull().default(""),
  status: varchar("status", { length: 24 }).notNull().default("new"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
  index("idx_demo_requests_status_created_at").on(table.status, table.createdAt),
]);
