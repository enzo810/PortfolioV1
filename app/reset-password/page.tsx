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
import { resetPassword } from "@/lib/auth-client";
import { ResetPasswordSchema } from "@/schemas/AuthFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string | null>(null);

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    setToken(tokenFromUrl);

    if (!tokenFromUrl) {
      toast.error("Reset password token missing or invalid");
      router.push("/forgot-password");
    }
  }, [searchParams, router]);

  const {
    mutateAsync: resetPasswordMutation,
    isPending: resetPasswordPending,
  } = useMutation({
    mutationFn: async (values: z.infer<typeof ResetPasswordSchema>) => {
      if (!token) {
        throw new Error("Reset password token missing");
      }

      await resetPassword({
        newPassword: values.password,
        token: token,
      });
    },
    onSuccess: () => {
      toast.success("Password reset successfully!");
      router.push("/signin");
    },
    onError: (error: Error) => {
      console.error("Error while resetting the password:", error);
      toast.error("An error occurred. Please try again.");
    },
  });

  const onSubmit = async (values: z.infer<typeof ResetPasswordSchema>) => {
    toast.promise(resetPasswordMutation(values), {
      loading: "Resetting password...",
    });
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Invalid token</CardTitle>
            <CardDescription className="text-center">
              The reset password link is invalid or has expired.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <Link
                href="/forgot-password"
                className="text-blue-600 hover:underline"
              >
                Request a new link
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
          <CardTitle className="text-center">New password</CardTitle>
          <CardDescription className="text-center">
            Enter your new password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        disabled={resetPasswordPending}
                        className="border-[0.5px] border-foreground text-foreground lg:h-14"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm the password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        disabled={resetPasswordPending}
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
                disabled={resetPasswordPending}
              >
                Reset password
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

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Loading...</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ResetPasswordForm />
    </Suspense>
  );
}
