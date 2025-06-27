/* eslint-disable react-hooks/exhaustive-deps */
"use client";
// import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import DeleteModal from "@/components/userProfile/DeleteModal";
import ProfileActions from "@/components/userProfile/ProfileActions";
import { EditProfileModal } from "@/components/userProfile/EditProfileModal";
import { EditBrandProfileModal } from "@/components/userProfile/EditBrandProfileModal";
import { ChevronsLeft, PenLine } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { selectUser, useAppSelector } from "@/store";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/features/authSlice";
import { useToast } from "@/hooks/use-toast";
import { userApi } from "@/services/userServices";
import { Loader2 } from "lucide-react";
import ProfileInfo from "@/components/profile/ProfileInfo";
import Link from "next/link";
// import Link from "next/link";

export default function Page() {
  const user = useAppSelector(selectUser);
  const userType = useAppSelector((state) => state.auth.userType);

  const dispatch = useDispatch();
  const { toast } = useToast();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fetchAccountDetails = async () => {
    if (!userType) return;

    const response = await userApi.getProfileDetails(userType);
    dispatch(
      setCredentials({
        user: {
          ...user,
          profileIcon: response.data.profileIcon,
          isProfileCompleted: user?.isProfileCompleted ?? false,
          isEmailVerified: user?.isEmailVerified ?? false,
          isAccountVerified: response.data.isAccountVerified ?? false,
        },
      })
    );
  };
  useEffect(() => {
    fetchAccountDetails();
  }, []);

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
      if (!userType) {
        return;
      }

      const response = await userApi.updateProfile(formData, userType);

      dispatch(
        setCredentials({
          user: {
            ...user,
            profileIcon: response.data.profileIcon,
            isProfileCompleted: user?.isProfileCompleted ?? false,
            isEmailVerified: user?.isEmailVerified ?? false,
            isAccountVerified: response.data.isAccountVerified ?? false,
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
        <div className="flex justify-start">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-gray-400 underline"
          >
            <ChevronsLeft />
            Back
          </Link>
        </div>
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4 mt-3">
          <p className="hidden md:block">Edit Profile</p>
          <div className="relative w-[100px] h-[100px]">
            <Image
              src={
                user?.profileIcon || "https://avatar.iran.liara.run/public/boy"
              }
              alt="Profile picture"
              fill
              className={`w-full h-full object-cover rounded-full ${isUploading ? "opacity-50" : ""
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
        <div className="border mt-8 rounded-xl py-4 px-4 sm:px-7">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0">
            <p>Personal Info</p>
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="flex items-center gap-2 rounded-xl text-md w-fit hover:text-primary transition-colors border py-1 px-3"
            >
              <PenLine size={20} />
              Edit
            </button>
          </div>

          <div className="flex flex-col flex-wrap sm:flex-row justify-start md:justify-between items-start sm:items-center gap-4 mt-4">
            {userType == "creator" ? (
              <>
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
              </>
            ) : (
              <>
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
                <div className="w-full sm:w-auto">
                  <Label className="text-sm font-light">Company Name</Label>
                  <p className="text-lg break-all">
                    {user?.companyName || "Not Available"}
                  </p>
                </div>
                <div className="w-full sm:w-auto">
                  <Label className="text-sm font-light">Website</Label>
                  <p className="text-lg break-all">
                    {user?.companyWebsite || "Not Available"}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Complete Profile Section */}
        {user && userType !== null && (
          <ProfileInfo user={user} userType={userType} />
        )}
      </div>
      {userType == "brand" ? (
        <EditBrandProfileModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        />
      ) : (
        <EditProfileModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
}
