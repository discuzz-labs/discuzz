// CategoryItem.tsx
import { Square } from "lucide-react";

interface CategoryItemProps {
  colorClass: string;
  text: string;
}

export default function CategoryItem({ colorClass, text }: CategoryItemProps) {
  return (
    <div className="pl-4">
      <p className="flex items-center gap-2">
        <Square className={`fill-${colorClass} h-4 w-4`} /> {text}
      </p>
    </div>
  );
}
