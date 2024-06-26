import { Toaster } from "@/components/ui/toaster";
import config from "@/lib/config";
import { redirect } from "next/navigation";

export const metadata = {
  title: `Welcome to ${config.metadata.title}`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
