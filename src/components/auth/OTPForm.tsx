import React, { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";// your existing UI components
import { Mail } from "lucide-react";
// import { api } from "@/services/api";
import { useAppSelector } from "@/store";
import { authApi } from "@/services/authServices";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/features/authSlice";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const OTPLoginForm = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [resendSeconds, setResendSeconds] = useState(0);
    // const [emailLoading, setEmailLoading] = useState(false);
    // const [otpLoading, setOtpLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const { toast } = useToast();
    const router = useRouter();

    const userType = useAppSelector((state) => state.auth.userType);
    const dispatch = useDispatch();

    // simple realtime email validation
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

    const sendOtpMutation = useMutation({
        mutationFn: async ({ email, userType }: { email: string; userType: string }) => {
            if (!userType) throw new Error("Please select a user type before sending OTP.");
            return authApi.sendOtp(email, userType);
        },
        onSuccess: () => {
            setIsOtpSent(true);
            setMessage(`OTP ${resendSeconds > 0 ? "resent" : "sent"} to your email`);
            setError(null);
            setResendSeconds(60); // reset timer each time
        },
        onError: (error: unknown) => {
            let message = "Failed to send OTP";
            if (typeof error === "object" && error !== null) {
                const axiosError = error as { response?: { data?: { message?: string } }; code?: string; message?: string };
                message =
                    axiosError.response?.data?.message ||
                    (axiosError.code === "ERR_NETWORK" ? "Network error. Please check your connection." : axiosError.message || message);
            }
            setError(message);
        },
    });


    const verifyOtpMutation = useMutation({
        mutationFn: async ({ email, otp, userType }: { email: string; otp: string, userType: string }) => {
            return authApi.verifyLoginOtp(email, otp, userType);
        },
        onSuccess: (data) => {
            console.log(data, 'data from otp')
            dispatch(setCredentials({ user: data?.data }));
            toast({ title: "Login Successful 🎉", description: "Redirecting..." });
            router.replace("/dashboard");
            setMessage(data?.message || "OTP verified successfully");
            setError(null);
        },
        onError: (error: unknown) => {
            let message = "Invalid OTP";
            if (typeof error === "object" && error !== null) {
                const axiosError = error as { response?: { data?: { message?: string } }; code?: string; message?: string };
                message =
                    axiosError.response?.data?.message ||
                    (axiosError.code === "ERR_NETWORK" ? "Network error. Please check your connection." : axiosError.message || message);
            }
            setError(message);
        },
    });

    // first-time send
    const handleSendOtp = () => {
        if (!email || !isEmailValid) return;
        setMessage(null);
        setError(null);
        sendOtpMutation.mutate({ email, userType: userType || "" });
    };

    // resend
    const handleResendOtp = () => {
        if (!email) return;
        setMessage(null);
        setError(null);
        sendOtpMutation.mutate({ email, userType: userType || "" });
    };

    // const handleResendOtp = () => {
    //     if (!email) return;
    //     setMessage(null);
    //     setError(null);
    //     sendOtpMutation.mutate({ email, userType: userType || "" }, {
    //         onSuccess: () => {
    //             setMessage("OTP resent to your email");
    //             setError(null);
    //             setResendSeconds(60);
    //         }
    //     } as never);
    // };

    useEffect(() => {
        if (resendSeconds <= 0) return;
        const timerId = setInterval(() => {
            setResendSeconds((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timerId);
    }, [resendSeconds]);

    const handleVerifyOtp = (e: React.FormEvent) => {
        e.preventDefault();
        if (!otp || otp.length !== 6) return;
        setMessage(null);
        setError(null);
        verifyOtpMutation.mutate({ email, otp, userType: userType || "" });
    };

    return (
        <form onSubmit={handleVerifyOtp} className="space-y-5 sm:space-y-5">
            <motion.div
                className="space-y-4 sm:space-y-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                {/* Email Input + Send OTP button */}
                <div className="flex gap-2 items-center">
                    <div className="flex-1">
                        <Label htmlFor="email" className="text-sm sm:text-base mb-1 block">
                            Email
                        </Label>
                        <div className="relative">
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter Email Address"
                                className={`w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-1 ${email && !isEmailValid ? "border-red-500 focus:ring-red-500" : "focus:ring-primary"}`}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                aria-invalid={!!email && !isEmailValid}
                                disabled={sendOtpMutation.isPending || isOtpSent}
                            />
                            <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            {email && !isEmailValid && (
                                <p className="mt-1 text-xs text-red-600">Enter a valid email address</p>
                            )}
                        </div>
                    </div>
                    <button
                        type="button"
                        className="mt-6 h-10 whitespace-nowrap px-4 rounded-lg border bg-primary text-white disabled:opacity-70"
                        onClick={handleSendOtp}
                        disabled={sendOtpMutation.isPending || !email || !isEmailValid || isOtpSent}
                    >
                        {sendOtpMutation.isPending ? "Sending..." : isOtpSent ? "Sent" : "Send OTP"}
                    </button>
                </div>

                {/* OTP Input */}
                {isOtpSent && (
                    <div className="md:w-3xl">
                        <Label htmlFor="otp" className="text-sm sm:text-base mb-1 block">
                            Enter OTP
                        </Label>
                        <OTPInput
                            inputStyle={{

                                borderRadius: "8px",
                                width: window.innerWidth < 640 ? "30px" : "54px", // 📱 smaller on mobile
                                height: window.innerWidth < 640 ? "30px" : "54px",
                                fontSize: window.innerWidth < 640 ? "14px" : "16px",
                                color: "#000",
                                fontWeight: "400",
                                caretColor: "blue",
                                transition: "all 0.2s ease-in-out"
                            }}
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            inputType="text"
                            renderSeparator={<span className="mx-2">-</span>}
                            renderInput={(props) => (
                                <input
                                    {...props}
                                    className="w-24 sm:w-24 md:w-28 h-12 border rounded text-center focus:outline-none focus:ring-1 focus:ring-primary text-lg"
                                />
                            )}
                            shouldAutoFocus
                        />
                        <div className="mt-3 flex items-center justify-between text-sm">
                            <span className="text-gray-500">Didn’t receive the code?</span>
                            <button
                                type="button"
                                onClick={handleResendOtp}
                                disabled={sendOtpMutation.isPending || resendSeconds > 0}
                                className="text-primary disabled:opacity-60"
                            >
                                {sendOtpMutation.isPending
                                    ? "Resending..."
                                    : resendSeconds > 0
                                        ? `Resend in ${resendSeconds}s`
                                        : "Resend OTP"}
                            </button>
                        </div>

                    </div>
                )}

                {(message || error) && (
                    <div className={error ? "text-red-600 text-sm" : "text-green-600 text-sm"}>
                        {error || message}
                    </div>
                )}
            </motion.div>

            {/* Verify OTP button */}
            {isOtpSent && (
                <motion.div
                    className="space-y-4 sm:space-y-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    <button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary transition-all py-4 sm:py-5 text-white text-base sm:text-lg font-semibold rounded-lg tracking-wider sm:tracking-widest disabled:opacity-70"
                        disabled={verifyOtpMutation.isPending || otp.length !== 6}
                    >
                        {verifyOtpMutation.isPending ? "Verifying..." : "Verify"}
                    </button>
                </motion.div>
            )}
        </form>
    );
};

export default OTPLoginForm;
