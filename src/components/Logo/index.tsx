import Image from "next/image";
import config from "@/lib/config";
import { useTheme } from "next-themes";
import Link from "next/link";

export default function Logo() {
    const { resolvedTheme } = useTheme();

  return (
    <div>
       <Link href="/">
          <Image
            src={
              (resolvedTheme == "light"
                ? (config.theme.lightLogo as string)
                : (config.theme.darkLogo as string)) ||
              (config.metadata.logo as string)
            }
            alt={`${config.metadata.title}`}
            width={0}
            height={0}
            className="min-w-[100px]"
            priority
          />
        </Link>
    </div>
  )
}
