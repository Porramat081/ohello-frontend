import { PostType } from "@/types/post";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "./CardCarousel";
import Image from "next/image";
import Form from "next/form";
import { useEffect, useState } from "react";
import { Textarea } from "./Textarea";
import { useForm } from "@/hooks/useForm";
import { createComment } from "@/actions/comment";
import ErrorMessage from "./ErrorMessage";
import SubmitBtn from "./SubmitBtn";
import { Button } from "./Button";
import { Eraser } from "lucide-react";

interface CommentCardProps {
  item: PostType;
  onClose: (status: boolean) => void;
  isGuest: boolean;
}

export default function CommentCard({
  item,
  onClose,
  isGuest,
}: CommentCardProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const [content, setContent] = useState("");

  const { errors, formAction, isPending, state, clearErrors } =
    useForm(createComment);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  useEffect(() => {
    if (state.success) {
      onClose(false);
    }
  }, [state, onClose]);

  const handleSubmit = async (formData: FormData) => {
    formData.append("post-id", item.id);
    formData.append("comment-content", content);
    return formAction(formData);
  };

  const handleClear = () => {
    clearErrors();
    setContent("");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 overflow-auto">
      <div className="col-span-2">
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
              {item.createdAt.toLocaleString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
        <div className="py-2 px-3 text-[0.8rem] sm:text-[1rem] md:text-[1.2rem] wrap-break-word text-justify">
          {item.content}
        </div>
        {item.picUrls && item.picUrls.length > 0 && (
          <Carousel setApi={setApi}>
            <CarouselContent>
              {item.picUrls.map((item, index) => (
                <CarouselItem key={index}>
                  <div className="relative w-full aspect-video">
                    <Image
                      className="object-contain"
                      src={item}
                      alt="post-image"
                      fill
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="z-10 text-xs text-center text-white opacity-99 mt-[-1.2rem]">
              {current} / {count}
            </div>
          </Carousel>
        )}
      </div>
      <div className="col-span-1 mt-2 lg:mt-0 lg:border-l">
        {/* Comment panal */}
        <div>
          <h2 className="text-center mt-2">There's no any comment here</h2>
        </div>

        {/* Comment Input */}

        {!isGuest && (
          <div className="mt-4 px-4">
            <Form action={handleSubmit} onChange={clearErrors}>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="say something to this post ..."
                className="resize-none placeholder:text-foreground/50"
              />
              {errors.content && <ErrorMessage error={errors.content[0]} />}
              <div className="mt-3 flex items-center justify-end gap-2">
                <SubmitBtn name="Post Comment" pending={isPending} />
                <Button
                  onClick={handleClear}
                  type="button"
                  className="cursor-pointer bg-red-400 text-primary-foreground"
                >
                  <Eraser size={16} />
                  Clear
                </Button>
              </div>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
}
