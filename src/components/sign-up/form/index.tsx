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
import { onBoardingFormSchema } from "@/lib/validations/validation";
import config from "@/lib/config";
import { DatePicker } from "./DatePicker";
import ProfileImage from "@/components/ProfileImage";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import Spinner from "@/components/Spinner";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { SHA256 } from "crypto-js";

export default function SignUpForm() {
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [profileImageProvidedByGravater, setprofileImageProvidedByGravater] =
    useState<string | undefined>(undefined);

  const { toast } = useToast();
  const form = useForm<z.infer<typeof onBoardingFormSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(onBoardingFormSchema),
  });

  const getprofileImageProvidedByGravater = (email: string | undefined) => {
    if (email == undefined) return;

    let hashedGravaterEmail = SHA256(email);
    setprofileImageProvidedByGravater(
      `https://www.gravatar.com/avatar/${hashedGravaterEmail}`
    );
  };

  const onSubmit = (values: z.infer<typeof onBoardingFormSchema>) => {
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
        <ProfileImage img={profileImageProvidedByGravater} />

        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gravater Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Gravater Email if any!"
                  onChangeCapture={(e) =>
                    getprofileImageProvidedByGravater(e.currentTarget.value)
                  }
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
