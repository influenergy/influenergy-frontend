import Image from "next/image";
import { useState } from "react";
import StatusModal from "./StatusModal";
import DetailsModal from "./DetailsModal";

interface InboxCardProps {
  status: string;
  title: string;
  image: string;
}

const InboxCard: React.FC<InboxCardProps> = ({ status, title, image }) => {
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  return (
    <div className="max-w-[300px] border rounded-lg shadow-md p-4 flex flex-col items-center">
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
        {status === "pending" && (
          <button
            onClick={() => setIsDetailsModalOpen(true)}
            className="w-full px-2 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary transition"
          >
            View
          </button>
        )}

        {status === "ongoing" && (
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

        {status === "completed" && (
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

        {status === "payment" && (
          <button className="w-full px-2 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary transition">
            Collaboration Under Process
          </button>
        )}
      </div>

      {/* Modals */}
      <DetailsModal
        open={isDetailsModalOpen}
        onOpenChange={setIsDetailsModalOpen}
      />
      {status !== "payment" && (
        <StatusModal
          open={isStatusModalOpen}
          onOpenChange={setIsStatusModalOpen}
        />
      )}
    </div>
  );
};

export default InboxCard;
