import { Info } from "lucide-react";

interface ProfileInfoProps {
  user: {
    profileIcon?: string;
    isAccountVerified?: boolean;
    isProfileCompleted?: boolean;
  };
  userType: string;
}

const BrandMessage = ({ user }: { user: ProfileInfoProps["user"] }) => {
  return (
    <>
      {!user?.profileIcon && (
        <div className="w-full flex flex-col-reverse sm:flex-row items-center justify-between gap-2 sm:gap-4 bg-red-100 border border-red-100 min-h-[64px] rounded-xl px-4 sm:px-6 py-3 mt-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <p className="text-gray-700 font-medium">
              Please fill the questionnaire and upload profile image to get
              verified
            </p>
          </div>
          <Info size={24} className="text-red-600 shrink-0" />
        </div>
      )}
    </>
  );
};

const UserProfileStatus = ({ user }: { user: ProfileInfoProps["user"] }) => {
  if (user?.isAccountVerified) {
    return (
      <div className="w-full flex flex-col-reverse sm:flex-row items-center justify-between gap-2 sm:gap-4 bg-green-100 border border-green-100 min-h-[64px] rounded-xl px-4 sm:px-6 py-3 mt-4 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <p className="text-gray-700 font-medium">Your profile is verified</p>
        </div>
        <Info size={24} className="text-green-600 shrink-0" />
      </div>
    );
  } else if (!user?.isProfileCompleted || !user?.profileIcon) {
    return (
      <div className="w-full flex flex-col-reverse sm:flex-row items-center justify-between gap-2 sm:gap-4 bg-red-100 border border-red-100 min-h-[64px] rounded-xl px-4 sm:px-6 py-3 mt-4 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <p className="text-gray-700 font-medium">
            Please fill the questionnaire and upload profile image to get
            verified
          </p>
        </div>
        <Info size={24} className="text-red-600 shrink-0" />
      </div>
    );
  } else {
    return (
      <div className="w-full flex flex-col-reverse sm:flex-row items-center justify-between gap-2 sm:gap-4 bg-red-100 border border-red-100 min-h-[64px] rounded-xl px-4 sm:px-6 py-3 mt-4 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <p className="text-gray-700 font-medium">
            Your profile is under verification, please wait for our team to
            review it.
          </p>
        </div>
        <Info size={24} className="text-red-600 shrink-0" />
      </div>
    );
  }
};

export default function ProfileInfo({ user, userType }: ProfileInfoProps) {
  return (
    <>
      {userType === "brand" ? (
        <BrandMessage user={user} />
      ) : (
        <UserProfileStatus user={user} />
      )}
    </>
  );
}
