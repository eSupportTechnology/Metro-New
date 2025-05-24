import { format, formatDistanceToNow } from 'date-fns';

export const formatLogDate = (dateString: string): string => {
    try {
        const date = new Date(dateString);
        return format(date, 'MMM dd, yyyy HH:mm');
    } catch {
        return dateString;
    }
};

export const formatLogDateRelative = (dateString: string): string => {
    try {
        const date = new Date(dateString);
        return formatDistanceToNow(date, { addSuffix: true });
    } catch {
        return dateString;
    }
};

export const getActionTypeFromDescription = (description: string): string => {
    const desc = description.toLowerCase();

    if (desc.includes('boot_post set to 1') || desc.includes('boosted') || desc.includes('boost')) {
        return 'Profile Boosted';
    }
    if (desc.includes('boot_post set to 0') || desc.includes('unboosted')) {
        return 'Boost Removed';
    }
    if (desc.includes('deactivated automatically') || desc.includes('auto deactivat')) {
        return 'Auto Deactivation';
    }
    if (desc.includes('deactivated')) {
        return 'Manual Deactivation';
    }
    if (desc.includes('activated')) {
        return 'Activation';
    }
    if (desc.includes('package') && (desc.includes('updated') || desc.includes('changed'))) {
        return 'Package Update';
    }
    if (desc.includes('package') && desc.includes('expir')) {
        return 'Package Expired';
    }
    if (desc.includes('created')) {
        return 'Profile Created';
    }
    if (desc.includes('updated') || desc.includes('modified')) {
        return 'Profile Updated';
    }
    if (desc.includes('deleted') || desc.includes('removed')) {
        return 'Profile Deleted';
    }
    if (desc.includes('verified')) {
        return 'Verification';
    }
    if (desc.includes('suspended') || desc.includes('banned')) {
        return 'Account Suspended';
    }
    if (desc.includes('login') || desc.includes('sign in')) {
        return 'Login Activity';
    }

    return 'Other Activity';
};

export const getActionColor = (description: string): string => {
    const actionType = getActionTypeFromDescription(description);

    switch (actionType) {
        case 'Profile Created':
            return 'bg-green-100 text-green-800 border border-green-200';
        case 'Profile Updated':
            return 'bg-blue-100 text-blue-800 border border-blue-200';
        case 'Activation':
            return 'bg-emerald-100 text-emerald-800 border border-emerald-200';
        case 'Manual Deactivation':
            return 'bg-red-100 text-red-800 border border-red-200';
        case 'Auto Deactivation':
            return 'bg-orange-100 text-orange-800 border border-orange-200';
        case 'Profile Boosted':
            return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
        case 'Boost Removed':
            return 'bg-gray-100 text-gray-800 border border-gray-200';
        case 'Package Update':
            return 'bg-purple-100 text-purple-800 border border-purple-200';
        case 'Package Expired':
            return 'bg-red-100 text-red-700 border border-red-200';
        case 'Profile Deleted':
            return 'bg-red-100 text-red-900 border border-red-200';
        case 'Verification':
            return 'bg-teal-100 text-teal-800 border border-teal-200';
        case 'Account Suspended':
            return 'bg-red-200 text-red-900 border border-red-300';
        case 'Login Activity':
            return 'bg-indigo-100 text-indigo-800 border border-indigo-200';
        default:
            return 'bg-gray-100 text-gray-700 border border-gray-200';
    }
};

export const getActionIcon = (description: string): string => {
    const actionType = getActionTypeFromDescription(description);

    switch (actionType) {
        case 'Profile Created':
            return '✨';
        case 'Profile Updated':
            return '📝';
        case 'Activation':
            return '✅';
        case 'Manual Deactivation':
        case 'Auto Deactivation':
            return '❌';
        case 'Profile Boosted':
            return '🚀';
        case 'Boost Removed':
            return '📉';
        case 'Package Update':
            return '📦';
        case 'Package Expired':
            return '⏰';
        case 'Profile Deleted':
            return '🗑️';
        case 'Verification':
            return '🔍';
        case 'Account Suspended':
            return '🚫';
        case 'Login Activity':
            return '🔐';
        default:
            return '📋';
    }
};

export const formatDateForInput = (dateString: string): string => {
    try {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    } catch {
        return '';
    }
};

export const getTodayDateString = (): string => {
    return new Date().toISOString().split('T')[0];
};

export const getWeekAgoDateString = (): string => {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    return date.toISOString().split('T')[0];
};

export const getMonthAgoDateString = (): string => {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    return date.toISOString().split('T')[0];
};

export const extractPackageInfo = (description: string): { packageNumber?: string; action?: string } => {
    const packageMatch = description.match(/package (\d+)/i);
    const packageNumber = packageMatch ? packageMatch[1] : undefined;

    let action = 'unknown';
    if (description.includes('expir')) action = 'expired';
    if (description.includes('updat') || description.includes('chang')) action = 'updated';
    if (description.includes('boost')) action = 'boosted';

    return { packageNumber, action };
};

export const getActionSeverity = (description: string): 'low' | 'medium' | 'high' | 'critical' => {
    const actionType = getActionTypeFromDescription(description);

    switch (actionType) {
        case 'Account Suspended':
        case 'Profile Deleted':
            return 'critical';
        case 'Manual Deactivation':
        case 'Package Expired':
            return 'high';
        case 'Auto Deactivation':
        case 'Boost Removed':
            return 'medium';
        case 'Login Activity':
        case 'Profile Updated':
        case 'Package Update':
            return 'low';
        default:
            return 'medium';
    }
};
