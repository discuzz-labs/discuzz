import { useMutation } from "@tanstack/react-query";
import sendVerificationEmail from "@/actions/verify/sendVerificationEmail";
import createToken from "@/actions/createToken";

const useVerifyEmailRequest = (email: string | undefined) => {
  return useMutation<void, Error, void>({
    mutationFn: async () => {
      if (!email) {
        throw new Error("Email is required for verification.");
      }

      const token = await createToken({ email });
      await sendVerificationEmail({
        email,
        userName: "",
        token,
      });
    },
  });
};

export default useVerifyEmailRequest;
