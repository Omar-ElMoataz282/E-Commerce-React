import { createContext, useState } from "react";

export const ReData = createContext(false);

function SeachDataContext({ children }) {
  const [data, setData] = useState(false);

  return (
    <ReData.Provider value={{ data, setData }}>{children}</ReData.Provider>
  );
}

export default SeachDataContext;
