import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FieldError, UseFormRegister } from "react-hook-form";

interface SocialLinkInputProps {
  name: "instagram" | "snapchat" | "tiktok";
  icon: string;
  register: UseFormRegister<{
    instagram: string;
    snapchat: string;
    tiktok: string;
  }>;
  error?: FieldError;
  value?: string;
}

export const SocialLinkInput = ({
  name,
  icon,
  register,
  error,
  value,
}: SocialLinkInputProps) => {
  return (
    <div className="w-full flex flex-col lg:flex-row items-start md:justify-between gap-4 p-4 md:p-6 border-b bg-white">
      {/* Platform Info */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 relative shrink-0">
          <Image
            src={`/images/UserProfile/${icon}`}
            fill
            className="object-contain"
            alt={name}
          />
        </div>
        <div>
          <p className="text-base font-semibold capitalize">{name}</p>
          <p className="text-sm text-muted-foreground">
            {value ? "Connected" : "Not connected"}
          </p>
        </div>
      </div>

      {/* Input Section */}
      <div className="w-full lg:w-auto flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center  gap-2 w-full">
          <input
            {...register(name)}
            className={`w-full lg:w-[300px] h-10 px-3 border rounded-md text-sm
                focus:outline-none focus:ring-2 focus:ring-primary/20
                ${error ? "border-red-500" : "border-input"}
              `}
            placeholder={`Add your ${name} profile`}
          />

          <Button
            type="button"
            variant="default"
            className="bg-primary text-white hover:bg-primary/90 shrink-0"
            size="lg"
          >
            {value ? "Update" : "Add"}
          </Button>
        </div>
        {error && <p className="text-xs text-destructive">{error.message}</p>}
      </div>
    </div>
  );
};
