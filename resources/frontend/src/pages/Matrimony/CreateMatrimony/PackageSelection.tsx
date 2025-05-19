import React from 'react';
import { PackageSelectionProps } from '../../../utilities/types/Matrimony/MatrimonyTypes';

export const renderPackageSelectionForm = ({ formData, handlePackageSelect, errors, currency, setCurrency }: PackageSelectionProps) => {
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

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Select Your Matrimony Package</h3>

            {!formData.package_id && (
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md mb-6">
                    <p className="text-gray-700">Please select a package to continue. Your matrimony profile requires an active package.</p>
                </div>
            )}

            <div className="mb-6 flex justify-end">
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {packages.map((pkg) => (
                    <div
                        key={pkg.id}
                        className={`relative rounded-lg overflow-hidden transition-transform duration-300 ${
                            formData.package_id === pkg.id ? 'transform scale-105 shadow-xl' : 'shadow-md'
                        } ${pkg.popular ? 'border-2 border-yellow-400' : ''}`}
                    >
                        {pkg.popular && <div className="absolute top-0 inset-x-0 text-center bg-yellow-500 text-white py-1 font-medium">Most Popular</div>}
                        <div className={`bg-white h-full flex flex-col ${pkg.popular ? 'pt-8' : 'pt-4'}`}>
                            <div className="text-center px-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{pkg.title}</h3>
                            </div>

                            <div className={`mt-4 px-6 py-3 text-center ${pkg.popular ? 'bg-yellow-50' : 'bg-gray-50'}`}>
                                <div className="text-base font-medium">{pkg.duration}</div>
                                <div className="text-2xl font-bold text-gray-800 mt-1">{pkg.price}</div>
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
                                        formData.package_id === pkg.id ? 'bg-yellow-500 text-white' : 'bg-yellow-100 hover:bg-yellow-200 text-gray-800'
                                    }`}
                                >
                                    {formData.package_id === pkg.id ? 'SELECTED' : 'SELECT PACKAGE'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {errors['package_id'] && <div className="text-red-500 text-sm mt-4">{errors['package_id']}</div>}

            <div className="mt-8 text-center text-sm text-gray-600">
                <p>All packages include access to our full database of matrimony profiles.</p>
                <p className="mt-2">
                    Need help choosing?{' '}
                    <a href="/contact" className="text-blue-600 hover:underline">
                        Contact our team
                    </a>
                </p>
            </div>
        </div>
    );
};
