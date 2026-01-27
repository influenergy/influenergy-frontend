import React from 'react';

// Spinner Loader Component
const SpinnerLoader = () => (
  <div className="flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
  </div>
);

// Main Loader Component with Text
const Loader = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-6 max-w-2xl mx-auto p-4 sm:p-6 md:p-8">
      {/* Spinner */}
      <SpinnerLoader />

      {/* Main Text */}
      <p className="text-black dark:text-white text-center text-lg sm:text-xl font-semibold">
        Getting your inbox ready…
      </p>

      {/* Subtext */}
      <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base text-center">
        Fetching your latest collaborations
      </p>
    </div>
  );
};

export default Loader;
