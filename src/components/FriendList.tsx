import { useState } from "react";
import FriendCategory from "./FriendCategory";
import FriendTable from "./FriendTable";
import { FriendCatObjType } from "@/types/user";

export default function FriendList() {
  const [cat, setCat] = useState("Suggest Friends");
  const [catCount, setCatCount] = useState<FriendCatObjType>({
    suggestFriend: null,
    yourFriend: null,
    requestFriend: null,
    blockFriend: null,
  });
  const handleSetCatCount = (newObj: FriendCatObjType) => {
    setCatCount((prev) => ({ ...prev, ...newObj }));
  };
  return (
    <div className="grid grid-cols-1">
      <FriendCategory cat={cat} setCat={setCat} />
      <FriendTable cat={cat} handleSetCatCount={handleSetCatCount} />
    </div>
  );
}
