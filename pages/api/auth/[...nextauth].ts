import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({ log: ["query"] });

const createIfNotExists = async (
  name: string,
  email: string,
  avatar: string
) => {
  const userExists = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!userExists) {
    // create user in database
    console.log("creating user");
    let username = name.split(" ").join("").toLowerCase();
    let exists = await prisma.user.findUnique({
      where: { username: username },
    });
    while (exists) {
      username += Math.floor(Math.random() * 10).toString();
      exists = await prisma.user.findUnique({
        where: { username: username },
      });
    }
    const res = await prisma.user.create({
      data: {
        name: name,
        email: email,
        avatar: avatar,
        username: username,
      },
    });
    return res;
  }
  return userExists!;
};

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, profile }) {
      // check if user exists in database
      console.log("user", user);
      console.log("profile", profile);
      await createIfNotExists(user.name, user.email, user.image);
      return true;
    },
    async session({ session, token }) {
      session.user.uid = token.sub;
      const user = await createIfNotExists(
        session.user.name,
        session.user.email,
        session.user.image
      );
      session.user.id = user.id;
      session.user.avatar = user.avatar;
      session.user.tag = user.username;
      return session;
    },
  },
};

export default NextAuth(authOptions);
