import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Route } from "@/app/(user)/user/[userId]/routeType";
import useFilter from "@/hooks/useFilter";
import FilterSelect, { filterOptions, orderOptions, statusOptions } from "./FilterSelect";

interface UserFilterMenuProps {
  filters: z.infer<typeof Route.searchParams>;
}

export default function UserFilterMenu() {
  const { setFilter, currentFilters } = useFilter();

  // Function to handle filter change and toggle bookmarked filter
  const handleFilterChange = (filterType: keyof UserFilterMenuProps["filters"], value: string) => {
    setFilter({ [filterType]: value });
  };

  // Function to toggle the bookmarked filter
  const toggleBookmarkFilter = () => {
    const newValue = currentFilters.bookmarked === true ? "false" : "true";
    handleFilterChange("bookmarked", newValue)
  };

  return (
    <div className="bg-background z-10 border-b mt-10 sticky top-[10vh] flex items-center justify-between p-2">
      <div className="flex items-center gap-2">
        <Button
          onClick={toggleBookmarkFilter}
          variant="outline"
          size="sm"
          className="h-7 gap-1 text-sm"
        >
          {currentFilters.bookmarked === true ? "Show All" : "Bookmarked"}
        </Button>

        <FilterSelect
          options={statusOptions}
          onChange={(value) => handleFilterChange("status", value)}
          label="Status"
        />
      </div>

      <div className="flex items-center gap-2">
        <FilterSelect
          options={filterOptions}
          onChange={(value) => handleFilterChange("filter", value)}
          label="Filter"
        />

        <FilterSelect
          options={orderOptions}
          onChange={(value) => handleFilterChange("order", value)}
          label="Order By"
        />
      </div>
    </div>
  );
}
