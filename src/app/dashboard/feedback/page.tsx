"use client";
import { Card } from "@/components/ui/card";
import { useAppSelector } from "@/store";
import { Star } from "lucide-react";
import React, { useState } from "react";

export default function FeedbackPage() {
  const user = useAppSelector((state) => state.auth.user);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [suggestion, setSuggestion] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.fullName || !user?.email) {
      alert("Please log in to submit feedback.");
      return;
    }

    const name = user.fullName;
    const email = user.email;

    const subject = encodeURIComponent("User Feedback");
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nRating: ${rating}/5\n\nFeedback:\n${suggestion}`
    );

    // Trigger default mail client
    window.location.href = `mailto:support@influenergy.co?subject=${subject}&body=${body}`;
  };

  return (
    <div className="p-6 mx-auto">
      <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-4 dark:text-white">Send Us Your Feedback</h2>

      {/* Rating Section */}
      <Card className="p-4 mb-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-white">
          Rate your experience
        </h3>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={28}
              className={`cursor-pointer transition-colors ${
                (hover || rating) >= star
                  ? "fill-primary stroke-primary"
                  : "stroke-primary/50 fill-transparent"
              }`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            />
          ))}
        </div>
      </Card>

      {/* Suggestions Section */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-white">
          Do you have any suggestions to improve our product?
        </h3>
        <hr className="mt-2 mb-6 opacity-60" />

        <form onSubmit={handleSubmit} className="space-y-5">
          <textarea
            rows={6}
            placeholder="Enter your suggestions here..."
            required
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
            className="border rounded-lg p-2 focus:ring focus:outline-none resize-none w-full dark:bg-gray-300 dark:text-gray-700"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-2 rounded-lg transition"
            >
              Submit Feedback
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}
