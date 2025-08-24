import Image from "next/image";
import { useState } from "react";
import StatusModal from "./StatusModal";
import DetailsModal from "./DetailsModal";
import { Collaboration } from "@/types/Collaboration";
import { useQueryClient } from "@tanstack/react-query";
import { postApi } from "@/services/postServices";
import { PaymentModal } from "./PaymentModal";
import { Button } from "../ui/button";

import { useAcceptOrDeclineCollaboration } from "@/hooks/usePost";
import { CollaborationContractModal } from "../ui/ContractModal";
import { Card } from "../ui/card";

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
      // console.log("Collecting payment with payload:", payload);
      await postApi.paymentCollect(data._id || "", payload);
      // Handle success, e.g., show a success message
      
      refetch(); // Refetch data after payment collection
    } catch (error) {
      // Handle error, e.g., show an error message
      console.error("Failed to collect payment", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleContractModalOpen = () => {
    setContractModalOpen(true);
  };
  const handleContractModalClose = () => {
    setContractModalOpen(false);
  };
  const { mutate: acceptCollaboration, isPending: isAccepting } =
    useAcceptOrDeclineCollaboration(collaborationId, "Active");
  const { mutate: declineCollaboration, isPending: declineLoading } =
    useAcceptOrDeclineCollaboration(collaborationId, "Cancelled");


  return (
    <div className="relative flex flex-col">
      {
        status === "Completed" || status === "Payment" ?
          <Card className="bg-white rounded-2xl shadow-md p-4 flex flex-col transition hover:shadow-lg h-full">
            <h1 className="mb-2 ">
              {data.campaignId.campaignName.length > 50
                ? data.campaignId.campaignName.slice(0, 50) + "..."
                : data.campaignId.campaignName}
            </h1>
            <div className="aspect-video relative rounded-xl overflow-hidden mb-3">
              <Image
                src={data.campaignId.campaignPost || "/images/placeholder.png"}
                alt={data.campaignId.campaignName}
                fill
                className="object-cover rounded-xl"
              />
            </div>
            <div className="my-4 flex justify-between flex-col flex-1 gap-4">
              <div>

                <h3 className="text-black dark:text-black text-xs mb-1 font-thin">Description</h3>
                <p
                  className={`text-black text-sm leading-snug transition-all ${expanded ? "" : "line-clamp-2"}`}
                >
                  {data.campaignId.campaignDescription}
                </p>
                {data.campaignId.campaignDescription && data.campaignId.campaignDescription.length > 120 && (
                  <button
                    onClick={(e) => { e.preventDefault(); setExpanded(!expanded); }}
                    className="text-blue-500 hover:underline text-xs mt-1"
                  >
                    {expanded ? "View Less" : "View More"}
                  </button>
                )}
              </div>
              <div className="">
                <h3>Status</h3>
                <p className="text-[#7544DB]"> <span className="inline-block w-3 h-3 bg-[#7544DB] rounded-full mr-1" /> Collaboration Complete</p>
              </div>
            </div>

            <div className="mt-auto text-center flex w-full">
              {status === "Completed" ? <Button className="bg-transparent w-full shadow-none hover:bg-white border-[#7544DB] text-[#7544DB] border-2 rounded-xl font-semibold" onClick={() => setIsDetailsModalOpen(true)}>
                View Details
              </Button> : 
              
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
              }
            </div>

          </Card> :
          <>
            <div className="flex ">
              <p className="text-gray-500 bg-white text-sm md:text-base shadow-[0_-2px_6px_rgba(0,0,0,0.1),2px_0_6px_rgba(0,0,0,0.1),-2px_0_6px_rgba(0,0,0,0.1)] rounded-t-lg p-4 md:px-10 ">
                {data.campaignId.campaignName}
              </p>

            </div>
            <div className="-mt-2 shadow-lg bg-white py-6 px-4 flex flex-col gap-4 md:gap-6 rounded-lg">
              <section className="flex flex-col md:flex-row items-start gap-4 md:gap-4">
                <div className="w-[300px] relative rounded-xl aspect-video">
                  <Image
                    src={image}
                    alt="Campaign Image"
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>

                <div className="flex flex-col items-start gap-2 md:gap-4">
                  <h2 className="font-semibold text-sm md:text-base dark:text-black">Campaign Description</h2>
                  <p className="text-gray-500 text-sm md:text-base font-normal">
                    {data.campaignId.campaignDescription}
                  </p>
                </div>
              </section>
              <section className="flex flex-col items-start w-full gap-4 md:gap-6">
                <h2 className="font-semibold text-sm md:text-base border-b-2 text-primary px-2 border-primary cursor-pointer" onClick={() => {

                  setIsDetailsModalOpen(true)
                }} >View Campaign Details</h2>
                <div className="flex w-full">
                  {status == "Pending" && (
                    <div className=" bg-white  flex justify-end gap-4 md:w-1/2">
                      <Button
                        className=" px-4 py-2 text-sm font-medium rounded-lg hover:bg-primary-dark transition bg-primary w-full text-white"
                        onClick={() => handleContractModalOpen()}
                        disabled={isAccepting || declineLoading}
                      >
                        {isAccepting ? "Accepting..." : "Accept"}
                      </Button>
                      <Button
                        className="w-full px-4 py-2 text-sm font-medium  border rounded-lg transition border-primary text-primary bg-white hover:bg-primary hover:text-white"
                        onClick={() => declineCollaboration()}
                        disabled={declineLoading || isAccepting}
                      >
                        {declineLoading ? "Rejecting..." : "Reject"}
                      </Button>
                    </div>
                  )}

                  {status === "Active" && (
                    <div className="bg-white  flex justify-end gap-4 md:w-1/2">
                      <Button
                        onClick={() => setIsStatusModalOpen(true)}
                        className="w-full px-4 py-2 text-sm font-medium  border rounded-lg transition border-primary text-primary bg-white hover:bg-primary hover:text-white"
                      >
                        Update Status
                      </Button>
                    </div>
                  )}
                </div>
              </section>
            </div></>
      }
  

      {/* Modals */}
      <DetailsModal
        open={isDetailsModalOpen}
        onOpenChange={setIsDetailsModalOpen}
        status={status}
        data={data}
      />

      <CollaborationContractModal
        isOpen={contractModalOpen}
        onClose={handleContractModalClose}
        handleCollaborate={acceptCollaboration}
        disabled={isAccepting || declineLoading}
      />

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onOpenChange={setIsPaymentModalOpen}
        handleCollectPayment={handleCollectPayment}
      />

      {
        status !== "Payment" && (
          <StatusModal
            open={isStatusModalOpen}
            onOpenChange={handleModalClose}
            collaborationId={data._id}
            data={data.videos || []}
            status={status}
          />
        )
      }
    </div >
  );
};

export default InboxCard;
