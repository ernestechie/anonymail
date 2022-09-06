import React from 'react';
import { MessageCard, Navbar } from '../../components/index';
import messages from '../../services/messages';

const Inbox = () => {
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
