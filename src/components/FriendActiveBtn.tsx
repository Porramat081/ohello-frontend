import { useLoading } from "@/providers/LoaderProvider";
import { Button } from "./Button";
import { acceptFriend, addNewFriend, cancelRequest } from "@/apis/friend";
import { toast } from "sonner";
import { errorAxios } from "@/lib/errorHandle";
import { useRouter } from "next/navigation";

interface FriendActiveBtnProps {
  cat: string;
  item: {
    id?: string;
    friendId?: string;
    firstName: string;
    surname: string;
    youRequest?: boolean;
    sendingFriendId?: string;
  };
  fetchNewFriend: any;
}

export default function FriendActiveBtn({
  cat,
  item,
  fetchNewFriend,
}: FriendActiveBtnProps) {
  const loader = useLoading();
  const router = useRouter();

  const handleClickBtn = async () => {
    try {
      loader?.setLoading(true);
      if (cat === "Suggest Friends" && item.friendId) {
        const res = await addNewFriend(item.friendId);
        if (res.success) {
          toast.success(res.message);
        }
      } else if (cat === "Your Friends") {
        router.push(`/message?f=${item.firstName}&s=${item.surname}`);
      } else if (cat === "Friend Request") {
        if (item.youRequest && item.id) {
          const res = await cancelRequest(item.id, "Pending");
          if (res.success) {
            toast.success(res.message);
          }
        } else if (!item.youRequest && item.sendingFriendId) {
          const res = await acceptFriend(item.sendingFriendId);
          if (res.success) {
            toast.success(res.message);
          }
        }
      } else if (cat === "Block") {
        console.log("cancel block");
      }
      if (cat !== "Your Friends") {
        await fetchNewFriend();
      }
    } catch (error) {
      errorAxios(error);
    } finally {
      loader?.setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleClickBtn}
      variant={"outline"}
      className="text-xs cursor-pointer"
    >
      {cat === "Suggest Friends"
        ? "Add"
        : cat === "Your Friends"
        ? "Chat"
        : cat === "Friend Request"
        ? item.youRequest
          ? "Cancel"
          : "Accept"
        : "Unblock"}
    </Button>
  );
}
