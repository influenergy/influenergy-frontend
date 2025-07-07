import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import CreatorQuestionnaire from "@/components/questionnaire/CreatorQuestionnaire";
import { userApi } from "@/services/userServices";
import { useAppSelector } from "@/store";
import { Loader2 } from "lucide-react";

interface EditCreatorQuestionnaireModalProps {
    isOpen: boolean;
    onClose: () => void;
}

function mapApiToForm(data: any) {
    return {
        ...data,
        // Audience
        audienceLocations: data.audience?.audienceLocations || [],
        ageBracket: data.audience?.ageBracket || [],
        usBasedPercentage: data.audience?.usBasedPercentage || '',
        // Audience Info
        primaryAge: data.audienceInfo?.primaryAge || '',
        primaryGender: data.audienceInfo?.primaryGender || '',
        primaryLocation: data.audienceInfo?.primaryLocation || '',
        primaryPercentage: data.audienceInfo?.primaryPercentage || '',
        secondaryAge: data.audienceInfo?.secondaryAge || '',
        secondaryGender: data.audienceInfo?.secondaryGender || '',
        secondaryLocation: data.audienceInfo?.secondaryLocation || '',
        secondaryPercentage: data.audienceInfo?.secondaryPercentage || '',
        // Social Links
        primaryPlatform: data.socialLinks?.primary?.platform || '',
        primaryLink: data.socialLinks?.primary?.link || '',
        primaryFollowers: data.socialLinks?.primary?.followers || '',
        secondaryPlatform: data.socialLinks?.secondary?.platform || '',
        secondaryLink: data.socialLinks?.secondary?.link || '',
        secondaryFollowers: data.socialLinks?.secondary?.followers || '',
        // Add more mappings as needed for your form fields
    };
}

const EditCreatorQuestionnaireModal = ({ isOpen, onClose }: EditCreatorQuestionnaireModalProps) => {
    const user = useAppSelector((state) => state.auth.user);
    const [initialData, setInitialData] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setLoading(true);
            userApi.getProfileQuestionnaire()
                .then((res) => {
                    const mapped = mapApiToForm(res.data.data);
                    console.log(mapped,'mapped')
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