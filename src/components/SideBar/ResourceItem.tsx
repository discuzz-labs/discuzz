// ResourceItem.tsx
import { Rss, BookOpen } from "lucide-react";
import Link from "next/link";

interface ResourceItemProps {
  icon: React.ReactElement;
  text: string;
  href?: string;
}

export default function ResourceItem({ icon, text, href }: ResourceItemProps) {
  return (
    <div className="pl-4">
      <p className="flex items-center gap-2">
        {icon}
        {href ? <Link href={href}>{text}</Link> : text}
      </p>
    </div>
  );
}
