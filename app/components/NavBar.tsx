"use client";

import React from "react";
import Link from "next/link";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";
import { usePathname, useSearchParams } from "next/navigation";
import { Rajdhani as Font } from "next/font/google";
import { Avatar, Box, Flex, Menu, Skeleton, Text } from "@mantine/core";
import { useAuth } from "../context/Auth.context";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { registerSession } from "../_actions/user.action";
import { HiOutlineLogout } from "react-icons/hi";
import { logOut } from "../lucia-auth/logout";

const font = Font({ weight: "500", subsets: ["latin"] });

export default function NavBar() {
  return (
    <nav className="flex items-center border-b border-gray-200 dark:border-gray-800 mb-5">
      <Box className="flex justify-between lg:w-4/5 mx-auto py-5">
        <Box className="flex items-center space-x-5 px-0 md:px-0">
          <Link href={"/"} className="flex items-center gap-2">
            <AiFillBug />{" "}
            <span className={`${font.className} font-semibold text-xl`}>
              Issue Tracker
            </span>
          </Link>
          <NavList />
        </Box>
        <AuthInfo />
      </Box>
    </nav>
  );
}

function NavList() {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
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
  );
}

function AuthInfo() {
  const params = useSearchParams();
  const { user, isLoading } = useAuth();

  if (isLoading) return <Skeleton width={80} height={36} />;

  if (user === null) {
    return (
      <GoogleLogin
        onSuccess={async (response) => {
          const res = await registerSession(response.credential);
          if (res.error) {
            toast.error(res.message);
          } else {
            const redirectPath = params.get("redirectPath") || "/";
            window.location.reload();
          }
        }}
        onError={() => {
          toast.error("Login Failed");
        }}
      />
    );
  }
  return (
    <Menu position="bottom-end" withArrow>
      <Menu.Target>
        <Flex
          className="!bg-gray-200 hover:!bg-gray-300 hover:ring !ring-blue-400 rounded-full"
          gap={10}
          p={5}
          pr={15}
          align={"center"}
          role="button"
        >
          <Avatar src={user.image} alt="Profile" />
          <Flex direction={"column"}>
            <Text size="sm">
              {user.first_name} {user.last_name}
            </Text>
            <Text size="xs">{user.email}</Text>
          </Flex>
        </Flex>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          color="red"
          leftSection={<HiOutlineLogout />}
          onClick={() => {
            logOut();
            window.location.reload();
          }}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
