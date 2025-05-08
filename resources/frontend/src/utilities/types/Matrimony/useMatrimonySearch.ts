import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { FilterOption, Profile } from './IMatrimonyView';
import { calculateAge } from './dataUtils';
import { getIconForFilter } from '../../../pages/Matrimony/ViewMatrimony/filterUtils';
import apiConfig from '../../apiConfig';

export const useMatrimonySearch = () => {
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState('Latest First');
    const [preferredSearch, setPreferredSearch] = useState(false);
    const [totalResults, setTotalResults] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedGender, setSelectedGender] = useState('Female');
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
    const [filterOptions, setFilterOptions] = useState<FilterOption[]>([]);
    const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});
    const sortOptions = ['Latest First', 'Oldest First', 'Age: Low to High', 'Age: High to Low', 'Name: A to Z', 'Name: Z to A'];
    const generateFilterOptions = (profilesData: Profile[]) => {
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
        filterCategories.forEach((category) => {
            uniqueValues[category] = new Set<string>();
        });

        profilesData.forEach((profile) => {
            const getValue = (key: string): string => {
                const convertedKey = key.toLowerCase().replace(/\s+/g, '_');
                const value = (profile as any)[convertedKey] || (profile.matrimony && (profile.matrimony as any)[convertedKey]) || '';
                return String(value);
            };

            Object.keys(uniqueValues).forEach((key) => {
                let value = '';

                if (key === 'Region / District') {
                    value = profile.state_district || (profile.matrimony && profile.matrimony.state_district) || '';
                } else if (key === 'Education Level') {
                    value = profile.education_level || (profile.matrimony && profile.matrimony.education_level) || '';
                } else {
                    value = getValue(key);
                }

                if (value && typeof value === 'string') {
                    uniqueValues[key].add(value);
                }
            });
        });

        const ages = profilesData.map((profile) => calculateAge(profile.birthdate || (profile.matrimony && profile.matrimony.birthdate) || '')).filter((age) => age > 0);

        const minAge = ages.length > 0 ? Math.min(...ages) : 18;
        const maxAge = ages.length > 0 ? Math.max(...ages) : 70;

        const dynamicFilterOptions: FilterOption[] = [
            {
                name: 'Age',
                icon: getIconForFilter('Age'),
                min: minAge,
                max: maxAge,
            },
            ...Object.entries(uniqueValues)
                .filter(([_, values]) => values.size > 0)
                .map(([name, values]) => ({
                    name,
                    icon: getIconForFilter(name),
                    options: Array.from(values).sort(),
                })),
        ];

        setFilterOptions(dynamicFilterOptions);

        const initialActiveFilters: Record<string, any> = {
            Age: maxAge,
        };

        dynamicFilterOptions.forEach((filter) => {
            if (filter.name !== 'Age') {
                initialActiveFilters[filter.name] = '';
            }
        });

        setActiveFilters(initialActiveFilters);
    };

    useEffect(() => {
        const fetchProfiles = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(apiConfig.endpoints.matrimony.list);
                let profileData;

                if (response.data && (response.data.status === 200 || response.data.status === 'success')) {
                    if (response.data['Matrimony profiles retrieved successfully']) {
                        profileData = response.data['Matrimony profiles retrieved successfully'];
                    } else if (response.data.data) {
                        profileData = response.data.data;
                    } else {
                        throw new Error('Unexpected response format');
                    }
                    const formattedProfiles = profileData.map((profile: any) => {
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

    const appliedFilters = useMemo(() => {
        const newAppliedFilters: string[] = [];
        Object.entries(activeFilters).forEach(([key, value]) => {
            if (value !== '' && !(key === 'Age' && filterOptions.length > 0 && value === filterOptions[0]?.max)) {
                newAppliedFilters.push(`${key}: ${value}`);
            }
        });
        return newAppliedFilters;
    }, [activeFilters, filterOptions]);

    const filteredProfiles = useMemo(() => {
        if (!profiles.length || Object.keys(activeFilters).length === 0) return profiles;
        let result = [...profiles];

        result = result.filter((profile) => {
            const gender = profile.gender || (profile.matrimony && profile.matrimony.gender) || '';
            return gender.toLowerCase() === selectedGender.toLowerCase();
        });

        Object.entries(activeFilters).forEach(([key, value]) => {
            if (value !== '' && !(key === 'Age' && filterOptions.length > 0 && value === filterOptions[0]?.max)) {
                const filterKey = key.toLowerCase().replace(/\s+/g, '_');

                switch (key) {
                    case 'Age':
                        result = result.filter((profile) => {
                            const birthdate = profile.birthdate || (profile.matrimony && profile.matrimony.birthdate) || '';
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
                            const profileValue = (profile as any)[filterKey] || (profile.matrimony && (profile.matrimony as any)[filterKey]) || '';
                            return String(profileValue).toLowerCase() === String(value).toLowerCase();
                        });
                        break;
                    case 'Education Level':
                        result = result.filter((profile) => {
                            const profileValue = profile.education_level || (profile.matrimony && profile.matrimony.education_level) || '';
                            return profileValue.toLowerCase() === value.toLowerCase();
                        });
                        break;
                    case 'Region / District':
                        result = result.filter((profile) => {
                            const district = profile.state_district || (profile.matrimony && profile.matrimony.state_district) || '';
                            return district.toLowerCase() === value.toLowerCase();
                        });
                        break;
                }
            }
        });

        switch (sortBy) {
            case 'Latest First':
                result.sort((a, b) => {
                    const aBoost = a.boot_post === 1 || (a.matrimony && a.matrimony.boot_post === 1) ? 1 : 0;
                    const bBoost = b.boot_post === 1 || (b.matrimony && b.matrimony.boot_post === 1) ? 1 : 0;

                    if (aBoost !== bBoost) {
                        return bBoost - aBoost;
                    }
                    const dateA = new Date(a.created_at || (a.matrimony && a.matrimony.created_at) || '');
                    const dateB = new Date(b.created_at || (b.matrimony && b.matrimony.created_at) || '');
                    return dateB.getTime() - dateA.getTime();
                });
                break;
            case 'Oldest First':
                result.sort((a, b) => {
                    const aBoost = a.boot_post === 1 || (a.matrimony && a.matrimony.boot_post === 1) ? 1 : 0;
                    const bBoost = b.boot_post === 1 || (b.matrimony && b.matrimony.boot_post === 1) ? 1 : 0;

                    if (aBoost !== bBoost) {
                        return bBoost - aBoost;
                    }

                    const dateA = new Date(a.created_at || (a.matrimony && a.matrimony.created_at) || '');
                    const dateB = new Date(b.created_at || (b.matrimony && b.matrimony.created_at) || '');
                    return dateA.getTime() - dateB.getTime();
                });
                break;
            case 'Age: Low to High':
                result.sort((a, b) => {
                    const aBoost = a.boot_post === 1 || (a.matrimony && a.matrimony.boot_post === 1) ? 1 : 0;
                    const bBoost = b.boot_post === 1 || (b.matrimony && b.matrimony.boot_post === 1) ? 1 : 0;

                    if (aBoost !== bBoost) {
                        return bBoost - aBoost;
                    }

                    const ageA = calculateAge(a.birthdate || (a.matrimony && a.matrimony.birthdate) || '');
                    const ageB = calculateAge(b.birthdate || (b.matrimony && b.matrimony.birthdate) || '');
                    return ageA - ageB;
                });
                break;
            case 'Age: High to Low':
                result.sort((a, b) => {
                    const aBoost = a.boot_post === 1 || (a.matrimony && a.matrimony.boot_post === 1) ? 1 : 0;
                    const bBoost = b.boot_post === 1 || (b.matrimony && b.matrimony.boot_post === 1) ? 1 : 0;

                    if (aBoost !== bBoost) {
                        return bBoost - aBoost;
                    }
                    const ageA = calculateAge(a.birthdate || (a.matrimony && a.matrimony.birthdate) || '');
                    const ageB = calculateAge(b.birthdate || (b.matrimony && b.matrimony.birthdate) || '');
                    return ageB - ageA;
                });
                break;
            case 'Name: A to Z':
                result.sort((a, b) => {
                    const aBoost = a.boot_post === 1 || (a.matrimony && a.matrimony.boot_post === 1) ? 1 : 0;
                    const bBoost = b.boot_post === 1 || (b.matrimony && b.matrimony.boot_post === 1) ? 1 : 0;

                    if (aBoost !== bBoost) {
                        return bBoost - aBoost;
                    }

                    const nameA = a.display_name || (a.matrimony && a.matrimony.display_name) || '';
                    const nameB = b.display_name || (b.matrimony && b.matrimony.display_name) || '';
                    return nameA.localeCompare(nameB);
                });
                break;
            case 'Name: Z to A':
                result.sort((a, b) => {
                    const aBoost = a.boot_post === 1 || (a.matrimony && a.matrimony.boot_post === 1) ? 1 : 0;
                    const bBoost = b.boot_post === 1 || (b.matrimony && b.matrimony.boot_post === 1) ? 1 : 0;

                    if (aBoost !== bBoost) {
                        return bBoost - aBoost;
                    }
                    const nameA = a.display_name || (a.matrimony && a.matrimony.display_name) || '';
                    const nameB = b.display_name || (b.matrimony && b.matrimony.display_name) || '';
                    return nameB.localeCompare(nameA);
                });
                break;
        }

        return result;
    }, [profiles, selectedGender, activeFilters, sortBy, filterOptions]);

    const removeFilter = (filterName: string) => {
        const [name] = filterName.split(':');
        setActiveFilters((prev) => ({
            ...prev,
            [name.trim()]: name.trim() === 'Age' && filterOptions.length > 0 ? filterOptions[0].max : '',
        }));
    };

    const clearAllFilters = () => {
        if (filterOptions.length === 0) return;

        const resetFilters: Record<string, any> = {};
        resetFilters['Age'] = filterOptions[0].max || 70;
        filterOptions.forEach((filter) => {
            if (filter.name !== 'Age') {
                resetFilters[filter.name] = '';
            }
        });

        setActiveFilters(resetFilters);
    };

    const itemsPerPage = 10;
    const totalPages = Math.ceil(filteredProfiles.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProfiles = filteredProfiles.slice(startIndex, endIndex);

    return {
        profiles,
        isLoading,
        error,
        sortBy,
        setSortBy,
        preferredSearch,
        setPreferredSearch,
        totalResults,
        currentPage,
        setCurrentPage,
        selectedGender,
        setSelectedGender,
        isSortDropdownOpen,
        setIsSortDropdownOpen,
        filterOptions,
        activeFilters,
        setActiveFilters,
        sortOptions,
        appliedFilters,
        filteredProfiles,
        removeFilter,
        clearAllFilters,
        itemsPerPage,
        totalPages,
        startIndex,
        endIndex,
        currentProfiles,
    };
};

export default useMatrimonySearch;
