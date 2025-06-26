import { SaveIcon } from "lucide-react";
import { Textarea } from "./Textarea";
import { useRef, useState } from "react";
import { errorAxios } from "@/lib/errorHandle";
import { useLoading } from "@/providers/LoaderProvider";
import { updateUser } from "@/apis/user";
import { toast } from "sonner";
import { Button } from "./Button";

interface BioComponentProps {
  bio: string;
}

export default function BioComponent({ bio }: BioComponentProps) {
  const [textBio, setTextBio] = useState(bio);
  const prevValue = useRef("");
  const loader = useLoading();

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    const oldValue = prevValue.current;
    if (
      newValue.length === 0 ||
      (newValue.length > oldValue.length && newValue.length <= 500)
    ) {
      setTextBio(newValue);
    } else {
      const cutText = newValue
        .substring(textBio.length)
        .substring(0, 500 - textBio.length);
      setTextBio((prev) => prev + cutText);
    }
  };

  const handleSave = async () => {
    try {
      loader?.setLoading(true);
      if (textBio.trim()) {
        const res = await updateUser({ bio: textBio });
        if (res.success) {
          toast.success(res.message);
        }
      }
    } catch (error) {
      errorAxios(error);
    } finally {
      loader?.setLoading(false);
    }
  };
  return (
    <div className="mt-15 px-4">
      <h2 className="text-primary font-bold text-sm">Add Bio/About</h2>
      <div className="relative">
        <Textarea
          onChange={handleTextChange}
          value={textBio || ""}
          className="px-4 py-1 resize-none bg-foreground/10 my-3 h-20 font-[500] text-sm tracking-wide"
        />
        <span className="absolute bottom-[-1.1rem] left-0 text-xs font-semibold">
          {textBio?.length || 0} / 500
        </span>
      </div>
      <div className="mt-3 flex justify-end">
        <Button onClick={handleSave} className="cursor-pointer dark:text-white">
          <SaveIcon size={16} />
          Save
        </Button>
      </div>
    </div>
  );
}
