/* eslint-disable no-unused-vars */
import { signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { Store } from '../utils/Store';
import { Menu } from '@headlessui/react';
import DropdownLink from './DropdownLink';
import Cookies from 'js-cookie';

const Layout = ({ title, children }) => {
    const { state, dispatch } = useContext(Store);
    const [cartItemCount, setCartItemCount] = useState(0);
    const { status, data: session } = useSession();

    const { cart } = state;
    useEffect(() => {
        setCartItemCount(cart.cartItems.reduce((total, item) => total + item.quantity, 0));
    }, [cart.cartItems]);
    const logoutHandler = () => {
        Cookies.remove('cart');
        dispatch({ type: 'CART_RESET' });
        signOut({ callbackUrl: '/login' });
    };
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
                            {status === 'loading' ? (
                                'Loading'
                            ) : session?.user ? (
                                <Menu as="div" className="relative inline-block">
                                    <Menu.Button className="text-blue-600">
                                        {session.user.name}
                                    </Menu.Button>
                                    <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white shadow-lg">
                                        <Menu.Item>
                                            <DropdownLink className="dropdown-link" href="/pofile">
                                                Profile
                                            </DropdownLink>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <DropdownLink
                                                className="dropdown-link"
                                                href="/order-history"
                                            >
                                                Order History
                                            </DropdownLink>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <a
                                                className="dropdown-link"
                                                href="#"
                                                onClick={logoutHandler}
                                            >
                                                Logout
                                            </a>
                                        </Menu.Item>
                                    </Menu.Items>
                                </Menu>
                            ) : (
                                <Link href="/login">
                                    <a className="p-2">Login</a>
                                </Link>
                            )}
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
