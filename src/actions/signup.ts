import { InitialFormState } from "@/types/action";

export const createUser = async (
  _prevState: InitialFormState,
  formData: FormData
) => {
  return { success: true, message: "raegrg" };
};
