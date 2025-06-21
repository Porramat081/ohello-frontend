import { Button } from "./Button";

interface FriendActiveBtnProps {
  cat: string;
  item: {
    firstName: string;
    surname: string;
    youRequest?: boolean;
  };
}

export default function FriendActiveBtn({ cat, item }: FriendActiveBtnProps) {
  const handleClickBtn = () => {
    if (cat === "Suggest Friends") {
      console.log("add friend");
    } else if (cat === "Your Friends") {
      console.log("start chat");
    } else if (cat === "Friend Request") {
      if (item.youRequest) {
        console.log("cancel request");
      } else {
        console.log("accept request");
      }
    } else if (cat === "Block") {
      console.log("cancel block");
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
