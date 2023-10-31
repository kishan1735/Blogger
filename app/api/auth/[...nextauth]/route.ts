import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/userModel";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session }) {
      return {
        ...session,
        user: {
          name: session.user?.name ?? "",
          email: session.user?.email ?? "",
        },
      };
    },
    async signIn({ profile }) {
      try {
        await dbConnect();
        const user = await User.findOne({ email: profile?.email });
        if (!user) {
          await User.create({
            email: profile?.email,
            name: profile?.name,
          });
        }
        return true;
      } catch (err) {
        return false;
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
