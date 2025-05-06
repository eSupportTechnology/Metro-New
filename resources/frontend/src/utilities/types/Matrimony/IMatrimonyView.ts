import React from 'react';

export interface Matrimony {
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
    profession: string;
    drinking: string;
    food_preference: string;
    smoking: string;
    created_at: string;
    boot_post?: number;
}

export interface Parent {
    ethnicity: string;
    religion: string;
    caste: string;
    country_of_residence: string;
    profession: string;
    additional_info: string;
}

export interface Horoscope {
    birthdate: string;
    birth_country: string;
    horoscope_matching_required: boolean;
    birth_city: string;
    birth_time: string;
}

export interface Picture {
    image_path: string;
}

export interface Profile {
    user_id: string;
    first_name: string;
    last_name: string;
    email: string;
    matrimony: Matrimony;
    father?: Parent;
    mother?: Parent;
    horoscope?: Horoscope;
    profile_picture: string | null;
    picture?: Picture;
    display_name?: string;
    account_created_by?: string;
    birthdate?: string;
    gender?: string;
    ethnicity?: string;
    religion?: string;
    caste?: string;
    height?: string;
    civil_status?: string;
    country_of_residence?: string;
    state_district?: string;
    city?: string;
    visa_type?: string;
    education_level?: string;
    profession?: string;
    drinking?: string;
    food_preference?: string;
    smoking?: string;
    created_at?: string;
    boot_post?: number;
}

export interface FilterOption {
    name: string;
    icon: React.ReactNode;
    options?: string[];
    min?: number;
    max?: number;
}
