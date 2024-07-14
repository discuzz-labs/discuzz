import ProtectedRoute from "@/components/guards/ProtectedRoute";

export const metadata = {
  title: `Dashboard`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <main className="flex items-center justify-center w-full h-[100vh]">
        {children}
      </main>
    </ProtectedRoute>
  );
}
