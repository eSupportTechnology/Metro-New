import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { MatrimonyProfile, FilterOptions } from '../../utilities/types/Matrimony/IAdminMatrimonyView';
import matrimonyService from '../../services/matrimony/matrimonyService';

export const useMatrimonyProfiles = () => {
    const [profiles, setProfiles] = useState<MatrimonyProfile[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [totalResults, setTotalResults] = useState<number>(0);
    const [filterOptions, setFilterOptions] = useState<FilterOptions>({
        countries: [],
        religions: [],
        educations: [],
        genders: [],
    });

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

    const fetchProfiles = async () => {
        setIsLoading(true);
        setError('');
        try {
            const formattedProfiles = await matrimonyService.fetchProfiles();
            setProfiles(formattedProfiles);
            setTotalResults(formattedProfiles.length);
            generateFilterOptions(formattedProfiles);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch profiles';
            setError(errorMessage);
            toast.error('Failed to load profiles');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProfiles();
    }, []);

    return {
        profiles,
        setProfiles,
        isLoading,
        error,
        totalResults,
        filterOptions,
        fetchProfiles,
    };
};
