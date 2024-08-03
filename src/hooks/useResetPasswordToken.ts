"use client"

import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import verifyToken from "@/actions/verifyToken";
import resetPassword from "@/actions/verify/password/resetPassword";
import { ResetPasswordFormSchemaSecondStep } from "@/services/schemas";
import { useRouter } from "next/navigation";
import routes from "@/services/routes";

const useResetPasswordToken = (token: string) => {
  const router = useRouter();
  return useMutation<
    void,
    Error,
    z.infer<ReturnType<typeof ResetPasswordFormSchemaSecondStep>>
  >({
    mutationFn: async (
      values: z.infer<ReturnType<typeof ResetPasswordFormSchemaSecondStep>>
    ) => {
      const email = await verifyToken({ token });
      await resetPassword({
        email,
        password: values.newPassword,
      });
    },
    onSuccess: () => {
      router.push(routes.redirects.onAfterResetPassword);
    },
  });
};

export default useResetPasswordToken;
