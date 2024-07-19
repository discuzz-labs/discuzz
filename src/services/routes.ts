const signInRoute = "/sign-in";
const signUpRoute = "/sign-up";
const verifyRoute = "/verify";
const dashboardRoute = "/dashboard";

const routes = {
  auth: {
    signIn: { path: signInRoute },
    signUp: { path: signUpRoute },
    verify: { path: verifyRoute },
  },
  user: {
    dashboard: {
      path: dashboardRoute,
    },
  },
  redirects: {
    onUnAuthenticated: signInRoute,
    onAuthenticated: dashboardRoute,
    onVerified: dashboardRoute,
    onUnVerified: verifyRoute,
    // Middlware will decide if to redirect to dashboardRoute or not
    onAfterSignIn: verifyRoute,
    onAfterSignUp: verifyRoute,
    onAfterVerify: dashboardRoute,
  },
  isProtected: (route: string) => [dashboardRoute].includes(route),
  isVerifyRoute: (route: string) => [verifyRoute].includes(route),
  isAuth: (route: string) => [signInRoute, signUpRoute].some(authRoute => route.startsWith(authRoute)),
};

export default routes;
