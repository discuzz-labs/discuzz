import type { DynamicRoute } from "next-typesafe-url"
import { z } from "zod";

export const Route = {
  routeParams: z.object({
    token: z.string().min(15),
  }),
} satisfies DynamicRoute;
export type RouteType = typeof Route;