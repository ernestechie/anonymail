import useAuth from '../../services/useAuth';

const Home = () => {
  useAuth();

  return (
    <div>
      <div>Welcome, {}</div>
    </div>
  );
};

export default Home;
