// src/pages/_app.tsx
import '../styles/globals.css'; // Adjust the import path
import AuthBox from '../app/components/AuthBox';
import Signup from '../app/pages/Signup';
import SignupConfirmation from '../app/pages/SignupConfirmation';

function MyApp({  }) {
    
    return <Signup />;
    
    // return <AuthBox prop={<SignupConfirmation></SignupConfirmation>} />;

}

export default MyApp;
