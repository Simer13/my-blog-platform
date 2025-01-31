import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between">
          {/* Column 1: Brand and About */}
          <div className="w-full sm:w-1/2 md:w-1/4 mb-6 text-center sm:text-left">
            <h3 className="text-white font-bold text-xl mb-2">Magica</h3>
            <p className="text-sm">A vision for Writers</p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="w-full sm:w-1/2 md:w-1/4 mb-6 text-center sm:text-left">
            <h3 className="text-white font-bold text-xl mb-2">Quick Links</h3>
            <ul>
              <li className="mb-2">
                <a href="#" className="hover:text-white">About Us</a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-white">Blog</a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-white">Contact Us</a>
              </li>
              <li>
                <a href="#" className="hover:text-white">Privacy Policy</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="w-full sm:w-1/2 md:w-1/4 mb-6 text-center sm:text-left">
            <h3 className="text-white font-bold text-xl mb-2">Services</h3>
            <ul>
              <li className="mb-2">
                <a href="#" className="hover:text-white">Writing</a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-white">Editing</a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-white">SEO Optimization</a>
              </li>
              <li>
                <a href="#" className="hover:text-white">Content Strategy</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Social Media */}
          <div className="w-full sm:w-1/2 md:w-1/4 mb-6 text-center sm:text-left">
            <h3 className="text-white font-bold text-xl mb-2">Follow Us</h3>
            <div className="flex justify-center sm:justify-start space-x-4">
              <a href="#" className="hover:text-white">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.28 4.28 0 001.88-2.35 8.42 8.42 0 01-2.7 1.03 4.21 4.21 0 00-7.16 3.83A12.01 12.01 0 013 4.57a4.21 4.21 0 001.3 5.62 4.2 4.2 0 01-1.9-.53v.05a4.21 4.21 0 003.38 4.12c-.54.15-1.1.18-1.67.07a4.22 4.22 0 003.94 2.93A8.44 8.44 0 012 19.6 11.92 11.92 0 008.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.35-.02-.52a8.33 8.33 0 002.03-2.12z" />
                </svg>
              </a>
              <a href="#" className="hover:text-white">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2.04c-5.52 0-10 4.48-10 10 0 4.41 3.63 8.07 8.32 9.45.61.11.83-.26.83-.58v-2.15c-3.37.73-4.1-1.58-4.1-1.58-.55-1.4-1.35-1.77-1.35-1.77-1.1-.76.08-.75.08-.75 1.22.09 1.86 1.26 1.86 1.26 1.08 1.85 2.83 1.32 3.52 1.01.11-.79.42-1.32.76-1.63-2.7-.31-5.54-1.35-5.54-6.02 0-1.33.47-2.42 1.24-3.28-.12-.3-.54-1.52.12-3.17 0 0 1.02-.33 3.34 1.26a11.62 11.62 0 013.04-.41c1.03.01 2.07.14 3.04.41 2.3-1.59 3.33-1.26 3.33-1.26.66 1.65.25 2.88.13 3.17.77.86 1.24 1.95 1.24 3.28 0 4.69-2.86 5.7-5.58 6.01.43.37.82 1.1.82 2.23v3.31c0 .32.21.69.83.57C18.37 20.1 22 16.45 22 12.04c0-5.52-4.48-10-10-10z" />
                </svg>
              </a>
              <a href="#" className="hover:text-white">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19.29 3H4.71A1.71 1.71 0 003 4.71v14.58A1.71 1.71 0 004.71 21h14.58A1.71 1.71 0 0021 19.29V4.71A1.71 1.71 0 0019.29 3zM8.19 17.1H5.73V9.85h2.46V17.1zm-1.23-8.24c-.79 0-1.43-.64-1.43-1.43s.64-1.43 1.43-1.43 1.43.64 1.43 1.43-.64 1.43-1.43 1.43zm10.05 8.24h-2.46v-3.95c0-.94-.33-1.58-1.15-1.58-.63 0-1.01.42-1.17.83-.06.15-.07.36-.07.57v4.13H9.79s.03-6.7 0-7.38h2.46v1.05c.33-.51.92-1.23 2.23-1.23 1.62 0 2.84 1.06 2.84 3.35v4.21z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-8 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Magica. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
