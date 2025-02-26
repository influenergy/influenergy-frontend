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
import { setCredentials } from "@/store/features/authSlice";
import { selectUser, useAppSelector } from "@/store";
import { authApi } from "@/services/authServices";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EditProfileModal({ isOpen, onClose }: EditProfileModalProps) {
  const user = useAppSelector(selectUser);
  const [name, setName] = useState(user?.fullName || "");
  const [email, setEmail] = useState(user?.email || "test");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await authApi.updateProfile(user?._id as string, {
        fullName: name,
      });

      dispatch(
        setCredentials({
          user: { ...user, fullName: name },
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
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full"
              required
            />
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
              onClick={onClose}
              disabled={isLoading}
              className="border-primary text-primary"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
