import React from 'react';
import { Info } from 'lucide-react';
import { FormData } from './types';

interface DescriptionProps {
    formData: FormData;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
    setCurrentStep: (step: number) => void;
}

const Description: React.FC<DescriptionProps> = ({ formData, handleInputChange, handleSubmit, setCurrentStep }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Ad Description</h2>

            <div>
                <label className="block text-gray-700 mb-2">Are you creating this ad for a differently abled person?</label>
                <select
                    name="differentlyAbled"
                    value={formData.differentlyAbled}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 mb-6"
                >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                </select>
            </div>

            <div className="bg-blue-50 p-4 rounded-md mb-6 flex items-start">
                <Info size={20} className="text-blue-500 mr-2 mt-1" />
                <p className="text-blue-800 text-sm">
                    Description you write below will be available with your public ad and should contain any other information that should be displayed with the info you filled out.
                </p>
            </div>

            <div>
                <label className="block text-gray-700 mb-2">Describe Yourself</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    rows={6}
                    placeholder="Tell us about yourself, your interests, hobbies, and what you're looking for in a partner..."
                ></textarea>
                <p className="text-sm text-gray-500 mt-2">Minimum 100 characters, maximum 1000 characters</p>
            </div>

            <div className="mt-6 flex justify-between">
                <button type="button" onClick={() => setCurrentStep(3)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md">
                    Back
                </button>
                <button type="submit" onClick={handleSubmit} className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md">
                    Submit Registration
                </button>
            </div>
        </div>
    );
};

export default Description;
