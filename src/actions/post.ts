import { createNewPost, editPost } from "@/apis/post";
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
  const postId = formData.get("id") as string;
  const rawData = {
    content: formData.get("content") as string,
    images: formData.getAll("images") as File[],
    hostPostId: (formData.get("host-post-id") as string) || undefined,
  };

  const deletedImageIds = formData.get("deleted-image-ids") as string;
  if (deletedImageIds) {
    (
      rawData as {
        content: string;
        images: File[];
        deletedImageIds: string;
        hostPostId: string | undefined;
      }
    ).deletedImageIds = deletedImageIds;
  }

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
    const result = postId
      ? await editPost(postId, rawData)
      : await createNewPost(rawData);
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

export const editPostAction = async (
  _prevState: InitialFormState,
  formData: FormData
) => {
  const rawData = {
    content: formData.get("content") as string,
    status: formData.get("status") as string,
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
};
