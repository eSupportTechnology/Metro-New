import { ChevronRight, Heart } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import b1 from '../../../assets/Image/B1.jpeg';
import b2 from '../../../assets/Image/B2.jpeg';
import b3 from '../../../assets/Image/B3.jpeg';
import g1 from '../../../assets/Image/G1.jpeg';
import g2 from '../../../assets/Image/G2.jpeg';
import g3 from '../../../assets/Image/G3.jpeg';

const Profile = () => {
    const [activeTab, setActiveTab] = useState('all');

    const profileData = useMemo(() => {
        return Array.from({ length: 8 }, (_, index) => {
            const isMale = Math.random() > 0.5;
            const genderImages = isMale ? [b1, b2, b3] : [g1, g2, g3];
            const randomImage = genderImages[Math.floor(Math.random() * genderImages.length)];
            const age = Math.floor(Math.random() * 15) + 24;
            const heightFeet = isMale ? 5 + Math.floor(Math.random() * 2) : 5;
            const heightInches = Math.floor(Math.random() * 12);
            const height = `${heightFeet}'${heightInches}"`;
            const religions = ['Buddhist', 'Hindu', 'Christian', 'Catholic'];
            const religion = religions[Math.floor(Math.random() * religions.length)];
            const professions = isMale ? ['Software Engineer', 'Doctor', 'Business Analyst', 'Bank Manager'] : ['Teacher', 'Software Engineer', 'Doctor', 'Accountant'];
            const profession = professions[Math.floor(Math.random() * professions.length)];
            const cities = ['Colombo', 'Kandy', 'Galle', 'Negombo'];
            const city = cities[Math.floor(Math.random() * cities.length)];
            const isPremium = Math.random() > 0.7;
            const isOnline = Math.random() > 0.75;

            return {
                id: 1000 + index,
                image: randomImage,
                age,
                height,
                religion,
                profession,
                city,
                isPremium,
                isOnline,
            };
        });
    }, []);

    const filteredProfiles = useMemo(() => {
        if (activeTab === 'all') return profileData;
        if (activeTab === 'premium') return profileData.filter((profile) => profile.isPremium);
        if (activeTab === 'featured') return profileData.filter((_, index) => index % 2 === 0);
        if (activeTab === 'new') return profileData.filter((_, index) => index > 3);
        return profileData;
    }, [activeTab, profileData]);

    return (
        <div>
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
                                    type="button"
                                    onClick={() => setActiveTab(tab)}
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
                        {filteredProfiles.map((profile) => (
                            <div key={profile.id} className="rounded-lg shadow-md bg-white border border-gray-100 overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1">
                                <div className="relative bg-gray-100 w-full" style={{ height: '280px' }}>
                                    <div className="w-full h-full flex items-center justify-center overflow-hidden">
                                        <img src={profile.image} alt={`Profile ${profile.id}`} className="w-full h-full object-contain" />
                                    </div>

                                    <div className="absolute top-0 left-0 right-0 p-2 flex justify-between">
                                        {profile.isOnline && (
                                            <div className="flex items-center gap-1 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-md">
                                                <div className="h-1.5 w-1.5 bg-white rounded-full animate-pulse"></div>
                                                Online
                                            </div>
                                        )}
                                        {!profile.isOnline && <div></div>}

                                        {profile.isPremium && <div className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-md">Premium</div>}
                                    </div>
                                </div>

                                <div className="p-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="font-medium text-gray-900">Profile ID: SL{profile.id}</h3>
                                        <Heart className="h-5 w-5 text-gray-400 hover:text-red-500 cursor-pointer transition-colors duration-200" />
                                    </div>
                                    <p className="text-sm text-gray-600 mb-2">
                                        {profile.age} yrs, {profile.height}, {profile.religion}
                                    </p>
                                    <p className="text-sm text-gray-600 mb-3">
                                        {profile.profession}, {profile.city}
                                    </p>
                                    <Link to={`/profile/${profile.id}`} className="text-yellow-600 text-sm font-medium hover:text-yellow-700 flex items-center">
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
        </div>
    );
};

export default Profile;
