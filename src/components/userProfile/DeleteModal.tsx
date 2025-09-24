"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { userApi } from "@/services/userServices";
import { toast } from "@/hooks/use-toast";
import { useAppSelector } from "@/store";

export default function DeleteModal() {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const userType = useAppSelector((state) => state.auth.userType);

  useEffect(() => {
    if (!userType) {
      setShow(false);
    }
  }, [userType]);

  const handleDelete = async () => {
    if (!userType) {
      return;
    }
    try {
      await userApi.deleteAccount(userType);
      toast({
        title: "Success",
        description: "Account delete Request Sent successfully",
      });

      setShow(true);
    } catch (error: unknown) {
      // console.error("❌ Account delete error:", error);

      // Try to extract message from API response safely
      let errorMessage = "We couldn’t process your account deletion. Please try again later.";

      if (typeof error === "object" && error !== null) {
        const maybeAxiosError = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        errorMessage =
          maybeAxiosError.response?.data?.message ||
          maybeAxiosError.message ||
          errorMessage;
      }

      toast({
        variant: "destructive",
        title: "Failed to submit request",
        description: errorMessage,
      });

      setOpen(false);
    }
  };

  const ModelContent = () => {
    return (
      <DialogContent className="w-76 h-72">
        <DialogHeader className="flex flex-col items-center gap-4">
          <DialogTitle className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center">
            <Image
              src="/images/UserProfile/bin.svg"
              width={50}
              height={50}
              alt="logo"
            />
          </DialogTitle>
          <DialogDescription className="text-lg text-center text-black dark:text-white">
            Are you sure you want to delete <br /> the account permanently?
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-center gap-4">
          <Button
            variant={"outline"}
            className="border-primary border-2 text-primary"
            size="lg"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            className="bg-primary text-white"
            size="lg"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    );
  };

  const DeleteContent = () => {
    return (
      <DialogContent className="w-72 h-62">
        <DialogHeader className="flex flex-col items-center gap-4">
          <DialogTitle className="flex items-center justify-center">
            <Image
              src="/images/UserProfile/user.svg"
              width={50}
              height={50}
              alt="logo"
            />
          </DialogTitle>
          <DialogDescription className="text-lg text-center text-black">
            Your account deletion request has been received. Our admin will
            reach out to you within 72 hours.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-gray-700 bg-gray-300">
          <Trash2 />
          Delete Account
        </Button>
      </DialogTrigger>

      {!show ? <ModelContent /> : <DeleteContent />}
    </Dialog>
  );
}
