import { BadgeAlert } from "lucide-react";
import { ReactNode } from "react";
import config from "@/lib/config";

interface ErrorBoundaryProps {
  children?: ReactNode;
  errorComponent?: ReactNode,
  isError: boolean;
}

export default function ErrorBoundary({
  children,
  errorComponent,
  isError,
}: ErrorBoundaryProps) {
  return (
    <div
      className={`${isError ? "bg-destructive/50 rounded-sm gap-5 p-1 w-full h-full border-destructive border-2 flex flex-col border-l-4" : ""}`}
    >
      {isError && (
        <div className="mb-auto flex w-full gap-10 p-1 font-bold items-center">
         <BadgeAlert />
         {isError && errorComponent}
        </div>
      )}
      <div>
        {children}
      </div>
    </div>
  );
}
