"use client";

import Logo from "../Logo";
import ThemeSwitch from "./ThemeSwitch";
import UserActions from "./UserActions";

export default function NavBar() {
  return (
    <div className="z-20 backdrop-blur-md bg-white/50 dark:bg-black/50 px-5 py-2 items-center flex sticky top-0 h-[10vh]">
      <div className="flex gap-5 items-center">
        <Logo />
      </div>
      <div className="grow gap-2 flex items-center justify-end">
        <UserActions />
        <ThemeSwitch />
      </div>
    </div>
  );
}
