"use client";

import { usePathname } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const LoaderContext = createContext<{
  loading: boolean;
  setLoading: (status: boolean) => void;
} | null>(null);

export const useLoading = () => useContext(LoaderContext);

export const LoaderProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(false);
  }, [pathname]);

  return (
    <LoaderContext.Provider value={{ loading, setLoading }}>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="w-12 h-12 border-4 border-t-blue-500 border-white rounded-full animate-spin" />
            <div className="text-muted-foreground text-xl">Loading...</div>
          </div>
        </div>
      )}
      {children}
    </LoaderContext.Provider>
  );
};
