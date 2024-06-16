"use client";

import Image from "next/image";
import ThemeSwitch from "@/components/ThemeSwitch";
import { useTheme } from "next-themes";

export default function Navbar() {
  const { resolvedTheme } = useTheme();
  return (
    <div className="px-2 py-2 items-center flex">
      <div className="flex gap-5 items-center">
        <Image
          src={
            resolvedTheme == "light"
              ? (process.env.NEXT_PUBLIC_SITE_LIGHT_LOGO as string)
              : (process.env.NEXT_PUBLIC_SITE_DARK_LOGO as string)
          }
          alt={`${process.env.NEXT_PUBLIC_METADATA_NAME} - ${process.env.NEXT_PUBLIC_METADATA_LOGO}`}
          width={0}
          height={0}
          className="w-[100px] h-full "
          priority
        />
      </div>
      <div className="grow flex items-center justify-end">
        <ThemeSwitch />
      </div>
    </div>
  );
}
