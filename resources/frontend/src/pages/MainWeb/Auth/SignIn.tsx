import React, { useState } from 'react';
import { ArrowLeft, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../../store/authSlice';
import Header from '../NavBar/Header';
import Footer from '../Footer/Footer';
import { UserSignIn } from '../../../utilities/services/authService';

const SignIn: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const data = await UserSignIn(email, password);
            dispatch(
                setAuth({
                    userId: data.userId,
                    userRole: data.userRole,
                    token: data.token,
                }),
            );

            if (data.userRole === 1) {
                navigate('/admin');
            } else if (data.userRole === 2) {
                navigate('/create-add');
            } else {
                navigate('/');
            }
        } catch (err: any) {
            if (err.message === 'Unauthorized') {
                setError('Invalid credentials. Please check your email and password.');
            } else {
                setError('An error occurred. Please try again later.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="font-sans bg-gradient-to-b from-yellow-50 to-white min-h-screen">
            <Header />
            <main className="pt-24 pb-16 px-4">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Sign In</h2>

                        {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">{error}</div>}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="password" className="block text-gray-700 mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium py-2 px-4 rounded-md transition duration-300 flex justify-center items-center"
                                disabled={isLoading}
                            >
                                {isLoading && (
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                )}
                                Sign In
                            </button>
                        </form>

                        <div className="flex items-center justify-center mt-6">
                            <button type="button" className="inline-flex items-center text-gray-600 text-sm hover:text-gray-800">
                                <ArrowLeft className="mr-1 h-4 w-4" /> BACK
                            </button>
                        </div>

                        <div className="mt-6 flex items-center justify-center border border-gray-300 rounded-md p-3">
                            <Phone className="mr-2 h-5 w-5 text-gray-600" />
                            <span className="font-medium">+94 11 234 5678</span>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default SignIn;
