import NavBar from '../components/NavBar';
import HomePage from './HomePage';

const Homepage = () => {
  return (
    <div className="flex h-screen">
      <div>
        <NavBar />
      </div>
      <div className="flex-1">
        <HomePage />
      </div>
    </div>
  );
};

export default Homepage;
