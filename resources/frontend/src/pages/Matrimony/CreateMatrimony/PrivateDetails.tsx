import React from 'react';
import { FormData } from './types';

interface PrivateDetailsProps {
    formData: FormData;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    setCurrentStep: (step: number) => void;
}

const PrivateDetails: React.FC<PrivateDetailsProps> = ({ formData, handleInputChange, setCurrentStep }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Private Details</h2>
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-700 mb-2">Picture Upload</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                        <p className="text-gray-500">Upload your profile picture</p>
                        <input type="file" accept="image/*" className="hidden" id="picture-upload" />
                        <label htmlFor="picture-upload" className="mt-4 inline-block px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-800 rounded-md cursor-pointer">
                            Upload
                        </label>
                    </div>
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">Horoscope Details</label>
                    <div className="space-y-4">
                        <select
                            name="horoscopeMatching"
                            value={formData.horoscopeMatching}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        >
                            <option value="">Horoscope Matching Required?</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                        <div className="flex space-x-2">
                            <select
                                name="birthCity"
                                value={formData.birthCity}
                                onChange={handleInputChange}
                                className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            >
                                <option value="">Birth City</option>
                                <option value="colombo">Colombo</option>
                                <option value="kandy">Kandy</option>
                                <option value="jaffna">Jaffna</option>
                                <option value="galle">Galle</option>
                                <option value="badulla">Badulla</option>
                            </select>
                            <select
                                name="birthTime"
                                value={formData.birthTime}
                                onChange={handleInputChange}
                                className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            >
                                <option value="">Birth Time</option>
                                <option value="morning">Morning</option>
                                <option value="afternoon">Afternoon</option>
                                <option value="evening">Evening</option>
                                <option value="night">Night</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex justify-between">
                <button type="button" onClick={() => setCurrentStep(1)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md">
                    Back
                </button>
                <button type="button" onClick={() => setCurrentStep(3)} className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-800 rounded-md">
                    Continue
                </button>
            </div>
        </div>
    );
};

export default PrivateDetails;
