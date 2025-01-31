import React from "react";
import Image from "next/image";

const Bento = () => {
  return (
    <div className="bg-gray-50 py-12 sm:py-24">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-center text-base font-semibold text-indigo-600">
          Create & Share Your Stories
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-pretty text-center text-3xl font-medium tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
          Your journey to becoming a great writer starts here.
        </p>

        {/* Responsive Bento Grid Layout */}
        <div className="mt-10 grid gap-6 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2 sm:gap-8">
          {/* First Grid Item */}
          <div className="relative lg:row-span-2 animate-fadeIn">
            <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-lg lg:rounded-l-[calc(2rem+1px)]">
              <div className="px-6 pb-3 pt-6 sm:px-8 sm:pb-0 sm:pt-8">
                <p className="mt-2 text-base font-medium tracking-tight text-gray-950 sm:text-lg">
                  User-Friendly Interface
                </p>
                <p className="mt-2 text-sm text-gray-600 sm:text-base">
                  Write, edit, and publish with ease using our intuitive editor designed for bloggers.
                </p>
              </div>
              <div className="relative min-h-[20rem] sm:min-h-[30rem] w-full grow">
                <div className="absolute inset-x-6 bottom-0 top-6 sm:inset-x-10 sm:top-10 overflow-hidden rounded-t-lg bg-gray-900 shadow-2xl">
                  <Image
                    className="w-full h-full object-cover"
                    src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="User-Friendly Interface"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-l-[2rem]"></div>
          </div>

          {/* Second Grid Item */}
          <div className="relative animate-fadeIn delay-200">
            <div className="absolute inset-px rounded-lg bg-white"></div>
            <div className="relative flex flex-col overflow-hidden rounded-lg">
              <div className="px-6 pt-6 sm:px-8 sm:pt-8">
                <p className="mt-2 text-base font-medium tracking-tight text-gray-950 sm:text-lg">
                  SEO Optimization
                </p>
                <p className="mt-2 text-sm text-gray-600 sm:text-base">
                  Enhance your blog visibility with built-in SEO tools and analytics.
                </p>
              </div>
              <div className="flex flex-1 items-center justify-center px-6 sm:px-8">
                <Image
                  className="w-full max-w-xs"
                  src="https://plus.unsplash.com/premium_photo-1683288537184-7ef228ca6820?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8U0VPJTIwb3B0aW1pemF0aW9ufGVufDB8fDB8fHww"
                  alt="SEO Optimization"
                  width={300}
                  height={200}
                />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5"></div>
          </div>

          {/* Third Grid Item */}
          <div className="relative lg:col-start-2 lg:row-start-2 animate-fadeIn delay-400">
            <div className="absolute inset-px rounded-lg bg-white"></div>
            <div className="relative flex flex-col overflow-hidden rounded-lg">
              <div className="px-6 pt-6 sm:px-8 sm:pt-8">
                <p className="mt-2 text-base font-medium tracking-tight text-gray-950 sm:text-lg">
                  Secure Hosting
                </p>
                <p className="mt-2 text-sm text-gray-600 sm:text-base">
                  Your content is safe with our reliable and secure hosting solutions.
                </p>
              </div>
              <div className="flex flex-1 items-center">
                <Image
                  className="h-32 sm:h-40 object-cover object-center"
                  src="https://plus.unsplash.com/premium_photo-1701179596614-9c64f50cda76?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGVuZCUyMHRvJTIwZW5kJTIwZW5jcnlwdGlvbnxlbnwwfHwwfHx8MA%3D%3D"
                  alt="Secure Hosting"
                  width={500}
                  height={300}
                />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5"></div>
          </div>

          {/* Fourth Grid Item */}
          <div className="relative lg:row-span-2 animate-fadeIn delay-600">
            <div className="absolute inset-px rounded-lg bg-white lg:rounded-r-[2rem]"></div>
            <div className="relative flex flex-col overflow-hidden rounded-lg lg:rounded-r-[calc(2rem+1px)]">
              <div className="px-6 pb-3 pt-6 sm:px-8 sm:pb-0 sm:pt-8">
                <p className="mt-2 text-base font-medium tracking-tight text-gray-950 sm:text-lg">
                  Rich Media Support
                </p>
                <p className="mt-2 text-sm text-gray-600 sm:text-base">
                  Engage your audience with images, videos, and interactive content.
                </p>
              </div>
              <div className="relative min-h-[20rem] sm:min-h-[30rem] w-full grow">
                <div className="absolute inset-x-6 bottom-0 top-6 sm:inset-x-10 sm:top-10 overflow-hidden rounded-lg bg-gray-900 shadow-2xl">
                  <Image
                    className="w-full h-full object-cover"
                    src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHJpY2glMjBtZWRpYSUyMHN1cHBvcnQlMjBmb3IlMjB3ZWJzaXRlfGVufDB8fDB8fHww"
                    alt="Rich Media Support"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-r-[2rem]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bento;
