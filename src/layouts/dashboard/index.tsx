"use client";
import { useSession } from "next-auth/react";
import Banner from "@/components/Banner";

export default function DashboardLayout() {
  const { data: userSession } = useSession();
  console.log(userSession)
  return (
    <div className="w-2/3 h-full border-x border-input">
      <Banner name={userSession?.user.name as string} />
      {/* <UserInfo userEmail={} /> */}
    </div>
  );
}
