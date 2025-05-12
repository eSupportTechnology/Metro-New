import React, { useState } from 'react';
import { Eye, ChevronDown, Star, CheckCircle, ToggleLeft, ToggleRight, Loader } from 'lucide-react';
import { MatrimonyProfile } from '../../../utilities/types/Matrimony/IAdminMatrimonyView';
import { packageDetails } from '../../../constants/matrimony/matrimonyConstants';
import PackageBadge from '../Controls/PackageBadge';

interface ProfileTableRowProps {
    profile: MatrimonyProfile;
    onViewProfile: (profile: MatrimonyProfile) => void;
    onUpdateBootPost: (userId: string, bootPost: boolean) => void;
    onUpdateActiveStatus: (userId: string, isActive: boolean) => void;
    onUpdatePackage: (userId: string, packageNumber: number) => void;
    isActionLoading: Record<string, boolean>;
}

const ProfileTableRow: React.FC<ProfileTableRowProps> = ({ profile, onViewProfile, onUpdateBootPost, onUpdateActiveStatus, onUpdatePackage, isActionLoading }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const handlePackageChange = (packageNumber: number) => {
        onUpdatePackage(profile.user_id, packageNumber);
        setDropdownOpen(false);
    };

    return (
        <tr
            className={`${profile.boot_post === 1 ? 'bg-yellow-50' : ''}
               ${!profile.is_active ? 'bg-red-50 bg-opacity-30' : ''}
               hover:bg-gray-50 transition-colors duration-150`}
        >
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                        {profile.picture ? (
                            <img src={profile.picture.image_path} alt={profile.display_name} className="h-10 w-10 rounded-full object-cover" />
                        ) : (
                            <div className="h-10 w-10 rounded-full bg-yellow-200 flex items-center justify-center text-yellow-800 font-medium">{profile.display_name?.charAt(0)}</div>
                        )}
                    </div>
                    <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{profile.display_name}</div>
                        <div className="text-sm text-gray-500">{profile.email}</div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="relative">
                    <PackageBadge packageNumber={profile.package_number || 1} />
                    <button onClick={() => setDropdownOpen(!dropdownOpen)} className="ml-2 text-gray-400 hover:text-gray-600">
                        <ChevronDown size={16} />
                    </button>

                    {dropdownOpen && (
                        <div className="absolute z-10 mt-2 w-48 bg-white rounded-md shadow-lg">
                            <div className="py-1">
                                {Object.entries(packageDetails).map(([key, pkg]) => (
                                    <button
                                        key={key}
                                        className={`flex items-center w-full px-4 py-2 text-sm text-left ${parseInt(key) === profile.package_number ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                                        onClick={() => handlePackageChange(parseInt(key))}
                                        disabled={isActionLoading[`package_${profile.user_id}`]}
                                    >
                                        {isActionLoading[`package_${profile.user_id}`] && parseInt(key) === profile.package_number ? (
                                            <Loader size={14} className="animate-spin mr-2" />
                                        ) : parseInt(key) === profile.package_number ? (
                                            <CheckCircle size={14} className="mr-2 text-green-500" />
                                        ) : (
                                            <div className="w-4 h-4 mr-2" />
                                        )}
                                        <span className={pkg.color}>{pkg.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <button
                    onClick={() => onUpdateActiveStatus(profile.user_id, !profile.is_active)}
                    disabled={isActionLoading[`active_${profile.user_id}`]}
                    className={`flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        profile.is_active ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-red-100 text-red-800 hover:bg-red-200'
                    }`}
                >
                    {isActionLoading[`active_${profile.user_id}`] ? (
                        <Loader size={12} className="animate-spin mr-1" />
                    ) : profile.is_active ? (
                        <ToggleRight size={12} className="mr-1 text-green-600" />
                    ) : (
                        <ToggleLeft size={12} className="mr-1 text-red-600" />
                    )}
                    {profile.is_active ? 'Active' : 'Inactive'}
                </button>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        profile.gender?.toLowerCase() === 'male' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'
                    }`}
                >
                    {profile.gender}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{profile.profession}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{profile.country_of_residence}</td>
            <td className="px-6 py-4 whitespace-nowrap">
                <button
                    onClick={() => onUpdateBootPost(profile.user_id, !profile.boot_post)}
                    disabled={isActionLoading[`boot_${profile.user_id}`]}
                    className={`flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        profile.boot_post === 1 ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                    {isActionLoading[`boot_${profile.user_id}`] ? (
                        <Loader size={12} className="animate-spin mr-1" />
                    ) : (
                        <Star size={12} className={`mr-1 ${profile.boot_post === 1 ? 'fill-yellow-500' : ''}`} />
                    )}
                    {profile.boot_post === 1 ? 'Featured' : 'Regular'}
                </button>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button onClick={() => onViewProfile(profile)} className="text-yellow-600 hover:text-yellow-800 flex items-center">
                    <Eye size={16} className="mr-1" /> View
                </button>
            </td>
        </tr>
    );
};

export default ProfileTableRow;
