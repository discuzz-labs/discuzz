"use client";

import MainLayoutStyle from "@/styles/MainLayoutStyle";
import DashboardMenu from "@/components/dashboard/Menu";
import DashboardProfileHeader from "@/components/dashboard/Profile";
import DashboardPosts from "@/components/dashboard/Posts/index";
import useUserInfo from "@/hooks/useUserInfo";
import ErrorBoundary from "@/components/ErrorBoundary";
import LoadingBoundary from "@/components/LoadingBoundary";
import { TABS, FILTER, ORDER } from "@/app/(user)/user/[userId]/routeType";
import { useSession } from "next-auth/react";

interface UserLayoutProps {
  userId: string;
  activeTab: keyof typeof TABS;
  filter: keyof typeof FILTER;
  order: keyof typeof ORDER;
}

export default function UserLayout({ userId, activeTab, filter, order }: UserLayoutProps) {
  const { data: userSession } = useSession();
  const { isError, error, isPending, data } = useUserInfo(userId);

  return (
    <MainLayoutStyle>
      {isPending && <LoadingBoundary />}
      {isError && <ErrorBoundary isError={isError} errorComponent={<p>error?.message || "An error occurred."</p>} />}
      {data && (
        <>
          <DashboardProfileHeader
            name={data.name}
            email={data.email}
            isOwner={userSession?.user.id === userId}
            userId={userId}
            bio={data.bio}
            createdAt={data.createdAt}
            links={data.links}
            followerCount={data._count.followers}
            followingCount={data._count.following}
            image={data.image}
            points={data.points}
          />
          <DashboardMenu activeTab={activeTab} />
          <DashboardPosts 
            isOwner={userSession?.user.id === userId} 
            activeTab={activeTab} 
            filter={filter} 
            order={order} 
            userId={userId} 
          />
        </>
      )}
    </MainLayoutStyle>
  );
}
