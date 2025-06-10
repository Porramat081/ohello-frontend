import { useState } from "react";

type StatusOption = "Public" | "Private" | "FriendOnly" | "Draft";

export default function PostStatusTab() {
  const [selected, setSelected] = useState<StatusOption | "">("");

  const options: StatusOption[] = ["Public", "Private", "FriendOnly", "Draft"];

  return (
    <div className="w-64">
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value as StatusOption)}
        className="cursor-pointer block w-full rounded-md border-1 border-foreground bg-background px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-sm"
      >
        <option value="" disabled>
          Select your post status
        </option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      {selected && (
        <p className="mt-2 text-sm text-gray-500">You selected: {selected}</p>
      )}
    </div>
  );
}
