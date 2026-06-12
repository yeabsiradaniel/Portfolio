import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { getLenis } from '../../lib/scroll';

// The first project gets a full-width case-study spotlight; the rest flow
// into the standard two-column grid below it.
const FeaturedProject = ({ project, openModal }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.25 }}
    transition={{ duration: 0.6 }}
    className="mb-10 rounded-3xl overflow-hidden glass-card group grid grid-cols-1 lg:grid-cols-2"
  >
    <div
      className="relative overflow-hidden cursor-pointer min-h-[260px] lg:min-h-[380px]"
      onClick={() => openModal(project)}
      data-cursor="View"
    >
      <img
        src={project.imageUrl || 'https://via.placeholder.com/800x500'}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:bg-gradient-to-r" />
      <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-sans font-semibold uppercase tracking-wider bg-accent text-white shadow-lg">
        Featured
      </span>
    </div>

    <div className="p-7 lg:p-10 flex flex-col justify-center">
      <h2
        className="text-2xl lg:text-3xl font-heading font-bold mb-4 group-hover:text-accent transition-colors duration-300 cursor-pointer"
        onClick={() => openModal(project)}
      >
        {project.title}
      </h2>
      <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400 font-sans leading-relaxed mb-6">
        {project.description.length > 280
          ? `${project.description.substring(0, 280)}...`
          : project.description}
      </p>

      {project.techStack && project.techStack.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {project.techStack.map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1 text-xs font-sans font-medium rounded-full bg-accent/10 text-accent border border-accent/20"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <button
          onClick={() => openModal(project)}
          className="px-6 py-3 rounded-full bg-accent hover:bg-accent-hover text-white text-sm font-sans font-bold transition-colors duration-300"
        >
          View Case Study
        </button>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-gray-700 dark:text-gray-300 hover:text-accent transition-colors duration-300"
          >
            <FaExternalLinkAlt className="h-3.5 w-3.5" /> Live Demo
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-gray-700 dark:text-gray-300 hover:text-accent transition-colors duration-300"
          >
            <FaGithub className="h-4 w-4" /> Source
          </a>
        )}
      </div>
    </div>
  </motion.div>
);

const ProjectGrid = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/api/projects');
        setProjects(response.data);
      } catch (err) {
        setError('Failed to load projects. Please try again later.');
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const openModal = (project) => setSelectedProject(project);
  const closeModal = () => setSelectedProject(null);

  // Pause smooth scrolling while the modal is open so the page
  // behind it does not react to wheel events
  useEffect(() => {
    const lenis = getLenis();
    if (!lenis) return;
    if (selectedProject) lenis.stop();
    else lenis.start();
  }, [selectedProject]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-accent/20" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-accent animate-spin" />
        </div>
        <p className="text-sm font-sans text-gray-500 dark:text-gray-400">Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-sm font-sans text-red-500">{error}</p>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-sm font-sans text-gray-500 dark:text-gray-400">No projects found. Check back soon!</p>
      </div>
    );
  }

  const [featured, ...rest] = projects;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto"
    >
      <FeaturedProject project={featured} openModal={openModal} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rest.map((project, index) => (
          <ProjectCard key={project._id} project={project} openModal={openModal} index={index} />
        ))}
      </div>
      {selectedProject && (
        <ProjectModal project={selectedProject} closeModal={closeModal} />
      )}
    </motion.div>
  );
};

export default ProjectGrid;
