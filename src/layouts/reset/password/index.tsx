"use client";

import AuthForm from "@/components/AuthForm";
import { useState } from "react";
import Header from "@/components/Header";


export default function ResetPasswordLayout() {
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  return(
    <>
      <div className="w-full h-[100vh] items-center justify-center flex">
        <div className="w-1/2">
          <Header content="Reset Password" />
          {/* <AuthForm
            schema={ResetPasswordFormSchema}
            formSubmitted={formSubmitted}
            callbackFn={() => {}}
            fields={[
              {
                name: "email",
                placeholder: "Email",
                type: "email",
              },
            ]}
            submitBtnText="Reset Password"
          /> */}
        </div>
      </div>
    </>
  );
}
