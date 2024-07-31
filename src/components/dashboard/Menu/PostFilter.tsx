"use client";

import { useEffect, useState } from "react";
import { FILTER, ORDER } from "@/app/(user)/user/[userId]/routeType";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpNarrowWide, ArrowDownWideNarrow, FilterX } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PostFilter() {
  const router = useRouter();
  const [filter, setFilter] = useState<string | undefined>(undefined);
  const [order, setOrder] = useState<string | undefined>(undefined);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    setFilter(queryParams.get("filter") || undefined);
    setOrder(queryParams.get("order") || undefined);
  }, [window.location.search]);

  const handleFilterChange = (selectedFilter: string) => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("filter", selectedFilter);
    router.push(`?${queryParams.toString()}`, { scroll: false });
  };

  const handleOrderChange = (selectedOrder: string) => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("order", selectedOrder);
    router.push(`?${queryParams.toString()}`, { scroll: false });
  };

  const handleReset = () => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.delete("filter");
    queryParams.delete("order");
    router.push(`?${queryParams.toString()}`, { scroll: false });
    setFilter(undefined); // Reset filter state
    setOrder(undefined); // Reset order state
  };

  return (
    <div className="w-full flex items-center py-2 gap-1 justify-end">
      <Select value={filter} onValueChange={handleFilterChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter By" />
        </SelectTrigger>
        <SelectContent>
          {Object.values(FILTER).map((filterValue: string, idx) => (
            <SelectItem key={idx} value={filterValue}>
              {filterValue}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={order} onValueChange={handleOrderChange}>
        <SelectTrigger className="w-[80px]">
          <SelectValue placeholder="Order" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ORDER.ASC}>
            <ArrowUpNarrowWide />
          </SelectItem>
          <SelectItem value={ORDER.DESC}>
            <ArrowDownWideNarrow />
          </SelectItem>
        </SelectContent>
      </Select>
      <Button onClick={handleReset}>
        <FilterX className="w-4 h-4" />
      </Button>
    </div>
  );
}
