import axiosInstance, { axiosInstance2 } from "@/lib/axios";
import { PostStatus } from "@/types/post";
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

export const getFeedPost = async (typePost: PostStatus) => {
  const result = await axiosInstance.get("/api/post/getFeedPosts/" + typePost);
  return result.data;
};

export const editPost = async (postId: string, data: PostObjInput) => {
  const result = await axiosInstance2.patch(
    "/api/post/editPost/" + postId,
    data
  );
  return result.data;
};

export const getComment = async (postId: string) => {
  const result = await axiosInstance.get("/api/post/getComment/" + postId);
  return result.data;
};

export const likeUnlikePost = async (postId: string) => {
  const result = await axiosInstance.post("/api/post/likePost", { postId });
  return result.data;
};

export const getUserPost = async () => {
  const result = await axiosInstance.get("/api/post/getUserPosts");
  return result.data;
};
