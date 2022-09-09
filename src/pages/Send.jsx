import {
  collection,
  doc as docRef,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import { BusyIndicator } from '../components';
import { db } from '../services/firebase.config';

const Send = () => {
  const params = useParams();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messageInputHandler = (e) => {
    e.preventDefault();
    setMessage(e.target.value);
  };

  const sendMessageHandler = (e) => {
    e.preventDefault();

    if (message.trim().length > 0) {
      setIsLoading(true);
      getDocs(collection(db, 'users'))
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            if (doc.data().username === params.receiver) {
              const receiverRef = docRef(db, 'users', doc.id);
              const messages = doc.data().messages;
              messages.push({
                ID: uuidv4(),
                text: message,
                timeStamp: new Date(),
              });
              console.log(messages);

              // const receiverRef = doc(db, 'users', doc.id);
              updateDoc(receiverRef, {
                ...doc.data(),
                messages: [...messages],
              }).then(() => {
                toast.success('Message sent', {
                  hideProgressBar: true,
                  autoClose: 2000,
                });
                setMessage('');
                setIsLoading(false);
              });
            }
          });
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    } else {
      toast.error('Message must not be empty', {
        hideProgressBar: true,
        autoClose: 2000,
      });
      setMessage('');
    }
  };

  return (
    <section className='page send'>
      <ToastContainer />
      {isLoading && <BusyIndicator />}
      <div className='max-w-[360px] m-auto py-8'>
        <form onSubmit={sendMessageHandler}>
          <h1 className='my-4 font-bold text-3xl text-white'>
            Send message to
            <span className='text-purple-600'> {params.receiver}</span>
          </h1>
          <textarea
            name='message'
            id='message'
            placeholder='Start typing'
            className='h-64 bg-transparent w-full resize-none border-2 border-purple-600 rounded-lg p-4 text-lg outline-none text-white'
            value={message}
            onChange={messageInputHandler}
          ></textarea>
          <button
            className='bg-purple-600 px-4 py-2 text-white rounded-lg w-full'
            onClick={sendMessageHandler}
          >
            SEND
          </button>
        </form>
      </div>
    </section>
  );
};

export default Send;
