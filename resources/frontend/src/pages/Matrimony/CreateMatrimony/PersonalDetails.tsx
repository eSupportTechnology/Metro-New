import React from 'react';
import { Info } from 'lucide-react';
import { FormData } from './types';

interface PersonalDetailsProps {
    formData: FormData;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    setCurrentStep: (step: number) => void;
}

const PersonalDetails: React.FC<PersonalDetailsProps> = ({ formData, handleInputChange, setCurrentStep }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Personal Details</h2>

            <div className="bg-blue-50 p-4 rounded-md mb-6 flex items-start">
                <Info size={20} className="text-blue-500 mr-2 mt-1" />
                <p className="text-blue-800 text-sm">
                    Only the first name and first letter of the Last Name and the age will be displayed with the ad. Full Name and the birthdate will be displayed only to your matches (ie. Both
                    parties should show interest towards each other)
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-700 mb-2">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        placeholder="Enter first name"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        placeholder="Enter last name"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 mb-2">Account created by</label>
                    <select
                        name="accountCreatedBy"
                        value={formData.accountCreatedBy}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    >
                        <option value="Self">Self</option>
                        <option value="Parent">Parent</option>
                        <option value="Sibling">Sibling</option>
                        <option value="Relative">Relative</option>
                        <option value="Friend">Friend</option>
                    </select>
                </div>

                <div>
                    <label className="block text-gray-700 mb-2">Display Name Format</label>
                    <select
                        name="displayNameFormat"
                        value={formData.displayNameFormat}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    >
                        <option value="First Letter of First Name and Full Last Name">First Letter of First Name and Full Last Name</option>
                        <option value="Full First Name and First Letter of Last Name">Full First Name and First Letter of Last Name</option>
                        <option value="First Name Only">First Name Only</option>
                    </select>
                </div>

                <div>
                    <label className="block text-gray-700 mb-2">Display Name</label>
                    <input type="text" name="displayName" value={formData.displayName} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100" readOnly />
                </div>

                <div>
                    <label className="block text-gray-700 mb-2">Birthday</label>
                    <div className="flex space-x-2">
                        <select
                            name="birthYear"
                            value={formData.birthYear}
                            onChange={handleInputChange}
                            className="w-1/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            required
                        >
                            <option value="">Year</option>
                            {Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - 20 - i).map((year) => (
                                <option key={year} value={year.toString()}>
                                    {year}
                                </option>
                            ))}
                        </select>
                        <select
                            name="birthMonth"
                            value={formData.birthMonth}
                            onChange={handleInputChange}
                            className="w-1/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            required
                        >
                            <option value="">Month</option>
                            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => (
                                <option key={month} value={month}>
                                    {month}
                                </option>
                            ))}
                        </select>
                        <select
                            name="birthDate"
                            value={formData.birthDate}
                            onChange={handleInputChange}
                            className="w-1/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            required
                        >
                            <option value="">Date</option>
                            {Array.from({ length: 31 }, (_, i) => i + 1).map((date) => (
                                <option key={date} value={date.toString()}>
                                    {date}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-gray-700 mb-2">Gender</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div>
                    <label className="block text-gray-700 mb-2">Ethnicity</label>
                    <select
                        name="ethnicity"
                        value={formData.ethnicity}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    >
                        <option value="">Select Ethnicity</option>
                        <option value="Burgher">Burgher</option>
                        <option value="Muslim">Muslim</option>
                        <option value="Tamil">Tamil</option>
                        <option value="Sinhalese">Sinhalese</option>
                    </select>
                </div>

                <div>
                    <label className="block text-gray-700 mb-2">Religion</label>
                    <select
                        name="religion"
                        value={formData.religion}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    >
                        <option value="">Select Religion</option>
                        <option value="Hindu">Hindu</option>
                        <option value="Muslim">Muslim</option>
                        <option value="Christian">Christian</option>
                        <option value="Buddhist">Buddhist</option>
                    </select>
                </div>

                <div>
                    <label className="block text-gray-700 mb-2">Caste</label>
                    <input
                        type="text"
                        name="caste"
                        value={formData.caste}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        placeholder="Enter caste (optional)"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 mb-2">Height</label>
                    <select
                        name="height"
                        value={formData.height}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    >
                        <option value="">Select Height</option>
                        <option value="4ft 10in (147cm)">4ft 10in (147cm)</option>
                        <option value="5ft 0in (152cm)">5ft 0in (152cm)</option>
                        <option value="5ft 2in (157cm)">5ft 2in (157cm)</option>
                        <option value="5ft 4in (163cm)">5ft 4in (163cm)</option>
                        <option value="5ft 6in (168cm)">5ft 6in (168cm)</option>
                        <option value="5ft 8in (173cm)">5ft 8in (173cm)</option>
                        <option value="5ft 10in (178cm)">5ft 10in (178cm)</option>
                        <option value="6ft 0in (183cm)">6ft 0in (183cm)</option>
                    </select>
                </div>

                <div>
                    <label className="block text-gray-700 mb-2">Civil Status</label>
                    <select
                        name="civilStatus"
                        value={formData.civilStatus}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    >
                        <option value="">Select Civil Status</option>
                        <option value="Never Married">Never Married</option>
                        <option value="Divorced">Divorced</option>
                        <option value="Widowed">Widowed</option>
                        <option value="Separated">Separated</option>
                    </select>
                </div>
            </div>
            <div className="mt-6 flex justify-between">
                <button type="button" className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md" disabled>
                    Back
                </button>
                <button type="button" onClick={() => setCurrentStep(1)} className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-800 rounded-md">
                    Continue
                </button>
            </div>
        </div>
    );
};

export default PersonalDetails;
