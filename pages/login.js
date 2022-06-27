import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { signIn, useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { getError } from '../utils/error';
import { useRouter } from 'next/router';

const Login = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const { redirect } = router.query;
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const submitHandler = async ({ email, password }) => {
        try {
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
            });
            if (result.error) {
                toast.error(getError(result.error), {
                    position: toast.POSITION.TOP_CENTER,
                });
            } else {
                toast.success('Succesfully logged in.', {
                    position: toast.POSITION.TOP_CENTER,
                });
            }
        } catch (error) {
            toast.error(getError(error), {
                position: toast.POSITION.TOP_CENTER,
            });
        }
    };
    useEffect(() => {
        if (session?.user) {
            router.push(redirect || '/');
        }
    }, [router, session, redirect]);
    return (
        <Layout title="Login">
            <form
                onSubmit={handleSubmit(submitHandler)}
                className="mx-auto sm:w-1/2 w-full max-w-screent-md"
            >
                <h1 className="mb-4 text-xl">Login</h1>
                <div className="mb-4">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="w-full"
                        id="email"
                        autoFocus
                        {...register('email', {
                            required: 'please enter email',
                            pattern: {
                                // eslint-disable-next-line no-useless-escape
                                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                message: 'Please enter a valid email',
                            },
                        })}
                    />
                    {errors.email && <div className="text-red-500">{errors.email.message}</div>}
                </div>
                <div className="mb-4">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        {...register('password', {
                            required: 'please enter password',
                            minLength: {
                                value: 6,
                                message: 'password is more than 6 characters',
                            },
                        })}
                        className="w-full"
                        id="password"
                    />
                    {errors.password && (
                        <div className="text-red-500">{errors.password.message}</div>
                    )}
                </div>
                <div className="mb-4">
                    <button className="primary-button">Login</button>
                </div>
                <div className="mb-4">
                    Don&apos;t have an account? &nbsp;
                    <Link href="/register">
                        <a className="text-blue-500">Register Now</a>
                    </Link>
                </div>
            </form>
        </Layout>
    );
};

export default Login;
