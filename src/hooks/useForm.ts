import { useRouter } from "next/navigation";
import { useActionState, useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { ActionType, initialFormState } from "../types/action";
import { errorAxios } from "@/lib/errorHandle";
import { useUser } from "@/providers/UserProvider";

export const useForm = (action: ActionType, route?: string) => {
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [state, formAction, isPending] = useActionState(
    action,
    initialFormState
  );

  const router = useRouter();

  useEffect(() => {
    if (!state) return;
    if (state.errors) setErrors(state.errors);
    if (state.message) {
      if (state.success) {
        toast.success(state.message);
        if (route) router.push(route);
      } else {
        //toast.error(state.message);
        errorAxios(state.errors);
      }
    }
  }, [state, route, router]);

  const clearErrors = useCallback(() => setErrors({}), []);

  return { state, errors, formAction, isPending, clearErrors };
};

export const useAuthorize = () => {
  const user = useUser();
  const router = useRouter();

  const existVerify = () => {
    if (user && user?.status !== "Pending") {
      router.replace("/");
      return;
    }
  };

  const changeRoute = () => {
    if (!user) {
      toast.error("Unauthorized , Please login first");
      router.push("/auth/sigin");
      return;
    } else {
      if (user.status === "Pending") {
        toast.error("This account isn't verified yet , Please verify");
        router.push("/verify");
        return;
      } else if (user.status !== "Active") {
        toast.error(
          "This account has already removed , Please create a new account"
        );
        router.replace("/auth/signup");
        return;
      }
    }
  };

  return { changeRoute, existVerify };
};
