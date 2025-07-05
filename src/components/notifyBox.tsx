import { errorAxios } from "@/lib/errorHandle";
import { Input } from "./Input";
import NotifyMessageItem from "./notify-message-item";
import { useLoading } from "@/providers/LoaderProvider";
import { useUser } from "@/providers/UserProvider";
import { useEffect, useRef, useState } from "react";
import { getLastMessages } from "@/apis/message";

export default function NotifyBox() {
  const loader = useLoading();
  const { user } = useUser();
  const [lastMessages, setLastMessages] = useState([]);

  const socketRef = useRef<WebSocket | null>(null);

  const fetchLastMessage = async () => {
    try {
      loader?.setLoading(true);
      const res = await getLastMessages();
      if (res.success) {
        setLastMessages(res.lastMessages);
      } else {
        setLastMessages([]);
      }
    } catch (error) {
      errorAxios(error);
    } finally {
      loader?.setLoading(false);
    }
  };
  useEffect(() => {
    socketRef.current = new WebSocket(
      (process.env.NEXT_PUBLIC_WEB_SOCKET || "") + "/notify/" + user.id
    );
    socketRef.current.onopen = async () => {
      await fetchLastMessage();
      console.log("notify connection open");
    };
    socketRef.current.onmessage = async (event) => {
      const data = JSON.parse(event.data);
      await fetchLastMessage();
    };
    socketRef.current.onclose = () => {
      console.log("notify connection closed");
    };
    socketRef.current.onerror = (error) => {
      console.log("notify error : ", error);
    };
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [user]);
  return (
    <div className="w-full">
      {/* search chat */}

      <Input placeholder="Enter name or message" className="text-xs py-0" />

      {/* notify chat */}
      <div className="py-2 flex flex-col gap-2">
        {lastMessages
          .sort(
            (item1: any, item2: any) =>
              new Date(item2.Message?.createdAt).getTime() -
              new Date(item1.Message?.createdAt).getTime()
          )
          .map((item, index) => (
            <NotifyMessageItem key={index} item={item} />
          ))}
      </div>
      {/* notify event */}
    </div>
  );
}
