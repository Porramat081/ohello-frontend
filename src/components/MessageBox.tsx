import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import { Button } from "./Button";
import { Textarea } from "./Textarea";
import { Send } from "lucide-react";
import { useLoading } from "@/providers/LoaderProvider";
import { errorAxios } from "@/lib/errorHandle";
import { getChatByRoomId } from "@/apis/message";
import ReceivedMessage from "./messageComponents/ReceivedMessage";
import SenderMessage from "./messageComponents/SenderMessage";
import { formatMonthYear, genAbbration } from "@/lib/utils";

interface MessageBoxProps {
  targetId: string;
  handleChangeRoom: (rid: string) => void;
  userId: string;
}

export default function MessageBox(props: MessageBoxProps) {
  const [message, setMessage] = useState("");
  const [targetUser, setTargetUser] = useState<any>(null);
  const [recievedMessages, setRecievedMessages] = useState<any[]>([]);
  const socketRef = useRef<WebSocket | null>(null);

  const [roomId, setRoomId] = useState("");

  const loader = useLoading();

  const fetchChat = async () => {
    try {
      loader?.setLoading(true);
      if (props.targetId) {
        const chats = await getChatByRoomId(props.targetId);
        if (chats.id) {
          setRoomId(chats.id);
        }
        if (chats.message?.length) {
          setRecievedMessages([...chats.message]);
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
    //ws open
    socketRef.current.onopen = async () => {
      console.log("ws connection open");
    };
    //listen message
    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setRecievedMessages((prev) => [
        ...prev,
        {
          isReceived: data.writerId !== props.userId,
          content: data.message as string,
        },
      ]);
    };
    //connection closed
    socketRef.current.onclose = () => {
      props.handleChangeRoom("");
      setRoomId("");
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
    };
  }, [roomId, props.targetId]);

  const handleChangeMessage = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };
  const handleSendMessage = () => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ message }));
    }
    setRecievedMessages((prev) => [...prev, { content: message }]);
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
            <AvatarImage src={targetUser.profilePicUrl} />
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
              {recievedMessages[recievedMessages.length - 1].updatedAt}
            </span>
          )}
        </div>
      </div>

      {/* message container */}
      <div>
        {/* Array receieved */}
        {recievedMessages.map((item, index) => (
          <div key={index}>
            {item.isReceived || item.writerId === props.targetId ? (
              <ReceivedMessage
                content={item.content}
                createdAt={item.createdAt}
              />
            ) : (
              <SenderMessage
                content={item.content}
                createdAt={item.createdAt}
              />
            )}
          </div>
        ))}

        {/* Message writer box */}
        <div className="p-2 flex flex-col items-end gap-2">
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
