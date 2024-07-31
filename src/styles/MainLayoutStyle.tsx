import React, { ReactNode } from "react";
export default function MainLayoutStyle({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-center w-full h-full min-h-[100vh]">
      <div className="w-3/4 h-full border-x flex flex-col gap-5 border-input">{children}</div>
    </div>
  );
}
