export interface ProfilePicture {
    image_path: string;
}

export interface Horoscope {
    birthdate: string;
    birth_country: string;
    birth_city: string;
    birth_time: string;
    horoscope_matching_required: boolean;
}

export interface FamilyMember {
    ethnicity: string;
    religion: string;
    caste: string;
    country_of_residence: string;
    profession: string;
    additional_info: string;
}

export interface MatrimonyProfile {
    user_id: string;
    display_name: string;
    first_name?: string;
    last_name?: string;
    gender?: string;
    birthdate?: string;
    profession?: string;
    country_of_residence?: string;
    religion?: string;
    email?: string;
    picture?: {
        image_path: string;
    };
    profile_picture?: string;
    package_number?: number;
    boot_post?: number;
    is_active?: boolean;
    civil_status?: string;
    height?: string;
    education_level?: string;
    city?: string;
    food_preference?: string;
    smoking?: string;
    drinking?: string;
    ethnicity?: string;
    caste?: string;
    created_at?: string;
    account_created_by?: string;
    horoscope?: Horoscope;
    father?: FamilyMember;
    mother?: FamilyMember;
    matrimony?: Partial<MatrimonyProfile>;
}

export interface FilterOptions {
    countries: string[];
    religions: string[];
    educations: string[];
    genders: string[];
}

export interface ApiResponse {
    status: string | number;
    message?: string;
    data?: MatrimonyProfile[];
    'Matrimony profiles retrieved successfully'?: MatrimonyProfile[];
}
