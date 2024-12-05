// src/pages/_app.tsx
import '../styles/globals.css'; 
import "../styles/NavBarStyle.css"; 
//import AuthBox from '../app/components/AuthBox';
import Signup from './Signup';
import SignupConfirmation from './signupConfirmation';
import { AppProps } from 'next/app'; 
import ActionMenuComponent from '../components/ActionMenuComponent'
import HomePage from './HomePage';
import NavBar from '../components/NavBar'
import { ClerkProvider } from '@clerk/nextjs';

function MyApp({ Component, pageProps }: AppProps) {

    return (
        <Component {...pageProps} />,
        <HomePage />,
    
        <ClerkProvider {...pageProps}>
            <Component {...pageProps} />
        </ClerkProvider>
        
    );
}

export default MyApp;