import { commentSchema } from "@/schemas/schemaForm";
import { InitialFormState } from "@/types/action";
import { redirect } from "next/navigation";

export const createComment = async (
  _prevState: InitialFormState,
  formData: FormData
) => {
  const postId = formData.get("post-id") as string;
  const content = formData.get("comment-content") as string;

  const { success, data, error } = commentSchema.safeParse({ content });
  if (!success) {
    return {
      success: false,
      message: "Can not create comment",
      errors: error.flatten().fieldErrors,
    };
  }

  const result = {};
  return {
    success: true,
    message: "create comment success",
  };
};
