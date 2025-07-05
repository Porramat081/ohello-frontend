"use client";

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
import { PostStatus } from "@/types/post";
import PostStatusTab from "./PostStatusTab";

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
  const [feedStatus, setFeedStatus] = useState<PostStatus>("Public");

  const { user, refreshPost, setRefreshPost } = useUser();

  const loader = useLoading();

  const [feedPosts, setFeedPosts] = useState<any[]>([]);

  const fetchFeedPosts = async () => {
    try {
      loader?.setLoading(true);
      const res = await getFeedPost(feedStatus || "Public");
      if (res.success && res.posts?.length > 0) {
        setFeedPosts(() => [...res.posts]);
      } else {
        setFeedPosts(() => []);
      }
    } catch (error) {
      errorAxios(error);
    } finally {
      loader?.setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedPosts();
  }, [user, feedStatus]);

  useEffect(() => {
    if (refreshPost) {
      fetchFeedPosts();
    }
    setRefreshPost(false);
  }, [refreshPost]);

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
        <div className="sticky top-[0.03rem] z-10">
          <PostStatusTab
            isMain={true}
            value={feedStatus}
            setValue={setFeedStatus}
          />
        </div>
        <Separator />

        <div className="flex flex-col gap-2">
          {feedPosts.length > 0 ? (
            feedPosts.map((item, index) => (
              <PostCard
                key={index}
                item={item}
                isGuest={!user || user.id !== item.authorId}
              />
            ))
          ) : (
            <div className="mt-4 text-center py-2">There's no post here</div>
          )}
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

      {/* <Modal
        title="Post Something"
        isOpen={!!activePost as boolean}
        onOpenChange={setActivePost}
      >
        <PostModal
          fetchNewPost={fetchFeedPosts}
          existingPost={activePost?.id && activePost}
          closeModal={() => setActivePost(false)}
        />
      </Modal> */}
    </div>
  );
}
