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
    <nav className="flex items-center border-b mb-5">
      <div className="flex items-center space-x-5 lg:w-4/5 mx-auto p-5">
        <Link href={"/"}>
          <AiFillBug />
        </Link>
        <ul className="flex items-center space-x-5">
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
      </div>
    </nav>
  );
}
