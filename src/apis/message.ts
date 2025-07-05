import axiosInstance from "@/lib/axios";

export const getChatRoom = async () => {
  const result = await axiosInstance.get("/api/message/allChatRoom");
  return result.data;
};

export const getChatByRoomId = async (targetId: string, page: number) => {
  const result = await axiosInstance.get(
    "/api/message/getChat/" + targetId + "/" + page
  );
  return result.data;
};

export const getLastMessages = async () => {
  const result = await axiosInstance.get("/api/message/lastMessages");
  return result.data;
};
