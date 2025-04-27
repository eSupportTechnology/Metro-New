import React, { useState } from 'react';
import { ChevronDown, ArrowLeft, Phone, Shield, UserCheck, DollarSign, Headphones, Heart } from 'lucide-react';
import Header from '../NavBar/Header';
import Footer from '../Footer/Footer';

const SignIn: React.FC = () => {
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [countryCode, setCountryCode] = useState<string>('+94');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleContinue = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            console.log(`Signing in with: ${countryCode}${phoneNumber}`);
            setIsLoading(false);
        }, 1500);
    };

    const handlePasswordLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            console.log(`Signing in with password for: ${countryCode}${phoneNumber}`);
            setIsLoading(false);
        }, 1500);
    };

    const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        setPhoneNumber(value);
    };

    const togglePasswordLogin = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="font-sans bg-gradient-to-b from-yellow-50 to-white min-h-screen">
            <Header />

            <main className="pt-24 pb-16 px-4">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
                    <div className="w-full max-w-md mx-auto">
                        <div className="bg-white rounded-lg shadow-md p-8">
                            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">{showPassword ? 'Sign In with Password' : 'Continue with Phone'}</h2>

                            {!showPassword ? (
                                <form onSubmit={handleContinue}>
                                    <div className="mb-4">
                                        <label htmlFor="phone" className="block text-gray-700 mb-2">
                                            Phone Number
                                        </label>
                                        <div className="flex">
                                            <div className="relative">
                                                <button type="button" className="h-full px-3 py-2 inline-flex items-center border border-gray-300 bg-gray-100 text-gray-700 rounded-l-md">
                                                    {countryCode} <ChevronDown className="ml-1 h-4 w-4" />
                                                </button>
                                            </div>
                                            <input
                                                type="tel"
                                                id="phone"
                                                value={phoneNumber}
                                                onChange={handlePhoneNumberChange}
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                                placeholder="Enter phone number"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium py-2 px-4 rounded-md transition duration-300 mb-4 flex justify-center items-center"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                        ) : null}
                                        Continue
                                    </button>

                                    <div className="text-center mb-4">
                                        <button type="button" className="text-gray-600 text-sm hover:text-gray-800 hover:underline" onClick={togglePasswordLogin}>
                                            Login using password
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <form onSubmit={handlePasswordLogin}>
                                    <div className="mb-4">
                                        <label htmlFor="phone" className="block text-gray-700 mb-2">
                                            Phone Number
                                        </label>
                                        <div className="flex">
                                            <div className="relative">
                                                <button type="button" className="h-full px-3 py-2 inline-flex items-center border border-gray-300 bg-gray-100 text-gray-700 rounded-l-md">
                                                    {countryCode} <ChevronDown className="ml-1 h-4 w-4" />
                                                </button>
                                            </div>
                                            <input
                                                type="tel"
                                                id="phone"
                                                value={phoneNumber}
                                                onChange={handlePhoneNumberChange}
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                                placeholder="Enter phone number"
                                                required
                                            />
                                        </div>
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
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                            placeholder="Enter your password"
                                            required
                                        />
                                        <div className="mt-1 text-right">
                                            <a href="#" className="text-xs text-yellow-600 hover:text-yellow-700">
                                                Forgot Password?
                                            </a>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium py-2 px-4 rounded-md transition duration-300 mb-4 flex justify-center items-center"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                        ) : null}
                                        Sign In
                                    </button>

                                    <div className="text-center mb-4">
                                        <button type="button" className="text-gray-600 text-sm hover:text-gray-800 hover:underline" onClick={togglePasswordLogin}>
                                            Login with phone number
                                        </button>
                                    </div>
                                </form>
                            )}

                            <div className="flex items-center justify-center">
                                <button type="button" className="inline-flex items-center text-gray-600 text-sm hover:text-gray-800">
                                    <ArrowLeft className="mr-1 h-4 w-4" /> BACK
                                </button>
                            </div>

                            <div className="mt-6 flex items-center justify-center border border-gray-300 rounded-md p-3">
                                <Phone className="mr-2 h-5 w-5 text-gray-600" />
                                <span className="font-medium">+94 11 234 5678</span>
                            </div>
                        </div>

                        <div className="mt-6 bg-white rounded-lg shadow-md p-8">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">New to our platform?</h3>
                            <p className="text-gray-600 mb-4">Create an account to find your perfect match and access all our premium features.</p>
                            <button type="button" className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition duration-300">
                                Register for Free
                            </button>
                        </div>
                    </div>

                    <div className="w-full max-w-xl mx-auto">
                        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Why Choose Our Platform?</h2>

                            <div className="space-y-6">
                                <div className="flex items-start p-3 rounded-md bg-yellow-50">
                                    <div className="flex-shrink-0 mr-4">
                                        <div className="bg-blue-100 p-2 rounded-md">
                                            <Shield className="h-6 w-6 text-blue-600" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-800">Privacy First</h3>
                                        <p className="text-sm text-gray-600">Data that reveals your identity is shared only with the profiles you accept. You are in control of your data.</p>
                                    </div>
                                </div>

                                <div className="flex items-start p-3 rounded-md bg-yellow-50">
                                    <div className="flex-shrink-0 mr-4">
                                        <div className="bg-green-100 p-2 rounded-md">
                                            <UserCheck className="h-6 w-6 text-green-600" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-800">Genuine and Verified Accounts</h3>
                                        <p className="text-sm text-gray-600">We manually review all profiles added to the website and verify the accuracy of the necessary information.</p>
                                    </div>
                                </div>

                                <div className="flex items-start p-3 rounded-md bg-yellow-50">
                                    <div className="flex-shrink-0 mr-4">
                                        <div className="bg-purple-100 p-2 rounded-md">
                                            <DollarSign className="h-6 w-6 text-purple-600" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-800">Paid Accounts Only</h3>
                                        <p className="text-sm text-gray-600">
                                            We attract only genuine seekers, and hence the selection process is efficient for our advertisers. Please check the pricing details{' '}
                                            <a href="#" className="text-blue-600 hover:underline">
                                                here
                                            </a>
                                            .
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start p-3 rounded-md bg-yellow-50">
                                    <div className="flex-shrink-0 mr-4">
                                        <div className="bg-yellow-100 p-2 rounded-md">
                                            <Headphones className="h-6 w-6 text-yellow-600" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-800">Live Support</h3>
                                        <p className="text-sm text-gray-600">We are available on Telephone, Email and on Social Media to give you a helping hand when you need us.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="relative h-48">
                                <img src="https://blissfulplans.com/wp-content/uploads/2023/08/Sri-lanka.webp" alt="Sri Lanka matrimony" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                                    <div className="p-6 text-white">
                                        <h3 className="text-xl font-bold mb-2">Find Your Perfect Match</h3>
                                        <p className="text-sm opacity-90">Join thousands of happy couples who found their life partner through our platform</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center">
                                        <Heart className="h-5 w-5 text-red-500 mr-2" fill="red" />
                                        <span className="text-gray-700 font-medium">10,000+ Success Stories</span>
                                    </div>
                                    <a href="#" className="text-yellow-600 hover:text-yellow-700 text-sm font-medium">
                                        View All
                                    </a>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">Colombo</span>
                                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">Kandy</span>
                                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">Galle</span>
                                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">Jaffna</span>
                                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">Negombo</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default SignIn;
