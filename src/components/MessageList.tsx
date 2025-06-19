import { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import { Carousel, CarouselContent, CarouselItem } from "./CardCarousel";
import { Input } from "./Input";

const friendList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

interface MessageListProps {
  roomId: string;
  handleChangeRoom: (rid: string) => void;
}

export default function MessageList(props: MessageListProps) {
  useEffect(() => {
    props.handleChangeRoom(friendList[0].toString());
  }, []);
  return (
    <div className="flex flex-col lg:border-r-1">
      <div className="my-2 px-2">
        <Input className="w-full" placeholder="search friend" />
      </div>
      <Carousel className="mt-2 px-[1px]" opts={{ align: "center" }}>
        <CarouselContent className="w-[60px]">
          {friendList.map((item, index) => (
            <CarouselItem
              key={index}
              onClick={() => props.handleChangeRoom(item.toString())}
            >
              <Avatar>
                <AvatarImage />
                <AvatarFallback />
              </Avatar>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
