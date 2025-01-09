import NavBar from '../components/NavBar';
import HomePage from './HomePage';
import DropdownAndTags from '../components/DropdownAndTags';

const Homepage = () => {
  const options = ['Detective 1', 'Detective 2', 'Detective 3'];
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
