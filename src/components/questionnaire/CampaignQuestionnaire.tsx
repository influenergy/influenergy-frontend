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
import { Step } from "./PostSteps";
import { postApi } from "@/services/postServices";
import { ChevronsLeft,Bookmark } from "lucide-react";

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

    // ✅ Helper function to ensure correct types
    const sanitizeDefaultValues = (values?: Partial<CampaignQuestionnaireData>) => {
        if (!values) return {};

        return {
            ...values,
            // ✅ Ensure expectedDeliverables is always a string
            expectedDeliverables: Array.isArray(values.expectedDeliverables)
                ? ""
                : (values.expectedDeliverables || ""),
            // ✅ Ensure targetNiche is always an array
            targetNiche: Array.isArray(values.targetNiche)
                ? values.targetNiche
                : [],
        };
    };

    const methods = useForm<CampaignQuestionnaireData>({
        resolver: yupResolver(createCampaignSchema),
        mode: "onBlur", // ✅ Validate when user leaves field
        reValidateMode: "onChange", // ✅ Re-validate on change after first error
        defaultValues: {
            campaignTitle: "",
            brandName: "",
            campaignDescription: "",
            targetNiche: [],
            budgetForCampaign: "",
            socialPlatforms: "",
            expectedDeliverables: "", // ✅ MUST be empty string, NOT array
            requirements: "",
            applicationQuestions: "",
            status: "DRAFT",
            ...sanitizeDefaultValues(defaultValues), // ✅ Sanitize incoming defaults
        },
    });

    const { handleSubmit, reset, watch, setValue, formState: { errors, isValid } } = methods;

    // ✅ Watch for type mismatches and fix them
    useEffect(() => {
        const subscription = watch((value, { name }) => {
            // Fix expectedDeliverables if it becomes an array
            if (name === "expectedDeliverables" && Array.isArray(value.expectedDeliverables)) {
                const firstValue = value.expectedDeliverables[0];
                setValue("expectedDeliverables", firstValue || "", { shouldValidate: true });
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, setValue]);

    useEffect(() => {
        if (defaultValues) {
            reset({
                campaignTitle: "",
                brandName: "",
                campaignDescription: "",
                targetNiche: [],
                budgetForCampaign: "",
                socialPlatforms: "",
                expectedDeliverables: "",
                requirements: "",
                applicationQuestions: "",
                status: "DRAFT",
                ...sanitizeDefaultValues(defaultValues),
            });
        }
    }, [defaultValues, reset]);

    const onSubmit = async (data: CampaignQuestionnaireData) => {
        try {
            setIsSubmitting(true);

            const raw = data.requirements?.trim();

            const processedRequirements = raw
                ? (() => {
                    // First, split by newlines
                    const lines = raw.split(/\n+/).map(l => l.trim()).filter(Boolean);

                    // If we got multiple lines, use those
                    if (lines.length > 1) {
                        return lines;
                    }

                    // Single line - check if it has commas that aren't in numbers
                    const singleLine = lines[0] || raw;

                    // Split by comma, but only if followed by space (not part of number)
                    const parts = singleLine.split(/,\s+/).map(r => r.trim()).filter(Boolean);

                    // If we got multiple parts, use those; otherwise treat as single item
                    return parts.length > 1 ? parts : [singleLine];
                })()
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

    const submitWithStatus = (status: "PUBLISHED" | "DRAFT") => {
        setValue("status", status, { shouldValidate: false });
        handleSubmit(onSubmit)();
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

                    {/* ✅ User-friendly validation errors */}
                    {Object.keys(errors).length > 0 && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                            <h3 className="text-sm font-medium text-red-800 dark:text-red-200 mb-2">
                                Please complete the following:
                            </h3>
                            <ul className="list-disc list-inside space-y-1 text-sm text-red-700 dark:text-red-300">
                                {Object.entries(errors).map(([field, error]) => (
                                    <li key={field}>
                                        {error?.message?.toString()}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* 🔹 Actions */}
                    <div className="flex w-full gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            className="flex-1"
                            disabled={isSubmitting}
                            onClick={() => submitWithStatus("DRAFT")}
                        >
                            {isSubmitting ? "Saving..." : "Save as Draft"}
                            <Bookmark/>
                        </Button>

                        <Button
                            type="button"
                            className="flex-1"
                            disabled={isSubmitting}
                            onClick={() => submitWithStatus("PUBLISHED")}
                        >
                            {isSubmitting ? "Publishing..." : mode === "edit" ? "Update & Publish" : "Publish Campaign"}
                        </Button>
                    </div>


                </form>
            </FormProvider>
        </div>
    );
};

export default CreateCampaign;