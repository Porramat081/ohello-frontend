import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export const errorAxios = (error: AxiosError | unknown) => {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      toast.error("Network error or server unreachable");
    } else if (error.code === "ECONNABORTED") {
      toast.error("Request timed out");
    } else if (error.status === 404 && error.code === "ERR_BAD_REQUEST") {
      toast.error(
        "Invalid request. Please check your connection and try again."
      );
    } else {
      toast.error("Something went wrong. Please try again later.");
    }
  } else if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: string }).code === "NOT_FOUND"
  ) {
    toast.error("Request is not correct , Please check again later");
  } else {
    toast.error("Unexpected error");
  }
};
