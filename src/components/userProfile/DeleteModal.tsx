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
import { useState } from "react";

export default function DeleteModal() {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

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
          <DialogDescription className="text-lg text-center text-black">
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
            onClick={() => setShow(true)}
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
        <Button variant={"destructive"} className="text-red-700 bg-red-300">
          <Trash2 />
          Delete Account
        </Button>
      </DialogTrigger>

      {!show ? <ModelContent /> : <DeleteContent />}
    </Dialog>
  );
}
