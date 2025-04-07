"use client";
import { useAppSelector } from "@/store";
import { useState } from "react";

export default function FeedbackPage() {
  const user = useAppSelector((state) => state.auth.user);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.fullName) {
      alert("Please log in to submit feedback.");
      return;
    }
    if (!user?.email) {
      alert("Please log in to submit feedback.");
      return;
    }
    const name = user?.fullName;
    const email = user?.email;

    const subject = encodeURIComponent("User Feedback");
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nFeedback:\n${feedback}`
    );

    // Trigger mail client
    window.location.href = `mailto:support@influenergy.co?subject=${subject}&body=${body}`;
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-2xl p-8 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">
        Send Us Your Feedback
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="feedback"
            className="block text-sm font-medium text-gray-700"
          >
            Feedback
          </label>
          <textarea
            id="feedback"
            rows={5}
            className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Write your feedback here..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-primary hover:bg-indigo-700 text-white font-medium px-6 py-2 rounded-lg transition"
          >
            Submit Feedback
          </button>
        </div>
      </form>
    </div>
  );
}
