interface ReceivedMessageProps {
  content: string;
  createdAt?: string;
  status?: string;
}

export default function ReceivedMessage(props: ReceivedMessageProps) {
  return (
    <div className="px-4 py-2 min-w-[100px] w-[80%] mr-auto">
      <div className="bg-secondary rounded-2xl py-2 px-4">
        <span className="break-all">{props.content}</span>
      </div>
      <div className="flex justify-between text-[0.6rem] px-3">
        <div>{props.createdAt}</div>
      </div>
    </div>
  );
}
