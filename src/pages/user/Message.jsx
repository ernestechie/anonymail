import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { createRef, useCallback, useEffect, useState } from 'react';
import { FaLink } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { createFileName, useScreenshot } from 'use-react-screenshot';
import { BusyIndicator } from '../../components';
import { auth, db } from '../../services/firebase.config';
import './Message.css';

const Message = () => {
  const params = useParams();
  const [message, setMessage] = useState([]);
  const [username, setUsername] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const ref = createRef(null);
  const [image, takeScreenshot] = useScreenshot();

  const download = (
    image,
    { name = `message-${params.messageID}`, extension = 'jpg' } = {}
  ) => {
    const a = document.createElement('a');
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };

  const saveCardAsImage = () => {
    console.log(image);
    takeScreenshot(ref.current).then(download);
  };

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

  return (
    <section className='overflow-hidden py-8 background' ref={ref}>
      {isLoading && <BusyIndicator />}
      {!isLoading && (
        <div className=' max-w-[360px] m-auto flex items-center justify-center flex-col'>
          <div className='w-full m-auto p-8 rounded-xl card'>
            <h2 className='font-bold mb-2 text-lg text-purple-400'>Message:</h2>
            <h2 className='font-bold text-2xl text-white'>{message.text}</h2>
            <div className='h-[2px] bg-purple-500 w-full my-4'></div>
            <h2 className='font-bold mb-2 text-white flex items-center gap-1'>
              <FaLink />
              anonymail.netlify.app
            </h2>
          </div>
          <h1 className='text-lg text-white font-bold uppercase'>
            @{username}
          </h1>
          <button
            className='uppercase text-center py-2 w-full rounded-lg bg-purple-600 font-bold text-white my-4 download-button hover:bg-purple-800 duration-500'
            onClick={saveCardAsImage}
          >
            DOWNLOAD
          </button>
        </div>
      )}
    </section>
  );
};

export default Message;
