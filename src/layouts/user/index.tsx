"use client";

import ErrorBoundary from "@/components/ErrorBoundary";
import LoadingBoundary from "@/components/LoadingBoundary";
import UserPosts from "@/components/UserPosts";
import UserProfile from "@/components/UserProfile";
import useUserInfo from "@/hooks/useUserInfo";
import MainLayoutStyle from "@/styles/MainLayoutStyle";
import { useSession } from "next-auth/react";
import UserFilterMenu from "@/components/UserFilterMenu"

interface UserLayoutProps {
  userId: string;
}

export default function UserLayout({ userId }: UserLayoutProps) {
  const { data: user, error, isError, isPending } = useUserInfo(userId);
  const { data: userSession } = useSession();

  return (
    <MainLayoutStyle>
      <ErrorBoundary isError={isError} errorComponent={<p>{error?.message}</p>}>
        {isPending && <LoadingBoundary />}
        {user && (
          <UserProfile user={user} isOwner={userSession?.user.id == userId} />
        )}
        <UserFilterMenu />
        <UserPosts viewerId={userSession?.user.id as string} isOwner={userSession?.user.id == userId} userId={userId} />
      </ErrorBoundary>
    </MainLayoutStyle>
  );
}
