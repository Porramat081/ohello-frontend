import Moveable from "react-moveable";
import PhotoEditor from "./PhotoEditor";

export default function StoryModal() {
  return (
    <div className="h-[320px] w-[245px] rounded-2xl overflow-hidden mx-auto">
      <PhotoEditor
        photoSrc="https://cdn.pixabay.com/photo/2025/04/17/23/16/ai-generated-9541375_1280.jpg"
        photoAlt="photo-alt"
      />
    </div>
  );
}
