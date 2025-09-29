"use client"
import React, { useState } from 'react';
import { UserCog, ChevronDown, ChevronUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useMutation } from '@tanstack/react-query';
import { userApi } from '@/services/userServices';
import { useToast } from '@/hooks/use-toast';
import { useAppSelector } from '@/store';
import type { AxiosError } from 'axios';

function Page() {
  const [faqs, setFaqs] = useState([
    {
      question: "How do I reset my password?",
      answer: "Go to your account settings and click on 'Reset Password'. You'll receive an email with further instructions.",
      open: false,
    },
    {
      question: "Where can I track my orders?",
      answer: "You can track your orders in the 'My Orders' section under your account dashboard.",
      open: false,
    },
    {
      question: "How do I contact customer service?",
      answer: "Fill out the contact form on this page, or email us directly at support@example.com.",
      open: false,
    },
  ]);

  const toggleFaq = (index: number) => {
    setFaqs((prev) =>
      prev.map((faq, i) =>
        i === index ? { ...faq, open: !faq.open } : faq
      )
    );
  };

  // const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const userType = useAppSelector((state) => state.auth.userType) as string | null;
  const { toast } = useToast();

  const { mutate: submitSupport, isPending } = useMutation({
    mutationFn: (payload: { message: string; userType: string }) =>
      userApi.submitSupportRequest(payload),
    onSuccess: () => {
      toast({ title: "Request submitted", description: "We'll get back within 48 hours." });
      // setSubject("");
      setMessage("");
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      const description = error.response?.data?.message || "Please try again later.";
      toast({ variant: "destructive", title: "Submission failed", description });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userType) {
      toast({ variant: "destructive", title: "User type missing", description: "Please log in again." });
      return;
    }
    if (!message.trim()) {
      toast({ variant: "destructive", title: "All fields required", description: "Enter message." });
      return;
    }
    submitSupport({ message: message.trim(), userType });
  };

  return (
    <div className="p-6  mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <UserCog size={32} className="text-blue-600" />
        <h1 className="text-3xl font-bold">Support</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Section */}
        <section className="">
          <Card className='p-6'>

            <h2 className="text-xl font-semibold mb-2 text-gray-700 dark:text-white">
              For any other queries, write to us!
            </h2>
            <p className="text-gray-500 mb-4 dark:text-white">
              Our team will get back to you within 48 hours.
            </p>
            <hr className="mt-2 mb-6 opacity-60" />
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              {/* <input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="border rounded-lg p-2 focus:ring focus:outline-none dark:bg-gray-300 dark:text-gray-700"
              /> */}

              <textarea
                rows={6}
                placeholder="Enter your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="border rounded-lg p-2 focus:ring focus:outline-none resize-none dark:bg-gray-100 dark:text-gray-900"
              />
              <button
                type="submit"
                disabled={isPending}
                className="bg-primary text-white py-2 rounded-lg  transition disabled:opacity-70"
              >
                {isPending ? "Submitting..." : "Submit"}
              </button>
            </form>
          </Card>
        </section>

        {/* FAQ Section */}
        <section className="">
          <Card className='p-6'>

            <h2 className="text-xl font-semibold mb-2 text-gray-700 dark:text-white">FAQs</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border rounded-lg">
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="flex justify-between items-center w-full p-4 text-left font-medium text-gray-700 dark:text-white"
                  >
                    {faq.question}
                    {faq.open ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </button>
                  {faq.open && (
                    <div className="px-4 pb-4 text-gray-600 dark:text-white">{faq.answer}</div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}

export default Page;
