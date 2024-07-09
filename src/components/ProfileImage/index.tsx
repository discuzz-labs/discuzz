"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Image as ImgIcon } from "lucide-react";
import { useUserSession } from "../providers/AuthProvider";

export default function ProfileImage({
  img,
  className,
  size,
}: {
  img?: string | undefined;
  className?: string;
  size: number;
}) {
  const { userSession } = useUserSession();

  return (
    <div className={className}>
      <Avatar className={`h-${size} w-${size} border-4 border-input`}>
        <AvatarImage
          src={
            img ||
            userSession?.imageURL ||
            "https://www.gravatar.com/avatar/placeholder"
          }
          alt="Profile Image"
        />
        <AvatarFallback>
          <ImgIcon size={40} />
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
