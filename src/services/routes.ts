const routes = {
  auth: {
    signIn: { path: "/sign-in" },
    signUp: { path: "/sign-up" },
    verify: { path: "/verify" }
  },
  user: {
    dashboard: {
      path: "/dashboard",
    },
  },
  redirects : {
    onUnAuthenticated: "/sign-in",
    onAuthenticated: "/dashboard",
    onVerified : "/dashboard",
    onAfterSignIn : {
      unVerified: "/verify",
      verified: "/dashboard"
    },
    onAfterSignUp : "/verify",
    onAfterVerify: "/dashboard",
  }
};

export default routes;
