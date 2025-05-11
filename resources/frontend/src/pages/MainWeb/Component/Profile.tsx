import { ChevronRight, Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiConfig from '../../../utilities/apiConfig';

const Profile = () => {
    const [activeTab, setActiveTab] = useState<'all' | 'featured' | 'new' | 'premium'>('all');
    const [profiles, setProfiles] = useState<any>({
        random_profiles: [],
        boot_post_profiles: [],
        latest_profiles: [],
        package_3_profiles: [],
    });

    useEffect(() => {
        fetch(apiConfig.endpoints.homepageProfiles)
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 'success') {
                    setProfiles(data.data);
                }
            })
            .catch((error) => console.error('Error fetching homepage profiles:', error));
    }, []);

    const getFilteredProfiles = () => {
        switch (activeTab) {
            case 'featured':
                return profiles.boot_post_profiles || [];
            case 'new':
                return profiles.latest_profiles || [];
            case 'premium':
                return profiles.package_3_profiles || [];
            default:
                return profiles.random_profiles || [];
        }
    };

    const filteredProfiles = getFilteredProfiles();

    return (
        <section className="py-12 md:py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-900">
                        Top Live <span className="text-yellow-600">Profiles</span>
                    </h2>
                    <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">Browse through our most active and recently updated profiles</p>
                </div>

                <div className="flex justify-center mb-8">
                    <div className="inline-flex rounded-md shadow-sm" role="group">
                        {['all', 'featured', 'new', 'premium'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab as any)}
                                className={`px-4 py-2 text-sm font-medium ${activeTab === tab ? 'bg-yellow-600 text-white' : 'bg-white text-gray-700 hover:bg-yellow-50'} ${
                                    tab === 'all' ? 'rounded-l-lg' : ''
                                } ${tab === 'premium' ? 'rounded-r-lg' : ''} border border-yellow-300`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProfiles.map((profile: any) => (
                        <div key={profile.user_id} className="rounded-lg shadow-md bg-white border border-gray-100 overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1">
                            <div className="relative bg-gray-100 w-full" style={{ height: '280px' }}>
                                <div className="w-full h-full flex items-center justify-center overflow-hidden">
                                    <img src={profile.profile_picture} alt={`Profile ${profile.user_id}`} className="w-full h-full object-cover" />
                                </div>
                                <div className="absolute top-0 left-0 right-0 p-2 flex justify-between">
                                    {profile.is_active && (
                                        <div className="flex items-center gap-1 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-md">
                                            <div className="h-1.5 w-1.5 bg-white rounded-full animate-pulse"></div>
                                            Online
                                        </div>
                                    )}
                                    {profile.matrimony?.package_number === 3 && <div className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-md">Premium</div>}
                                </div>
                            </div>

                            <div className="p-4">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-medium text-gray-900">Profile ID: SL{profile.user_id}</h3>
                                    <Heart className="h-5 w-5 text-gray-400 hover:text-red-500 cursor-pointer transition-colors duration-200" />
                                </div>
                                <p className="text-sm text-gray-600 mb-2">
                                    {profile.matrimony?.birthdate?.split('-')[0] ? `${new Date().getFullYear() - parseInt(profile.matrimony.birthdate.split('-')[0])} yrs` : ''},
                                    {` ${profile.matrimony?.height || ''}, ${profile.matrimony?.religion || ''}`}
                                </p>
                                <p className="text-sm text-gray-600 mb-3">
                                    {profile.matrimony?.profession}, {profile.matrimony?.city}
                                </p>
                                <Link to={`/profile/${profile.user_id}`} className="text-yellow-600 text-sm font-medium hover:text-yellow-700 flex items-center">
                                    View Profile
                                    <ChevronRight className="h-4 w-4 ml-1" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-10">
                    <Link to="/view-add" className="inline-flex items-center px-5 py-3 border border-yellow-600 text-yellow-600 font-medium rounded-md hover:bg-yellow-50 transition">
                        View More Profiles
                        <ChevronRight className="ml-2 h-5 w-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Profile;
