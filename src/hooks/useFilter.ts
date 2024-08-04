"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { z } from 'zod';
import { useCallback, useMemo } from 'react';
import { Route } from "@/app/(user)/user/[userId]/routeType";

// Define the type for the search params based on the Route.searchParams schema
type SearchParams = z.infer<typeof Route.searchParams>;
export type CurrentFilters = {
  [K in keyof SearchParams]?: SearchParams[K] | undefined;
};

export default function useFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Extract current filters from the URL search parameters
  const currentFilters: SearchParams = useMemo(() => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    return {
      filter: params.get('filter') as SearchParams['filter'] || undefined,
      order: params.get('order') as SearchParams['order'] || undefined,
      status: params.get('status') as SearchParams['status'] || undefined,
      bookmarked: params.get('bookmarked') === 'true' ? true : undefined,
      tags: params.get('tags') || undefined,
      category: params.get('category') || undefined,
    };
  }, [searchParams]);

  // Function to update filters in the URL
  const setFilter = useCallback((newFilters: Partial<SearchParams>) => {
    const currentParams = new URLSearchParams(Array.from(searchParams.entries()));

    Object.entries(newFilters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        currentParams.set(key, String(value));
      } else {
        currentParams.delete(key);
      }
    });

    router.push(`?${currentParams.toString()}`, { scroll: false });
  }, [router, searchParams]);

  const clearFilters = useCallback(() => {
    router.push(`?`, { scroll: false });
  }, [router]);

  return { currentFilters, setFilter, clearFilters };
}
