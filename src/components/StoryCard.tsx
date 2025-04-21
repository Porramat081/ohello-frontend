import { StoryType } from "@/types/post";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./Card";
import { Plus } from "lucide-react";
import Image from "next/image";

interface StoryCardProps {
  item?: StoryType;
  isStart?: boolean;
}

export default function StoryCard(props: StoryCardProps) {
  const handleClickCard = () => {
    if (props.isStart) {
      console.log("create new Story");
    }
  };

  return (
    <Card
      onClick={handleClickCard}
      className="w-25 overflow-hidden cursor-pointer h-30 flex flex-col justify-center items-center mx-auto hover:bg-secondary"
    >
      {props.isStart ? (
        <div className="flex flex-col items-center justify-center gap-2">
          <Plus className="size-5 text-primary/50" />
          <span className="text-primary/50 text-xs font-medium">Add Story</span>
        </div>
      ) : (
        <div>
          <Image
            src={props.item?.picUrl || ""}
            alt="story photo"
            className="object-cover"
            width={100}
            height={100}
          />
        </div>
      )}
    </Card>
  );
}
