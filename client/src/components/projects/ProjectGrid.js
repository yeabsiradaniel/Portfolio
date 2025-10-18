// Import necessary libraries and components
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // For making HTTP requests
import ProjectCard from './ProjectCard'; // The card component for each project
import ProjectModal from './ProjectModal'; // The modal component for detailed view
import { motion } from 'framer-motion'; // For animations

/**
 * The ProjectGrid component.
 * Fetches project data from the API and displays it in a responsive grid.
 * Handles loading, error, and empty states. Manages the project detail modal.
 */
const ProjectGrid = () => {
  // State to store the list of projects
  const [projects, setProjects] = useState([]);
  // State to store the currently selected project for the modal view
  const [selectedProject, setSelectedProject] = useState(null);
  // State to manage the loading status while fetching data
  const [loading, setLoading] = useState(true);
  // State to store any errors that occur during data fetching
  const [error, setError] = useState(null);

  // useEffect hook to fetch projects when the component mounts
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Fetch projects from the '/api/projects' endpoint
        const response = await axios.get('/api/projects');
        setProjects(response.data);
      } catch (err) {
        setError('Failed to load projects. Please try again later.');
        console.error('Error fetching projects:', err);
      } finally {
        // Set loading to false once the request is complete (either success or failure)
        setLoading(false);
      }
    };
    fetchProjects();
  }, []); // The empty dependency array ensures this runs only once on mount

  // Function to open the modal with the selected project's data
  const openModal = (project) => {
    setSelectedProject(project);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedProject(null);
  };

  // --- Conditional Rendering based on state ---

  // Display a loading spinner while data is being fetched
  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-lg font-sans text-gray-600 dark:text-gray-400 transition-colors duration-800 ease-in-out">Loading projects...</p>
      </div>
    );
  }

  // Display an error message if fetching fails
  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-lg font-sans text-red-500 transition-colors duration-800 ease-in-out">{error}</p>
      </div>
    );
  }

  // Display a message if no projects are found
  if (projects.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-lg font-sans text-gray-600 dark:text-gray-400 transition-colors duration-800 ease-in-out">No projects found. Check back soon!</p>
      </div>
    );
  }

  // --- Main Render ---
  // Display the grid of projects if data is successfully loaded
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {/* Map through the projects and render a ProjectCard for each one */}
        {projects.map((project, index) => (
          <ProjectCard key={project._id} project={project} openModal={openModal} index={index} />
        ))}
      </div>
      {/* Render the ProjectModal only if a project is selected */}
      {selectedProject && (
        <ProjectModal project={selectedProject} closeModal={closeModal} />
      )}
    </motion.div>
  );
};

export default ProjectGrid;
