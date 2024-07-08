import AuthProvider from "@/components/providers/AuthProvider";

export const metadata = {
  title: `Confirm Email`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}
