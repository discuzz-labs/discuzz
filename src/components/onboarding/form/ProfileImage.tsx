"use client";

import formSchema from "@/lib/validations/validation";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Image as ImgIcon } from "lucide-react";
import { useUser } from "@clerk/nextjs";

export default function ProfileImage({
  form,
}: {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}) {
  const { user } = useUser();
  return (
    <div className="flex items-center justify-center w-full">
      <Avatar>
        <AvatarImage src={user?.imageUrl as string | undefined} />
        <AvatarFallback>
          <ImgIcon size={40} />
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
