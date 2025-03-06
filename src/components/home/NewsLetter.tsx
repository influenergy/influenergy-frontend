import React from "react";

const NewsLetter = () => {
  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 relative w-full">
      <div className="flex max-w-7xl mx-auto">
        <div className="text-left mb-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Subscribe to our Newsletter
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Subscribe for Updates: Stay informed about the latest brand updates,
            influencers and announcements by subscribing to our newsletter.
          </p>
        </div>

        <div className="mt-8">
          <form className="sm:max-w-xl mx-auto">
            <div className="sm:flex sm:gap-3">
              <div className="min-w-0 flex-1">
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="block w-full px-4 py-3 rounded-md border border-gray-300 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                  required
                />
              </div>
              <div className="mt-3 sm:mt-0">
                <button
                  type="submit"
                  className="block w-full py-3 px-6 rounded-md shadow bg-primary text-white font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
