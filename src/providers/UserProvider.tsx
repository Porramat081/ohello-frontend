"use client";

import { getMe } from "@/apis/user";
import { errorAxios } from "@/lib/errorHandle";
import { UserType } from "@/types/user";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLoading } from "./LoaderProvider";
import { PostType } from "@/types/post";
import { useRouter } from "next/navigation";

const UserContext = createContext<any>(null);

type ActivePostType = true | false | PostType;

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | {} | null>({});
  const [activePost, setActivePost] = useState<ActivePostType>(false);

  const router = useRouter();
  const loader = useLoading();

  const fetchUser = async () => {
    try {
      loader?.setLoading(true);
      const res = await getMe();
      if (res.data) {
        if (res.data.success) {
          setUser(res.data.user);
          if (res.data?.user.status === "Pending") {
            router.replace("/verify");
          }
          return;
        } else {
          setUser(null);
          return;
        }
      }
    } catch (error) {
      errorAxios(error);
    } finally {
      loader?.setLoading(false);
    }
  };

  const clearUser = () => {
    setUser(null);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, clearUser, fetchUser, activePost, setActivePost }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
