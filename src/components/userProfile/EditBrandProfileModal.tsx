"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useDispatch } from "react-redux";
import { setCredentials, User } from "@/store/features/authSlice";
import { selectUser, useAppSelector } from "@/store";
import { userApi } from "@/services/userServices";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Create validation schema
const editProfileSchema = yup.object({
  fullName: yup
    .string()
    .matches(/^[A-Za-z\s]+$/, "Name should only contain letters and spaces")
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
});

type FormData = yup.InferType<typeof editProfileSchema>;

export function EditBrandProfileModal({
  isOpen,
  onClose,
}: EditProfileModalProps) {
  const user = useAppSelector(selectUser);
  const { toast } = useToast();
  const dispatch = useDispatch();

  // console.log("user", user);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(editProfileSchema),
    defaultValues: {
      fullName: user?.fullName || "",
    },
  });

  const email = user?.email || "";
  const company = user?.companyName || "";
  const website = user?.companyWebsite || "";

  const onSubmit = async (data: FormData) => {
    if (!user?._id) {
      toast({
        title: "Error",
        description: "User ID not found",
        variant: "destructive",
      });
      return;
    }

    try {
      await userApi.updateBrandProfile(user._id, {
        fullName: data.fullName,
        email,
        companyName: company,
        companyWebsite: website,
      });

      dispatch(
        setCredentials({
          user: {
            ...user,
            fullName: data.fullName,
            isProfileCompleted: user?.isProfileCompleted ?? false,
            isEmailVerified: user?.isEmailVerified ?? false,
          } as User,
        })
      );

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });

      onClose();
    } catch (error) {
      console.log("error", error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    reset({
      fullName: user?.fullName || "",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="fullName" className="text-sm font-medium">
              Full Name <span className="text-red-500">*</span>
            </label>
            <Input
              id="fullName"
              {...register("fullName")}
              placeholder="Enter your full name"
              className={`w-full ${errors.fullName ? "border-red-500" : ""}`}
            />
            {errors.fullName && (
              <p className="text-sm text-red-500 mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              value={email}
              className="w-full text-gray-800"
              disabled
            />
          </div>
          {company && (
            <div className="space-y-2">
              <label htmlFor="company" className="text-sm font-medium">
                Company Name
              </label>
              <Input
                id="company"
                value={company}
                className="w-full text-gray-800"
                disabled
              />
            </div>
          )}
          {website && (
            <div className="space-y-2">
              <label htmlFor="website" className="text-sm font-medium">
                Company Website
              </label>
              <Input
                id="website"
                value={website}
                className="w-full text-gray-800"
                disabled
              />
            </div>
          )}
          <div className="flex justify-between space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isSubmitting}
              className="border-primary text-primary"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
