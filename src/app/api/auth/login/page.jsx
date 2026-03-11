// app/auth/login/page.jsx
"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    const res = await signIn("credentials", { redirect: false, email, password });
    if (res?.error) setErr("Invalid credentials");
    else router.push("/admin");
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-[420px] p-6 border rounded">
        <h1 className="text-2xl mb-4">BM Trading — Sign in</h1>
        {err && <div className="text-red-600 mb-2">{err}</div>}
        <label className="block">Email</label>
        <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full mb-3 p-2 border" />
        <label className="block">Password</label>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full mb-3 p-2 border" />
        <button className="w-full p-2 bg-blue-600 text-white">Sign in</button>
      </form>
    </main>
  );
}