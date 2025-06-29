import React from 'react';
import { ReviewAndSubmitProps } from '../../../utilities/types/Matrimony/MatrimonyTypes';

export const renderReviewAndSubmitForm = ({ formData, previewUrl, nicFrontPreviewUrl, nicBackPreviewUrl, isLoading, termsAccepted, setTermsAccepted, handleSubmit, errors }: ReviewAndSubmitProps) => {
    const hasErrors = Object.keys(errors).length > 0;
    const renderField = (label: string, value: string | undefined | null) => {
        return value ? (
            <div className="mb-2">
                <span className="font-medium text-gray-700">{label}: </span>
                <span>{value}</span>
            </div>
        ) : null;
    };

    const getPackageName = (packageId: number | null): string => {
        if (!packageId) return 'Not selected';
        switch (packageId) {
            case 1:
                return '2 Months Basic';
            case 2:
                return '3 Months Basic';
            case 3:
                return '3 Months Pro';
            default:
                return `Package #${packageId}`;
        }
    };

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Review Your Information</h3>

            {hasErrors && (
                <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    <p className="font-bold">Please correct the following errors before submission:</p>
                    <ul className="list-disc pl-5 mt-2">
                        {Object.entries(errors).map(([field, message]) => (
                            <li key={field}>{message}</li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <div>
                    <h4 className="text-lg font-semibold text-gray-700 mb-3">Personal Details</h4>
                    <div className="bg-gray-50 p-4 rounded-md">
                        {renderField('First Name', formData.first_name)}
                        {renderField('Last Name', formData.last_name)}
                        {renderField('Display Name', formData.display_name)}
                        {renderField('Email', formData.email)}
                        {renderField('Account Created By', formData.account_created_by)}
                        {renderField('Birth Date', formData.birthdate)}
                        {renderField('NIC Number', formData.nic_number)}
                        {renderField('Gender', formData.gender)}
                        {renderField('Ethnicity', formData.ethnicity)}
                        {renderField('Religion', formData.religion)}
                        {renderField('Caste', formData.caste)}
                        {renderField('Height', formData.height)}
                        {renderField('Civil Status', formData.civil_status)}
                        {renderField('Country of Residence', formData.country_of_residence)}
                        {renderField('State/District', formData.state_district)}
                        {renderField('City', formData.city)}

                        {previewUrl && (
                            <div className="mt-4">
                                <p className="font-medium text-gray-700 mb-2">Profile Image:</p>
                                <img src={previewUrl} alt="Profile Preview" className="h-40 w-40 object-cover rounded-md border-2 border-gray-300" />
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <h4 className="text-lg font-semibold text-gray-700 mb-3">Parents' Information</h4>
                    <div className="bg-gray-50 p-4 rounded-md">
                        <h5 className="font-medium text-gray-600 mb-2">Father</h5>
                        {renderField('Ethnicity', formData.father.ethnicity)}
                        {renderField('Religion', formData.father.religion)}
                        {renderField('Caste', formData.father.caste)}
                        {renderField('Country of Residence', formData.father.country_of_residence)}
                        {renderField('Profession', formData.father.profession)}
                        {renderField('Additional Info', formData.father.additional_info)}

                        <h5 className="font-medium text-gray-600 mt-4 mb-2">Mother</h5>
                        {renderField('Ethnicity', formData.mother.ethnicity)}
                        {renderField('Religion', formData.mother.religion)}
                        {renderField('Caste', formData.mother.caste)}
                        {renderField('Country of Residence', formData.mother.country_of_residence)}
                        {renderField('Profession', formData.mother.profession)}
                        {renderField('Additional Info', formData.mother.additional_info)}
                    </div>

                    <h4 className="text-lg font-semibold text-gray-700 mt-6 mb-3">Identity Documents</h4>
                    <div className="bg-gray-50 p-4 rounded-md">
                        {renderField('NIC Number', formData.nic_number)}

                        <div className="mt-4 space-y-4">
                            {nicFrontPreviewUrl && (
                                <div>
                                    <p className="font-medium text-gray-700 mb-2">NIC Front Image:</p>
                                    <img src={nicFrontPreviewUrl} alt="NIC Front Preview" className="h-32 w-auto object-cover rounded-md border-2 border-gray-300" />
                                </div>
                            )}
                            {nicBackPreviewUrl && (
                                <div>
                                    <p className="font-medium text-gray-700 mb-2">NIC Back Image:</p>
                                    <img src={nicBackPreviewUrl} alt="NIC Back Preview" className="h-32 w-auto object-cover rounded-md border-2 border-gray-300" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <h4 className="text-lg font-semibold text-gray-700 mb-3">Education & Lifestyle</h4>
                <div className="bg-gray-50 p-4 rounded-md">
                    {renderField('Education Level', formData.education_level)}
                    {renderField('Profession', formData.profession)}
                    {renderField('Visa Type', formData.visa_type)}
                    {renderField('Drinking', formData.drinking)}
                    {renderField('Smoking', formData.smoking)}
                    {renderField('Food Preference', formData.food_preference)}
                </div>
            </div>

            <div className="mt-4">
                <h4 className="text-lg font-semibold text-gray-700 mb-3">Package Information</h4>
                <div className="bg-yellow-50 p-4 rounded-md">
                    {renderField('Selected Package', getPackageName(formData.package_id as number))}
                    {!formData.package_id && <p className="text-red-500 text-sm mt-2">No package selected. Please go back to the package selection page.</p>}
                </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                <div className="flex items-center mb-4">
                    <input
                        type="checkbox"
                        id="terms"
                        name="terms"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                        className="h-5 w-5 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                    />
                    <label htmlFor="terms" className="ml-2 block text-gray-700">
                        I agree to the{' '}
                        <a href="#" className="text-blue-600 hover:underline">
                            Terms and Conditions
                        </a>{' '}
                        and{' '}
                        <a href="#" className="text-blue-600 hover:underline">
                            Privacy Policy
                        </a>
                    </label>
                </div>
                {!termsAccepted && <p className="text-red-500 text-xs mt-1">You must accept the terms and conditions to proceed</p>}

                <p className="text-sm text-gray-600 italic">
                    By submitting this form, you confirm that all information provided is accurate and true to the best of your knowledge. Your profile will be reviewed by our team before being
                    published.
                </p>
            </div>

            <div className="mt-6">
                <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isLoading || hasErrors || !formData.package_id}
                    className={`w-full py-3 px-4 rounded-md font-semibold flex items-center justify-center ${
                        isLoading || hasErrors || !formData.package_id ? 'bg-gray-400 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-600'
                    } text-white transition duration-300`}
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            Processing...
                        </>
                    ) : !formData.package_id ? (
                        'Please select a package first'
                    ) : hasErrors ? (
                        'Please fix errors before submitting'
                    ) : (
                        'Submit Matrimony Profile'
                    )}
                </button>
            </div>

            {hasErrors && <p className="text-sm text-red-600 text-center mt-4">Please return to previous steps and correct all errors before submitting your profile.</p>}
            {!formData.package_id && <p className="text-sm text-red-600 text-center mt-4">You must select a package before submitting your profile.</p>}
        </div>
    );
};
