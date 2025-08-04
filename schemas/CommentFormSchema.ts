import { z } from "zod";

export const CreateCommentFormSchema = z.object({
  content: z
    .string()
    .min(3, { message: "Min 3 characters" })
    .max(25, { message: "Max 25 characters" }),
  userId: z.string(),
});

export const CommentsSchema = z.array(
  z.object({
    content: z.string(),
    id: z.number(),
    user: z.object({
      name: z.string(),
    }),
    createdAt: z.date(),
  })
);
