"use client";

import Sidebar from "@/components/Sidebar";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold">
            {pathname.replace("/dashboard", "").replace("/", "") ||
              "Dashboard"}
          </h1>

          <div className="text-sm text-gray-600">
            Welcome Admin
          </div>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
