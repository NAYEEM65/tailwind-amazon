import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const submitHandler = ({ email, password }) => {
        toast.success(`Email: ${email}, Password: ${password} has been submitted.`, {
            position: toast.POSITION.TOP_CENTER,
        });
    };
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
                    <Link href="/register">Register</Link>
                </div>
            </form>
        </Layout>
    );
};

export default Login;
