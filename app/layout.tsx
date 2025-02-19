"use client";

import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import "@mantine/core/styles.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import NavBar from "./components/NavBar";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./context/Auth.context";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID!;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <GoogleOAuthProvider clientId={`${process.env.GOOGLE_OAUTH_CLIENT_ID}`}>
          <MantineProvider>
            <AuthProvider>
              <NavBar />
              <main className="p-5 lg:p-0 lg:w-4/5 mx-auto">{children}</main>
              <Footer />
            </AuthProvider>
            <ToastContainer theme="colored" />
          </MantineProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
