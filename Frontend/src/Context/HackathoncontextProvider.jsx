import React, { useState } from 'react';
import HackathonContext from './HackathonContext';

const HackathonContextProvider = ({ children }) => {
  const [hackathonDetails, setHackathonDetails] = useState([]);

  return (
    <HackathonContext.Provider value={{ hackathonDetails, setHackathonDetails }}>
      {children}
    </HackathonContext.Provider>
  );
};

export default HackathonContextProvider;
