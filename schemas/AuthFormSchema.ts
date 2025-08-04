import { z } from "zod";

export const SignInFormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(8, "Password must contain at least 8 characters"),
});

export const SignUpFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must contain at least 2 characters")
    .max(50, "Name cannot exceed 50 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(8, "Password must contain at least 8 characters"),
});

export const authFormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
  name: z.string().min(1, {
    message: "Please enter your name",
  }),
});

export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
});

export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, {
        message: "Password must contain at least 8 characters",
      })
      .max(20, {
        message: "Password must contain at most 20 characters",
      }),
    confirmPassword: z
      .string()
      .min(8, {
        message: "Password must contain at least 8 characters",
      })
      .max(20, {
        message: "Password must contain at most 20 characters",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignInFormData = z.infer<typeof SignInFormSchema>;
export type SignUpFormData = z.infer<typeof SignUpFormSchema>;
