

export const metadata = {
  title: `Dashboard`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  throw new Error("hello")
  return (
    <>
      <main className="flex items-center justify-center w-full h-[100vh]">
        {children}
      </main>
    </>
  );
}
