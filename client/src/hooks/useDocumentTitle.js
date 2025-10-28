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
    const originalTitle = defaultTitle.current;
    document.title = `${title} | MyPortfolio`;

    return () => {
      if (!prevailOnUnmount) {
        document.title = originalTitle;
      }
    };
  }, [title, prevailOnUnmount]); // The empty dependency array means this effect runs only on mount and unmount.
}

// Export the custom hook
export default useDocumentTitle;