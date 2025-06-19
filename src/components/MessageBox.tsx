import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import { Button } from "./Button";
import { Textarea } from "./Textarea";
import { Send } from "lucide-react";

interface MessageBoxProps {
  roomId: string;
  handleChangeRoom: (rid: string) => void;
}

export default function MessageBox(props: MessageBoxProps) {
  const [message, setMessage] = useState("");
  const [recievedMessages, setRecievedMessages] = useState<string[]>([]);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!props.roomId) return;
    //ws connection
    socketRef.current = new WebSocket(
      (process.env.NEXT_PUBLIC_WEB_SOCKET || "") +
        "/wsMessage/" +
        `${props.roomId}`
    );
    //ws open
    socketRef.current.onopen = () => {
      console.log("ws connection open");
    };
    //listen message
    socketRef.current.onmessage = (event) => {
      console.log("Message Received : ", event.data);
      setRecievedMessages((prev) => [...prev, event.data as string]);
    };
    //connection closed
    socketRef.current.onclose = () => {
      console.log("WebSocket connection closed");
    };
    //connection error
    socketRef.current.onerror = (error) => {
      props.handleChangeRoom("");
      console.log("WebSocket error : ", error);
    };
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [props.roomId]);

  const handleChangeMessage = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };
  const handleSendMessage = () => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(message);
    }
    setMessage(() => "");
  };
  if (!props.roomId) {
    return <div>Please Select Chat To Start</div>;
  }
  return (
    <div>
      <div className="px-2 flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <Avatar>
            <AvatarImage />
            <AvatarFallback />
          </Avatar>

          <div className="flex flex-col text-xs">
            <span>Username</span>
            <span className="text-[0.6rem]">Friends since July 2023</span>
          </div>
        </div>

        <div className="text-[0.7rem]">
          <span>35 July 2025</span>
        </div>
      </div>

      {/* message container */}
      <div>
        {/* Sender message */}
        <div className="px-4 py-2 min-w-[100px] w-[80%] ml-auto">
          <div className="bg-gray-200 rounded-2xl py-2 px-4">
            <span className="break-all">
              messgjraeopjgiaerjgiojreiogjierjpgoijerigad;sfkgkl;jsdfgkl;j;lksdfjgkljdfgkljage
              content eirgoerpjgoi
            </span>
          </div>
          <div className="flex justify-between text-[0.6rem] px-3">
            <div>sent : 10 July 2025</div>
            <div>read</div>
          </div>
        </div>

        {/* Recieved Message */}
        <div className="px-4 py-2 min-w-[100px] w-[80%] mr-auto">
          <div className="bg-secondary rounded-2xl py-2 px-4">
            <span className="break-all">
              messgjraeopjgiaerjgiojreiogjierjpgoijerigad;sfkgkl;jsdfgkl;j;lksdfjgkljdfgkljage
              content eirgoerpjgoi
            </span>
          </div>
          <div className="flex justify-between text-[0.6rem] px-3">
            <div>recieved : 10 July 2025</div>
          </div>
        </div>

        {/* Array receieved */}
        {recievedMessages.map((item, index) => (
          <div key={index}>{item}</div>
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
