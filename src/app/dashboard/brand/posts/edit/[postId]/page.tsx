"use client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { DESCRIPTION } from "@/constants/Description";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function EditPost() {
  const { postId } = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(
    DESCRIPTION.find((item) => item.id === postId) || null
  );

  if (!formData) {
    return <div>Post not found</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Add your API call here
      await new Promise((resolve) => setTimeout(resolve, 2000));
      router.push(`/dashboard/brand/posts/${postId}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
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
        <h1 className="text-2xl font-semibold">Edit Post</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              defaultValue={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Categories</Label>
            <Input
              defaultValue={formData.description}
              placeholder="Travel | Lifestyle | Outdoors"
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                defaultValue={formData.requirement.location}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    requirement: {
                      ...formData.requirement,
                      location: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Min Followers</Label>
              <Input
                defaultValue={formData.requirement.minFollowers}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    requirement: {
                      ...formData.requirement,
                      minFollowers: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Min Engagement</Label>
              <Input
                defaultValue={formData.requirement.minEngagement}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    requirement: {
                      ...formData.requirement,
                      minEngagement: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              rows={15}
              defaultValue={formData.offerDescription}
              onChange={(e) =>
                setFormData({ ...formData, offerDescription: e.target.value })
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
