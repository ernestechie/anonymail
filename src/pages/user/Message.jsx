import React from 'react';
import { useParams } from 'react-router-dom';
import useUserContext from '../../context/userContext';

const Message = () => {
  const params = useParams();
  const { messages } = useUserContext();
  const current = messages.find((message) => message.ID === params.messageID);

  return (
    <div>
      <h1> {current.text}</h1>
    </div>
  );
};

export default Message;
