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
    <div className="h-full flex flex-col items-center">
      <div className="w-full h-full px-4 sm:px-8 pt-5">
        {/* first section */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
          <p>Edit Profile</p>
          <div className="relative">
            <Image
              src={user?.profileIcon || "https://avatar.iran.liara.run/public/boy"}
              alt="logo"
              width={70}
              height={70}
              className={`w-full h-full object-cover rounded-full ${
                isUploading ? "opacity-50" : ""
              }`}
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
                <svg
                  className="animate-spin h-5 w-5 text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            )}
          </div>
          <DeleteModal />
        </div>

        {/* profile details section */}
        <div className="border w-full mt-10 rounded-xl py-3 px-4 sm:px-7">
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

        {/* Complete Button */}
        {!user?.isProfileCompleted && (
          <>
            <Link
              href="/questionnaire"
              className="w-full flex items-center justify-center"
            >
              <Button className="mt-4 bg-primary text-white border-2 border-primary rounded-lg text-md py-5 px-8 w-full sm:w-2/3 md:w-1/3">
                Complete Profile
              </Button>
            </Link>

            {/* Second Section */}
            <div className="w-full flex flex-col-reverse sm:flex-row items-center justify-between gap-2 sm:gap-4 bg-red-100 border border-red-100 min-h-[64px] rounded-xl px-4 sm:px-6 py-3 mt-8 mb-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 text-center sm:text-left">
                <p className="text-gray-700 font-medium">
                  Complete Your Profile and add all your details
                </p>
              </div>
              <Info size={24} className="text-red-600 shrink-0" />
            </div>
          </>
        )}
      </div>
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </div>
  );
}
