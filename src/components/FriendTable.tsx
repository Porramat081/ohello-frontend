import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import { Button } from "./Button";

const ListItem = () => {
  return (
    <div className="border-b-1 py-2 px-2 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Avatar className="border-2 border-primary">
          <AvatarImage />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col text-xs">
          <span>John Doe</span>
          <span>@jodoigorh</span>
        </div>
      </div>

      <div>
        <span className="text-xs text-foreground font-semibold">
          Followed wjejoijg;isrtohi
        </span>
      </div>

      <div>
        <Button variant={"outline"} className="text-xs">
          UnFollow
        </Button>
      </div>
    </div>
  );
};

const listFriend = [1, 2, 3];

export default function FriendTable({ cat }: { cat: string }) {
  return (
    <div className="col-span-3 pt-2 border-l-1">
      <h2 className="text-primary text-xs font-bold mb-3 px-4">{cat}</h2>
      <div className="">
        {listFriend.map((item, index) => (
          <ListItem key={index} />
        ))}
      </div>
    </div>
  );
}
