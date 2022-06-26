import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import Layout from '../../components/Layout';
import data from '../../utils/data';
import Link from 'next/link';
import Image from 'next/image';
import { Store } from '../../utils/Store';
import { toast } from 'react-toastify';

const ProductScreen = () => {
    const { state, dispatch } = useContext(Store);
    const router = useRouter();
    const { query } = useRouter();
    const { slug } = query;

    const product = data.products.find((x) => x.slug === slug);

    const handleAddToCart = () => {
        const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        if (product.countInStock < quantity) {
            toast.warn('Sorry, this product is out of stock', {
                position: toast.POSITION.TOP_CENTER,
            });
            return;
        }
        dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
        router.push('/cart');
    };
    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <Layout title={product.name}>
            <div className="py-2">
                <Link href="/">back to products</Link>
            </div>
            <div className="grid md:grid-cols-4 md:gap-3">
                <div className="md:col-span-2">
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={480}
                        height={480}
                        layout="responsive"
                    />
                </div>
                <div>
                    <ul>
                        <li>
                            <h1 className="text-lg">{product.name}</h1>
                        </li>
                        <li>{product.category}</li>
                        <li>{product.brand}</li>
                        <li>
                            {product.rating} of {product.numReviews} reviews
                        </li>
                        <li>{product.description}</li>
                    </ul>
                </div>
                <div>
                    <div className="card p-5">
                        <div className="mb-2 flex justify-between">
                            <div>Price</div>
                            <div>$ {product.price}</div>
                        </div>
                        <div className="mb-2 flex justify-between">
                            <div>Status</div>
                            <div>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</div>
                        </div>
                        <button className="primary-button w-full" onClick={handleAddToCart}>
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProductScreen;
