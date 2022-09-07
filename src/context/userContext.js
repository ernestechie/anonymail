import React, { createContext, useContext, useState } from 'react';

const initialState = {
  username: '',
  referral_link: '',
  messages: '',
  setUsername: () => {},
  setMessages: () => {},
  setReferralLink: () => {},
};
const userContext = createContext(initialState);

const UserContextProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [messages, setMessages] = useState([]);
  const [referralLink, setReferralLink] = useState('');

  return (
    <userContext.Provider
      value={{
        username,
        setUsername,
        referralLink,
        setReferralLink,
        messages,
        setMessages,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export { UserContextProvider };

const useUserContext = () => useContext(userContext);
export default useUserContext;
