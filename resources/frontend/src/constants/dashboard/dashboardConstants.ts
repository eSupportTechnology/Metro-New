export const DASHBOARD_CONSTANTS = {
    AUTO_REFRESH_INTERVAL: 5 * 60 * 1000,

    CHART_COLORS: {
        PRIMARY: '#F59E0B',
        SECONDARY: '#3B82F6',
        SUCCESS: '#10B981',
        DANGER: '#EF4444',
        WARNING: '#F59E0B',
        INFO: '#6366F1',
        LIGHT: '#F3F4F6',
        DARK: '#1F2937',
    },

    CHART_HEIGHT: 300,
    PIE_CHART_RADIUS: 80,

    ANIMATION_DURATION: 300,

    DATE_FORMATS: {
        DISPLAY: 'MMM DD, YYYY',
        API: 'YYYY-MM-DD',
        DATETIME: 'MMM DD, YYYY HH:mm',
    },
};

export const DASHBOARD_METRICS = {
    CARDS: [
        {
            key: 'users',
            title: 'Total Users',
            icon: 'Users',
            color: 'blue',
            borderColor: 'border-blue-500',
        },
        {
            key: 'profiles',
            title: 'Matrimony Profiles',
            icon: 'Heart',
            color: 'pink',
            borderColor: 'border-pink-500',
        },
        {
            key: 'verified',
            title: 'NIC Verified',
            icon: 'Shield',
            color: 'green',
            borderColor: 'border-green-500',
        },
        {
            key: 'blogs',
            title: 'Blog Posts',
            icon: 'BookOpen',
            color: 'purple',
            borderColor: 'border-purple-500',
        },
    ],

    STATUS_CARDS: [
        {
            key: 'active',
            title: 'Active Profiles',
            icon: 'UserCheck',
            color: 'text-green-600',
            iconColor: 'text-green-500',
        },
        {
            key: 'inactive',
            title: 'Inactive Profiles',
            icon: 'UserX',
            color: 'text-red-600',
            iconColor: 'text-red-500',
        },
        {
            key: 'pending',
            title: 'Pending NIC',
            icon: 'Clock',
            color: 'text-yellow-600',
            iconColor: 'text-yellow-500',
        },
    ],
};

export const ERROR_MESSAGES = {
    FETCH_DASHBOARD: 'Failed to fetch dashboard data',
    FETCH_MONTHLY: 'Failed to fetch monthly statistics',
    NETWORK_ERROR: 'Network error. Please check your connection.',
    UNAUTHORIZED: 'Unauthorized access. Please login again.',
    SERVER_ERROR: 'Server error. Please try again later.',
};

export const SUCCESS_MESSAGES = {
    REFRESH_SUCCESS: 'Dashboard data refreshed successfully',
    DATA_UPDATED: 'Data updated successfully',
};
