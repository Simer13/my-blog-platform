const withMDX = require('@next/mdx')()
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  // Optionally, add any other Next.js config below
  images: {
    domains: ['images.unsplash.com', 'plus.unsplash.com', 'tailwindui.com', 'source.unsplash.com']
, // Allow Unsplash images
  },
}
 
module.exports = withMDX(nextConfig)