export interface ProfilePicture {
    image_path: string;
}

export interface NicDetails {
    nic_number: string;
    nic_front_image: string;
    nic_back_image: string;
    nic_front_image_url: string | null;
    nic_back_image_url: string | null;
    nic_front_image_data: string | null;
    nic_back_image_data: string | null;
    nic_front_exists?: boolean;
    nic_back_exists?: boolean;
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
    profile_picture_url?: string | null;
    profile_picture_exists?: boolean;
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

    nic_details?: NicDetails;

    father?: FamilyMember;
    mother?: FamilyMember;
    matrimony?: Partial<MatrimonyProfile>;
}

export interface FilterOptions {
    countries: string[];
    religions: string[];
    educations: string[];
    genders: string[];
    packages?: string[];
    civil_statuses?: string[];
    ethnicities?: string[];
}

export interface ApiResponse {
    status: string | number;
    message?: string;
    data?: MatrimonyProfile[];
    'Matrimony profiles retrieved successfully'?: MatrimonyProfile[];
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
    profession: string;
    drinking: string;
    food_preference: string;
    smoking: string;
    package_id: number | null;
    nic_number: string;
    father: FamilyMember;
    mother: FamilyMember;
    image: File | null;
    nic_front_image: File | null;
    nic_back_image: File | null;
}

export interface MatrimonyApiResponse {
    status: number;
    message: string;
    data: MatrimonyProfile[];
}

export interface SingleProfileApiResponse {
    status: number;
    message: string;
    data: MatrimonyProfile;
}

export interface NicVerificationResponse {
    status: number;
    nic_exists: boolean;
    message: string;
}

export interface ProfileActionResponse {
    status: number;
    message: string;
    data?: any;
}

export interface ImageUploadResponse {
    status: number;
    message: string;
    data: {
        image_path?: string;
        image_url?: string;
        nic_front_image_url?: string;
        nic_back_image_url?: string;
    };
}
