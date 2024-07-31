import React, { ReactNode } from "react";
import { useTranslations } from "next-intl";

export default function AuthLayoutStyle({ children }: { children: ReactNode }) {
  const t = useTranslations("global")

  return (
    <div className="w-full h-[100vh] flex">
      <div className="lg:flex lg:w-1/2 hidden decorator text-white py-10 gap-5 flex-col p-10 justify-end">
        <p className="font-extrabold text-2xl">
         {t("quote")}
        </p>
        <p className="font-thin text-xl">- Albert Einstein</p>
      </div>
      <div className="relative lg:w-1/2 lg:dark:bg-black lg:dark:bg-none w-full flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
}
