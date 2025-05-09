import React, { useState, useEffect, useMemo } from 'react';
import { ChevronDown, ChevronUp, Eye, Filter, Loader, ArrowDown, ArrowUp, Search, RefreshCw, X, Star, CheckCircle, Package, Zap, ToggleLeft, ToggleRight } from 'lucide-react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiConfig from '../../utilities/apiConfig';
import { ApiResponse, FilterOptions, MatrimonyProfile } from '../../utilities/types/Matrimony/IAdminMatrimonyView';

// Package descriptions and features
const packageDetails = {
    1: {
        name: 'Basic',
        color: 'bg-gray-100 text-gray-600',
        borderColor: 'border-gray-300',
        features: ['Limited profile visibility', '1 month access', '5 contact reveals'],
    },
    2: {
        name: 'Standard',
        color: 'bg-blue-100 text-blue-600',
        borderColor: 'border-blue-300',
        features: ['Full profile visibility', '3 months access', '25 contact reveals', 'Advanced filtering'],
    },
    3: {
        name: 'Pro',
        color: 'bg-yellow-100 text-yellow-800',
        borderColor: 'border-yellow-400',
        features: ['Premium profile visibility', '12 months access', 'Unlimited contact reveals', 'Priority in search results', 'Weekly suggested matches'],
    },
};

// Enhanced sort options with more detailed configurations
const sortOptions = [
    { label: 'Latest First', field: 'created_at', direction: 'desc' },
    { label: 'Oldest First', field: 'created_at', direction: 'asc' },
    { label: 'Age: Low to High', field: 'birthdate', direction: 'desc' },
    { label: 'Age: High to Low', field: 'birthdate', direction: 'asc' },
    { label: 'Name: A to Z', field: 'display_name', direction: 'asc' },
    { label: 'Name: Z to A', field: 'display_name', direction: 'desc' },
    { label: 'Country: A to Z', field: 'country_of_residence', direction: 'asc' },
    { label: 'Country: Z to A', field: 'country_of_residence', direction: 'desc' },
    { label: 'Religion: A to Z', field: 'religion', direction: 'asc' },
    { label: 'Religion: Z to A', field: 'religion', direction: 'desc' },
];

// Filter categories for advanced filtering
const filterCategories = [
    {
        name: 'status',
        label: 'Status',
        options: [
            { value: 'active', label: 'Active', filter: (profile: MatrimonyProfile) => profile.is_active === true },
            { value: 'inactive', label: 'Inactive', filter: (profile: MatrimonyProfile) => profile.is_active === false },
        ],
    },
    {
        name: 'featured',
        label: 'Featured',
        options: [
            { value: 'featured', label: 'Featured', filter: (profile: MatrimonyProfile) => profile.boot_post === 1 },
            { value: 'regular', label: 'Regular', filter: (profile: MatrimonyProfile) => profile.boot_post === 0 },
        ],
    },
    {
        name: 'gender',
        label: 'Gender',
        options: [
            { value: 'male', label: 'Male', filter: (profile: MatrimonyProfile) => profile.gender?.toLowerCase() === 'male' },
            { value: 'female', label: 'Female', filter: (profile: MatrimonyProfile) => profile.gender?.toLowerCase() === 'female' },
        ],
    },
    {
        name: 'package',
        label: 'Package',
        options: [
            { value: '1', label: 'Basic', filter: (profile: MatrimonyProfile) => profile.package_number === 1 },
            { value: '2', label: 'Standard', filter: (profile: MatrimonyProfile) => profile.package_number === 2 },
            { value: '3', label: 'Pro', filter: (profile: MatrimonyProfile) => profile.package_number === 3 },
        ],
    },
];

