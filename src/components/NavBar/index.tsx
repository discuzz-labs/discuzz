"use client";

import Logo from "../Logo";
import ThemeSwitch from "./ThemeSwitch";
import LangSwitch from "./LangSwitch";
import AuthNavigation from "./AuthNavigation";
import { useSession } from "next-auth/react";
import { Search } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import routes from "@/services/routes";

export default function NavBar() {
  const { data: userSession } = useSession();

  return (
    <div className="px-5 z-20 bg-background py-2 items-center justify-between flex sticky top-0 h-[10vh]">
      <div className="flex gap-5 items-center">
        <Logo />
      </div>
      <div className="gap-2 flex items-center justify-end">
        {!userSession?.user.id && !userSession?.user.email && (
          <AuthNavigation />
        )}
        <Link href={routes.search.index.path}>
          <Button size={"icon"} variant={"ghost"}>
            <Search className="w-4 h-4" />
          </Button>
        </Link>
        <ThemeSwitch />
        <LangSwitch />
      </div>
    </div>
  );
}
