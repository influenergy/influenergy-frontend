import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Campaign } from "@/types/PostQuestionnaire";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { postApi } from "@/services/postServices"; // Adjust the import based on your file structure
const Post = ({ _id, campaignName, campaignPost }: Campaign) => {
  const router = useRouter();
  const [showCopyModal, setShowCopyModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [copying, setCopying] = useState(false);

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent navigation if dropdown is open or copy modal is open
    if (showCopyModal) return;
    router.push(`/dashboard/brand/posts/${encodeURIComponent(_id)}`);
  };

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    // await postApi.copyCampaign(_id, newName)
    setShowCopyModal(true);
  };

  const handleModalClose = () => {
    setShowCopyModal(false);
    setNewName("");
  };

  const handleSaveCopy = async () => {
    try {
      setCopying(true);
      // TODO: Implement API call to save the copied campaign with newName
      await postApi.copyCampaign(_id, newName);
      setCopying(false);
      setShowCopyModal(false);
      // Optionally, show a toast or refresh list
      alert("Campaign copied as '" + newName + "' successfully!"); // Replace with your preferred notification method
    }
    catch (error) {
      console.error("Error copying campaign:", error);
      setCopying(false);
      // Optionally, show an error message to the user
      alert("Failed to copy campaign. Please try again.");
    }
    finally {
      setNewName(""); // Clear the input field after saving
      setCopying(false); // Reset copying state
      setShowCopyModal(false); // Close the modal after saving
    }

  };

  return (
    <>
      <div
        className="w-[300px] rounded-xl border bg-white shadow-md hover:shadow-lg transition-shadow py-4 px-3 gap-2 cursor-pointer"
        onClick={handleCardClick}
      >
        {/* Content */}
        <div className="flex justify-between items-center mb-3">
          <div className="">
            <h3 className="text-sm text-gray-900 line-clamp-2 text-left">
              {campaignName.length > 50
                ? campaignName.slice(0, 50) + "..."
                : campaignName}
            </h3>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="p-2 rounded-md hover:bg-gray-100 hover:border hover:border-gray-300 transition duration-150"
                aria-label="More options"
                onClick={e => e.stopPropagation()}
              >
                <BsThreeDotsVertical className="text-xl text-gray-600 hover:text-gray-800" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="shadow-lg rounded-md">
              <DropdownMenuItem
                onClick={handleCopy}
                className="hover:bg-gray-100 hover:text-black px-3 py-2 rounded-md cursor-pointer transition"
              >
                Copy
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </div>

        {/* Image */}
        <div className="aspect-video relative rounded-xl overflow-hidden mb-3">
          <Image
            src={campaignPost || "/images/placeholder.png"}
            alt={campaignName}
            fill
            className="object-cover rounded-xl"
          />
        </div>
      </div>

      {/* Copy Modal */}
      {showCopyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Copy Campaign</h2>
            <label className="block mb-2 text-sm">New Campaign Name</label>
            <input
              className="w-full border rounded px-3 py-2 mb-4"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              disabled={copying}
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleModalClose} disabled={copying}>
                Cancel
              </Button>
              <Button onClick={handleSaveCopy} disabled={copying || !newName.trim()}>
                {copying ? "Copying..." : "Copy"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Post;
