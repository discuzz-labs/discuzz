import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import createToken from "@/actions/createToken";
import sendResetPasswordEmail from "@/actions/verify/password/sendResetPasswordEmail";
import { ResetPasswordFormSchemaFirstStep } from "@/services/schemas";

const useResetPassword = () => {
  return useMutation<
    void,
    Error,
    z.infer<ReturnType<typeof ResetPasswordFormSchemaFirstStep>>
  >({
    mutationFn: async (values) => {
      const token = await createToken({ email: values.email });
      await sendResetPasswordEmail({
        email: values.email,
        userName: "user of Discuzz",
        token,
      });
    },
  });
};

export default useResetPassword;
