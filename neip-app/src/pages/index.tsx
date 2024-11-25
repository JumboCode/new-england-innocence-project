// Import necessary components
import NavBar from '../components/NavBar';
import HomePage from './HomePage';

const Homepage = () => {
  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-gray-100">
        <NavBar />
      </div>
      <div className="flex-1">
        <HomePage />
      </div>
    </div>
  );
};

export default Homepage;
