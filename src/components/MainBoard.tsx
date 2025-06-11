"use client";

import { SlidersHorizontal } from "lucide-react";
import { Button } from "./Button";
import { Carousel, CarouselContent, CarouselItem } from "./CardCarousel";
import { Separator } from "./Separator";
import StoryCard from "./StoryCard";
import PostCard from "./PostCard";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import StoryModal from "./StoryModal";
import { useUser } from "@/providers/UserProvider";
import { errorAxios } from "@/lib/errorHandle";
import { getFeedPost } from "@/apis/post";
import { useLoading } from "@/providers/LoaderProvider";
import PostModal from "./PostModal";

const mockStory = [
  {
    author: "name 1",
    picUrl:
      "https://cdn.pixabay.com/photo/2025/04/16/18/22/snow-leopard-9538312_1280.jpg",
  },
  {
    author: "name 2",
    picUrl:
      "https://cdn.pixabay.com/photo/2025/04/16/18/22/snow-leopard-9538312_1280.jpg",
  },
  {
    author: "name 3",
    picUrl:
      "https://cdn.pixabay.com/photo/2025/04/16/18/22/snow-leopard-9538312_1280.jpg",
  },
  {
    author: "name 4",
    picUrl:
      "https://cdn.pixabay.com/photo/2025/04/16/18/22/snow-leopard-9538312_1280.jpg",
  },
  {
    author: "name 5",
    picUrl:
      "https://cdn.pixabay.com/photo/2025/04/16/18/22/snow-leopard-9538312_1280.jpg",
  },
  {
    author: "name 6",
    picUrl:
      "https://cdn.pixabay.com/photo/2025/04/16/18/22/snow-leopard-9538312_1280.jpg",
  },
];

export default function Mainboard() {
  const [openStory, setOpenStory] = useState(false);
  const { user, activePost, setActivePost } = useUser();
  const loader = useLoading();

  const [feedPosts, setFeedPosts] = useState<any[]>([]);

  const fetchFeedPosts = async () => {
    try {
      loader?.setLoading(true);
      const res = await getFeedPost();
      if (res.success && res.posts?.length > 0) {
        setFeedPosts(() => [...res.posts]);
      }
    } catch (error) {
      errorAxios(error);
    } finally {
      loader?.setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedPosts();
  }, [user]);

  return (
    <div>
      <h2 className="text-primary font-extrabold pl-3 pt-1">Home</h2>
      {/* Story Tab */}
      {user && user.status === "Active" && (
        <Carousel className="flex items-center" opts={{ align: "center" }}>
          <CarouselItem
            className="basis-auto pr-3"
            onClick={() => setOpenStory(true)}
          >
            <StoryCard isStart={true} />
          </CarouselItem>
          <CarouselContent className="py-2 pl-3">
            {mockStory.map((item, index) => (
              <CarouselItem className="pr-2 basis-auto" key={index}>
                <StoryCard item={item} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      )}

      {/* Feed tab */}
      <div className="mt-4 relative">
        <div className="flex sticky top-[0.03rem] z-10 items-center justify-between p-2 bg-background">
          <h3 className="font-medium text-sm">All</h3>
          {user && (
            <Button
              variant={"ghost"}
              className="h-auto p-0 cursor-pointer hover:bg-transparent"
            >
              <SlidersHorizontal size={24} />
            </Button>
          )}
        </div>
        <Separator />

        <div className="flex flex-col gap-2">
          {feedPosts.map((item, index) => (
            <PostCard
              key={index}
              item={item}
              isGuest={!user || user.id !== item.authorID}
            />
          ))}
        </div>
      </div>

      <Modal
        title="Story Post"
        description="every post here will be gone in 24 hours"
        isOpen={openStory}
        onOpenChange={setOpenStory}
      >
        <StoryModal />
      </Modal>

      <Modal
        title="Post Something"
        isOpen={!!activePost as boolean}
        onOpenChange={setActivePost}
      >
        <PostModal
          fetchNewPost={fetchFeedPosts}
          existingPost={activePost?.id && activePost}
          closeModal={() => setActivePost(false)}
        />
      </Modal>
    </div>
  );
}
