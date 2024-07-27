"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Image as ImgIcon } from "lucide-react";
import { useSession } from "next-auth/react";

interface ProfileImageProps {
  img?: string | undefined;
  className?: string;
  size: number;
}

export default function ProfileImage({
  img,
  className,
  size,
}: ProfileImageProps) {
  const { data: userSession } = useSession();

  return (
    <div className={className}>
      <Avatar className={`border-4 border-input`}>
        <AvatarImage
          className={`h-${size} w-${size}`}
          src={
            img ||
            userSession?.user.image ||
            "https://www.gravatar.com/avatar/placeholder"
          }
          alt="Profile Image"
        />
        <AvatarFallback>
          <ImgIcon  className={`h-${size} w-${size}`} />
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
