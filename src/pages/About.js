"use client";
import { motion } from 'framer-motion';
import StarsCanvas from '../components/ui/StarsCanvas';  // Import the StarsCanvas component

export default function About() {
  return (
    <div className="relative bg-gray-900 text-white min-h-screen py-12 overflow-hidden">
      {/* Stars Background */}
      <StarsCanvas />  {/* Starry background canvas */}

      <div className="container mx-auto px-6 lg:px-20 relative z-10"> {/* Keep content on top */}
        {/* Header Section */}
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="text-5xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
        >
          About Magica
        </motion.h1>

        {/* About Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-center"
        >
          <p className="text-xl leading-relaxed mb-8">
            Welcome to <span className="font-bold text-purple-400">Magica</span> – the place where your imagination soars and stories come to life! Our platform is a magical universe designed for dreamers, authors, and readers who believe in the power of storytelling. Whether you are writing your next big novel, creating animated visuals, or diving into the worlds created by others, Magica has the tools to make it happen.
          </p>
        </motion.div>

        {/* Services Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 p-6 rounded-lg shadow-lg text-center hover:shadow-2xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <h2 className={`text-2xl font-bold mb-4 ${service.color}`}>{service.title}</h2>
              <p className="text-gray-300">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="text-center"
        >
          <h3 className="text-3xl font-semibold mb-4">Join the Magical Journey</h3>
          <p className="text-lg text-gray-300 mb-6">
            Whether you are a creator or a reader, Magica is the place where your journey begins. Dive into the world of endless possibilities.
          </p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="/signup"
            className="inline-block px-8 py-3 bg-purple-600 text-white font-medium rounded-full hover:bg-purple-700 transition-colors"
          >
            Get Started Now
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}

// Array of services
const services = [
  {
    title: "Create Stories",
    description: "Unleash your creativity with our powerful text editor. Format, style, and perfect your masterpiece with ease.",
    color: "text-purple-400",
  },
  {
    title: "Visualize Your World",
    description: "Use our interactive whiteboard to bring your stories to life with stunning visuals, illustrations, and animations.",
    color: "text-pink-400",
  },
  {
    title: "Engage Readers",
    description: "Share your stories with a vibrant community of readers, receive feedback, and connect with fellow authors.",
    color: "text-blue-400",
  },
  {
    title: "Collaborate",
    description: "Work with other creators to co-author stories, edit, or help them visualize their ideas with collaborative tools.",
    color: "text-green-400",
  },
  {
    title: "Magic Wand",
    description: "Add a little magic to your storytelling! Our magic wand lets you sprinkle stardust and sparkles onto your content.",
    color: "text-yellow-400",
  },
  {
    title: "Universe of Stories",
    description: "Immerse yourself in a universe of endless stories created by users just like you, across genres and themes.",
    color: "text-red-400",
  }
];
