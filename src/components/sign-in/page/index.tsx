"use client";

import React, { useState } from "react";
import SignInForm from "../form";

export default function SignInPage() {
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  return (
    <div className="w-full h-[100vh] flex">
      <div className="lg:flex lg:w-1/2 hidden bg-[#0b0a09] decorator text-white py-10  gap-5 flex-col p-10 justify-end">
        <p className="font-extrabold text-2xl">
          “Life is like riding a bicycle. To keep your balance, you must keep
          moving.”
        </p>
        <p className="font-thin text-xl">- Albert Einstein</p>
      </div>

      <div className="lg:w-1/2 lg:dark:bg-black lg:dark:bg-none dark:decorator w-full flex flex-col items-center justify-center">
        <div className="flex flex-col gap-2 items-center justify-center pb-10">
          <p className="text-2xl font-extrabold">Sign in</p>
          <p className="text-sm font-thin">Sign in to your account.</p>
        </div>

        <SignInForm login={() => {}} formSubmitted={formSubmitted} />
      </div>
    </div>
  );
}
