import '../styles/globals.css'; 
import "../styles/NavBarStyle.css"; 
import { AppProps } from 'next/app'; 
import { ClerkProvider } from '@clerk/nextjs';

function MyApp({ Component, pageProps }: AppProps) {

    return (
        <ClerkProvider {...pageProps}>
            <Component {...pageProps} />
        </ClerkProvider>
    );
}

export default MyApp;