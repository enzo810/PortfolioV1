import { z } from "zod";

export const SendEmailFormSchema = z.object({
  email: z.string().min(1),
  object: z.string().min(1),
  message: z.string().min(1),
});
