"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { User } from "better-auth";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  CommentsSchema,
  CreateCommentFormSchema,
} from "../schemas/CommentFormSchema";
import { SendEmailFormSchema } from "../schemas/ContactFormSchema";
import { createComment, sendEmail } from "../server/server.action";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

type ContactFormProps = {
  comments?: z.infer<typeof CommentsSchema>;
  user: User;
};

const Contact = ({ comments, user }: ContactFormProps) => {
  const contactForm = useForm<z.infer<typeof SendEmailFormSchema>>({
    resolver: zodResolver(SendEmailFormSchema),
    defaultValues: {
      email: user.email,
      object: "",
      message: "",
    },
  });

  const commentForm = useForm<z.infer<typeof CreateCommentFormSchema>>({
    resolver: zodResolver(CreateCommentFormSchema),
    defaultValues: {
      content: "",
      userId: user.id,
    },
  });

  const { mutateAsync: sendEmailMutation, isPending: sendEmailPending } =
    useMutation({
      mutationFn: async (values: z.infer<typeof SendEmailFormSchema>) => {
        return await sendEmail(values);
      },
      onSuccess: (data) => {
        if (data?.data?.status === 201) {
          toast.success(data?.data?.message);
          contactForm.reset();
        }
        if (data?.serverError) {
          toast.error(data?.serverError);
        }
      },
    });

  const {
    mutateAsync: createCommentMutation,
    isPending: createCommentPending,
  } = useMutation({
    mutationFn: async (values: z.infer<typeof CreateCommentFormSchema>) => {
      return await createComment(values);
    },
    onSuccess: (data) => {
      if (data?.data?.status === 201) {
        toast.success(data?.data?.message);
        commentForm.reset();
      }
      if (data?.serverError) {
        toast.error(data?.serverError);
      }
    },
  });

  function onSubmitEmail(values: z.infer<typeof SendEmailFormSchema>) {
    toast.promise(sendEmailMutation(values), {
      loading: "Sending email...",
    });
  }

  function onSubmitComment(values: z.infer<typeof CreateCommentFormSchema>) {
    toast.promise(createCommentMutation(values), {
      loading: "Sending comment...",
    });
  }

  return (
    <section className="flex flex-col lg:flex-row gap-8" id="contact">
      <Card className="p-8 flex-1">
        <h2 className="text-xl lg:text-3xl text-center font-bold text-neon mb-4 drop-shadow-neon">
          Email
        </h2>
        <Form {...contactForm}>
          <form
            onSubmit={contactForm.handleSubmit(onSubmitEmail)}
            className="space-y-6 mx-auto"
          >
            <FormField
              control={contactForm.control}
              name="object"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Object"
                      className="border-[0.5px] border-foreground lg:h-14 text-foreground"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={contactForm.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Content"
                      className="border-[0.5px] border-foreground text-foreground resize-none h-20 lg:h-40"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-center">
              <Button
                type="submit"
                disabled={sendEmailPending}
                variant="neon"
                size="xl"
              >
                <span>Send</span>
              </Button>
            </div>
          </form>
        </Form>
      </Card>
      <Card className="p-8 flex-1 flex flex-col">
        <h2 className="text-xl lg:text-3xl text-center font-bold text-neon mb-4 drop-shadow-neon">
          Comments
        </h2>

        <Form {...commentForm}>
          <form
            onSubmit={commentForm.handleSubmit(onSubmitComment)}
            className="space-y-6 flex flex-col flex-grow h-full"
          >
            <Card className="border-[0.5px] border-foreground flex-grow p-2 overflow-y-auto h-20 lg:h-32">
              <div className="flex flex-col gap-2 text-xs">
                {comments && comments.length > 0 ? (
                  comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="flex justify-between items-center gap-4"
                    >
                      <div className="flex-1">
                        {comment.user.name} : {comment.content}
                      </div>
                      <div>{format(new Date(comment.createdAt), "dd/MM")}</div>
                    </div>
                  ))
                ) : (
                  <p>No comments yet...</p>
                )}
              </div>
            </Card>

            <FormField
              control={commentForm.control}
              name="content"
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Write your comment here"
                      className="border-[0.5px] border-foreground lg:h-14 text-foreground"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-center">
              <Button
                type="submit"
                disabled={createCommentPending}
                variant="neon"
                size="xl"
              >
                <span>Send</span>
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </section>
  );
};

export default Contact;
