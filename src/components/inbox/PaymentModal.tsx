import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface PaymentModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  handleCollectPayment: (data: FormData) => Promise<void>;
}

interface FormData {
  fullName: string;
  email: string;
  selectedMethod: string;
  paymentDetail: string;
}

const paymentMethods = [
  { label: "Apple Pay", key: "applepay", value: "Apple Pay ID / Email" },
  { label: "Amazon Pay", key: "amazonpay", value: "Amazon Pay Phone / Email" },
  { label: "Cash App", key: "cashapp", value: "Cash App $Cashtag" },
  { label: "Google Pay", key: "googlepay", value: "Google Pay UPI / Phone" },
  { label: "Stripe", key: "stripe", value: "Stripe Email" },
  { label: "PayPal", key: "paypal", value: "PayPal Email" },
  { label: "Venmo", key: "venmo", value: "Venmo @username" },
  { label: "Zelle", key: "zelle", value: "Zelle Email / Phone" },
];

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onOpenChange,
  handleCollectPayment,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      selectedMethod: "",
      paymentDetail: "",
    },
  });

  const selectedMethod = watch("selectedMethod");

  if (!isOpen) return null;

  const onSubmit = (data: FormData) => {
    const payload = {
      fullName: data.fullName,
      email: data.email,
      selectedMethod: data.selectedMethod,
      paymentDetail: data.paymentDetail,
    };
    handleCollectPayment(payload);
    reset();
    onOpenChange(false);
  };

  const handleCancel = () => {
    reset();
    onOpenChange(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <h2 className="text-xl font-bold text-gray-900">Add Payment Details</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-3">
            <Label className="text-sm font-medium text-gray-700">
              Full Name
            </Label>
            <Input
              className="mt-2"
              placeholder="e.g. John Doe"
              {...register("fullName", { required: true })}
            />
            {errors.fullName && (
              <p className="text-sm text-red-500 mt-1">
                Full name is required.
              </p>
            )}
          </div>

          <div className="mt-3">
            <Label className="text-sm font-medium text-gray-700">
              Email (For contact)
            </Label>
            <Input
              className="mt-2"
              placeholder="e.g. example@gmail.com"
              {...register("email", {
                required: true,
                pattern: /^\S+@\S+\.\S+$/,
              })}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                Valid email is required.
              </p>
            )}
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <div>
              <p>Preferred Payment Method</p>
              <Label className="text-sm text-gray-500">(select one)</Label>
            </div>
            <RadioGroup
              onValueChange={(val) => setValue("selectedMethod", val)}
              defaultValue=""
            >
              {paymentMethods.map((method, index) => (
                <div key={method.key} className="flex items-center space-x-2">
                  <RadioGroupItem value={method.key} id={`r${index}`} />
                  <Label htmlFor={`r${index}`}>{method.label}</Label>
                </div>
              ))}
            </RadioGroup>
            {errors.selectedMethod && (
              <p className="text-sm text-red-500 mt-1">
                Select a payment method.
              </p>
            )}
          </div>

          {selectedMethod && (
            <div className="mt-4">
              <Label className="text-sm font-medium text-gray-700">
                {paymentMethods.find((pm) => pm.key === selectedMethod)?.label}{" "}
                Details
              </Label>
              <Input
                className="mt-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 transition-all"
                placeholder={
                  paymentMethods.find((pm) => pm.key === selectedMethod)?.value
                }
                {...register("paymentDetail", { required: true })}
              />
              {errors.paymentDetail && (
                <p className="text-sm text-red-500 mt-1">
                  Payment detail is required.
                </p>
              )}
            </div>
          )}

          <p className="text-xs text-gray-500 mt-3">
            Payment processor fees may be subject to deduction from your
            payout
          </p>

          <div className="mt-6 flex justify-end space-x-3">
            <Button
              type="button"
              variant="ghost"
              onClick={handleCancel}
              className="text-gray-600 hover:text-gray-800"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary hover:bg-indigo-700 text-white transition-colors"
            >
              Request Payment
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
