import { and, desc, eq, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser,
  campaigns,
  communityPosts,
  conversions,
  InsertConversion,
  InsertPartner,
  InsertReferral,
  InsertTacticLog,
  InsertCommunityPost,
  InsertPostComment,
  partners,
  postComments,
  postVotes,
  referrals,
  savedCampaigns,
  tacticLogs,
  templates,
  users,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ─── Users ─────────────────────────────────────────────────────────────────────

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) return;

  const values: InsertUser = { openId: user.openId };
  const updateSet: Record<string, unknown> = {};
  const textFields = ["name", "email", "loginMethod"] as const;
  type TextField = (typeof textFields)[number];
  const assignNullable = (field: TextField) => {
    const value = user[field];
    if (value === undefined) return;
    const normalized = value ?? null;
    values[field] = normalized;
    updateSet[field] = normalized;
  };
  textFields.forEach(assignNullable);
  if (user.lastSignedIn !== undefined) {
    values.lastSignedIn = user.lastSignedIn;
    updateSet.lastSignedIn = user.lastSignedIn;
  }
  if (user.role !== undefined) {
    values.role = user.role;
    updateSet.role = user.role;
  } else if (user.openId === ENV.ownerOpenId) {
    values.role = "admin";
    updateSet.role = "admin";
  }
  if (!values.lastSignedIn) values.lastSignedIn = new Date();
  if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();

  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ─── Campaigns ─────────────────────────────────────────────────────────────────

export async function getCampaigns() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(campaigns).orderBy(campaigns.category);
}

export async function getCampaignById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(campaigns).where(eq(campaigns.id, id)).limit(1);
  return result[0];
}

export async function getSavedCampaignIds(userId: number) {
  const db = await getDb();
  if (!db) return [];
  const rows = await db.select().from(savedCampaigns).where(eq(savedCampaigns.userId, userId));
  return rows.map((r) => r.campaignId);
}

export async function saveCampaign(userId: number, campaignId: number) {
  const db = await getDb();
  if (!db) return;
  await db
    .insert(savedCampaigns)
    .values({ userId, campaignId })
    .onDuplicateKeyUpdate({ set: { userId } });
}

export async function unsaveCampaign(userId: number, campaignId: number) {
  const db = await getDb();
  if (!db) return;
  await db
    .delete(savedCampaigns)
    .where(and(eq(savedCampaigns.userId, userId), eq(savedCampaigns.campaignId, campaignId)));
}

// ─── Tactic Logs ───────────────────────────────────────────────────────────────

export async function getTacticLogs(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(tacticLogs).where(eq(tacticLogs.userId, userId)).orderBy(desc(tacticLogs.date));
}

export async function createTacticLog(data: InsertTacticLog) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(tacticLogs).values(data);
  return result;
}

export async function updateTacticLog(id: number, userId: number, data: Partial<InsertTacticLog>) {
  const db = await getDb();
  if (!db) return;
  await db.update(tacticLogs).set(data).where(and(eq(tacticLogs.id, id), eq(tacticLogs.userId, userId)));
}

export async function deleteTacticLog(id: number, userId: number) {
  const db = await getDb();
  if (!db) return;
  await db.delete(tacticLogs).where(and(eq(tacticLogs.id, id), eq(tacticLogs.userId, userId)));
}

// ─── Conversions ───────────────────────────────────────────────────────────────

export async function getConversions(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(conversions).where(eq(conversions.userId, userId)).orderBy(desc(conversions.convertedAt));
}

export async function createConversion(data: InsertConversion) {
  const db = await getDb();
  if (!db) return null;
  return db.insert(conversions).values(data);
}

export async function deleteConversion(id: number, userId: number) {
  const db = await getDb();
  if (!db) return;
  await db.delete(conversions).where(and(eq(conversions.id, id), eq(conversions.userId, userId)));
}

// ─── Partners ──────────────────────────────────────────────────────────────────

export async function getPartners(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(partners).where(eq(partners.userId, userId)).orderBy(partners.name);
}

export async function createPartner(data: InsertPartner) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(partners).values(data);
  return result;
}

export async function updatePartner(id: number, userId: number, data: Partial<InsertPartner>) {
  const db = await getDb();
  if (!db) return;
  await db.update(partners).set(data).where(and(eq(partners.id, id), eq(partners.userId, userId)));
}

export async function deletePartner(id: number, userId: number) {
  const db = await getDb();
  if (!db) return;
  await db.delete(partners).where(and(eq(partners.id, id), eq(partners.userId, userId)));
}

// ─── Referrals ─────────────────────────────────────────────────────────────────

export async function getReferralsByPartner(partnerId: number, userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(referrals)
    .where(and(eq(referrals.partnerId, partnerId), eq(referrals.userId, userId)))
    .orderBy(desc(referrals.date));
}

