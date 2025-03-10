import { api } from "./api";

export const postApi = {
  createAdPost: async (userId: string, data: FormData) => {
    const response = await api.post("/brand/post/create", { userId, data });
    return response.data;
  },
};
