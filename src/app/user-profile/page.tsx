"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import DeleteModal from "@/components/userProfile/DeleteModal";
import ProfileActions from "@/components/userProfile/ProfileActions";
import { EditProfileModal } from "@/components/userProfile/EditProfileModal";
import { Info, PenLine } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { selectUser, useAppSelector } from "@/store";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/features/authSlice";
import { useToast } from "@/hooks/use-toast";
import { userApi } from "@/services/userServices";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function Page() {
  const user = useAppSelector(selectUser);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type and size
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a JPEG or PNG image",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("photo", file);

      const response = await userApi.updateProfile(formData);
      // console.log("response", response);
      // Update Redux state with new image URL
      dispatch(
        setCredentials({
          user: {
            ...user,
            profileIcon: response.data.profileIcon,
            isProfileCompleted: user?.isProfileCompleted ?? false,
            isEmailVerified: user?.isEmailVerified ?? false,
          },
        })
      );

      toast({
        title: "Success",
        description: "Profile image updated successfully",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center px-4 sm:px-8 py-5 overflow-y-auto">
      <div className="w-full max-w-7xl">
        {/* first section */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
          <p>Edit Profile</p>
          <div className="relative w-[100px] h-[100px]">
            <Image
              src={
                user?.profileIcon || "https://avatar.iran.liara.run/public/boy"
              }
              alt="Profile picture"
              fill
              className={`w-full h-full object-cover rounded-full ${
                isUploading ? "opacity-50" : ""
              }`}
              onError={(e) => {
                // Fallback to default image if S3 image fails to load
                const target = e.target as HTMLImageElement;
                target.src = "https://avatar.iran.liara.run/public/boy";
              }}
              sizes="100px"
              priority
            />
            <ProfileActions />
            <input
              type="file"
              id="image"
              name="image"
              accept="image/png, image/jpeg"
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleImageUpload}
              disabled={isUploading}
            />
            {isUploading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
              </div>
            )}
          </div>
          <DeleteModal />
        </div>

        {/* profile details section */}
        <div className="border w-full mt-8 rounded-xl py-4 px-4 sm:px-7">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0">
            <p>Personal Info</p>
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="flex items-center gap-2 rounded-xl text-md w-full sm:w-auto hover:text-primary transition-colors border py-1 px-3"
            >
              <PenLine size={20} />
              Edit
            </button>
          </div>

          <div className="flex flex-col sm:flex-row justify-start md:justify-between items-start sm:items-center gap-4 mt-4 sm:space-x-5">
            <div className="w-full sm:w-auto">
              <Label className="text-sm font-light">Name</Label>
              <p className="text-lg">{user?.fullName || "Not Available"}</p>
            </div>
            <div className="w-full sm:w-auto">
              <Label className="text-sm font-light">Email</Label>
              <p className="text-lg break-all">
                {user?.email || "Not Available"}
              </p>
            </div>
            {/* <div className="w-full sm:w-auto">
              <p className="text-sm font-light">Phone</p>
              <p className="text-lg">911234567890</p>
            </div> */}
          </div>
        </div>

        {/* Complete Profile Section */}
        {!user?.isProfileCompleted && (
          <div className="w-full mt-8">
            <Link href="/questionnaire" className="w-full flex justify-center">
              <Button className="bg-primary text-white border-2 border-primary rounded-lg text-md py-5 px-8 w-full sm:w-2/3 md:w-1/3">
                Complete Profile
              </Button>
            </Link>

            <div className="w-full flex flex-col-reverse sm:flex-row items-center justify-between gap-2 sm:gap-4 bg-red-100 border border-red-100 min-h-[64px] rounded-xl px-4 sm:px-6 py-3 mt-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 text-center sm:text-left">
                <p className="text-gray-700 font-medium">
                  Complete Your Profile and add all your details
                </p>
              </div>
              <Info size={24} className="text-red-600 shrink-0" />
            </div>
          </div>
        )}
      </div>
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </div>
  );
}
