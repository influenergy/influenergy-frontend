import { useMutation, useQuery } from "@tanstack/react-query";
import { postApi } from "@/services/postServices";
import { useAppSelector } from "@/store";

export const queryKeys = {
  uploadPost: "uploadPost",
  getPost: "getPost",
};

export const useGetPost = () => {
  const user = useAppSelector((state) => state.auth.user);

  return useQuery({
    queryKey: [queryKeys.getPost],
    queryFn: async () => {
      try {
        return await postApi.getVideoPost();
      } catch (error) {
        // Log the error but don't retry
        console.error("Error fetching posts:", error);
        throw error;
      }
    },
    // Only enable the query when user's profile is completed
    enabled: !!user?.isProfileCompleted,
    // Disable automatic retries
    retry: false,
    // Add staleTime to prevent frequent refetches
    staleTime: Infinity,
    // Disable refetching on window focus
    refetchOnWindowFocus: false,
  });
};

export const useUploadPost = () => {
  return useMutation({
    mutationKey: [queryKeys.uploadPost],
    mutationFn: async (data: FormData) => {
      return await postApi.uploadVideoPost(data);
    },
  });
};
