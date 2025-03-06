import { Loader2 } from "lucide-react";

export const Loader = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-white/80">
      <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
    </div>
  );
};
