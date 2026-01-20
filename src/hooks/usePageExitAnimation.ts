import { useEffect, useRef, startTransition } from "react";
import { useBlocker, useNavigate } from "react-router-dom";
import { usePageExitContext } from "../context/PageExitContext";

/**
 * Hook to manage page exit animations with navigation blocking
 * Uses PageExitContext to synchronize animation across components (like Header)
 */
export function usePageExitAnimation() {
  const { isExiting, setIsExiting, setShouldLayoutExit } = usePageExitContext();
  const navigate = useNavigate();
  const nextLocationRef = useRef<string | null>(null);

  // Block navigation to trigger exit animation
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      !isExiting && 
      (currentLocation.pathname !== nextLocation.pathname || 
       currentLocation.search !== nextLocation.search)
  );

  // Handle blocked navigation
  useEffect(() => {
    if (blocker.state === "blocked") {
      // Reconstruct full path including search params
      const nextPath = blocker.location.pathname + blocker.location.search;
      nextLocationRef.current = nextPath;
      
      // Check if we are navigating to a project detail page
      // If so, the header should animate out
      const isProjectDetail = nextPath.startsWith('/projets/') && nextPath !== '/projets';
      if (isProjectDetail) {
        setShouldLayoutExit(true);
      }

      // Use startTransition to avoid cascading render warning
      startTransition(() => {
        setIsExiting(true);
      });
    }
  }, [blocker.state, blocker.location?.pathname, setIsExiting, setShouldLayoutExit]);

  // Reset blocker when component unmounts
  useEffect(() => {
    if (blocker.state === "blocked") {
      blocker.reset?.();
    }
  }, [blocker]);

  // Complete navigation after exit animation finishes
  const handleExitComplete = () => {
    if (isExiting && nextLocationRef.current) {
      navigate(nextLocationRef.current);
    }
  };

  return {
    isExiting,
    handleExitComplete,
  };
}
