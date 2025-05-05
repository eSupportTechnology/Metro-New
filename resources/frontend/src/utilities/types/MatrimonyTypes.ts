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
    horoscope_matching_required: boolean;
    birth_city: string;
    birth_time: string;
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
    father: ParentInfo;
    mother: ParentInfo;
    horoscope: Horoscope;
    image: File | null;
}
