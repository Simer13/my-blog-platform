import React from 'react';


const Newsletter = () => (
  <div className="bg-gray-800 py-16 px-6 text-white">
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="text-4xl font-bold mb-4">Subscribe to Our Newsletter</h2>
      <p className="text-lg mb-8">
        Stay updated with our latest news, offers, and more.
      </p>
      <form className="flex justify-center">
        <input
          type="email"
          placeholder="Enter your email"
          className="px-4 py-2 rounded-l-lg text-black"
        />
        <button
          type="submit"
          className="bg-indigo-600 px-6 py-2 rounded-r-lg hover:bg-indigo-700"
        >
          Subscribe
        </button>
      </form>
    </div>
  </div>
);



export default Newsletter;
