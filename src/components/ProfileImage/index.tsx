"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Image as ImgIcon } from "lucide-react";

export default function ProfileImage() {
  return (
    <div className="flex items-center justify-center w-full">
      <Avatar className="border-4 border-input">
        <AvatarImage src={undefined} />
        <AvatarFallback>
          <ImgIcon size={40} />
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
