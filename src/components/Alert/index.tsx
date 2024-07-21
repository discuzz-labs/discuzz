import { cn } from "@/lib/utils";
import { Info, TriangleAlert, X, Ban } from "lucide-react";
import { useRef, useState } from "react";

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
        "absolute top-2 w-2/3 left-1/2 -translate-x-1/2 items-center justify-between p-5 shadow-md border-l-8 rounded-md",
        className,
        `${type == "error" && "border-red-800 bg-destructive text-destructive-foreground"}
        ${type == "info" && "border-zinc-700 bg-muted text-muted-foreground"}
        ${type == "warning" && "border-yellow-700 bg-warning text-warning-foreground"}`
      )}
    >
      <div className="flex items-center gap-2">
        {type == "info" && <Info />}
        {type == "error" && <Ban />}
        {type == "warning" && <TriangleAlert />}
        <p className="font-bold text-pretty leading-tight">{message}</p>
      </div>
    </div>
  );
}
