import { Button } from "./Button";

interface FriendCategoryProps {
  cat: string;
  setCat: (cat: string) => void;
}

const mockCat = ["Friends", "Close Friends", "Following", "Follwers"];

export default function FriendCategory(props: FriendCategoryProps) {
  const handleClick = (cat: string) => {
    props.setCat(cat);
  };
  return (
    <div className="flex justify-between lg:justify-start lg:flex-col">
      {mockCat.map((item, index) => (
        <Button
          key={index}
          onClick={() => handleClick(item)}
          variant={"ghost"}
          className="cursor-pointer rounded-none flex flex-col py-6 gap-0 items-start border-b-1 w-full"
        >
          <h3 className="text-[0.7rem] font-semibold text-primary">{item}</h3>
          <div className="text-[0.6rem] font-semibold text-muted-foreground">
            {11}
          </div>
        </Button>
      ))}
    </div>
  );
}
