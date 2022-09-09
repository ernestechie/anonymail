import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { BusyIndicator, MessageCard, Navbar } from '../../components/index';
import { auth, db } from '../../services/firebase.config';
import useAuth from '../../services/useAuth';
import './Inbox.css';

const Inbox = () => {
  useAuth();

  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getMessages = useCallback(() => {
    setIsLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoading(true);

        onSnapshot(doc(db, 'users', user.uid), (doc) => {
          setMessages(doc.data().messages.reverse());
          setIsLoading(false);
        });
      }
    });
  }, []);

  useEffect(() => {
    getMessages();
  }, [getMessages]);

  return (
    <>
      <Navbar />
      {isLoading && <BusyIndicator />}
      <section className='page inbox pb-8'>
        <div className='max-w-[360px] m-auto pt-8'>
          {!isLoading && !messages && (
            <h1 className='font-bold text-2xl p-8 '>You have no messages</h1>
          )}
          {!isLoading && messages.length === 0 && (
            <h1 className='font-bold text-2xl p-8'>You have no messages</h1>
          )}
          {!isLoading && messages.length > 0 && (
            <div>
              <h1 className='text-purple-500 font-black text-3xl text-center'>
                YOUR MESSAGES
              </h1>
              <p className='font-black text-center mt-2 mb-10 uppercase text-white'>
                Scroll down to see old messages
              </p>
              {messages.map((message) => (
                <MessageCard
                  key={message.ID}
                  text={message.text}
                  path={message.ID}
                  timeStamp={message.timeStamp}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Inbox;
