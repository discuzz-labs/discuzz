"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Image as ImgIcon } from "lucide-react";
import { useSession } from "next-auth/react";

export default function ProfileImage({ img }: { img?: string | undefined }) {
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-center w-full">
      <Avatar className="border-4 border-input">
        <AvatarImage
          src={
            (session?.user?.image as string) ||
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
