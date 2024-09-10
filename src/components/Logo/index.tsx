"use client";

import Image from "next/image";
import config from "@/config";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Logo() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (mounted)
    return (
      <div>
        <Link href="/">
          <Image
            src={
              resolvedTheme === "light" 
              ? (config.theme.lightLogo) as string
              : (config.theme.darkLogo) as string
            }
            alt={`${config.title}`}
            width={0}
            height={0}
            className="min-w-[100px]"
            priority
            unoptimized={true}
            unselectable="on"
          />
        </Link>
      </div>
    );
}
