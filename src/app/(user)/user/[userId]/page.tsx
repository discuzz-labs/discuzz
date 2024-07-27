import UserLayout from "@/layouts/user";
import { InferPagePropsType } from "next-typesafe-url";
import { Route, RouteType } from "./routeType";
import { withParamValidation } from "next-typesafe-url/app/hoc";

type UserPageProps = InferPagePropsType<RouteType>;

export default function UserPage({ routeParams } : UserPageProps) {
  return <UserLayout />;
}

withParamValidation(UserPage , Route)


