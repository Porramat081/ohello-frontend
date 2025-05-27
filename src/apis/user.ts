import axiosInstance from "@/lib/axios";
import { UserType } from "@/types/user";

interface UserSigninInput {
  email: string;
  password: string;
}

export interface UserSignupInput {
  firstName: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const authCheck = async () => {
  const result = await axiosInstance.get("/user/checkCookie");
  return result.data;
};

export const getMe = async () => {
  const result = await axiosInstance.get("/api/user");
  return result;
};

export const userSignin = async (data: UserSigninInput) => {
  const result = await axiosInstance.post("/user/signin", data);
  return result.data;
};

export const userSignUp = async (data: UserSignupInput) => {
  const result = await axiosInstance.post("/api/user/signup", data);
  return result.data;
};
