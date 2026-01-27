import { Loader2 } from "lucide-react";

export const TabLoading = () => (
  <div className="h-[50vh] w-full flex items-center justify-center">
    <div className="text-center space-y-4">
      <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
      <p className="text-gray-600">Loading content...</p>
    </div>
  </div>
);
 