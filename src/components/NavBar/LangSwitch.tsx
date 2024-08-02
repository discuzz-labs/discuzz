"use client"

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Earth } from "lucide-react";
import { getCookie, setCookie } from "@/actions/cookie";
import { availableLocales } from "@/i18n.settings";
import { useRouter } from "next/navigation";

export default function LangSwitch() {
  const router = useRouter();
  const [lang, setLang] = useState<string | undefined>(undefined);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handle = async () => {
      setMounted(true);
      const cookie = await getCookie("lang");
      setLang(cookie);
    };

    handle();
  }, []);

  return (
    <>
      {mounted && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost">
              <Earth className="size-[1.2rem]" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {availableLocales.map((locale : string) => (
              <DropdownMenuCheckboxItem
                key={locale}
                checked={locale == lang}
                className="flex items-center gap-2"
                onClick={() => {
                  setCookie("lang", locale);
                  setLang(locale)
                }}
              >
                {locale}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
