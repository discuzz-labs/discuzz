import UnverifiedRoute from "@/components/guards/UnverifiedRoute"

export const metadata = {
  title: `Verify Email`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <UnverifiedRoute>{children}</UnverifiedRoute>;
}
