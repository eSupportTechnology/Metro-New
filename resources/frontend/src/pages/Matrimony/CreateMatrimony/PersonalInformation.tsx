import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../store';

export interface PersonalInfoFormProps {
    formData: any;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    previewUrl: string | null;
    errors: Record<string, string>;
    touched: Record<string, boolean>;
    handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ formData, handleInputChange, handleImageChange, previewUrl, errors, touched, handleBlur }) => {
    const { firstName, lastName, email } = useSelector((state: IRootState) => state.auth);
    const showError = (fieldName: string): boolean => {
        return !!(touched[fieldName] && errors[fieldName]);
    };

    useEffect(() => {
        if (firstName && !formData.first_name) {
            const event = {
                target: { name: 'first_name', value: firstName },
                currentTarget: { name: 'first_name', value: firstName },
            } as React.ChangeEvent<HTMLInputElement>;
            handleInputChange(event);
        }

        if (lastName && !formData.last_name) {
            const event = {
                target: { name: 'last_name', value: lastName },
                currentTarget: { name: 'last_name', value: lastName },
            } as React.ChangeEvent<HTMLInputElement>;
            handleInputChange(event);
        }

        if (email && !formData.email) {
            const event = {
                target: { name: 'email', value: email },
                currentTarget: { name: 'email', value: email },
            } as React.ChangeEvent<HTMLInputElement>;
            handleInputChange(event);
        }
    }, []);

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Basic Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="first_name" className="block text-gray-700 mb-1">
                        First Name*
                    </label>
                    <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={`w-full px-3 py-2 border ${showError('first_name') ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent`}
                        required
                        readOnly
                    />
                    {showError('first_name') && <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>}
                </div>

                <div>
                    <label htmlFor="last_name" className="block text-gray-700 mb-1">
                        Last Name*
                    </label>
                    <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={`w-full px-3 py-2 border ${showError('last_name') ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent`}
                        required
                        readOnly
                    />
                    {showError('last_name') && <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>}
                </div>
            </div>

            <div>
                <label htmlFor="email" className="block text-gray-700 mb-1">
                    Email*
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full px-3 py-2 border ${showError('email') ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent`}
                    required
                    readOnly
                />
                {showError('email') && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
                <label htmlFor="display_name" className="block text-gray-700 mb-1">
                    Display Name*
                </label>
                <input
                    type="text"
                    id="display_name"
                    name="display_name"
                    value={formData.display_name}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full px-3 py-2 border ${showError('display_name') ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent`}
                    required
                />
                {showError('display_name') && <p className="text-red-500 text-xs mt-1">{errors.display_name}</p>}
                <p className="text-xs text-gray-500 mt-1">Only the first name and first letter of the last name will be displayed with the ad.</p>
            </div>

            <div>
                <label htmlFor="account_created_by" className="block text-gray-700 mb-1">
                    Account Created By*
                </label>
                <select
                    id="account_created_by"
                    name="account_created_by"
                    value={formData.account_created_by}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full px-3 py-2 border ${showError('account_created_by') ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent`}
                    required
                >
                    <option value="Self">Self</option>
                    <option value="Parent">Parent</option>
                    <option value="Sibling">Sibling</option>
                    <option value="Relative">Relative</option>
                    <option value="Friend">Friend</option>
                </select>
                {showError('account_created_by') && <p className="text-red-500 text-xs mt-1">{errors.account_created_by}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="birthdate" className="block text-gray-700 mb-1">
                        Birth Date*
                    </label>
                    <input
                        type="date"
                        id="birthdate"
                        name="birthdate"
                        value={formData.birthdate}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={`w-full px-3 py-2 border ${showError('birthdate') ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent`}
                        required
                    />
                    {showError('birthdate') && <p className="text-red-500 text-xs mt-1">{errors.birthdate}</p>}
                </div>

                <div>
                    <label htmlFor="gender" className="block text-gray-700 mb-1">
                        Gender*
                    </label>
                    <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={`w-full px-3 py-2 border ${showError('gender') ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent`}
                        required
                    >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    {showError('gender') && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="ethnicity" className="block text-gray-700 mb-1">
                        Ethnicity*
                    </label>
                    <select
                        id="ethnicity"
                        name="ethnicity"
                        value={formData.ethnicity}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={`w-full px-3 py-2 border ${showError('ethnicity') ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent`}
                        required
                    >
                        <option value="">Select Ethnicity</option>
                        <option value="Sinhalese">Sinhalese</option>
                        <option value="Tamil">Tamil</option>
                        <option value="Muslim">Muslim</option>
                        <option value="Burgher">Burgher</option>
                        <option value="Malay">Malay</option>
                        <option value="Other">Other</option>
                    </select>
                    {showError('ethnicity') && <p className="text-red-500 text-xs mt-1">{errors.ethnicity}</p>}
                </div>

                <div>
                    <label htmlFor="religion" className="block text-gray-700 mb-1">
                        Religion*
                    </label>
                    <select
                        id="religion"
                        name="religion"
                        value={formData.religion}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={`w-full px-3 py-2 border ${showError('religion') ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent`}
                        required
                    >
                        <option value="">Select Religion</option>
                        <option value="Buddhist">Buddhist</option>
                        <option value="Hindu">Hindu</option>
                        <option value="Islam">Islam</option>
                        <option value="Christian">Christian</option>
                        <option value="Other">Other</option>
                    </select>
                    {showError('religion') && <p className="text-red-500 text-xs mt-1">{errors.religion}</p>}

                    {/* Fixed Switch - Now using handleCheckboxChange */}
                    <div className="mt-2 flex items-center space-x-3">
                        <label htmlFor="religion_visible" className="text-gray-700 font-medium">
                            Only view my religion
                        </label>
                        <input
                            type="checkbox"
                            id="religion_visible"
                            name="religion_visible"
                            checked={formData.religion_visible === 1}
                            onChange={(e) => {
                                const syntheticEvent = {
                                    ...e,
                                    target: {
                                        ...e.target,
                                        name: 'religion_visible',
                                        value: e.target.checked ? 1 : 0,
                                    },
                                } as any;
                                handleInputChange(syntheticEvent);
                            }}
                            className="h-5 w-5 text-yellow-500 focus:ring-yellow-400 border-gray-300 rounded"
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="caste" className="block text-gray-700 mb-1">
                        Caste
                    </label>
                    <input
                        type="text"
                        id="caste"
                        name="caste"
                        value={formData.caste}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label htmlFor="height" className="block text-gray-700 mb-1">
                        Height
                    </label>
                    <select
                        id="height"
                        name="height"
                        value={formData.height}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    >
                        <option value="">Select Height</option>
                        <option value="4ft 10in (147cm)">4ft 10in (147cm)</option>
                        <option value="4ft 11in (150cm)">4ft 11in (150cm)</option>
                        <option value="5ft 0in (152cm)">5ft 0in (152cm)</option>
                        <option value="5ft 1in (155cm)">5ft 1in (155cm)</option>
                        <option value="5ft 2in (157cm)">5ft 2in (157cm)</option>
                        <option value="5ft 3in (160cm)">5ft 3in (160cm)</option>
                        <option value="5ft 4in (163cm)">5ft 4in (163cm)</option>
                        <option value="5ft 5in (165cm)">5ft 5in (165cm)</option>
                        <option value="5ft 6in (168cm)">5ft 6in (168cm)</option>
                        <option value="5ft 7in (170cm)">5ft 7in (170cm)</option>
                        <option value="5ft 8in (173cm)">5ft 8in (173cm)</option>
                        <option value="5ft 9in (175cm)">5ft 9in (175cm)</option>
                        <option value="5ft 10in (178cm)">5ft 10in (178cm)</option>
                        <option value="5ft 11in (180cm)">5ft 11in (180cm)</option>
                        <option value="6ft 0in (183cm)">6ft 0in (183cm)</option>
                        <option value="6ft 1in (185cm)">6ft 1in (185cm)</option>
                        <option value="6ft 2in (188cm)">6ft 2in (188cm)</option>
                        <option value="6ft 3in (190cm)">6ft 3in (190cm)</option>
                        <option value="6ft 4in (193cm)">6ft 4in (193cm)</option>
                    </select>
                </div>
            </div>

            <div>
                <label htmlFor="civil_status" className="block text-gray-700 mb-1">
                    Civil Status
                </label>
                <select
                    id="civil_status"
                    name="civil_status"
                    value={formData.civil_status}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                >
                    <option value="Never Married">Never Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                    <option value="Separated">Separated</option>
                </select>
            </div>

            <div>
                <label htmlFor="country_of_residence" className="block text-gray-700 mb-1">
                    Country of Residence
                </label>
                <select
                    id="country_of_residence"
                    name="country_of_residence"
                    value={formData.country_of_residence}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full px-3 py-2 border ${showError('country_of_residence') ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent`}
                    required
                >
                    <option value="Sri Lanka">Sri Lanka</option>
                    <option value="Australia">Australia</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="Other">Other</option>
                </select>
                {showError('country_of_residence') && <p className="text-red-500 text-xs mt-1">{errors.country_of_residence}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="state_district" className="block text-gray-700 mb-1">
                        State/District*
                    </label>
                    <input
                        type="text"
                        id="state_district"
                        name="state_district"
                        value={formData.state_district}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={`w-full px-3 py-2 border ${showError('state_district') ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent`}
                        required
                    />
                    {showError('state_district') && <p className="text-red-500 text-xs mt-1">{errors.state_district}</p>}
                </div>

                <div>
                    <label htmlFor="city" className="block text-gray-700 mb-1">
                        City
                    </label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="image" className="block text-gray-700 mb-2">
                    Profile Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-yellow-400 transition-colors">
                    <input type="file" id="image" name="image" onChange={handleImageChange} accept="image/*" className="hidden" required />
                    <label htmlFor="image" className="cursor-pointer">
                        {previewUrl ? (
                            <div className="space-y-2">
                                <img src={previewUrl} alt="Profile Preview" className="mx-auto h-40 w-40 object-cover rounded-full border-4 border-yellow-400" />
                                <p className="text-sm text-gray-600">Click to change profile image</p>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <svg className="mx-auto h-16 w-16 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                    <path
                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <p className="text-lg text-gray-600">Upload Profile Image</p>
                                <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                            </div>
                        )}
                    </label>
                </div>
                {showError('image') && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
            </div>
        </div>
    );
};

export default PersonalInfoForm;
