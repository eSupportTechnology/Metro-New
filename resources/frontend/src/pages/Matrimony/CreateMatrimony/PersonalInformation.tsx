import React from 'react';
import { MatrimonyFormData } from '../../../utilities/types/MatrimonyTypes';

interface PersonalInfoProps {
    formData: MatrimonyFormData;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    previewUrl: string | null;
}

export const renderPersonalInfoForm = ({ formData, handleInputChange, handleImageChange, previewUrl }: PersonalInfoProps) => {
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        required
                    />
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        required
                    />
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    required
                />
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    required
                />
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    required
                >
                    <option value="Self">Self</option>
                    <option value="Parent">Parent</option>
                    <option value="Sibling">Sibling</option>
                    <option value="Relative">Relative</option>
                    <option value="Friend">Friend</option>
                </select>
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        required
                    />
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        required
                    >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="ethnicity" className="block text-gray-700 mb-1">
                        Ethnicity
                    </label>
                    <select
                        id="ethnicity"
                        name="ethnicity"
                        value={formData.ethnicity}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    >
                        <option value="">Select Ethnicity</option>
                        <option value="Sinhalese">Sinhalese</option>
                        <option value="Tamil">Tamil</option>
                        <option value="Muslim">Muslim</option>
                        <option value="Burgher">Burgher</option>
                        <option value="Malay">Malay</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="religion" className="block text-gray-700 mb-1">
                        Religion
                    </label>
                    <select
                        id="religion"
                        name="religion"
                        value={formData.religion}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    >
                        <option value="">Select Religion</option>
                        <option value="Buddhist">Buddhist</option>
                        <option value="Hindu">Hindu</option>
                        <option value="Islam">Islam</option>
                        <option value="Christian">Christian</option>
                        <option value="Other">Other</option>
                    </select>
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
                    Country of Residence*
                </label>
                <select
                    id="country_of_residence"
                    name="country_of_residence"
                    value={formData.country_of_residence}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    required
                >
                    <option value="Sri Lanka">Sri Lanka</option>
                    <option value="Australia">Australia</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="state_district" className="block text-gray-700 mb-1">
                        State/District
                    </label>
                    <input
                        type="text"
                        id="state_district"
                        name="state_district"
                        value={formData.state_district}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="image" className="block text-gray-700 mb-1">
                    Profile Image
                </label>
                <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
                {previewUrl && (
                    <div className="mt-2">
                        <img src={previewUrl} alt="Preview" className="h-32 w-32 object-cover rounded-md" />
                    </div>
                )}
            </div>
        </div>
    );
};
