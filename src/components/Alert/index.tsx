import { cn } from "@/lib/utils";
import { Info, TriangleAlert, X, Ban } from "lucide-react";

/**
 * Used only for fixed messages
 * for fast not so important messages useToast will be used.
 */
interface AlertProps {
  message: string;
  type: "error" | "warning" | "info";
  className?: string;
}

export default function Alert({ message, type, className }: AlertProps) {
  return (
    <div
      className={cn(
        "cy-alert",
        "flex items-center gap-2 p-5 shadow-md  border-l-8 rounded-md",
        className,
        `${type == "error" && "border-red-800 bg-destructive text-destructive-foreground"}
        ${type == "info" && "border-zinc-700 bg-muted text-muted-foreground"}
        ${type == "warning" && "border-yellow-700 bg-warning text-warning-foreground"}`
      )}
    >
      <div>
        {type == "info" && <Info />}
        {type == "error" && <Ban />}
        {type == "warning" && <TriangleAlert />}
      </div>
      <p className="font-bold text-pretty leading-tight">{message}</p>
    </div>
  );
}
