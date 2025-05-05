import React from 'react';
import { MatrimonyFormData } from '../../../utilities/types/MatrimonyTypes';

interface ParentsInfoProps {
    formData: MatrimonyFormData;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export const renderParentsInfoForm = ({ formData, handleInputChange }: ParentsInfoProps) => {
    return (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Father's Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="father.ethnicity" className="block text-gray-700 mb-1">
                        Father's Ethnicity
                    </label>
                    <select
                        id="father.ethnicity"
                        name="father.ethnicity"
                        value={formData.father.ethnicity}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    >
                        <option value="">Select Ethnicity</option>
                        <option value="Sinhalese">Sinhalese</option>
                        <option value="Tamil">Tamil</option>
                        <option value="Muslim">Muslim</option>
                        <option value="Burgher">Burgher</option>
                        <option value="Malay">Malay</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="father.religion" className="block text-gray-700 mb-1">
                        Father's Religion
                    </label>
                    <select
                        id="father.religion"
                        name="father.religion"
                        value={formData.father.religion}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    >
                        <option value="">Select Religion</option>
                        <option value="Buddhist">Buddhist</option>
                        <option value="Hindu">Hindu</option>
                        <option value="Islam">Islam</option>
                        <option value="Christian">Christian</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
            </div>

            <div>
                <label htmlFor="father.caste" className="block text-gray-700 mb-1">
                    Father's Caste
                </label>
                <input
                    type="text"
                    id="father.caste"
                    name="father.caste"
                    value={formData.father.caste}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
            </div>

            <div>
                <label htmlFor="father.country_of_residence" className="block text-gray-700 mb-1">
                    Father's Country of Residence
                </label>
                <select
                    id="father.country_of_residence"
                    name="father.country_of_residence"
                    value={formData.father.country_of_residence}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                >
                    <option value="">Select Country</option>
                    <option value="Sri Lanka">Sri Lanka</option>
                    <option value="Australia">Australia</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            <div>
                <label htmlFor="father.profession" className="block text-gray-700 mb-1">
                    Father's Profession
                </label>
                <input
                    type="text"
                    id="father.profession"
                    name="father.profession"
                    value={formData.father.profession}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
            </div>

            <div>
                <label htmlFor="father.additional_info" className="block text-gray-700 mb-1">
                    Additional Information
                </label>
                <textarea
                    id="father.additional_info"
                    name="father.additional_info"
                    value={formData.father.additional_info}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    rows={3}
                ></textarea>
            </div>

            <hr className="my-6" />

            <h3 className="text-xl font-semibold text-gray-800 mb-4">Mother's Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="mother.ethnicity" className="block text-gray-700 mb-1">
                        Mother's Ethnicity
                    </label>
                    <select
                        id="mother.ethnicity"
                        name="mother.ethnicity"
                        value={formData.mother.ethnicity}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    >
                        <option value="">Select Ethnicity</option>
                        <option value="Sinhalese">Sinhalese</option>
                        <option value="Tamil">Tamil</option>
                        <option value="Muslim">Muslim</option>
                        <option value="Burgher">Burgher</option>
                        <option value="Malay">Malay</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="mother.religion" className="block text-gray-700 mb-1">
                        Mother's Religion
                    </label>
                    <select
                        id="mother.religion"
                        name="mother.religion"
                        value={formData.mother.religion}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    >
                        <option value="">Select Religion</option>
                        <option value="Buddhist">Buddhist</option>
                        <option value="Hindu">Hindu</option>
                        <option value="Islam">Islam</option>
                        <option value="Christian">Christian</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
            </div>

            <div>
                <label htmlFor="mother.caste" className="block text-gray-700 mb-1">
                    Mother's Caste
                </label>
                <input
                    type="text"
                    id="mother.caste"
                    name="mother.caste"
                    value={formData.mother.caste}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
            </div>

            <div>
                <label htmlFor="mother.country_of_residence" className="block text-gray-700 mb-1">
                    Mother's Country of Residence
                </label>
                <select
                    id="mother.country_of_residence"
                    name="mother.country_of_residence"
                    value={formData.mother.country_of_residence}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                >
                    <option value="">Select Country</option>
                    <option value="Sri Lanka">Sri Lanka</option>
                    <option value="Australia">Australia</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            <div>
                <label htmlFor="mother.profession" className="block text-gray-700 mb-1">
                    Mother's Profession
                </label>
                <input
                    type="text"
                    id="mother.profession"
                    name="mother.profession"
                    value={formData.mother.profession}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
            </div>

            <div>
                <label htmlFor="mother.additional_info" className="block text-gray-700 mb-1">
                    Additional Information
                </label>
                <textarea
                    id="mother.additional_info"
                    name="mother.additional_info"
                    value={formData.mother.additional_info}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    rows={3}
                ></textarea>
            </div>
        </div>
    );
};
