import React from 'react';

export interface ParentInfo {
    ethnicity: string;
    religion: string;
    caste: string;
    country_of_residence: string;
    profession: string;
    additional_info: string;
}

export interface MatrimonyFormData {
    first_name: string;
    last_name: string;
    email: string;
    display_name: string;
    account_created_by: string;
    birthdate: string;
    gender: string;
    ethnicity: string;
    religion: string;
    caste: string;
    height: string;
    civil_status: string;
    country_of_residence: string;
    state_district: string;
    city: string;
    visa_type: string;
    education_level: string;
    package_id?: number | null;
    profession: string;
    drinking: string;
    food_preference: string;
    smoking: string;
    nic_number: string;
    father: ParentInfo;
    mother: ParentInfo;
    image: File | null;
    nic_front_image: File | null;
    nic_back_image: File | null;
}

export interface PackageSelectionProps {
    formData: MatrimonyFormData;
    handlePackageSelect: (packageId: number) => void;
    errors: Record<string, string>;
    currency: string;
    setCurrency: (currency: string) => void;
}

export interface ValidationRule {
    required?: boolean;
    max?: number;
    email?: boolean;
    date?: boolean;
    message?: string;
}

export interface ValidationSchemaSection {
    [field: string]: ValidationRule;
}

export interface HoroscopeAndPreferencesProps {
    formData: MatrimonyFormData;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    nicFrontPreviewUrl: string | null;
    nicBackPreviewUrl: string | null;
    errors: Record<string, string>;
    touched: Record<string, boolean>;
    handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export interface ParentsInfoProps {
    formData: MatrimonyFormData;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    errors: Record<string, string>;
    touched: Record<string, boolean>;
    handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export interface PersonalInfoProps {
    formData: MatrimonyFormData;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    previewUrl: string | null;
    errors: Record<string, string>;
    touched: Record<string, boolean>;
    handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export interface ReviewAndSubmitProps {
    formData: MatrimonyFormData;
    previewUrl: string | null;
    nicFrontPreviewUrl: string | null;
    nicBackPreviewUrl: string | null;
    isLoading: boolean;
    termsAccepted: boolean;
    setTermsAccepted: React.Dispatch<React.SetStateAction<boolean>>;
    handleSubmit: (e: React.FormEvent) => Promise<void>;
    errors: Record<string, string>;
}
