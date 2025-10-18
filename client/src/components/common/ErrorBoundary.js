import React, { Component } from 'react';

/**
 * A React Error Boundary component.
 * This component catches JavaScript errors anywhere in its child component tree,
 * logs those errors, and displays a fallback UI instead of the component tree that crashed.
 * It is implemented as a class component because error boundaries require lifecycle methods
 * like `getDerivedStateFromError` and `componentDidCatch`, which are not available in hooks.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    // Initialize the state. `hasError` tracks if an error has been caught.
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  /**
   * This lifecycle method is used to render a fallback UI after an error has been thrown.
   * It updates the state, which triggers a re-render to show the fallback UI.
   * @param {Error} error - The error that was thrown.
   * @returns {object} A state object to update.
   */
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  /**
   * This lifecycle method is used for logging the error information.
   * @param {Error} error - The error that was thrown.
   * @param {object} errorInfo - An object with a `componentStack` key containing information about which component threw the error.
   */
  componentDidCatch(error, errorInfo) {
    // Log the error to the console. In a production environment, you might send this to an error reporting service.
    console.error("Uncaught error:", error, errorInfo);
    // You can also set the error details in the state to display them in the fallback UI.
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    // If an error has been caught, render the fallback UI.
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', border: '1px solid red', margin: '20px' }}>
          <h1>Something went wrong.</h1>
          {/* The <details> tag creates a disclosure widget in which information is visible only when the widget is toggled into an "open" state. */}
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    // If there is no error, render the children components as normal.
    return this.props.children; 
  }
}

export default ErrorBoundary;