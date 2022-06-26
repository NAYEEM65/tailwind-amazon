/* eslint-disable no-unused-vars */
import Head from 'next/head';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { Store } from '../utils/Store';

const Layout = ({ title, children }) => {
    const { state, dispatch } = useContext(Store);
    const [cartItemCount, setCartItemCount] = useState(0);

    const { cart } = state;
    useEffect(() => {
        setCartItemCount(cart.cartItems.reduce((total, item) => total + item.quantity, 0));
    }, [cart.cartItems]);
    return (
        <>
            <Head>
                <title>{title ? title + ' Tailwind-Amazon' : 'Tailwind-Amazon'}</title>
                <meta name="description" content="E-commerce Website" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex min-h-screen flex-col justify-between">
                <header className="">
                    <nav className="flex h-12 justify-between shadow-md items-center px-4">
                        <Link href="/">
                            <a className="text-lg font-bold">Amazon</a>
                        </Link>
                        <div>
                            <Link href="/cart">
                                <a className="p-2">
                                    Cart
                                    {cartItemCount > 0 && (
                                        <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                                            {cartItemCount}
                                        </span>
                                    )}
                                </a>
                            </Link>
                            <Link href="/login">
                                <a className="p-2">Login</a>
                            </Link>
                        </div>
                    </nav>
                </header>
                <main className="container m-auto mt-4 px-4">{children}</main>
                <footer className="flex h-10 justify-center items-center shadow-inner">
                    Copyright &copy; {new Date().getFullYear()} Tailwind Amazon.
                </footer>
            </div>
        </>
    );
};

export default Layout;
