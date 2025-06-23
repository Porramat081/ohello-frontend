import axiosInstance from "@/lib/axios";

export const getChatRoom = async () => {
  const result = await axiosInstance.get("/api/message/allChatRoom");
  return result.data;
};

export const getChatByRoomId = async (targetId: string) => {
  const result = await axiosInstance.get("/api/message/getChat/" + targetId);
  console.log(result.data);
  return result.data;
};
