"use client";

import Link from "next/link";

interface BreadcrumbProps {
  items: { label: string; href?: string }[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center text-[20px] font-space-grotesk text-primary1">
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center">
          {item.href ? (
            <Link href={item.href} className="hover:text-primary2 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-primary2">{item.label}</span>
          )}
          {idx < items.length - 1 && (
            <span className="mx-2 text-primary1">{">"}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
