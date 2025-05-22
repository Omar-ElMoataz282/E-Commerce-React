import { createContext, useContext, useEffect, useState } from "react";
import { windowSize } from "./WindowContext";

// eslint-disable-next-line react-refresh/only-export-components
export const Menu = createContext("");

function MenuContext({ children }) {
  const [isOpen, setIsOpen] = useState(null);

  const screenSize = useContext(windowSize);
  useEffect(() => {
    screenSize.windowWidth <= "768" ? setIsOpen(false) : setIsOpen(true);
  }, []);

  return (
    <Menu.Provider value={{ isOpen, setIsOpen }}>{children}</Menu.Provider>
  );
}

export default MenuContext;
