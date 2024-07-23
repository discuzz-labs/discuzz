import { cn } from "@/lib/utils";
import { Info, TriangleAlert, X, Ban } from "lucide-react";
import { useRef, useState, ReactNode } from "react";

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
        "w-2/3  items-center justify-between p-5 shadow-md border-l-8 rounded-md",
        className,
        `${type == "error" && "border-red-800 bg-destructive text-destructive-foreground"}
        ${type == "info" && "border-zinc-700 bg-muted text-muted-foreground"}
        ${type == "warning" && "border-yellow-700 bg-warning text-warning-foreground"}`
      )}
    >
      <div className="flex items-center gap-2">
        {message && (
          <>
            {type == "info" && <Info />}
            {type == "error" && <Ban />}
            {type == "warning" && <TriangleAlert />}
          </>
        )}
        {message && (
          <p className="font-bold text-pretty leading-tight">{message}</p>
        )}
        {children && <>{children}</>}
      </div>
    </div>
  );
}
