import '../styles/globals.css';
import { StoreProvider } from '../utils/Store';
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer } from 'react-toastify';
function MyApp({ Component, pageProps }) {
    return (
        <StoreProvider>
            <Component {...pageProps} />
            <ToastContainer />
        </StoreProvider>
    );
}

export default MyApp;
