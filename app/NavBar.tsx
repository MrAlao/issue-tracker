"use client";

import React from "react";
import Link from "next/link";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav className="flex items-center space-x-5 h-10 border-b px-5 mb-5">
      <Link href={"/"}>
        <AiFillBug />
      </Link>
      <ul className="flex items-center space-x-5 h-10 border-b">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={classNames({
                "text-zinc-500": currentPath !== link.href,
                "text-zinc-900": currentPath === link.href,
                "hover:text-zinc-700": true,
              })}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
