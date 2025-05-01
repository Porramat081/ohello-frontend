import { Input } from "./Input";
import NotifyMessageItem from "./notify-message-item";

const mockChat = [
  {
    sender: "johndoe@gamil.com",
    message: [
      {
        sendAt: new Date(),
        readAt: new Date(),
        isRead: false,
        content: "Hellohuohiuhiuhuihuihuihuihiuhnliu",
      },
    ],
  },
  {
    sender: "johndoe@gamil.com",
    message: [
      {
        sendAt: new Date(),
        readAt: new Date(),
        isRead: false,
        content: "Hellohuohiuhiuhuihuihuihuihiuhnliu",
      },
    ],
  },
];

export default function NotifyBox() {
  return (
    <div className="w-full">
      {/* search chat */}

      <Input placeholder="Enter name or message" className="text-xs py-0" />

      {/* notify chat */}
      <div className="py-2 flex flex-col gap-2">
        {mockChat.map((item, index) => (
          <NotifyMessageItem
            key={index}
            sender={item.sender}
            message={item.message}
          />
        ))}
      </div>
      {/* notify event */}
    </div>
  );
}
