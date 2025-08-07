"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface NotifyObj {
  writerId: string;
  roomId: string;
}

interface NotifyContextType {
  notifyArr: NotifyObj | null;
  handleAddNotify: (writerId: string, roomId: string) => void;
}

const NotifyContext = createContext<NotifyContextType | null>(null);

export const NotifyProvider = ({ children }: { children: ReactNode }) => {
  const [notifyArr, setNotifyArr] = useState<NotifyObj | null>(null);

  const handleAddNotify = (writerId: string, roomId: string) => {
    console.log("writerId : " + writerId);
    console.log("roomId : " + roomId);
    setNotifyArr(() => ({ writerId, roomId }));
  };

  return (
    <NotifyContext.Provider value={{ notifyArr, handleAddNotify }}>
      {children}
    </NotifyContext.Provider>
  );
};

export const useNotify = () => useContext(NotifyContext);
