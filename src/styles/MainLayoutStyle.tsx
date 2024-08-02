import React, { ReactNode } from "react"
import SideBar from "@/components/SideBar"

export default function MainLayoutStyle({ children }: { children: ReactNode }) {
  return (
    <div className="flex relative items-center w-full">
      <SideBar />
      <div className="w-3/4">{children}</div>
    </div>
  );
}
