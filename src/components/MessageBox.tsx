import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import { Button } from "./Button";
import { Textarea } from "./Textarea";
import { Send } from "lucide-react";
import { useLoading } from "@/providers/LoaderProvider";
import { errorAxios } from "@/lib/errorHandle";
import { createMessage, getChatByRoomId } from "@/apis/message";
import { formatDateWithAmPm, formatMonthYear, genAbbration } from "@/lib/utils";
import DateHeader from "./messageComponents/DateHeader";
import { useChannel } from "ably/react";

interface MessageBoxProps {
  targetId: string;
  handleChangeRoom: (rid: string) => void;
  userId: string;
  userFullName: string;
  roomId: string;
  setRoomId: (rid: string) => void;
}

export default function MessageBox(props: MessageBoxProps) {
  const [message, setMessage] = useState("");
  const [targetUser, setTargetUser] = useState<any>(null);
  const [recievedMessages, setRecievedMessages] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  const containerRef = useRef<HTMLDivElement>(null);

  const loader = useLoading();

  const fetchChat = async () => {
    try {
      loader?.setLoading(true);
      if (props.targetId) {
        const chats = await getChatByRoomId(props.targetId, page);
        if (chats.id) {
          props.setRoomId(chats.id);
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
    fetchChat();
  }, [props.targetId]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [recievedMessages]);

  const { channel } = useChannel(props.roomId, "message", (receiveMessage) => {
    const receivedObj = JSON.parse(receiveMessage.data);
    setRecievedMessages((prev) => [...prev, receivedObj]);
    channel.publish("notify", receiveMessage.data);
  });

  const handleChangeMessage = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };
  const handleSendMessage = () => {
    if (!message.trim()) {
      return;
    }

    const dateNow = new Date().toString();
    const newMessage = {
      content: message,
      createdAt: dateNow,
      status: "Unread",
      writerId: props.userId,
    };
    const sendMessage = JSON.stringify(newMessage);
    channel.publish("message", sendMessage);
    createMessage(props.roomId, message);
    setMessage(() => "");
  };

  if (!props.roomId || !targetUser) {
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
              userId={props.userId}
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
