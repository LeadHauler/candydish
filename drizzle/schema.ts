import {
  boolean,
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
  decimal,
} from "drizzle-orm/mysql-core";

// ─── Core Users ────────────────────────────────────────────────────────────────

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ─── Campaign Idea Library ─────────────────────────────────────────────────────

export const campaigns = mysqlTable("campaigns", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  category: mysqlEnum("category", [
    "real_estate",
    "contractors",
    "door_hangers",
    "vehicle_wraps",
    "community",
    "digital",
    "referral",
    "seasonal",
    "other",
  ]).notNull(),
  difficulty: mysqlEnum("difficulty", ["easy", "medium", "hard"]).notNull(),
  costMin: int("costMin").notNull().default(0),
  costMax: int("costMax").notNull().default(0),
  description: text("description").notNull(),
  steps: text("steps").notNull(), // JSON array of step strings
  expectedLeads: varchar("expectedLeads", { length: 64 }),
  timeToResults: varchar("timeToResults", { length: 64 }),
  materials: text("materials"), // JSON array of material strings
  proTip: text("proTip"),
  isBuiltIn: boolean("isBuiltIn").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Campaign = typeof campaigns.$inferSelect;

// ─── User Saved Campaigns ──────────────────────────────────────────────────────

export const savedCampaigns = mysqlTable("savedCampaigns", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  campaignId: int("campaignId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// ─── Tactic Tracking ──────────────────────────────────────────────────────────

export const tacticLogs = mysqlTable("tacticLogs", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  campaignId: int("campaignId"),
  campaignTitle: varchar("campaignTitle", { length: 255 }).notNull(),
  date: timestamp("date").notNull(),
  location: varchar("location", { length: 255 }),
  materialsUsed: text("materialsUsed"), // JSON array
  contactsMade: int("contactsMade").default(0),
  leadsGenerated: int("leadsGenerated").default(0),
  cost: decimal("cost", { precision: 10, scale: 2 }).default("0"),
  status: mysqlEnum("status", ["planned", "active", "completed", "paused"]).default("planned").notNull(),
  notes: text("notes"),
  followUpDate: timestamp("followUpDate"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type TacticLog = typeof tacticLogs.$inferSelect;
export type InsertTacticLog = typeof tacticLogs.$inferInsert;

// ─── ROI / Conversions ────────────────────────────────────────────────────────

export const conversions = mysqlTable("conversions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  tacticLogId: int("tacticLogId"),
  campaignTitle: varchar("campaignTitle", { length: 255 }).notNull(),
  leadName: varchar("leadName", { length: 255 }),
  revenue: decimal("revenue", { precision: 10, scale: 2 }).default("0"),
  convertedAt: timestamp("convertedAt").defaultNow().notNull(),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Conversion = typeof conversions.$inferSelect;
export type InsertConversion = typeof conversions.$inferInsert;

// ─── Partners & Referrals ─────────────────────────────────────────────────────

export const partners = mysqlTable("partners", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  company: varchar("company", { length: 255 }),
  type: mysqlEnum("type", [
    "real_estate_agent",
    "contractor",
    "property_manager",
    "interior_designer",
    "moving_company",
    "other",
  ]).notNull(),
  phone: varchar("phone", { length: 32 }),
  email: varchar("email", { length: 320 }),
  address: text("address"),
  notes: text("notes"),
  status: mysqlEnum("status", ["active", "inactive", "prospect"]).default("prospect").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Partner = typeof partners.$inferSelect;
export type InsertPartner = typeof partners.$inferInsert;

export const referrals = mysqlTable("referrals", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  partnerId: int("partnerId").notNull(),
  leadName: varchar("leadName", { length: 255 }),
  date: timestamp("date").notNull(),
  status: mysqlEnum("status", ["pending", "contacted", "converted", "lost"]).default("pending").notNull(),
  revenue: decimal("revenue", { precision: 10, scale: 2 }).default("0"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Referral = typeof referrals.$inferSelect;
export type InsertReferral = typeof referrals.$inferInsert;

// ─── Marketing Templates ──────────────────────────────────────────────────────

export const templates = mysqlTable("templates", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  type: mysqlEnum("type", ["flyer", "business_card", "door_hanger", "postcard", "yard_sign"]).notNull(),
  description: text("description"),
  previewUrl: text("previewUrl"),
  fields: text("fields").notNull(), // JSON array of customizable field names
  htmlTemplate: text("htmlTemplate").notNull(), // HTML template with {{placeholders}}
  isBuiltIn: boolean("isBuiltIn").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Template = typeof templates.$inferSelect;

// ─── Community Posts ──────────────────────────────────────────────────────────

export const communityPosts = mysqlTable("communityPosts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  category: mysqlEnum("category", [
    "real_estate",
    "contractors",
    "door_hangers",
    "vehicle_wraps",
    "community",
    "digital",
    "referral",
    "seasonal",
    "success_story",
    "tip",
    "other",
  ]).notNull(),
  isPinned: boolean("isPinned").default(false).notNull(),
  isFeatured: boolean("isFeatured").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CommunityPost = typeof communityPosts.$inferSelect;
export type InsertCommunityPost = typeof communityPosts.$inferInsert;

export const postVotes = mysqlTable("postVotes", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  postId: int("postId").notNull(),
  vote: mysqlEnum("vote", ["up", "down"]).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const postComments = mysqlTable("postComments", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  postId: int("postId").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type PostComment = typeof postComments.$inferSelect;
export type InsertPostComment = typeof postComments.$inferInsert;
