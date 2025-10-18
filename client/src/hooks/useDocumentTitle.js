import { useRef, useEffect } from 'react';

/**
 * A custom hook for setting the document's title.
 * It automatically appends a suffix and can revert to the original title when the component unmounts.
 *
 * @param {string} title - The title to set for the document.
 * @param {boolean} [prevailOnUnmount=false] - If true, the title will not be reverted when the component unmounts.
 */
function useDocumentTitle(title, prevailOnUnmount = false) {
  // useRef is used to store the original document title.
  // It persists for the full lifetime of the component and doesn't trigger a re-render when it changes.
  const defaultTitle = useRef(document.title);

  // This useEffect hook runs whenever the `title` prop changes.
  useEffect(() => {
    // Set the document title, appending a consistent suffix.
    document.title = `${title} | MyPortfolio`;
  }, [title]); // The dependency array ensures this effect only runs when `title` changes.

  // This useEffect hook runs only once when the component mounts and returns a cleanup function.
  useEffect(() => {
    // The returned function is the cleanup function, which runs when the component unmounts.
    return () => {
      // If `prevailOnUnmount` is false (the default), revert the document title
      // back to its original value.
      if (!prevailOnUnmount) {
        document.title = defaultTitle.current;
      }
    };
  }, []); // The empty dependency array means this effect runs only on mount and unmount.
}

// Export the custom hook
export default useDocumentTitle;