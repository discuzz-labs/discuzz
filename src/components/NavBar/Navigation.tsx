import { Bell, LayoutGrid, Trophy, Pen } from "lucide-react";

interface NavigationProps {
  setOpen: (state: boolean) => void;
}
export default function Navigation() {
  return (
    <div className="flex items-center justify-evenly gap-2 w-1/2">
      <div className="p-2 rounded-sm hover:bg-muted">
        <LayoutGrid className="h-4 w-4" />
      </div>
      <div className=" p-2 rounded-sm hover:bg-muted">
        <Pen className="h-4 w-4" />
      </div>

      <div className="p-2 rounded-sm hover:bg-muted">
        <Trophy className="h-4 w-4" />
      </div>

      <div className="p-2 rounded-sm hover:bg-muted">
        <Bell className="h-4 w-4" />
      </div>
    </div>
  );
}
