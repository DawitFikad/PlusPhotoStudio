"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_LINKS } from "@/data/content";
import { STUDIO, telHref, whatsappHref } from "@/lib/studio";
import {
  IconAperture,
  IconArrowUp,
  IconClose,
  IconMenu,
  IconPhone,
  IconWhatsApp,
} from "./icons";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#080706]/88 backdrop-blur-md border-b border-[rgba(239,230,214,0.08)] py-3"
            : "bg-transparent py-5"
        }`}
      >
        <nav className="shell flex items-center justify-between gap-4">
          <Link href="/" className="group flex items-center gap-3 min-w-0">
            <span className="icon-chip shrink-0">
              <IconAperture size={18} />
            </span>
            <span className="min-w-0">
              <span className="block font-mono text-[0.58rem] tracking-[0.32em] uppercase text-[#c4a35a]">
                {STUDIO.district}
              </span>
              <span className="display block text-[1.15rem] sm:text-xl tracking-[0.18em] uppercase text-[#efe6d6] group-hover:text-[#e0c27a] transition-colors">
                Plus
              </span>
            </span>
          </Link>

          <ul className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative py-1 font-mono text-[0.68rem] tracking-[0.2em] uppercase transition-colors ${
                      active ? "text-[#c4a35a]" : "text-[#c9bba6]/70 hover:text-[#efe6d6]"
                    }`}
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="nav-line"
                        className="absolute -bottom-1 left-0 right-0 h-px bg-[#c4a35a]"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden lg:flex items-center gap-4">
            <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="icon-chip" aria-label="WhatsApp">
              <IconWhatsApp />
            </a>
            <a href={telHref()} className="icon-chip" aria-label="Call studio">
              <IconPhone />
            </a>
            <Link href="/book" className="btn btn-fill">
              Reserve
              <IconArrowUp size={13} />
            </Link>
          </div>

          <button
            type="button"
            className="lg:hidden text-[#efe6d6] p-1"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#080706] pt-28 px-8 pb-10 flex flex-col lg:hidden"
          >
            <ul className="space-y-4">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link href={link.href} className="display text-4xl text-[#efe6d6]">
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="mt-auto grid grid-cols-2 gap-3">
              <a href={whatsappHref()} className="btn btn-line">
                <IconWhatsApp size={14} /> WhatsApp
              </a>
              <a href={telHref()} className="btn btn-line">
                <IconPhone size={14} /> Call
              </a>
              <Link href="/book" className="btn btn-fill col-span-2">
                Reserve a session
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
