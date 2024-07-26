"use client";

import Logo from "../Logo";
import ThemeSwitch from "./ThemeSwitch";
import LangSwitch from "./LangSwitch";
import AuthNavigation from "./AuthNavigation";
import Navigation from "./Navigation";
import SearchBox from "@/components//SearchBox";
import { UserActions } from "./UserActions";
import { useSession } from "next-auth/react";
import { useState } from "react"

export default function NavBar() {
  const { data: userSession } = useSession()
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="px-5 z-20 bg-background py-2 items-center flex sticky top-0 h-[10vh]">
      <div className="flex gap-5 items-center">
        <Logo />
      </div>
      <div className="grow px-10 py-5 flex items-center justify-center">
      {(userSession?.user.id && userSession.user.name) && <Navigation setOpen={setOpen}/>}
      </div>
      <div className="gap-2 flex items-center justify-end">
        {userSession?.user.id && userSession.user.name ? <UserActions userName={userSession.user.name} />:  <AuthNavigation />}
        <ThemeSwitch />
        <LangSwitch />
      </div>
      <SearchBox open={open} setOpen={setOpen} />
    </div>
  );
}
