"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Image as ImgIcon } from "lucide-react";
import { useUserSession } from "../providers/AuthProvider";

export default function ProfileImage({ img }: { img?: string | undefined }) {
  const { userSession } = useUserSession();

  return (
    <div className="flex items-center justify-center w-full">
      <Avatar className="border-4 border-input">
        <AvatarImage
          src={
            userSession?.imageURL ||
            img ||
            "https://www.gravatar.com/avatar/placeholder"
          }
        />
        <AvatarFallback>
          <ImgIcon size={40} />
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
