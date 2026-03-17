"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:5000/users?email=${email.toLowerCase().trim()}&password=${password}`
      );
      const users = await res.json();

      if (users.length > 0) {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("user", JSON.stringify(users[0]));
        router.push("/home");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("Something went wrong!");
    }
};

  return (
    <div
      className={`relative min-h-screen flex flex-col items-center justify-center transition-opacity duration-700 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/background.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-[#050505]/50 to-[#050505]" />

      <div className="relative z-10 flex flex-col items-center justify-center w-full px-4">
        <h1 className="text-5xl md:text-5xl font-serif font-medium tracking-widest mb-16 mt-4 text-white">
          Opalite
          <span className="text-red-500">.</span>
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-10 rounded-md w-full max-w-sm flex flex-col gap-4"
        >
          <h2 className="text-3xl mb-4 text-center font-serif text-black">
            Login
          </h2>
          {error && <div className="text-red-500 text-center">{error}</div>}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border border-black/20 bg-transparent focus:border-red-500 text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border border-black/20 bg-transparent focus:border-red-500 text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="w-full bg-red-500 cursor-pointer hover:bg-red-600 py-3 mt-4 transition">
            Log In
          </button>
          <p className="text-center text-1xl mt-4 text-black/100">
            Don't have an account?{" "}
            <Link href="/signup" className="text-red-500 hover:none">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}