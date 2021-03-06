import { createContext, useState, useContext } from 'react';

export const SpotContext = createContext();

export const useSpot = () => useContext(SpotContext);

export default function SpotProvider(props) {
  const [selectedSpot, setSelectedSpot] = useState({});

  return (
  <SpotContext.Provider
    value={{
      selectedSpot,
      setSelectedSpot
    }}
    >
      {props.children}
    </SpotContext.Provider>
  )
};

