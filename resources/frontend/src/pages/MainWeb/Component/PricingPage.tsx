import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../NavBar/Header';
import Footer from '../Footer/Footer';

const PricingPage = () => {
    const [currency, setCurrency] = useState('LKR');
    const [selectedPackage, setSelectedPackage] = useState<number | null>(null);

    const packages = [
        {
            id: 1,
            title: '2 Months Basic',
            price: currency === 'LKR' ? 'LKR 3,000' : '$15',
            monthly: currency === 'LKR' ? 'LKR 1,500.00 /month' : '$7.50 /month',
            duration: '2 Months',
            features: [
                'Send unlimited interest requests',
                'Connect with any user',
                'Set detailed preferences to find your ideal match',
                'Automatic republishing of your ad every 30 days',
                'Receive offline responses from users',
                'Boost your Ad one time for more visibility (1 week)',
            ],
            popular: false,
        },
        {
            id: 2,
            title: '3 Months Basic',
            price: currency === 'LKR' ? 'LKR 5,000' : '$25',
            monthly: currency === 'LKR' ? 'LKR 1,666.67 /month' : '$8.33 /month',
            duration: '3 Months',
            features: [
                'Send unlimited interest requests',
                'Connect with any user',
                'Set detailed preferences to find your ideal match',
                'Automatic republishing of your ad every 30 days',
                'Receive offline responses from users',
                'Boost your Ad two times for more visibility (1 week each)',
                'Receive printed monthly magazine',
                'Personalized weekly match suggestions via email',
            ],
            popular: true,
        },
        {
            id: 3,
            title: '3 Months Pro',
            price: currency === 'LKR' ? 'LKR 8,000' : '$40',
            monthly: currency === 'LKR' ? 'LKR 2,666.67 /month' : '$13.33 /month',
            duration: '3 Months',
            features: [
                'Send unlimited interest requests',
                'Connect with any user ',
                'Set detailed preferences to find your ideal match',
                'Automatic republishing of your ad every 30 days',
                'Receive offline responses from users',
                'Boost your Ad three times for more visibility (1 week each)',
                'Receive printed monthly magazine',
                'Personalized daily match suggestions via email',
                'Dedicated support agent',
            ],
            popular: false,
        },
    ];

    const handlePackageSelect = (packageId: number) => {
        setSelectedPackage(packageId);
    };

    const handleSubscribe = () => {
        if (selectedPackage) {
            window.location.href = `/register?package=${selectedPackage}`;
        } else {
            alert('Please select a package first');
        }
    };

    return (
        <div className="font-sans bg-gradient-to-b from-yellow-50 to-white min-h-screen">
            <Header />

            <main className="pt-24 pb-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">Our Matrimony Packages</h1>
                        <p className="text-gray-600 max-w-xl mx-auto mb-8">Choose the perfect plan to help you find your ideal life partner.</p>
                    </div>
                    <div className="mb-10 flex justify-end">
                        <div className="relative">
                            <select
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                                className="block appearance-none w-40 bg-white border border-yellow-300 hover:border-yellow-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option value="LKR">LKR</option>
                                <option value="USD">USD</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {packages.map((pkg) => (
                            <div
                                key={pkg.id}
                                className={`relative rounded-lg overflow-hidden transition-transform duration-300 ${
                                    selectedPackage === pkg.id ? 'transform scale-105 shadow-xl' : 'shadow-md hover:shadow-lg hover:transform hover:scale-102 transition-all'
                                } ${pkg.popular ? 'border-2 border-yellow-400' : 'border border-gray-200'}`}
                            >
                                {pkg.popular && <div className="absolute top-0 inset-x-0 text-center bg-yellow-500 text-white py-1 font-medium">Most Popular</div>}
                                <div className={`bg-white h-full flex flex-col ${pkg.popular ? 'pt-8' : 'pt-4'}`}>
                                    <div className="text-center px-6">
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">{pkg.title}</h3>
                                    </div>

                                    <div className={`mt-4 px-6 py-3 text-center ${pkg.popular ? 'bg-yellow-50' : 'bg-gray-50'}`}>
                                        <div className="text-base font-medium">{pkg.duration}</div>
                                        <div className="text-3xl font-bold text-gray-800 mt-1">{pkg.price}</div>
                                        <div className="text-sm text-gray-500 mt-1">{pkg.monthly}</div>
                                    </div>

                                    <div className="flex-grow p-6 space-y-3">
                                        {pkg.features.map((feature, index) => (
                                            <div key={index} className="flex items-start">
                                                <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                                </svg>
                                                <span className="text-sm text-gray-700">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="px-6 pb-6">
                                        <button
                                            onClick={() => handlePackageSelect(pkg.id)}
                                            className={`w-full py-3 px-4 rounded-md font-semibold transition duration-300 ${
                                                selectedPackage === pkg.id ? 'bg-yellow-500 text-white' : 'bg-yellow-100 hover:bg-yellow-200 text-gray-800'
                                            }`}
                                        >
                                            {selectedPackage === pkg.id ? 'SELECTED' : 'SELECT PACKAGE'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-12 text-center">
                        <button
                            onClick={handleSubscribe}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-10 py-4 rounded-md font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            Subscribe Now
                        </button>
                        <p className="mt-4 text-gray-600">
                            Already registered?{' '}
                            <Link to="/signin" className="text-yellow-600 hover:underline">
                                Sign in here
                            </Link>
                        </p>
                    </div>
                    <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <div className="bg-yellow-100 w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-4">30-Day Success Rate</h3>
                            <p className="text-gray-600">Our members find meaningful connections within 30 days of joining. Our matching algorithm helps you find compatible partners quickly.</p>
                        </div>

                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <div className="bg-yellow-100 w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                    ></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Privacy & Security</h3>
                            <p className="text-gray-600">Your privacy is our priority. We ensure your personal information remains secure and only visible to verified members.</p>
                        </div>

                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <div className="bg-yellow-100 w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                                    ></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-4">24/7 Support</h3>
                            <p className="text-gray-600">Our dedicated support team is always available to assist you with any questions or concerns throughout your journey.</p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PricingPage;
