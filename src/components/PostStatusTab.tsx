import { PostStatus } from "@/types/post";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./select";

const statusArr = [
  { name: "public", value: "Public" },
  { name: "only friends", value: "FriendOnly" },
  { name: "private", value: "Private" },
  { name: "draft", value: "Draft" },
];

interface PostStatusTabProps {
  value: PostStatus;
  setValue: (newValue: PostStatus) => void;
}

export default function PostStatusTab(props: PostStatusTabProps) {
  return (
    <SelectGroup className="flex items-center">
      <SelectLabel className="text-foreground">Post Status</SelectLabel>
      <Select value={props.value} onValueChange={props.setValue}>
        <SelectTrigger className="w-[200px]">
          <SelectValue>
            {statusArr.find((item) => item.value === props.value)?.name}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {statusArr.map((item, index) => (
            <SelectItem key={index} value={item.value}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </SelectGroup>
  );
}
