import VerifyTokenLayout from "@/layouts/verify/token";
import { InferPagePropsType } from "next-typesafe-url";
import { Route, RouteType } from "./routeType";
import { withParamValidation } from "next-typesafe-url/app/hoc";

type TokenPageProps = InferPagePropsType<RouteType>;

function VerifyTokenPage({ routeParams } : TokenPageProps) {
  return <VerifyTokenLayout token={routeParams.token} />;
}

export default withParamValidation(VerifyTokenPage, Route)