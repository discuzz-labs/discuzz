import AuthRoute from "@/components/guards/AuthRoute";

export const metadata = {
  title: "Sign In",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthRoute>{children}</AuthRoute>;
}
