"use client";
import { useState } from 'react';

export default function Contact() {
  const [open, setOpen] = useState<number | null>(null);

  const toggleFAQ = (index : number) => {
    setOpen(open === index ? null : index);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-800 text-white">
      {/* Contact Form Section */}
      <div className="w-full md:w-2/3 flex rounded-lg shadow-lg overflow-hidden mt-16">
        {/* Left Section (Contact Information) */}
        <div className="w-full md:w-1/2 bg-gradient-to-r from-purple-800 to-blue-900 p-8 text-white">
          <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
          <p className="text-lg mb-4">Feel free to reach out to us via the contact form or use the information below.</p>
          
          <div className="flex items-center space-x-4 mb-6">
            <div className="text-xl">
              <span role="img" aria-label="phone">📞</span>
            </div>
            <p className="text-lg">+1 (555) 123-4567</p>
          </div>

          <div className="flex items-center space-x-4 mb-6">
            <div className="text-xl">
              <span role="img" aria-label="email">📧</span>
            </div>
            <p className="text-lg">contact@example.com</p>
          </div>

          <div className="flex items-center space-x-4 mb-6">
            <div className="text-xl">
              <span role="img" aria-label="location">📍</span>
            </div>
            <p className="text-lg">1234 Some St, City, Country</p>
          </div>
        </div>

        {/* Right Section (Contact Form) */}
        <div className="w-full md:w-1/2 bg-white p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Get In Touch</h2>
          <form action="#" method="POST">
            <div className="mb-4">
              <label className="block text-lg text-gray-700 mb-2" htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-lg text-gray-700 mb-2" htmlFor="email">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-lg text-gray-700 mb-2" htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="w-full md:w-2/3 px-8 mt-16">
        <h2 className="text-4xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div className="border-b border-gray-600">
            <div className="flex justify-between items-center p-4 cursor-pointer" onClick={() => toggleFAQ(1)}>
              <h3 className="text-2xl font-semibold text-gray-200">How can I contribute to the blog?</h3>
              <span className="text-xl text-gray-500">{open === 1 ? '-' : '+'}</span>
            </div>
            {open === 1 && (
              <div className="px-4 py-2 bg-gray-700 text-lg text-gray-300">
                We welcome guest posts! To contribute, simply reach out via our contact form or email. We will get back to you with submission guidelines and content criteria.
              </div>
            )}
          </div>

          <div className="border-b border-gray-600">
            <div className="flex justify-between items-center p-4 cursor-pointer" onClick={() => toggleFAQ(2)}>
              <h3 className="text-2xl font-semibold text-gray-200">Do you offer advertising opportunities?</h3>
              <span className="text-xl text-gray-500">{open === 2 ? '-' : '+'}</span>
            </div>
            {open === 2 && (
              <div className="px-4 py-2 bg-gray-700 text-lg text-gray-300">
                Yes, we offer limited advertising space on our blog. Please get in touch with our team for more details on how you can advertise with us.
              </div>
            )}
          </div>

          <div className="border-b border-gray-600">
            <div className="flex justify-between items-center p-4 cursor-pointer" onClick={() => toggleFAQ(3)}>
              <h3 className="text-2xl font-semibold text-gray-200">How can I contact the blog authors?</h3>
              <span className="text-xl text-gray-500">{open === 3 ? '-' : '+'}</span>
            </div>
            {open === 3 && (
              <div className="px-4 py-2 bg-gray-700 text-lg text-gray-300">
                You can contact our authors directly via the contact form on this page or leave a comment under their posts. They would love to hear from you!
              </div>
            )}
          </div>

          <div className="border-b border-gray-600">
            <div className="flex justify-between items-center p-4 cursor-pointer" onClick={() => toggleFAQ(4)}>
              <h3 className="text-2xl font-semibold text-gray-200">What topics does your blog cover?</h3>
              <span className="text-xl text-gray-500">{open === 4 ? '-' : '+'}</span>
            </div>
            {open === 4 && (
              <div className="px-4 py-2 bg-gray-700 text-lg text-gray-300">
                Our blog covers a wide range of topics including technology, lifestyle, education, and more. We aim to provide engaging content for a variety of readers.
              </div>
            )}
          </div>

          <div className="border-b border-gray-600">
            <div className="flex justify-between items-center p-4 cursor-pointer" onClick={() => toggleFAQ(5)}>
              <h3 className="text-2xl font-semibold text-gray-200">Can I request a blog post on a specific topic?</h3>
              <span className="text-xl text-gray-500">{open === 5 ? '-' : '+'}</span>
            </div>
            {open === 5 && (
              <div className="px-4 py-2 bg-gray-700 text-lg text-gray-300">
                Absolutely! We love hearing suggestions from our readers. You can send us your request through the contact form, and we will consider it for future posts.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
