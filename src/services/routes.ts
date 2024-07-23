export const homeRoute = "/";
export const signInRoute = "/sign-in";
export const signUpRoute = "/sign-up";
export const signOutRoute = "/";
export const verifyRoute = "/verify";
export const resetPasswordRoute = "/reset/password";
export const dashboardRoute = "/dashboard";

const routes = {
  auth: {
    signIn: { path: signInRoute },
    signUp: { path: signUpRoute },
    verify: { path: verifyRoute },
    signOut: { path : signOutRoute},
    reset: {
      password: {
        path: resetPasswordRoute
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
  },
  isProtected: (route: string) => [dashboardRoute].includes(route),
  isVerifyRoute: (route: string) => [verifyRoute].includes(route),
  isAuth: (route: string) => [signInRoute, signUpRoute].some(authRoute => route.startsWith(authRoute)),
};

export default routes;
