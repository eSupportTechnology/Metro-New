import React from 'react';
import { FormData } from './types';

interface ParentsDetailsProps {
    formData: FormData;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    setCurrentStep: (step: number) => void;
}

const ParentsDetails: React.FC<ParentsDetailsProps> = ({ formData, handleInputChange, setCurrentStep }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Parents Details</h2>
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-4">Father's Details</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-700 mb-2">Ethnicity</label>
                            <select
                                name="fatherEthnicity"
                                value={formData.fatherEthnicity}
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
                                name="fatherReligion"
                                value={formData.fatherReligion}
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
                            <label className="block text-gray-700 mb-2">Country of Residence</label>
                            <select
                                name="fatherCountry"
                                value={formData.fatherCountry}
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
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-4">Mother's Details</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-700 mb-2">Ethnicity</label>
                            <select
                                name="motherEthnicity"
                                value={formData.motherEthnicity}
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
                                name="motherReligion"
                                value={formData.motherReligion}
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
                            <label className="block text-gray-700 mb-2">Country of Residence</label>
                            <select
                                name="motherCountry"
                                value={formData.motherCountry}
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
                    </div>
                </div>
            </div>
            <div className="mt-6 flex justify-between">
                <button type="button" onClick={() => setCurrentStep(0)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md">
                    Back
                </button>
                <button type="button" onClick={() => setCurrentStep(2)} className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-800 rounded-md">
                    Continue
                </button>
            </div>
        </div>
    );
};

export default ParentsDetails;
