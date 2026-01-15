"use client";

import { useAuth } from "@clerk/nextjs";

export default function TestBackendPage() {
  const { getToken } = useAuth();

  const callBackend = async () => {
    console.log("BUTTON CLICKED"); // 👈 ADD THIS

    const token = await getToken();
    console.log("TOKEN:", token); // 👈 ADD THIS

    const res = await fetch("http://localhost:5000/api/protected", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    console.log("RESPONSE:", data);
  };

  return (
    <button
      onClick={callBackend}
      className="bg-black text-white p-3"
    >
      Test Backend Connection
    </button>
  );
}
