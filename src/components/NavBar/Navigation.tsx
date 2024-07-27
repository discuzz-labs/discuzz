import { Bell, LayoutGrid, Pen, Search } from "lucide-react";

interface NavigationProps {
  setOpen: (state: boolean) => void;
}
export default function Navigation({
  setOpen
} : NavigationProps) {
  return (
    <div className="flex items-center justify-evenly gap-2 w-1/2">
      <div className="p-2 rounded-sm hover:bg-muted">
        <LayoutGrid className="h-4 w-4" />
      </div>
      <div onClick={ () => setOpen(true)} className=" p-2 rounded-sm hover:bg-muted">
        <Search className="h-4 w-4" />
      </div>

      <div className="p-2 rounded-sm hover:bg-muted">
        <Pen className="h-4 w-4" />
      </div>

      <div className="p-2 rounded-sm hover:bg-muted">
        <Bell className="h-4 w-4" />
      </div>
    </div>
  );
}