const MatrimonyProfilesTable: React.FC = () => {
    // State variables
    const [profiles, setProfiles] = useState<MatrimonyProfile[]>([]);
    const [selectedProfile, setSelectedProfile] = useState<MatrimonyProfile | null>(null);
    const [packageModalProfile, setPackageModalProfile] = useState<MatrimonyProfile | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showPackageModal, setShowPackageModal] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [sortField, setSortField] = useState<string>('');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [searchFilter, setSearchFilter] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isActionLoading, setIsActionLoading] = useState<Record<string, boolean>>({});
    const [error, setError] = useState<string>('');
    const [totalResults, setTotalResults] = useState<number>(0);
    const [filterOptions, setFilterOptions] = useState<FilterOptions>({
        countries: [],
        religions: [],
        educations: [],
        genders: [],
    });

    // Advanced filtering states
    const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
    const [dropdownOpen, setDropdownOpen] = useState<Record<string, boolean>>({});
    const [sortDropdownOpen, setSortDropdownOpen] = useState<boolean>(false);
    const [filterDropdownOpen, setFilterDropdownOpen] = useState<boolean>(false);
    const [advancedFiltersOpen, setAdvancedFiltersOpen] = useState<boolean>(false);

    const profilesPerPage = 10;

    // Effect to fetch profiles on component mount
    useEffect(() => {
        fetchProfiles();
    }, []);

    // Generate filter options from profile data
    const generateFilterOptions = (profileData: MatrimonyProfile[]) => {
        const countries = new Set<string>();
        const religions = new Set<string>();
        const educations = new Set<string>();
        const genders = new Set<string>();

        profileData.forEach((profile) => {
            if (profile.country_of_residence) countries.add(profile.country_of_residence);
            if (profile.religion) religions.add(profile.religion);
            if (profile.education_level) educations.add(profile.education_level);
            if (profile.gender) genders.add(profile.gender);
        });

        setFilterOptions({
            countries: Array.from(countries),
            religions: Array.from(religions),
            educations: Array.from(educations),
            genders: Array.from(genders),
        });
    };

    // Fetch profiles from API
    const fetchProfiles = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get<ApiResponse>(apiConfig.endpoints.matrimony.list);
            let profileData: MatrimonyProfile[] = [];

            if (response.data && (response.data.status === 200 || response.data.status === 'success')) {
                if (response.data['Matrimony profiles retrieved successfully']) {
                    profileData = response.data['Matrimony profiles retrieved successfully'];
                } else if (response.data.data) {
                    profileData = response.data.data;
                } else {
                    throw new Error('Unexpected response format');
                }

                const formattedProfiles = profileData.map((profile) => {
                    if (profile.matrimony) {
                        return {
                            ...profile,
                            ...profile.matrimony,
                            picture: profile.profile_picture ? { image_path: profile.profile_picture } : undefined,
                            is_active: profile.is_active !== undefined ? profile.is_active : true,
                        } as unknown as MatrimonyProfile;
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
            toast.error('Failed to load profiles');
        } finally {
            setIsLoading(false);
        }
    };

    // API calls for profile actions
    const updateBootPost = async (matrimonyId: string, bootPost: boolean) => {
        setIsActionLoading((prev) => ({ ...prev, [`boot_${matrimonyId}`]: true }));
        try {
            const response = await axios.post(apiConfig.endpoints.matrimony.updateBootPost(matrimonyId), {
                boot_post: bootPost ? 1 : 0,
            });

            if (response.data && (response.data.status === 200 || response.data.status === 'success')) {
                setProfiles((prevProfiles) => prevProfiles.map((profile) => (profile.user_id === matrimonyId ? { ...profile, boot_post: bootPost ? 1 : 0 } : profile)));
                toast.success(`Profile ${bootPost ? 'featured' : 'unfeatured'} successfully`);
            } else {
                throw new Error(response.data?.message || 'Failed to update boot post status');
            }
        } catch (err) {
            console.error('Error updating boot post:', err);
            setError(err instanceof Error ? err.message : 'Failed to update boot post status');
            toast.error('Failed to update featured status');
        } finally {
            setIsActionLoading((prev) => ({ ...prev, [`boot_${matrimonyId}`]: false }));
        }
    };

    const updateActiveStatus = async (matrimonyId: string, isActive: boolean) => {
        setIsActionLoading((prev) => ({ ...prev, [`active_${matrimonyId}`]: true }));
        try {
            const response = await axios.post(apiConfig.endpoints.matrimony.updateActiveStatus(matrimonyId), {
                is_active: isActive,
            });

            setProfiles((prevProfiles) => prevProfiles.map((profile) => (profile.user_id === matrimonyId ? { ...profile, is_active: isActive } : profile)));

            if (selectedProfile && selectedProfile.user_id === matrimonyId) {
                setSelectedProfile((prev) => (prev ? { ...prev, is_active: isActive } : null));
            }
            toast.success(`Profile ${isActive ? 'activated' : 'deactivated'} successfully`);
        } catch (err) {
            console.error('Error updating active status:', err);
            toast.error('Failed to update active status');
        } finally {
            setIsActionLoading((prev) => ({ ...prev, [`active_${matrimonyId}`]: false }));
        }
    };

    const updatePackageNumber = async (matrimonyId: string, packageNumber: number) => {
        setIsActionLoading((prev) => ({ ...prev, [`package_${matrimonyId}`]: true }));
        try {
            const response = await axios.post(apiConfig.endpoints.matrimony.updatePackageNumber(matrimonyId), {
                package_number: packageNumber,
            });
            if (response.data && (response.data.status === 200 || response.data.status === 'success')) {
                setProfiles((prevProfiles) => prevProfiles.map((profile) => (profile.user_id === matrimonyId ? { ...profile, package_number: packageNumber } : profile)));

                if (selectedProfile && selectedProfile.user_id === matrimonyId) {
                    setSelectedProfile((prev) => (prev ? { ...prev, package_number: packageNumber } : null));
                }
                setShowPackageModal(false);
                const packageName = packageDetails[packageNumber as keyof typeof packageDetails]?.name || 'Unknown';
                toast.success(`Package updated to ${packageName} successfully`);
            } else {
                throw new Error(response.data?.message || 'Failed to update package');
            }
        } catch (err) {
            console.error('Error updating package:', err);
            setError(err instanceof Error ? err.message : 'Failed to update package');
            toast.error('Failed to update package');
        } finally {
            setIsActionLoading((prev) => ({ ...prev, [`package_${matrimonyId}`]: false }));
        }
    };

    // UI Interaction handlers
    const handlePackageChange = (profile: MatrimonyProfile, packageNumber: number) => {
        updatePackageNumber(profile.user_id, packageNumber);
        setDropdownOpen((prev) => ({ ...prev, [profile.user_id]: false }));
    };

    const toggleDropdown = (id: string) => {
        setDropdownOpen((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const handleSort = (field: string, direction?: 'asc' | 'desc') => {
        if (field === sortField && !direction) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection(direction || 'asc');
        }
        setSortDropdownOpen(false);
    };

    // Apply or remove filters
    const toggleFilter = (category: string, value: string) => {
        setActiveFilters((prev) => {
            const currentValues = prev[category] || [];
            const newValues = currentValues.includes(value) ? currentValues.filter((v) => v !== value) : [...currentValues, value];

            return {
                ...prev,
                [category]: newValues.length > 0 ? newValues : [],
            };
        });
        setCurrentPage(1); // Reset to first page when filters change
    };

    const clearAllFilters = () => {
        setSearchFilter('');
        setActiveFilters({});
        setCurrentPage(1);
    };

    // Count active filters for badge display
    const getActiveFiltersCount = () => {
        return Object.values(activeFilters).reduce((count, values) => count + values.length, 0);
    };

    // Filter profiles based on all active filters
    const filteredProfiles = useMemo(() => {
        let result = [...profiles];

        // Apply text search filter
        if (searchFilter) {
            const lowerFilter = searchFilter.toLowerCase();
            result = result.filter(
                (profile) =>
                    profile.display_name?.toLowerCase().includes(lowerFilter) ||
                    profile.gender?.toLowerCase().includes(lowerFilter) ||
                    profile.profession?.toLowerCase().includes(lowerFilter) ||
                    profile.country_of_residence?.toLowerCase().includes(lowerFilter) ||
                    profile.religion?.toLowerCase().includes(lowerFilter) ||
                    profile.email?.toLowerCase().includes(lowerFilter),
            );
        }

        // Apply each category of filters
        Object.entries(activeFilters).forEach(([category, values]) => {
            if (values.length > 0) {
                const categoryFilters = filterCategories.find((c) => c.name === category);
                if (categoryFilters) {
                    const filtersToApply = categoryFilters.options.filter((option) => values.includes(option.value)).map((option) => option.filter);

                    if (filtersToApply.length > 0) {
                        result = result.filter((profile) => filtersToApply.some((filterFn) => filterFn(profile)));
                    }
                }
            }
        });

        return result;
    }, [profiles, searchFilter, activeFilters]);

    // Apply sorting to filtered profiles
    const sortedProfiles = useMemo(() => {
        if (!sortField) return filteredProfiles;

        return [...filteredProfiles].sort((a, b) => {
            let aValue = a[sortField as keyof MatrimonyProfile];
            let bValue = b[sortField as keyof MatrimonyProfile];

            // Handle string sorting (case-insensitive)
            if (typeof aValue === 'string' && typeof bValue === 'string') {
                aValue = aValue.toLowerCase();
                bValue = bValue.toLowerCase();
            }

            // Handle date comparisons
            if (sortField === 'birthdate' || sortField === 'created_at') {
                const dateA = aValue ? new Date(aValue as string).getTime() : 0;
                const dateB = bValue ? new Date(bValue as string).getTime() : 0;
                return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
            }

            if (sortDirection === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });
    }, [filteredProfiles, sortField, sortDirection]);

    // View profile details
    const handleViewProfile = (profile: MatrimonyProfile) => {
        setSelectedProfile(profile);
        setShowModal(true);
    };

    // Handle package modal
    const handlePackageModal = (profile: MatrimonyProfile) => {
        setPackageModalProfile(profile);
        setShowPackageModal(true);
    };

    // Render sort icon
    const renderSortIcon = (field: string) => {
        if (sortField !== field) return null;
        return sortDirection === 'asc' ? <ChevronUp size={16} className="text-yellow-600" /> : <ChevronDown size={16} className="text-yellow-600" />;
    };

    // Handle quick filter selection
    const handleQuickFilterSelect = (category: string, value: string) => {
        setActiveFilters({
            ...activeFilters,
            [category]: [value],
        });
        setCurrentPage(1); // Reset to first page when filter changes
    };

    // Refresh data
    const refreshData = async () => {
        setIsLoading(true);
        setError('');
        await fetchProfiles();
    };

    // Render package badge
    const renderPackageBadge = (packageNumber: number = 1) => {
        const packageInfo = packageDetails[packageNumber as keyof typeof packageDetails] || packageDetails[1];
        return (
            <div className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${packageInfo.color}`}>
                <Package size={12} className="mr-1" />
                {packageInfo.name}
            </div>
        );
    };

    // Apply pagination
    const indexOfLastProfile = currentPage * profilesPerPage;
    const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
    const currentProfiles = sortedProfiles.slice(indexOfFirstProfile, indexOfLastProfile);
    const totalPages = Math.ceil(sortedProfiles.length / profilesPerPage);

    // Render pagination UI
    const renderPagination = () => {
        if (totalPages <= 1) return null;

        return (
            <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
                <div className="text-sm text-gray-500 mb-4 sm:mb-0">
                    Showing {indexOfFirstProfile + 1} to {Math.min(indexOfLastProfile, sortedProfiles.length)} of {sortedProfiles.length} entries
                </div>

                <div className="flex space-x-1">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1 border border-gray-300 rounded-md bg-white disabled:opacity-50 disabled:cursor-not-allowed text-sm hover:bg-gray-50 transition-colors"
                    >
                        Previous
                    </button>

                    {/* Display limited number of page buttons */}
                    {(() => {
                        const pageButtons = [];
                        const maxVisiblePages = 5;
                        let startPage = 1;
                        let endPage = totalPages;

                        if (totalPages > maxVisiblePages) {
                            // Calculate start and end page to show
                            const halfVisible = Math.floor(maxVisiblePages / 2);

                            if (currentPage <= halfVisible + 1) {
                                // Near start, show first maxVisiblePages
                                endPage = maxVisiblePages;
                            } else if (currentPage >= totalPages - halfVisible) {
                                // Near end, show last maxVisiblePages
                                startPage = totalPages - maxVisiblePages + 1;
                            } else {
                                // In middle, show currentPage in center
                                startPage = currentPage - halfVisible;
                                endPage = currentPage + halfVisible;
                            }
                        }

                        for (let i = startPage; i <= endPage; i++) {
                            pageButtons.push(
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i)}
                                    className={`px-3 py-1 border rounded-md text-sm
                    ${currentPage === i ? 'bg-yellow-400 text-gray-800 border-yellow-400' : 'bg-white hover:bg-gray-50 border-gray-300'}`}
                                >
                                    {i}
                                </button>,
                            );
                        }

                        return pageButtons;
                    })()}

                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages || totalPages === 0}
                        className="px-3 py-1 border border-gray-300 rounded-md bg-white disabled:opacity-50 disabled:cursor-not-allowed text-sm hover:bg-gray-50 transition-colors"
                    >
                        Next
                    </button>
                </div>
            </div>
        );
    };

    // Render active filters display
    const renderActiveFilters = () => {
        if (searchFilter || Object.values(activeFilters).some((values) => values.length > 0)) {
            return (
                <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="text-sm text-gray-600">Active filters:</span>

                    {/* Text search filter */}
                    {searchFilter && (
                        <div className="flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                            Search: {searchFilter}
                            <button onClick={() => setSearchFilter('')} className="ml-2 text-yellow-600 hover:text-yellow-800">
                                <X size={14} />
                            </button>
                        </div>
                    )}

                    {/* Render all other active filters */}
                    {Object.entries(activeFilters).map(([category, values]) =>
                        values.map((value) => {
                            const categoryConfig = filterCategories.find((c) => c.name === category);
                            const optionConfig = categoryConfig?.options.find((o) => o.value === value);

                            if (!categoryConfig || !optionConfig) return null;

                            let bgColor = 'bg-gray-100';
                            let textColor = 'text-gray-800';

                            // Custom colors based on filter type
                            if (category === 'gender') {
                                bgColor = value === 'male' ? 'bg-blue-100' : 'bg-pink-100';
                                textColor = value === 'male' ? 'text-blue-800' : 'text-pink-800';
                            } else if (category === 'status') {
                                bgColor = value === 'active' ? 'bg-green-100' : 'bg-red-100';
                                textColor = value === 'active' ? 'text-green-800' : 'text-red-800';
                            } else if (category === 'featured') {
                                bgColor = value === 'featured' ? 'bg-yellow-100' : 'bg-gray-200';
                                textColor = value === 'featured' ? 'text-yellow-800' : 'text-gray-800';
                            } else if (category === 'package') {
                                const pkg = packageDetails[parseInt(value) as keyof typeof packageDetails];
                                if (pkg) {
                                    bgColor = pkg.color.split(' ')[0];
                                    textColor = pkg.color.split(' ')[1];
                                }
                            }

                            return (
                                <div key={`${category}-${value}`} className={`flex items-center px-3 py-1 rounded-full text-sm ${bgColor} ${textColor}`}>
                                    {categoryConfig.label}: {optionConfig.label}
                                    <button onClick={() => toggleFilter(category, value)} className="ml-2 text-yellow-600 hover:text-yellow-800">
                                        <X size={14} />
                                    </button>
                                </div>
                            );
                        }),
                    )}

                    {/* Clear all filters button */}
                    <button onClick={clearAllFilters} className="ml-2 text-xs text-yellow-600 hover:text-yellow-800 underline">
                        Clear all
                    </button>
                </div>
            );
        }
        return null;
    };

    // Render sort dropdown
    const renderSortDropdown = () => (
        <div className="relative">
            <button onClick={() => setSortDropdownOpen(!sortDropdownOpen)} className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md text-sm">
                <ArrowDown size={16} className="mr-2" />
                Sort
                {sortField && (
                    <span className="ml-1 px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                        {sortOptions.find((o) => o.field === sortField && o.direction === sortDirection)?.label || 'Custom'}
                    </span>
                )}
            </button>

            {sortDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-10">
                    <div className="py-1">
                        {sortOptions.map((option, index) => (
                            <button key={index} className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-50" onClick={() => handleSort(option.field, option.direction)}>
                                {option.field === sortField && option.direction === sortDirection ? <CheckCircle size={14} className="mr-2 text-yellow-600" /> : <div className="w-4 h-4 mr-2" />}
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );

    // Render advanced filter dropdown
    const renderAdvancedFilterDropdown = () => (
        <div className="relative">
            <button
                onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium ${
                    getActiveFiltersCount() > 0 ? 'bg-yellow-400 text-yellow-900' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
            >
                <Filter size={16} className="mr-2" />
                Filters
                {getActiveFiltersCount() > 0 && <span className="ml-2 bg-white text-yellow-800 rounded-full w-5 h-5 flex items-center justify-center text-xs">{getActiveFiltersCount()}</span>}
            </button>

            {filterDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg z-10 p-4">
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="text-sm font-medium text-gray-700">Advanced Filters</h3>
                        <button onClick={clearAllFilters} className="text-xs text-yellow-600 hover:text-yellow-800">
                            Clear all
                        </button>
                    </div>

                    {filterCategories.map((category) => (
                        <div key={category.name} className="mb-3">
                            <label className="block text-xs font-medium text-gray-700 mb-1">{category.label}</label>
                            <div className="flex flex-wrap gap-2">
                                {category.options.map((option) => {
                                    const isActive = (activeFilters[category.name] || []).includes(option.value);
                                    let buttonClasses = 'px-3 py-1 text-xs rounded-full ';

                                    // Custom styling based on filter type and state
                                    if (isActive) {
                                        if (category.name === 'gender') {
                                            buttonClasses += option.value === 'male' ? 'bg-blue-100 text-blue-800 border border-blue-300' : 'bg-pink-100 text-pink-800 border border-pink-300';
                                        } else if (category.name === 'status') {
                                            buttonClasses += option.value === 'active' ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-red-100 text-red-800 border border-red-300';
                                        } else if (category.name === 'featured') {
                                            buttonClasses +=
                                                option.value === 'featured' ? 'bg-yellow-100 text-yellow-800 border border-yellow-300' : 'bg-gray-200 text-gray-800 border border-gray-300';
                                        } else if (category.name === 'package') {
                                            const pkg = packageDetails[parseInt(option.value) as keyof typeof packageDetails];
                                            if (pkg) {
                                                buttonClasses += `${pkg.color} border ${pkg.borderColor}`;
                                            }
                                        } else {
                                            buttonClasses += 'bg-yellow-100 text-yellow-800 border border-yellow-300';
                                        }
                                    } else {
                                        buttonClasses += 'bg-gray-100 text-gray-700 hover:bg-gray-200';
                                    }

                                    return (
                                        <button key={option.value} onClick={() => toggleFilter(category.name, option.value)} className={buttonClasses}>
                                            {option.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}

                    <div className="mt-4 pt-2 border-t border-gray-100">
                        <button onClick={() => setFilterDropdownOpen(false)} className="w-full px-3 py-2 bg-yellow-400 text-gray-800 rounded-md text-xs font-medium hover:bg-yellow-500">
                            Apply Filters
                        </button>
                    </div>
                </div>
            )}
        </div>
    );

    // Main component render
    return (
        <div className="container mx-auto p-4 font-sans">
            {/* Toast notifications container */}
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

            <div className="bg-gradient-to-b from-yellow-50 to-white p-6 rounded-lg shadow-md mb-6">
                <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-3 md:mb-0">Matrimony Profiles</h1>

                    <div className="flex items-center space-x-3">
                        <button
                            onClick={refreshData}
                            className="flex items-center text-sm px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 transition-colors"
                            disabled={isLoading}
                        >
                            <RefreshCw size={16} className={`mr-2 ${isLoading ? 'animate-spin text-yellow-600' : 'text-gray-600'}`} />
                            Refresh
                        </button>

                        {/* Sort dropdown */}
                        {renderSortDropdown()}

                        <span className="text-sm text-gray-500 bg-white px-3 py-2 rounded-md border border-gray-200">
                            {sortedProfiles.length} {sortedProfiles.length === 1 ? 'profile' : 'profiles'} found
                        </span>
                    </div>
                </div>

                {/* Search and filter */}
                <div className="mb-6">
                    <div className="flex flex-col md:flex-row gap-3">
                        <div className="relative flex-grow">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search size={18} className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search profiles by name, gender, profession, country..."
                                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                                value={searchFilter}
                                onChange={(e) => {
                                    setSearchFilter(e.target.value);
                                    setCurrentPage(1); // Reset to first page when search changes
                                }}
                            />
                            {searchFilter && (
                                <button className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600" onClick={() => setSearchFilter('')}>
                                    <X size={18} />
                                </button>
                            )}
                        </div>

                        {/* Advanced Filters Button */}
                        {renderAdvancedFilterDropdown()}

                        {/* Quick filters - Country dropdown */}
                        {filterOptions.countries.length > 0 && (
                            <div className="relative">
                                <select
                                    className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent cursor-pointer"
                                    onChange={(e) => e.target.value && handleQuickFilterSelect('country', e.target.value)}
                                    value=""
                                >
                                    <option value="">Filter by country</option>
                                    {filterOptions.countries.map((country) => (
                                        <option key={country} value={country}>
                                            {country}
                                        </option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <ChevronDown size={16} />
                                </div>
                            </div>
                        )}

                        {/* Quick filters - Religion dropdown */}
                        {filterOptions.religions.length > 0 && (
                            <div className="relative">
                                <select
                                    className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent cursor-pointer"
                                    onChange={(e) => e.target.value && handleQuickFilterSelect('religion', e.target.value)}
                                    value=""
                                >
                                    <option value="">Filter by religion</option>
                                    {filterOptions.religions.map((religion) => (
                                        <option key={religion} value={religion}>
                                            {religion}
                                        </option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <ChevronDown size={16} />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Active filters display */}
                    {renderActiveFilters()}
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="flex justify-center items-center p-12">
                        <div className="flex flex-col items-center">
                            <Loader className="animate-spin text-yellow-500 h-8 w-8 mb-3" />
                            <span className="text-gray-600">Loading profiles...</span>
                        </div>
                    </div>
                )}

                {/* Main table */}
                {!isLoading && (
                    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleSort('display_name')}
                                    >
                                        <div className="flex items-center">Name {renderSortIcon('display_name')}</div>
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Package
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Gender
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleSort('profession')}
                                    >
                                        <div className="flex items-center">Profession {renderSortIcon('profession')}</div>
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleSort('country_of_residence')}
                                    >
                                        <div className="flex items-center">Country {renderSortIcon('country_of_residence')}</div>
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Featured
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {currentProfiles.map((profile) => (
                                    <tr
                                        key={profile.user_id}
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
                                                        <div className="h-10 w-10 rounded-full bg-yellow-200 flex items-center justify-center text-yellow-800 font-medium">
                                                            {profile.display_name?.charAt(0)}
                                                        </div>
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
                                                {renderPackageBadge(profile.package_number)}
                                                <button onClick={() => toggleDropdown(profile.user_id)} className="ml-2 text-gray-400 hover:text-gray-600">
                                                    <ChevronDown size={16} />
                                                </button>

                                                {/* Package dropdown */}
                                                {dropdownOpen[profile.user_id] && (
                                                    <div className="absolute z-10 mt-2 w-48 bg-white rounded-md shadow-lg">
                                                        <div className="py-1">
                                                            {Object.entries(packageDetails).map(([key, pkg]) => (
                                                                <button
                                                                    key={key}
                                                                    className={`flex items-center w-full px-4 py-2 text-sm text-left ${parseInt(key) === profile.package_number ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                                                                    onClick={() => handlePackageChange(profile, parseInt(key))}
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
                                                onClick={() => updateActiveStatus(profile.user_id, !profile.is_active)}
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
                                                onClick={() => updateBootPost(profile.user_id, !profile.boot_post)}
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
                                            <button onClick={() => handleViewProfile(profile)} className="text-yellow-600 hover:text-yellow-800 flex items-center">
                                                <Eye size={16} className="mr-1" /> View
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                                {currentProfiles.length === 0 && !isLoading && (
                                    <tr>
                                        <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                                            <div className="flex flex-col items-center">
                                                <Search size={24} className="text-gray-400 mb-2" />
                                                <p className="mb-2">No profiles found</p>
                                                {(searchFilter || getActiveFiltersCount() > 0) && (
                                                    <button onClick={clearAllFilters} className="text-yellow-600 hover:text-yellow-800 text-sm underline">
                                                        Clear all filters
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Pagination */}
                {!isLoading && !error && sortedProfiles.length > 0 && (
                    <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
                        <div className="text-sm text-gray-500 mb-4 sm:mb-0">
                            Showing {indexOfFirstProfile + 1} to {Math.min(indexOfLastProfile, sortedProfiles.length)} of {sortedProfiles.length} entries
                        </div>

                        <div className="flex space-x-1">
                            <button
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="px-3 py-1 border border-gray-300 rounded-md bg-white disabled:opacity-50 disabled:cursor-not-allowed text-sm hover:bg-gray-50 transition-colors"
                            >
                                Previous
                            </button>

                            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                                // Show: first page, last page, current page, and pages around current
                                const pageNumber = i + 1;
                                const isCurrentPage = currentPage === pageNumber;

                                return (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(pageNumber)}
                                        className={`px-3 py-1 border rounded-md text-sm
                      ${isCurrentPage ? 'bg-yellow-400 text-gray-800 border-yellow-400' : 'bg-white hover:bg-gray-50 border-gray-300'}`}
                                    >
                                        {pageNumber}
                                    </button>
                                );
                            })}

                            <button
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages || totalPages === 0}
                                className="px-3 py-1 border border-gray-300 rounded-md bg-white disabled:opacity-50 disabled:cursor-not-allowed text-sm hover:bg-gray-50 transition-colors"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Profile Detail Modal */}
            {showModal && selectedProfile && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-screen overflow-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6 border-b pb-4">
                                <div className="flex items-center">
                                    <h2 className="text-2xl font-semibold text-gray-800 mr-3">{selectedProfile.display_name}</h2>
                                    {renderPackageBadge(selectedProfile.package_number)}
                                    {selectedProfile.boot_post === 1 && (
                                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                            <Star size={12} className="mr-1 fill-yellow-500" /> Featured
                                        </span>
                                    )}
                                </div>
                                <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700 transition-colors">
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Profile photo if available */}
                                <div className="col-span-1 flex flex-col items-center">
                                    {selectedProfile.picture ? (
                                        <img src={selectedProfile.picture.image_path} alt={selectedProfile.display_name} className="w-full max-w-xs rounded-lg shadow-md mb-4 object-cover" />
                                    ) : (
                                        <div className="w-64 h-64 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                                            <span className="text-6xl font-light text-yellow-600">{selectedProfile.display_name?.charAt(0)}</span>
                                        </div>
                                    )}

                                    <div className="w-full max-w-xs space-y-4">
                                        <div className="bg-yellow-50 p-4 rounded-lg">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Contact Information</h3>
                                            <div className="flex flex-col space-y-2">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-600">Email:</span>
                                                    <span>{selectedProfile.email}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Profile status controls */}
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-3">Profile Status</h3>
                                            <div className="space-y-3">
                                                <div>
                                                    <p className="text-sm text-gray-600 mb-2">Membership Package:</p>
                                                    <div className="flex">
                                                        {Object.entries(packageDetails).map(([key, pkg]) => (
                                                            <button
                                                                key={key}
                                                                onClick={() => updatePackageNumber(selectedProfile.user_id, parseInt(key))}
                                                                disabled={isActionLoading[`package_${selectedProfile.user_id}`] || parseInt(key) === selectedProfile.package_number}
                                                                className={`flex-1 py-2 text-xs font-medium rounded-md border ${
                                                                    parseInt(key) === selectedProfile.package_number
                                                                        ? `${pkg.color} border-${pkg.borderColor} font-bold`
                                                                        : 'bg-white border-gray-300 hover:bg-gray-50'
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
                                                        onClick={() => updateBootPost(selectedProfile.user_id, !selectedProfile.boot_post)}
                                                        disabled={isActionLoading[`boot_${selectedProfile.user_id}`]}
                                                        className={`w-full flex items-center justify-center px-4 py-2 border rounded-md ${
                                                            selectedProfile.boot_post === 1
                                                                ? 'bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-200'
                                                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                                        }`}
                                                    >
                                                        {isActionLoading[`boot_${selectedProfile.user_id}`] ? (
                                                            <Loader size={16} className="animate-spin mr-2" />
                                                        ) : (
                                                            <Star size={16} className={`mr-2 ${selectedProfile.boot_post === 1 ? 'fill-yellow-500' : ''}`} />
                                                        )}
                                                        {selectedProfile.boot_post === 1 ? 'Remove Featured Status' : 'Make Featured'}
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
                                                {selectedProfile.first_name} {selectedProfile.last_name}
                                            </div>

                                            <div className="text-sm text-gray-600">Gender:</div>
                                            <div className="text-sm">{selectedProfile.gender}</div>

                                            <div className="text-sm text-gray-600">Birth Date:</div>
                                            <div className="text-sm">{selectedProfile.birthdate}</div>

                                            <div className="text-sm text-gray-600">Civil Status:</div>
                                            <div className="text-sm">{selectedProfile.civil_status}</div>

                                            <div className="text-sm text-gray-600">Height:</div>
                                            <div className="text-sm">{selectedProfile.height || 'Not specified'}</div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Professional Details</h3>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="text-sm text-gray-600">Education:</div>
                                            <div className="text-sm">{selectedProfile.education_level}</div>

                                            <div className="text-sm text-gray-600">Profession:</div>
                                            <div className="text-sm">{selectedProfile.profession}</div>

                                            <div className="text-sm text-gray-600">Country:</div>
                                            <div className="text-sm">{selectedProfile.country_of_residence}</div>

                                            <div className="text-sm text-gray-600">City:</div>
                                            <div className="text-sm">{selectedProfile.city || 'Not specified'}</div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Lifestyle</h3>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="text-sm text-gray-600">Food Preference:</div>
                                            <div className="text-sm">{selectedProfile.food_preference || 'Not specified'}</div>

                                            <div className="text-sm text-gray-600">Smoking:</div>
                                            <div className="text-sm">{selectedProfile.smoking}</div>

                                            <div className="text-sm text-gray-600">Drinking:</div>
                                            <div className="text-sm">{selectedProfile.drinking}</div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Cultural Background</h3>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="text-sm text-gray-600">Religion:</div>
                                            <div className="text-sm">{selectedProfile.religion}</div>

                                            <div className="text-sm text-gray-600">Ethnicity:</div>
                                            <div className="text-sm">{selectedProfile.ethnicity}</div>

                                            <div className="text-sm text-gray-600">Caste:</div>
                                            <div className="text-sm">{selectedProfile.caste || 'Not specified'}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Horoscope details if available */}
                            {selectedProfile.horoscope && selectedProfile.horoscope.birthdate && (
                                <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Horoscope Details</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <div className="text-sm text-gray-600 mb-1">Birth Date:</div>
                                            <div className="text-sm">{selectedProfile.horoscope.birthdate}</div>
                                        </div>

                                        <div>
                                            <div className="text-sm text-gray-600 mb-1">Birth Country:</div>
                                            <div className="text-sm">{selectedProfile.horoscope.birth_country || 'Not specified'}</div>
                                        </div>

                                        <div>
                                            <div className="text-sm text-gray-600 mb-1">Birth City:</div>
                                            <div className="text-sm">{selectedProfile.horoscope.birth_city || 'Not specified'}</div>
                                        </div>

                                        <div>
                                            <div className="text-sm text-gray-600 mb-1">Birth Time:</div>
                                            <div className="text-sm">{selectedProfile.horoscope.birth_time || 'Not specified'}</div>
                                        </div>

                                        <div>
                                            <div className="text-sm text-gray-600 mb-1">Matching Required:</div>
                                            <div className="text-sm">{selectedProfile.horoscope.horoscope_matching_required ? 'Yes' : 'No'}</div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Family details if available */}
                            {(selectedProfile.father?.profession || selectedProfile.mother?.profession) && (
                                <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Family Details</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {selectedProfile.father && selectedProfile.father.profession && (
                                            <div>
                                                <h4 className="font-medium text-gray-800 mb-2">Father</h4>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="text-sm text-gray-600">Profession:</div>
                                                    <div className="text-sm">{selectedProfile.father.profession}</div>

                                                    {selectedProfile.father.religion && (
                                                        <>
                                                            <div className="text-sm text-gray-600">Religion:</div>
                                                            <div className="text-sm">{selectedProfile.father.religion}</div>
                                                        </>
                                                    )}

                                                    {selectedProfile.father.ethnicity && (
                                                        <>
                                                            <div className="text-sm text-gray-600">Ethnicity:</div>
                                                            <div className="text-sm">{selectedProfile.father.ethnicity}</div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {selectedProfile.mother && selectedProfile.mother.profession && (
                                            <div>
                                                <h4 className="font-medium text-gray-800 mb-2">Mother</h4>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="text-sm text-gray-600">Profession:</div>
                                                    <div className="text-sm">{selectedProfile.mother.profession}</div>

                                                    {selectedProfile.mother.religion && (
                                                        <>
                                                            <div className="text-sm text-gray-600">Religion:</div>
                                                            <div className="text-sm">{selectedProfile.mother.religion}</div>
                                                        </>
                                                    )}

                                                    {selectedProfile.mother.ethnicity && (
                                                        <>
                                                            <div className="text-sm text-gray-600">Ethnicity:</div>
                                                            <div className="text-sm">{selectedProfile.mother.ethnicity}</div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className="mt-6 border-t pt-4 text-sm text-gray-500 flex flex-col sm:flex-row sm:justify-between">
                                <div>Account created by: {selectedProfile.account_created_by}</div>
                                <div>Profile created on: {selectedProfile.created_at}</div>
                            </div>

                            <div className="mt-6 flex justify-end">
                                <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium rounded-md transition duration-300">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Package Details Modal */}
            {showPackageModal && packageModalProfile && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold text-gray-800">Membership Packages</h2>
                                <button onClick={() => setShowPackageModal(false)} className="text-gray-500 hover:text-gray-700">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="border-t border-gray-200 pt-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {Object.entries(packageDetails).map(([key, pkg]) => {
                                        const pkgNumber = parseInt(key);
                                        const isCurrentPackage = pkgNumber === packageModalProfile.package_number;

                                        return (
                                            <div key={key} className={`border rounded-lg overflow-hidden shadow-sm ${isCurrentPackage ? `${pkg.borderColor}` : 'border-gray-200'}`}>
                                                <div className={`p-4 ${pkg.color} border-b ${pkg.borderColor}`}>
                                                    <div className="flex justify-between items-center">
                                                        <h3 className="text-lg font-semibold">{pkg.name}</h3>
                                                        {isCurrentPackage && <span className="px-2 py-1 bg-white bg-opacity-50 rounded-full text-xs font-medium">Current</span>}
                                                    </div>
                                                </div>

                                                <div className="p-4">
                                                    <ul className="space-y-2">
                                                        {pkg.features.map((feature, index) => (
                                                            <li key={index} className="flex items-start">
                                                                <CheckCircle size={16} className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                                                                <span className="text-sm text-gray-700">{feature}</span>
                                                            </li>
                                                        ))}
                                                    </ul>

                                                    <div className="mt-6">
                                                        <button
                                                            onClick={() => {
                                                                updatePackageNumber(packageModalProfile.user_id, pkgNumber);
                                                            }}
                                                            disabled={isActionLoading[`package_${packageModalProfile.user_id}`] || isCurrentPackage}
                                                            className={`w-full py-2 rounded-md ${
                                                                isCurrentPackage ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : `bg-yellow-400 hover:bg-yellow-500 text-gray-800`
                                                            }`}
                                                        >
                                                            {isActionLoading[`package_${packageModalProfile.user_id}`] ? (
                                                                <span className="flex items-center justify-center">
                                                                    <Loader size={16} className="animate-spin mr-2" />
                                                                    Updating...
                                                                </span>
                                                            ) : isCurrentPackage ? (
                                                                'Current Package'
                                                            ) : (
                                                                'Select Package'
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-200 text-sm text-gray-500">
                                    <p className="flex items-center">
                                        <Zap size={16} className="mr-2 text-yellow-500" />
                                        Upgrading the package gives the profile more visibility and features.
                                    </p>
                                </div>

                                <div className="mt-6 flex justify-end">
                                    <button onClick={() => setShowPackageModal(false)} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md mr-2">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MatrimonyProfilesTable;
