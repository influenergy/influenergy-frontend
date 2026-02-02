    import { LucideIcon, FileText } from "lucide-react";

    export interface Field {
        title: string;
        category: "text" | "textarea" | "dropdown" | "multiselect" | "file" | "date" | "range" | "grouped-dropdown" | "number-with-prefix" | "number-with-suffix";
        slug: string;
        options?: string[];
        placeholder?: string;
        colSpan?: 1 | 2;
        groups?: { label: string; options: string[] }[];
        prefix?: string;
        suffix?: string;
        info?: string;
    }

    export interface SingleForm {
        title: string;
        description?: string;
        icon?: LucideIcon;
        fields: Field[];
    }

    // Platform-specific deliverables mapping
    export const PLATFORM_DELIVERABLES: Record<string, string[]> = {
        Instagram: ["Reel", "Story", "Post"],
        YouTube: ["Video", "Shorts"],
        TikTok: ["Short Video"],
        Facebook: ["Post", "Story", "Video"],
        X: ["Tweet", "Thread"],
    };

    export const CREATE_CAMPAIGN_FORM: SingleForm = {
        title: "Create Campaign",
        description: "Fill in the details below to launch your campaign 🚀",
        icon: FileText,

        fields: [
            {
                title: "Campaign Title *",
                slug: "campaignTitle",
                category: "text",
                placeholder: "e.g., Summer Fashion Campaign"
            },
            {
                title: "Brand Name *",
                slug: "brandName",
                category: "text",
                placeholder: "Your brand name"
            },
            {
                title: "Description / Creative Brief *",
                slug: "campaignDescription",
                category: "textarea",
                placeholder: "Describe your campaign, what you're looking for, and what makes it exciting..."
            },
            {
                title: "Niche *",
                slug: "targetNiche",
                category: "multiselect",
                options: [
                    "AI",
                    "Beauty & Care",
                    "Business & Finance",
                    "Fashion & Style",
                    "Food & Drinks",
                    "Gaming",
                    "Health & Wellness",
                    "Lifestyle",
                    "Sports & Fitness",
                    "Tech",
                    "Travel",
                    "Others",
                ],
                placeholder: "Select niche(s)"
            },
            {
                title: "Budget *",
                slug: "budgetForCampaign",
                category: "number-with-prefix",
                prefix: "$",
                placeholder: "Enter budget amount"
            },
            {
                title: "Deadline *",
                slug: "deadline",
                category: "number-with-suffix",
                suffix: "days",
                placeholder: "Enter number of days",
                info: "Minimum deadline is 3 days"
            },
            {
                title: "Requirements",
                slug: "requirements",
                category: "textarea",
                placeholder: "e.g., 10k+ followers, 3%+ engagement rate, experience in fashion niche",
                info: "Enter each requirement on a new line. Use commas only within a single requirement if needed."
            },
            {
                title: "Social Platform *",
                slug: "socialPlatforms",
                category: "dropdown",
                options: [
                    "Instagram",
                    "YouTube",
                    "TikTok",
                    "Chatgpt",
                ],
                placeholder: "Select social platform(s)",
            },
            {
                title: "Deliverables *",
                slug: "expectedDeliverables",
                category: "dropdown",
                // No options here - they're dynamically generated based on socialPlatforms
                placeholder: "Select social platform first",
            },
            {
                title: "Campaign Image",
                slug: "campaignImage",
                category: "file",
                placeholder: "Click to upload campaign image"
            },
        ],
    };