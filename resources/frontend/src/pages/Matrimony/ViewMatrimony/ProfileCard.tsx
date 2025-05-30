import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, UserCheck, Check, User, MapPin, Calendar, Briefcase, GraduationCap, Ruler, Clock } from 'lucide-react';
import { Profile } from '../../../utilities/types/Matrimony/IMatrimonyView';
import { calculateAge, formatRelativeTime, getCountryFlag } from '../../../utilities/types/Matrimony/dataUtils';

interface ProfileCardProps {
    profile: Profile;
    index: number;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, index }) => {
    const age = calculateAge(profile.birthdate || profile.matrimony?.birthdate || '');
    const isVerified = index % 3 === 1;
    const isBoost = profile.boot_post === 1 || profile.matrimony?.boot_post === 1;
    const displayData = {
        ...profile,
        ...(profile.matrimony || {}),
    };

    return (
        <div className={`bg-white rounded-lg shadow-md mb-4 overflow-hidden ${isBoost ? 'border-l-4 border-yellow-400 shadow-lg ring-1 ring-yellow-200' : ''}`}>
            <div className="p-4">
                {isBoost && <div className="inline-flex items-center bg-yellow-400 text-xs font-medium text-gray-800 px-2 py-1 rounded mb-2">Featured Profile</div>}
                <div className="flex items-start">
                    <div className="relative mr-4">
                        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                            {profile.profile_picture && profile.profile_picture.startsWith('data:') ? (
                                <img
                                    src={profile.profile_picture}
                                    alt={displayData.display_name || 'Profile'}
                                    className="w-20 h-20 rounded-full object-cover"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.onerror = null;
                                        target.src = '/api/placeholder/80/80';
                                    }}
                                />
                            ) : (
                                <User className="h-12 w-12 text-gray-400" />
                            )}
                        </div>

                        {isVerified && (
                            <div className="absolute -right-1 -bottom-1 bg-blue-500 text-white rounded-full p-1">
                                <Check className="h-3 w-3" />
                            </div>
                        )}
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                            <h3 className="text-xl font-semibold text-gray-800">{displayData.display_name || `${profile.first_name} ${profile.last_name}`}</h3>
                            <div className="text-xl">{getCountryFlag(displayData.country_of_residence || '')}</div>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span>
                                {displayData.city || 'City'}, {displayData.state_district || 'District'}, {displayData.country_of_residence || 'Country'}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2 mt-3">
                            <div className="flex items-center text-sm">
                                <Calendar className="h-3 w-3 mr-1 text-gray-600" />
                                <span>{age} years</span>
                            </div>
                            <div className="flex items-center text-sm">
                                <Ruler className="h-3 w-3 mr-1 text-gray-600" />
                                <span>{displayData.height || 'Not specified'}</span>
                            </div>
                            <div className="flex items-center text-sm">
                                <User className="h-3 w-3 mr-1 text-gray-600" />
                                <span>{displayData.ethnicity || 'Not specified'}</span>
                            </div>
                            <div className="flex items-center text-sm">
                                <UserCheck className="h-3 w-3 mr-1 text-gray-600" />
                                <span>{displayData.religion || 'Not specified'}</span>
                            </div>
                            <div className="flex items-center text-sm">
                                <Briefcase className="h-3 w-3 mr-1 text-gray-600" />
                                <span>{displayData.profession || 'Not specified'}</span>
                            </div>
                            <div className="flex items-center text-sm">
                                <GraduationCap className="h-3 w-3 mr-1 text-gray-600" />
                                <span>{displayData.education_level || 'Not specified'}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatRelativeTime(displayData.created_at || '')}
                    </div>
                    <Link to={`/profile/${profile.user_id}`}>
                        <button className="text-yellow-600 hover:text-yellow-700 font-medium text-sm flex items-center">
                            More Details
                            <ChevronDown className="h-3 w-3 ml-1" />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
