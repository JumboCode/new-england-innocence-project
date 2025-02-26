import NavBar from '../components/NavBar';
import HomePage from './HomePage';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const Homepage = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="flex h-screen">
        <div>
          <NavBar />
        </div>
        <div className="flex-1">
          <HomePage />
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default Homepage;


//import NavBar from '../components/NavBar';
//import HomePage from './HomePage';
//
//
//const Homepage = () => {
//  return (
//    <div className="flex h-screen">
//      <div>
//        <NavBar />
//      </div>
//      <div className="flex-1">
//        <HomePage />
//      </div>
//    </div>
//  );
//};
//
//export default Homepage;
