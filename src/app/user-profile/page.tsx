/* eslint-disable react-hooks/exhaustive-deps */
"use client";
// import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import DeleteModal from "@/components/userProfile/DeleteModal";
import ProfileActions from "@/components/userProfile/ProfileActions";

import { EditProfileModal } from "@/components/userProfile/EditProfileModal";
import { EditBrandProfileModal } from "@/components/userProfile/EditBrandProfileModal";
import { ChevronsLeft, PenLine, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { selectUser, useAppSelector } from "@/store";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/features/authSlice";
import { useToast } from "@/hooks/use-toast";
import { userApi } from "@/services/userServices";
import { Loader2 } from "lucide-react";
import ProfileInfo from "@/components/profile/ProfileInfo";
import Link from "next/link";
import EditCreatorQuestionnaireModal from "@/components/userProfile/EditCreatorQuestionnaireModal";
// import Link from "next/link";
import { authApi } from "@/services/authServices";
import { useMutation } from "@tanstack/react-query";
import Cropper from 'react-easy-crop'


interface PixelCrop {
  x: number;
  y: number;
  width: number;
  height: number;
}

async function getCroppedImg(imageSrc: string, pixelCrop: PixelCrop): Promise<Blob> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Could not get canvas context");
  }

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image as CanvasImageSource,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error("Failed to create blob"));
      }
    }, "image/jpeg");
  });
}

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = document.createElement('img');
    image.crossOrigin = "anonymous";
    image.src = url;
    image.onload = () => resolve(image);
    image.onerror = (error) => reject(error);
  });
}


