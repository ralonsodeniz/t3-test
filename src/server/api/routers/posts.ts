import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { clerkClient } from "@clerk/nextjs/server";
import { filterUsersForClient } from "~/server/api/utils/users";
import { TRPCError } from "@trpc/server";

export const postsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.post.findMany({
      take: 100,
      orderBy: [{ createdAt: "desc" }],
    });
    const users = (
      await clerkClient.users.getUserList({
        userId: posts.map((post) => post.authorId),
        limit: 100,
      })
    ).map(filterUsersForClient);
    return posts.map((post) => {
      const author = users.find((user) => user.id === post.authorId);
      if (!author || !author.username)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Author for post not found",
        });

      return {
        post,
        author: {
          ...author,
          // typescript was not detecting the check we are doing in the line 19
          // it was still saying that username could be string | null
          username: author.username,
        },
      };
    });
  }),
  create: privateProcedure
    .input(
      z.object({
        content: z.string().emoji().min(1).max(280),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.currentUser;

      return await ctx.prisma.post.create({
        data: {
          authorId,
          content: input.content,
        },
      });
    }),
});
