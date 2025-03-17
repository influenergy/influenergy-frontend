"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector, selectCurrentPost, selectPostLoading } from "@/store";
import { fetchCampaignById, updateCampaign, clearCurrentCampaign } from "@/store/features/postSlice";

export default function EditPost() {
  const { postId } = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const campaignData = useAppSelector(selectCurrentPost);
  const isLoading = useAppSelector(selectPostLoading);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (postId) {
      dispatch(fetchCampaignById(postId as string));
    }

    return () => {
      dispatch(clearCurrentCampaign());
    };
  }, [dispatch, postId]);

  // Update local form data when Redux data changes
  useEffect(() => {
    if (campaignData) {
      setFormData(campaignData);
    }
  }, [campaignData]);

  if (isLoading && !formData) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading campaign data...</span>
      </div>
    );
  }

  if (!formData) {
    return <div>Campaign not found</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateCampaign({ id: postId as string, data: formData }))
      .unwrap()
      .then(() => {
        router.push(`/dashboard/brand/posts/${postId}`);
      })
      .catch((error) => {
        console.error("Failed to update campaign:", error);
      });
  };

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleRequirementChange = (field, value) => {
    setFormData({
      ...formData,
      requirement: {
        ...formData.requirement,
        [field]: value,
      },
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-6">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <h1 className="text-2xl font-semibold">Edit Campaign</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              value={formData.title || ""}
              onChange={(e) => handleInputChange("title", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Categories</Label>
            <Input
              value={formData.description || ""}
              placeholder="Travel | Lifestyle | Outdoors"
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                value={formData.requirement?.location || ""}
                onChange={(e) =>
                  handleRequirementChange("location", e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Min Followers</Label>
              <Input
                value={formData.requirement?.minFollowers || ""}
                onChange={(e) =>
                  handleRequirementChange("minFollowers", e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Min Engagement</Label>
              <Input
                value={formData.requirement?.minEngagement || ""}
                onChange={(e) =>
                  handleRequirementChange("minEngagement", e.target.value)
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              rows={15}
              value={formData.offerDescription || ""}
              onChange={(e) =>
                handleInputChange("offerDescription", e.target.value)
              }
              className="font-mono"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Saving...</span>
              </div>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
