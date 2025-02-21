import Header from "@/components/dashboard/Header";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import DeleteModal from "@/components/userProfile/DeleteModal";
import { Info, PenLine } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="h-full flex flex-col items-center">
      <Header />

      <div className="w-full h-full px-4 sm:px-8 pt-5">
        {/* first section */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
          <p>Edit Profile</p>
          <div className="relative">
            <Image
              src="https://avatar.iran.liara.run/public/boy"
              alt="logo"
              width={70}
              height={70}
              className="w-full h-full object-cover"
            />
            <Button className="bg-primary text-white border-2 border-white rounded-full  absolute bottom-0 right-2 h-10 w-10">
              <PenLine size={20} />
            </Button>
          </div>
          <DeleteModal />
        </div>

        {/* profile details section */}
        <div className="border w-full mt-10 rounded-xl py-3 px-4 sm:px-7">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0">
            <p>Personal Info</p>
            <Link
              href="/user-profile/profile"
              className="flex items-center gap-2 rounded-xl text-md w-full sm:w-auto hover:text-primary transition-colors border py-1 px-3"
            >
              <PenLine size={20} />
              Edit
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row justify-start md:justify-between items-start sm:items-center gap-4 mt-4 sm:space-x-5">
            <div className="w-full sm:w-auto">
              <Label className="text-sm font-light">Name</Label>
              <p className="text-lg">John Doe</p>
            </div>
            <div className="w-full sm:w-auto">
              <Label className="text-sm font-light">Email</Label>
              <p className="text-lg break-all">johndoe@gmail.com</p>
            </div>
            <div className="w-full sm:w-auto">
              <p className="text-sm font-light">Phone</p>
              <p className="text-lg">911234567890</p>
            </div>
          </div>
        </div>

        {/* Complete Button */}
        <div className="w-full flex items-center justify-center">
          <Button className="mt-4 bg-primary text-white border-2 border-primary rounded-lg text-md py-5 px-8 w-full sm:w-2/3 md:w-1/3">
            Complete Profile
          </Button>
        </div>

        {/* Second Section */}
        <div className="w-full flex flex-col-reverse sm:flex-row items-center justify-between gap-2 sm:gap-4 bg-red-100 border border-red-100 min-h-[64px] rounded-xl px-4 sm:px-6 py-3 mt-8 mb-8 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <p className="text-gray-700 font-medium">
              Complete Your Profile and add all your details
            </p>
          </div>
          <Info size={24} className="text-red-600 shrink-0" />
        </div>
      </div>
    </div>
  );
}
