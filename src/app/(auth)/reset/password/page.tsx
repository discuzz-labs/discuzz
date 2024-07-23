import ResetPasswordLayout from "@/layouts/reset/password";
import { InferPagePropsType } from "next-typesafe-url";
import { Route, RouteType } from "./routeType";
import { withParamValidation } from "next-typesafe-url/app/hoc";

type resetPasswordPageProps = InferPagePropsType<RouteType>;

function resetPasswordPage({ searchParams } : resetPasswordPageProps) {
  return <ResetPasswordLayout />;
}

export default withParamValidation(resetPasswordPage, Route);