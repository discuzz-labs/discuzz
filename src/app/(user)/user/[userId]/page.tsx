import UserLayout from "@/layouts/user";
import { InferPagePropsType } from "next-typesafe-url";
import { TABS, FILTER, ORDER, Route, RouteType } from "./routeType";
import { withParamValidation } from "next-typesafe-url/app/hoc";
import { QueryClient } from "@tanstack/react-query";
import getUserInfo from "@/actions/user/getUserInfo";
import { UserWithCounts } from "@/types/types";

type UserPageProps = InferPagePropsType<RouteType>;

async function UserPage({ routeParams, searchParams }: UserPageProps) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery<UserWithCounts, Error>({
    queryKey: ["userInfo", routeParams.userId],
    queryFn: () => getUserInfo({ id: routeParams.userId }),
  });
  

  return (
    <UserLayout
      activeTab={searchParams.tab as keyof typeof TABS}
      filter={searchParams.filter as keyof typeof FILTER}
      order={searchParams.order as keyof typeof ORDER}
      userId={routeParams.userId}
    />
  );
}

export default withParamValidation(UserPage, Route);
