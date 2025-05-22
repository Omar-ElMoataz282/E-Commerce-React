import { useEffect, useState } from "react";
import { createContext } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const windowSize = createContext("");

function WindowContext({ children }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function resizeScreen() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", resizeScreen);

    return () => {
      window.removeEventListener("resize", resizeScreen);
    };
  }, []);

  return (
    <windowSize.Provider value={{ windowWidth, setWindowWidth }}>
      {children}
    </windowSize.Provider>
  );
}

export default WindowContext;
