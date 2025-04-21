"use client";

import { Carousel, CarouselContent, CarouselItem } from "./CardCarousel";
import StoryCard from "./StoryCard";

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
  return (
    <div className="bg-red-300">
      <h2 className="text-primary font-extrabold pl-3 pt-1">Home</h2>
      {/* Story Tab */}
      <Carousel className="flex items-center" opts={{ align: "center" }}>
        <CarouselItem className="basis-auto pr-3">
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
    </div>
  );
}
