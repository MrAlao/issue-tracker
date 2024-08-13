"use server";
import { prisma } from "@/prisma/client";
import { jwtDecode } from "jwt-decode";
import { sessionRegister } from "../lucia-auth/session-register";

export async function registerSession(credential: string | undefined) {
  if (!credential) {
    return {
      error: true,
      message: "Authentication failed",
    };
  }

  try {
    const data = jwtDecode(credential) as {
      given_name: string;
      family_name: string;
      email: string;
      picture: string;
    };

    const res = await prisma.user.upsert({
      where: { email: data.email },
      update: {
        first_name: data.given_name,
        last_name: data.family_name,
        image: data.picture,
      },
      create: {
        first_name: data.given_name,
        last_name: data.family_name,
        email: data.email,
        image: data.picture,
      },
    });

    if (res.id) {
      await sessionRegister(res);
      return { error: false };
    } else {
      return {
        error: true,
        message: "Authentication failed",
      };
    }
  } catch (error) {
    return {
      error: true,
      message: "Something went wrong",
    };
  } finally {
    await prisma.$disconnect();
  }
}
