import { formatDateWithAmPm } from "@/lib/utils";

interface SenderMessageProps {
  content: string;
  createdAt?: string;
  status?: string;
  isReceived: boolean;
}

//item.isReceived || item.writerId === props.targetId
export default function SenderMessage(props: SenderMessageProps) {
  return (
    <div
      className={`flex justify-end mt-3 px-2 ${
        props.isReceived && "justify-start"
      }`}
    >
      <div
        className={`inline-block max-w-[300px] text-right ${
          props.isReceived && "text-start"
        }`}
      >
        <div
          className={`break-all bg-secondary rounded-2xl py-2 px-4 inline-block ${
            !props.isReceived && "text-start bg-gray-200!"
          }`}
        >
          {props.content}
        </div>
        <div
          className={`flex gap-2 text-[0.6rem] px-0 ${
            props.isReceived && "pl-2"
          }`}
        >
          <div>
            {props.createdAt &&
              formatDateWithAmPm(
                new Date(props.createdAt),
                new Date(props.createdAt)
              )}
          </div>
          {/* {!props.isReceived && <div>{props.status}</div>} */}
        </div>
      </div>
    </div>
  );
}
