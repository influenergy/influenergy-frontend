"use client";

import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";

import { CREATE_CAMPAIGN_FORM } from "@/constants/CreateCampaign";
import { createCampaignSchema } from "@/lib/CampaignSchema";
import { CampaignQuestionnaireData, CreateCampaignPayload } from "@/types/Questionnaire";

import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { selectUser, useAppSelector } from "@/store";
import { Step } from "./PostSteps"; // reuse field renderer
import { postApi } from "@/services/postServices";
import { useFormContext } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ChevronsLeft } from "lucide-react";


const CreateCampaign = ({
    mode = "create",
    defaultValues,
    onClose = () => { },
}: {
    mode?: "create" | "edit";
    defaultValues?: Partial<CampaignQuestionnaireData>;
    onClose?: () => void;
}) => {
    const { toast } = useToast();
    const router = useRouter();
    const user = useAppSelector(selectUser);
    const [isSubmitting, setIsSubmitting] = useState(false);
    // const status = watch("status");

    // 🔐 Auth check
    useEffect(() => {
        if (!user?._id) {
            toast({
                title: "Please login first",
                variant: "destructive",
            });
            router.push("/login");
        }
    }, [user, toast, router]);

    const methods = useForm<CampaignQuestionnaireData>({
        resolver: yupResolver(createCampaignSchema),
        defaultValues: {
            campaignTitle: "",
            brandName: "",
            campaignDescription: "",
            targetNiche: [],
            budgetForCampaign: "",
            socialPlatforms: "",
            expectedDeliverables: "",
            applicationQuestions: "",
            status: "DRAFT",
        },
    });

    const { handleSubmit, reset, watch, setValue } = methods;

    useEffect(() => {
        if (defaultValues) {
            reset(defaultValues);
        }
    }, [defaultValues, reset]);

    const onSubmit = async (data: CampaignQuestionnaireData) => {
        try {
            setIsSubmitting(true);

            const raw = data.requirements?.trim();

            const processedRequirements = raw
                ? raw.includes(",") || raw.includes("\n")
                    ? raw
                        .replace(/\n+/g, ",")   // normalize new lines
                        .split(",")             // split ONLY by commas now
                        .map(r => r.trim())
                        .filter(Boolean)
                    : [raw]                     // paragraph → single item
                : [];

            const processedData: CreateCampaignPayload = {
                ...data,
                requirements: processedRequirements,
            };

            await postApi.createCampaign(processedData);

            toast({ title: "Campaign saved successfully 🎉" });
            router.push("/dashboard/brand/my-campaigns");

        } catch (error: any) {
            toast({
                title: "Error",
                description: error?.response?.data?.message || "Something went wrong",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <button
                type="button"
                onClick={() => router.back()}
                className="text-gray-600 hover:text-gray-900 transition-colors dark:text-gray-300 dark:hover:text-white duration-200 flex items-center gap-1"
            >
                <ChevronsLeft className="h-5 w-5" />
                Back
            </button>

            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                    {/* 🔹 Title */}
                    <div className="space-y-1">
                        <h1 className="text-2xl font-medium dark:text-gray-100">
                            {mode === "edit" ? "Edit Draft Campaign" : "Create New Campaign"}
                        </h1>

                        <p className="text-md text-gray-500">
                            {mode === "edit"
                                ? "Update your draft campaign before publishing."
                                : "Fill in the details below to post your campaign and connect with creators"}
                        </p>
                    </div>

                    {/* 🔹 Form Fields */}
                    <Step fields={CREATE_CAMPAIGN_FORM.fields} mode={mode} />

                    {/* 🔹 Publish / Draft */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium">Campaign Status</label>

                        <div className="flex items-center gap-10">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    value="PUBLISHED"
                                    checked={watch("status") === "PUBLISHED"}
                                    onChange={() => setValue("status", "PUBLISHED")}
                                />
                                Publish now
                            </label>

                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    value="DRAFT"
                                    checked={watch("status") === "DRAFT"}
                                    onChange={() => setValue("status", "DRAFT")}
                                />
                                Save as draft
                            </label>
                        </div>
                    </div>


                    {/* 🔹 Actions */}
                    <div className="flex w-full gap-3">
                        <Button type="submit" disabled={isSubmitting} className="flex-1">
                            {isSubmitting
                                ? "Saving..."
                                : mode === "edit"
                                    ? "Update Campaign"
                                    : "Create Campaign"}
                        </Button>

                        {/* <Button type="button" variant="outline">
                            Cancel
                        </Button> */}
                    </div>

                </form>
            </FormProvider>
        </div>
    );
};

export default CreateCampaign;
