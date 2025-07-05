import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import { Button } from "./Button";
import { Textarea } from "./Textarea";
import { Send } from "lucide-react";
import { useLoading } from "@/providers/LoaderProvider";
import { errorAxios } from "@/lib/errorHandle";
import { getChatByRoomId } from "@/apis/message";
import { formatDateWithAmPm, formatMonthYear, genAbbration } from "@/lib/utils";
import DateHeader from "./messageComponents/DateHeader";

interface MessageBoxProps {
  targetId: string;
  handleChangeRoom: (rid: string) => void;
  userId: string;
}

export default function MessageBox(props: MessageBoxProps) {
  const [message, setMessage] = useState("");
  const [targetUser, setTargetUser] = useState<any>(null);
  const [recievedMessages, setRecievedMessages] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const socketRef = useRef<WebSocket | null>(null);
  const notifyRef = useRef<WebSocket | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const [roomId, setRoomId] = useState("");

  const loader = useLoading();

  const fetchChat = async () => {
    try {
      loader?.setLoading(true);
      if (props.targetId) {
        const chats = await getChatByRoomId(props.targetId, page);
        if (chats.id) {
          setRoomId(chats.id);
        }
        if (chats.message?.length) {
          setRecievedMessages((prev) => [...chats.message]);
        } else {
          setRecievedMessages((prev) => []);
        }
        if (chats.targetUser) {
          setTargetUser(chats.targetUser);
        }
      }
    } catch (error) {
      errorAxios(error);
    } finally {
      loader?.setLoading(false);
    }
  };

  useEffect(() => {
    if (!props.targetId) return;

    fetchChat();

    if (!roomId) return;
    //ws connection
    socketRef.current = new WebSocket(
      (process.env.NEXT_PUBLIC_WEB_SOCKET || "") + "/wsMessage/" + `${roomId}`
    );

    //notify connection
    notifyRef.current = new WebSocket(
      (process.env.NEXT_PUBLIC_WEB_SOCKET || "") +
        "/notify/" +
        `${props.targetId}`
    );

    //ws open
    socketRef.current.onopen = async () => {
      console.log("ws connection open");
    };
    //listen message
    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // if (data.read === "reading") {
      //   alert("reading");
      // }

      setRecievedMessages((prev) => [
        ...prev,
        {
          isReceived: data.writerId !== props.userId,
          content: data.message as string,
          createdAt: data.createdAt as string,
        },
      ]);
    };
    //connection closed
    socketRef.current.onclose = () => {
      //setRoomId("");
      console.log("WebSocket connection closed");
    };
    //connection error
    socketRef.current.onerror = (error) => {
      props.handleChangeRoom("");
      setRoomId("");
      console.log("WebSocket error : ", error);
    };
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
      if (notifyRef.current) {
        notifyRef.current.close();
      }
    };
  }, [roomId, props.targetId]);

  // useEffect(() => {
  //   const container = containerRef.current;
  //   const handleScroll = () => {
  //     if (!container) return;
  //     if (container.scrollTop === 0) {
  //       setPage((prev) => prev + 1);
  //       fetchChat();
  //     }
  //   };
  //   if (container) {
  //     container.addEventListener("scroll", handleScroll);
  //   }

  //   return () => {
  //     container?.removeEventListener("scroll", handleScroll);
  //   };
  // }, [fetchChat]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [recievedMessages]);

  const handleChangeMessage = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };
  const handleSendMessage = () => {
    if (!message.trim()) {
      return;
    }
    const dateNow = new Date().toString();
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(
        JSON.stringify({
          message,
          createdAt: dateNow,
          notifyRoom: props.targetId,
        })
      );
    }
    if (notifyRef.current && notifyRef.current.readyState === WebSocket.OPEN) {
      notifyRef.current.send(JSON.stringify({ roomId: roomId }));
    }
    setRecievedMessages((prev) => [
      ...prev,
      { content: message, createdAt: dateNow, status: "Unread" },
    ]);
    setMessage(() => "");
  };
  if (!roomId || !targetUser) {
    return <div>Please Select Chat To Start</div>;
  }

  return (
    <div>
      <div className="px-2 flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <Avatar>
            <AvatarImage src={targetUser.profilePicUrl?.pictureUrl} />
            <AvatarFallback>
              {genAbbration(targetUser.firstName, targetUser.surname)}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col text-xs">
            <span>{targetUser.firstName + " " + targetUser.surname}</span>
            <span className="text-[0.6rem]">
              Friends since{" "}
              {formatMonthYear(targetUser.friendDetail[0]?.createdAt)}
            </span>
          </div>
        </div>

        <div className="text-[0.7rem]">
          {recievedMessages.length > 0 && (
            <span>
              {formatDateWithAmPm(
                recievedMessages[recievedMessages.length - 1].createdAt,
                recievedMessages[recievedMessages.length - 1].createdAt
              )}
            </span>
          )}
        </div>
      </div>

      {/* message container */}
      <div className="p-2">
        <div
          ref={containerRef}
          className="h-[400px] border-1 rounded-md overflow-y-auto pb-3"
        >
          {recievedMessages.length ? (
            <DateHeader
              messageArr={recievedMessages.sort(
                (item1, item2) =>
                  new Date(item1.createdAt).getTime() -
                  new Date(item2.createdAt).getTime()
              )}
              targetId={props.targetId}
            />
          ) : (
            <div className="h-full flex items-center justify-center">
              Empthy Message
            </div>
          )}
        </div>

        {/* Message writer box */}
        <div className="py-2 flex flex-col items-end gap-2">
          <Textarea
            onChange={handleChangeMessage}
            placeholder="Type your message here."
            cols={40}
            value={message}
            className="resize-none min-h-20"
          />
          <Button
            className="cursor-pointer"
            type="button"
            onClick={handleSendMessage}
          >
            <Send size={16} />
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
