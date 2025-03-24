import React from "react";
import { PieCharts } from "@/components/common/Piechart";
interface MatchReasonProps {
  value: string;
}

const MatchReason: React.FC<MatchReasonProps> = ({ value }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h2 className="text-lg md:text-xl font-bold mb-4">Match Assessment</h2>
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="md:w-1/4 flex-shrink-0">
          <PieCharts value={value || "70"} />
        </div>
        <div className="md:w-3/4">
          <h3 className="text-base md:text-lg font-semibold mb-2">
            Why This Creator Matches Your Brand
          </h3>
          <p className="text-sm md:text-base text-gray-700">
            This creator is a great match for your brand, as their content
            resonates with your target audience and seamlessly fits your
            advertising style. Their engagement, tone, and creativity align with
            your brand’s messaging, ensuring an authentic and effective
            collaboration.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MatchReason;
