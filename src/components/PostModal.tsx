import { Eraser, Save, Upload } from "lucide-react";
import { Button } from "./Button";
import { Textarea } from "./Textarea";
import { useEffect, useState } from "react";
import { errorAxios } from "@/lib/errorHandle";
import { createNewPost } from "@/apis/post";
import { toast } from "sonner";
import Form from "next/form";
import PostImageButton from "./PostImageButton";
import { PostType } from "@/types/post";
import { useForm } from "@/hooks/useForm";
import { createNewPostAction } from "@/actions/post";
import WaitingBox from "./WaitBox";

interface PostModalProps {
  closeModal: () => void;
  existingPost?: PostType | null;
}

export default function PostModal({
  closeModal,
  existingPost,
}: PostModalProps) {
  const [postImages, setPostImages] = useState<File[]>([]);
  const [deletedImageIds, setDeletedImageIds] = useState<string[]>([]);

  const { errors, formAction, state, isPending, clearErrors } =
    useForm(createNewPostAction);

  const handleSubmitPost = (formData: FormData) => {
    if (postImages.length > 0) {
      postImages.forEach((file) => {
        formData.append("images", file);
      });
    }
    const result = formAction(formData);

    return result;
  };

  useEffect(() => {
    if (state.success) {
      closeModal();
    }
  }, [state]);

  const handleImageChange = (images: File[], deletedIds: string[] = []) => {
    setPostImages(images);
    setDeletedImageIds(deletedIds);
  };
  if (isPending) {
    return (
      <div className="h-50 p-4 flex flex-col items-center justify-center">
        <WaitingBox />
      </div>
    );
  }
  return (
    <Form action={handleSubmitPost} className="flex flex-col gap-3">
      <Textarea
        id="content"
        name="content"
        placeholder="Post something ..."
        className="resize-none h-50 p-4 font-[400] text-sm tracking-wide"
      />
      <PostImageButton
        onImageChange={handleImageChange}
        existingImages={existingPost?.images}
      />
      <div className="flex justify-center gap-2">
        <Button type="submit" className="flex-1 cursor-pointer">
          <Save />
          submit
        </Button>
        <Button
          variant={"outline"}
          className="flex-1 cursor-pointer"
          type="reset"
        >
          <Eraser />
          clear
        </Button>
      </div>
    </Form>
  );
}
