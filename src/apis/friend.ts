import axiosInstance from "@/lib/axios";

export const getFriends = async () => {
  const result = await axiosInstance.get("/api/friend/getFriend");
  return result.data;
};

export const getFriendById = async (targetId: string) => {
  const result = await axiosInstance.get("/api/friend/getFriend/" + targetId);
  return result.data;
};

export const addNewFriend = async (targetId: string) => {
  const result = await axiosInstance.post("/api/friend/addFriend", {
    targetId,
  });
  return result.data;
};

export const cancelRequest = async (friendId: string, typeDelete: string) => {
  const result = await axiosInstance.delete(
    "/api/friend/cancelFriend/" + friendId + "/" + typeDelete
  );
  return result.data;
};

export const acceptFriend = async (friendId: String) => {
  const result = await axiosInstance.patch("/api/friend/acceptFriend", {
    friendId,
  });
  return result.data;
};
