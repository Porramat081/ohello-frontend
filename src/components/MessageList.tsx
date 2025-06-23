import { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import { Carousel, CarouselContent, CarouselItem } from "./CardCarousel";
import { Input } from "./Input";
import { genAbbration } from "@/lib/utils";

interface MessageListProps {
  targetId: string;
  handleChangeRoom: (rid: string) => void;
  roomList: any[];
}

export default function MessageList(props: MessageListProps) {
  useEffect(() => {
    if (props.roomList.length > 0) {
      props.handleChangeRoom(props.roomList[0]?.id);
    }
  }, [props.roomList]);
  return (
    <div className="flex flex-col lg:border-r-1">
      <div className="my-2 px-2">
        <Input className="w-full" placeholder="search friend" />
      </div>
      <Carousel className="mt-2 px-[1px] pl-2" opts={{ align: "center" }}>
        <CarouselContent className="w-[60px]">
          {props.roomList.map((item, index) => (
            <CarouselItem
              key={index}
              onClick={() => props.handleChangeRoom(item.id)}
            >
              <Avatar
                className={`${
                  props.targetId === item.id ? "border-2 border-primary" : ""
                } cursor-pointer`}
              >
                <AvatarImage src={item.profilePicUrl} />
                <AvatarFallback>
                  {genAbbration(item.firstName, item.surname)}
                </AvatarFallback>
              </Avatar>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
