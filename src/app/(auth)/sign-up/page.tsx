"use client";

import SignUpForm from "@/components/sign-up/form";
import config from "@/lib/config";

export default function SignUpPage() {
  return (
    <div className="py-10 flex items-center justify-center w-[100vw] h-full">
      <SignUpForm />
    </div>
  );
}
