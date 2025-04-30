export interface FormData {
    // Personal Details
    firstName: string;
    lastName: string;
    displayName: string;
    displayNameFormat: string;
    birthDate: string;
    birthMonth: string;
    birthYear: string;
    gender: string;
    ethnicity: string;
    religion: string;
    caste: string;
    civilStatus: string;
    height: string;
    accountCreatedBy: string;

    // Residency Details
    countryOfResidence: string;
    state: string;
    city: string;
    visaType: string;

    // Education & Profession
    educationLevel: string;
    profession: string;

    // Habits
    drinking: string;
    smoking: string;
    foodPreference: string;

    // Parents Details
    fatherEthnicity: string;
    fatherReligion: string;
    fatherCountry: string;

    motherEthnicity: string;
    motherReligion: string;
    motherCountry: string;

    // Description
    description: string;
    differentlyAbled: string;

    // Private Details
    horoscopeMatching: string;
    birthCity: string;
    birthTime: string;
}
