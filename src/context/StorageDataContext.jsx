import { createContext, useState } from "react";

export const Cart = createContext(false);

function StorageDataContext({ children }) {
  const [isChanged, setIsChanged] = useState(false);

  return (
    <Cart.Provider value={{ isChanged, setIsChanged }}>
      {children}
    </Cart.Provider>
  );
}

export default StorageDataContext;
