import axiosInstance from "@/lib/axios";

export const getFriends = async () => {
  const result = await axiosInstance.get("/api/friend/getFriend");
  return result.data;
};

export const getFriendById = async (targetId: string) => {
  const result = await axiosInstance.get("/api/friend/getFriend/" + targetId);
  return result.data;
};
