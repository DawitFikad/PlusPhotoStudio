"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  Layers,
  Inbox,
  Settings,
  ArrowUpRight,
  LogOut,
} from "lucide-react";

const adminNav = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Bookings", href: "/admin/bookings", icon: Calendar },
  { label: "Studio Calendar", href: "/admin/calendar", icon: Calendar },
  { label: "Packages & ETB Rates", href: "/admin/packages", icon: Layers },
  { label: "Inquiries", href: "/admin/inquiries", icon: Inbox },
  { label: "Studio Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // If on login page, don't show admin chrome
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#141312] text-[#F6F0E8] flex flex-col md:flex-row">
      {/* ── Admin Sidebar ── */}
      <aside className="w-full md:w-64 bg-[#191817] border-r border-[#D9C7B2]/10 flex flex-col shrink-0">
        <div className="p-6 border-b border-[#D9C7B2]/10">
          <Link href="/admin" className="block">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#B96F52] block mb-1">
              Studio Admin Portal
            </span>
            <span
              className="text-xl font-light text-[#F6F0E8] tracking-wider"
              style={{ fontFamily: "var(--font-bodoni), serif" }}
            >
              Plus Photography
            </span>
          </Link>
        </div>

        <nav className="p-4 space-y-1.5 flex-1">
          {adminNav.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-sm text-xs uppercase tracking-wider font-medium transition-all ${
                  isActive
                    ? "bg-[#B96F52] text-[#191817] font-semibold"
                    : "text-[#D9C7B2]/70 hover:text-[#F6F0E8] hover:bg-[#22201E]"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#D9C7B2]/10 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-4 py-2 text-xs text-[#D9C7B2]/60 hover:text-[#F6F0E8] transition-colors"
          >
            <span>Live Studio Website</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          <Link
            href="/admin/login"
            className="flex items-center gap-2 px-4 py-2 text-xs text-red-400/80 hover:text-red-300 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* ── Main Admin Content ── */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
