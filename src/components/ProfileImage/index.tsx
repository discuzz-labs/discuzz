"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Image as ImgIcon } from "lucide-react";
import { useUser } from "@clerk/nextjs";

export default function ProfileImage() {
  const { user } = useUser();
  return (
    <div className="flex items-center justify-center w-full">
      <Avatar className="border-4 border-input">
        <AvatarImage src={user?.imageUrl as string | undefined} />
        <AvatarFallback>
          <ImgIcon size={40} />
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
