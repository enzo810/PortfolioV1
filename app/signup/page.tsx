"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { SignUpFormData, SignUpFormSchema } from "@/schemas/AuthFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function SignUp() {
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const { mutateAsync: signUpMutation, isPending: signUpPending } = useMutation(
    {
      mutationFn: async (values: SignUpFormData) => {
        const { error } = await authClient.signUp.email({
          email: values.email,
          password: values.password,
          name: values.name,
        });

        if (error) {
          throw new Error(error.message);
        }
      },
      onSuccess: () => {
        toast.success("Sign up successful !");
        router.push("/");
      },
      onError: (error: Error) => {
        console.error("Error while signing up:", error.message);
        toast.error(error.message || "An error occurred. Please try again.");
      },
    }
  );

  const handleSignUp = async (values: SignUpFormData) => {
    toast.promise(signUpMutation(values), {
      loading: "Signing up...",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Sign up</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSignUp)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Name"
                        className="border-[0.5px] border-foreground text-foreground lg:h-14"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Email"
                        className="border-[0.5px] border-foreground text-foreground lg:h-14"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Password"
                        className="border-[0.5px] border-foreground text-foreground lg:h-14"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={signUpPending}>
                Sign up
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account ?{" "}
            <Link href="/signin" className="underline">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
