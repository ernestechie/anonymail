import React from 'react';
import { useParams } from 'react-router-dom';
import messages from '../../services/messages';

const Message = () => {
  const params = useParams();
  const current = messages.find((message) => message.ID === params.messageID);

  return (
    <div>
      <h1> {current.text}</h1>
    </div>
  );
};

export default Message;
