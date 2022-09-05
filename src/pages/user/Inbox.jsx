import React from 'react';
import { MessageCard } from '../../components/index';
import messages from '../../services/messages';

const Inbox = () => {
  return (
    <div>
      {messages.map((message) => (
        <MessageCard
          key={message.ID}
          text={message.text}
          path={message.ID}
          timeStamp={message.timeStamp}
        />
      ))}
    </div>
  );
};

export default Inbox;
