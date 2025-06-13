import { errorAxios } from "@/lib/errorHandle";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import { Button } from "./Button";
import { getFriends } from "@/apis/friend";
import { useEffect, useState } from "react";
import { useLoading } from "@/providers/LoaderProvider";

const ListItem = ({ item }: any) => {
  console.log(item);
  return (
    <div className="border-b-1 py-2 px-2 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Avatar className="border-2 border-primary">
          <AvatarImage />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col text-xs">
          <span>{item.firstName + " " + item.surname}</span>
          <span>{item.username || ""}</span>
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

export default function FriendTable({ cat }: { cat: string }) {
  const [listFriend, setListFriend] = useState([]);

  const loader = useLoading();

  const fetchListFriend = async () => {
    try {
      loader?.setLoading(true);
      const result = await getFriends(cat);
      if (result.friends && result.friends.length > 0) {
        setListFriend(result.friends);
      } else {
        setListFriend([]);
      }
    } catch (error) {
      errorAxios(error);
    } finally {
      loader?.setLoading(false);
    }
  };

  useEffect(() => {
    fetchListFriend();
  }, []);

  return (
    <div className="col-span-3 pt-2 border-l-1">
      <h2 className="text-primary text-xs font-bold mb-3 px-4">{cat}</h2>
      <div className="">
        {listFriend.map((item, index) => (
          <ListItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
}
