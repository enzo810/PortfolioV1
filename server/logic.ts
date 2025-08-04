import { prisma } from "@/lib/prisma";
import { resendClient } from "@/lib/resend";
import {
  CommentsSchema,
  CreateCommentFormSchema,
} from "@/schemas/CommentFormSchema";
import { SendEmailFormSchema } from "@/schemas/ContactFormSchema";
import { z } from "zod";

// Testable functions for Vitest
export async function sendEmailLogic(
  data: z.infer<typeof SendEmailFormSchema>
) {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    throw new Error("Email not found");
  }
  try {
    const myEmail = process.env.EMAIL ?? "";
    const userEmail = data.email;

    const emailOptions = {
      from: myEmail,
      to: myEmail,
      subject: data.object,
      reply_to: userEmail,
      html: `
        <p><strong>Message of : ${data.email}</strong></p>
        <p>${data.message}</p>
      `,
    };

    const response = await resendClient.emails.send(emailOptions);

    if (response.error) {
      console.error(response.error);
      throw new Error("An error occurred while sending the email.");
    }

    return {
      status: 201,
      message: "Email sent successfully",
    };
  } catch (error) {
    return {
      message: error instanceof Error && error.message,
      status: 500,
    };
  }
}

export async function createCommentLogic(
  data: z.infer<typeof CreateCommentFormSchema>
) {
  const user = await prisma.user.findUnique({
    where: {
      id: data.userId,
    },
  });

  if (!user) {
    return {
      message: "User not found",
      status: 500,
    };
  }
  try {
    const comment = await prisma.comment.create({
      data: { ...data },
    });

    if (comment) {
      return {
        message: "The comment has been created successfully",
        status: 201,
      };
    }

    return {
      message: "Failed to create comment",
      status: 500,
    };
  } catch (error) {
    return {
      message: error instanceof Error && error.message,
      status: 500,
    };
  }
}

export async function getCommentsLogic() {
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
    where: {
      userId: "test-user-id-bis",
    },
  });

  return {
    comments: CommentsSchema.parse(comments),
    message: "The comments have been retrieved successfully",
    status: 200,
  };
}
