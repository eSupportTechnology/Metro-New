import React from 'react';
import { FormData } from './types';

interface ResidencyEducationProps {
    formData: FormData;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    setCurrentStep: (step: number) => void;
}

const ResidencyEducation: React.FC<ResidencyEducationProps> = ({ formData, handleInputChange, setCurrentStep }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-8">
            <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Residency</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 mb-2">Country of Residence</label>
                        <select
                            name="countryOfResidence"
                            value={formData.countryOfResidence}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        >
                            <option value="">Select Country</option>
                            <option value="Australia">Australia</option>
                            <option value="Japan">Japan</option>
                            <option value="Sri Lanka">Sri Lanka</option>
                            <option value="India">India</option>
                            <option value="United States">United States</option>
                            <option value="Canada">Canada</option>
                            <option value="United Kingdom">United Kingdom</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">State / District</label>
                        <select
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        >
                            <option value="">Select State/District</option>
                            <option value="Tasmania">Tasmania</option>
                            <option value="New South Wales">New South Wales</option>
                            <option value="Victoria">Victoria</option>
                            <option value="Queensland">Queensland</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">City</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            placeholder="Enter city"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Visa Type</label>
                        <select
                            name="visaType"
                            value={formData.visaType}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        >
                            <option value="">Select Visa Type</option>
                            <option value="Citizen">Citizen</option>
                            <option value="Permanent Resident">Permanent Resident</option>
                            <option value="Work Permit / Visa">Work Permit / Visa</option>
                            <option value="Student Visa">Student Visa</option>
                            <option value="Tourist Visa">Tourist Visa</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Education & Profession</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 mb-2">Education Level</label>
                        <select
                            name="educationLevel"
                            value={formData.educationLevel}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        >
                            <option value="">Select Education Level</option>
                            <option value="High School">High School</option>
                            <option value="Associate Degree">Associate Degree</option>
                            <option value="Bachelor's Degree or Equivalent">Bachelor's Degree or Equivalent</option>
                            <option value="Master's Degree or Equivalent">Master's Degree or Equivalent</option>
                            <option value="Doctorate">Doctorate</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Profession</label>
                        <select
                            name="profession"
                            value={formData.profession}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        >
                            <option value="">Select Profession</option>
                            <option value="Doctor">Doctor</option>
                            <option value="Engineer">Engineer</option>
                            <option value="Teacher">Teacher</option>
                            <option value="IT Professional">IT Professional</option>
                            <option value="Business Owner">Business Owner</option>
                            <option value="Hotelier">Hotelier</option>
                            <option value="Government Employee">Government Employee</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Habits</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 mb-2">Drinking Habits</label>
                        <select
                            name="drinking"
                            value={formData.drinking}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        >
                            <option value="">Select Option</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                            <option value="Occasionally">Occasionally</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Smoking Habits</label>
                        <select
                            name="smoking"
                            value={formData.smoking}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        >
                            <option value="">Select Option</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                            <option value="Occasionally">Occasionally</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Food Preference</label>
                        <select
                            name="foodPreference"
                            value={formData.foodPreference}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        >
                            <option value="">Select Food Preference</option>
                            <option value="Vegetarian">Vegetarian</option>
                            <option value="Non-Vegetarian">Non-Vegetarian</option>
                            <option value="Vegan">Vegan</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex justify-between">
                <button type="button" onClick={() => setCurrentStep(2)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md">
                    Back
                </button>
                <button type="button" onClick={() => setCurrentStep(4)} className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-800 rounded-md">
                    Continue
                </button>
            </div>
        </div>
    );
};

export default ResidencyEducation;
