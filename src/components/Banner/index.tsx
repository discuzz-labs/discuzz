import Image from "next/image";
import ProfileImage from "@/components/ProfileImage";
import { Button } from "@/components/ui/button";

interface BannerProps {
  name: string;
}
export default function Banner({ name }: BannerProps) {
  return (
    <div className="relative">
      <Image
        src={"assets/banner.jpg"}
        alt="Banner image"
        width={0}
        height={0}
        className="w-full h-80 object-cover"
        priority
        unoptimized={true}
        unselectable="on"
      />
      <div className="absolute left-10 top-1/2">
        <p className="font-extrabold text-4xl text-white leading-4">
          Welcome, {name} 👋
        </p>
      </div>
      <ProfileImage size={32} className="absolute left-10 max-w-32 max-h-32 bottom-[-3rem]" />
      <Button className="absolute right-10 bottom-[-3rem]">Follow</Button>
    </div>
  );
}
