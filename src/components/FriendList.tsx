import { useState } from "react";
import FriendCategory from "./FriendCategory";
import FriendTable from "./FriendTable";

export default function FriendList() {
  const [cat, setCat] = useState("Friends");
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4">
      <FriendCategory cat={cat} setCat={setCat} />
      <FriendTable cat={cat} />
    </div>
  );
}
