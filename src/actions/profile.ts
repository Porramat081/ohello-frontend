import { updateUser } from "@/apis/user";
import {
  genErrorResponse,
  ErrorResponseType,
  ErrorResponse,
} from "@/lib/utils";
import { profileShema } from "@/schemas/schemaForm";
import { InitialFormState } from "@/types/action";

export const changeProfile = async (
  _prevState: InitialFormState,
  formData: FormData
) => {
  const rawData = {
    firstName: formData.get("firstName") as string,
    surname: formData.get("surname") as string,
    username: formData.get("username") as string,
    email: formData.get("email") as string,
    oldPassword: formData.get("oldPassword") as string,
    newPassword: formData.get("newPassword") as string,
    confirmPassword: formData.get("confirmPassword") as string,
    defaultValue: formData.get("default-value") as string,
  };
  try {
    const { success, data, error } = profileShema.safeParse(rawData);

    if (!success) {
      return {
        success: false,
        message: "Please enter valid information",
        errors: error?.flatten().fieldErrors,
        value: rawData,
      };
    }

    const [oldEmail, oldFirstName, oldSurname, oldUsername] =
      data.defaultValue.split(" ");

    if (rawData.oldPassword && !rawData.newPassword) {
      return {
        success: false,
        message: "Invalid input format",
        errors: {
          oldPassword: "No need to put it if don't change password",
          newPassword: "Need to put it if want to change password",
        },
      };
    }
    if (
      oldEmail === data.email &&
      oldFirstName === data.firstName &&
      oldSurname === data.surname &&
      (oldUsername === "null"
        ? !data.username
        : oldUsername === data.username) &&
      !rawData.oldPassword
    ) {
      return {
        success: false,
        message: "Nothing change",
        errors: "",
      };
    }

    const result = await updateUser(data);

    return result.success
      ? { success: true, message: result.message }
      : {
          success: false,
          message: result.message,
          errors: result.error,
        };
  } catch (error) {
    return {
      success: false,
      message: genErrorResponse(error as ErrorResponseType, "user sign-up"),
      errors:
        (error as { response: { data: ErrorResponse } }).response?.data || "",
      value: rawData,
    };
  }
};
