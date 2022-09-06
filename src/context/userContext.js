import React, { createContext, useContext, useState } from 'react';

const initialState = {
  username: '',
  referral_link: '',
  setReferralLink: () => {},
};
const userContext = createContext(initialState);

const UserContextProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [referralLink, setReferralLink] = useState('');

  return (
    <userContext.Provider
      value={{
        username,
        setUsername,
        referralLink,
        setReferralLink,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export { UserContextProvider };

const useUserContext = () => useContext(userContext);
export default useUserContext;
