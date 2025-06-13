import axiosInstance from "@/lib/axios";

export const getFriends = async (cat: string) => {
  const result = await axiosInstance.get("/api/friend/getFriend/" + cat);
  return result.data;
};
