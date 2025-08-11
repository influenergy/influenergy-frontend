"use client";
import { Card } from '@/components/ui/card';
import React, { useState } from 'react';
import { Star } from 'lucide-react';

function Page() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [suggestion, setSuggestion] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Rating:', rating);
    console.log('Suggestion:', suggestion);
    // Here you can handle sending data to backend
  };

  return (
    <div className="p-6 mx-auto">
      <h1 className="text-3xl font-bold mb-4">Feedback</h1>

      {/* Rating Section */}
      <Card className="p-4 mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">
          Rate your experience
        </h2>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={28}
              className={`cursor-pointer transition-colors ${
                (hover || rating) >= star
                  ? 'fill-primary stroke-primary'
                  : 'stroke-primary/50 fill-transparent'
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
        <h2 className="text-xl font-semibold mb-2 text-gray-700">
          Do you have any suggestions to improve our product?
        </h2>
        <hr className="mt-2 mb-6 opacity-60" />

        <form onSubmit={handleSubmit}>
          <textarea
            rows={6}
            placeholder="Enter your suggestions here..."
            required
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
            className="border rounded-lg p-2 focus:ring focus:outline-none resize-none w-full"
          />
          <button
            type="submit"
            className="bg-primary text-white py-2 rounded-lg mt-4 hover:bg-primary/90 transition w-full"
          >
            Submit
          </button>
        </form>
      </Card>
    </div>
  );
}

export default Page;
