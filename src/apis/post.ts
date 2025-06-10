import axiosInstance, { axiosInstance2 } from "@/lib/axios";

interface PostObjInput {
  content: string;
  images: File[];
}

export const createNewPost = async (postObj: PostObjInput) => {
  const result = await axiosInstance2.post("/api/post", postObj);
  return result.data;
};

export const getFeedPost = async () => {
  const result = await axiosInstance.get("/api/post/getFeedPosts");
  return result.data;
};

export const editPost = async () => {
  const result = await axiosInstance.patch("/api/post/editPost");
  return result.data;
};
