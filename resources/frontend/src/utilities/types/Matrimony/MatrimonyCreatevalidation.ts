import { ValidationRule, ValidationSchemaSection } from './MatrimonyTypes';

export const validationSchema = {
    step1: {
        first_name: { required: true, max: 255, message: 'First Name is required' },
        last_name: { required: true, max: 255, message: 'Last Name is required' },
        email: { required: true, email: true, message: 'A valid email is required' },
        display_name: { required: true, message: 'Display Name is required' },
        account_created_by: { required: true, message: 'Please select who created this account' },
        birthdate: { required: true, date: true, message: 'Birth Date is required' },
        gender: { required: true, message: 'Gender is required' },
        ethnicity: { required: true, message: 'Ethnicity is required' },
        religion: { required: true, message: 'Religion is required' },
        country_of_residence: { required: true, message: 'Country of Residence is required' },
        state_district: { required: true, message: 'State/District is required' },
    } as ValidationSchemaSection,
    step2: {
        'father.country_of_residence': { required: false },
        'mother.country_of_residence': { required: false },
    } as ValidationSchemaSection,
    step3: {
        education_level: { required: true, message: 'Education Level is required' },
        profession: { required: true, message: 'Profession is required' },
    } as ValidationSchemaSection,
};

export const getValidationRule = (field: string): ValidationRule | undefined => {
    if (validationSchema.step1[field]) {
        return validationSchema.step1[field];
    } else if (validationSchema.step2[field]) {
        return validationSchema.step2[field];
    } else if (validationSchema.step3[field]) {
        return validationSchema.step3[field];
    }
    return undefined;
};
