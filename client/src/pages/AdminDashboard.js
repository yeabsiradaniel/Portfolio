// Import necessary libraries and hooks
import React, { useState, useEffect } from 'react';
import api from '../api/axios'; // Import the configured axios instance
import { motion } from 'framer-motion'; // For animations

/**
 * The AdminDashboard component.
 * Allows authenticated admins to perform CRUD (Create, Read, Update, Delete) operations on projects.
 */
const AdminDashboard = () => {
  // State to hold the list of projects
  const [projects, setProjects] = useState([]);
  // State for the image file
  const [imageFile, setImageFile] = useState(null);
  // State for the image preview URL
  const [imagePreview, setImagePreview] = useState('');
  // State for the form data for adding/editing projects
  const [formData, setFormData] = useState({
    _id: '',
    title: '',
    description: '',
    techStack: '',
    liveLink: '',
    githubLink: '',
    imageUrl: '',
  });
  // State to track if the form is in 'edit' mode or 'add' mode
  const [isEditing, setIsEditing] = useState(false);

  // useEffect hook to fetch projects when the component mounts
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Make a GET request to the API to get all projects
        const res = await api.get('/projects');
        setProjects(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProjects();
  }, []);

  /**
   * Sets the JWT token in the default headers for all subsequent axios requests.
   * @param {string} token - The authentication token.
   */
  const setAuthToken = (token) => {
          if (token) {
            api.defaults.headers.common['x-auth-token'] = token;
        } else {
          delete api.defaults.headers.common['x-auth-token'];    }
  };

  /**
   * Handles changes in the form input fields.
   */
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  /**
   * Handles file input change.
   */
  const onFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  /**
   * Moves a project one step up or down in display order and persists the
   * new order. The first project in the list is the featured spotlight on
   * the public site. On failure the list is refetched to restore truth.
   */
  const onMove = async (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= projects.length) return;

    const reordered = [...projects];
    [reordered[index], reordered[target]] = [reordered[target], reordered[index]];
    setProjects(reordered);

    try {
      const token = localStorage.getItem('token');
      setAuthToken(token);
      await api.put('/admin/projects-reorder', { ids: reordered.map((p) => p._id) });
    } catch (err) {
      console.error('Failed to save project order:', err);
      const res = await api.get('/projects');
      setProjects(res.data);
    }
  };

  /**
   * Handles form submission for both creating and updating projects.
   */
  const onSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    setAuthToken(token); // Set the auth token for the request

    const postData = new FormData();
    postData.append('title', formData.title);
    postData.append('description', formData.description);
    postData.append('techStack', formData.techStack);
    postData.append('liveLink', formData.liveLink);
    postData.append('githubLink', formData.githubLink);
    if (imageFile) {
      postData.append('image', imageFile);
    } else if (isEditing) {
        postData.append('imageUrl', formData.imageUrl);
    }


    try {
      if (isEditing) {
        // If editing, send a PUT request to update the project
        const res = await api.put(`/admin/projects/${formData._id}`, postData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        // Update the projects list in the state
        setProjects(projects.map((p) => (p._id === formData._id ? res.data : p)));
      } else {
        // If adding, send a POST request to create a new project
        const res = await api.post('/admin/projects', postData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        // Add the new project to the state
        setProjects([...projects, res.data]);
      }
      clearForm(); // Reset the form after submission
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * Populates the form with the data of the project to be edited.
   * @param {object} project - The project object to edit.
   */
  const onEdit = (project) => {
    setFormData({
      _id: project._id,
      title: project.title,
      description: project.description,
      techStack: project.techStack.join(', '), // Convert array back to string for the form
      liveLink: project.liveLink,
      githubLink: project.githubLink,
      imageUrl: project.imageUrl,
    });
    setIsEditing(true); // Set the form to 'edit' mode
    setImagePreview(project.imageUrl);
  };

  /**
   * Deletes a project by its ID.
   * @param {string} id - The ID of the project to delete.
   */
  const onDelete = async (id) => {
    const token = localStorage.getItem('token');
    setAuthToken(token);
    try {
      // Send a DELETE request to the server
      await api.delete(`/admin/projects/${id}`);
      // Filter out the deleted project from the state
      setProjects(projects.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * Clears the form fields and resets the editing state.
   */
  const clearForm = () => {
    setFormData({
      _id: '',
      title: '',
      description: '',
      techStack: '',
      liveLink: '',
      githubLink: '',
      imageUrl: '',
    });
    setIsEditing(false);
    setImageFile(null);
    setImagePreview('');
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form for Adding/Editing Projects */}
        <div>
          <h2 className="text-2xl font-bold mb-4">{isEditing ? 'Edit Project' : 'Add Project'}</h2>
          <form onSubmit={onSubmit} className="space-y-4">
            {/* Form Inputs */}
            <input type="text" name="title" value={formData.title} onChange={onChange} placeholder="Title" required className="w-full p-2 border rounded"/>
            <textarea name="description" value={formData.description} onChange={onChange} placeholder="Description" required className="w-full p-2 border rounded"></textarea>
            <input type="text" name="techStack" value={formData.techStack} onChange={onChange} placeholder="Tech Stack (comma separated)" required className="w-full p-2 border rounded"/>
            <input type="text" name="liveLink" value={formData.liveLink} onChange={onChange} placeholder="Live Link" className="w-full p-2 border rounded"/>
            <input type="text" name="githubLink" value={formData.githubLink} onChange={onChange} placeholder="GitHub Link" className="w-full p-2 border rounded"/>
            <input type="file" name="image" onChange={onFileChange} className="w-full p-2 border rounded"/>
            {imagePreview && <img src={imagePreview} alt="Preview" className="mt-4 w-full h-auto"/>}
            <div className="flex space-x-4">
                <button type="submit" className="bg-accent text-on-accent px-4 py-2 rounded">{isEditing ? 'Update' : 'Add'}</button>
                {isEditing && <button type="button" onClick={clearForm} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>}
            </div>
          </form>
        </div>
        {/* List of Existing Projects */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Existing Projects</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Use the arrows to rearrange — the first project is the featured spotlight on the site.
          </p>
          <div className="space-y-4">
            {projects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 border rounded shadow-sm flex items-start gap-4"
              >
                <div className="flex flex-col gap-1 pt-1">
                  <button
                    onClick={() => onMove(index, -1)}
                    disabled={index === 0}
                    aria-label={`Move ${project.title} up`}
                    className="px-2 py-1 rounded border text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-accent/10 transition-colors"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => onMove(index, 1)}
                    disabled={index === projects.length - 1}
                    aria-label={`Move ${project.title} down`}
                    className="px-2 py-1 rounded border text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-accent/10 transition-colors"
                  >
                    ↓
                  </button>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold">
                    {index === 0 && (
                      <span className="mr-2 text-xs font-sans font-semibold uppercase tracking-wider text-accent align-middle">Featured</span>
                    )}
                    {project.title}
                  </h3>
                  <p>{project.description}</p>
                  <div className="flex space-x-4 mt-4">
                    <button onClick={() => onEdit(project)} className="text-accent">Edit</button>
                    <button onClick={() => onDelete(project._id)} className="text-red-500">Delete</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
