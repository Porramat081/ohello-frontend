import { errorAxios } from "@/lib/errorHandle";
import { Input } from "./Input";
import NotifyMessageItem from "./notify-message-item";
import { useLoading } from "@/providers/LoaderProvider";
import { useUser } from "@/providers/UserProvider";
import { useEffect, useState } from "react";
import { getLastMessages } from "@/apis/message";

export default function NotifyBox() {
  const loader = useLoading();
  const { user } = useUser();
  const [lastMessages, setLastMessages] = useState([]);
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
    fetchLastMessage();
  }, [user]);
  return (
    <div className="w-full">
      {/* search chat */}

      <Input placeholder="Enter name or message" className="text-xs py-0" />

      {/* notify chat */}
      <div className="py-2 flex flex-col gap-2">
        {lastMessages.map((item, index) => (
          <NotifyMessageItem key={index} item={item} />
        ))}
      </div>
      {/* notify event */}
    </div>
  );
}
