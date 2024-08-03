// CollapsibleSection.tsx
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
}

export default function CollapsibleSection({ title, children }: CollapsibleSectionProps) {
  return (
    <Collapsible>
      <div className="flex items-center justify-between px-4">
        <h2>{title}</h2>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="py-2">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}
