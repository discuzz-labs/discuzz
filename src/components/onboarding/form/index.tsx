"use client";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import formSchema from "@/lib/validations/validation";
import config from "@/lib/config";
import { DatePicker } from "./DatePicker";
import ProfileImage from "@/components/ProfileImage";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import Spinner from "@/components/Spinner";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function OnboardingForm() {
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setFormSubmitted(true);
    toast({
      title: "Account created successfully...",
      description: `Hello in ${config.metadata.title} family`,
      variant: "success",
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "dark:bg-[#212126] shadow-md flex flex-col gap-4 p-10 rounded-md",
          "sm:w-full md:w-1/2 lg:w-1/3 w-full"
        )}
      >
        <div className="w-full items-center justify-center">
          <h1 className="text-2xl font-extrabold">
            Welcome to {config.metadata.title}
          </h1>
          <p className="font-thin">Tell us a little bit about yourself.</p>
        </div>
        <ProfileImage />
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fullname</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DatePicker form={form} />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea placeholder="Bio" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="submit" disabled={formSubmitted}>
          {formSubmitted && <Spinner />}
          Continue
        </Button>
      </form>
    </Form>
  );
}
