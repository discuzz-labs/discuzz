// hooks/useUserInfo.ts
import { useQuery } from "@tanstack/react-query";
import getUserInfo from "@/actions/user/getUserInfo";
import { UserWithCounts } from "@/types/types";

const useUserInfo = (userId: string) => {
  return useQuery<UserWithCounts, Error>({
    queryKey: ["userInfo", userId],
    queryFn: () => getUserInfo({ id: userId }),
  });
};

export default useUserInfo;
