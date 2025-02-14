import React from "react";
import Image from "next/image";
import Link from "next/link";

const EmailVerify = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center relative">
      <div className="flex justify-center mb-4">
        <Image src="/images/emailVerification.png" width={300} height={300} alt="Email icon" className="text-blue-500" /> {/* Email icon */}
      </div>
      <h2 className="text-4xl font-bold text-gray-900 my-10">Check Your Inbox!</h2>
      <div className="text-center">
        <p className="text-xl text-gray-600 mb-4">
        We’ve sent a verification email to one@labventures.com. When you’re <br/> ready, follow the steps to verify your account
        </p>
        <Link href="/" className="text-blue-500 italic underline">Back to Home</Link>
      </div>
      <Image src="/images/line1.png" width={300} height={300} alt="Email icon" className="absolute top-0 right-0" />
      <Image src="/images/line1.png" width={300} height={300} alt="Email icon" className="absolute bottom-0 -left-10" />
    </div>
  );
};

export default EmailVerify;