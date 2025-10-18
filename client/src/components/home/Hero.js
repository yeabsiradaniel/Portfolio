// Import necessary libraries and components
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber'; // For rendering 3D scenes
import { OrbitControls } from '@react-three/drei'; // 3D controls
import { motion } from 'framer-motion'; // For animations
import { useNavigate } from 'react-router-dom'; // For navigation
import Model from '../3d/Model'; // The 3D model component
import ErrorBoundary from '../common/ErrorBoundary'; // Error boundary for the 3D canvas

/**
 * The Hero component for the home page.
 * It features a 3D background, a headline, a sub-headline, a brief bio, and a call-to-action button.
 */
const Hero = () => {
  const navigate = useNavigate();

  // Function to navigate to the projects page when the button is clicked
  const handleNavigate = () => {
    navigate('/projects');
  };

  return (
    // Main container, relative positioning to layer content on top of the 3D background
    <div className="relative h-screen w-full bg-transparent transition-colors duration-800 ease-in-out">
      
      {/* 3D Background Canvas */}
      <div className="fixed top-0 left-0 w-full h-full z-0">
        <ErrorBoundary>
          {/* The Canvas component is where the 3D scene is rendered. */}
          <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
            {/* Suspense provides a fallback while the 3D model is loading. */}
            <Suspense fallback={null}>
              {/* Lighting for the 3D scene */}
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <pointLight position={[-10, -10, -10]} />
              
              {/* The 3D model itself */}
              <Model />
              
              {/* OrbitControls allow the user to interact with the 3D scene (e.g., rotate, zoom). */}
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.0} />
            </Suspense>
          </Canvas>
        </ErrorBoundary>
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 h-full flex">
        {/* Left side spacer (for large screens) */}
        <div className="hidden lg:block lg:w-1/4"></div>

        {/* Right side with the main text content */}
        <div className="w-full lg:w-3/4 flex items-center justify-center p-8">
          <div className="max-w-4xl w-full text-right">
            {/* Animation container for the text content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Main Headline */}
              <h1 className="text-8xl md:text-9xl font-serif font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-300">
                Yeabsira Daniel
              </h1>
              {/* Sub-headline */}
              <h2 className="text-3xl md:text-4xl font-sans font-semibold mb-6 text-blue-500">
                Full-Stack & Mobile App Developer
              </h2>
              {/* Bio/Introduction */}
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 font-sans max-w-2xl ml-auto transition-colors duration-300">
                I build modern mobile and web applications using Flutter, MERN stack, and Python automation. Passionate about turning ideas into clean, scalable, real-world solutions.
              </p>
              {/* Call-to-action button */}
              <motion.button
                onClick={handleNavigate}
                whileHover={{ scale: 1.05 }} // Animation on hover
                whileTap={{ scale: 0.95 }}   // Animation on click
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-10 rounded-full text-lg transition-colors duration-300 font-sans"
              >
                View My Work
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
