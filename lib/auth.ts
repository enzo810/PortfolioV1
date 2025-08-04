import { betterAuth, Session, User } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { resendClient } from "./resend";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    sendResetPassword: async ({ user, url }) => {
      await resendClient.emails.send({
        from: process.env.EMAIL ?? "example@gmail.com",
        to: user.email,
        subject: "Reset your password",
        html: `
          <h2>Reset your password</h2>
          <p>Hello ${user.name},</p>
          <p>You have requested to reset your password. Click on the link below to create a new password :</p>
          <a href="${url}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset your password</a>
          <p>If you did not request this reset, you can ignore this email.</p>
          <p>This link will expire in 1 hour.</p>
        `,
      });
    },
    resetPasswordTokenExpiresIn: 3600, // 1 hour in seconds
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
  callbacks: {
    async session({ session, user }: { session: Session; user: User }) {
      return {
        ...session,
        userName: user.name,
      };
    },
  },
});
