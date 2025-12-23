"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/not-available-yet", label: "About" },
  { href: "/not-available-yet", label: "Events" },
  { href: "/projects", label: "Projects" },
  { href: "/not-available-yet", label: "Membership" },
  { href: "/blogs", label: "Blogs" },
  { href: "#footer", label: "Contact Us" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="h-[100px]">
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[1287px] border-2 border-secondary2 rounded-lg bg-background backdrop-blur-lg shadow-sm">
        <div className="flex items-center justify-between px-6 h-[100px]">
          {/* Logo */}
          <div className="flex items-center gap-3 flex-shrink-0 whitespace-nowrap">
            <Image
              src="/images/navbar-logo.svg"
              alt="AI Club Logo"
              width={58}
              height={58}
            />
            <span className="font-bold text-[30px] text-primary1">
              AI Club
            </span>
          </div>

          {/* Desktop */}
          <div className="hidden lg:flex flex-1 min-w-0 justify-end overflow-hidden">
            <ul className="flex items-center gap-[40px]">
              {links.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <li key={link.href} className="flex-shrink-0">
                    <Link
                      href={link.href}
                      className={`text-[16px] font-medium transition-colors ${
                        isActive
                          ? "text-primary2"
                          : "text-primary1 hover:text-primary2"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className={`lg:hidden text-2xl text-primary1 transition-transform duration-200 ${
              open ? "rotate-90" : "rotate-0"
            }`}
            aria-label="Toggle menu"
          >
            ☰
          </button>

        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="lg:hidden absolute top-full right-6 mt-2 w-48 rounded-lg border border-secondary2 bg-background backdrop-blur-lg shadow-md">
            <ul className="flex flex-col py-2">
              {links.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`block px-4 py-2 text-[15px] font-medium transition-colors ${
                        isActive
                          ? "text-primary2"
                          : "text-primary1 hover:text-primary2"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

      </nav>
    </header>
  );
}
