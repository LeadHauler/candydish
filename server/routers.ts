import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import {
  getCampaigns,
  getCampaignById,
  getSavedCampaignIds,
  saveCampaign,
  unsaveCampaign,
  getTacticLogs,
  createTacticLog,
  updateTacticLog,
  deleteTacticLog,
  getConversions,
  createConversion,
  deleteConversion,
  getPartners,
  createPartner,
  updatePartner,
  deletePartner,
  getReferralsByPartner,
  getAllReferrals,
  createReferral,
  updateReferral,
  deleteReferral,
  getTemplates,
  getTemplateById,
  getCommunityPosts,
  getCommunityPostById,
  createCommunityPost,
  deleteCommunityPost,
  votePost,
  getPostComments,
  createPostComment,
  deletePostComment,
} from "./db";
import { seedCampaigns, seedTemplates, seedCommunityPosts } from "./seed";

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // ─── Campaigns ─────────────────────────────────────────────────────────────

  campaigns: router({
    list: publicProcedure.query(async () => {
      await seedCampaigns();
      return getCampaigns();
    }),

    byId: publicProcedure.input(z.object({ id: z.number() })).query(({ input }) =>
      getCampaignById(input.id)
    ),

    savedIds: protectedProcedure.query(({ ctx }) =>
      getSavedCampaignIds(ctx.user.id)
    ),

    save: protectedProcedure
      .input(z.object({ campaignId: z.number() }))
      .mutation(({ ctx, input }) => saveCampaign(ctx.user.id, input.campaignId)),

    unsave: protectedProcedure
      .input(z.object({ campaignId: z.number() }))
      .mutation(({ ctx, input }) => unsaveCampaign(ctx.user.id, input.campaignId)),
  }),

  // ─── Tactic Logs ───────────────────────────────────────────────────────────

  tactics: router({
    list: protectedProcedure.query(({ ctx }) => getTacticLogs(ctx.user.id)),

    create: protectedProcedure
      .input(
        z.object({
          campaignId: z.number().optional(),
          campaignTitle: z.string(),
          date: z.date(),
          location: z.string().optional(),
          materialsUsed: z.array(z.string()).optional(),
          contactsMade: z.number().optional(),
          leadsGenerated: z.number().optional(),
          cost: z.string().optional(),
          status: z.enum(["planned", "active", "completed", "paused"]).optional(),
          notes: z.string().optional(),
          followUpDate: z.date().optional(),
        })
      )
      .mutation(({ ctx, input }) =>
        createTacticLog({
          ...input,
          userId: ctx.user.id,
          materialsUsed: input.materialsUsed ? JSON.stringify(input.materialsUsed) : null,
        })
      ),

    update: protectedProcedure
      .input(
        z.object({
          id: z.number(),
          campaignTitle: z.string().optional(),
          date: z.date().optional(),
          location: z.string().optional(),
          materialsUsed: z.array(z.string()).optional(),
          contactsMade: z.number().optional(),
          leadsGenerated: z.number().optional(),
          cost: z.string().optional(),
          status: z.enum(["planned", "active", "completed", "paused"]).optional(),
          notes: z.string().optional(),
          followUpDate: z.date().optional(),
        })
      )
      .mutation(({ ctx, input }) => {
        const { id, materialsUsed, ...rest } = input;
        return updateTacticLog(id, ctx.user.id, {
          ...rest,
          materialsUsed: materialsUsed ? JSON.stringify(materialsUsed) : undefined,
        });
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ ctx, input }) => deleteTacticLog(input.id, ctx.user.id)),
  }),

  // ─── Conversions / ROI ─────────────────────────────────────────────────────

  conversions: router({
    list: protectedProcedure.query(({ ctx }) => getConversions(ctx.user.id)),

    create: protectedProcedure
      .input(
        z.object({
          tacticLogId: z.number().optional(),
          campaignTitle: z.string(),
          leadName: z.string().optional(),
          revenue: z.string().optional(),
          notes: z.string().optional(),
          convertedAt: z.date().optional(),
        })
      )
      .mutation(({ ctx, input }) =>
        createConversion({
          ...input,
          userId: ctx.user.id,
          convertedAt: input.convertedAt ?? new Date(),
        })
      ),

    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ ctx, input }) => deleteConversion(input.id, ctx.user.id)),
  }),

  // ─── Partners ──────────────────────────────────────────────────────────────

  partners: router({
    list: protectedProcedure.query(({ ctx }) => getPartners(ctx.user.id)),

    create: protectedProcedure
      .input(
        z.object({
          name: z.string(),
          company: z.string().optional(),
          type: z.enum([
            "real_estate_agent",
            "contractor",
            "property_manager",
            "interior_designer",
            "moving_company",
            "other",
          ]),
          phone: z.string().optional(),
          email: z.string().optional(),
          address: z.string().optional(),
          notes: z.string().optional(),
          status: z.enum(["active", "inactive", "prospect"]).optional(),
        })
      )
      .mutation(({ ctx, input }) => createPartner({ ...input, userId: ctx.user.id })),

    update: protectedProcedure
      .input(
        z.object({
          id: z.number(),
          name: z.string().optional(),
          company: z.string().optional(),
          type: z
            .enum([
              "real_estate_agent",
              "contractor",
              "property_manager",
              "interior_designer",
              "moving_company",
              "other",
            ])
            .optional(),
          phone: z.string().optional(),
          email: z.string().optional(),
          address: z.string().optional(),
          notes: z.string().optional(),
          status: z.enum(["active", "inactive", "prospect"]).optional(),
        })
      )
      .mutation(({ ctx, input }) => {
        const { id, ...rest } = input;
        return updatePartner(id, ctx.user.id, rest);
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ ctx, input }) => deletePartner(input.id, ctx.user.id)),

    referrals: router({
      byPartner: protectedProcedure
        .input(z.object({ partnerId: z.number() }))
        .query(({ ctx, input }) => getReferralsByPartner(input.partnerId, ctx.user.id)),

      all: protectedProcedure.query(({ ctx }) => getAllReferrals(ctx.user.id)),

      create: protectedProcedure
        .input(
          z.object({
            partnerId: z.number(),
            leadName: z.string().optional(),
            date: z.date(),
            status: z.enum(["pending", "contacted", "converted", "lost"]).optional(),
            revenue: z.string().optional(),
            notes: z.string().optional(),
          })
        )
        .mutation(({ ctx, input }) => createReferral({ ...input, userId: ctx.user.id })),

      update: protectedProcedure
        .input(
          z.object({
            id: z.number(),
            leadName: z.string().optional(),
            date: z.date().optional(),
            status: z.enum(["pending", "contacted", "converted", "lost"]).optional(),
            revenue: z.string().optional(),
            notes: z.string().optional(),
          })
        )
        .mutation(({ ctx, input }) => {
          const { id, ...rest } = input;
          return updateReferral(id, ctx.user.id, rest);
        }),

      delete: protectedProcedure
        .input(z.object({ id: z.number() }))
        .mutation(({ ctx, input }) => deleteReferral(input.id, ctx.user.id)),
    }),
  }),

  // ─── Templates ─────────────────────────────────────────────────────────────

  templates: router({
    list: publicProcedure.query(async () => {
      await seedTemplates();
      return getTemplates();
    }),

    byId: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(({ input }) => getTemplateById(input.id)),
  }),

  // ─── Community ─────────────────────────────────────────────────────────────

  community: router({
    list: publicProcedure
      .input(z.object({ category: z.string().optional() }))
      .query(async ({ input }) => {
        await seedCommunityPosts();
        return getCommunityPosts(input.category);
      }),

    byId: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(({ input }) => getCommunityPostById(input.id)),

    create: protectedProcedure
      .input(
        z.object({
          title: z.string(),
          content: z.string(),
          category: z.enum([
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
          ]),
        })
      )
      .mutation(({ ctx, input }) => createCommunityPost({ ...input, userId: ctx.user.id })),

    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ ctx, input }) => deleteCommunityPost(input.id, ctx.user.id)),

    vote: protectedProcedure
      .input(z.object({ postId: z.number(), vote: z.enum(["up", "down"]) }))
      .mutation(({ ctx, input }) => votePost(ctx.user.id, input.postId, input.vote)),

    comments: router({
      list: publicProcedure
        .input(z.object({ postId: z.number() }))
        .query(({ input }) => getPostComments(input.postId)),

      create: protectedProcedure
        .input(z.object({ postId: z.number(), content: z.string() }))
        .mutation(({ ctx, input }) =>
          createPostComment({ ...input, userId: ctx.user.id })
        ),

      delete: protectedProcedure
        .input(z.object({ id: z.number() }))
        .mutation(({ ctx, input }) => deletePostComment(input.id, ctx.user.id)),
    }),
  }),
});

export type AppRouter = typeof appRouter;
