export const homeRoute = "/";
export const signInRoute = "/signin";
export const signUpRoute = "/signup";
export const signOutRoute = "/";
export const verifyRoute = "/verify";
export const resetRoute = "/reset";
export const verifyTokenRoute = "/verify/token";
export const resetPasswordRoute = `/reset/password`;
export const resetPasswordTokenRoute = `/reset/password/token`;
export const dashboardRoute = "/dashboard";

const routes = {
  auth: {
    signIn: { index: { path: signInRoute, translation: `${signInRoute}.json` } },
    signUp: { index: { path: signUpRoute, translation: `${signUpRoute}.json` } },
    verify: {
      index: { path: verifyRoute, translation: `${verifyRoute}.json` },
      token: { path: verifyTokenRoute, translation: null },
    },
    signOut: { index: { path: signOutRoute, translation: `${signOutRoute}.json` } },
    reset: {
      password: {
        index: { path: resetPasswordRoute, translation: `${resetPasswordRoute}.json` },
        token: { path: resetPasswordTokenRoute, translation: `${resetPasswordTokenRoute}.json`  },
      },
    },
  },
  user: {
    dashboard: {
      index: { path: dashboardRoute, translation: `${dashboardRoute}.json` },
      // Future nested routes can be added here if needed
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
  isAuth: (route: string) =>
    [signInRoute, signUpRoute, resetRoute, verifyRoute].some((authRoute) =>
      route.startsWith(authRoute)
    ),
};

export default routes;
