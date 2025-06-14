import { PostType } from "@/types/post";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import { Button } from "./Button";
import { Bookmark, Heart, MessageSquareText } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "./CardCarousel";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Separator } from "./Separator";
import Modal from "./Modal";
import CommentCard from "./CommentCard";
import { useAuthorize } from "@/hooks/useForm";
import DropdownPostcard from "./DropDownPostCard";
import { useUser } from "@/providers/UserProvider";
import { formatDateWithAmPm } from "@/lib/utils";

interface PostCardProps {
  item: PostType;
  isGuest: boolean;
}

export default function PostCard({ item, isGuest }: PostCardProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const { setActivePost } = useUser();

  const [imageLoading, setImageLoading] = useState(false);

  const { changeRoute } = useAuthorize();

  const [isOpenComment, setIsOpenComment] = useState(false);

  const handleLike = () => {
    changeRoute();
  };

  const startImageLoading = () => {
    setImageLoading(true);
  };

  const stopImageLoading = () => {
    setImageLoading(false);
  };

  const handleEdit = () => {
    setActivePost(item);
  };

  const handleDelete = () => {
    console.log("Delete");
    alert(item.createdAt);
  };

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="flex flex-col w-full">
      {/* PostCard Header */}
      <div className="flex justify-between items-center px-3 py-1">
        <div className="flex gap-3 items-center pt-2">
          <Avatar className="size-11 border-1">
            <AvatarImage src={item.authorPicture} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <span className="text-sm text-center font-medium">
              {item.authorName}
            </span>
            <span className="text-xs font-light">{item.authorID}</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs font-light">
            {formatDateWithAmPm(item.createdAt, item.updatedAt)}
          </span>

          {!isGuest && (
            <DropdownPostcard onEdit={handleEdit} onDelete={handleDelete} />
          )}
        </div>
      </div>
      {/* PostCard Content */}
      <div className="py-2 px-3 text-[1rem] lg:text-[1.2rem] wrap-break-word text-justify">
        {item.content}
      </div>
      {item.images && item.images.length > 0 && (
        <Carousel setApi={setApi}>
          <CarouselContent>
            {item.images?.map((item, index) => (
              <CarouselItem key={index}>
                <div className="relative w-[300px] lg:w-[500px] h-auto aspect-video mx-auto border-1 rounded-lg">
                  {imageLoading ? (
                    <>Loading image ...</>
                  ) : (
                    <Image
                      onLoadStart={startImageLoading}
                      onLoadingComplete={stopImageLoading}
                      className="object-contain"
                      src={item.url}
                      alt="post-image"
                      fill
                    />
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="z-10 text-xs text-center text-white opacity-99 mt-[-1.2rem]">
            {current} / {count}
          </div>
        </Carousel>
      )}
      {/* PostCard Footer */}
      <div className="mt-4 mb-3">
        <div className="flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <Button
              onClick={handleLike}
              variant={"ghost"}
              className="flex items-center p-0 h-auto hover:bg-transparent cursor-pointer">
              <Heart
                className={`text-primary ${!!item.likes && "fill-primary"}`}
              />
              <span className="text-xs">{item.likes || 0}</span>
            </Button>
            <Button
              onClick={() => setIsOpenComment(true)}
              variant={"ghost"}
              className="flex items-center p-0 h-auto hover:bg-transparent cursor-pointer">
              <MessageSquareText />
              <span className="text-xs">
                {item.comments ? item.comments.length : 0}
              </span>
            </Button>
          </div>

          <Button
            variant={"ghost"}
            className="p-0 h-auto hover:bg-transparent hover:cursor-pointer">
            <Bookmark />
          </Button>
        </div>
      </div>
      <Separator />

      <Modal
        title="comment sectoion"
        isOpen={isOpenComment}
        onOpenChange={setIsOpenComment}>
        <CommentCard item={item} onClose={setIsOpenComment} isGuest={isGuest} />
      </Modal>
    </div>
  );
}
