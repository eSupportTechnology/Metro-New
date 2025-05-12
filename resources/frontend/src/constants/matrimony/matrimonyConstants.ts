export const packageDetails = {
    1: {
        name: 'Basic',
        color: 'bg-gray-100 text-gray-700',
        borderColor: 'border-gray-300',
        features: ['Basic profile visibility', 'Limited profile views', 'Basic search filters', 'Standard support'],
    },
    2: {
        name: 'Premium',
        color: 'bg-blue-100 text-blue-800',
        borderColor: 'border-blue-300',
        features: ['Enhanced visibility', 'Unlimited profile views', 'Advanced search filters', 'Priority support', 'Profile boost once a month'],
    },
    3: {
        name: 'VIP',
        color: 'bg-purple-100 text-purple-800',
        borderColor: 'border-purple-300',
        features: ['Maximum visibility', 'Unlimited everything', 'All search filters', 'Dedicated support', 'Daily profile boost', 'Verified badge'],
    },
};

export const filterCategories = [
    {
        name: 'status',
        label: 'Status',
        options: [
            {
                value: 'active',
                label: 'Active',
                filter: (profile: any) => {
                    if (typeof profile.is_active === 'boolean') {
                        return profile.is_active === true;
                    }
                    if (typeof profile.is_active === 'string') {
                        return profile.is_active.toLowerCase() === 'true' || profile.is_active === '1';
                    }
                    if (typeof profile.is_active === 'number') {
                        return profile.is_active === 1;
                    }
                    return profile.is_active === undefined || profile.is_active !== 0;
                },
            },
            {
                value: 'inactive',
                label: 'Inactive',
                filter: (profile: any) => {
                    if (typeof profile.is_active === 'boolean') {
                        return profile.is_active === false;
                    }
                    if (typeof profile.is_active === 'string') {
                        return profile.is_active.toLowerCase() === 'false' || profile.is_active === '0';
                    }
                    if (typeof profile.is_active === 'number') {
                        return profile.is_active === 0;
                    }
                    return false;
                },
            },
        ],
    },
    {
        name: 'gender',
        label: 'Gender',
        options: [
            {
                value: 'male',
                label: 'Male',
                filter: (profile: any) => profile.gender?.toLowerCase() === 'male',
            },
            {
                value: 'female',
                label: 'Female',
                filter: (profile: any) => profile.gender?.toLowerCase() === 'female',
            },
        ],
    },
    {
        name: 'featured',
        label: 'Featured',
        options: [
            {
                value: 'featured',
                label: 'Featured',
                filter: (profile: any) => profile.boot_post === 1,
            },
            {
                value: 'regular',
                label: 'Regular',
                filter: (profile: any) => profile.boot_post !== 1,
            },
        ],
    },
    {
        name: 'package',
        label: 'Package',
        options: [
            {
                value: '1',
                label: 'Basic',
                filter: (profile: any) => profile.package_number === 1,
            },
            {
                value: '2',
                label: 'Premium',
                filter: (profile: any) => profile.package_number === 2,
            },
            {
                value: '3',
                label: 'VIP',
                filter: (profile: any) => profile.package_number === 3,
            },
        ],
    },
    {
        name: 'country',
        label: 'Country',
        dynamic: true,
        options: [],
    },
    {
        name: 'religion',
        label: 'Religion',
        dynamic: true,
        options: [],
    },
];

export const sortOptions = [
    { field: 'display_name', direction: 'asc' as const, label: 'Name (A-Z)' },
    { field: 'display_name', direction: 'desc' as const, label: 'Name (Z-A)' },
    { field: 'created_at', direction: 'desc' as const, label: 'Newest First' },
    { field: 'created_at', direction: 'asc' as const, label: 'Oldest First' },
    { field: 'birthdate', direction: 'desc' as const, label: 'Age (Youngest)' },
    { field: 'birthdate', direction: 'asc' as const, label: 'Age (Oldest)' },
    { field: 'profession', direction: 'asc' as const, label: 'Profession (A-Z)' },
    { field: 'country_of_residence', direction: 'asc' as const, label: 'Country (A-Z)' },
];

export const PROFILES_PER_PAGE = 10;
