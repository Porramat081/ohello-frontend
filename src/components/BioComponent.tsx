import { Save } from "lucide-react";
import SubmitBtn from "./SubmitBtn";
import { Textarea } from "./Textarea";
import { useRef, useState } from "react";

export default function BioComponent() {
  const [textBio, setTextBio] = useState("");
  const prevValue = useRef("");

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    const oldValue = prevValue.current;
    if (newValue.length > oldValue.length && newValue.length <= 500) {
      setTextBio(newValue);
    } else {
      const cutText = newValue
        .substring(textBio.length)
        .substring(0, 500 - textBio.length);
      setTextBio((prev) => prev + cutText);
    }
  };
  return (
    <div className="mt-15 px-4">
      <h2 className="text-primary font-bold text-sm">Add Bio/About</h2>
      <div className="relative">
        <Textarea
          onChange={handleTextChange}
          value={textBio}
          className="px-4 py-1 resize-none bg-foreground/10 my-3 h-20 font-[500] text-sm tracking-wide"
        />
        <span className="absolute bottom-[-1.1rem] left-0 text-xs font-semibold">
          {textBio.length} / 500
        </span>
      </div>
      <div className="mt-3 flex justify-end">
        <SubmitBtn name="Save" icon={Save} />
      </div>
    </div>
  );
}
