import UserLayout from "@/layouts/user";
import { InferPagePropsType } from "next-typesafe-url";
import { TABS, FILTER, ORDER, Route, RouteType } from "./routeType";
import { withParamValidation } from "next-typesafe-url/app/hoc";

type UserPageProps = InferPagePropsType<RouteType>;

function UserPage({ routeParams, searchParams }: UserPageProps) {
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
