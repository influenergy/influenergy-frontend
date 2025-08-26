"use client";
import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles } from "lucide-react";
import { api } from "@/services/api";

interface ProductUrlModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (campaignData: Record<string, unknown>) => void;
}

export const ProductUrlModal: React.FC<ProductUrlModalProps> = ({
    isOpen,
    onClose,
    onSuccess,
}) => {
    const [productUrl, setProductUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!productUrl.trim()) {
            toast({
                title: "URL Required",
                description: "Please enter a valid product URL",
                variant: "destructive",
            });
            return;
        }

        // Basic URL validation
        try {
            new URL(productUrl);
        } catch {
            toast({
                title: "Invalid URL",
                description: "Please enter a valid URL (e.g., https://example.com/product)",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);

        try {
            const response = await api.post("/brand/extract-data", {
                url: productUrl,
            });

            if (response.data.structuredData) {
                toast({
                    title: "Success!",
                    description: "Campaign data generated successfully from product URL",
                });

                // Transform the AI-generated data to match the questionnaire format
                const transformedData = transformExtractedData(response.data.structuredData);
                onSuccess(transformedData);
                onClose();
            } else {
                throw new Error("No data received from AI");
            }
        } catch (error: unknown) {
            console.error("Error generating campaign from URL:", error);
            const errorMessage = error && typeof error === 'object' && 'response' in error
                ? (error.response as { data?: { error?: string } })?.data?.error
                : "Failed to generate campaign from URL. Please try again.";
            toast({
                title: "Generation Failed",
                description: errorMessage,
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const transformExtractedData = (data: Record<string, unknown>) => {
        // Map AI data to questionnaire slugs exactly
        return {
            "brand-name": data["brand-name"] || "",
            "campaign-objective": (data["campaign-objective"] as unknown[]) || [],
            "campaign-description": data["campaign-description"] || "",
            "campaign-post": data["campaign-post"] || "",
            "target-age-group": (data["target-age-group"] as unknown[]) || [],
            "target-gender": (data["target-gender"] as unknown[]) || [],
            "target-location": (data["target-location"] as unknown[]) || [],
            "target-interests": (data["target-interests"] as unknown[]) || [],
            "compaign-name": data["compaign-name"] || "",
            "your-brief": data["your-brief"] || "",
            "content-type": data["content-type"] || "",
            "video-duration": data["video-duration"] || "",
            "catch-phrase": data["catch-phrase"] || "",
            "key-message": data["key-message"] || "",
            "tone-style": data["tone-style"] || "",
            "creator-type": data["creator-type"] || "",
            "minimum-followers": data["minimum-followers"] || "",
            "creator-influencer": data["creator-influencer"] || "",
            "social-media-platform": (data["social-media-platform"] as unknown[]) || [],
            "past-experience": data["past-experience"] || "",
            "preferred-creator-niche": (data["preferred-creator-niche"] as unknown[]) || [],
            "preferred-creator-demographics": data["preferred-creator-demographics"] || "",
            "budget-for-campaign": data["budget-for-campaign"] || "",
            "expected-deliverables": data["expected-deliverables"] || "",
            "no-of-days-for-delivery": data["no-of-days-for-delivery"] || "",
            "additional-instructions": data["additional-instructions"] || "",
            "requirement-documents": data["requirement-documents"] || "",
        } as Record<string, unknown>;
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-900 dark:text-gray-100">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-blue-600" />
                        Generate Campaign with AI
                    </DialogTitle>
                    <DialogDescription className="dark:text-gray-300">
                        Enter your product URL and let AI generate campaign details for you.
                        This will pre-fill the questionnaire with relevant information.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="productUrl" className="dark:text-gray-200">Product URL</Label>
                        <Input
                            id="productUrl"
                            type="url"
                            placeholder="https://example.com/product"
                            value={productUrl}
                            onChange={(e) => setProductUrl(e.target.value)}
                            disabled={isLoading}
                            required
                            className="dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700"
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading || !productUrl.trim()}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="mr-2 h-4 w-4" />
                                    Generate Campaign
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};
