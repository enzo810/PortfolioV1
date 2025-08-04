"use server";

import { prisma } from "@/lib/prisma";
import { resendClient } from "@/lib/resend";
import { action, ActionError } from "@/lib/safe-actions";
import {
  CommentsSchema,
  CreateCommentFormSchema,
} from "@/schemas/CommentFormSchema";
import { revalidatePath } from "next/cache";
import { SendEmailFormSchema } from "../schemas/ContactFormSchema";

export const sendEmail = action
  .schema(SendEmailFormSchema)
  .action(async ({ parsedInput: values }) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: values.email,
        },
      });

      if (!user) {
        throw new ActionError("Email not found");
      }

      const myEmail = process.env.EMAIL ?? "";
      const userEmail = values.email;

      const emailOptions = {
        from: myEmail,
        to: myEmail,
        subject: values.object,
        reply_to: userEmail,
        html: `
          <p><strong>Message from: ${values.email}</strong></p>
          <p>${values.message}</p>
        `,
      };

      const response = await resendClient.emails.send(emailOptions);

      if (response.error) {
        console.error(response.error);
        throw new ActionError("An error occurred while sending the email.");
      }

      return {
        status: 201,
        message: "Email sent successfully",
      };
    } catch (error) {
      console.error(error);
      throw new ActionError("An error occurred while sending the email.");
    }
  });

export const createComment = action
  .schema(CreateCommentFormSchema)
  .action(async ({ parsedInput: values }) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: values.userId,
        },
      });

      if (!user) {
        throw new ActionError("User not found");
      }

      const comment = await prisma.comment.create({
        data: { ...values },
      });

      if (comment) {
        revalidatePath("/");
        return {
          message: "The comment has been created successfully",
          status: 201,
        };
      }
    } catch {
      throw new ActionError("An error occurred while creating the comment");
    }
  });

export const getComments = action.action(async () => {
  const comments = await prisma.comment.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  try {
    return {
      comments: CommentsSchema.parse(comments),
      message: "The comments have been retrieved successfully",
      status: 200,
    };
  } catch {
    throw new ActionError("An error occurred while retrieving the comments");
  }
});
