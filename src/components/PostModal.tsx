import { Eraser, Save } from "lucide-react";
import { Button } from "./Button";
import { Textarea } from "./Textarea";
import { useEffect, useState } from "react";
import Form from "next/form";
import PostImageButton from "./PostImageButton";
import { PostStatus, PostType } from "@/types/post";
import { useForm } from "@/hooks/useForm";
import { createNewPostAction } from "@/actions/post";
import WaitingBox from "./WaitBox";
import PostStatusTab from "./PostStatusTab";

interface PostModalProps {
  closeModal: () => void;
  existingPost?: PostType | null;
  fetchNewPost: () => void;
}

export default function PostModal({
  closeModal,
  existingPost,
  fetchNewPost,
}: PostModalProps) {
  const [postImages, setPostImages] = useState<File[]>([]);
  const [deletedImageIds, setDeletedImageIds] = useState<string[]>([]);

  const [postStatus, setPostStatus] = useState<PostStatus>("Public");

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
      fetchNewPost();
      closeModal();
    }
  }, [closeModal, fetchNewPost, state]);

  useEffect(() => {
    if (existingPost?.content) {
      const existContent = document.getElementById("content");
      if (existContent) {
        (existContent as HTMLTextAreaElement).value = existingPost.content;
      }
    }
  }, [existingPost]);

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
      <PostStatusTab value={postStatus} setValue={setPostStatus} />
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
          type="reset">
          <Eraser />
          clear
        </Button>
      </div>
    </Form>
  );
}
