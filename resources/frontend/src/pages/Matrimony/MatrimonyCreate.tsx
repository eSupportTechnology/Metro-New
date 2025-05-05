import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { renderPersonalInfoForm } from './CreateMatrimony/PersonalInformation';
import { renderParentsInfoForm } from './CreateMatrimony/ParentsInformation';
import { renderHoroscopeAndPreferencesForm } from './CreateMatrimony/HoroscopeAndPreferences';
import { renderReviewAndSubmitForm } from './CreateMatrimony/ReviewAndSubmit';
import { MatrimonyFormData } from '../../utilities/types/MatrimonyTypes';
import Header from '../MainWeb/NavBar/Header';
import Footer from '../MainWeb/Footer/Footer';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const progressAnimation = `
  @keyframes progress {
    0% { width: 0%; }
    100% { width: 100%; }
  }
  .animate-progress {
    animation: progress 3s linear forwards;
  }
`;

const MatrimonyCreate: React.FC = () => {
    const [currentStep, setCurrentStep] = useState<number>(1);
    const totalSteps = 4;
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const [formData, setFormData] = useState<MatrimonyFormData>({
        first_name: '',
        last_name: '',
        email: '',
        display_name: '',
        account_created_by: 'Self',
        birthdate: '',
        gender: 'Male',
        ethnicity: '',
        religion: '',
        caste: '',
        height: '',
        civil_status: 'Never Married',
        country_of_residence: 'Sri Lanka',
        state_district: '',
        city: '',
        visa_type: '',
        education_level: '',
        profession: '',
        drinking: 'No',
        food_preference: '',
        smoking: 'No',
        father: {
            ethnicity: '',
            religion: '',
            caste: '',
            country_of_residence: '',
            profession: '',
            additional_info: '',
        },
        mother: {
            ethnicity: '',
            religion: '',
            caste: '',
            country_of_residence: '',
            profession: '',
            additional_info: '',
        },
        horoscope: {
            birthdate: '',
            birth_country: '',
            horoscope_matching_required: false,
            birth_city: '',
            birth_time: '',
        },
        image: null,
    });

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
    const [redirectCountdown, setRedirectCountdown] = useState<number>(3);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData((prev) => {
                const parentObj = prev[parent as keyof MatrimonyFormData] as Record<string, any>;
                return {
                    ...prev,
                    [parent]: {
                        ...parentObj,
                        [child]: value,
                    },
                };
            });
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;

        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData((prev) => {
                const parentObj = prev[parent as keyof MatrimonyFormData] as Record<string, any>;
                return {
                    ...prev,
                    [parent]: {
                        ...parentObj,
                        [child]: checked,
                    },
                };
            });
        } else if (name === 'terms') {
            setTermsAccepted(checked);
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: checked,
            }));
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFormData((prev) => ({
                ...prev,
                image: file,
            }));

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!termsAccepted) {
            toast.error('Please accept the terms and conditions to proceed.');
            return;
        }

        setIsLoading(true);

        try {
            const matrimonyData = new FormData();

            for (const key in formData) {
                const value = formData[key as keyof MatrimonyFormData];
                if (key === 'image' && value instanceof File) {
                    matrimonyData.append('image', value);
                } else if (key === 'father' || key === 'mother' || key === 'horoscope') {
                    if (value) {
                        matrimonyData.append(key, JSON.stringify(value));
                    }
                } else if (value !== null && value !== undefined) {
                    matrimonyData.append(key, String(value));
                }
            }

            const response = await axios.post('http://127.0.0.1:8000/api/matrimony-create', matrimonyData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setIsLoading(false);

            if (response.data.status === 200 && response.data.message) {
                setIsSuccess(true);
                toast.success('Profile created successfully! Your profile will be reviewed and published soon.');

                let countdownValue = 3;
                const countdownInterval = setInterval(() => {
                    countdownValue -= 1;
                    setRedirectCountdown(countdownValue);

                    if (countdownValue <= 0) {
                        clearInterval(countdownInterval);
                        window.location.href = '/';
                    }
                }, 1000);
            } else {
                toast.warning(response.data.message || 'Something went wrong. Please try again.');
            }
        } catch (error: any) {
            setIsLoading(false);

            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 422 && error.response.data.errors) {
                    const validationErrors = error.response.data.errors;
                    const firstError = Object.values(validationErrors)[0];
                    toast.error(Array.isArray(firstError) ? firstError[0] : 'Validation failed');
                } else {
                    toast.error(error.response?.data?.message || 'Failed to create profile. Please try again.');
                }
            } else {
                toast.error('Network error. Please check your connection and try again.');
            }

            console.error('Error submitting form:', error);
        }
    };

    const nextStep = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
            window.scrollTo(0, 0);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
            window.scrollTo(0, 0);
        }
    };

    const renderProgressBar = () => {
        return (
            <div className="mb-8">
                <div className="flex justify-between">
                    {[...Array(totalSteps)].map((_, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                    currentStep > index + 1 ? 'bg-green-500 text-white' : currentStep === index + 1 ? 'bg-yellow-400 text-gray-800' : 'bg-gray-200 text-gray-500'
                                }`}
                            >
                                {currentStep > index + 1 ? '✓' : index + 1}
                            </div>
                            <span className="text-xs mt-1">{index === 0 ? 'Personal' : index === 1 ? 'Parents' : index === 2 ? 'Preferences' : 'Payment'}</span>
                        </div>
                    ))}
                </div>
                <div className="relative mt-2">
                    <div className="h-1 bg-gray-200 absolute w-full top-0"></div>
                    <div className="h-1 bg-yellow-400 absolute top-0 transition-all duration-300" style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}></div>
                </div>
            </div>
        );
    };

    const renderForm = () => {
        switch (currentStep) {
            case 1:
                return renderPersonalInfoForm({
                    formData,
                    handleInputChange,
                    handleImageChange,
                    previewUrl,
                });
            case 2:
                return renderParentsInfoForm({
                    formData,
                    handleInputChange,
                });
            case 3:
                return renderHoroscopeAndPreferencesForm({
                    formData,
                    handleInputChange,
                    handleCheckboxChange,
                });
            case 4:
                return renderReviewAndSubmitForm({
                    formData,
                    previewUrl,
                    isLoading,
                    termsAccepted,
                    setTermsAccepted,
                    handleSubmit,
                });
            default:
                return null;
        }
    };

    const SuccessOverlay = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
                <div className="text-center">
                    <div className="inline-flex rounded-full bg-green-100 p-4">
                        <div className="rounded-full bg-green-200 p-4">
                            <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    </div>
                    <h2 className="mt-4 text-2xl font-bold text-gray-800">Profile Created Successfully!</h2>
                    <p className="mt-2 text-gray-600">Your matrimony profile has been created and will be reviewed shortly.</p>
                    <div className="mt-6">
                        <div className="relative">
                            <div className="h-2 bg-green-200 rounded-full">
                                <div className="h-2 bg-green-500 rounded-full animate-progress"></div>
                            </div>
                        </div>
                        <p className="mt-2 text-sm text-gray-500">Redirecting in {redirectCountdown} seconds...</p>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="font-sans bg-gradient-to-b from-yellow-50 to-white min-h-screen">
            <style>{progressAnimation}</style>
            <Header />

            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

            {isSuccess && <SuccessOverlay />}

            <main className="pt-24 pb-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Create Matrimony Profile</h2>

                    {renderProgressBar()}

                    <div className="bg-white rounded-lg shadow-md p-8">{renderForm()}</div>

                    <div className="mt-6 flex justify-between">
                        {currentStep > 1 && (
                            <button
                                type="button"
                                onClick={prevStep}
                                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-md transition duration-300 flex items-center"
                                disabled={isSuccess}
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                            </button>
                        )}

                        {currentStep < totalSteps && (
                            <button
                                type="button"
                                onClick={nextStep}
                                className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium py-2 px-6 rounded-md transition duration-300 flex items-center ml-auto"
                                disabled={isSuccess}
                            >
                                Next <ArrowRight className="ml-2 h-4 w-4" />
                            </button>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default MatrimonyCreate;
