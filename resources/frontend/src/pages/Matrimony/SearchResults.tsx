import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { ChevronDown, ArrowLeft, UserCheck, Heart, Check, Filter, User, MapPin, Calendar, Briefcase, GraduationCap, Ruler, Coffee, Clock, Search, AlertTriangle, X } from 'lucide-react';
import { FilterOption, Matrimony, Profile } from '../../utilities/types/Matrimony/IMatrimonyView';
import Header from '../MainWeb/NavBar/Header';
import Footer from '../MainWeb/Footer/Footer';
import { Link } from 'react-router-dom';

const calculateAge = (birthdate: string): number => {
    if (!birthdate) return 0;
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};

const formatRelativeTime = (dateString: string): string => {
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

// Country flag mapping
const getCountryFlag = (country: string): string => {
    const flags: Record<string, string> = {
        'Sri Lanka': '🇱🇰',
        Australia: '🇦🇺',
        India: '🇮🇳',
        'United States': '🇺🇸',
        'United Kingdom': '🇬🇧',
        Canada: '🇨🇦',
        Georgia: '🇬🇪',
    };

    return flags[country] || '🌐';
};

// Component for each profile card
const ProfileCard = ({ profile, index }: { profile: Profile; index: number }) => {
    const age = calculateAge(profile.birthdate || profile.matrimony?.birthdate || '');
    const isVerified = index % 3 === 1; // Just for demonstration

    // Check specifically for boot_post value of 1
    const isBoost = profile.boot_post === 1 || profile.matrimony?.boot_post === 1;

    // Combine profile and matrimony data
    const displayData = {
        ...profile,
        ...(profile.matrimony || {}),
    };

    return (
        <div className={`bg-white rounded-lg shadow-md mb-4 overflow-hidden ${isBoost ? 'border-l-4 border-yellow-400' : ''}`}>
            <div className="p-4">
                {isBoost && <div className="inline-flex items-center bg-yellow-400 text-xs font-medium text-gray-800 px-2 py-1 rounded mb-2">Boost Ad</div>}
                <div className="flex items-start">
                    <div className="relative mr-4">
                        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                            {profile.profile_picture || (profile.picture && profile.picture.image_path) ? (
                                <img
                                    src={
                                        profile.profile_picture?.startsWith('data:')
                                            ? profile.profile_picture
                                            : profile.picture?.image_path?.startsWith('data:')
                                              ? profile.picture.image_path
                                              : profile.profile_picture
                                                ? `${profile.profile_picture}`
                                                : profile.picture?.image_path
                                                  ? `${profile.picture.image_path}`
                                                  : '/api/placeholder/80/80'
                                    }
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

// Filter component
const FilterSection = ({
    filter,
    activeFilters,
    setActiveFilters,
}: {
    filter: FilterOption;
    activeFilters: Record<string, any>;
    setActiveFilters: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleFilterChange = (value: string | number | [number, number]) => {
        setActiveFilters((prev) => ({
            ...prev,
            [filter.name]: value,
        }));
    };

    return (
        <div className="border-t border-gray-200 py-3">
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center justify-between w-full text-left">
                <div className="flex items-center">
                    {filter.icon}
                    <span className="text-gray-700 ml-2">{filter.name}</span>
                </div>
                <ChevronDown className={`h-4 w-4 text-gray-500 transform ${isOpen ? 'rotate-180' : ''} transition-transform`} />
            </button>

            {isOpen && (
                <div className="mt-2 pl-6">
                    {filter.options ? (
                        // For dropdown style filters
                        <div className="space-y-1 max-h-40 overflow-y-auto">
                            <div key="empty" className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={`${filter.name}-empty`}
                                    checked={activeFilters[filter.name] === ''}
                                    onChange={() => handleFilterChange('')}
                                    className="h-4 w-4 text-yellow-500 rounded"
                                />
                                <label htmlFor={`${filter.name}-empty`} className="ml-2 text-sm text-gray-700">
                                    All
                                </label>
                            </div>
                            {filter.options.map((option) => (
                                <div key={option} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={`${filter.name}-${option}`}
                                        checked={activeFilters[filter.name] === option}
                                        onChange={() => handleFilterChange(option)}
                                        className="h-4 w-4 text-yellow-500 rounded"
                                    />
                                    <label htmlFor={`${filter.name}-${option}`} className="ml-2 text-sm text-gray-700">
                                        {option}
                                    </label>
                                </div>
                            ))}
                        </div>
                    ) : filter.min !== undefined && filter.max !== undefined ? (
                        // For range filters like age
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs text-gray-600">
                                <span>{filter.min}</span>
                                <span>{filter.max}</span>
                            </div>
                            <input
                                type="range"
                                min={filter.min}
                                max={filter.max}
                                value={activeFilters[filter.name] || filter.min}
                                onChange={(e) => handleFilterChange(parseInt(e.target.value))}
                                className="w-full accent-yellow-500"
                            />
                            <div className="text-center text-sm font-medium">{activeFilters[filter.name] || filter.min}</div>
                        </div>
                    ) : null}
                </div>
            )}
        </div>
    );
};

// Main component
const SearchResults = () => {
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState('Latest First');
    const [preferredSearch, setPreferredSearch] = useState(false);
    const [totalResults, setTotalResults] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedGender, setSelectedGender] = useState('Female'); // Default looking for females
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

    // Dynamic filter options state
    const [filterOptions, setFilterOptions] = useState<FilterOption[]>([]);

    // Active filters state - initialize with empty object
    const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});

    // Sort options
    const sortOptions = ['Latest First', 'Oldest First', 'Age: Low to High', 'Age: High to Low', 'Name: A to Z', 'Name: Z to A'];

    // Helper function to get icon for a filter
    const getIconForFilter = (filterName: string): React.ReactNode => {
        switch (filterName) {
            case 'Age':
                return <Calendar className="h-4 w-4 text-gray-500" />;
            case 'Country of Residence':
            case 'Region / District':
                return <MapPin className="h-4 w-4 text-gray-500" />;
            case 'Ethnicity':
            case 'Account Created by':
                return <User className="h-4 w-4 text-gray-500" />;
            case 'Religion':
            case 'Differently Abled':
                return <UserCheck className="h-4 w-4 text-gray-500" />;
            case 'Civil Status':
                return <Heart className="h-4 w-4 text-gray-500" />;
            case 'Profession':
                return <Briefcase className="h-4 w-4 text-gray-500" />;
            case 'Min Education Level':
            case 'Education Level':
                return <GraduationCap className="h-4 w-4 text-gray-500" />;
            case 'Height':
                return <Ruler className="h-4 w-4 text-gray-500" />;
            case 'Food Preference':
            case 'Drinking':
            case 'Smoking':
                return <Coffee className="h-4 w-4 text-gray-500" />;
            default:
                return <Filter className="h-4 w-4 text-gray-500" />;
        }
    };

    // Function to generate filter options dynamically from the data
    const generateFilterOptions = (profilesData: Profile[]) => {
        // Create sets to collect unique values for each filter category
        const filterCategories = [
            'Country of Residence',
            'Region / District',
            'Ethnicity',
            'Religion',
            'Civil Status',
            'Profession',
            'Education Level',
            'Height',
            'Food Preference',
            'Drinking',
            'Smoking',
            'Account Created by',
        ];

        const uniqueValues: Record<string, Set<string>> = {};

        // Initialize sets for each filter category
        filterCategories.forEach((category) => {
            uniqueValues[category] = new Set<string>();
        });

        // Collect all unique values from profiles
        profilesData.forEach((profile) => {
            // Helper function to extract value safely
            const getValue = (key: string): string => {
                const convertedKey = key.toLowerCase().replace(/\s+/g, '_');
                const value = profile[convertedKey as keyof Profile] || profile.matrimony?.[convertedKey as keyof Matrimony] || '';
                return value as string;
            };

            // Populate sets with unique values
            Object.keys(uniqueValues).forEach((key) => {
                let value = '';

                if (key === 'Region / District') {
                    value = profile.state_district || profile.matrimony?.state_district || '';
                } else if (key === 'Education Level') {
                    value = profile.education_level || profile.matrimony?.education_level || '';
                } else {
                    value = getValue(key);
                }

                if (value && typeof value === 'string') {
                    uniqueValues[key].add(value);
                }
            });
        });

        // Find minimum and maximum ages from the data
        const ages = profilesData.map((profile) => calculateAge(profile.birthdate || profile.matrimony?.birthdate || '')).filter((age) => age > 0);

        const minAge = ages.length > 0 ? Math.min(...ages) : 18;
        const maxAge = ages.length > 0 ? Math.max(...ages) : 70;

        // Convert unique value sets to arrays for each filter and update filter options
        const dynamicFilterOptions: FilterOption[] = [
            {
                name: 'Age',
                icon: <Calendar className="h-4 w-4 text-gray-500" />,
                min: minAge,
                max: maxAge,
            },
            ...Object.entries(uniqueValues)
                .filter(([_, values]) => values.size > 0) // Only include filters with values
                .map(([name, values]) => ({
                    name,
                    icon: getIconForFilter(name),
                    options: Array.from(values).sort(),
                })),
        ];

        // Update filter options state
        setFilterOptions(dynamicFilterOptions);

        // Initialize active filters with default values
        const initialActiveFilters: Record<string, any> = {
            Age: maxAge, // Set age slider to maximum by default
        };

        // Add empty values for all other filters
        dynamicFilterOptions.forEach((filter) => {
            if (filter.name !== 'Age') {
                initialActiveFilters[filter.name] = '';
            }
        });

        setActiveFilters(initialActiveFilters);
    };

    // Fetch profiles from API
    useEffect(() => {
        const fetchProfiles = async () => {
            setIsLoading(true);
            try {
                // Make the API call to fetch matrimony profiles - don't change this endpoint
                const response = await axios.get('http://127.0.0.1:8000/api/get-matrimony');

                // Handle the different possible response structures
                let profileData;

                if (response.data && (response.data.status === 200 || response.data.status === 'success')) {
                    if (response.data['Matrimony profiles retrieved successfully']) {
                        profileData = response.data['Matrimony profiles retrieved successfully'];
                    } else if (response.data.data) {
                        profileData = response.data.data;
                    } else {
                        throw new Error('Unexpected response format');
                    }

                    // Extract matrimony data from the profiles
                    const formattedProfiles = profileData.map((profile: any) => {
                        // If profile has matrimony data as a nested object, merge it with the profile
                        if (profile.matrimony) {
                            return {
                                ...profile,
                                ...profile.matrimony,
                                picture: profile.profile_picture ? { image_path: profile.profile_picture } : null,
                            };
                        }
                        return profile;
                    });

                    setProfiles(formattedProfiles);
                    setTotalResults(formattedProfiles.length);

                    // Generate dynamic filter options
                    generateFilterOptions(formattedProfiles);
                } else {
                    throw new Error('Failed to fetch profiles');
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch profiles');
                console.error('Error fetching profiles:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfiles();
    }, []);

    // Use useMemo for applied filters
    const appliedFilters = useMemo(() => {
        const newAppliedFilters: string[] = [];
        Object.entries(activeFilters).forEach(([key, value]) => {
            if (value !== '' && !(key === 'Age' && filterOptions.length > 0 && value === filterOptions[0]?.max)) {
                newAppliedFilters.push(`${key}: ${value}`);
            }
        });
        return newAppliedFilters;
    }, [activeFilters, filterOptions]);

    // Use useMemo for filtering and sorting profiles - this is the core optimization
    const filteredProfiles = useMemo(() => {
        // If profiles aren't loaded yet or activeFilters isn't initialized, return all profiles
        if (!profiles.length || Object.keys(activeFilters).length === 0) return profiles;

        let result = [...profiles];

        // Filter by gender
        result = result.filter((profile) => {
            const gender = profile.gender || profile.matrimony?.gender || '';
            return gender.toLowerCase() === selectedGender.toLowerCase();
        });

        // Apply other active filters
        Object.entries(activeFilters).forEach(([key, value]) => {
            if (value !== '' && !(key === 'Age' && filterOptions.length > 0 && value === filterOptions[0]?.max)) {
                // Skip empty values and max age (which means "show all")
                const filterKey = key.toLowerCase().replace(/\s+/g, '_');

                switch (key) {
                    case 'Age':
                        result = result.filter((profile) => {
                            const birthdate = profile.birthdate || profile.matrimony?.birthdate || '';
                            return calculateAge(birthdate) <= value;
                        });
                        break;
                    case 'Country of Residence':
                    case 'Religion':
                    case 'Ethnicity':
                    case 'Civil Status':
                    case 'Profession':
                    case 'Height':
                    case 'Food Preference':
                    case 'Drinking':
                    case 'Smoking':
                    case 'Account Created by':
                        result = result.filter((profile) => {
                            const profileValue = (profile[filterKey as keyof Profile] || profile.matrimony?.[filterKey as keyof Matrimony] || '') as string;
                            return profileValue.toLowerCase() === value.toLowerCase();
                        });
                        break;
                    case 'Education Level':
                        result = result.filter((profile) => {
                            const profileValue = (profile.education_level || profile.matrimony?.education_level || '') as string;
                            return profileValue.toLowerCase() === value.toLowerCase();
                        });
                        break;
                    case 'Region / District':
                        result = result.filter((profile) => {
                            const district = profile.state_district || profile.matrimony?.state_district || '';
                            return district.toLowerCase() === value.toLowerCase();
                        });
                        break;
                }
            }
        });

        // Apply sorting
        switch (sortBy) {
            case 'Latest First':
                result.sort((a, b) => {
                    const dateA = new Date(a.created_at || a.matrimony?.created_at || '');
                    const dateB = new Date(b.created_at || b.matrimony?.created_at || '');
                    return dateB.getTime() - dateA.getTime();
                });
                break;
            case 'Oldest First':
                result.sort((a, b) => {
                    const dateA = new Date(a.created_at || a.matrimony?.created_at || '');
                    const dateB = new Date(b.created_at || b.matrimony?.created_at || '');
                    return dateA.getTime() - dateB.getTime();
                });
                break;
            case 'Age: Low to High':
                result.sort((a, b) => {
                    const ageA = calculateAge(a.birthdate || a.matrimony?.birthdate || '');
                    const ageB = calculateAge(b.birthdate || b.matrimony?.birthdate || '');
                    return ageA - ageB;
                });
                break;
            case 'Age: High to Low':
                result.sort((a, b) => {
                    const ageA = calculateAge(a.birthdate || a.matrimony?.birthdate || '');
                    const ageB = calculateAge(b.birthdate || b.matrimony?.birthdate || '');
                    return ageB - ageA;
                });
                break;
            case 'Name: A to Z':
                result.sort((a, b) => {
                    const nameA = a.display_name || a.matrimony?.display_name || '';
                    const nameB = b.display_name || b.matrimony?.display_name || '';
                    return nameA.localeCompare(nameB);
                });
                break;
            case 'Name: Z to A':
                result.sort((a, b) => {
                    const nameA = a.display_name || a.matrimony?.display_name || '';
                    const nameB = b.display_name || b.matrimony?.display_name || '';
                    return nameB.localeCompare(nameA);
                });
                break;
        }

        return result;
    }, [profiles, selectedGender, activeFilters, sortBy, filterOptions]);

    // Remove a specific filter
    const removeFilter = (filterName: string) => {
        const [name] = filterName.split(':');
        setActiveFilters((prev) => ({
            ...prev,
            [name.trim()]: name.trim() === 'Age' && filterOptions.length > 0 ? filterOptions[0].max : '',
        }));
    };

    // Clear all filters
    const clearAllFilters = () => {
        if (filterOptions.length === 0) return;

        const resetFilters: Record<string, any> = {};

        // Reset age to maximum value from filter options
        resetFilters['Age'] = filterOptions[0].max || 70;

        // Reset all other filters to empty string
        filterOptions.forEach((filter) => {
            if (filter.name !== 'Age') {
                resetFilters[filter.name] = '';
            }
        });

        setActiveFilters(resetFilters);
    };

    // Items per page
    const itemsPerPage = 10;
    const totalPages = Math.ceil(filteredProfiles.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProfiles = filteredProfiles.slice(startIndex, endIndex);

    return (
        <div className="font-sans bg-gradient-to-b from-yellow-50 to-white min-h-screen">
            <Header />
            <div className="max-w-7xl mx-auto mt-14 pt-6 px-4">
                {/* Search Results Header */}
                <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center mb-3 md:mb-0">
                            <h2 className="text-xl font-semibold text-gray-800 mr-2">Search Results</h2>
                            <span className="text-sm text-gray-600">
                                {filteredProfiles.length > 0 ? `Showing ${startIndex + 1}-${Math.min(endIndex, filteredProfiles.length)} of ${filteredProfiles.length} profiles` : 'No profiles found'}
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
                                <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white cursor-pointer" onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}>
                                    <span className="text-sm text-gray-700 mr-2">Sort By: {sortBy}</span>
                                    <ChevronDown className="h-4 w-4 text-gray-500" />
                                </div>

                                {isSortDropdownOpen && (
                                    <div className="absolute right-0 top-10 z-10 mt-1 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                                        <div className="py-1">
                                            {sortOptions.map((option) => (
                                                <button
                                                    key={option}
                                                    onClick={() => {
                                                        setSortBy(option);
                                                        setIsSortDropdownOpen(false);
                                                    }}
                                                    className={`block w-full text-left px-4 py-2 text-sm ${sortBy === option ? 'bg-yellow-100 text-yellow-900' : 'text-gray-700'} hover:bg-yellow-50`}
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Applied Filters */}
                {appliedFilters.length > 0 && (
                    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-medium text-gray-700">Applied Filters</h3>
                            <button onClick={clearAllFilters} className="text-xs text-yellow-600 hover:text-yellow-800">
                                Clear All
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {appliedFilters.map((filter) => (
                                <div key={filter} className="flex items-center bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                                    {filter}
                                    <button onClick={() => removeFilter(filter)} className="ml-1 text-yellow-600 hover:text-yellow-800">
                                        <X className="h-3 w-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

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
                            {filterOptions.length > 0 ? (
                                filterOptions.map((filter) => <FilterSection key={filter.name} filter={filter} activeFilters={activeFilters} setActiveFilters={setActiveFilters} />)
                            ) : (
                                <div className="text-center py-8">
                                    <div className="animate-spin mx-auto h-6 w-6 border-2 border-yellow-500 rounded-full border-t-transparent mb-2"></div>
                                    <p className="text-gray-500 text-sm">Loading filters...</p>
                                </div>
                            )}

                            <div className="mt-6">
                                <div className="text-sm text-gray-700 mb-3">Save this search as your preferred search criteria?</div>
                                <button className="bg-black text-white px-6 py-2 rounded-md font-medium hover:bg-gray-800 transition-colors flex items-center justify-center w-full">
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
                        ) : filteredProfiles.length === 0 ? (
                            <div className="bg-yellow-50 p-6 rounded-lg text-yellow-800 flex flex-col items-center">
                                <Search className="h-12 w-12 text-yellow-500 mb-4" />
                                <p className="text-center">No profiles match your search criteria.</p>
                                <button className="mt-4 px-6 py-2 bg-yellow-100 text-yellow-800 rounded-md hover:bg-yellow-200 flex items-center" onClick={clearAllFilters}>
                                    <Filter className="h-4 w-4 mr-2" />
                                    Clear Filters
                                </button>
                            </div>
                        ) : (
                            currentProfiles.map((profile, index) => <ProfileCard key={profile.user_id || index} profile={profile} index={index} />)
                        )}

                        {/* Pagination */}
                        {!isLoading && !error && filteredProfiles.length > 0 && (
                            <div className="flex justify-center mt-6 mb-8">
                                <nav className="inline-flex rounded-md shadow">
                                    <button
                                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                        className={`px-3 py-2 border border-gray-300 text-sm font-medium rounded-l-md flex items-center ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                                    >
                                        <ArrowLeft className="h-3 w-3 mr-1" />
                                        Previous
                                    </button>

                                    {/* Generate page buttons */}
                                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                        // Show pages around current page
                                        let pageNum = currentPage;
                                        if (currentPage <= 3) {
                                            pageNum = i + 1;
                                        } else if (currentPage >= totalPages - 2) {
                                            pageNum = totalPages - 4 + i;
                                        } else {
                                            pageNum = currentPage - 2 + i;
                                        }

                                        // Ensure page number is within range
                                        if (pageNum <= 0 || pageNum > totalPages) return null;

                                        return (
                                            <button
                                                key={pageNum}
                                                onClick={() => setCurrentPage(pageNum)}
                                                className={`px-3 py-2 border border-gray-300 text-sm font-medium ${pageNum === currentPage ? 'bg-yellow-400 text-gray-800' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                                            >
                                                {pageNum}
                                            </button>
                                        );
                                    })}

                                    <button
                                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                        className={`px-3 py-2 border border-gray-300 text-sm font-medium rounded-r-md flex items-center ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                                    >
                                        Next
                                        <ArrowLeft className="h-3 w-3 ml-1 transform rotate-180" />
                                    </button>
                                </nav>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SearchResults;
