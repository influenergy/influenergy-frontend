import Image from "next/image";
import { useState } from "react";
import StatusModal from "./StatusModal";
import DetailsModal from "./DetailsModal";
import { Collaboration } from "@/types/Collaboration";
import { useQueryClient } from "@tanstack/react-query";
import { postApi } from "@/services/postServices";
import { PaymentModal } from "./PaymentModal";

interface InboxCardProps {
  status: string;
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

const InboxCard: React.FC<InboxCardProps> = ({
  status,
  title,
  image,
  data,
  refetch,
}) => {
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const handleModalClose = (wasUpdated: boolean = false) => {
    if (wasUpdated) {
      // Refetch data when modal closes after changes
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

  const handleCollectPayment = async (payload: FormData) => {
    setIsLoading(true);
    try {
      console.log("Collecting payment with payload:", payload);
      await postApi.paymentCollect(data._id || "");
      // Handle success, e.g., show a success message
      console.log("Payment collected successfully");
      refetch(); // Refetch data after payment collection
    } catch (error) {
      // Handle error, e.g., show an error message
      console.error("Failed to collect payment", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[300px] border rounded-lg shadow-md p-4 flex flex-col items-center">
      {/* Image Section */}
      <div className="w-full h-[150px] relative rounded-lg overflow-hidden">
        <Image src={image} alt="Card Image" fill className="object-cover" />
      </div>

      {/* Title Section */}
      <p className="mt-4 text-center text-sm font-medium text-gray-800">
        {title}
      </p>

      {/* Buttons Section */}
      <div className="mt-4 flex gap-2 w-full">
        {status === "Pending" && (
          <button
            onClick={() => setIsDetailsModalOpen(true)}
            className="w-full px-2 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary transition"
          >
            View
          </button>
        )}

        {status === "Active" && (
          <>
            <button
              onClick={() => setIsDetailsModalOpen(true)}
              className="w-full px-2 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary transition"
            >
              View
            </button>
            <button
              onClick={() => setIsStatusModalOpen(true)}
              className="w-full px-2 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-violet-100 transition"
            >
              Update Status
            </button>
          </>
        )}

        {status === "Completed" && (
          <>
            <button
              onClick={() => setIsDetailsModalOpen(true)}
              className="w-full px-2 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary transition"
            >
              View
            </button>
            <button
              onClick={() => setIsStatusModalOpen(true)}
              className="w-full px-2 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-violet-100 transition"
            >
              Status
            </button>
          </>
        )}

        {status === "Payment" && (
          <>
            {data.status === "Completed" ? (
              {
                Pending: (
                  <button
                    // onClick={handleCollectPayment}
                    onClick={() => setIsPaymentModalOpen(true)}
                    disabled={isLoading}
                    className="w-full px-2 py-2 text-sm font-medium text-white border border-primary rounded-lg bg-primary transition "
                  >
                    {isLoading ? "Collecting Payment..." : "Collect Payment"}
                  </button>
                ),
                Done: (
                  <button className="w-full px-2 py-2 text-sm font-medium text-white border border-primary rounded-lg bg-primary transition cursor-not-allowed">
                    Payment Completed
                  </button>
                ),
                Cancelled: (
                  <button className="w-full px-2 py-2 text-sm font-medium text-white border border-primary rounded-lg bg-primary transition cursor-not-allowed">
                    Payment Cancelled
                  </button>
                ),
                "Under Process": (
                  <button className="w-full px-2 py-2 text-sm font-medium text-white border border-primary rounded-lg bg-primary transition cursor-not-allowed">
                    Payment Collect Request Sent
                  </button>
                ),
              }[data.paymentStatus] || null
            ) : (
              <button className="w-full px-2 py-2 text-sm font-medium text-white border border-primary rounded-lg bg-primary transition cursor-not-allowed">
                Collaboration Under Process
              </button>
            )}
          </>
        )}
      </div>

      {/* Modals */}
      <DetailsModal
        open={isDetailsModalOpen}
        onOpenChange={setIsDetailsModalOpen}
        status={status}
        data={data}
      />

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onOpenChange={setIsPaymentModalOpen}
        handleCollectPayment={handleCollectPayment}
      />

      {status !== "Payment" && (
        <StatusModal
          open={isStatusModalOpen}
          onOpenChange={handleModalClose}
          collaborationId={data._id}
          data={data.videos || []}
          status={status}
        />
      )}
    </div>
  );
};

export default InboxCard;
