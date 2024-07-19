"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Image as ImgIcon } from "lucide-react";
import { useSession } from "next-auth/react";

export default function ProfileImage({
  img,
  className,
  size,
}: {
  img?: string | undefined;
  className?: string;
  size: number;
}) {
  const { data: userSession } = useSession();

  return (
    <div className={className}>
      <Avatar className={`h-${size} w-${size} border-4 border-input`}>
        <AvatarImage
          src={
            img ||
            userSession?.user.imageURL ||
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
