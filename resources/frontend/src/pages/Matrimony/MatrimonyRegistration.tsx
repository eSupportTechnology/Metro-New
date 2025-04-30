import React, { useState, useEffect } from 'react';
import { ChevronDown, Shield, UserCheck, DollarSign, Headphones, Heart } from 'lucide-react';
import PersonalDetails from './CreateMatrimony/PersonalDetails';
import ParentsDetails from './CreateMatrimony/ParentsDetails';
import PrivateDetails from './CreateMatrimony/PrivateDetails';
import Description from './CreateMatrimony/Description';
import ResidencyEducation from './CreateMatrimony/ResidencyEducation';
import { FormData } from './CreateMatrimony/types';
import Header from '../MainWeb/NavBar/Header';
import Footer from '../MainWeb/Footer/Footer';
const MatrimonyRegistration: React.FC = () => {
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [formData, setFormData] = useState<FormData>({
        // Personal Details
        firstName: '',
        lastName: '',
        displayName: 'N Jayathilake',
        displayNameFormat: 'First Letter of First Name and Full Last Name',
        birthDate: '14',
        birthMonth: 'Apr',
        birthYear: '1981',
        gender: 'Male',
        ethnicity: 'Burgher',
        religion: 'Hindu',
        caste: '',
        civilStatus: 'Never Married',
        height: '4ft 10in (147cm)',
        accountCreatedBy: 'Self',

        // Residency Details
        countryOfResidence: 'Australia',
        state: 'Tasmania',
        city: 'Badulla',
        visaType: 'Work Permit / Visa',

        // Education & Profession
        educationLevel: "Master's Degree or Equivalent",
        profession: 'Hotelier',

        // Habits
        drinking: 'Yes',
        smoking: 'Yes',
        foodPreference: 'Vegan',

        // Parents Details
        fatherEthnicity: '',
        fatherReligion: '',
        fatherCountry: '',

        motherEthnicity: '',
        motherReligion: '',
        motherCountry: '',

        // Description
        description: '',
        differentlyAbled: 'No',

        // Private Details
        horoscopeMatching: '',
        birthCity: '',
        birthTime: '',
    });

    // Update display name when firstName, lastName, or displayNameFormat changes
    useEffect(() => {
        const updateDisplayName = () => {
            if (formData.firstName && formData.lastName) {
                if (formData.displayNameFormat === 'First Letter of First Name and Full Last Name') {
                    setFormData((prev) => ({
                        ...prev,
                        displayName: `${formData.firstName.charAt(0)} ${formData.lastName}`,
                    }));
                } else if (formData.displayNameFormat === 'Full First Name and First Letter of Last Name') {
                    setFormData((prev) => ({
                        ...prev,
                        displayName: `${formData.firstName} ${formData.lastName.charAt(0)}`,
                    }));
                } else if (formData.displayNameFormat === 'First Name Only') {
                    setFormData((prev) => ({
                        ...prev,
                        displayName: formData.firstName,
                    }));
                }
            }
        };

        updateDisplayName();
    }, [formData.firstName, formData.lastName, formData.displayNameFormat]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Here you would typically send the data to your backend
        alert('Registration submitted successfully!');
    };

    const steps = [
        { name: 'Personal Details', icon: <UserCheck size={18} /> },
        { name: 'Parents Details', icon: <Heart size={18} /> },
        { name: 'Private Details', icon: <Shield size={18} /> },
        { name: 'Education & Profession', icon: <DollarSign size={18} /> },
        { name: 'Description', icon: <Headphones size={18} /> },
    ];

    const renderStepIndicator = () => (
        <>
            <Header />
            <div className="mb-8 mt-5">
                <div className="flex justify-between items-center">
                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center ${index === currentStep ? 'bg-yellow-400' : index < currentStep ? 'bg-green-500' : 'bg-gray-200'}`}
                            >
                                {index < currentStep ? <span className="text-white">✓</span> : <span className={`${index === currentStep ? 'text-gray-800' : 'text-gray-500'}`}>{step.icon}</span>}
                            </div>
                            <span className={`mt-2 text-sm ${index === currentStep ? 'font-semibold' : 'text-gray-500'}`}>{step.name}</span>
                        </div>
                    ))}
                </div>
                <div className="relative mt-2">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 rounded">
                        <div className="h-full bg-yellow-400 rounded" style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}></div>
                    </div>
                </div>
            </div>
        </>
    );

    const renderCurrentStep = () => {
        switch (currentStep) {
            case 0:
                return <PersonalDetails formData={formData} handleInputChange={handleInputChange} setCurrentStep={setCurrentStep} />;
            case 1:
                return <ParentsDetails formData={formData} handleInputChange={handleInputChange} setCurrentStep={setCurrentStep} />;
            case 2:
                return <PrivateDetails formData={formData} handleInputChange={handleInputChange} setCurrentStep={setCurrentStep} />;
            case 3:
                return <ResidencyEducation formData={formData} handleInputChange={handleInputChange} setCurrentStep={setCurrentStep} />;
            case 4:
                return <Description formData={formData} handleInputChange={handleInputChange} handleSubmit={handleSubmit} setCurrentStep={setCurrentStep} />;
            default:
                return <PersonalDetails formData={formData} handleInputChange={handleInputChange} setCurrentStep={setCurrentStep} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-3xl mt-5 font-bold text-gray-900">Matrimony Registration</h1>
                    <p className="mt-2 text-gray-600">Find your perfect match with us</p>
                </div>

                {renderStepIndicator()}

                <form onSubmit={handleSubmit}>{renderCurrentStep()}</form>

                <div className="mt-8 text-center text-sm text-gray-500">
                    <p>By registering, you agree to our Terms of Service and Privacy Policy</p>
                </div>
            </div>
        </div>
    );
};

export default MatrimonyRegistration;
