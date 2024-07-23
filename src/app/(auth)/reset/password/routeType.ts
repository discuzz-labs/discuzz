import type { DynamicRoute } from "next-typesafe-url"
import { z } from "zod";

export const Route = {
  searchParams: z.object({
    token: z.string().min(256).optional(),
  }),
} satisfies DynamicRoute;
export type RouteType = typeof Route;