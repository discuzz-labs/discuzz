"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Alert from "@/components/Alert";
import { useRouter } from "next/navigation";
import { ShieldAlert } from "lucide-react";
import Spinner from "@/components/Spinner";
import { PENDING } from "@/lib/messages";
import verifyToken from "@/actions/verifyToken";
import verifyUser from '@/actions/verify/verifyUser';
import routes from "@/services/routes"
import { useSession } from "next-auth/react";

interface VerifyTokenLayoutProps {
  token: string;
}

export default function VerifyTokenLayout({ token }: VerifyTokenLayoutProps) {
  const router = useRouter();
  const [status, setStatus] = useState<{state: boolean | undefined, message: string}>({
    state: undefined,
    message: ""
  });
  const { data : userSession, update } = useSession()

  const isVlaidToken = async () => {
    try {
      const verifyTokenAction = await verifyToken({
        token,
      });
      if (verifyTokenAction.success === false) {
        setStatus({message: verifyTokenAction.error, state: false});
        return;
      }
      setStatus({ message: "", state: true})
      return {
        email: verifyTokenAction.data?.email
      }
    } catch (err) {
      setStatus({message: err as string,  state: false});
    }
  };
  
  const verifyUserEmail = async (email: string) => {
    try{
      const verifyUserAction = await verifyUser({email})
      if (verifyUserAction.success === false) {
        setStatus({message: verifyUserAction.error, state: false});
        return;
      }
      if(userSession?.user) update({verified: true}) 
      router.push(routes.redirects.onVerified)
    }catch(err){
      setStatus({message: err as string,  state: false});
    }
  }


  useEffect(() => {
    const handleVerification = async () => {
      const payload = await isVlaidToken();
      if (payload?.email) {
        await verifyUserEmail(payload.email);
      }
    };

    handleVerification();
  }, [token]);


  return (
    <div className="relative w-full h-[100vh] flex flex-col items-center justify-center dark:decorator">
      <Header content="Verification" caption="Verify your email." />
      {status.state === false && (
        <Alert type="error" className="lg:w-1/3">
          <ShieldAlert /> {status.message}
        </Alert>
      )}

      {status.state === undefined && (
        <div className="flex gap-2">
          <Spinner /> {PENDING.IDENTIFICATION_VERIFYING_TOKEN}
        </div>
      )}

      {status.state === true && (
        <div className="flex gap-2">
          <Spinner /> {PENDING.VERIFICATION_VERIFYING_EMAIL}
        </div>
      )}
    </div>
  );
}
