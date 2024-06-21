"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import formSchema from "@/lib/validations/validation";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Image as ImgIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ChangeEvent } from "react";
import { useUser } from "@clerk/nextjs";

export default function ProfileImage({
  form,
}: {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}) {
  const { user } = useUser();
  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {};

  return (
    <div>
      <FormField
        control={form.control}
        name="profile_photo"
        render={({ field }) => (
          <FormItem className="flex flex-col items-center gap-4 cursor-pointer">
            <FormLabel className="p-10  bg-[white] dark:bg-[#26262b] rounded-md">
              {user?.imageUrl ? (
                <img
                  src={`${user?.imageUrl}`}
                  alt="profile_icon"
                  width={96}
                  height={96}
                  className="rounded-full object-contain"
                />
              ) : field.value ? (
                <img
                  src={field.value}
                  alt="profile_icon_uploaded"
                  width={96}
                  height={96}
                  className="rounded-full object-contain"
                />
              ) : (
                <ImgIcon />
              )}
            </FormLabel>
            <FormControl className="flex-1 text-base-semibold text-gray-200">
              <Input
                type="file"
                accept="image/*"
                placeholder="Add profile photo"
                className="bg-[#26262b] text-white border-2 border-[#313135 hidden"
                onChange={(e) => handleImage(e, field.onChange)}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}
