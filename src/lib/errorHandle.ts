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
      console.log("Error other axios");
      toast.error("Something went wrong. Please try again later.");
    }
  } else {
    toast.error("Unexpected error");
  }
};
