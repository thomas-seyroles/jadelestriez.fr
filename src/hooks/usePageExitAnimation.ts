import { useEffect, useState, useRef, startTransition } from "react";
import { useBlocker, useNavigate } from "react-router-dom";

/**
 * Hook to manage page exit animations with navigation blocking
 * 
 * @returns {Object} - Object containing isExiting state and handleExitComplete callback
 * @returns {boolean} isExiting - Whether the page is currently exiting
 * @returns {() => void} handleExitComplete - Callback to call when exit animation completes
 * 
 * @example
 * ```tsx
 * function MyPage() {
 *   const { isExiting, handleExitComplete } = usePageExitAnimation();
 *   
 *   return (
 *     <motion.div
 *       animate={isExiting ? "exit" : "visible"}
 *       onAnimationComplete={handleExitComplete}
 *     >
 *       Content
 *     </motion.div>
 *   );
 * }
 * ```
 */
export function usePageExitAnimation() {
  const [isExiting, setIsExiting] = useState(false);
  const navigate = useNavigate();
  const nextLocationRef = useRef<string | null>(null);

  // Block navigation to trigger exit animation
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      !isExiting && currentLocation.pathname !== nextLocation.pathname
  );

  // Handle blocked navigation
  useEffect(() => {
    if (blocker.state === "blocked") {
      nextLocationRef.current = blocker.location.pathname;
      // Use startTransition to avoid cascading render warning
      startTransition(() => {
        setIsExiting(true);
      });
    }
  }, [blocker.state, blocker.location?.pathname]);

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
