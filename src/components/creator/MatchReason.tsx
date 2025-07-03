import React from "react";
import { PieCharts } from "@/components/common/Piechart";
import { Button } from "../ui/button";
interface MatchReasonProps {
  value: string;
  summary: string;
  isSummaryLoading: boolean;
  summaryError: Error | null;
  refetch: () => void;
}

const MatchReason: React.FC<MatchReasonProps> = ({
  value,
  summary,
  isSummaryLoading,
  summaryError,
  refetch,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <h2 className="text-lg md:text-xl font-bold mb-4">Match Assessment</h2>
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="md:w-1/4 flex-shrink-0">
          <PieCharts value={value || "0"} />
        </div>
        <div className="md:w-3/4">
          <h3 className="text-base md:text-lg font-semibold mb-2">
            Why This Creator Matches Your Brand
          </h3>
          {isSummaryLoading && (
            <p className="text-sm md:text-base text-gray-500">
              Summary Loading...
            </p>
          )}
          {summaryError && (
            <div className="flex flex-col items-start gap-2">
              <p className="text-sm text-red-500">
                There was an error fetching the summary. Please try refreshing
                the page or contact support if the issue persists.
              </p>
              <Button
                className="text-sm text-primary hover:text-primary/90 bg-white border border-primary hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                onClick={refetch}
              >
                Retry
              </Button>
            </div>
          )}
          {summary && (
            <p className="text-sm md:text-base text-gray-700">{summary}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchReason;
