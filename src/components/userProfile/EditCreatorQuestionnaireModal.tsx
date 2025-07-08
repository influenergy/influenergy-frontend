import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import CreatorQuestionnaire from "@/components/questionnaire/CreatorQuestionnaire";
import { userApi } from "@/services/userServices";
// import { useAppSelector } from "@/store";
import { Loader2 } from "lucide-react";

interface EditCreatorQuestionnaireModalProps {
    isOpen: boolean;
    onClose: () => void;
}

function mapApiToForm(data: Record<string, unknown>) {
    // Type guards for nested objects
    const audience = typeof data.audience === 'object' && data.audience !== null ? data.audience as Record<string, unknown> : {};
    const audienceInfo = typeof data.audienceInfo === 'object' && data.audienceInfo !== null ? data.audienceInfo as Record<string, unknown> : {};
    const socialLinks = typeof data.socialLinks === 'object' && data.socialLinks !== null ? data.socialLinks as Record<string, unknown> : {};
    const primarySocial = typeof socialLinks.primary === 'object' && socialLinks.primary !== null ? socialLinks.primary as Record<string, unknown> : {};
    const secondarySocial = typeof socialLinks.secondary === 'object' && socialLinks.secondary !== null ? socialLinks.secondary as Record<string, unknown> : {};

    return {
        // Step 1
        "are-you-ugc-creator": typeof data.type === 'string' ? data.type==="Creator"?"Influencer":data.type : '',
        "full-name": typeof data.fullName === 'string' ? data.fullName : '',
        "stage-name": typeof data.stageName === 'string' ? data.stageName : '',
        dob: typeof data.dob === 'string' ? new Date(data.dob) : '',
        // Step 2
        gender: typeof data.gender === 'string' ? data.gender[0].toUpperCase()+data.gender.slice(1) : '',
        "gender-other": typeof data["gender-other"] === 'string' ? data["gender-other"] as string : '',
        country: typeof data.city === 'string' ? data.city : '',
        language: Array.isArray(data.languages) ? data.languages : [],
        "primary-niche": Array.isArray(data.category) ? data.category : [],
        // Step 3
        "tell-us-about-yourself": typeof data.aboutYourself === 'string' ? data.aboutYourself : '',
        // Step 4
        "primary-social-media": typeof primarySocial.platform === 'string' ? primarySocial.platform : '',
        "primary-social-media-link": typeof primarySocial.link === 'string' ? primarySocial.link : '',
        "primary-followers": typeof primarySocial.followers === 'string' ? primarySocial.followers : '',
        "secondary-social-media": typeof secondarySocial.platform === 'string' ? secondarySocial.platform : '',
        "secondary-social-media-link": typeof secondarySocial.link === 'string' ? secondarySocial.link : '',
        "secondary-followers": typeof secondarySocial.followers === 'string' ? secondarySocial.followers : '',
        // Step 5
        "primary-audience-location": typeof audienceInfo.primaryLocation === 'string' ? audienceInfo.primaryLocation : '',
        "primary-audience-gender": typeof audienceInfo.primaryGender === 'string' ? audienceInfo.primaryGender : '',
        "primary-audience-gender-other": typeof data["primary-audience-gender-other"] === 'string' ? data["primary-audience-gender-other"] as string : '',
        "primary-audience-age": typeof audienceInfo.primaryAge === 'string' ? audienceInfo.primaryAge : '',
        "primary-audience-percentage": typeof audienceInfo.primaryPercentage === 'string' ? audienceInfo.primaryPercentage : '',
        "secondary-audience-location": typeof audienceInfo.secondaryLocation === 'string' ? audienceInfo.secondaryLocation : '',
        "secondary-audience-gender": typeof audienceInfo.secondaryGender === 'string' ? audienceInfo.secondaryGender : '',
        "secondary-audience-gender-other": typeof data["secondary-audience-gender-other"] === 'string' ? data["secondary-audience-gender-other"] as string : '',
        "secondary-audience-age": typeof audienceInfo.secondaryAge === 'string' ? audienceInfo.secondaryAge : '',
        "secondary-audience-percentage": typeof audienceInfo.secondaryPercentage === 'string' ? audienceInfo.secondaryPercentage : '',
        // Step 6
        "growth-rate": typeof data.growthRate === 'string' ? data.growthRate : '',
        "primary-locations": Array.isArray(audience.audienceLocations) ? audience.audienceLocations : [],
        "us-based-audience": typeof audience.usBasedPercentage === 'string' ? audience.usBasedPercentage : '',
        // Step 7
        "top-two-audiences": Array.isArray(audience.ageBracket) ? audience.ageBracket : [],
        "average-views": typeof data.averageView === 'string' ? data.averageView : '',
        "favourite-brands": typeof data.favouriteBrands === 'string' ? data.favouriteBrands : '',
        "worked-with-ai": typeof data.workedWithAIConsumerApps === 'boolean' ? (data.workedWithAIConsumerApps ? 'Yes' : 'No') : '',
        "paid-campaigns": typeof data.hasPaidCampaignExperience === 'boolean' ? (data.hasPaidCampaignExperience ? 'Yes' : 'No') : '',
        "budget-video": typeof data.budgetVideo === 'string' ? data.budgetVideo : '',
        "payment-method": Array.isArray(data.paymentMethod) ? data.paymentMethod : [],
    };
}

const EditCreatorQuestionnaireModal = ({ isOpen, onClose }: EditCreatorQuestionnaireModalProps) => {
    const [initialData, setInitialData] = useState<Record<string, unknown> | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setLoading(true);
            userApi.getProfileQuestionnaire()
                .then((res) => {
                    const mapped = mapApiToForm(res.data.data);
                    console.log(mapped, 'mapped')
                    setInitialData(mapped);
                })
                .catch(() => setInitialData(null))
                .finally(() => setLoading(false));
        }
    }, [isOpen]);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Profile Questionnaire</DialogTitle>
                </DialogHeader>
                <div className="py-2">
                    {loading ? (
                        <div className="flex justify-center items-center min-h-[200px]">
                            <Loader2 className="animate-spin h-8 w-8 text-violet-600" />
                        </div>
                    ) : (
                        <CreatorQuestionnaire initialData={initialData || {}} />
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default EditCreatorQuestionnaireModal; 