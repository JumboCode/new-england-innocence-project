// src/pages/_app.tsx
import '../styles/globals.css'; // Adjust the import path
import AuthBox from '../app/components/AuthBox';
import Signup from './Signup';
import SignupConfirmation from './signupConfirmation';

function MyApp({  }) {
    
    return <Signup />;
    
    // return <AuthBox prop={<SignupConfirmation></SignupConfirmation>} />;

}

export default MyApp;
