import ResetPasswordTokenLayout from "@/layouts/reset/password/token";
import { InferPagePropsType } from "next-typesafe-url";
import { Route, RouteType } from "./routeType";
import { withParamValidation } from "next-typesafe-url/app/hoc";

type ResetPasswordTokenPageProps = InferPagePropsType<RouteType>;

function ResetPasswordTokenPage({ routeParams } : ResetPasswordTokenPageProps) {
  return <ResetPasswordTokenLayout token={routeParams.token} />;
}

export default withParamValidation(ResetPasswordTokenPage, Route)