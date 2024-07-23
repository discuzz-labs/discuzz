"use client";

import { useState } from "react";
import sendVerificationEmail from "@/actions/verify/sendVerificationEmail";
import { SUCCESS } from "@/lib/messages";
import { useSession } from "next-auth/react"
import Header from "@/components/Header";
import Alert from "@/components/Alert";
import createToken from "@/actions/createToken";
import { VerifyEmailFormSchema } from "@/validations/form";
import AuthForm from "@/components/AuthForm";
import { Check } from "lucide-react";

export default function VerifyLayout() {
  const { data: userSession } = useSession();
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' }>({ text: '', type: 'error' });


  const sendEmail = async () => {
    setFormSubmitted(true)
    try {
      const createOobAction = await createToken({
        email: userSession?.user.email as string,
      });
      if (createOobAction.success === false) {
        setMessage({ text: createOobAction.error, type: 'error' });
        setFormSubmitted(false)
        return;
      }
      
      const sendVerificationEmailAction = await sendVerificationEmail({
        email: userSession?.user.email as string,
        userName: userSession?.user.name as string,
        token: createOobAction.data?.token as string,
      });
      
      if (sendVerificationEmailAction.success === false) {
        setMessage({ text: sendVerificationEmailAction.error, type: 'error' });
        setFormSubmitted(false)
        return;
      }
      
      setMessage({ text: SUCCESS.VERIFICATION_SUCCESS_EMAIL_SENT, type: 'success' });
    } catch (err) {
      setMessage({ text: err as string, type: 'error' });
    }
    setFormSubmitted(false)
  };

  return (
    <div className="relative w-full h-[100vh] flex flex-col items-center justify-center dark:decorator">
      <Header content="Verification" caption="Verify your email." />
      {message.text && message.type == "error" && <Alert message={message.text} type={message.type} />}
      {message.text && message.type == "success" && <p className="flex items-center gap-5"><Check /> {message.text}</p> }
      <div className="w-1/2">   <AuthForm
        schema={VerifyEmailFormSchema}
        formSubmitted={formSubmitted}
        fields={[]}
        callbackFn={sendEmail}
        submitBtnText="send verification email."
      />
      </div>
   
    </div>
  );
}
