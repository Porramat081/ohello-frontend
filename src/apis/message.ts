import axiosInstance from "@/lib/axios";

export const getChatRoom = async () => {
  const result = await axiosInstance.get("/api/message/allChatRoom");
  return result.data;
};
