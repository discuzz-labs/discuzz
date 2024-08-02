import { Button } from "../ui/button";
import Link from "next/link";
import routes from "@/services/routes";
import { useTranslations } from "next-intl";

export default function AuthNavigation() {
  const translate = useTranslations("common.components.NavBar");
  return (
    <>
      <Link href={routes.auth.signUp.index.path}>
        <Button className="flex items-center gap-2 dark:bg-white">
          {translate("signUpBtn")}
        </Button>
      </Link>
      <Link href={routes.auth.signIn.index.path}>
        <Button variant="ghost" className="flex items-center gap-2">
          {translate("signInBtn")}{" "}
        </Button>
      </Link>
    </>
  );
}
