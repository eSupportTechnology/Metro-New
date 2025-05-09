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
    profession: string;
    drinking: string;
    food_preference: string;
    smoking: string;
    created_at: string;
    boot_post: number;
    package_number?: number;
    is_active?: boolean;
    picture?: ProfilePicture;
    father?: FamilyMember;
    mother?: FamilyMember;
    horoscope?: Horoscope;
}

export interface FilterOptions {
    countries: string[];
    religions: string[];
    educations: string[];
    genders: string[];
}

export interface ApiResponse {
    status: number | string;
    message?: string;
    data?: MatrimonyProfile[];
    'Matrimony profiles retrieved successfully'?: MatrimonyProfile[];
}
