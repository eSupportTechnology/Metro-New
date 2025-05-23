import React from 'react';
import { HoroscopeAndPreferencesProps } from '../../../utilities/types/Matrimony/MatrimonyTypes';

export const renderHoroscopeAndPreferencesForm = ({
    formData,
    handleInputChange,
    handleImageChange,
    nicFrontPreviewUrl,
    nicBackPreviewUrl,
    errors,
    touched,
    handleBlur,
}: HoroscopeAndPreferencesProps) => {
    const showError = (fieldName: string): boolean => {
        return !!(touched[fieldName] && errors[fieldName]);
    };

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Personal Details & Documents</h3>
            <div>
                <label htmlFor="nic_number" className="block text-gray-700 mb-1">
                    NIC Number
                </label>
                <input
                    type="text"
                    id="nic_number"
                    name="nic_number"
                    value={formData.nic_number}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full px-3 py-2 border ${showError('nic_number') ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent`}
                    placeholder="Enter your NIC number (e.g., 123456789V or 199012345678)"
                    required
                />
                {showError('nic_number') && <p className="text-red-500 text-xs mt-1">{errors.nic_number}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="nic_front_image" className="block text-gray-700 mb-2">
                        NIC Front Image
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-yellow-400 transition-colors">
                        <input type="file" id="nic_front_image" name="nic_front_image" onChange={handleImageChange} accept="image/*" className="hidden" required />
                        <label htmlFor="nic_front_image" className="cursor-pointer">
                            {nicFrontPreviewUrl ? (
                                <div className="space-y-2">
                                    <img src={nicFrontPreviewUrl} alt="NIC Front Preview" className="mx-auto h-32 w-auto object-cover rounded border" />
                                    <p className="text-sm text-gray-600">Click to change NIC front image</p>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                        <path
                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <p className="text-sm text-gray-600">Upload NIC front image</p>
                                    <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                                </div>
                            )}
                        </label>
                    </div>
                    {showError('nic_front_image') && <p className="text-red-500 text-xs mt-1">{errors.nic_front_image}</p>}
                </div>

                <div>
                    <label htmlFor="nic_back_image" className="block text-gray-700 mb-2">
                        NIC Back Image
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-yellow-400 transition-colors">
                        <input type="file" id="nic_back_image" name="nic_back_image" onChange={handleImageChange} accept="image/*" className="hidden" required />
                        <label htmlFor="nic_back_image" className="cursor-pointer">
                            {nicBackPreviewUrl ? (
                                <div className="space-y-2">
                                    <img src={nicBackPreviewUrl} alt="NIC Back Preview" className="mx-auto h-32 w-auto object-cover rounded border" />
                                    <p className="text-sm text-gray-600">Click to change NIC back image</p>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                        <path
                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <p className="text-sm text-gray-600">Upload NIC back image</p>
                                    <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                                </div>
                            )}
                        </label>
                    </div>
                    {showError('nic_back_image') && <p className="text-red-500 text-xs mt-1">{errors.nic_back_image}</p>}
                </div>
            </div>

            <hr className="my-6" />

            <h3 className="text-xl font-semibold text-gray-800 mb-4">Education & Career</h3>

            <div>
                <label htmlFor="education_level" className="block text-gray-700 mb-1">
                    Education Level*
                </label>
                <select
                    id="education_level"
                    name="education_level"
                    value={formData.education_level}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full px-3 py-2 border ${showError('education_level') ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent`}
                    required
                >
                    <option value="">Select Education Level</option>
                    <option value="High School">High School</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Bachelor's Degree">Bachelor's Degree</option>
                    <option value="Master's Degree">Master's Degree</option>
                    <option value="Doctorate">Doctorate</option>
                    <option value="Professional Qualification">Professional Qualification</option>
                </select>
                {showError('education_level') && <p className="text-red-500 text-xs mt-1">{errors.education_level}</p>}
            </div>

            <div>
                <label htmlFor="profession" className="block text-gray-700 mb-1">
                    Profession*
                </label>
                <input
                    type="text"
                    id="profession"
                    name="profession"
                    value={formData.profession}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full px-3 py-2 border ${showError('profession') ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent`}
                    placeholder="e.g. Doctor, Engineer, Teacher, etc."
                    required
                />
                {showError('profession') && <p className="text-red-500 text-xs mt-1">{errors.profession}</p>}
            </div>

            <div>
                <label htmlFor="visa_type" className="block text-gray-700 mb-1">
                    Visa Type (if applicable)
                </label>
                <input
                    type="text"
                    id="visa_type"
                    name="visa_type"
                    value={formData.visa_type}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="e.g. Permanent Resident, Student Visa, etc."
                />
            </div>

            <hr className="my-6" />

            <h3 className="text-xl font-semibold text-gray-800 mb-4">Lifestyle Preferences</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label htmlFor="drinking" className="block text-gray-700 mb-1">
                        Drinking
                    </label>
                    <select
                        id="drinking"
                        name="drinking"
                        value={formData.drinking}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    >
                        <option value="No">No</option>
                        <option value="Occasionally">Occasionally</option>
                        <option value="Yes">Yes</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="smoking" className="block text-gray-700 mb-1">
                        Smoking
                    </label>
                    <select
                        id="smoking"
                        name="smoking"
                        value={formData.smoking}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    >
                        <option value="No">No</option>
                        <option value="Occasionally">Occasionally</option>
                        <option value="Yes">Yes</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="food_preference" className="block text-gray-700 mb-1">
                        Food Preference
                    </label>
                    <select
                        id="food_preference"
                        name="food_preference"
                        value={formData.food_preference}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    >
                        <option value="">Select Food Preference</option>
                        <option value="Vegetarian">Vegetarian</option>
                        <option value="Non-Vegetarian">Non-Vegetarian</option>
                        <option value="Vegan">Vegan</option>
                        <option value="Eggetarian">Eggetarian</option>
                    </select>
                </div>
            </div>
        </div>
    );
};
