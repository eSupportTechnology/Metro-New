import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useNavigate instead of useHistory
import axios from 'axios';
import { User, MapPin, Calendar, Ruler, UserCheck, Briefcase, GraduationCap, Coffee, Search, ArrowLeft } from 'lucide-react';
import Header from '../MainWeb/NavBar/Header';
import Footer from '../MainWeb/Footer/Footer';

const ProfileDetailsPage = () => {
    const { profileId } = useParams<{ profileId: string }>(); // Get profileId from the URL params
    const [profile, setProfile] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate(); // Replace useHistory with useNavigate

    useEffect(() => {
        const fetchProfileDetails = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/get-profile/${profileId}`);
                if (response.data && response.data.status === 'success') {
                    setProfile(response.data.data);
                } else {
                    setError('Profile not found');
                }
            } catch (err) {
                setError('Error fetching profile details');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfileDetails();
    }, [profileId]);

    const formatRelativeTime = (dateString: string): string => {
        if (!dateString) return '';

        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (diffInSeconds < 60) {
            return 'just now';
        } else if (diffInSeconds < 3600) {
            const minutes = Math.floor(diffInSeconds / 60);
            return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
        } else if (diffInSeconds < 86400) {
            const hours = Math.floor(diffInSeconds / 3600);
            return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
        } else if (diffInSeconds < 2592000) {
            const days = Math.floor(diffInSeconds / 86400);
            return `${days} ${days === 1 ? 'day' : 'days'} ago`;
        } else {
            const months = Math.floor(diffInSeconds / 2592000);
            return `${months} ${months === 1 ? 'month' : 'months'} ago`;
        }
    };

    const getCountryFlag = (country: string): string => {
        const flags: Record<string, string> = {
            'Sri Lanka': '🇱🇰',
            Australia: '🇦🇺',
            India: '🇮🇳',
            'United States': '🇺🇸',
            'United Kingdom': '🇬🇧',
            Canada: '🇨🇦',
            Georgia: '🇬🇪',
            // Add more countries and their flags as needed
        };

        return flags[country] || '🌐'; // Default to a globe if country flag is not found
    };

    const calculateAge = (birthdate: string): number => {
        if (!birthdate) return 0; // Return 0 if no birthdate is provided

        const today = new Date();
        const birthDate = new Date(birthdate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();

        // If birthdate hasn't occurred yet this year, subtract 1 from age
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin mx-auto h-8 w-8 border-4 border-yellow-500 rounded-full border-t-transparent"></div>
                <p className="mt-4 text-gray-600">Loading profile details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 p-6 rounded-lg text-red-800 flex flex-col items-center">
                <Search className="h-12 w-12 text-red-500 mb-4" />
                <p>{error}</p>
                <button
                    onClick={() => navigate('/view-add')} // Use navigate() instead of history.push()
                    className="mt-4 px-6 py-2 bg-red-100 text-red-800 rounded-md hover:bg-red-200 flex items-center"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Search
                </button>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="bg-yellow-50 p-6 rounded-lg text-yellow-800 flex flex-col items-center">
                <Search className="h-12 w-12 text-yellow-500 mb-4" />
                <p>No profile found</p>
                <button
                    onClick={() => navigate('/')} // Use navigate() instead of history.push()
                    className="mt-4 px-6 py-2 bg-yellow-100 text-yellow-800 rounded-md hover:bg-yellow-200 flex items-center"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Search
                </button>
            </div>
        );
    }

    return (
        <div className="font-sans bg-gradient-to-b from-yellow-50 to-white min-h-screen">
            <Header />
            <div className="max-w-7xl mx-auto mt-14 pt-6 px-4">
                {/* Profile Details Header */}
                <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-semibold text-gray-800">Profile Details</h2>
                        <button
                            onClick={() => navigate('/')} // Use navigate() instead of history.push()
                            className="bg-gray-100 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-200 flex items-center"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Search
                        </button>
                    </div>
                </div>

                {/* Profile Card */}
                <div className="bg-white rounded-lg shadow-md mb-4 p-6">
                    <div className="flex items-start">
                        <div className="relative mr-4">
                            <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center">
                                {profile.profile_picture ? (
                                    <img
                                        src={profile.profile_picture}
                                        alt={profile.display_name || 'Profile'}
                                        className="w-32 h-32 rounded-full object-cover"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.onerror = null;
                                            target.src = '/api/placeholder/80/80';
                                        }}
                                    />
                                ) : (
                                    <User className="h-16 w-16 text-gray-400" />
                                )}
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <h3 className="text-xl font-semibold text-gray-800">{profile.display_name}</h3>
                                <div className="text-xl">{getCountryFlag(profile.country_of_residence || '')}</div>
                            </div>
                            <div className="flex items-center text-sm text-gray-600 mb-2">
                                <MapPin className="h-3 w-3 mr-1" />
                                <span>
                                    {profile.city || 'City'}, {profile.state_district || 'District'}, {profile.country_of_residence || 'Country'}
                                </span>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2 mt-3">
                                <div className="flex items-center text-sm">
                                    <Calendar className="h-3 w-3 mr-1 text-gray-600" />
                                    <span>{calculateAge(profile.birthdate)} years</span>
                                </div>
                                <div className="flex items-center text-sm">
                                    <Ruler className="h-3 w-3 mr-1 text-gray-600" />
                                    <span>{profile.height || 'Not specified'}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                    <User className="h-3 w-3 mr-1 text-gray-600" />
                                    <span>{profile.ethnicity || 'Not specified'}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                    <UserCheck className="h-3 w-3 mr-1 text-gray-600" />
                                    <span>{profile.religion || 'Not specified'}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                    <Briefcase className="h-3 w-3 mr-1 text-gray-600" />
                                    <span>{profile.profession || 'Not specified'}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                    <GraduationCap className="h-3 w-3 mr-1 text-gray-600" />
                                    <span>{profile.education_level || 'Not specified'}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Father and Mother Details */}
                    <div className="mt-6">
                        <h4 className="text-lg font-semibold text-gray-800">Father's Information</h4>
                        <div className="mt-3">
                            <p>
                                <strong>Ethnicity:</strong> {profile.father?.ethnicity || 'Not specified'}
                            </p>
                            <p>
                                <strong>Religion:</strong> {profile.father?.religion || 'Not specified'}
                            </p>
                            <p>
                                <strong>Profession:</strong> {profile.father?.profession || 'Not specified'}
                            </p>
                            <p>
                                <strong>Additional Info:</strong> {profile.father?.additional_info || 'Not specified'}
                            </p>
                        </div>
                    </div>

                    <div className="mt-6">
                        <h4 className="text-lg font-semibold text-gray-800">Mother's Information</h4>
                        <div className="mt-3">
                            <p>
                                <strong>Ethnicity:</strong> {profile.mother?.ethnicity || 'Not specified'}
                            </p>
                            <p>
                                <strong>Religion:</strong> {profile.mother?.religion || 'Not specified'}
                            </p>
                            <p>
                                <strong>Profession:</strong> {profile.mother?.profession || 'Not specified'}
                            </p>
                            <p>
                                <strong>Additional Info:</strong> {profile.mother?.additional_info || 'Not specified'}
                            </p>
                        </div>
                    </div>

                    {/* Horoscope Details */}
                    <div className="mt-6">
                        <h4 className="text-lg font-semibold text-gray-800">Horoscope Information</h4>
                        <div className="mt-3">
                            <p>
                                <strong>Birthdate:</strong> {profile.horoscope?.birthdate || 'Not specified'}
                            </p>
                            <p>
                                <strong>Birth Country:</strong> {profile.horoscope?.birth_country || 'Not specified'}
                            </p>
                            <p>
                                <strong>Matching Required:</strong> {profile.horoscope?.horoscope_matching_required ? 'Yes' : 'No'}
                            </p>
                            <p>
                                <strong>Birth City:</strong> {profile.horoscope?.birth_city || 'Not specified'}
                            </p>
                            <p>
                                <strong>Birth Time:</strong> {profile.horoscope?.birth_time || 'Not specified'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProfileDetailsPage;
