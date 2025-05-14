import { Eraser, Save, Upload } from "lucide-react";
import { Button } from "./Button";
import { Textarea } from "./Textarea";
import { useState } from "react";

export default function PostModal() {
  const [postContent, setPostContent] = useState("");
  return (
    <div className="flex flex-col gap-3">
      <Textarea
        onChange={(e) => setPostContent(e.target.value)}
        value={postContent}
        className="resize-none h-50 p-4 font-[400] text-sm tracking-wide"
      />
      <div className="border-1 px-2 py-2 rounded-lg shadow-sm">
        <Button className="cursor-pointer">
          <Upload />
          upload
        </Button>
      </div>
      <div className="flex justify-center gap-2">
        <Button className="flex-1 cursor-pointer">
          <Save />
          submit
        </Button>
        <Button
          variant={"outline"}
          className="flex-1 cursor-pointer"
          onClick={() => setPostContent("")}
        >
          <Eraser />
          clear
        </Button>
      </div>
    </div>
  );
}
