import React from 'react';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import { ShieldExclamationIcon } from '@heroicons/react/outline';

const Unauthorized = () => {
    const router = useRouter();
    const { message } = router.query;
    return (
        <Layout title="unauthorize page">
            <div className="flex flex-col items-center">
                <ShieldExclamationIcon className="h-10 w-10 text-red-500 "></ShieldExclamationIcon>
                <h1 className="text-xl">Access Denied!!</h1>
                {message && <div className="mb-4  text-red-500">{message}</div>}
            </div>
        </Layout>
    );
};

export default Unauthorized;
