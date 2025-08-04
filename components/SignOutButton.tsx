"use client";

import { signOut } from "@/lib/auth-client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "./ui/button";

const SignOutButton = () => {
  const router = useRouter();

  const { mutateAsync: signOutMutation, isPending: signOutPending } =
    useMutation({
      mutationFn: async () => {
        await signOut();
      },
      onSuccess: () => {
        toast.success("Logout successful!");
        router.push("/");
      },
      onError: (error: Error) => {
        console.error("Error while logging out:", error);
        toast.error("An error occurred. Please try again.");
      },
    });

  const handleSignOut = () => {
    toast.promise(signOutMutation(), {
      loading: "Logging out...",
    });
  };

  return (
    <Button
      variant="neon"
      size="lg"
      className="uppercase flex items-center gap-2"
      onClick={handleSignOut}
      disabled={signOutPending}
    >
      Logout
    </Button>
  );
};

export default SignOutButton;
