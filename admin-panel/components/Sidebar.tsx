"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { api } from "@/lib/api";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Users", href: "/dashboard/users" },
    { name: "Posts", href: "/dashboard/posts" },
    { name: "Roles", href: "/dashboard/roles" },
    { name: "Tasks", href: "/dashboard/tasks" },
    { name: "Assign Task", href: "/dashboard/tasks/assign" },
    { name: "Organizations", href: "/dashboard/organizations" },
    { name: "Settings", href: "/dashboard/settings" },
  ];

  return (
    <aside className="w-64 bg-black text-white flex flex-col">
      <div className="p-5 text-xl font-bold border-b border-gray-700">
        CMS Admin
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block px-4 py-2 rounded transition ${
              pathname === item.href
                ? "bg-white text-black"
                : "hover:bg-gray-800"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <button
          onClick={async () => {
            await api.post("/auth/logout");
            window.location.href = "/login";
          }}
          className="w-full bg-red-500 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
