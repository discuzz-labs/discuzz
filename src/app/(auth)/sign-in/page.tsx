import { redirect } from "next/navigation";
import { signIn, auth, providerMap } from "auth";
import { AuthError } from "next-auth";

export default async function SignInPage() {
  return <div className="flex flex-col gap-2">Sign In</div>;
}
