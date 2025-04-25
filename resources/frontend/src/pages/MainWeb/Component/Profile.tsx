import { ChevronRight, Heart } from 'lucide-react';
import { useState } from 'react';

const Profile = () => {
    const [activeTab, setActiveTab] = useState('all');

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
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                            <div key={item} className="rounded-lg shadow-md bg-white border border-gray-100 overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1">
                                <div className="relative h-48 bg-gray-200">
                                    <img src="/api/placeholder/300/250" alt="Profile" className="w-full h-full object-cover" />
                                    {item % 3 === 0 && <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-medium">Premium</div>}
                                    {item % 4 === 0 && (
                                        <div className="absolute top-2 left-2 flex items-center gap-1 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                                            <div className="h-1.5 w-1.5 bg-white rounded-full"></div>
                                            Online
                                        </div>
                                    )}
                                </div>
                                <div className="p-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="font-medium text-gray-900">Profile ID: SL{1000 + item}</h3>
                                        <Heart className="h-5 w-5 text-gray-400 hover:text-yellow-600 cursor-pointer" />
                                    </div>
                                    <p className="text-sm text-gray-600 mb-2">27 yrs, 5'6", Buddhist</p>
                                    <p className="text-sm text-gray-600 mb-3">Software Engineer, Colombo</p>
                                    <a href="#" className="text-yellow-600 text-sm font-medium hover:text-yellow-700">
                                        View Profile
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-10">
                        <a href="#" className="inline-flex items-center px-5 py-3 border border-yellow-600 text-yellow-600 font-medium rounded-md hover:bg-yellow-50 transition">
                            View More Profiles
                            <ChevronRight className="ml-2 h-5 w-5" />
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Profile;
