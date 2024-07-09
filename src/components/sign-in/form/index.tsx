import { z } from "zod";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignInFormSchema } from "@/lib/validations/validation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Spinner from "@/components/Spinner";
import { InputForm } from "@/components/InputForm";

interface SignInFormProps {
  formSubmitted: boolean;
  login: () => void;
}

export default function SignInForm({ formSubmitted, login }: SignInFormProps) {
  const form = useForm<z.infer<typeof SignInFormSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(SignInFormSchema),
  });

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(login)}
          className="w-full flex flex-col items-center justify-center gap-5"
        >
          <InputForm<typeof SignInFormSchema>
            form={form}
            name={"email"}
            className="w-1/2"
            onChangeCapture={() => {}}
            type={"email"}
            isPending={formSubmitted}
            placeholder="Email"
          />
          <InputForm<typeof SignInFormSchema>
            form={form}
            name={"password"}
            className="w-1/2"
            onChangeCapture={() => {}}
            type={"password"}
            isPending={formSubmitted}
            placeholder="Password"
          />
        </form>
      </Form>

      <div className="w-full flex items-center flex-col gap-5 mt-5">
        <Button
          disabled={formSubmitted}
          className="w-1/2 flex items-center gap-2"
        >
          {formSubmitted && <Spinner />} Sign In.
        </Button>

        <Link className="font-thin text-xs" href="/recover/password">
          Forget Password!
        </Link>
      </div>
    </>
  );
}
