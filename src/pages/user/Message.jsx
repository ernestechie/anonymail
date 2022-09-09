import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BusyIndicator } from '../../components';
import { auth, db } from '../../services/firebase.config';

const Message = () => {
  const params = useParams();
  const [message, setMessage] = useState([]);
  const [username, setUsername] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getMessage = useCallback(() => {
    setIsLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoading(true);
        const docRef = doc(db, 'users', user.uid);
        getDoc(docRef)
          .then((snapshot) => {
            const current = snapshot
              .data()
              .messages.find((message) => message.ID === params.messageID);
            setMessage(current);
            setUsername(snapshot.data().username);
            setIsLoading(false);
          })
          .catch((error) => {
            setIsLoading(false);
            console.log(error);
          });
      }
    });
  }, [params.messageID]);

  useEffect(() => {
    getMessage();
  }, [getMessage]);

  const cardStyle = {};

  return (
    <section className='overflow-hidden h-screen bg-gray-100 py-8'>
      {isLoading && <BusyIndicator />}
      {!isLoading && (
        <div className='max-w-[360px] m-auto'>
          <div
            className='w-full m-auto py-8 bg-transparent p-8 border-2 border-gray-800 rounded-xl'
            style={cardStyle}
          >
            <h2 className='font-black mb-2 text-xl text-purple-700'>
              Message:{' '}
            </h2>
            <h2 className='font-bold text-2xl'>{message.text}</h2>
            <div className='h-[2px] bg-purple-700 w-full my-4'></div>
          </div>
          <button className='uppercase text-center py-1 w-full rounded-lg border-gray-900 border-2 block font-bold my-8'>
            Save as image
          </button>
          <h1 className='text-xl text-purple-700 font-bold my-4 uppercase'>
            @{username}
          </h1>
        </div>
      )}
    </section>
  );
};

export default Message;
