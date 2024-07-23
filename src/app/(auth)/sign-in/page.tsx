import SignInLayout from "@/layouts/sign-in";
import { InferPagePropsType } from "next-typesafe-url";
import { Route, RouteType } from "./routeType";
import { withParamValidation } from "next-typesafe-url/app/hoc";

type signInPageProps = InferPagePropsType<RouteType>;

function signInPage({ searchParams }: signInPageProps) {
  return <SignInLayout errorParam={searchParams.error} />;
}

export default withParamValidation(signInPage , Route)