export async function getAllReferrals(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(referrals).where(eq(referrals.userId, userId)).orderBy(desc(referrals.date));
}

export async function createReferral(data: InsertReferral) {
  const db = await getDb();
  if (!db) return null;
  return db.insert(referrals).values(data);
}

export async function updateReferral(id: number, userId: number, data: Partial<InsertReferral>) {
  const db = await getDb();
  if (!db) return;
  await db.update(referrals).set(data).where(and(eq(referrals.id, id), eq(referrals.userId, userId)));
}

export async function deleteReferral(id: number, userId: number) {
  const db = await getDb();
  if (!db) return;
  await db.delete(referrals).where(and(eq(referrals.id, id), eq(referrals.userId, userId)));
}

// ─── Templates ─────────────────────────────────────────────────────────────────

export async function getTemplates() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(templates).orderBy(templates.type);
}

export async function getTemplateById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(templates).where(eq(templates.id, id)).limit(1);
  return result[0];
}

// ─── Community Posts ───────────────────────────────────────────────────────────

export async function getCommunityPosts(category?: string) {
  const db = await getDb();
  if (!db) return [];
  const query = db
    .select({
      id: communityPosts.id,
      userId: communityPosts.userId,
      title: communityPosts.title,
      content: communityPosts.content,
      category: communityPosts.category,
      isPinned: communityPosts.isPinned,
      isFeatured: communityPosts.isFeatured,
      createdAt: communityPosts.createdAt,
      updatedAt: communityPosts.updatedAt,
      authorName: users.name,
      voteCount: sql<number>`(SELECT COALESCE(SUM(CASE WHEN pv.vote = 'up' THEN 1 ELSE -1 END), 0) FROM postVotes pv WHERE pv.postId = ${communityPosts.id})`,
      commentCount: sql<number>`(SELECT COUNT(*) FROM postComments pc WHERE pc.postId = ${communityPosts.id})`,
    })
    .from(communityPosts)
    .leftJoin(users, eq(communityPosts.userId, users.id))
    .orderBy(desc(communityPosts.isPinned), desc(communityPosts.createdAt));

  if (category && category !== "all") {
    return query.where(eq(communityPosts.category, category as typeof communityPosts.category._.data));
  }
  return query;
}

export async function getCommunityPostById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db
    .select({
      id: communityPosts.id,
      userId: communityPosts.userId,
      title: communityPosts.title,
      content: communityPosts.content,
      category: communityPosts.category,
      isPinned: communityPosts.isPinned,
      isFeatured: communityPosts.isFeatured,
      createdAt: communityPosts.createdAt,
      updatedAt: communityPosts.updatedAt,
      authorName: users.name,
      voteCount: sql<number>`(SELECT COALESCE(SUM(CASE WHEN pv.vote = 'up' THEN 1 ELSE -1 END), 0) FROM postVotes pv WHERE pv.postId = ${communityPosts.id})`,
      commentCount: sql<number>`(SELECT COUNT(*) FROM postComments pc WHERE pc.postId = ${communityPosts.id})`,
    })
    .from(communityPosts)
    .leftJoin(users, eq(communityPosts.userId, users.id))
    .where(eq(communityPosts.id, id))
    .limit(1);
  return result[0];
}

export async function createCommunityPost(data: InsertCommunityPost) {
  const db = await getDb();
  if (!db) return null;
  return db.insert(communityPosts).values(data);
}

export async function deleteCommunityPost(id: number, userId: number) {
  const db = await getDb();
  if (!db) return;
  await db.delete(communityPosts).where(and(eq(communityPosts.id, id), eq(communityPosts.userId, userId)));
}

export async function votePost(userId: number, postId: number, vote: "up" | "down") {
  const db = await getDb();
  if (!db) return;
  await db
    .insert(postVotes)
    .values({ userId, postId, vote })
    .onDuplicateKeyUpdate({ set: { vote } });
}

export async function getPostComments(postId: number) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select({
      id: postComments.id,
      userId: postComments.userId,
      postId: postComments.postId,
      content: postComments.content,
      createdAt: postComments.createdAt,
      updatedAt: postComments.updatedAt,
      authorName: users.name,
    })
    .from(postComments)
    .leftJoin(users, eq(postComments.userId, users.id))
    .where(eq(postComments.postId, postId))
    .orderBy(postComments.createdAt);
}

export async function createPostComment(data: InsertPostComment) {
  const db = await getDb();
  if (!db) return null;
  return db.insert(postComments).values(data);
}

export async function deletePostComment(id: number, userId: number) {
  const db = await getDb();
  if (!db) return;
  await db.delete(postComments).where(and(eq(postComments.id, id), eq(postComments.userId, userId)));
}
