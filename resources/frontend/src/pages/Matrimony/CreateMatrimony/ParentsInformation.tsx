import React from 'react';
import { ParentsInfoProps } from '../../../utilities/types/Matrimony/MatrimonyTypes';

export const renderParentsInfoForm = ({ formData, handleInputChange, errors, touched, handleBlur }: ParentsInfoProps) => {
    const showError = (fieldName: string): boolean => {
        return !!(touched[fieldName] && errors[fieldName]);
    };

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Father's Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="father.ethnicity" className="block text-gray-700 mb-1">
                        Ethnicity
                    </label>
                    <select
                        id="father.ethnicity"
                        name="father.ethnicity"
                        value={formData.father.ethnicity}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
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
                        Religion
                    </label>
                    <select
                        id="father.religion"
                        name="father.religion"
                        value={formData.father.religion}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
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
                    Caste
                </label>
                <input
                    type="text"
                    id="father.caste"
                    name="father.caste"
                    value={formData.father.caste}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
            </div>

            <div>
                <label htmlFor="father.country_of_residence" className="block text-gray-700 mb-1">
                    Country of Residence
                </label>
                <select
                    id="father.country_of_residence"
                    name="father.country_of_residence"
                    value={formData.father.country_of_residence}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full px-3 py-2 border ${showError('father.country_of_residence') ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent`}
                >
                    <option value="">Select Country</option>
                    <option value="Sri Lanka">Sri Lanka</option>
                    <option value="Australia">Australia</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="Other">Other</option>
                </select>
                {showError('father.country_of_residence') && <p className="text-red-500 text-xs mt-1">{errors['father.country_of_residence']}</p>}
            </div>

            <div>
                <label htmlFor="father.profession" className="block text-gray-700 mb-1">
                    Profession
                </label>
                <input
                    type="text"
                    id="father.profession"
                    name="father.profession"
                    value={formData.father.profession}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
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
                    onBlur={handleBlur}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    rows={3}
                />
            </div>

            <hr className="my-6" />

            <h3 className="text-xl font-semibold text-gray-800 mb-4">Mother's Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="mother.ethnicity" className="block text-gray-700 mb-1">
                        Ethnicity
                    </label>
                    <select
                        id="mother.ethnicity"
                        name="mother.ethnicity"
                        value={formData.mother.ethnicity}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
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
                        Religion
                    </label>
                    <select
                        id="mother.religion"
                        name="mother.religion"
                        value={formData.mother.religion}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
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
                    Caste
                </label>
                <input
                    type="text"
                    id="mother.caste"
                    name="mother.caste"
                    value={formData.mother.caste}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
            </div>

            <div>
                <label htmlFor="mother.country_of_residence" className="block text-gray-700 mb-1">
                    Country of Residence
                </label>
                <select
                    id="mother.country_of_residence"
                    name="mother.country_of_residence"
                    value={formData.mother.country_of_residence}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full px-3 py-2 border ${showError('mother.country_of_residence') ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent`}
                >
                    <option value="">Select Country</option>
                    <option value="Sri Lanka">Sri Lanka</option>
                    <option value="Australia">Australia</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="Other">Other</option>
                </select>
                {showError('mother.country_of_residence') && <p className="text-red-500 text-xs mt-1">{errors['mother.country_of_residence']}</p>}
            </div>

            <div>
                <label htmlFor="mother.profession" className="block text-gray-700 mb-1">
                    Profession
                </label>
                <input
                    type="text"
                    id="mother.profession"
                    name="mother.profession"
                    value={formData.mother.profession}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
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
                    onBlur={handleBlur}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    rows={3}
                />
            </div>
        </div>
    );
};
