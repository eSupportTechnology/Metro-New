import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    ChevronDown,
    ArrowLeft,
    Phone,
    Shield,
    UserCheck,
    DollarSign,
    Headphones,
    Heart,
    Check,
    Filter,
    Bell,
    User,
    MapPin,
    Calendar,
    Briefcase,
    GraduationCap,
    Ruler,
    Coffee,
    Clock,
    Search,
    AlertTriangle,
} from 'lucide-react';

const SearchResults = () => {
    const [profiles, setProfiles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortBy, setSortBy] = useState('Latest First');
    const [preferredSearch, setPreferredSearch] = useState(false);
    const [totalResults, setTotalResults] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedGender, setSelectedGender] = useState('Female'); // Default looking for females

    // Calculate age from birthdate
    const calculateAge = (birthdate) => {
        if (!birthdate) return '';
        const today = new Date();
        const birthDate = new Date(birthdate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    // Format relative time for publication
    const formatRelativeTime = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

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

    // Fetch profiles from API using axios
    useEffect(() => {
        const fetchProfiles = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/get-matrimony');

                // Check if the response has the expected structure
                if (response.data && (response.data.status === 200 || response.data.status === 'success')) {
                    // Handle the different possible response structures
                    let profileData;

                    if (response.data['Matrimony profiles retrieved successfully']) {
                        profileData = response.data['Matrimony profiles retrieved successfully'];
                    } else if (response.data.data) {
                        profileData = response.data.data;
                    } else {
                        throw new Error('Unexpected response format');
                    }

                    // Extract matrimony data from the profiles
                    const formattedProfiles = profileData.map((profile) => {
                        // If profile has matrimony data as a nested object, merge it with the profile
                        if (profile.matrimony) {
                            return {
                                id: profile.user_id,
                                ...profile,
                                ...profile.matrimony,
                                picture: profile.profile_picture ? { image_path: profile.profile_picture } : null,
                            };
                        }
                        return profile;
                    });

                    setProfiles(formattedProfiles);
                    setTotalResults(formattedProfiles.length);
                } else {
                    throw new Error('Failed to fetch profiles');
                }
            } catch (err) {
                setError(err.message || 'Failed to fetch profiles');
                console.error('Error fetching profiles:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfiles();
    }, []);

    const toggleFilter = (filterName) => {
        console.log(`Toggle filter: ${filterName}`);
        // Implementation for filter toggle
    };

    // Country flag mapping
    const getCountryFlag = (country) => {
        const flags = {
            'Sri Lanka': '🇱🇰',
            Australia: '🇦🇺',
            India: '🇮🇳',
            'United States': '🇺🇸',
            'United Kingdom': '🇬🇧',
            Canada: '🇨🇦',
        };

        return flags[country] || '🌐';
    };

    return (
        <div className="font-sans bg-gradient-to-b from-yellow-50 to-white min-h-screen">
            {/* Header would go here */}
            <div className="max-w-7xl mx-auto pt-6 px-4">
                {/* Search Results Header */}
                <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center mb-3 md:mb-0">
                            <h2 className="text-xl font-semibold text-gray-800 mr-2">Search Results</h2>
                            <span className="text-sm text-gray-600">
                                Showing 1-{Math.min(profiles.length, 20)} of {totalResults} posts
                            </span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                                <span className="text-sm text-gray-700 mr-2">Preferred Search</span>
                                <button
                                    onClick={() => setPreferredSearch(!preferredSearch)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${preferredSearch ? 'bg-yellow-400' : 'bg-gray-200'}`}
                                >
                                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${preferredSearch ? 'translate-x-6' : 'translate-x-1'}`} />
                                </button>
                            </div>
                            <div className="relative">
                                <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white cursor-pointer">
                                    <span className="text-sm text-gray-700 mr-2">Sort By: {sortBy}</span>
                                    <ChevronDown className="h-4 w-4 text-gray-500" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Left Sidebar - Filters */}
                    <div className="md:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">I'm looking for</h3>
                            <div className="flex justify-center space-x-4 mb-6">
                                <div className="flex flex-col items-center">
                                    <div
                                        className={`w-16 h-16 rounded-full flex items-center justify-center border-2 ${selectedGender === 'Male' ? 'border-blue-500 bg-blue-100' : 'border-white bg-gray-100'} shadow-md cursor-pointer`}
                                        onClick={() => setSelectedGender('Male')}
                                    >
                                        <User className="h-8 w-8 text-blue-600" />
                                    </div>
                                    <span className="mt-1 text-sm text-gray-600">Male</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div
                                        className={`w-16 h-16 rounded-full flex items-center justify-center border-2 ${selectedGender === 'Female' ? 'border-pink-500 bg-pink-100' : 'border-white bg-gray-100'} shadow-md cursor-pointer`}
                                        onClick={() => setSelectedGender('Female')}
                                    >
                                        <User className="h-8 w-8 text-pink-600" />
                                    </div>
                                    <span className="mt-1 text-sm text-gray-600">Female</span>
                                </div>
                            </div>

                            {/* Filter Sections */}
                            {[
                                { name: 'Age', icon: <Calendar className="h-4 w-4 text-gray-500" /> },
                                { name: 'Country of Residence', icon: <MapPin className="h-4 w-4 text-gray-500" /> },
                                { name: 'Region / District', icon: <MapPin className="h-4 w-4 text-gray-500" /> },
                                { name: 'Ethnicity', icon: <User className="h-4 w-4 text-gray-500" /> },
                                { name: 'Religion', icon: <UserCheck className="h-4 w-4 text-gray-500" /> },
                                { name: 'Civil Status', icon: <Heart className="h-4 w-4 text-gray-500" /> },
                                { name: 'Profession', icon: <Briefcase className="h-4 w-4 text-gray-500" /> },
                                { name: 'Min Education Level', icon: <GraduationCap className="h-4 w-4 text-gray-500" /> },
                                { name: 'Height', icon: <Ruler className="h-4 w-4 text-gray-500" /> },
                                { name: 'Food Preference', icon: <Coffee className="h-4 w-4 text-gray-500" /> },
                                { name: 'Drinking', icon: <Coffee className="h-4 w-4 text-gray-500" /> },
                                { name: 'Smoking', icon: <Coffee className="h-4 w-4 text-gray-500" /> },
                                { name: 'Differently Abled', icon: <UserCheck className="h-4 w-4 text-gray-500" /> },
                                { name: 'Account Created by', icon: <User className="h-4 w-4 text-gray-500" /> },
                            ].map((filter) => (
                                <div key={filter.name} className="border-t border-gray-200 py-3">
                                    <button onClick={() => toggleFilter(filter.name)} className="flex items-center justify-between w-full text-left">
                                        <div className="flex items-center">
                                            {filter.icon}
                                            <span className="text-gray-700 ml-2">{filter.name}</span>
                                        </div>
                                        <ChevronDown className="h-4 w-4 text-gray-500" />
                                    </button>
                                </div>
                            ))}

                            <div className="mt-6">
                                <div className="text-sm text-gray-700 mb-3">Save this search as your preferred search criteria?</div>
                                <button className="bg-black text-white px-6 py-2 rounded-md font-medium hover:bg-gray-800 transition-colors flex items-center justify-center">
                                    <Search className="h-4 w-4 mr-2" />
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Search Results */}
                    <div className="md:col-span-3">
                        {isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="flex flex-col items-center">
                                    <div className="animate-spin h-8 w-8 border-4 border-yellow-500 rounded-full border-t-transparent"></div>
                                    <p className="mt-4 text-gray-600">Loading profiles...</p>
                                </div>
                            </div>
                        ) : error ? (
                            <div className="bg-red-50 p-6 rounded-lg text-red-800 flex flex-col items-center">
                                <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
                                <p className="text-center">Error: {error}</p>
                                <button className="mt-4 px-6 py-2 bg-red-100 text-red-800 rounded-md hover:bg-red-200 flex items-center" onClick={() => window.location.reload()}>
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Try Again
                                </button>
                            </div>
                        ) : profiles.length === 0 ? (
                            <div className="bg-yellow-50 p-6 rounded-lg text-yellow-800 flex flex-col items-center">
                                <Search className="h-12 w-12 text-yellow-500 mb-4" />
                                <p className="text-center">No profiles match your search criteria.</p>
                                <button className="mt-4 px-6 py-2 bg-yellow-100 text-yellow-800 rounded-md hover:bg-yellow-200 flex items-center" onClick={() => window.location.reload()}>
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Modify Search
                                </button>
                            </div>
                        ) : (
                            profiles.map((profile, index) => {
                                const age = calculateAge(profile.birthdate);
                                const isVerified = index % 3 === 1; // Just for demonstration
                                const isBoost = index % 2 === 0; // Just for demonstration

                                return (
                                    <div key={profile.user_id || index} className={`bg-white rounded-lg shadow-md mb-4 overflow-hidden ${isBoost ? 'border-l-4 border-yellow-400' : ''}`}>
                                        <div className="p-4">
                                            {isBoost && (
                                                <div className="inline-flex items-center bg-yellow-400 text-xs font-medium text-gray-800 px-2 py-1 rounded mb-2">
                                                    <DollarSign className="h-3 w-3 mr-1" />
                                                    Boost Ad
                                                </div>
                                            )}
                                            <div className="flex items-start">
                                                <div className="relative mr-4">
                                                    <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                                                        {profile.picture && profile.picture.image_path ? (
                                                            <img
                                                                src={
                                                                    profile.picture.image_path.startsWith('data:') ? profile.picture.image_path : `http://127.0.0.1:8000/${profile.picture.image_path}`
                                                                }
                                                                alt={profile.display_name}
                                                                className="w-20 h-20 rounded-full object-cover"
                                                                onError={(e) => {
                                                                    e.target.onerror = null;
                                                                    e.target.src = '/api/placeholder/80/80';
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
                                                        <h3 className="text-xl font-semibold text-gray-800">{profile.display_name}</h3>
                                                        <div className="text-xl">{getCountryFlag(profile.country_of_residence)}</div>
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
                                                            <span>{age} years</span>
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
                                            <div className="flex justify-between items-center mt-4">
                                                <div className="flex items-center text-xs text-gray-500">
                                                    <Clock className="h-3 w-3 mr-1" />
                                                    {formatRelativeTime(profile.created_at)}
                                                </div>
                                                <button className="text-yellow-600 hover:text-yellow-700 font-medium text-sm flex items-center">
                                                    More Details
                                                    <ChevronDown className="h-3 w-3 ml-1" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}

                        {/* Pagination */}
                        {!isLoading && !error && profiles.length > 0 && (
                            <div className="flex justify-center mt-6 mb-8">
                                <nav className="inline-flex rounded-md shadow">
                                    <a href="#" className="px-3 py-2 bg-white border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-l-md flex items-center">
                                        <ArrowLeft className="h-3 w-3 mr-1" />
                                        Previous
                                    </a>
                                    {[1, 2, 3, 4, 5].map((page) => (
                                        <a
                                            key={page}
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setCurrentPage(page);
                                            }}
                                            className={`px-3 py-2 border border-gray-300 text-sm font-medium ${page === currentPage ? 'bg-yellow-400 text-gray-800' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                                        >
                                            {page}
                                        </a>
                                    ))}
                                    <a href="#" className="px-3 py-2 bg-white border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-r-md flex items-center">
                                        Next
                                        <ArrowLeft className="h-3 w-3 ml-1 transform rotate-180" />
                                    </a>
                                </nav>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchResults;
