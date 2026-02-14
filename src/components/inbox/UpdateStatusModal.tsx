import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Link2, Check, Loader2, AlertCircle } from "lucide-react";
import { postApi } from "@/services/postServices";
import { useQueryClient } from "@tanstack/react-query";
import { Campaign } from "@/types/Collaboration";

interface Video {
  link: string;
  timestamp: string;
  status: "Approved" | "Declined" | "Pending" | "Waiting Approval" | null;
  message?: string | null;
  deliverableType?: string;
}

interface StatusModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  collaborationId: string;
  campaignId: string;
  data: Video[];
  status: string; // Main collaboration status (not used for upload control now)
}

interface DeliverableUpload {
  type: string;
  link: string;
  platform: string;
  status?: "Approved" | "Declined" | "Pending" | "Waiting Approval" | null;
  message?: string | null;
}


export default function UpdateStatusModal({
  open,
  onOpenChange,
  collaborationId,
  campaignId,
  data,
  status,
}: StatusModalProps) {
  const [campaignDetails, setCampaignDetails] = useState<Campaign | null>(null);
  const [deliverables, setDeliverables] = useState<DeliverableUpload[]>([]);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const [isFetchingCampaign, setIsFetchingCampaign] = useState(true);
  const queryClient = useQueryClient();


  const [statusModal, setStatusModal] = useState<{
    open: boolean;
    title: string;
    message: string;
    type: "success" | "error";
  }>({
    open: false,
    title: "",
    message: "",
    type: "success",
  });

  const showStatus = (
    title: string,
    message: string,
    type: "success" | "error" = "success"
  ) => {
    setStatusModal({
      open: true,
      title,
      message,
      type,
    });
  };

  useEffect(() => {
    if (open && collaborationId) {
      fetchCampaignDetails();
    }
  }, [open, collaborationId, data]);

  const fetchCampaignDetails = async () => {
    try {
      setIsFetchingCampaign(true);
      const response = await postApi.getCollabByCampaignId(campaignId);

      if (response?.collaborations && response.collaborations.length > 0) {
        const campaign = response.collaborations[0].campaignId;
        // const collaboration = response.collaborations[0];

        setCampaignDetails(campaign);

        const initialDeliverables: DeliverableUpload[] = [];

        if (campaign.expectedDeliverables && Array.isArray(campaign.expectedDeliverables)) {
          campaign.expectedDeliverables.forEach((deliverableType: string) => {
            const existingVideo = data.find(
              (v) => v.deliverableType === deliverableType
            );

            initialDeliverables.push({
              type: deliverableType,
              link: existingVideo?.link || "",
              platform: campaign.socialPlatforms || "",
              status: existingVideo?.status || null,
              message: existingVideo?.message || null,
            });
          });
        }

        setDeliverables(initialDeliverables);
      }
    } catch (error) {
      console.error("Error fetching campaign details:", error);
    } finally {
      setIsFetchingCampaign(false);
    }
  };

  const handleLinkChange = (index: number, value: string) => {
    const updated = [...deliverables];
    updated[index].link = value;
    setDeliverables(updated);
  };

  const handleIndividualUpload = async (index: number) => {
    const deliverable = deliverables[index];

    if (!deliverable.link.trim()) {
      showStatus(
        "Missing link",
        "Please provide a link for this deliverable.",
        "error"
      );
      return;
    }

    if (!isValidUrl(deliverable.link)) {
      showStatus(
        "Invalid URL",
        "Please enter a valid URL.",
        "error"
      );
      return;
    }

    try {
      setUploadingIndex(index);

      await postApi.uploadCollaborationVideos(collaborationId, {
        link: deliverable.link.trim(),
        deliverableType: deliverable.type,
      });

      // Invalidate queries to refresh data
      queryClient.invalidateQueries({
        queryKey: ["collaborationStatusDetails"],
      });
      queryClient.invalidateQueries({
        queryKey: ["creatorVideos", collaborationId],
      });

      // Update local state to show pending status
      const updated = [...deliverables];
      updated[index].status = "Pending";
      updated[index].message = null;
      setDeliverables(updated);

      showStatus(
        "Upload successful",
        "Deliverable uploaded successfully! Waiting for approval."
      );
    } catch (error) {
      console.error("Error uploading deliverable:", error);
      showStatus(
        "Upload failed",
        "Failed to upload deliverable. Please try again.",
        "error"
      );
    } finally {
      setUploadingIndex(null);
    }
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const getDeliverableIcon = (type: string) => {
    const lowerType = type.toLowerCase();
    if (lowerType.includes("video")) return "🎥";
    if (lowerType.includes("short")) return "📱";
    if (lowerType.includes("post")) return "📝";
    if (lowerType.includes("story")) return "📸";
    return "📎";
  };

  // ✅ CORRECTED: Upload based on INDIVIDUAL VIDEO STATUS only
  // Upload allowed when video status is: null, "Pending", "Rejected", or "Declined"
  // Upload NOT allowed when video status is: "Approved" or "Waiting Approval"
  const canUpload = (deliverable: DeliverableUpload) => {
    const videoStatus = deliverable.status;

    // If no status (not submitted yet), allow upload
    if (!videoStatus) {
      return true;
    }

    // Allow upload for Pending, Rejected, Declined
    const allowedStatuses = ["Pending", "Declined"];
    return allowedStatuses.includes(videoStatus);
  };

  const isInputDisabled = (deliverable: DeliverableUpload) => {
    const videoStatus = deliverable.status;

    // Disable only if video is Approved or Waiting Approval
    return videoStatus === "Approved" || videoStatus === "Waiting Approval";
  };


  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Upload Campaign Deliverables
            </DialogTitle>
          </DialogHeader>

          {isFetchingCampaign ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="space-y-6">
              {campaignDetails && (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <h3 className="font-semibold text-sm text-gray-700 dark:text-gray-300 mb-2">
                    Campaign: {campaignDetails.campaignTitle}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium">Platform:</span>
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded">
                      {campaignDetails.socialPlatforms}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mt-2">
                    <span className="font-medium">Collaboration Status:</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${status === "Active"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : status === "Completed"
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                      }`}>
                      {status}
                    </span>
                  </div>
                </div>
              )}

              {/* ✅ Info notice about upload rules */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-blue-800 dark:text-blue-300">
                      Upload Information
                    </p>
                    <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">
                      You can upload or re-upload videos that are <strong>Not Submitted</strong>, <strong>Pending</strong>, or <strong>Declined</strong>.
                    </p>
                    <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">
                      Videos that are <strong>Approved</strong> or <strong>Waiting Approval</strong> cannot be changed.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Required Deliverables
                  </h4>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {deliverables.filter((d) => d.status === "Approved").length} of{" "}
                    {deliverables.length} approved
                  </span>
                </div>

                {deliverables.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No deliverables required for this campaign
                  </div>
                ) : (
                  deliverables.map((deliverable, index) => {
                    const isApproved = deliverable.status === "Approved";
                    const isPending = deliverable.status === "Pending";
                    const isDeclined = deliverable.status === "Declined";
                    const showUploadButton = canUpload(deliverable);
                    const isUploading = uploadingIndex === index;
                    const isWaitingApproval = deliverable.status === "Waiting Approval";
                    const inputDisabled = isInputDisabled(deliverable) || isUploading;


                    return (
                      <div
                        key={index}
                        className={`border rounded-lg p-4 ${isApproved
                          ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20"
                          : isPending
                            ? "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20"
                            : isDeclined
                              ? "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20"
                              : "border-gray-200 dark:border-gray-700"
                          }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">
                              {getDeliverableIcon(deliverable.type)}
                            </span>
                            <div>
                              <Label className="text-sm font-medium text-gray-900 dark:text-white">
                                {deliverable.type}
                              </Label>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {deliverable.platform}
                              </p>
                            </div>
                          </div>

                          {deliverable.status ? (
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${isApproved
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                : isWaitingApproval
                                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                  : isPending
                                    ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                                    : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                }`}
                            >
                              {deliverable.status}
                            </span>
                          ) : (
                            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400">
                              Not Submitted
                            </span>
                          )}
                        </div>

                        <div className="space-y-3">
                          <div className="flex gap-2">
                            <div className="relative flex-1">
                              <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <Input
                                type="url"
                                placeholder={`Enter ${deliverable.type} link`}
                                value={deliverable.link}
                                onChange={(e) => handleLinkChange(index, e.target.value)}
                                disabled={inputDisabled}
                                className={`pl-10 ${inputDisabled ? 'opacity-60 cursor-not-allowed' : ''}`}
                              />
                            </div>

                            {showUploadButton && (
                              <Button
                                onClick={() => handleIndividualUpload(index)}
                                disabled={isUploading || !deliverable.link.trim()}
                                size="default"
                                className="whitespace-nowrap"
                              >
                                {isUploading ? (
                                  <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Uploading...
                                  </>
                                ) : (
                                  <>
                                    <Upload className="h-4 w-4 mr-2" />
                                    {deliverable.status ? 'Re-upload' : 'Upload'}
                                  </>
                                )}
                              </Button>
                            )}
                          </div>

                          {isApproved && (
                            <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400">
                              <Check className="h-4 w-4" />
                              <span>This deliverable has been approved ✓</span>
                            </div>
                          )}

                          {isWaitingApproval && (
                            <div className="flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <span>Waiting for brand approval...</span>
                            </div>
                          )}

                          {/* Show feedback for ANY status with messages */}
                          {deliverable.message && (
                            <div className={`p-3 border rounded-lg text-sm ${isDeclined
                              ? "bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800"
                              : isPending
                                ? "bg-yellow-50 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-800"
                                : "bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800"
                              }`}>
                              <div className="flex items-start gap-2">
                                <AlertCircle className={`h-4 w-4 mt-0.5 flex-shrink-0 ${isDeclined
                                  ? "text-red-600 dark:text-red-400"
                                  : isPending
                                    ? "text-yellow-600 dark:text-yellow-400"
                                    : "text-blue-600 dark:text-blue-400"
                                  }`} />
                                <div className="flex-1">
                                  <p className={`font-medium text-xs mb-1 ${isDeclined
                                    ? "text-red-800 dark:text-red-200"
                                    : isPending
                                      ? "text-yellow-800 dark:text-yellow-200"
                                      : "text-blue-800 dark:text-blue-200"
                                    }`}>
                                    {isDeclined ? "❌ Declined - Feedback:" : "💬 Feedback:"}
                                  </p>
                                  <p className={`text-xs ${isDeclined
                                    ? "text-red-700 dark:text-red-300"
                                    : isPending
                                      ? "text-yellow-700 dark:text-yellow-300"
                                      : "text-blue-700 dark:text-blue-300"
                                    }`}>
                                    {deliverable.message}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="flex justify-end pt-4 border-t dark:border-gray-700">
                <Button
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={uploadingIndex !== null}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={statusModal.open}
        onOpenChange={(open) =>
          setStatusModal((prev) => ({ ...prev, open }))
        }
      >
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle
              className={`text-base ${statusModal.type === "error"
                ? "text-red-600"
                : "text-green-600"
                }`}
            >
              {statusModal.title}
            </DialogTitle>
          </DialogHeader>

          <p className="text-sm text-gray-600 dark:text-gray-400">
            {statusModal.message}
          </p>

          <div className="flex justify-end pt-4">
            <Button
              size="sm"
              onClick={() =>
                setStatusModal((prev) => ({ ...prev, open: false }))
              }
            >
              OK
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}