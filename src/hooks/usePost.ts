import { useMutation, useQuery } from "@tanstack/react-query";
import { postApi } from "@/services/postServices";
import { useAppSelector } from "@/store";
import { useQueryClient } from "@tanstack/react-query";

export const queryKeys = {
  uploadPost: "uploadPost",
  getPost: "getPost",
  addVideo: "addVideo",
  paymentCollect: "paymentCollect",
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
    staleTime: 5000,
    // Disable refetching on window focus
    refetchOnWindowFocus: false,
  });
};

export const useAddVideoUrl = (videoUrl: string, collaborationId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      return await postApi.addVideoUrl(videoUrl, collaborationId);
    },
    onSuccess: () => {
      // Invalidate relevant queries to force a refetch
      queryClient.invalidateQueries({
        queryKey: ["collaborationStatusDetails"],
      });
      queryClient.invalidateQueries({
        queryKey: ["creatorVideos", collaborationId],
      });
    },
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

export const useAcceptOrDeclineCollaboration = (
  collaborationId: string,
  status: string,
  options?: { onSuccess?: () => void }
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      return await postApi.acceptOrDeclineCollaboration(
        collaborationId,
        status
      );
    },
    onSuccess: () => {
      // Invalidate relevant queries to force a refetch
      queryClient.invalidateQueries({
        queryKey: ["collaborationStatusDetails"],
      });

      // Call the onSuccess callback if provided
      if (options?.onSuccess) {
        options.onSuccess();
      }
    },
  });
};



export const useAcceptOrDeclineVideo = ({ onSuccess }: { onSuccess?: () => void }) => {
  return useMutation({
    mutationKey: ["acceptOrDeclineVideo"],
    mutationFn: async ({
      collaborationId,
      videoId,
      status,
      message = "",
    }: {
      collaborationId: string;
      videoId: string;
      status: "Approved" | "Declined" | "Pending";
      message?: string;
    }) => {
      try {
        const response = await postApi.acceptOrDeclineVideo(
          collaborationId,
          videoId,
          status,
          message
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching getCollaborationByStatus :", error);
        throw error;
      }
    },
    onSuccess,
  });
};

