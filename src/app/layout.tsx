import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { metadata , inter } from "@/metadata"
import { ThemeProvider } from "@/providers/ThemeProvider";
import NavBar from "@/components/NavBar";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/providers/AuthProvider";
import QueryProvider from "@/providers/QueryProvider";
import "../styles/globals.css";
import "../styles/theme.css";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <QueryProvider>
          <AuthProvider>
            <ThemeProvider>
              <NextIntlClientProvider messages={messages}>
                <NavBar />
                {children}
              </NextIntlClientProvider>
            </ThemeProvider>
          </AuthProvider>
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}

export {metadata};