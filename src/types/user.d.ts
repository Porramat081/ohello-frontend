export type UserType = {
  id: string;
  email: string;
  profilePicUrl?: string;
  firstName: string;
  surname: string;
  status: "Active" | "Inactive" | "Pending" | "Banned";
};
