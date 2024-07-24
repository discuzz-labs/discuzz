export const homeRoute = "/";
export const signInRoute = "/signin";
export const signUpRoute = "/signup";
export const signOutRoute = "/";
export const verifyRoute = "/verify";
export const resetRoute = "/reset";
export const userRoute = "/user";

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
      path: userRoute,
    },
  },
  redirects: {
    onUnAuthenticated: signInRoute,
    onAuthenticated: userRoute,
    onVerified: userRoute,
    onUnVerified: verifyRoute,
    onAfterSignIn: verifyRoute,
    onAfterSignUp: verifyRoute,
    onAfterVerify: userRoute,
    onAfterResetPassword: signInRoute,
  },
  isProtected: (route: string) => [userRoute].includes(route),
  isVerifyRoute: (route: string) => [verifyRoute].includes(route),
  isAuth: (route: string) => [signInRoute, signUpRoute, resetRoute].some(authRoute => route.startsWith(authRoute)),
};

export default routes;
