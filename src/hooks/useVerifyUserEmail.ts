import { useQuery } from "@tanstack/react-query";
import verifyToken from "@/actions/verifyToken";
import verifyUser from "@/actions/verify/verifyUser";

const useVerifyUserEmail = (token: string) => {
  return useQuery({
    queryKey: ["verifyUserEmail", token],
    queryFn: async () => {
      const email = await verifyToken({ token });
      await verifyUser({ email });
      return email;
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export default useVerifyUserEmail;
