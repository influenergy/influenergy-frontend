import { useMutation, useQuery } from "@tanstack/react-query";
import { postApi } from "@/services/postServices";



export const queryKeys = {
  uploadPost: "uploadPost",
  getPost: "getPost",
};

export const useGetPost = () => {
  return useQuery({
    queryKey: [queryKeys.getPost],
    queryFn: async () => {
      return await postApi.getVideoPost();
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
