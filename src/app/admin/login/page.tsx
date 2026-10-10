"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, ArrowRight, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@plusphotography.et");
  const [password, setPassword] = useState("studio2025");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simple administrative credentials verification
    if (email === "admin@plusphotography.et" && password.length >= 6) {
      setTimeout(() => {
        router.push("/admin");
      }, 500);
    } else {
      setLoading(false);
      setError("Invalid credentials. Please verify your studio administrative password.");
    }
  };

  return (
    <div className="min-h-screen bg-[#141312] text-[#F6F0E8] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#B96F52] block mb-2">
            Plus Photography • Bole, Addis Ababa
          </span>
          <h1
            className="text-3xl sm:text-4xl font-light text-[#F6F0E8]"
            style={{ fontFamily: "var(--font-bodoni), serif" }}
          >
            Studio Management
          </h1>
          <p className="text-xs text-[#D9C7B2]/60 mt-1 font-light">
            Authorized administration and booking management
          </p>
        </div>

        <div className="p-8 bg-[#191817] border border-[#D9C7B2]/15 rounded-sm shadow-2xl">
          {error && (
            <div className="mb-6 p-3 bg-red-950/40 border border-red-800/50 rounded-sm flex items-center gap-2.5 text-xs text-red-200">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#D9C7B2]/70 mb-2 font-medium">
                Admin Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#211F1D] border border-[#D9C7B2]/20 text-[#F6F0E8] text-sm focus:outline-none focus:border-[#B96F52] rounded-sm"
                />
                <Mail className="w-4 h-4 text-[#D9C7B2]/40 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#D9C7B2]/70 mb-2 font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#211F1D] border border-[#D9C7B2]/20 text-[#F6F0E8] text-sm focus:outline-none focus:border-[#B96F52] rounded-sm"
                />
                <Lock className="w-4 h-4 text-[#D9C7B2]/40 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#B96F52] text-[#191817] text-xs font-semibold uppercase tracking-widest hover:bg-[#D4957C] transition-colors rounded-sm flex items-center justify-center gap-2"
            >
              <span>{loading ? "Authenticating..." : "Sign In to Studio Portal"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#D9C7B2]/10">
            <div className="p-3 bg-[#211F1D] rounded-sm">
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#B96F52] block mb-1">
                Demo Credentials
              </span>
              <p className="text-[11px] text-[#D9C7B2]/70 font-mono">
                Email: admin@plusphotography.et <br />
                Password: studio2025
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-xs text-[#D9C7B2]/60 hover:text-[#B96F52] transition-colors"
          >
            &larr; Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
