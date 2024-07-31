"use client";

import MainLayoutStyle from "@/styles/MainLayoutStyle";
import { useQuery } from "@tanstack/react-query";
import getUserInfo from "@/actions/user/getUserInfo";
import { UserWithCounts } from "@/types/types";
import DashboardMenu from "@/components/dashboard/Menu";
import DashboardProfileHeader from "@/components/dashboard/ProfileHeader";
import DashboardPosts from "@/components/dashboard/Posts/index";
import LoadingBoundary from "@/components/LoadingBoundary";
import ErrorBoundary from "@/components/ErrorBoundary";
import { TABS,FILTER,ORDER } from "@/app/(user)/user/[userId]/routeType";

interface UserLayoutProps {
  userId: string;
  activeTab: keyof typeof TABS;
  filter: keyof typeof FILTER;
  order: keyof typeof ORDER;
}


export default function UserLayout({ userId, activeTab, order, filter }: UserLayoutProps) {

  const { isError, error, isPending, data } = useQuery<UserWithCounts, Error, UserWithCounts>({
    queryKey: ["userInfo", userId],
    queryFn: () => getUserInfo({ id: userId }),
  });

  return (
    <MainLayoutStyle>
      <ErrorBoundary isError={isError} errorComponent={<p>{error?.message}</p>}>
        {isPending && <LoadingBoundary />}
        {data && (
          <>
            <DashboardProfileHeader
              name={data.name}
              email={data.email}
              bio={data.bio}
              createdAt={data.createdAt}
              links={data.links}
              followerCount={data._count.followers}
              followingCount={data._count.following}
              image={data.image}
              points={data.points}
            />
            <DashboardMenu activeTab={activeTab} />
            <DashboardPosts activeTab={activeTab} filter={filter} order={order} userId={userId} />
          </>
        )}
      </ErrorBoundary>
    </MainLayoutStyle>
  );
}
