import '../styles/globals.css';
import { SessionProvider, useSession } from 'next-auth/react';
import { StoreProvider } from '../utils/Store';
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <SessionProvider session={session}>
            <StoreProvider>
                {Component.auth ? (
                    <Auth>
                        <Component {...pageProps} />
                    </Auth>
                ) : (
                    <Component {...pageProps} />
                )}

                <ToastContainer />
            </StoreProvider>
        </SessionProvider>
    );
}
function Auth({ children, adminOnly }) {
    const router = useRouter();
    const { status, data: session } = useSession({
        required: true,
        onUnauthenticated() {
            router.push('/unauthorized?message=login required');
        },
    });
    if (status === 'loading') {
        return <div>Loading...</div>;
    }
    if (adminOnly && !session.user.isAdmin) {
        router.push('/unauthorized?message=admin login required');
    }

    return children;
}

export default MyApp;
