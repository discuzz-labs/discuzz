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
export const settingsRoute = "/settings"
export const notificationsRoute = "/notifications"
export const newPostRoute = "/post/new"
export const historyRoute = "/history"
export const leaderboardRoute = "/leaderboard"

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
    index: {
      path: userRoute, translation: null,
    },
    settings : {
      path: settingsRoute, translation: null,
    },
    notifications : {
      path: notificationsRoute, translation: null,
    },
    history : {
      path: historyRoute, translation: null,
    },
    leaderboard : {
      path: leaderboardRoute, translation: null,
    }
  },
  post : {
    new: {
      path: newPostRoute, translation: null,
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
  isAuth: (route: string) =>
    [signInRoute, signUpRoute, resetRoute, verifyRoute].some((authRoute) =>
      route.startsWith(authRoute)
    ),
};

export default routes;
