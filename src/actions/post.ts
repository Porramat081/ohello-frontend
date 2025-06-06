import { createNewPost } from "@/apis/post";
import {
  ErrorResponse,
  ErrorResponseType,
  genErrorResponse,
} from "@/lib/utils";
import { InitialFormState } from "@/types/action";

export const createNewPostAction = async (
  _prevState: InitialFormState,
  formData: FormData
) => {
  const rawData = {
    content: formData.get("content") as string,
    images: formData.getAll("images") as File[],
  };

  if (!rawData.content.trim() && rawData.images.length === 0) {
    return {
      success: false,
      message: "Please post some content or upload image",
      errors: {
        content: [{ message: "Please post some content" }],
        images: [{ message: "Or please upload some image" }],
      },
    };
  }

  try {
    const result = await createNewPost(rawData);
    return result.success
      ? {
          success: true,
          message: result.message,
        }
      : {
          success: false,
          message: result.message,
          errors: result.error,
          value: rawData,
        };
  } catch (error) {
    return {
      success: false,
      message: genErrorResponse(error as ErrorResponseType, "create new post"),
      errors:
        (error as { response: { data: ErrorResponse } }).response?.data || "",
      value: rawData,
    };
  }
};
