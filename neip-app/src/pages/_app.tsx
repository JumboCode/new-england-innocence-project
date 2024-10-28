// src/pages/_app.tsx
import '../styles/globals.css'; 
import AuthBox from '../app/components/AuthBox';
import Signup from './Signup';
import SignupConfirmation from './signupConfirmation';
import { AppProps } from 'next/app'; 

function MyApp({ Component, pageProps }: AppProps) {

    return (
        <Component {...pageProps} />
    );
}

export default MyApp;