import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { renderParentsInfoForm } from './CreateMatrimony/ParentsInformation';
import { renderHoroscopeAndPreferencesForm } from './CreateMatrimony/HoroscopeAndPreferences';
import { renderReviewAndSubmitForm } from './CreateMatrimony/ReviewAndSubmit';
import { MatrimonyFormData, ValidationSchemaSection } from '../../utilities/types/Matrimony/MatrimonyTypes';
import Header from '../MainWeb/NavBar/Header';
import Footer from '../MainWeb/Footer/Footer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiService from '../../utilities/apiService';
import apiConfig from '../../utilities/apiConfig';
import { getValidationRule, validationSchema } from '../../utilities/types/Matrimony/MatrimonyCreatevalidation';
import PersonalInfoForm from './CreateMatrimony/PersonalInformation';
import { IRootState } from '../../store';
import { useSelector } from 'react-redux';

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
    const [currentStep, setCurrentStep] = React.useState<number>(1);
    const [isSuccess, setIsSuccess] = React.useState<boolean>(false);
    const [errors, setErrors] = React.useState<Record<string, string>>({});
    const [touched, setTouched] = React.useState<Record<string, boolean>>({});
    const userToken = useSelector((state: IRootState) => state.auth.userToken);
    const [formData, setFormData] = React.useState<MatrimonyFormData>({
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
    const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [termsAccepted, setTermsAccepted] = React.useState<boolean>(false);
    const [redirectCountdown, setRedirectCountdown] = React.useState<number>(3);
    const totalSteps = 4;

    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const validateStep = (step: number): boolean => {
        const newErrors: Record<string, string> = {};
        let isValid = true;

        const schemaToUse: ValidationSchemaSection = step === 1 ? validationSchema.step1 : step === 2 ? validationSchema.step2 : step === 3 ? validationSchema.step3 : {};

        Object.entries(schemaToUse).forEach(([field, rules]) => {
            if (field.includes('.')) {
                const [parent, child] = field.split('.');
                const parentObj = formData[parent as keyof MatrimonyFormData] as Record<string, any>;
                const value = parentObj ? parentObj[child] : '';

                if (rules.required && (!value || value.trim() === '')) {
                    newErrors[field] = rules.message || `${field} is required`;
                    isValid = false;
                }
            } else {
                const value = formData[field as keyof MatrimonyFormData] as string;

                if (rules.required && (!value || value.trim() === '')) {
                    newErrors[field] = rules.message || `${field} is required`;
                    isValid = false;
                }

                if (field === 'email' && value && !isValidEmail(value)) {
                    newErrors[field] = 'Please enter a valid email address';
                    isValid = false;
                }

                if (rules.max && value && value.length > rules.max) {
                    newErrors[field] = `${field} must be less than ${rules.max} characters`;
                    isValid = false;
                }
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTouched((prev) => ({
            ...prev,
            [name]: true,
        }));

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
        validateField(name, value);
    };

    const validateField = (name: string, value: string): void => {
        const fieldSchema = getValidationRule(name);

        if (!fieldSchema) return;

        let fieldError = '';

        if (fieldSchema.required && (!value || value.trim() === '')) {
            fieldError = fieldSchema.message || `${name} is required`;
        }

        if (name === 'email' && value && !isValidEmail(value)) {
            fieldError = 'Please enter a valid email address';
        }

        if (fieldSchema.max && value && value.length > fieldSchema.max) {
            fieldError = `${name} must be less than ${fieldSchema.max} characters`;
        }
        setErrors((prev) => ({
            ...prev,
            [name]: fieldError,
        }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setTouched((prev) => ({
            ...prev,
            [name]: true,
        }));

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

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setTouched((prev) => ({
            ...prev,
            [name]: true,
        }));

        validateField(name, value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateStep(3) || !termsAccepted) {
            if (!termsAccepted) {
                toast.error('Please accept the terms and conditions to proceed.');
            } else {
                toast.error('Please fill in all required fields correctly before submitting.');
            }
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

            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Authentication token is missing.');
                setIsLoading(false);
                return;
            }

            const headers = {
                Authorization: `Bearer ${token}`,
            };

            const response = await apiService.postFormData(apiConfig.endpoints.matrimony.create, matrimonyData, { headers });

            setIsLoading(false);

            if (response.status === 200 && response.message) {
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
                toast.warning(response.message || 'Something went wrong. Please try again.');
            }
        } catch (error: any) {
            setIsLoading(false);
            if (error.response) {
                if (error.response.status === 422 && error.response.data?.errors) {
                    const validationErrors = error.response.data.errors;
                    Object.keys(validationErrors).forEach((field) => {
                        const errorMessage = validationErrors[field][0];
                        setErrors((prev) => ({
                            ...prev,
                            [field]: errorMessage,
                        }));
                    });

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
        if (validateStep(currentStep)) {
            setCurrentStep(currentStep + 1);
            window.scrollTo(0, 0);
        } else {
            const stepSchema = currentStep === 1 ? validationSchema.step1 : currentStep === 2 ? validationSchema.step2 : validationSchema.step3;

            const stepFields = Object.keys(stepSchema);
            const newTouched: Record<string, boolean> = { ...touched };

            stepFields.forEach((field) => {
                newTouched[field] = true;
            });

            setTouched(newTouched);

            toast.error('Please fill in all required fields correctly before proceeding.');
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
                            <span className="text-xs mt-1">{index === 0 ? 'Personal' : index === 1 ? 'Parents' : index === 2 ? 'Preferences' : 'Review'}</span>
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
                return (
                    <PersonalInfoForm
                        formData={formData}
                        handleInputChange={handleInputChange}
                        handleImageChange={handleImageChange}
                        previewUrl={previewUrl}
                        errors={errors}
                        touched={touched}
                        handleBlur={handleBlur}
                    />
                );
            case 2:
                return renderParentsInfoForm({
                    formData,
                    handleInputChange,
                    errors,
                    touched,
                    handleBlur,
                });
            case 3:
                return renderHoroscopeAndPreferencesForm({
                    formData,
                    handleInputChange,
                    handleCheckboxChange,
                    errors,
                    touched,
                    handleBlur,
                });
            case 4:
                return renderReviewAndSubmitForm({
                    formData,
                    previewUrl,
                    isLoading,
                    termsAccepted,
                    setTermsAccepted,
                    handleSubmit,
                    errors,
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
