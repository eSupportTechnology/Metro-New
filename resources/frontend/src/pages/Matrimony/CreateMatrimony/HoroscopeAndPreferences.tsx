import React from 'react';
import { HoroscopeAndPreferencesProps } from '../../../utilities/types/MatrimonyTypes';

export const renderHoroscopeAndPreferencesForm = ({ formData, handleInputChange, handleCheckboxChange, errors, touched, handleBlur }: HoroscopeAndPreferencesProps) => {
    const showError = (fieldName: string): boolean => {
        return !!(touched[fieldName] && errors[fieldName]);
    };

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Horoscope Information</h3>

            <div>
                <div className="flex items-center mb-4">
                    <input
                        type="checkbox"
                        id="horoscope.horoscope_matching_required"
                        name="horoscope.horoscope_matching_required"
                        checked={formData.horoscope.horoscope_matching_required}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                    />
                    <label htmlFor="horoscope.horoscope_matching_required" className="ml-2 block text-gray-700">
                        Horoscope Matching Required
                    </label>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="horoscope.birthdate" className="block text-gray-700 mb-1">
                        Birth Date for Horoscope
                    </label>
                    <input
                        type="date"
                        id="horoscope.birthdate"
                        name="horoscope.birthdate"
                        value={formData.horoscope.birthdate}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label htmlFor="horoscope.birth_time" className="block text-gray-700 mb-1">
                        Birth Time
                    </label>
                    <input
                        type="time"
                        id="horoscope.birth_time"
                        name="horoscope.birth_time"
                        value={formData.horoscope.birth_time}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="horoscope.birth_country" className="block text-gray-700 mb-1">
                        Birth Country
                    </label>
                    <select
                        id="horoscope.birth_country"
                        name="horoscope.birth_country"
                        value={formData.horoscope.birth_country}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
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
                    <label htmlFor="horoscope.birth_city" className="block text-gray-700 mb-1">
                        Birth City
                    </label>
                    <input
                        type="text"
                        id="horoscope.birth_city"
                        name="horoscope.birth_city"
                        value={formData.horoscope.birth_city}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
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