export default function Page() {
  const user = useAppSelector(selectUser);
  const userType = useAppSelector((state) => state.auth.userType);

  const dispatch = useDispatch();
  const { toast } = useToast();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isQuestionnaireModalOpen, setIsQuestionnaireModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<PixelCrop | null>(null);
  const [isCropMode, setIsCropMode] = useState(false);
  // Password validation to match backend Joi rules
  const passwordRules = {
    minLen: 6,
    maxLen: 18,
  } as const;


  const passwordCriteria = (pwd: string) => ({
    lengthOk: pwd.length >= passwordRules.minLen && pwd.length <= passwordRules.maxLen,
    hasLower: /[a-z]/.test(pwd),
    hasUpper: /[A-Z]/.test(pwd),
    hasNumber: /\d/.test(pwd),
    hasSpecial: /[!@#$%^&*]/.test(pwd),
  });

  const isPasswordValid = (pwd: string) => {
    const c = passwordCriteria(pwd);
    return c.lengthOk && c.hasLower && c.hasUpper && c.hasNumber && c.hasSpecial;
  };

  const setPasswordMutation = useMutation({
    mutationFn: async () => {
      if (!userType) {
        throw new Error("User type missing");
      }
      return await authApi.setPasswordFromProfile(newPassword, userType!);
    },
    onSuccess: () => {
      dispatch(
        setCredentials({
          user: ({
            ...user,
            isPasswordSet: true,
            isProfileCompleted: user?.isProfileCompleted ?? false,
            isEmailVerified: user?.isEmailVerified ?? false,
            isAccountVerified: user?.isAccountVerified ?? false,
          }),
        })
      );
      setNewPassword("");
      setConfirmPassword("");
      toast({ title: "Password set successfully" });
    },
    onError: (error) => {
      toast({
        title: "Failed to set password",
        description:
          (error as { response?: { data?: { message?: string } } })?.response
            ?.data?.message || "Failed to set password. Please try again.",
        variant: "destructive",
      });
    },
  });

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



  const onCropComplete = useCallback((_croppedArea: unknown, croppedPixels: unknown) => {
    setCroppedAreaPixels(croppedPixels as PixelCrop);
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
      setIsCropMode(true);
    };
    reader.readAsDataURL(file);
  };

  const handleUploadToS3 = async (croppedBlob: Blob) => {
    if (!userType) {
      throw new Error("User type missing");
    }

    const formData = new FormData();
    formData.append("photo", croppedBlob, "profile-image.jpg");

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
  };

  const handleCropSave = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    setIsUploading(true);
    try {
      const croppedBlob: Blob = await getCroppedImg(imageSrc, croppedAreaPixels);
      await handleUploadToS3(croppedBlob);
      setIsCropMode(false);
      setImageSrc(null);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setCroppedAreaPixels(null);
    } catch (err) {
      console.error("Crop error:", err);
      toast({
        title: "Error",
        description: "Failed to upload cropped image",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };



  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center px-4 sm:px-8 py-5 overflow-y-auto dark:bg-background">
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
            {!isCropMode ? (
              <>
                <Image
                  src={user?.profileIcon || "https://avatar.iran.liara.run/public/boy"}
                  alt="Profile picture"
                  fill
                  className={`object-cover rounded-full cursor-pointer transition-opacity ${isUploading ? "opacity-50" : ""}`}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://avatar.iran.liara.run/public/boy";
                  }}
                  sizes="100px"
                  priority
                />

                <ProfileActions className="cursor-pointer" />

                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  className="absolute bottom-1 right-3 w-8 h-8 opacity-0 z-20 cursor-pointer"
                  onChange={handleFileChange}
                  disabled={isUploading}
                />

                {isUploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full">
                    <Loader2 className="h-8 w-8 animate-spin text-violet-400" />
                  </div>
                )}
              </>
            ) : (
              <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Crop Your Profile Image</h3>
                    <p className="text-sm text-gray-600">Drag to position and use the slider to zoom</p>
                  </div>

                  <div className="relative w-full h-80 bg-gray-100 rounded-lg overflow-hidden mb-4">
                    <Cropper
                      image={imageSrc!}
                      crop={crop}
                      zoom={zoom}
                      aspect={3 / 2}
                      cropShape="rect"
                      showGrid={true}
                      style={{
                        containerStyle: {
                          width: "100%",
                          height: "100%",
                          position: "relative"
                        }
                      }}
                      onCropChange={setCrop}
                      onZoomChange={setZoom}
                      onCropComplete={onCropComplete}
                    />
                  </div>

                  {/* Zoom Control */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Zoom: {Math.round(zoom * 100)}%
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="3"
                      step="0.1"
                      value={zoom}
                      onChange={(e) => setZoom(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, #7544DB 0%, #7544DB ${((zoom - 1) / 2) * 100}%, #e5e7eb ${((zoom - 1) / 2) * 100}%, #e5e7eb 100%)`
                      }}
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 justify-end">
                    <button
                      onClick={() => {
                        setIsCropMode(false);
                        setImageSrc(null);
                        setCrop({ x: 0, y: 0 });
                        setZoom(1);
                        setCroppedAreaPixels(null);
                      }}
                      className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 text-sm font-medium hover:bg-gray-300 transition-colors"
                      disabled={isUploading}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleCropSave}
                      className="px-4 py-2 rounded-lg bg-violet-600 text-white text-sm font-medium hover:bg-violet-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isUploading}
                    >
                      {isUploading ? (
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Saving...
                        </div>
                      ) : (
                        "Save & Upload"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* <div className="relative w-[100px] h-[100px]">
            <Image
              src={
                user?.profileIcon || "https://avatar.iran.liara.run/public/boy"
              }
              alt="Profile picture"
              fill
              className={`w-full h-full object-cover rounded-full cursor-pointer ${isUploading ? "opacity-50" : ""
                }`}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://avatar.iran.liara.run/public/boy";
              }}
              sizes="100px"
              priority
              onClick={() => setIsPreviewOpen(true)}
            />
            <ProfileActions className="cusrsor-pointer" />
            <input
              type="file"
              id="image"
              name="image"
              accept="image/png, image/jpeg"
              className="absolute bottom-1 right-3 w-8 h-8 opacity-0 z-20"
              onChange={handleImageUpload}
              disabled={isUploading}
            />
            {isUploading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
              </div>
            )}
          </div> */}
          <DeleteModal />
        </div>
        <div className="flex items-center justify-center my-8">
          {userType === "creator" && (
            <div className="m-0 md:mr-20">
              <button
                className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition duration-200"
                onClick={() => setIsQuestionnaireModalOpen(true)}
              >
                Edit Profile Questionnaire
              </button>
            </div>
          )}
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

        {user && user.isPasswordSet === false && (
          <div className="p-4 border border-yellow-300 bg-yellow-50 rounded-md text-sm text-yellow-800">
            <p className="font-semibold mb-3">🔒 Password Not Set</p>

            <div className="grid gap-3 max-w-md">
              <div className="flex flex-col gap-1">
                <Label className="text-xs">New Password</Label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    className={`w-full border rounded-md px-3 py-2 pr-10 text-black ${newPassword && !isPasswordValid(newPassword) ? "border-red-500" : "border-gray-300"
                      }`}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    aria-label={showNewPassword ? "Hide password" : "Show password"}
                    className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
                    onClick={() => setShowNewPassword((p) => !p)}
                  >
                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {newPassword && (
                  <div className="text-[12px] mt-1 text-gray-700">
                    <p className="mb-1">Password must include:</p>
                    {(() => {
                      const c = passwordCriteria(newPassword);
                      const Item = ({ ok, text }: { ok: boolean; text: string }) => (
                        <div className={`flex items-center gap-2 ${ok ? "text-green-700" : "text-red-600"}`}>
                          <span className={`inline-block w-2 h-2 rounded-full ${ok ? "bg-green-600" : "bg-red-600"}`} />
                          <span>{text}</span>
                        </div>
                      );
                      return (
                        <div className="grid gap-1">
                          <Item ok={c.lengthOk} text="6–18 characters" />
                          <Item ok={c.hasLower} text="one lowercase letter" />
                          <Item ok={c.hasUpper} text="one uppercase letter" />
                          <Item ok={c.hasNumber} text="one number" />
                          <Item ok={c.hasSpecial} text="one special (!@#$%^&*)" />
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <Label className="text-xs">Confirm Password</Label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className={`w-full border rounded-md px-3 py-2 pr-10 text-black ${confirmPassword && newPassword !== confirmPassword ? "border-red-500" : "border-gray-300"
                      }`}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password"
                  />
                  <button
                    type="button"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
                    onClick={() => setShowConfirmPassword((p) => !p)}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {confirmPassword && newPassword && newPassword !== confirmPassword && (
                  <span className="text-[12px] text-red-600">Passwords do not match</span>
                )}
              </div>
              <div>
                <button
                  className="px-4 py-2 bg-purple-600 text-white rounded-md disabled:opacity-60"
                  disabled={
                    setPasswordMutation.isPending ||
                    !newPassword ||
                    !confirmPassword ||
                    newPassword !== confirmPassword || !isPasswordValid(newPassword) ||
                    !userType
                  }
                  onClick={async () => {
                    if (newPassword.length < 6) {
                      toast({
                        title: "Password too short",
                        description: "Password must be at least 6 characters",
                        variant: "destructive",
                      });
                      return;
                    }
                    if (newPassword.length > 18) {
                      toast({
                        title: "Password too long",
                        description: "Password must be 18 characters or fewer",
                        variant: "destructive",
                      });
                      return;
                    }
                    if (!/[a-z]/.test(newPassword)) {
                      toast({ title: "Missing lowercase letter", variant: "destructive" });
                      return;
                    }
                    if (!/[A-Z]/.test(newPassword)) {
                      toast({ title: "Missing uppercase letter", variant: "destructive" });
                      return;
                    }
                    if (!/\d/.test(newPassword)) {
                      toast({ title: "Missing number", variant: "destructive" });
                      return;
                    }
                    if (!/[!@#$%^&*]/.test(newPassword)) {
                      toast({ title: "Missing special character (!@#$%^&*)", variant: "destructive" });
                      return;
                    }
                    if (newPassword !== confirmPassword) {
                      toast({
                        title: "Passwords do not match",
                        variant: "destructive",
                      });
                      return;
                    }
                    await setPasswordMutation.mutateAsync();
                  }}
                >
                  {setPasswordMutation.isPending ? "Setting..." : "Set Password"}
                </button>
              </div>
            </div>
          </div>
        )}


        {/* Complete Profile Section */}
        {/* {user && userType !== null && (
          <ProfileInfo user={user} userType={userType} />
        )} */}
      </div>
      {isPreviewOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          onClick={() => setIsPreviewOpen(false)}
        >
          <div
            className="relative w-full max-w-lg aspect-square"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={user?.profileIcon || "https://avatar.iran.liara.run/public/boy"}
              alt="Profile preview"
              fill
              className="object-contain rounded-lg"
              sizes="(max-width: 768px) 100vw, 512px"
              priority
            />
            <button
              className="absolute -top-3 -right-3 bg-white text-black rounded-full px-3 py-1 shadow"
              onClick={() => setIsPreviewOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
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
      {userType === "creator" && (
        <EditCreatorQuestionnaireModal
          isOpen={isQuestionnaireModalOpen}
          onClose={() => setIsQuestionnaireModalOpen(false)}
        />
      )}
    </div>
  );
}
