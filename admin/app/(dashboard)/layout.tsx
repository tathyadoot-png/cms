"use client";

import { useAuth } from "@/context/AuthContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  return (
    <div className="flex">
      <aside className="w-64 bg-black text-white min-h-screen p-4">
        Welcome {user.email}
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
