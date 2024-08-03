import { cn } from "@/lib/utils";
import { getAlertStyles, getAlertIcon } from "./alertUtils";
import { ReactNode } from "react";

interface AlertProps {
  children?: ReactNode;
  message?: string;
  type: "error" | "warning" | "info";
  className?: string;
}

export default function Alert({
  children,
  message,
  type,
  className,
}: AlertProps) {
  return (
    <div
      className={cn(
        "cy-alert",
        "w-2/3 items-center justify-between p-5 shadow-md border-l-8 rounded-md",
        className,
        getAlertStyles(type)
      )}
    >
      <div className="flex items-center gap-2">
        {getAlertIcon(type)}
        {message && (
          <p className="font-bold text-pretty leading-tight">{message}</p>
        )}
        {children && <>{children}</>}
      </div>
    </div>
  );
}
