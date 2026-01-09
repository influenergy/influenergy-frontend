import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Campaign } from "@/types/PostQuestionnaire";
import Image from "next/image";

interface CloneBriefModalProps {
    open: boolean;
    onClose: () => void;
    campaigns: Campaign[];
    onClone: (selected: Campaign[]) => void;
}

const CloneBriefModal: React.FC<CloneBriefModalProps> = ({ open, onClose, campaigns, onClone }) => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const handleToggle = (id: string) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
        );
    };

    const handleClone = () => {
        const selected = campaigns.filter((c) => selectedIds.includes(c._id));
        onClone(selected);
        setSelectedIds([]);
        onClose();
    };

    const handleCancel = () => {
        setSelectedIds([]);
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl w-full">
                <DialogHeader>
                    <DialogTitle>Select Campaigns to Clone</DialogTitle>
                </DialogHeader>
                <div className="max-h-96 overflow-y-auto space-y-2">
                    {campaigns.length === 0 ? (
                        <div className="text-center text-gray-500">No campaigns available.</div>
                    ) : (
                        campaigns.map((campaign) => (
                            <label key={campaign._id} className="flex items-center gap-3 p-2 border rounded hover:bg-gray-50 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedIds.includes(campaign._id)}
                                    onChange={() => handleToggle(campaign._id)}
                                    className="accent-primary"
                                />
                                <div className="flex items-center gap-2">
                                    <Image
                                        src={campaign.campaignImage || "/images/placeholder.png"}
                                        alt={campaign.campaignTitle}
                                        width={40}
                                        height={40}
                                        className="rounded object-cover"
                                    />
                                    <span className="font-medium">{campaign.campaignTitle}</span>
                                </div>
                            </label>
                        ))
                    )}
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={handleCancel} type="button">
                        Cancel
                    </Button>
                    <Button onClick={handleClone} disabled={selectedIds.length === 0} type="button">
                        Clone Selected
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CloneBriefModal; 