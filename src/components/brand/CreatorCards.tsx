import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, ExternalLink, MessageSquare, AlertCircle, ChevronDown, ChevronUp, CircleCheckBig, CircleX, Clock } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

interface Video {
  _id: string;
  link: string;
  timestamp: string;
  status: "Approved" | "Declined" | "Pending" | "Waiting Approval";
  message?: string | null;
  deliverableType: string;
}

interface CreatorProfile {
  socialLinks?: {
    primary?: {
      followers?: number;
    };
  };
  category?: string[];
  city?: string;
  dob?: string;
}

interface Creator {
  _id: string;
  fullName: string;
  profile?: CreatorProfile;
  profileIcon?: string;
}

interface CreatorCardProps {
  creator: Creator;
  status: string;
  coverMessage?: string;
  onAction: (nextStatus: any) => Promise<void>;
  isActiveCollaboration?: boolean;
  videos?: Video[];
  collaborationId?: string;
  expectedDeliverables?: string[];
  onApproveVideo?: (collaborationId: string, videoId: string) => void;
  onRequestChanges?: (collaborationId: string, videoId: string, message: string) => void;
  onCompleteCollaboration?: (collaborationId: string) => Promise<void>;
  isProcessing?: boolean;
}

export default function CreatorCard({
  creator,
  status,
  coverMessage,
  onAction,
  isActiveCollaboration = false,
  videos = [],
  collaborationId = "",
  expectedDeliverables = [],
  onApproveVideo,
  onRequestChanges,
  onCompleteCollaboration,
  isProcessing = false,
}: CreatorCardProps) {
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState("");
  const [declineMessage, setDeclineMessage] = useState("");
  const [isDeliverablesExpanded, setIsDeliverablesExpanded] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const router = useRouter();

  const handleRequestChanges = () => {
    if (onRequestChanges && selectedVideoId && declineMessage.trim()) {
      onRequestChanges(collaborationId, selectedVideoId, declineMessage);
      setShowMessageModal(false);
      setDeclineMessage("");
      setSelectedVideoId("");
    }
  };

  const openMessageModal = (videoId: string) => {
    setSelectedVideoId(videoId);
    setShowMessageModal(true);
  };

  const getDeliverableIcon = (type: string) => {
    const lowerType = type.toLowerCase();
    if (lowerType.includes("video")) return "🎥";
    if (lowerType.includes("short") || lowerType.includes("reel")) return "📱";
    if (lowerType.includes("post")) return "📝";
    if (lowerType.includes("story")) return "📸";
    return "📎";
  };


  const getVideoForDeliverable = (deliverableType: string) => {
    return videos.find((v) => v.deliverableType === deliverableType);
  };

  const handleCardClick = (creatorId: string) => {
    router.push(
      `/dashboard/brand/creators/${creatorId}?collaborationId=${encodeURIComponent(collaborationId)}&status=${encodeURIComponent(status)}`
    );
  }

  const approvedCount = videos.filter((v) => v.status === "Approved").length;
  const waitingCount = videos.filter((v) => v.status === "Waiting Approval").length;
  const declinedCount = videos.filter((v) => v.status === "Declined").length;


  const isAllDeliverablesApproved =
    expectedDeliverables.length > 0 &&
    approvedCount === expectedDeliverables.length;

  const LoaderOverlay = () => {
    return (
      <div className="absolute inset-0 bg-white/70 dark:bg-gray-800/70 flex items-center justify-center z-10 rounded-lg">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  };

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };


  return (
    <>
      {isProcessing && <LoaderOverlay />}
      <div className="flex flex-col items-start justify-between px-3 py-2 gap-2 border border-gray-300 rounded-2xl dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:border-primary/50 dark:hover:border-primary/50">
        {/* Creator Info */}
        <div className="flex items-start gap-4 w-full px-3 py-2 bg-white dark:bg-gray-800 cursor-pointer" onClick={() => handleCardClick(creator._id)}>
          {/* Avatar */}
          {creator.profileIcon?.trim() ? (
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-600 flex-shrink-0 shadow-md">
              <img
                src={creator.profileIcon}
                alt={creator.fullName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 via-primary/30 to-primary/40 flex items-center justify-center text-2xl font-bold text-primary flex-shrink-0 shadow-md border-2 border-primary/20">
              {creator.fullName?.charAt(0)?.toUpperCase() || "?"}
            </div>
          )}

          {/* Info */}
          <div className="flex flex-col gap-2 flex-1 min-w-0">
            {/* Name */}
            <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight truncate">
              {creator.fullName}
            </h3>

            {/* City + Age */}
            {(creator.profile?.city || creator.profile?.dob) && (
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                {creator.profile?.city && (
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {creator.profile.city}
                  </span>
                )}
                {creator.profile?.city && creator.profile?.dob && (
                  <span className="text-gray-400 dark:text-gray-600">•</span>
                )}
                {creator.profile?.dob && (
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {calculateAge(creator.profile.dob)} yrs
                  </span>
                )}
                {creator.profile?.dob && creator.profile?.socialLinks?.primary && (
                  <span className="text-gray-400 dark:text-gray-600">•</span>
                )}
                {/* Followers */}
                {creator.profile?.socialLinks?.primary?.followers && (
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center gap-1 bg-primary/10 dark:bg-primary/20 rounded-full">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span className="">
                        {creator.profile.socialLinks.primary.followers.toLocaleString()}
                      </span>
                      <span className="">followers</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Categories */}
            {creator.profile?.category && creator.profile?.category?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-1">
                {creator.profile.category.map((cat, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-600 dark:text-gray-200 font-medium border border-gray-200 dark:border-gray-600 hover:shadow-sm transition-shadow"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Status Badge */}
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
              {status}
            </span>
          </div>
        </div>

        <div>
          <p
            className={`text-sm text-[#364153] ${expanded ? "" : "line-clamp-2"
              }`}
          >
            {coverMessage}
          </p>

          {coverMessage && coverMessage.length > 100 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-1 text-sm font-medium text-blue-600 hover:underline"
            >
              {expanded ? "Read less" : "Read more"}
            </button>
          )}
        </div>

        {/* Deliverables Toggle - Only shown for Active Collaborations */}
        {isActiveCollaboration && expectedDeliverables.length > 0 && (
          <>
            <div className="mt-6 border-t border-gray-400 dark:border-gray-700 pt-4 w-full">
              <button
                onClick={() => setIsDeliverablesExpanded(!isDeliverablesExpanded)}
                className="w-full flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 p-2 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <h4 className="text-md font-semibold text-gray-900 dark:text-white">
                    Campaign Deliverables ({approvedCount}/{expectedDeliverables.length})
                  </h4>

                  {/* Status Indicators */}
                  <div className="flex items-center gap-2">
                    {waitingCount > 0 && (
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                        {waitingCount} waiting
                      </span>
                    )}
                    {declinedCount > 0 && (
                      <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                        {declinedCount} declined
                      </span>
                    )}
                  </div>
                </div>

                {isDeliverablesExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>

              {/* Collapsible Deliverables Content */}
              {isDeliverablesExpanded && (
                <div className="mt-4 space-y-4">
                  {expectedDeliverables.map((deliverableType, index) => {
                    const video = getVideoForDeliverable(deliverableType);
                    const isApproved = video?.status === "Approved";
                    const isWaitingApproval = video?.status === "Waiting Approval";
                    const isDeclined = video?.status === "Declined";
                    const isPending = !video || video?.status === "Pending";

                    return (
                      <div
                        key={index}
                        className={`border rounded-lg p-4 ${isApproved
                          ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20"
                          : isWaitingApproval
                            ? "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20"
                            : isDeclined
                              ? "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20"
                              : "border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900"
                          }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          {/* Deliverable Info */}
                          <div className="flex items-center gap-3 flex-1">
                            <span className="text-2xl">{getDeliverableIcon(deliverableType)}</span>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h5 className="text-sm font-semibold text-gray-900 dark:text-white">
                                  {deliverableType}
                                </h5>
                                {video && (
                                  <span
                                    className={`text-xs px-2 py-1 rounded-full ${isApproved
                                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                      : isWaitingApproval
                                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                        : isDeclined
                                          ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                          : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                                      }`}
                                  >
                                    {video.status}
                                  </span>
                                )}
                              </div>

                              {video ? (
                                <>
                                  <a
                                    href={video.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-primary hover:underline flex items-center gap-1 mb-1"
                                  >
                                    View Submission
                                    <ExternalLink className="w-3 h-3" />
                                  </a>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Submitted: {new Date(video.timestamp).toLocaleDateString()}
                                  </p>
                                </>
                              ) : (
                                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                  <AlertCircle className="w-3 h-3" />
                                  Not submitted yet
                                </p>
                              )}

                              {/* Feedback Message */}
                              {isDeclined && video?.message && (
                                <div className="mt-2 p-2 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded">
                                  <p className="text-red-800 dark:text-red-200 flex items-start gap-1 text-xs">
                                    <MessageSquare className="w-3 h-3 mt-0.5 flex-shrink-0" />
                                    <span>
                                      <strong>Feedback:</strong> {video.message}
                                    </span>
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Action Buttons - Only for Waiting Approval */}
                          {isWaitingApproval && onApproveVideo && onRequestChanges && (
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => onApproveVideo(collaborationId, video._id)}
                                disabled={isProcessing}
                                className="bg-green-50 hover:bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:hover:bg-green-900/30"
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => openMessageModal(video._id)}
                                disabled={isProcessing}
                                className="bg-red-50 hover:bg-red-100 text-red-700 border-red-200 dark:bg-red-900/20 dark:hover:bg-red-900/30"
                              >
                                <XCircle className="w-4 h-4 mr-1" />
                                Request Changes
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {/* ✅ Complete Collaboration Button */}
                  {isAllDeliverablesApproved && onCompleteCollaboration && (
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <Button
                        onClick={() => onCompleteCollaboration(collaborationId)}
                        disabled={isProcessing}
                        className="w-full bg-primary text-white hover:bg-primary/90"
                      >
                        Complete Collaboration
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}

        {/* Deliverables Toggle - Only shown for Active Collaborations */}
        {status === "Completed" && expectedDeliverables.length > 0 && (
          <>
            <div className="mt-6 border-t border-gray-400 dark:border-gray-700 pt-4 w-full">
              <button
                onClick={() => setIsDeliverablesExpanded(!isDeliverablesExpanded)}
                className="w-full flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 p-2 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <h4 className="text-md font-semibold text-gray-900 dark:text-white">
                    Campaign Deliverables ({expectedDeliverables.length}/{expectedDeliverables.length})
                  </h4>
                </div>

                {isDeliverablesExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>

              {/* Collapsible Deliverables Content */}
              {isDeliverablesExpanded && (
                <div className="mt-4 space-y-4">
                  {expectedDeliverables.map((deliverableType, index) => {
                    const video = getVideoForDeliverable(deliverableType);
                    const isApproved = video?.status === "Approved";
                    const isWaitingApproval = video?.status === "Waiting Approval";
                    const isDeclined = video?.status === "Declined";
                    const isPending = !video || video?.status === "Pending";

                    return (
                      <div
                        key={index}
                        className={`border rounded-lg p-4 ${isApproved
                          ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20"
                          : isWaitingApproval
                            ? "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20"
                            : isDeclined
                              ? "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20"
                              : "border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900"
                          }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          {/* Deliverable Info */}
                          <div className="flex items-center gap-3 flex-1">
                            <span className="text-2xl">{getDeliverableIcon(deliverableType)}</span>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h5 className="text-sm font-semibold text-gray-900 dark:text-white">
                                  {deliverableType}
                                </h5>
                                {video && (
                                  <span
                                    className={`text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400`}
                                  >
                                    {video.status}
                                  </span>
                                )}
                              </div>

                              {video ? (
                                <>
                                  <a
                                    href={video.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-primary hover:underline flex items-center gap-1 mb-1"
                                  >
                                    View Submission
                                    <ExternalLink className="w-3 h-3" />
                                  </a>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Submitted: {new Date(video.timestamp).toLocaleDateString()}
                                  </p>
                                </>
                              ) : (
                                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                  <AlertCircle className="w-3 h-3" />
                                  Not submitted yet
                                </p>
                              )}

                              {/* Feedback Message */}
                              {isDeclined && video?.message && (
                                <div className="mt-2 p-2 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded">
                                  <p className="text-red-800 dark:text-red-200 flex items-start gap-1 text-xs">
                                    <MessageSquare className="w-3 h-3 mt-0.5 flex-shrink-0" />
                                    <span>
                                      <strong>Feedback:</strong> {video.message}
                                    </span>
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Action Buttons - Only for Waiting Approval */}
                          {isWaitingApproval && onApproveVideo && onRequestChanges && (
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => onApproveVideo(collaborationId, video._id)}
                                disabled={isProcessing}
                                className="bg-green-50 hover:bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:hover:bg-green-900/30"
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => openMessageModal(video._id)}
                                disabled={isProcessing}
                                className="bg-red-50 hover:bg-red-100 text-red-700 border-red-200 dark:bg-red-900/20 dark:hover:bg-red-900/30"
                              >
                                <XCircle className="w-4 h-4 mr-1" />
                                Request Changes
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        )}

        {/* Action Buttons - Only for non-Active statuses */}
        {!isActiveCollaboration && (
          <div className="flex gap-3">
            {status === "Waiting Approval" && (
              <>
                <Button
                  onClick={() => onAction("Interested")}
                  variant="blue"
                  className="flex"
                >
                  <Clock className="w-4 h-4" />
                  Mark Interested
                </Button>
                <Button onClick={() => onAction("Offered")} className="flex">
                  <CircleCheckBig className="w-4 h-4" />
                  Send Offer
                </Button>
                <Button onClick={() => onAction("Rejected")} variant="destructive" className="flex">
                  <CircleX className="w-4 h-4" />
                  Reject
                </Button>
              </>
            )}

            {status === "Interested" && (
              <>
                <Button onClick={() => onAction("Offered")} className="flex">
                  <CircleCheckBig className="w-4 h-4" />
                  Send Offer
                </Button>
                <Button onClick={() => onAction("Rejected")} variant="destructive" className="flex">
                  <CircleX className="w-4 h-4" />
                  Reject
                </Button>
              </>
            )}

            {status === "Offered" && (
              <p className="font-medium text-primary">Waiting for the creator to accept the offer</p>
            )}

            {
              status === "Offer Accepted" && (
                <>
                  <Button onClick={() => onAction("Payment")} className="flex">
                    Proceed to Payment
                  </Button>

                  <Button onClick={() => onAction("Rejected")} variant="destructive" className="flex">
                    Reject
                  </Button>
                </>
              )}
          </div>
        )}

      </div>


      {/* Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Request Changes
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Please provide feedback for the creator on what needs to be improved:
            </p>
            <textarea
              value={declineMessage}
              onChange={(e) => setDeclineMessage(e.target.value)}
              placeholder="Enter your feedback here..."
              className="w-full h-32 p-3 border border-gray-300 dark:border-gray-600 rounded-md resize-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
            <div className="flex gap-3 mt-4">
              <Button
                onClick={() => {
                  setShowMessageModal(false);
                  setDeclineMessage("");
                  setSelectedVideoId("");
                }}
                variant="outline"
                className="flex"
              >
                Cancel
              </Button>
              <Button
                onClick={handleRequestChanges}
                disabled={!declineMessage.trim() || isProcessing}
                className="flex"
              >
                Submit Feedback
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}