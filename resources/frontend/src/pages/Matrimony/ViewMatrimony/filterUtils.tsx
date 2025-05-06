import { ReactNode } from 'react';
import { Calendar, MapPin, User, UserCheck, Heart, Briefcase, GraduationCap, Ruler, Coffee, Filter } from 'lucide-react';

export const getIconForFilter = (filterName: string): ReactNode => {
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
