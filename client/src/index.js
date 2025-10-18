// Import React and ReactDOM for building and rendering the React application
import React from 'react';
import ReactDOM from 'react-dom/client';

// Import global styles
import './index.css';

// Import the main App component, which is the root of the application's component tree
import App from './App';

// Import the function to report web vitals (performance metrics)
import reportWebVitals from './reportWebVitals';

// Import a custom ErrorBoundary component to catch JavaScript errors anywhere in the component tree
import ErrorBoundary from './components/common/ErrorBoundary';

// --- Application Rendering ---

// Get the root DOM element where the React app will be mounted
const rootElement = document.getElementById('root');

// Create a React root for the main application container
const root = ReactDOM.createRoot(rootElement);

// Render the application into the root element
root.render(
  // React.StrictMode is a tool for highlighting potential problems in an application.
  // It activates additional checks and warnings for its descendants.
  <React.StrictMode>
    {/* ErrorBoundary is a component that catches JS errors in its child component tree,
        logs those errors, and displays a fallback UI instead of the crashed component tree. */}
    <ErrorBoundary>
      {/* The App component is the main entry point of the application's UI. */}
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

// --- Performance Monitoring ---

// The reportWebVitals function can be used to measure and log performance metrics.
// For example, you can pass `console.log` to see the metrics in the browser console.
// Learn more at: https://bit.ly/CRA-vitals
reportWebVitals();