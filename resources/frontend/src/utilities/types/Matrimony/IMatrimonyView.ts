import { ReactNode } from 'react';

export interface Matrimony {
    id?: number;
    user_id?: number;
    display_name?: string;
    gender?: string;
    birthdate?: string;
    religion?: string;
    height?: string;
    ethnicity?: string;
    profession?: string;
    education_level?: string;
    country_of_residence?: string;
    state_district?: string;
    city?: string;
    civil_status?: string;
    boot_post?: number;
    food_preference?: string;
    drinking?: string;
    smoking?: string;
    account_created_by?: string;
    created_at?: string;
    updated_at?: string;
}

export interface Picture {
    id?: number;
    user_id?: number;
    image_path?: string;
    created_at?: string;
    updated_at?: string;
}

export interface Profile {
    id?: number;
    user_id?: number;
    first_name?: string;
    last_name?: string;
    display_name?: string;
    gender?: string;
    birthdate?: string;
    profile_picture?: string;
    picture?: Picture;
    religion?: string;
    height?: string;
    ethnicity?: string;
    profession?: string;
    education_level?: string;
    country_of_residence?: string;
    state_district?: string;
    city?: string;
    civil_status?: string;
    boot_post?: number;
    food_preference?: string;
    drinking?: string;
    smoking?: string;
    account_created_by?: string;
    created_at?: string;
    updated_at?: string;
    matrimony?: Matrimony;
}

export interface FilterOption {
    name: string;
    icon: ReactNode;
    options?: string[];
    min?: number;
    max?: number;
}

export interface SortOption {
    label: string;
    value: string;
}
