import NavBar from '../components/NavBar';
import HomePage from './HomePage';
import DropdownAndTags from '../components/DropdownAndTags';

const Homepage = () => {
  const options = ['Detective 1', 'Detective 2', 'Detective 3'];
  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-gray-100">
        <NavBar />
      </div>
      <div className="flex-1">
        <HomePage />
      </div>
      <div className="fixed bottom-8 left-8" style={{ marginLeft: 100, marginBottom: 100 }}>
        <DropdownAndTags
          label="Detectives involved"
          placeholder="Detective"
          options={options}
        />
      </div>
    </div>
  );
};

export default Homepage;
