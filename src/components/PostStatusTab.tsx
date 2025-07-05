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
import { SlidersHorizontal } from "lucide-react";

const statusArr = [
  { name: "public", value: "Public" },
  { name: "only friends", value: "FriendOnly" },
  { name: "private", value: "Private" },
  { name: "draft", value: "Draft" },
];

interface PostStatusTabProps {
  value: PostStatus;
  setValue: (newValue: PostStatus) => void;
  isMain?: boolean;
}

export default function PostStatusTab(props: PostStatusTabProps) {
  return (
    <SelectGroup
      className={`flex items-center ${
        props.isMain && "justify-between p-2 bg-background"
      }`}
    >
      {!props.isMain && (
        <SelectLabel className="text-foreground">Post Status</SelectLabel>
      )}
      {props.isMain && <h3 className="font-medium text-sm">{props.value}</h3>}
      <Select value={props.value} onValueChange={props.setValue}>
        <SelectTrigger
          icon={
            props.isMain && (
              <SlidersHorizontal
                size={20}
                className="cursor-pointer hover:text-muted-foreground"
              />
            )
          }
          className={`w-[200px] cursor-pointer ${props.isMain && "w-auto"}`}
        >
          {!props.isMain && (
            <SelectValue>
              {statusArr.find((item) => item.value === props.value)?.name}
            </SelectValue>
          )}
          {/* {props.isMain && <SlidersHorizontal />} */}
        </SelectTrigger>
        <SelectContent>
          {statusArr.map((item, index) => (
            <SelectItem
              className="cursor-pointer hover:bg-secondary"
              key={index}
              value={item.value}
            >
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </SelectGroup>
  );
}
