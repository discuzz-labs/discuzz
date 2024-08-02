"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export default function ThemeSwitch() {
  const translate = useTranslations("common.components.NavBar")
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost">
              <Sun className="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuCheckboxItem
              checked={resolvedTheme === "light"}
              onClick={() => {
                setTheme("light");
              }}
              className="flex items-center gap-2"
            >
              <Sun />
              {translate("light")}
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={resolvedTheme === "dark"}
              onClick={() => {
                setTheme("dark");
              }}
              className="flex items-center gap-2"
            >
              <Moon />
              {translate("dark")}
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={resolvedTheme === "system"}
              onClick={() => {
                setTheme("system");
              }}
              className="flex items-center gap-2"
            >
              <Monitor />
              {translate("system")}
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
