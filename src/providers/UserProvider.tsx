"use client";

import { getMe } from "@/apis/user";
import { UserType } from "@/types/user";
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

  const fetchUser = async () => {
    const res = await getMe();
    if (res.data) {
      setUser(res.data);
      return;
    }
    setUser(null);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
