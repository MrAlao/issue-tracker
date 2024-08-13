import { cookies, headers } from "next/headers";
import { cache } from "react";
import { lucia } from "./lucia";
import { Session, User } from "lucia";
import { redirect } from "next/navigation";

export const getAuth = cache(
  async (): Promise<{ user: User | null; session: Session | null }> => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }

    const result = await lucia.validateSession(sessionId);

    try {
      if (result.session && result.session.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }
    } catch {}
    return result;
  }
);

export async function validateSession() {
  const { user, session } = await getAuth();

  if (!session || !user) {
    return redirect(`/login/?redirectPath=${await getPathname()}`);
  }

  return { user: { ...user, id: Number(user.id) }, session };
}

export async function getPathname() {
  const headersList = headers();

  const fullUrl =
    headersList.get("x-forwarded-url") || headersList.get("referer") || "";

  // Parse the URL to remove the hostname
  let pathname = "";
  if (fullUrl) {
    try {
      const urlObj = new URL(fullUrl);
      pathname = urlObj.pathname + urlObj.search;
    } catch (error) {
      console.error("Invalid URL:", fullUrl);
    }
  }

  return pathname; //encodeURIComponent(pathname)
}
