import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import { XCircleIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { toast } from 'react-toastify';
import axios from 'axios';

const Cart = () => {
    const { state, dispatch } = useContext(Store);
    const {
        cart: { cartItems },
    } = state;
    const router = useRouter();
    const removeHandler = (item) => {
        dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
    };
    const updateHandler = async (item, qty) => {
        const quantity = Number(qty);
        const { data } = await axios.get(`/api/products/${item._id}`);
        if (data.countInStock < quantity) {
            return toast.error('Sorry. Product is out of stock', {
                position: toast.POSITION.BOTTOM_CENTER,
            });
        }
        dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
        toast.success('Product updated in the cart', {
            position: toast.POSITION.TOP_CENTER,
        });
    };
    return (
        <Layout title="Shopping cart">
            <h1 className="mb-4 text-xl">Shopping cart</h1>
            {cartItems.length === 0 ? (
                <div className="">
                    Cart is empty <Link href="/">Go Shopping</Link>
                </div>
            ) : (
                <div className="grid md:grid-cols-4 md:gap-5">
                    <div className="overflow-x-auto md:col-span-3">
                        <table className="min-w-full">
                            <thead className="border-b">
                                <tr>
                                    <th className="px-5 text-left">Item</th>
                                    <th className="p-5 text-right">Quantity</th>
                                    <th className="p-5 text-right">Price</th>
                                    <th className="p-5">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item) => (
                                    <tr key={item.slug} className="border-b">
                                        <td>
                                            <Link href={`/product/${item.slug}`}>
                                                <a className="flex items-center">
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        width={50}
                                                        height={50}
                                                    />
                                                    &nbsp;
                                                    {item.name}
                                                </a>
                                            </Link>
                                        </td>
                                        <td className="p-5 text-right">
                                            <select
                                                value={item.quantity}
                                                onChange={(e) =>
                                                    updateHandler(item, e.target.value)
                                                }
                                            >
                                                {[...Array(item.countInStock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="p-5 text-right">${item.price}</td>
                                        <td className="p-5 text-center">
                                            <button onClick={() => removeHandler(item)}>
                                                <XCircleIcon className="h-5 w-5"></XCircleIcon>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="card p-5">
                        <ul>
                            <li>
                                <div className="pb-3 text-lg">
                                    Subtotal: (
                                    {cartItems.reduce((total, item) => total + item.quantity, 0)}) :
                                    $
                                    {cartItems.reduce(
                                        (total, item) => total + item.quantity * item.price,
                                        0,
                                    )}
                                </div>
                            </li>
                            <li>
                                <button
                                    className="primary-button w-full"
                                    onClick={() => router.push('login?redirect=/shipping')}
                                >
                                    Check Out
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default dynamic(() => Promise.resolve(Cart), { ssr: false });
