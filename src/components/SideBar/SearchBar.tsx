// SearchBar.tsx
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import routes from "@/services/routes";

export default function SearchBar() {
  return (
    <Link href={routes.search.index.path} className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search posts..."
        className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
      />
    </Link>
  );
}
