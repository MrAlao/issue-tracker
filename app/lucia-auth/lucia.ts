import { Lucia } from "lucia";
import { PrismaAdapter } from "./ExtendedPrismaAdapter";
import { prisma } from "@/prisma/client";

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    // this sets cookies with super long expiration
    // since Next.js doesn't allow Lucia to extend cookie expiration when rendering pages
    expires: false,
    attributes: {
      // set to `true` when using HTTPS
      secure: process.env.NODE_ENV === "production",
    },
  },

  getUserAttributes: (attributes) => {
    //console.log(attributes)
    return {
      // attributes has the type of DatabaseUserAttributes
      first_name: attributes.first_name,
      last_name: attributes.last_name,
      email: attributes.email,
      image: attributes.image,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  //id:number
  first_name: string;
  last_name: string;
  email: string;
  image: string;
}
