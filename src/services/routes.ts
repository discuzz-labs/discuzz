export const homeRoute = "/";
export const signInRoute = "/signin";
export const signUpRoute = "/signup";
export const signOutRoute = "/";
export const verifyRoute = "/verify";
export const resetRoute = "/reset";
export const verifyTokenRoute = "/verify/token";
export const resetPasswordRoute = "/reset/password";
export const resetPasswordTokenRoute = "/reset/password/token";
export const userRoute = "/user";
export const settingsRoute = "/settings";
export const notificationsRoute = "/notifications";
export const postRoute = "post/"
export const newPostRoute = "/post/new";
export const historyRoute = "/history";
export const leaderboardRoute = "/leaderboard";
export const searchRoute = "/search";

const routes = {
  home: homeRoute,
  auth: {
    signIn: { index: { path: signInRoute } },
    signUp: { index: { path: signUpRoute } },
    verify: {
      index: { path: verifyRoute },
      token: { path: verifyTokenRoute },
    },
    signOut: { index: { path: signOutRoute } },
    reset: {
      password: {
        index: { path: resetPasswordRoute },
        token: { path: resetPasswordTokenRoute },
      },
    },
  },
  user: {
    index: { path: userRoute },
    settings: { path: settingsRoute },
    notifications: { path: notificationsRoute },
    history: { path: historyRoute },
    leaderboard: { path: leaderboardRoute },
  },
  post: {
    new: { path: newPostRoute },
    index: {path: postRoute}
  },
  search:{
    index: { path : searchRoute}
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
  isAuth: (route: string) =>
    [signInRoute, signUpRoute, resetRoute].some((authRoute) =>
      route.startsWith(authRoute)
    ),
};

export default routes;
