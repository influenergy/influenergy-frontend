import React from 'react'
import { Lock } from "lucide-react";
import Link from 'next/link';
import { Button } from '../ui/button';
import CreatorWithCompleteProfileSkeleton from '../Skeletons/CreatorWithCompleteProfileSkeleton';

interface CreatorWithCompleteProfileProps {
    fullName?: string;
    isProfileCompleted?: boolean;
    profileIcon?: string | null;
}

function NonVerifiedCreatorProfile({
    fullName,
    isProfileCompleted,
    profileIcon,
}: CreatorWithCompleteProfileProps) {

    if (!fullName) {
        return <CreatorWithCompleteProfileSkeleton />
    }

    const lockState = !isProfileCompleted
        ? "PROFILE_INCOMPLETE"
        : !profileIcon
            ? "PROFILE_IMAGE_MISSING"
            : null;


    return (
        <div className="flex flex-col gap-6 pr-4">
            {/* 🔒 LOCKED DASHBOARD */}
            <div className="relative">
                {/* BLURRED BACKGROUND */}
                <div className="pointer-events-none select-none blur-[3px] opacity-90">

                    {/* STATS SECTION */}
                    <div className="border border-gray-200 rounded-lg px-4 py-4 shadow-md">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[1, 2, 3].map((_, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center justify-between rounded-xl border bg-white p-5 shadow-sm"
                                >
                                    <div className="flex flex-col gap-2">
                                        <div className="h-4 w-24 bg-gray-200 rounded" />
                                        <div className="h-7 w-10 bg-gray-300 rounded" />
                                    </div>
                                    <div className="w-14 h-14 rounded-xl bg-gray-200" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ONGOING COLLABS */}
                    <div className="border border-gray-200 rounded-xl px-5 py-5 bg-white shadow-md">
                        <div className="flex justify-between items-center mb-5">
                            <div className="h-5 w-48 bg-gray-200 rounded" />
                            <div className="h-4 w-16 bg-gray-200 rounded" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[1, 2, 3].map((_, idx) => (
                                <div
                                    key={idx}
                                    className="h-40 rounded-xl bg-gray-100"
                                />
                            ))}
                        </div>
                    </div>

                    {/* NEW OFFERS */}
                    <div className="border border-gray-200 rounded-xl px-5 py-5 bg-white shadow-md">
                        <div className="flex justify-between items-center mb-5">
                            <div className="h-5 w-32 bg-gray-200 rounded" />
                            <div className="h-4 w-16 bg-gray-200 rounded" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[1, 2, 3].map((_, idx) => (
                                <div
                                    key={idx}
                                    className="h-40 rounded-xl bg-gray-100"
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* LOCK OVERLAY */}
                {lockState && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/10 rounded-xl">
                        <div className="bg-white rounded-xl p-6 text-center max-w-sm shadow-lg">
                            <Lock className="mx-auto mb-3 text-gray-700" />

                            <h2 className="text-lg font-semibold mb-2">
                                Dashboard Locked
                            </h2>

                            <p className="text-sm text-gray-600 mb-4">
                                {lockState === "PROFILE_INCOMPLETE"
                                    ? "Complete your profile to unlock full dashboard access"
                                    : "Upload your profile picture to continue"}
                            </p>

                            <Link href={lockState === "PROFILE_INCOMPLETE" ? "/questionnaire" : "/user-profile"}>
                                <Button className="w-full">
                                    {lockState === "PROFILE_INCOMPLETE"
                                        ? "Complete Profile"
                                        : "Upload Profile"}
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}


            </div>
        </div>
    )
}

export default NonVerifiedCreatorProfile;
