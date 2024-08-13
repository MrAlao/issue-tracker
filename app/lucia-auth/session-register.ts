import { cookies } from "next/headers";
import { lucia } from "./lucia";
import { User } from "@prisma/client";

export async function sessionRegister(user: User) {
  const userId = user.id as unknown as string;
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
}
