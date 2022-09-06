import { Navbar } from '../../components';
import useAuth from '../../services/useAuth';

const Home = () => {
  useAuth();

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
