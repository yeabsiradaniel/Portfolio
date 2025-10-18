# MERN Stack Portfolio Website

This is a clean, minimal, and responsive portfolio website for a MERN stack developer. It features an interactive 3D model, smooth page transitions, a project showcase with modals, a dark/light theme toggle, an about section with animated skills and timeline, and a working contact form.

## Features

- **React Frontend:** Built with React, React Router, and Framer Motion for a smooth, single-page application experience.
- **Interactive 3D Hero:** A `react-three-fiber` powered 3D model that reacts to cursor movement.
- **Dynamic Project Grid:** Showcase your projects in a grid. Clicking on a project opens a modal with more details.
- **Dark/Light Theme:** A theme toggle with smooth transitions and user preference persistence in local storage.
- **About Section:** An animated skills section and a timeline of your experience.
- **Contact Form:** A working contact form that sends messages to your database.
- **Node.js/Express Backend:** A simple and efficient backend to handle API requests.
- **MongoDB Database:** Store your projects and contact messages in a MongoDB database.
- **Modern Styling:** Styled with Tailwind CSS for a clean and modern look.
- **Responsive Design:** The website is fully responsive and looks great on all devices.
- **Performance Optimized:** Lazy loading for 3D assets, code splitting, and other performance optimizations.
- **Accessible:** ARIA labels, keyboard navigation, and proper contrast for better accessibility.

## Tech Stack

**Frontend:**

- React
- React Router
- React Three Fiber
- Three.js
- Framer Motion
- Tailwind CSS
- Axios

**Backend:**

- Node.js
- Express
- Mongoose
- MongoDB
- Cors
- Dotenv
- Body-parser

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. **Install backend dependencies:**

   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies:**

   ```bash
   cd ../client
   npm install
   ```

### Configuration

1. **Create a `.env` file in the `server` directory.**

2. **Add your MongoDB connection string to the `.env` file:**

   ```
   MONGODB_URI=your_mongodb_connection_string
   ```

### Running the Application

1. **Start the backend server:**

   ```bash
   cd server
   npm start
   ```

   The server will start on `http://localhost:5000`.

2. **Start the frontend development server:**

   ```bash
   cd ../client
   npm start
   ```

   The frontend will be available at `http://localhost:3000`.

## Deployment

### Building the Frontend

To create a production build of the frontend, run the following command in the `client` directory:

```bash
npm run build
```

This will create a `build` folder with the optimized static files.

### Deploying to a Server

You can deploy this application to any hosting service that supports Node.js, such as Heroku, Vercel, or Netlify.

**Note:** When deploying, make sure to set the `MONGODB_URI` environment variable on your hosting service.

## Adding Your Own Projects

To add your own projects, you can manually add them to your MongoDB database. The `Project` schema is defined in `server/models/Project.js`.

Each project should have the following fields:

- `title` (String, required)
- `description` (String, required)
- `techStack` (Array of Strings)
- `liveLink` (String)
- `githubLink` (String)
- `imageUrl` (String)

## License

This project is licensed under the MIT License.
