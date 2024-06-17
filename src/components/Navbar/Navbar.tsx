"use client";

import Image from "next/image";
import ThemeSwitch from "./ThemeSwitch";
import { useTheme } from "next-themes";
import config from "@/lib/config";

export default function Navbar() {
  const { resolvedTheme } = useTheme();
  return (
    <div className="px-2 py-2 items-center flex">
      <div className="flex gap-5 items-center">
        <Image
          src={
            resolvedTheme == "light"
              ? (config.theme.lightLogo as string)
              : (config.theme.darkLogo as string)
          }
          alt={`${config.metadata.name} - ${config.metadata.logo}`}
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
