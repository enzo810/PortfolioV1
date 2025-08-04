"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { requestPasswordReset } from "@/lib/auth-client";
import { ForgotPasswordSchema } from "@/schemas/AuthFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const {
    mutateAsync: forgotPasswordMutation,
    isPending: forgotPasswordPending,
  } = useMutation({
    mutationFn: async (values: z.infer<typeof ForgotPasswordSchema>) => {
      await requestPasswordReset({
        email: values.email,
        redirectTo: "/reset-password",
      });
    },
    onSuccess: () => {
      setIsSubmitted(true);
      toast.success("Reset password link sent successfully!");
    },
    onError: (error: Error) => {
      console.error("Error while sending the reset password link:", error);
      toast.error("An error occurred. Please try again.");
    },
  });

  const onSubmit = async (values: z.infer<typeof ForgotPasswordSchema>) => {
    toast.promise(forgotPasswordMutation(values), {
      loading: "Sending reset link...",
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Email sent!</CardTitle>
            <CardDescription className="text-center">
              A reset password link has been sent to your email address. Check
              your inbox and follow the instructions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <Link
                href="/signin"
                className="text-sm text-muted-foreground underline"
              >
                Back to login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Forgot your password ?</CardTitle>
          <CardDescription className="text-center">
            Enter your email address to receive a reset password link
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="your.email@example.com"
                        disabled={forgotPasswordPending}
                        className="border-[0.5px] border-foreground text-foreground lg:h-14"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={forgotPasswordPending}
              >
                Send link
              </Button>
            </form>
          </Form>

          <div className="mt-4 text-center">
            <Link
              href="/signin"
              className="text-sm text-muted-foreground underline"
            >
              Back to login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
