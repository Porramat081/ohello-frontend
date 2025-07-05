import { formatMonthYear } from "@/lib/utils";
import SenderMessage from "./SenderMessage";

interface DateHeaderProps {
  messageArr: any[];
  targetId: string;
}

function groupByDay(arr: any[]) {
  const groups = new Map();

  for (const item of arr) {
    const key = formatMonthYear(item.createdAt, true);
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key).push(item);
  }

  console.log(Array.from(groups.values()));

  return Array.from(groups.values());
}

export default function DateHeader(props: DateHeaderProps) {
  return (
    <div>
      {groupByDay(props.messageArr).map((item, index) => (
        <div key={index}>
          <div className="text-center mt-2">
            {formatMonthYear(item[0].createdAt, true)}
          </div>
          {item.map((item2: any, index2: number) => (
            <SenderMessage
              status={item2.status}
              createdAt={item2.createdAt}
              content={item2.content}
              isReceived={item2.isReceived || item2.writerId === props.targetId}
              key={index + " " + index2}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
