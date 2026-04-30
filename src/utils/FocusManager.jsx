import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const FocusManager = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const mainContent = document.getElementById("main-content");

    if (mainContent) {
      // delay ensures page is rendered before focusing
      setTimeout(() => {
        mainContent.focus({ preventScroll: true });
      }, 50);
    }
  }, [pathname]);

  return null;
};