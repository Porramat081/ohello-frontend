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
  console.log(props.roomList);
  return (
    <div className="flex flex-col lg:border-r-1">
      <div className="my-2 px-2">
        <Input className="w-full" placeholder="search friend" />
      </div>
      <Carousel className="mt-2 px-[1px] pl-2" opts={{ align: "center" }}>
        <CarouselContent className="w-[60px]">
          {props.roomList.map((item, index) => (
            <CarouselItem key={index}>
              <Avatar
                onClick={() => props.handleChangeRoom(item.id)}
                className={`${
                  props.targetId === item.id ? "border-2 border-primary" : ""
                } cursor-pointer`}
              >
                <AvatarImage src={item.profilePicUrl?.pictureUrl} />
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
