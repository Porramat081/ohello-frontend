import axiosInstance from "@/lib/axios";

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
  return result.data;
};

export const userSignin = async (data: UserSigninInput) => {
  const result = await axiosInstance.post("/api/user/signin", data);
  return result.data;
};

export const userSignUp = async (data: UserSignupInput) => {
  const result = await axiosInstance.post("/api/user/signup", data);
  return result.data;
};

export const userSignOut = async () => {
  const result = await axiosInstance.get("/api/user/signout");
  return result.data;
};

export const userGetTimeVerify = async () => {
  const result = await axiosInstance.get("/api/user/getTimeVerify");
  return result.data;
};

export const userResendCodeVerify = async () => {
  const result = await axiosInstance.get("/api/user/resendVerify");
  return result.data;
};

export const verifyUser = async (verifyCode: string) => {
  const result = await axiosInstance.post("/api/user/verifyUser", {
    verifyCode,
  });
  return result.data;
};
