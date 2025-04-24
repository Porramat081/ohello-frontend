import { InitialFormState } from "@/types/action";

export const changeProfile = async (
  _prevState: InitialFormState,
  formData: FormData
) => {
  return {
    success: true,
    message: "create comment success",
  };
};
