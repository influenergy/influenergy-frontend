import React from 'react'
import { Card } from '../ui/card'
import { ArrowRight } from "lucide-react";
import Link from 'next/link';
import { Button } from '../ui/button';
import CreatorWithCompleteProfileSkeleton from '../Skeletons/CreatorWithCompleteProfileSkeleton';

interface CreatorWithCompleteProfileProps {
    fullName?: string;
    isProfileCompleted?: boolean;
    profileIcon?: string | null;
}


function NonVerifiedCreatorProfile({ fullName, isProfileCompleted, profileIcon }: CreatorWithCompleteProfileProps) {

    if(!fullName){
        return <CreatorWithCompleteProfileSkeleton />
    }

    return (
        <div className="flex flex-col flex-1 lg:flex-col gap-6 pr-4">
            <Card className="p-6 w-full flex gap-6">
                <div className="">
                    <video
                        controls
                        width="100%"
                        height="100%"
                        style={{ borderRadius: '12px', height: '100%', maxHeight: '100px', background: '#000' }}
                    >
                        {/* <source src="https://d20cf3kfv1a9jn.cloudfront.net/demo%20videos/Brands.mp4" type="video/mp4" /> */}
                        <source src="https://d20cf3kfv1a9jn.cloudfront.net/demo%20videos/Creators.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className="flex-1 flex flex-col justify-center gap-2">
                    <h2 className="text-xl font-semibold mb-2">
                        Welcome, {fullName || "Creator"}!
                    </h2>
                    <p className="text-muted-foreground">
                        Your creator dashboard is ready. Start exploring
                        opportunities!
                    </p>
                </div>
                {/* Video player for demo video */}

            </Card>
            <Card className='p-6 flex-1 h-full'>
                <div className='bg-purple-gradient px-4 md:px-6  rounded-lg text-start text-white h-full flex flex-col items-start justify-center gap-4'>
                    <h1 className='text-2xl mb-3 md:mb-5 lg:mb-10'>Let&apos;s get you discovered!</h1>

                    {!isProfileCompleted && !profileIcon && <div className="">

                        <p className="mb-3 md:mb-5 lg:mb-10 text-lg font-normal">
                            Please complete the questionnaire and upload a profile image
                            to personalize your dashboard experience and help us match
                            you with the right brands.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 mt-4">
                            <Link href="/questionnaire">
                                <Button className='bg-transparent text-white border-white border-2 hover:bg-transparent p-2 py-4'>Complete Your Profile <ArrowRight /></Button>
                            </Link>
                        </div>
                    </div>}

                    {!isProfileCompleted && profileIcon && <div className="">

                        <p className="mb-3 md:mb-5 lg:mb-10 text-lg font-normal">
                            Please complete the questionnaire to personalize your
                            dashboard experience and help us match you with the right
                            brands.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 mt-4">
                            <Link href="/questionnaire">
                                <Button className='bg-transparent text-white border-white border-2 hover:bg-transparent p-2 py-4'>Complete Your Profile <ArrowRight /></Button>
                            </Link>
                        </div>
                    </div>}
                    {isProfileCompleted && !profileIcon && <div className="">
                        <h2 className="text-muted font-semibold mb-2">
                            Add Your Profile Image
                        </h2>
                        <p className="mb-3 md:mb-5 lg:mb-10 text-lg font-normal">
                            Please upload a profile image to complete your profile and
                            get verified.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 mt-4">
                            <Link href="/user-profile">
                                <Button className='bg-transparent text-white border-white border-2 hover:bg-transparent p-2 py-4'>Upload Profile Image <ArrowRight /></Button>
                            </Link>
                        </div>

                    </div>}
                </div>
            </Card>
        </div>
    )
}

export default NonVerifiedCreatorProfile