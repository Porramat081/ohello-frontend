import axiosInstance from "@/lib/axios";

export const getFriends = async () => {
  const result = await axiosInstance.get("/api/friend/getFriend");
  return result.data;
};
