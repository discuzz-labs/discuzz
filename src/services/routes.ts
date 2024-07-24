export const homeRoute = "/";
export const signInRoute = "/sign-in";
export const signUpRoute = "/sign-up";
export const signOutRoute = "/";
export const verifyRoute = "/verify";
export const resetRoute = "/reset";
export const dashboardRoute = "/dashboard";

const routes = {
  auth: {
    signIn: { path: signInRoute },
    signUp: { path: signUpRoute },
    verify: { path: verifyRoute },
    signOut: { path : signOutRoute},
    reset: {
      password: {
        path: resetRoute
      }
    }
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
    onAfterSignIn: verifyRoute,
    onAfterSignUp: verifyRoute,
    onAfterVerify: dashboardRoute,
    onAfterResetPassword: signInRoute,
  },
  isProtected: (route: string) => [dashboardRoute].includes(route),
  isVerifyRoute: (route: string) => [verifyRoute].includes(route),
  isAuth: (route: string) => [signInRoute, signUpRoute, resetRoute].some(authRoute => route.startsWith(authRoute)),
};

export default routes;
