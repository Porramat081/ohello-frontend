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
import ErrorMessage from "./ErrorMessage";
import SubmitBtn from "./SubmitBtn";
import { Button } from "./Button";
import { Eraser } from "lucide-react";
import { formatDateWithAmPm, genAbbration } from "@/lib/utils";
import { useUser } from "@/providers/UserProvider";
import { createNewPostAction } from "@/actions/post";
import { useLoading } from "@/providers/LoaderProvider";
import { errorAxios } from "@/lib/errorHandle";
import { getComment } from "@/apis/post";
import PostCard from "./PostCard";

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
  const [commemtList, setCommentList] = useState([]);

  const { user } = useUser();
  const loader = useLoading();

  const [content, setContent] = useState("");

  const { errors, formAction, isPending, state, clearErrors } =
    useForm(createNewPostAction);

  const fetchComment = async () => {
    try {
      loader?.setLoading(true);
      const res = await getComment(item.id);
      if (res.posts?.length) {
        setCommentList(res.posts);
      }
    } catch (error) {
      errorAxios(error);
    } finally {
      loader?.setLoading(false);
    }
  };

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

  useEffect(() => {
    fetchComment();
  }, []);

  const handleSubmit = async (formData: FormData) => {
    formData.append("host-post-id", item.id);
    formData.append("content", content);
    return formAction(formData);
  };

  const handleClear = () => {
    clearErrors();
    setContent("");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 overflow-auto">
      <div className="col-span-3">
        <div className="flex justify-between items-center px-3 py-1">
          <div className="flex gap-3 items-center pt-2">
            <Avatar className="size-11 border-1">
              <AvatarImage src={item.author?.profilePicUrl} />
              <AvatarFallback>
                {genAbbration(item.author?.firstName, item.author?.surname)}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
              <span className="text-sm text-center font-medium">
                {item.author?.firstName + " " + item.author?.surname}
              </span>
              <span className="text-xs font-light">
                {item.author?.username}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs font-light">
              {formatDateWithAmPm(item.createdAt, item.updatedAt)}
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
      <div className="col-span-2 mt-2 lg:mt-0 lg:border-l">
        {/* Comment panal */}
        {commemtList.length > 0 ? (
          <>
            {commemtList.map((item, index) => (
              <PostCard item={item} isGuest={isGuest} key={index} />
            ))}
          </>
        ) : (
          <div>
            <h2 className="text-center mt-2">There's no any comment here</h2>
          </div>
        )}

        {/* Comment Input */}

        {user.id && (
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
