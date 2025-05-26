import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export const errorAxios = (error: AxiosError | unknown) => {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      toast.error("Network error or server unreachable");
    } else if (error.code === "ECONNABORTED") {
      toast.error("Request timed out");
    } else {
      toast.error(error.response.data);
    }
  } else {
    toast.error("Unexpected error");
  }
};
