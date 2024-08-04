import SearchBar from "./SearchBar";
import CollapsibleSection from "./CollapsibleSection";
import CategoryItem from "./CategoryItem";
import ResourceItem from "./ResourceItem";
import TagItem from "./TagItem";
import { Rss, BookOpen } from "lucide-react";

export default function SideBar() {
  return (
    <div className="w-1/4 self-start sticky h-10 top-16 p-2 flex gap-5 flex-col">
      <SearchBar />
      
      <CollapsibleSection title="Categories">
        <CategoryItem colorClass="red-600" text="@radix-ui/colors" />
        <CategoryItem colorClass="yellow-600" text="@stitches/react" />
      </CollapsibleSection>

      <CollapsibleSection title="Tags">
        <TagItem text="@radix-ui/colors" />
        <TagItem text="@stitches/react" />
      </CollapsibleSection>

      <CollapsibleSection title="Resources">
        <ResourceItem icon={<Rss className="h-4 w-4" />} text="Website" href="" />
        <ResourceItem icon={<BookOpen className="h-4 w-4" />} text="@stitches/react" />
      </CollapsibleSection>
    </div>
  );
}
