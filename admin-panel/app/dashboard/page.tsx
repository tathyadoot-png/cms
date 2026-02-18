"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    api.get("/auth/me")
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        router.push("/login");
      });
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        Welcome {user.email}
      </h1>
      <p>Roles: {user.roles?.join(", ")}</p>

      <button
  onClick={async () => {
    await api.post("/auth/logout");
    window.location.href = "/login";
  }}
  className="bg-red-500 text-white px-4 py-2 mt-4"
>
  Logout
</button>

    </div>
  );
}
