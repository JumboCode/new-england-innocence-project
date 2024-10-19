// src/pages/_app.tsx
import '../styles/globals.css'; // Adjust the import path

function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />;
}

export default MyApp;
