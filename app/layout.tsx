"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import "@mantine/core/styles.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import NavBar from "./components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <MantineProvider>
          <NavBar />
          <main className="p-5 lg:p-0 lg:w-4/5 mx-auto">{children}</main>
          <ToastContainer theme="colored" />
        </MantineProvider>
      </body>
    </html>
  );
}
