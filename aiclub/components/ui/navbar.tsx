"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";


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

  

  return (
    <header className="h-[100px]">
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[1287px] border-2 border-secondary2 rounded-lg bg-background backdrop-blur-lg shadow-sm">
        <div className="flex items-center justify-between px-8 h-[100px]">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <Image
              src="/images/navbar-logo.svg" // replace with your logo image
              alt="AI Club Logo"
              width={58}
              height={58}
              className="object-contain"
            />
            <span className="font-bold text-[30px] text-primary1 tracking-tight">
              AI Club
            </span>
          </div>

          {/* Nav Links */}
          <ul className="hidden md:flex items-center gap-[40px]">
            {links.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href); // match exact or prefix

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`font-sans text-[16px] font-medium transition-colors duration-200 ${
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

          {/* Mobile Menu (optional placeholder) */}
          <button className="md:hidden text-secondary1 font-bold">☰</button>
        </div>
      </nav>
    </header>
  );
}
