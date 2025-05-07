export interface ParentInfo {
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
    horoscope_matching_required: number;
    birth_city: string;
    birth_time: string;
}

export interface MatrimonyInfo {
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
}

export interface ProfileData {
    user_id: string;
    first_name: string;
    last_name: string;
    email: string;
    matrimony: MatrimonyInfo;
    father: ParentInfo;
    mother: ParentInfo;
    horoscope: Horoscope;
    profile_picture: string | null;
}
export type RouteParams = {
    profileId: string;
};
