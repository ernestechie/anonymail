import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { MessageCard, Navbar } from '../../components/index';
import useUserContext from '../../context/userContext';
import { auth } from '../../services/firebase.config';
import useAuth from '../../services/useAuth';

const Inbox = () => {
  useAuth();
  const navigate = useNavigate();

  const { messages } = useUserContext();

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      navigate('/login');
    }
  });

  return (
    <>
      <Navbar />
      <section className='page'>
        <div className='max-w-[360px] m-auto py-8'>
          {!messages && (
            <h1 className='font-bold text-xl p-8'>You have no messages</h1>
          )}

          {messages.map((message) => (
            <MessageCard
              key={message.ID}
              text={message.text}
              path={message.ID}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default Inbox;
