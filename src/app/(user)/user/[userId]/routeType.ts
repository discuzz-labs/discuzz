import { PostStatus, Prisma } from "@prisma/client";
import { z } from "zod";

export const Route = {
  routeParams: z.object({
    userId: z.string(),
  }),
  searchParams: z.object({
    filter: z.nativeEnum(Prisma.PostScalarFieldEnum).optional(),
    order: z.nativeEnum(Prisma.SortOrder).optional(),
    status: z.nativeEnum(PostStatus).optional(),
    tags: z.string().optional(),
    category: z.string().optional(),
    bookmarked: z.boolean().optional()
  })
};

export type RouteType = typeof Route;
