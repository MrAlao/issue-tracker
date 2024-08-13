"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAuth, getPathname } from "./get-auth";
import { lucia } from "./lucia";

export const logOut = async () => {
  const { session } = await getAuth();

  if (!session) {
    return redirect(`/?redirectPath=${await getPathname()}`);
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  //return redirect(`/?redirectPath=${await getPathname()}`);
};
