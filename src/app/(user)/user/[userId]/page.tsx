import UserLayout from "@/layouts/user";
import { InferPagePropsType } from "next-typesafe-url";
import { Route, RouteType } from "./routeType";
import { withParamValidation } from "next-typesafe-url/app/hoc";

export type UserPageProps = InferPagePropsType<RouteType>;


async function UserPage({ routeParams }: UserPageProps) {
  return (
    <UserLayout
      userId={routeParams.userId}
    />
  );
}

export default withParamValidation(UserPage, Route);
