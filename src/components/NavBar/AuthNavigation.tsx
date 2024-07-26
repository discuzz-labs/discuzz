import { Button } from "../ui/button";
import Link from "next/link";
import routes from "@/services/routes";
import { useTranslations } from "next-intl";

export default function AuthNavigation() {
  const t = useTranslations("NavBar");
  return (
    <>
      <Link href={routes.auth.signUp.index.path}>
        <Button className="flex items-center gap-2 dark:bg-white">
          {t("signUpBtn")}
        </Button>
      </Link>
      <Link href={routes.auth.signIn.index.path}>
        <Button variant="ghost" className="flex items-center gap-2">
          {t("signInBtn")}{" "}
        </Button>
      </Link>
    </>
  );
}
