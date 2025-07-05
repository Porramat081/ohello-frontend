import { errorAxios } from "@/lib/errorHandle";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import { getFriends } from "@/apis/friend";
import { useEffect, useState } from "react";
import { useLoading } from "@/providers/LoaderProvider";
import { FriendCatObjType } from "@/types/user";
import { formatMonthYear, genAbbration } from "@/lib/utils";
import FriendActiveBtn from "./FriendActiveBtn";

const ListItem = ({ item, cat, fetchListFriend }: any) => {
  return (
    <div className="border-b-1 py-2 px-2 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Avatar
          link={item.friendId || item.id}
          className="border-2 border-primary"
        >
          <AvatarImage src={item.profilePicUrl?.pictureUrl} />
          <AvatarFallback>
            {genAbbration(item.firstName, item.surname)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col text-xs">
          <span>{item.firstName + " " + item.surname}</span>
          <span>{item.username || ""}</span>
        </div>
      </div>

      <div className="text-[0.7rem]">
        {formatMonthYear(item.updatedAt || item.friend?.updatedAt, true)}
      </div>

      <div>
        <FriendActiveBtn
          item={item}
          cat={cat}
          fetchNewFriend={fetchListFriend}
        />
      </div>
    </div>
  );
};

interface FriendTableProps {
  cat: string;
  handleSetCatCount: (newObj: FriendCatObjType) => void;
}

export default function FriendTable({
  cat,
  handleSetCatCount,
}: FriendTableProps) {
  const [listFriend, setListFriend] = useState<any>({});
  const [showList, setShowList] = useState<any[]>([]);

  const loader = useLoading();

  const fetchListFriend = async () => {
    try {
      loader?.setLoading(true);
      const result = await getFriends();
      if (result.success) {
        setListFriend({
          friends: result.friends,
          yourFriend: result.yourFriend,
          yourRequest: result.yourRequest,
          yourReceive: result.yourReceive,
          yourBlock: result.yourBlock,
        });
        handleSetCatCount({
          suggestFriend: result.friends.length,
          yourFriend: result.yourFriend.length,
          requestFriend: [...result.yourRequest, ...result.yourReceive].length,
          blockFriend: result.yourBlock.length,
        });
        setShowList(result.friends);
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

  useEffect(() => {
    if (cat === "Suggest Friends") {
      setShowList(listFriend.friends);
    } else if (cat === "Your Friends") {
      setShowList(listFriend.yourFriend);
    } else if (cat === "Friend Request") {
      setShowList([...listFriend.yourRequest, ...listFriend.yourReceive]);
    } else if (cat === "Block") {
      setShowList(listFriend.yourBlock);
    }
  }, [cat, listFriend]);

  return (
    <div className="col-span-3 pt-2 border-l-1">
      <h2 className="text-primary text-xs font-bold mb-3 px-4">{cat}</h2>
      <div className="">
        {showList?.length > 0 &&
          showList.map((item, index) => (
            <ListItem
              key={index}
              item={item}
              cat={cat}
              fetchListFriend={fetchListFriend}
            />
          ))}
      </div>
    </div>
  );
}
