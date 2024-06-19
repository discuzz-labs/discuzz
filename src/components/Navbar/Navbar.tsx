"use client";

import Image from "next/image";
import ThemeSwitch from "./ThemeSwitch";
import { useTheme } from "next-themes";
import config from "@/lib/config";
import Link from "next/link";
import UserActions from "./UserActions";

export default function Navbar() {
  const { resolvedTheme } = useTheme();
  return (
    <div className="z-20 backdrop-blur-md bg-white/50 dark:bg-black/50 px-5 py-2 items-center flex sticky top-0 h-[10vh]">
      <div className="flex gap-5 items-center">
        <Link href="/">
          <Image
            src={
              (resolvedTheme == "light"
                ? (config.theme.lightLogo as string)
                : (config.theme.darkLogo as string)) ||
              (config.metadata.logo as string)
            }
            alt={`${config.metadata.name}`}
            width={0}
            height={0}
            className="min-w-[100px]"
            priority
          />
        </Link>
      </div>
      <div className="grow gap-2 flex items-center justify-end">
        <UserActions />
        <ThemeSwitch />
      </div>
    </div>
  );
}
