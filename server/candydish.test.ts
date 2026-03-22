import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// ─── Test context helpers ──────────────────────────────────────────────────────

function makePublicCtx(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

function makeAuthCtx(overrides?: Partial<NonNullable<TrpcContext["user"]>>): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "test-user-openid",
      name: "Test User",
      email: "test@example.com",
      loginMethod: "manus",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
      ...overrides,
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

// ─── Auth tests ────────────────────────────────────────────────────────────────

describe("auth.me", () => {
  it("returns null when not authenticated", async () => {
    const caller = appRouter.createCaller(makePublicCtx());
    const result = await caller.auth.me();
    expect(result).toBeNull();
  });

  it("returns user when authenticated", async () => {
    const caller = appRouter.createCaller(makeAuthCtx());
    const result = await caller.auth.me();
    expect(result).not.toBeNull();
    expect(result?.name).toBe("Test User");
    expect(result?.email).toBe("test@example.com");
  });
});

describe("auth.logout", () => {
  it("returns success and clears cookie", async () => {
    const clearedCookies: string[] = [];
    const ctx = makeAuthCtx();
    ctx.res.clearCookie = (name: string) => clearedCookies.push(name);
    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.logout();
    expect(result.success).toBe(true);
    expect(clearedCookies).toHaveLength(1);
  });
});

// ─── Campaigns tests ───────────────────────────────────────────────────────────

describe("campaigns", () => {
  it("campaigns.list returns an array (public)", async () => {
    const caller = appRouter.createCaller(makePublicCtx());
    const result = await caller.campaigns.list();
    expect(Array.isArray(result)).toBe(true);
  });

  it("campaigns.savedIds requires auth", async () => {
    const caller = appRouter.createCaller(makePublicCtx());
    await expect(caller.campaigns.savedIds()).rejects.toThrow();
  });

  it("campaigns.savedIds returns array when authenticated", async () => {
    const caller = appRouter.createCaller(makeAuthCtx());
    const result = await caller.campaigns.savedIds();
    expect(Array.isArray(result)).toBe(true);
  });
});

// ─── Tactics tests ─────────────────────────────────────────────────────────────

describe("tactics", () => {
  it("tactics.list requires auth", async () => {
    const caller = appRouter.createCaller(makePublicCtx());
    await expect(caller.tactics.list()).rejects.toThrow();
  });

  it("tactics.list returns array when authenticated", async () => {
    const caller = appRouter.createCaller(makeAuthCtx());
    const result = await caller.tactics.list();
    expect(Array.isArray(result)).toBe(true);
  });
});

// ─── Conversions tests ─────────────────────────────────────────────────────────

describe("conversions", () => {
  it("conversions.list requires auth", async () => {
    const caller = appRouter.createCaller(makePublicCtx());
    await expect(caller.conversions.list()).rejects.toThrow();
  });

  it("conversions.list returns array when authenticated", async () => {
    const caller = appRouter.createCaller(makeAuthCtx());
    const result = await caller.conversions.list();
    expect(Array.isArray(result)).toBe(true);
  });
});

// ─── Partners tests ────────────────────────────────────────────────────────────

describe("partners", () => {
  it("partners.list requires auth", async () => {
    const caller = appRouter.createCaller(makePublicCtx());
    await expect(caller.partners.list()).rejects.toThrow();
  });

  it("partners.list returns array when authenticated", async () => {
    const caller = appRouter.createCaller(makeAuthCtx());
    const result = await caller.partners.list();
    expect(Array.isArray(result)).toBe(true);
  });

  it("partners.referrals.all requires auth", async () => {
    const caller = appRouter.createCaller(makePublicCtx());
    await expect(caller.partners.referrals.all()).rejects.toThrow();
  });
});

// ─── Templates tests ───────────────────────────────────────────────────────────

describe("templates", () => {
  it("templates.list is public and returns array", async () => {
    const caller = appRouter.createCaller(makePublicCtx());
    const result = await caller.templates.list();
    expect(Array.isArray(result)).toBe(true);
  });
});

// ─── Community tests ───────────────────────────────────────────────────────────

describe("community", () => {
  it("community.list is public and returns array", async () => {
    const caller = appRouter.createCaller(makePublicCtx());
    const result = await caller.community.list({});
    expect(Array.isArray(result)).toBe(true);
  });

  it("community.list with category filter works", async () => {
    const caller = appRouter.createCaller(makePublicCtx());
    const result = await caller.community.list({ category: "success_story" });
    expect(Array.isArray(result)).toBe(true);
  });

  it("community.create requires auth", async () => {
    const caller = appRouter.createCaller(makePublicCtx());
    await expect(
      caller.community.create({
        title: "Test Post",
        content: "Test content",
        category: "tip",
      })
    ).rejects.toThrow();
  });

  it("community.vote requires auth", async () => {
    const caller = appRouter.createCaller(makePublicCtx());
    await expect(caller.community.vote({ postId: 1, vote: "up" })).rejects.toThrow();
  });

  it("community.comments.list is public", async () => {
    const caller = appRouter.createCaller(makePublicCtx());
    const result = await caller.community.comments.list({ postId: 1 });
    expect(Array.isArray(result)).toBe(true);
  });
});
