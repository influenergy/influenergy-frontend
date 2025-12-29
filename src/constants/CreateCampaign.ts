import { LucideIcon, FileText } from "lucide-react";

export interface Field {
    title: string;
    category: "text" | "textarea" | "dropdown" | "multiselect" | "file";
    slug: string;
    options?: string[];
    placeholder?: string,
    // 👇 OPTIONAL layout control
    colSpan?: 1 | 2;
}


export interface SingleForm {
    title: string;
    description?: string;
    icon?: LucideIcon;
    fields: Field[];
}


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
            placeholder: "Select a niche"
        },
        {
            title: "Budget *",
            slug: "budgetForCampaign",
            category: "dropdown",
            options: [
                "$50 - $120",
                "$120 - $300",
                "$300 - $600",
                "$600 - $1,200",
                "$1,200+",
            ],
            placeholder: "Select a budget"
        },
        {
            title: "Requirements",
            slug: "requirements",
            category: "textarea",
            placeholder: "e.g., 10k+ followers, 3%+ engagement rate, experience in fashion niche"
        },
        {
            title: "Deliverables",
            slug: "expectedDeliverables",
            category: "multiselect",
            options: [
                "Instagram Reels",
                "YouTube Video",
                "Story Post",
                "Static Post",
                "Multiple Deliverables",
            ],
            placeholder: "e.g., 3 Instagram posts, 5 stories, 1 reel"
        },
        {
            title: "Deadline",
            slug: "deadline",
            category: "dropdown",
            options: [
                "within 24hrs",
                "within 2 days",
                "within next week",
                "within a month",
            ],
            placeholder: "Select a deadline"
        },
        {
            title: "Campaign Image",
            slug: "campaignImage",
            category: "file",
            placeholder: "Click to upload campaign image"
        },
        // {
        //     title: "Application Questions (Optional)",
        //     slug: "applicationQuestions",
        //     category: "textarea",
        //     placeholder: "Enter application question if any"
        // },
    ],
};

