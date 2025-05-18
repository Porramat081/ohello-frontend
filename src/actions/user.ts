import { userSignin } from "@/apis/user";
import { signInSchema } from "@/schemas/schemaForm";
import { InitialFormState } from "@/types/action";

export const createUser = async (
  _prevState: InitialFormState,
  formData: FormData
) => {
  return { success: true, message: "raegrg" };
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
