"use client";
import { useUserSession } from "@/components/providers/AuthProvider";
import Banner from "../Banner";

export default function DashboardPage() {
  const { userSession } = useUserSession();
  return (
    <div className="w-2/3 h-full border-x border-input">
      <Banner name={userSession?.fullName as string} />
      {/* <UserInfo userEmail={} /> */}
    </div>
  );
}
