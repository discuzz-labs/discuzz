// TagItem.tsx
import { Tag } from "lucide-react";

interface TagItemProps {
  text: string;
}

export default function TagItem({ text }: TagItemProps) {
  return (
    <div className="pl-4">
      <p className="flex items-center gap-2">
        <Tag className="h-4 w-4" /> {text}
      </p>
    </div>
  );
}
