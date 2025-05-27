"use client";

import { getMe } from "@/apis/user";
import { errorAxios } from "@/lib/errorHandle";
import { UserType } from "@/types/user";
import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const UserContext = createContext<UserType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const router = useRouter();

  const fetchUser = async () => {
    try {
      const res = await getMe();
      if (res.data?.success) {
        setUser(res.data?.user);
        return;
      }
      setUser(null);
    } catch (error) {
      errorAxios(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
