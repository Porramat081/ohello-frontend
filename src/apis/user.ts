import axiosInstance from "@/lib/axios";
import { UserType } from "@/types/user";

interface UserSigninInput {
  email: string;
  password: string;
}

interface UserSignupInput {
  fname: string;
  sname: string;
  email: string;
  password: string;
  conFirmPassword: string;
}

export const authCheck = async () => {
  const result = await axiosInstance.get("/user/checkCookie");
  return result.data;
};

export const getMe = async () => {
  const result = await axiosInstance.get("/user/getMe");
  return result;
};

export const userSignin = async (data: UserSigninInput) => {
  try {
    const result = await axiosInstance.post("/user/signin", data);
    return result.data;
  } catch (error) {
    throw (error as { response: { data: { message: string } } }).response.data
      .message;
  }
};

export const userSignUp = async (data: UserSignupInput) => {};
