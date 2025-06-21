import { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import { Carousel, CarouselContent, CarouselItem } from "./CardCarousel";
import { Input } from "./Input";
import { genAbbration } from "@/lib/utils";

const friendList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

interface MessageListProps {
  roomId: string;
  handleChangeRoom: (rid: string) => void;
  roomList: any[];
}

export default function MessageList(props: MessageListProps) {
  useEffect(() => {
    if (props.roomList.length > 0) {
      props.handleChangeRoom(props.roomList[0].toString());
    }
    console.log(props.roomList);
  }, [props.roomList]);
  return (
    <div className="flex flex-col lg:border-r-1">
      <div className="my-2 px-2">
        <Input className="w-full" placeholder="search friend" />
      </div>
      <Carousel className="mt-2 px-[1px]" opts={{ align: "center" }}>
        <CarouselContent className="w-[60px]">
          {props.roomList.map((item, index) => (
            <CarouselItem
              key={index}
              // onClick={() => props.handleChangeRoom(item.toString())}
            >
              <Avatar>
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
