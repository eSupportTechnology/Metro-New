import React from 'react';
import { X, Star, Loader } from 'lucide-react';
import { MatrimonyProfile } from '../../../utilities/types/Matrimony/IAdminMatrimonyView';
import PackageBadge from '../Controls/PackageBadge';
import { packageDetails } from '../../../constants/matrimony/matrimonyConstants';

interface ProfileDetailModalProps {
    profile: MatrimonyProfile;
    isActionLoading: Record<string, boolean>;
    onClose: () => void;
    onUpdateBootPost: (userId: string, bootPost: boolean) => void;
    onUpdateActiveStatus: (userId: string, isActive: boolean) => void;
    onUpdatePackage: (userId: string, packageNumber: number) => void;
}

const ProfileDetailModal: React.FC<ProfileDetailModalProps> = ({ profile, isActionLoading, onClose, onUpdateBootPost, onUpdateActiveStatus, onUpdatePackage }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-screen overflow-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6 border-b pb-4">
                        <div className="flex items-center">
                            <h2 className="text-2xl font-semibold text-gray-800 mr-3">{profile.display_name}</h2>
                            <PackageBadge packageNumber={profile.package_number || 1} />
                            {profile.boot_post === 1 && (
                                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                    <Star size={12} className="mr-1 fill-yellow-500" /> Featured
                                </span>
                            )}
                        </div>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="col-span-1 flex flex-col items-center">
                            {profile.picture ? (
                                <img src={profile.picture.image_path} alt={profile.display_name} className="w-full max-w-xs rounded-lg shadow-md mb-4 object-cover" />
                            ) : (
                                <div className="w-64 h-64 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                                    <span className="text-6xl font-light text-yellow-600">{profile.display_name?.charAt(0)}</span>
                                </div>
                            )}

                            <div className="w-full max-w-xs space-y-4">
                                <div className="bg-yellow-50 p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Contact Information</h3>
                                    <div className="flex flex-col space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Email:</span>
                                            <span>{profile.email}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Profile Status</h3>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-sm text-gray-600 mb-2">Membership Package:</p>
                                            <div className="flex">
                                                {Object.entries(packageDetails).map(([key, pkg]) => (
                                                    <button
                                                        key={key}
                                                        onClick={() => onUpdatePackage(profile.user_id, parseInt(key))}
                                                        disabled={isActionLoading[`package_${profile.user_id}`] || parseInt(key) === profile.package_number}
                                                        className={`flex-1 py-2 text-xs font-medium rounded-md border ${
                                                            parseInt(key) === profile.package_number ? `${pkg.color} border-${pkg.borderColor} font-bold` : 'bg-white border-gray-300 hover:bg-gray-50'
                                                        } ${parseInt(key) > 1 ? '-ml-px' : ''}`}
                                                    >
                                                        {pkg.name}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <p className="text-sm text-gray-600 mb-2">Featured Status:</p>
                                            <button
                                                onClick={() => onUpdateBootPost(profile.user_id, !profile.boot_post)}
                                                disabled={isActionLoading[`boot_${profile.user_id}`]}
                                                className={`w-full flex items-center justify-center px-4 py-2 border rounded-md ${
                                                    profile.boot_post === 1
                                                        ? 'bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-200'
                                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                                }`}
                                            >
                                                {isActionLoading[`boot_${profile.user_id}`] ? (
                                                    <Loader size={16} className="animate-spin mr-2" />
                                                ) : (
                                                    <Star size={16} className={`mr-2 ${profile.boot_post === 1 ? 'fill-yellow-500' : ''}`} />
                                                )}
                                                {profile.boot_post === 1 ? 'Remove Featured Status' : 'Make Featured'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-1 space-y-6">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">Personal Information</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="text-sm text-gray-600">Full Name:</div>
                                    <div className="text-sm">
                                        {profile.first_name} {profile.last_name}
                                    </div>

                                    <div className="text-sm text-gray-600">Gender:</div>
                                    <div className="text-sm">{profile.gender}</div>

                                    <div className="text-sm text-gray-600">Birth Date:</div>
                                    <div className="text-sm">{profile.birthdate}</div>

                                    <div className="text-sm text-gray-600">Civil Status:</div>
                                    <div className="text-sm">{profile.civil_status}</div>

                                    <div className="text-sm text-gray-600">Height:</div>
                                    <div className="text-sm">{profile.height || 'Not specified'}</div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">Professional Details</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="text-sm text-gray-600">Education:</div>
                                    <div className="text-sm">{profile.education_level}</div>

                                    <div className="text-sm text-gray-600">Profession:</div>
                                    <div className="text-sm">{profile.profession}</div>

                                    <div className="text-sm text-gray-600">Country:</div>
                                    <div className="text-sm">{profile.country_of_residence}</div>

                                    <div className="text-sm text-gray-600">City:</div>
                                    <div className="text-sm">{profile.city || 'Not specified'}</div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">Lifestyle</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="text-sm text-gray-600">Food Preference:</div>
                                    <div className="text-sm">{profile.food_preference || 'Not specified'}</div>

                                    <div className="text-sm text-gray-600">Smoking:</div>
                                    <div className="text-sm">{profile.smoking}</div>

                                    <div className="text-sm text-gray-600">Drinking:</div>
                                    <div className="text-sm">{profile.drinking}</div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">Cultural Background</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="text-sm text-gray-600">Religion:</div>
                                    <div className="text-sm">{profile.religion}</div>

                                    <div className="text-sm text-gray-600">Ethnicity:</div>
                                    <div className="text-sm">{profile.ethnicity}</div>

                                    <div className="text-sm text-gray-600">Caste:</div>
                                    <div className="text-sm">{profile.caste || 'Not specified'}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {profile.horoscope && profile.horoscope.birthdate && (
                        <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-800 mb-3">Horoscope Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <div className="text-sm text-gray-600 mb-1">Birth Date:</div>
                                    <div className="text-sm">{profile.horoscope.birthdate}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600 mb-1">Birth Country:</div>
                                    <div className="text-sm">{profile.horoscope.birth_country || 'Not specified'}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600 mb-1">Birth City:</div>
                                    <div className="text-sm">{profile.horoscope.birth_city || 'Not specified'}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600 mb-1">Birth Time:</div>
                                    <div className="text-sm">{profile.horoscope.birth_time || 'Not specified'}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600 mb-1">Matching Required:</div>
                                    <div className="text-sm">{profile.horoscope.horoscope_matching_required ? 'Yes' : 'No'}</div>
                                </div>
                            </div>
                        </div>
                    )}

                    {(profile.father || profile.mother) && (
                        <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-800 mb-3">Family Details</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {profile.father && (
                                    <div>
                                        <h4 className="font-medium text-gray-800 mb-2">Father</h4>
                                        <div className="grid grid-cols-2 gap-2">
                                            {profile.father.profession && (
                                                <>
                                                    <div className="text-sm text-gray-600">Profession:</div>
                                                    <div className="text-sm">{profile.father.profession}</div>
                                                </>
                                            )}

                                            {profile.father.religion && (
                                                <>
                                                    <div className="text-sm text-gray-600">Religion:</div>
                                                    <div className="text-sm">{profile.father.religion}</div>
                                                </>
                                            )}

                                            {profile.father.ethnicity && (
                                                <>
                                                    <div className="text-sm text-gray-600">Ethnicity:</div>
                                                    <div className="text-sm">{profile.father.ethnicity}</div>
                                                </>
                                            )}

                                            {profile.father.caste && (
                                                <>
                                                    <div className="text-sm text-gray-600">Caste:</div>
                                                    <div className="text-sm">{profile.father.caste}</div>
                                                </>
                                            )}

                                            {profile.father.country_of_residence && (
                                                <>
                                                    <div className="text-sm text-gray-600">Country:</div>
                                                    <div className="text-sm">{profile.father.country_of_residence}</div>
                                                </>
                                            )}

                                            {profile.father.additional_info && (
                                                <>
                                                    <div className="text-sm text-gray-600">Additional Info:</div>
                                                    <div className="text-sm">{profile.father.additional_info}</div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {profile.mother && (
                                    <div>
                                        <h4 className="font-medium text-gray-800 mb-2">Mother</h4>
                                        <div className="grid grid-cols-2 gap-2">
                                            {profile.mother.profession && (
                                                <>
                                                    <div className="text-sm text-gray-600">Profession:</div>
                                                    <div className="text-sm">{profile.mother.profession}</div>
                                                </>
                                            )}

                                            {profile.mother.religion && (
                                                <>
                                                    <div className="text-sm text-gray-600">Religion:</div>
                                                    <div className="text-sm">{profile.mother.religion}</div>
                                                </>
                                            )}

                                            {profile.mother.ethnicity && (
                                                <>
                                                    <div className="text-sm text-gray-600">Ethnicity:</div>
                                                    <div className="text-sm">{profile.mother.ethnicity}</div>
                                                </>
                                            )}

                                            {profile.mother.caste && (
                                                <>
                                                    <div className="text-sm text-gray-600">Caste:</div>
                                                    <div className="text-sm">{profile.mother.caste}</div>
                                                </>
                                            )}

                                            {profile.mother.country_of_residence && (
                                                <>
                                                    <div className="text-sm text-gray-600">Country:</div>
                                                    <div className="text-sm">{profile.mother.country_of_residence}</div>
                                                </>
                                            )}

                                            {profile.mother.additional_info && (
                                                <>
                                                    <div className="text-sm text-gray-600">Additional Info:</div>
                                                    <div className="text-sm">{profile.mother.additional_info}</div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="mt-6 border-t pt-4 text-sm text-gray-500 flex flex-col sm:flex-row sm:justify-between">
                        <div>Account created by: {profile.account_created_by}</div>
                        <div>Profile created on: {profile.created_at}</div>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button onClick={onClose} className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium rounded-md transition duration-300">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileDetailModal;
