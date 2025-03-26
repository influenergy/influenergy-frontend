import { useMutation, useQuery } from "@tanstack/react-query";
import { postApi } from "@/services/postServices";
import { useAppSelector } from "@/store";

export const queryKeys = {
  uploadPost: "uploadPost",
  getPost: "getPost",
  addVideo: "addVideo",
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

export const useAddVideoUrl = (data: string, collaborationId: string) => {
  return useMutation({
    mutationKey: [queryKeys.addVideo, collaborationId],
    mutationFn: async () => {
      return await postApi.addVideoUrl(data, collaborationId);
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
  status: string
) => {
  return useMutation({
    mutationKey: ["acceptOrDeclineCollaboration", collaborationId, status],
    mutationFn: async () => {
      try {
        const response = await postApi.acceptOrDeclineCollaboration(
          collaborationId,
          status
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching getCollaborationByStatus :", error);
        throw error;
      }
    },
  });
};

interface AcceptOrDeclineVideoParams {
  collaborationId: string;
  videoId: string;
  status: string;
  message: string;
  onSuccess?: () => void;
}

export const useAcceptOrDeclineVideo = ({
  collaborationId,
  videoId,
  status,
  message,
  onSuccess,
}: AcceptOrDeclineVideoParams) => {
  return useMutation({
    mutationKey: ["acceptOrDeclineVideo", collaborationId, status],
    mutationFn: async () => {
      try {
        const response = await postApi.acceptOrDeclineVideo(
          collaborationId,
          videoId,
          status,
          message || ""
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
