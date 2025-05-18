enum UserStatus {
  Active,
  Inactive,
  Pending,
  Banned,
}

export type UserType = {
  id: string;
  email: string;
  profilePicUrl?: string;
  firstName: string;
  surname: string;
  status: UserStatus;
};
