import React, { ReactNode } from "react";
import LeftSideBar from "@/components/SideBars/left";

export default function MainLayoutStyle({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-center items-center w-full">
      <LeftSideBar />
      <div className="w-2/3">{children}</div>
    </div>
  );
}
