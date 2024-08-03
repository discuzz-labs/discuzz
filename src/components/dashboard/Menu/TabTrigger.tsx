// components/TabTrigger.jsx
import { MenubarTrigger } from "@/components/ui/menubar";

interface TabTriggerProps {
  onClick: () => void;
  active: boolean;
  icon: React.ReactNode;
  label: string;
  className?: string;
}

export function TabTrigger({ onClick, active, icon, label, className }: TabTriggerProps) {
  return (
    <MenubarTrigger
      onClick={onClick}
      className={`flex items-center gap-2 hover:bg-accent hover:text-accent-foreground ${className} ${
        active ? "bg-primary text-primary-foreground" : ""
      }`}
    >
      {icon} {label}
    </MenubarTrigger>
  );
}
