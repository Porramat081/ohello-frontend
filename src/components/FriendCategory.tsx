import { FriendCatObjType } from "@/types/user";
import { Button } from "./Button";

interface FriendCategoryProps {
  cat: string;
  catCount: FriendCatObjType;
  setCat: (cat: string) => void;
}

const mockCat = ["Suggest Friends", "Your Friends", "Friend Request", "Block"];

export default function FriendCategory(props: FriendCategoryProps) {
  const handleClick = (cat: string) => {
    if (cat !== props.cat) {
      props.setCat(cat);
    }
  };
  return (
    <div className="flex justify-between">
      {mockCat.map((item, index) => (
        <Button
          key={index}
          onClick={() => handleClick(item)}
          variant={item !== props.cat ? "outline" : "secondary"}
          className="cursor-pointer rounded-none flex flex-col py-6 gap-0 items-start border-b-1 w-full"
        >
          <h3 className="text-[0.7rem] font-semibold text-primary">{item}</h3>
          <div className="text-[0.6rem] font-semibold text-muted-foreground">
            {item === "Suggest Friends"
              ? props.catCount.suggestFriend
              : item === "Your Friends"
              ? props.catCount.yourFriend
              : item === "Friend Request"
              ? props.catCount.requestFriend
              : props.catCount.blockFriend}
          </div>
        </Button>
      ))}
    </div>
  );
}
