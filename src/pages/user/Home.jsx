import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { Navbar } from '../../components';
import useUserContext from '../../context/userContext';
import { auth, db } from '../../services/firebase.config';
import useAuth from '../../services/useAuth';

const Home = () => {
  useAuth();
  const { setUsername, setReferralLink } = useUserContext();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const docRef = doc(db, 'users', user.uid);
      getDoc(docRef).then((snapshot) => {
        console.log(snapshot.data());
        setUsername(() => snapshot.data().username);
        setReferralLink(() => snapshot.data().referral_link);
      });
    }
  });

  return (
    <>
      <Navbar />
      <section className='page'>
        <div>Welcome, {}</div>
      </section>
    </>
  );
};

export default Home;
