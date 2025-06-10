import axiosInstance, { axiosInstance2 } from "@/lib/axios";
// import { PostImage } from "@/types/post";

interface PostObjInput {
  content: string;
  images: File[];
  deletedImageIds?: string;
}

export const createNewPost = async (postObj: PostObjInput) => {
  const result = await axiosInstance2.post("/api/post", postObj);
  return result.data;
};

export const getFeedPost = async () => {
  const result = await axiosInstance.get("/api/post/getFeedPosts");
  return result.data;
};

export const editPost = async (postId: string, data: PostObjInput) => {
  const result = await axiosInstance2.patch(
    "/api/post/editPost/" + postId,
    data
  );
  return result.data;
};
