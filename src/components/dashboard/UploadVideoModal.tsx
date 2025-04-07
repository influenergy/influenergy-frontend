"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useUploadPost } from "@/hooks/usePost";
import { toast } from "@/hooks/use-toast";
import { AxiosError } from "axios";

interface UploadVideoModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  onSuccess?: () => void;
}

const UploadVideoModal: React.FC<UploadVideoModalProps> = ({
  isOpen,
  setIsOpen,
  onSuccess,
}) => {
  const uploadPostMutation = useUploadPost();

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    url: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Form errors state
  const [errors, setErrors] = useState<{
    title?: string;
    image?: string;
    url?: string;
  }>({});

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id === "videoTitle" ? "title" : id === "videoLink" ? "url" : id]: value,
    }));
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: "",
      url: "",
    });
    setImageFile(null);
    setErrors({});
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: {
      title?: string;
      image?: string;
      url?: string;
    } = {};

    if (!formData.title) {
      newErrors.title = "Video title is required";
    }

    if (!imageFile) {
      newErrors.image = "Thumbnail image is required";
    }

    if (!formData.url) {
      newErrors.url = "Video URL is required";
    } else if (!/^https?:\/\/[^\s/$.?#].[^\s]*$/.test(formData.url)) {
      newErrors.url = "Please enter a valid URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.match("image.*")) {
        toast({
          title: "Error",
          description: "Please select an image file",
          variant: "destructive",
        });
        e.target.value = "";
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new window.Image();
        img.onload = () => {
          const targetAspectRatio = 9 / 16;
          const margin = 0.02; // 2% margin for aspect ratio comparison
          const currentAspectRatio = img.width / img.height;

          // Check if image is already approximately 9:16
          const isCorrectRatio =
            Math.abs(currentAspectRatio - targetAspectRatio) <= margin;

          if (isCorrectRatio) {
            // If already correct ratio, use original file
            setImageFile(file);
            return;
          }

          // Only convert if not already correct ratio
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          if (!ctx) {
            toast({
              title: "Error",
              description: "Failed to process image",
              variant: "destructive",
            });
            return;
          }

          // Calculate dimensions for 9:16 output
          let outputWidth, outputHeight;

          if (currentAspectRatio > targetAspectRatio) {
            // Original is wider than 9:16 - crop sides
            outputHeight = img.height;
            outputWidth = outputHeight * targetAspectRatio;
          } else {
            // Original is taller than 9:16 - crop top/bottom
            outputWidth = img.width;
            outputHeight = outputWidth / targetAspectRatio;
          }

          // Set canvas dimensions
          canvas.width = outputWidth;
          canvas.height = outputHeight;

          // Calculate source coordinates for centered crop
          const sx = (img.width - outputWidth) / 2;
          const sy = (img.height - outputHeight) / 2;

          // Draw the image centered and cropped to 9:16
          ctx.drawImage(
            img,
            sx,
            sy, // source x, y
            outputWidth,
            outputHeight, // source width, height
            0,
            0, // destination x, y
            outputWidth,
            outputHeight // destination width, height
          );

          // Convert canvas to blob and update state
          canvas.toBlob((blob) => {
            if (blob) {
              const convertedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now(),
              });
              setImageFile(convertedFile);
            }
          }, file.type);
        };

        img.src = event.target?.result as string;
      };

      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const formDataObj = new FormData();
      formDataObj.append("title", formData.title);
      if (imageFile) {
        formDataObj.append("image", imageFile);
      }
      formDataObj.append("url", formData.url);

      await uploadPostMutation.mutateAsync(formDataObj, {
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Video uploaded successfully",
            variant: "default",
          });
          setIsOpen(false);
          resetForm();
          if (onSuccess) onSuccess();
        },
        onError: (error: unknown) => {
          const axiosError = error as AxiosError<{ message?: string }>;
          toast({
            title: "Error",
            description:
              axiosError.response?.data?.message ||
              "Failed to upload video. Please try again.",
            variant: "destructive",
          });
        },
      });
    } catch (error) {
      console.log("error", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) resetForm();
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-start gap-2">
            <Image
              src="/images/icons/video.svg"
              alt=""
              width={20}
              height={20}
            />
            Post Videos
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-4 py-4">
            <div className="flex flex-col justify-start items-start gap-2">
              <Label htmlFor="videoTitle" className="text-left">
                Video Title
              </Label>
              <Input
                id="videoTitle"
                placeholder="Add Your Title"
                className={`font-light ${errors.title ? "border-red-500" : ""}`}
                value={formData.title}
                onChange={handleInputChange}
              />
              {errors.title && (
                <p className="text-red-500 text-xs mt-1">{errors.title}</p>
              )}
            </div>

            <div className="flex flex-col justify-start items-start gap-2">
              <Label htmlFor="thumbnailImage" className="text-right">
                Thumbnail Image (9:16)
              </Label>
              <Input
                id="thumbnailImage"
                placeholder="Upload thumbnail image"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className={`font-light ${errors.image ? "border-red-500" : ""}`}
              />
              {errors.image && (
                <p className="text-red-500 text-xs mt-1">{errors.image}</p>
              )}
            </div>

            <div className="flex flex-col justify-start items-start gap-2">
              <Label htmlFor="videoLink" className="text-right">
                Video url
              </Label>
              <Input
                id="videoLink"
                placeholder="Paste your url here"
                className={`font-light ${errors.url ? "border-red-500" : ""}`}
                value={formData.url}
                onChange={handleInputChange}
              />
              {errors.url && (
                <p className="text-red-500 text-xs mt-1">{errors.url}</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={uploadPostMutation.isPending}>
              {uploadPostMutation.isPending ? "Uploading..." : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UploadVideoModal;
