import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react';
import { BusyIndicator, MessageCard, Navbar } from '../../components/index';
import { auth, db } from '../../services/firebase.config';
import useAuth from '../../services/useAuth';

const Inbox = () => {
  useAuth();

  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getMessages = useCallback(() => {
    setIsLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        getDoc(docRef)
          .then((snapshot) => {
            setMessages(() => [...snapshot.data().messages]);
            setIsLoading(false);
          })
          .catch(() => {
            setIsLoading(false);
          });
      }
    });
  }, []);

  useEffect(() => {
    getMessages();
  }, [getMessages]);

  const sortedMessages = messages.reverse();

  return (
    <>
      <Navbar />
      {isLoading && <BusyIndicator />}
      <section className='page'>
        <div className='max-w-[360px] m-auto py-8'>
          {!isLoading && !messages && (
            <h1 className='font-bold text-2xl p-8'>You have no messages</h1>
          )}
          {!isLoading && messages.length === 0 && (
            <h1 className='font-bold text-2xl p-8'>You have no messages</h1>
          )}

          {sortedMessages.map((message) => (
            <MessageCard
              key={message.ID}
              text={message.text}
              path={message.ID}
              timeStamp={message.timeStamp}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default Inbox;
