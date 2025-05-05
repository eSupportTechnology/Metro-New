import React from 'react';
import { User, MapPin, BookOpen, Briefcase, Heart } from 'lucide-react';
import { MatrimonyFormData } from '../../utilities/types/MatrimonyTypes';

interface ReviewAndSubmitProps {
    formData: MatrimonyFormData;
    previewUrl: string | null;
    isLoading: boolean;
    termsAccepted: boolean;
    setTermsAccepted: (accepted: boolean) => void;
    handleSubmit: (e: React.FormEvent) => void;
}

export const renderReviewAndSubmitForm = ({ formData, previewUrl, isLoading, termsAccepted, setTermsAccepted, handleSubmit }: ReviewAndSubmitProps) => {
    return (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Review & Submit</h3>

            <div className="bg-yellow-50 p-4 rounded-md mb-6">
                <p className="text-sm text-gray-700">
                    Please review your information carefully before submitting. Once submitted, your profile will be reviewed by our team and published after verification.
                </p>
            </div>

            <div className="space-y-6">
                <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
                    <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                        <User className="h-5 w-5 mr-2 text-yellow-500" />
                        Basic Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="text-gray-500">Name</p>
                            <p className="font-medium">
                                {formData.first_name} {formData.last_name}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-500">Display Name</p>
                            <p className="font-medium">{formData.display_name}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Email</p>
                            <p className="font-medium">{formData.email}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Account Created By</p>
                            <p className="font-medium">{formData.account_created_by}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Birth Date</p>
                            <p className="font-medium">{formData.birthdate}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Gender</p>
                            <p className="font-medium">{formData.gender}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Religion</p>
                            <p className="font-medium">{formData.religion || 'Not specified'}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Ethnicity</p>
                            <p className="font-medium">{formData.ethnicity || 'Not specified'}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Civil Status</p>
                            <p className="font-medium">{formData.civil_status}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Height</p>
                            <p className="font-medium">{formData.height || 'Not specified'}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
                    <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                        <MapPin className="h-5 w-5 mr-2 text-yellow-500" />
                        Location Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="text-gray-500">Country of Residence</p>
                            <p className="font-medium">{formData.country_of_residence}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">State/District</p>
                            <p className="font-medium">{formData.state_district || 'Not specified'}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">City</p>
                            <p className="font-medium">{formData.city || 'Not specified'}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Visa Type</p>
                            <p className="font-medium">{formData.visa_type || 'Not specified'}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
                    <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                        <BookOpen className="h-5 w-5 mr-2 text-yellow-500" />
                        Education & Career
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="text-gray-500">Education Level</p>
                            <p className="font-medium">{formData.education_level || 'Not specified'}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Profession</p>
                            <p className="font-medium">{formData.profession || 'Not specified'}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
                    <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                        <Briefcase className="h-5 w-5 mr-2 text-yellow-500" />
                        Lifestyle
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                            <p className="text-gray-500">Drinking</p>
                            <p className="font-medium">{formData.drinking}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Smoking</p>
                            <p className="font-medium">{formData.smoking}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Food Preference</p>
                            <p className="font-medium">{formData.food_preference || 'Not specified'}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
                    <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                        <Heart className="h-5 w-5 mr-2 text-yellow-500" />
                        Horoscope Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="text-gray-500">Horoscope Matching Required</p>
                            <p className="font-medium">{formData.horoscope.horoscope_matching_required ? 'Yes' : 'No'}</p>
                        </div>
                        {formData.horoscope.horoscope_matching_required && (
                            <>
                                <div>
                                    <p className="text-gray-500">Birth Date for Horoscope</p>
                                    <p className="font-medium">{formData.horoscope.birthdate || 'Not specified'}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Birth Time</p>
                                    <p className="font-medium">{formData.horoscope.birth_time || 'Not specified'}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Birth Place</p>
                                    <p className="font-medium">
                                        {formData.horoscope.birth_city && formData.horoscope.birth_country ? `${formData.horoscope.birth_city}, ${formData.horoscope.birth_country}` : 'Not specified'}
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {previewUrl && (
                    <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
                        <h4 className="font-medium text-gray-800 mb-2">Profile Image</h4>
                        <img src={previewUrl} alt="Profile" className="h-48 w-48 object-cover rounded-md" />
                    </div>
                )}
            </div>

            <div className="border-t border-gray-200 pt-6 mt-6">
                <div className="flex items-center mb-4">
                    <input
                        type="checkbox"
                        id="terms"
                        name="terms"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                        className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                    />
                    <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                        I agree to the{' '}
                        <a href="#" className="text-yellow-600 hover:underline">
                            Terms and Conditions
                        </a>{' '}
                        and{' '}
                        <a href="#" className="text-yellow-600 hover:underline">
                            Privacy Policy
                        </a>
                    </label>
                </div>

                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!termsAccepted || isLoading}
                    className={`w-full font-medium py-3 px-4 rounded-md transition duration-300 flex justify-center items-center ${
                        termsAccepted ? 'bg-yellow-400 hover:bg-yellow-500 text-gray-800' : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            Processing...
                        </>
                    ) : (
                        'Submit Profile'
                    )}
                </button>
            </div>
        </div>
    );
};
