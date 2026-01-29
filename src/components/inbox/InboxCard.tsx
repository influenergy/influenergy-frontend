import Image from "next/image";
import { useState } from "react";
import DetailsModal from "./DetailsModal";
import { Collaboration } from "@/types/Collaboration";
import { useQueryClient } from "@tanstack/react-query";
import { postApi } from "@/services/postServices";
import { PaymentModal } from "./PaymentModal";
import { Button } from "../ui/button";
import { useAcceptOrDeclineCollaboration } from "@/hooks/usePost";
import { CollaborationContractModal } from "../ui/ContractModal";
import { Card } from "../ui/card";
import UpdateStatusModal from "./UpdateStatusModal";
import StatusModal from "../brand/StatusModal";

interface InboxCardProps {
  status: string;
  paymentStatus: string;
  tab: string;
  title: string;
  image: string;
  data: Collaboration;
  refetch: () => void;
}

interface FormData {
  fullName: string;
  email: string;
  selectedMethod: string;
  paymentDetail: string;
}

interface StatusMessage {
  type: "success" | "error";
  message: string;
}

const InboxCard: React.FC<InboxCardProps> = ({
  status,
  paymentStatus,
  tab,
  image,
  data,
  refetch,
}) => {
  const collaborationId = data?._id;
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [contractModalOpen, setContractModalOpen] = useState(false);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(null);

  const { mutate: acceptCollaboration, isPending: isAccepting } =
    useAcceptOrDeclineCollaboration(collaborationId, "Offer Accepted");

  const { mutate: declineCollaboration, isPending: declineLoading } =
    useAcceptOrDeclineCollaboration(collaborationId, "Rejected");

  const handleAccept = () => {
    console.log("🔵 Accept clicked");
    acceptCollaboration(undefined, {
      onSuccess: () => {
        console.log("✅ Accept successful, invalidating queries");
        queryClient.invalidateQueries({
          queryKey: ["collaborationStatusDetails"]
        });
        queryClient.invalidateQueries({
          queryKey: ["creatorNotificationCounts"]
        });
        refetch();
        setContractModalOpen(false);

        setStatusMessage({
          type: "success",
          message: "Collaboration offer accepted successfully! The brand will be notified."
        });
      },
      onError: (error: any) => {
        console.error("❌ Accept failed:", error);

        setStatusMessage({
          type: "error",
          message: error?.message || "Failed to accept the collaboration. Please try again."
        });
      }
    });
  };

  const handleDecline = () => {
    console.log("🔵 Decline clicked");
    declineCollaboration(undefined, {
      onSuccess: () => {
        console.log("✅ Decline successful, invalidating queries");
        queryClient.invalidateQueries({
          queryKey: ["collaborationStatusDetails"]
        });
        queryClient.invalidateQueries({
          queryKey: ["creatorNotificationCounts"]
        });
        refetch();

        setStatusMessage({
          type: "success",
          message: "Collaboration offer declined successfully."
        });
      },
      onError: (error: any) => {
        console.error("❌ Decline failed:", error);

        setStatusMessage({
          type: "error",
          message: error?.message || "Failed to decline the collaboration. Please try again."
        });
      }
    });
  };

  const handleContractModalClose = () => {
    setContractModalOpen(false);
  };

  const handleCollectPayment = async (payload: FormData) => {
    setIsLoading(true);
    try {
      await postApi.paymentCollect(data._id || "", payload);
      setIsPaymentModalOpen(false); // Close payment modal first

      // Don't call refetch() here to prevent page refresh
      setStatusMessage({
        type: "success",
        message: "Payment collection request sent successfully!"
      });
    } catch (error: any) {
      console.error("Failed to collect payment", error);

      setStatusMessage({
        type: "error",
        message: error?.message || "Failed to collect payment. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle status modal close - refetch when user manually closes it
  const handleStatusModalClose = () => {
    setStatusMessage(null);
    refetch(); // Refetch data when user closes the modal
  };

  const handleModalClose = (wasUpdated: boolean = false) => {
    if (wasUpdated) {
      queryClient.invalidateQueries({
        queryKey: ["collaborationStatusDetails"],
      });
      if (data._id) {
        queryClient.invalidateQueries({
          queryKey: ["creatorVideos", data._id],
        });
      }
    }
    setIsStatusModalOpen(false);
  };

  // Handle opening details modal - stops propagation
  const handleOpenDetailsModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDetailsModalOpen(true);
  };

  // Handle button clicks to prevent card click
  const handleButtonClick = (e: React.MouseEvent, callback: () => void) => {
    e.stopPropagation();
    callback();
  };

  return (
    <div className="relative flex flex-col dark:bg-background">
      {
        <div
          className="shadow-lg bg-white dark:bg-gray-800 rounded-xl p-6 cursor-pointer hover:shadow-xl transition-shadow duration-300"
          onClick={handleOpenDetailsModal}
        >
          {/* Main Content Area with Round Image */}
          <div className="flex gap-4 items-start">
            {/* Round Campaign Image */}
            <div className="w-16 h-16 md:w-20 md:h-20 relative rounded-full overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-700 ring-2 ring-gray-200 dark:ring-gray-600">
              <Image
                src={data?.campaignId?.campaignImage || "/images/placeholder.png"}
                alt={data?.campaignId?.campaignTitle || "Campaign"}
                fill
                className="object-cover"
              />
            </div>

            {/* Content Next to Image */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3 mb-4">
                {/* Campaign Info */}
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1 line-clamp-2">
                    {data?.campaignId?.campaignTitle}
                  </h2>
                  <p className="text-sm md:text-base font-medium text-gray-600 dark:text-gray-300 mb-1">
                    {data?.campaignId?.brandName}
                  </p>
                  <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                    Applied on:{" "}
                    {data?.createdAt
                      ? new Date(data.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                      : ""}
                  </p>
                </div>

                {/* Status Badge */}
                <div className="flex-shrink-0 flex flex-col items-end gap-3">
                  {data?.status !== "Interested" && <span
                    className={`text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap ${data?.status === "Offered"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : data?.status === "Pending"
                        ? "bg-[#FEF9C2] text-[#A65F00]"
                        : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                      }`}
                  >
                    {data?.status}
                  </span>}

                  {/* Action Buttons Based on Status - Right Side */}
                  {data?.status === "Offered" && (
                    <div className="flex gap-2 w-full min-w-[140px]">
                      <Button
                        onClick={(e) => handleButtonClick(e, () => setContractModalOpen(true))}
                        disabled={isAccepting || declineLoading}
                        className="w-full bg-[#7544DB] hover:bg-[#6339c4] text-white font-semibold py-2 text-sm rounded-lg transition-colors duration-200"
                      >
                        {isAccepting ? "Accepting..." : "Accept"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={(e) => handleButtonClick(e, handleDecline)}
                        disabled={declineLoading || isAccepting}
                        className="w-full border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold py-2 text-sm rounded-lg transition-colors duration-200"
                      >
                        {declineLoading ? "Rejecting..." : "Reject"}
                      </Button>
                    </div>
                  )}

                  {data?.status === "Active" && (
                    <Button
                      onClick={(e) => handleButtonClick(e, () => setIsStatusModalOpen(true))}
                      className="bg-[#7544DB] hover:bg-[#6339c4] text-white font-semibold py-2 px-4 text-sm rounded-lg transition-colors duration-200 min-w-[140px]"
                    >
                      Update Status
                    </Button>
                  )}
                </div>
              </div>

              {/* Brand Request Notice */}
              {data?.source === "Brand" && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 mt-4">
                  <p className="text-sm text-yellow-700 dark:text-yellow-400 font-medium">
                    🤝 A brand has sent you a collaboration request.
                  </p>
                </div>
              )}

              {/* Status Messages Below */}
              <div className="mt-4">
                {data?.status === "Waiting Approval" && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Your application is under review. The brand will respond soon.
                    </p>
                  </div>
                )}

                {data?.status === "Interested" && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Your application is under review. The brand will respond soon.
                    </p>
                  </div>
                )}

                {data?.status === "Offer Accepted" && (
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                    <p className="text-sm text-yellow-700 dark:text-yellow-400 text-center">
                      ⏳ Please wait. The brand will enable video submissions shortly.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      }

      {/* Modals */}
      <DetailsModal
        open={isDetailsModalOpen}
        onOpenChange={setIsDetailsModalOpen}
        status={data?.status}
        handleAccept={handleAccept}
        handleDecline={handleDecline}
        isAccepting={isAccepting}
        isDeclining={declineLoading}
        data={data}
      />


      <CollaborationContractModal
        isOpen={contractModalOpen}
        onClose={handleContractModalClose}
        handleAccept={handleAccept}
        handleDecline={handleDecline}
        isAccepting={isAccepting}
      />

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onOpenChange={setIsPaymentModalOpen}
        handleCollectPayment={handleCollectPayment}
      />

      {statusMessage && (
        <StatusModal
          type={statusMessage.type}
          message={statusMessage.message}
          onClose={handleStatusModalClose}
        />
      )}

      {(status === "Active" || status === "Pending") && (
        <UpdateStatusModal
          open={isStatusModalOpen}
          onOpenChange={handleModalClose}
          collaborationId={data._id}
          campaignId={data?.campaignId?._id || ""}
          data={data.videos || []}
          status={status}
        />
      )}
    </div>
  );
};

export default InboxCard;