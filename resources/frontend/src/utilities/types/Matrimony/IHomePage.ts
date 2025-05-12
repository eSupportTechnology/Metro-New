export interface MatrimonyInfo {
    birthdate?: string;
    height?: string;
    religion?: string;
    profession?: string;
    city?: string;
}

export interface HomeProfile {
    user_id: string;
    display_name: string;
    gender: string;
    city: string;
    country: string;
    package_number: number;
    boot_post: number;
    created_at: string;
    profile_picture: string | null;
    name: string;
    is_active?: boolean;
    matrimony?: MatrimonyInfo;
}

export interface ProfilesData {
    random_profiles: HomeProfile[];
    boot_post_profiles: HomeProfile[];
    latest_profiles: HomeProfile[];
    package_3_profiles: HomeProfile[];
}

export interface ApiResponse {
    status: string;
    message: string;
    data: ProfilesData;
}

export const calculateAge = (birthdate?: string): string => {
    if (!birthdate) return '';
    const year = birthdate.split('-')[0];
    if (!year) return '';
    return `${new Date().getFullYear() - parseInt(year)} yrs`;
};

export const getAvatarColor = (userId: string): string => {
    const colors = [
        'bg-blue-600',
        'bg-indigo-600',
        'bg-purple-600',
        'bg-pink-600',
        'bg-rose-600',
        'bg-red-600',
        'bg-orange-600',
        'bg-amber-600',
        'bg-yellow-600',
        'bg-lime-600',
        'bg-green-600',
        'bg-emerald-600',
        'bg-teal-600',
        'bg-cyan-600',
        'bg-sky-600',
    ];
    const sum = userId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[sum % colors.length];
};
