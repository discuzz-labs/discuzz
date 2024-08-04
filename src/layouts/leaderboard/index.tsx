"use client";

import MainLayoutStyle from "@/styles/MainLayoutStyle";
import ErrorBoundary from "@/components/ErrorBoundary";
import LoadingBoundary from "@/components/LoadingBoundary";
import { useSession } from "next-auth/react";
import ProfileImage from "@/components/ProfileImage";

export default function LeaderboardLayout() {
  const { data: userSession } = useSession();

  return (
    <MainLayoutStyle>
      {/* {isPending && <LoadingBoundary />}
      {isError && <ErrorBoundary isError={isError} errorComponent={<p>{error?.message}</p>} />}
       */}
      <div className="flex flex-col w-full s gap-2 items-center">
        <div className="bg-gradient-to-r  from-yellow-400 flex w-2/3 items-center gap-4 p-2 rounded-sm border border-yellow-500">
          <p className="font-extrabold text-2xl">1</p>
          <ProfileImage size={10} />
          <div className="grid gap-1">
            <p className="text-sm font-bold leading-none">Olivia Martin</p>       
          </div>
          <div className="ml-auto font-bold">+1,999.00</div>
        </div>
      </div>
    </MainLayoutStyle>
  );
}
