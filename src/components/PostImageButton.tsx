import { Trash2, Upload } from "lucide-react";
import { Button } from "./Button";
import { PostImage } from "@/types/post";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface PostImageButtonProps {
  onImageChange: (images: File[], deletedIds?: string[]) => void;
  existingImages?: PostImage[];
}

export default function PostImageButton({
  onImageChange,
  existingImages = [],
}: PostImageButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([
    ...existingImages.map((item) => item.url),
  ]);
  const [selectedFile, setSelectedFile] = useState<File[]>([]);
  const [existingImageState, setExistingImageState] = useState(existingImages);
  const [deletedImageIds, setDeletedImageIds] = useState<string[]>([]);

  const notifyToParent = useCallback(() => {
    onImageChange(selectedFile, deletedImageIds);
  }, [selectedFile, deletedImageIds, onImageChange]);

  useEffect(() => {
    notifyToParent();
  }, [existingImageState, notifyToParent]);

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    if (imageFiles.length === 0) return;

    const newPreviewUrls = imageFiles.map((file) => URL.createObjectURL(file));

    setPreviewUrls((prev) => [...prev, ...newPreviewUrls]);
    setSelectedFile((prev) => [...prev, ...imageFiles]);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveImage = (index: number, isExisting = false) => {
    if (isExisting) {
      const imageToRemove = existingImageState[index];
      setDeletedImageIds((prev) => [...prev, imageToRemove.id]);
      setExistingImageState(existingImageState.filter((_, i) => i !== index));
    } else {
      URL.revokeObjectURL(previewUrls[index]);
      setPreviewUrls(previewUrls.filter((_, i) => i !== index));
      setSelectedFile(selectedFile.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="border-1 px-2 py-2 rounded-lg shadow-sm">
      <Button
        type="button"
        className="cursor-pointer"
        onClick={triggerFileInput}
      >
        <Upload />
        upload
      </Button>

      <input
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={(event) => handleFileChange(event)}
      />

      {(existingImageState.length > 0 || previewUrls.length > 0) && (
        <div className="p-2 flex gap-1 items-center">
          {existingImageState.map((image, index) => (
            <div
              key={`existing-${index}`}
              className={cn(
                "relative aspect-square group border rounded-md overflow-hidden"
              )}
            >
              <Image
                alt={`post-image-preview ${index + 1}`}
                src={image.url}
                fill
                className="object-cover"
              ></Image>

              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute top-1 right-1 flex items-center gap-1">
                <Button
                  type="button"
                  variant={"destructive"}
                  className="size-6 sm:size-8 rounded-full"
                  onClick={() => handleRemoveImage(index, true)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          ))}

          {previewUrls.map((url, index) => (
            <div
              key={`new-${index}`}
              className={cn(
                "relative aspect-square group border rounded-md overflow-hidden size-20"
              )}
            >
              <Image
                alt={`post-image-preview-${index + 1}`}
                src={url}
                fill
                className="object-cover"
              />

              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute top-1 right-1 flex items-center gap-1">
                <Button
                  type="button"
                  variant={"destructive"}
                  className="size-6 sm:size-8 rounded-full"
                  onClick={() => handleRemoveImage(index)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
