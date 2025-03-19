"use client";
import { useState } from "react";
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

export function EditProfileModal({ isOpen, onClose }: EditProfileModalProps) {
  const user = useAppSelector(selectUser);
  const userType = useAppSelector((state) => state.auth.userType);

  const [name, setName] = useState(user?.fullName || "");
  const [email, setEmail] = useState(user?.email || "test");
  const [isLoading, setIsLoading] = useState(false);
  const [nameError, setNameError] = useState("");
  const { toast } = useToast();
  const dispatch = useDispatch();

  // Name validation function - only allow letters and spaces
  const validateName = (value: string) => {
    if (!value) {
      setNameError("Name is required");
      return false;
    }

    // Regex to check for alphabetic characters and spaces only
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(value)) {
      setNameError("Name should only contain letters and spaces");
      return false;
    }

    if (value.length < 2) {
      setNameError("Name must be at least 2 characters");
      return false;
    }

    setNameError("");
    return true;
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    validateName(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate before submission
    if (!validateName(name)) {
      return;
    }
    if (!userType) {
      return;
    }

    setIsLoading(true);

    try {
      await userApi.updateProfile(
        {
          fullName: name,
        },
        userType
      );

      dispatch(
        setCredentials({
          user: {
            ...user,
            fullName: name,
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Full Name
            </label>
            <Input
              id="name"
              value={name}
              onChange={handleNameChange}
              placeholder="Enter your full name"
              className="w-full"
              required
            />
            {nameError && (
              <p className="text-sm text-red-500 mt-1">{nameError}</p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="name"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-gray-800"
              required
              disabled
            />
          </div>
          <div className="flex justify-between space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setName(user?.fullName || "");
                setNameError("");
                onClose();
              }}
              disabled={isLoading}
              className="border-primary text-primary"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || !!nameError}>
              {isLoading ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
