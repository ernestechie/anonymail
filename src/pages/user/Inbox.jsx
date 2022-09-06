import React from 'react';
import { MessageCard, Navbar } from '../../components/index';
import messages from '../../services/messages';
import useAuth from '../../services/useAuth';

const Inbox = () => {
  useAuth();

  return (
    <>
      <Navbar />
      <section className='page'>
        {messages.map((message) => (
          <MessageCard
            key={message.ID}
            text={message.text}
            path={message.ID}
            timeStamp={message.timeStamp}
          />
        ))}
      </section>
    </>
  );
};

export default Inbox;
