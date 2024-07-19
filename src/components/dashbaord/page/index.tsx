"use client";
import { useSession } from "next-auth/react";
import Banner from "../Banner";

export default function DashboardPage() {
  const { data: userSession } = useSession();
  return (
    <div className="w-2/3 h-full border-x border-input">
      <Banner name={userSession?.user.fullName as string} />
      {/* <UserInfo userEmail={} /> */}
    </div>
  );
}
