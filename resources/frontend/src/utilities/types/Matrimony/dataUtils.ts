export const calculateAge = (birthdate: string): number => {
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

export const formatRelativeTime = (dateString: string): string => {
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

export const formatDate = (dateString: string, format: string = 'MM/DD/YYYY'): string => {
    if (!dateString) return '';

    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
        return '';
    }

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    let formattedDate = format;
    formattedDate = formattedDate.replace('DD', day);
    formattedDate = formattedDate.replace('MM', month);
    formattedDate = formattedDate.replace('YYYY', year.toString());

    return formattedDate;
};

export const getCountryFlag = (country: string): string => {
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
