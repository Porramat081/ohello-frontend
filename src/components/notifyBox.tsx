import { errorAxios } from "@/lib/errorHandle";
import NotifyMessageItem from "./notify-message-item";
import { useLoading } from "@/providers/LoaderProvider";
import { useEffect, useState } from "react";
import { getLastMessages } from "@/apis/message";
import { AblyProvider, ChannelProvider } from "ably/react";

export default function NotifyBox() {
  const loader = useLoading();
  const [lastMessages, setLastMessages] = useState<any[]>([]);
  const [client, setClient] = useState<any>(null);

  const fetchClient = async () => {
    try {
      if (typeof window !== "undefined") {
        const { Realtime } = await import("ably");
        const res = new Realtime({ key: process.env.NEXT_PUBLIC_ABLY_KEY });
        setClient(res);
      }
    } catch (err) {
      console.log("can not fetch client");
    }
  };

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
    fetchClient();
  }, []);

  return (
    <>
      {client && (
        <AblyProvider client={client}>
          <div className="w-full">
            {/* search chat */}

            {/* <Input placeholder="Enter name or message" className="text-xs py-0" /> */}

            {/* notify chat */}
            <div className="py-2 flex flex-col gap-2">
              {lastMessages
                .sort(
                  (item1: any, item2: any) =>
                    new Date(item2.Message?.createdAt).getTime() -
                    new Date(item1.Message?.createdAt).getTime()
                )
                .map((item, index) => (
                  <ChannelProvider key={index} channelName={item.chatRoomId}>
                    <NotifyMessageItem item={item} />
                  </ChannelProvider>
                ))}
            </div>
            {/* notify event */}
          </div>
        </AblyProvider>
      )}
    </>
  );
}
