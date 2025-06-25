export type UserType = {
  id: string;
  email: string;
  profilePicUrl?: string;
  profileCoverUrl?: string;
  username?: string;
  firstName: string;
  surname: string;
  status: "Active" | "Inactive" | "Pending" | "Banned";
};

export type FriendCatObjType = {
  suggestFriend: number | null;
  yourFriend: number | null;
  requestFriend: number | null;
  blockFriend: number | null;
};

export type FriendListObjType = {};

export type UpdateUserType = {
  profilePicUrl?: File;
  profileCoverUrl?: File;
  username?: string;
  firstName?: string;
  surname?: string;
  bio?: string;
};
