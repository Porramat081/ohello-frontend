"use client";

import { SlidersHorizontal } from "lucide-react";
import { Button } from "./Button";
import { Carousel, CarouselContent, CarouselItem } from "./CardCarousel";
import { Separator } from "./Separator";
import StoryCard from "./StoryCard";
import PostCard from "./PostCard";
import { useState } from "react";
import Modal from "./Modal";
import StoryModal from "./StoryModal";
import { useUser } from "@/providers/UserProvider";

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

const mockPost = [
  {
    id: "agjrojorie5g959498gr95r",
    authorName: "name 1",
    authorID: "@nameOne",
    authorPicture:
      "https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425_1280.png",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit enim ullam magni sequi vitae quisquam molestiae, id et debitis tempora.",
    picUrls: [
      "https://cdn.pixabay.com/photo/2025/04/16/19/05/great-tit-9538381_1280.jpg",
      "https://cdn.pixabay.com/photo/2025/04/14/00/54/chameleon-9532496_1280.jpg",
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    comments: [
      {
        authorName: "comment 1",
        authorID: "@comment1",
        authorPicture:
          "https://cdn.pixabay.com/photo/2014/04/03/10/44/avatar-311292_1280.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    likes: 4,
  },
  {
    id: "agjrojorie5g959498gr95r",
    authorName: "name 1",
    authorID: "@nameOne",
    authorPicture:
      "https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425_1280.png",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit enim ullam magni sequi vitae quisquam molestiae, id et debitis tempora.",
    picUrls: [
      "https://cdn.pixabay.com/photo/2025/04/16/19/05/great-tit-9538381_1280.jpg",
      "https://cdn.pixabay.com/photo/2025/04/14/00/54/chameleon-9532496_1280.jpg",
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    comments: [
      {
        authorName: "comment 1",
        authorID: "@comment1",
        authorPicture:
          "https://cdn.pixabay.com/photo/2014/04/03/10/44/avatar-311292_1280.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    likes: 4,
  },
  {
    id: "agjrojorie5g959498gr95r",
    authorName: "name 1",
    authorID: "@nameOne",
    authorPicture:
      "https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425_1280.png",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit enim ullam magni sequi vitae quisquam molestiae, id et debitis tempora.",
    picUrls: [
      "https://cdn.pixabay.com/photo/2025/04/16/19/05/great-tit-9538381_1280.jpg",
      "https://cdn.pixabay.com/photo/2025/04/14/00/54/chameleon-9532496_1280.jpg",
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    comments: [
      {
        authorName: "comment 1",
        authorID: "@comment1",
        authorPicture:
          "https://cdn.pixabay.com/photo/2014/04/03/10/44/avatar-311292_1280.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    likes: 4,
  },
];

export default function Mainboard() {
  const [openStory, setOpenStory] = useState(false);
  const { user } = useUser();
  return (
    <div>
      <h2 className="text-primary font-extrabold pl-3 pt-1">Home</h2>
      {/* Story Tab */}
      {user && (
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
          {mockPost.map((item, index) => (
            <PostCard key={index} item={item} isGuest={!user} />
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
    </div>
  );
}
