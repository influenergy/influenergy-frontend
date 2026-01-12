"use client";
import { useEffect, useState } from "react";
import { postApi } from "@/services/postServices";
import { Button } from "@/components/ui/button";
import { Loader2, X, CheckCircle2, AlertCircle } from "lucide-react";

export default function InviteCreatorModal({
  creatorId,
  onClose,
}: {
  creatorId: string;
  onClose: () => void;
}) {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [campaignId, setCampaignId] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [coverMessage, setCoverMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchCampaigns = async () => {
      const res = await postApi.getAllCampaigns();
      setCampaigns(res.campaigns.filter((c: any) => c.status === "PUBLISHED"));
      setLoading(false);
    };
    fetchCampaigns();
  }, []);

  const handleInvite = async () => {
    if (!campaignId) return;

    const payload = {
      creatorId: creatorId,
      ...(coverMessage && { coverMessage }),
    };
    setSubmitting(true);

    try {
      await postApi.inviteForCollaboration(campaignId, payload);
      setStatus("success");
    } catch (error: any) {
      setStatus("error");
      const backendMessage = error?.response?.data?.message || error?.message || "Failed to send invitation. Please try again.";
      setErrorMessage(backendMessage);
    } finally {
      setSubmitting(false);
    }
  };

  // Close modal when clicking outside
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleClose = () => {
    setStatus("idle");
    onClose();
  };

  // Success Modal
  if (status === "success") {
    return (
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={handleBackdropClick}
      >
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
          <div className="p-8 text-center space-y-4">
            <div className="flex justify-center">
              <div className="rounded-full bg-green-100 dark:bg-green-900/20 p-3">
                <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Invitation Sent!
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              The creator has been successfully invited to your campaign.
            </p>
            <Button onClick={handleClose} className="w-full mt-4">
              Done
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Error Modal
  if (status === "error") {
    return (
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={handleBackdropClick}
      >
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
          <div className="p-8 text-center space-y-4">
            <div className="flex justify-center">
              <div className="rounded-full bg-red-100 dark:bg-red-900/20 p-3">
                <AlertCircle className="w-12 h-12 text-red-600 dark:text-red-400" />
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Invitation Failed
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {errorMessage}
            </p>
            <div className="flex gap-3 mt-4">
              <Button variant="outline" onClick={handleClose} className="flex-1">
                Cancel
              </Button>
              <Button onClick={() => setStatus("idle")} className="flex-1">
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Invite Modal
  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b dark:border-gray-800">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Invite Creator to Campaign
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="animate-spin w-8 h-8 text-blue-600" />
            </div>
          ) : (
            <div className="space-y-2">
              <label
                htmlFor="campaign-select"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Select Campaign
              </label>
              <select
                id="campaign-select"
                value={campaignId}
                onChange={(e) => setCampaignId(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              >
                <option value="">Choose a campaign...</option>
                {campaigns.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.campaignTitle}
                  </option>
                ))}
              </select>
              {campaigns.length === 0 && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  No published campaigns available
                </p>
              )}

              {/* Cover Message */}
              <label
                htmlFor="cover-message"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mt-4"
              >
                Cover Message (Optional)
              </label>
              <textarea
                id="cover-message"
                rows={4}
                value={coverMessage}
                onChange={(e) => setCoverMessage(e.target.value)}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Write a short message..."
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 bg-gray-50 dark:bg-gray-800/50 border-t dark:border-gray-800">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClose}
            disabled={submitting}
          >
            Cancel
          </Button>
          <Button
            className="flex-1"
            disabled={!campaignId || submitting}
            onClick={handleInvite}
          >
            {submitting ? (
              <>
                <Loader2 className="animate-spin w-4 h-4 mr-2" />
                Inviting...
              </>
            ) : (
              "Send Invite"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}