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

const UserContext = createContext<any>(null);

type ActivePostType = true | false | PostType;

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [activePost, setActivePost] = useState<ActivePostType>(false);

  const loader = useLoading();

  const fetchUser = async () => {
    try {
      loader?.setLoading(true);
      const res = await getMe();
      if (res.data?.success) {
        setUser(res.data?.user);
        return;
      }
      console.log("user fetch");
      setUser(null);
    } catch (error) {
      errorAxios(error);
    } finally {
      loader?.setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, fetchUser, activePost, setActivePost }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
