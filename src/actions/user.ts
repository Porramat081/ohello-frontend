import { userSignin, userSignUp, UserSignupInput } from "@/apis/user";
import {
  ErrorResponseType,
  genErrorResponse,
  ErrorResponse,
} from "@/lib/utils";
import { signInSchema, signUpSchema } from "@/schemas/schemaForm";
import { InitialFormState } from "@/types/action";

export const createUser = async (
  _prevState: InitialFormState,
  formData: FormData
) => {
  const rawData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirm-password") as string,
    firstName: formData.get("firstname") as string,
    surname: formData.get("surname") as string,
  };
  try {
    const { success, data, error } = signUpSchema.safeParse(rawData);

    if (!success) {
      return {
        success: false,
        message: "Please enter valid information",
        errors: error?.flatten().fieldErrors,
        value: rawData,
      };
    }

    const result = await userSignUp(data);

    return result.success
      ? { success: true, message: result.message }
      : {
          success: false,
          message: result.message,
          errors: result.error,
        };
  } catch (error: ErrorResponseType | unknown) {
    return {
      success: false,
      message: genErrorResponse(error as ErrorResponseType, "user sign-up"),
      errors:
        (error as { response: { data: ErrorResponse } }).response?.data || "",
      value: rawData,
    };
  }
};

export const signinUserAction = async (
  _prevState: InitialFormState,
  formData: FormData
) => {
  const rawData = {
    email: formData.get("email-username") as string,
    password: formData.get("login-password") as string,
  };

  try {
    const { success, data, error } = signInSchema.safeParse(rawData);
    if (!success) {
      return {
        success: false,
        message: "Please enter valid email and password",
        errors: error.flatten().fieldErrors,
      };
    }
    const result = await userSignin(data);

    return result && result.message
      ? {
          success: false,
          message: result.message,
          errors: result.error,
        }
      : {
          success: true,
          message: "Login Success",
        };
  } catch (error) {
    return {
      success: false,
      message: error || "There's an error in user sign-in process.",
      errors: {
        email: [error],
        password: [error],
      },
    };
  }
};
