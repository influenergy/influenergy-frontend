import { userApi } from "@/services/userServices";
import { useAppSelector } from "@/store";
import { useQuery } from "@tanstack/react-query";

export const queryKeys = {
  userDetails: "userDetails",
};

export const useUserDetails = () => {
  const userType = useAppSelector((state) => state.auth.userType);

  return useQuery({
    queryKey: [queryKeys.userDetails],
    queryFn: async () => {
      if (!userType) throw new Error("User type is not defined");
      return await userApi.getProfileDetails(userType);
    },
    enabled: !!userType, // only runs if userType exists
    retry: false, // disables retry on failure
    staleTime: 5000, // prevents refetching within 5 seconds
    refetchOnWindowFocus: false, // disables refetch on window focus
  });
};
