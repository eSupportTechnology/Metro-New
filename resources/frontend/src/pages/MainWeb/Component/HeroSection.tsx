import { CheckCircle, ChevronRight, Heart, Search } from 'lucide-react';
import { useState } from 'react';

const HeroSection = () => {
    const [partnerType, setPartnerType] = useState<string | null>(null);

    return (
        <div>
            <section className="relative pt-16 md:pt-24 pb-16 md:pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/10 to-yellow-900/10 z-0"></div>
                <div className="absolute bottom-0 right-0 w-full h-full md:w-1/2 bg-yellow-50 z-0" style={{ clipPath: 'polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)' }}></div>

                <div className="absolute inset-0 z-0 opacity-30">
                    <img src="https://blissfulplans.com/wp-content/uploads/2023/08/Sri-lanka.webp" alt="Wedding Background" className="w-full h-full object-cover" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="w-full md:w-1/2 text-center md:text-left mb-12 md:mb-0">
                            <div className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium mb-6">Sri Lanka's #1 Matrimony Service</div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                                ශ්‍රී ලංකීය <span className="text-yellow-600">මංගල යෝජනා</span>
                            </h1>

                            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg mx-auto md:mx-0">
                                Join thousands who have found their perfect match on Sri Lanka's most trusted matrimony platform.
                            </p>

                            <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-2xl p-5 shadow-xl mb-8 max-w-sm mx-auto md:mx-0">
                                <h2 className="text-white text-lg text-center mb-4">I am Looking For a</h2>

                                <div className="flex justify-between gap-3">
                                    <div
                                        className={`flex-1 cursor-pointer transition-all duration-200 transform ${partnerType === 'groom' ? 'scale-105' : 'hover:scale-105'}`}
                                        onClick={() => setPartnerType('groom')}
                                    >
                                        <div className={`rounded-lg p-1 ${partnerType === 'groom' ? 'bg-yellow-500 ring-2 ring-white' : 'bg-yellow-500/80'}`}>
                                            <img src="/Images/groom.png" alt="Groom" className="w-full h-28 object-cover rounded" />
                                        </div>
                                        <p className="text-white text-center mt-2 font-medium">Groom</p>
                                    </div>

                                    <div
                                        className={`flex-1 cursor-pointer transition-all duration-200 transform ${partnerType === 'bride' ? 'scale-105' : 'hover:scale-105'}`}
                                        onClick={() => setPartnerType('bride')}
                                    >
                                        <div className={`rounded-lg p-1 ${partnerType === 'bride' ? 'bg-yellow-500 ring-2 ring-white' : 'bg-yellow-500/80'}`}>
                                            <img src="/Images/bride.png" alt="Bride" className="w-full h-28 object-cover rounded" />
                                        </div>
                                        <p className="text-white text-center mt-2 font-medium">Bride</p>
                                    </div>
                                </div>

                                {partnerType && (
                                    <div className="mt-4 animate-fade-in">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Quick search by location..."
                                                className="w-full py-2 px-4 pr-10 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                            />
                                            <Search className="absolute right-3 top-2 h-4 w-4 text-gray-400" />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
                                <a
                                    href="#register"
                                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-md font-medium transition duration-300 shadow-md flex items-center justify-center"
                                >
                                    <span>Register Free</span>
                                    <ChevronRight className="ml-1 h-5 w-5" />
                                </a>
                                <a
                                    href="#learn"
                                    className="border border-yellow-600 text-yellow-600 hover:bg-yellow-50 px-6 py-3 rounded-md font-medium transition duration-300 flex items-center justify-center"
                                >
                                    <span>Learn More</span>
                                </a>
                            </div>
                        </div>

                        <div className="w-full md:w-1/2">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/50 to-yellow-600/50 rounded-xl transform rotate-3 scale-105"></div>
                                <img
                                    src="https://blissfulplans.com/wp-content/uploads/2023/08/Sri-lanka.webp"
                                    alt="Silhouette Love Moment"
                                    className="rounded-xl shadow-2xl w-full max-w-lg mx-auto relative"
                                />
                                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-xl hidden md:flex">
                                    <div className="flex items-center">
                                        <div className="bg-yellow-100 p-2 rounded-full mr-3">
                                            <CheckCircle className="h-6 w-6 text-yellow-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-800">1000+ Marriages</p>
                                            <p className="text-sm text-gray-500">This Month</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute -top-4 -right-4 bg-white p-3 rounded-full shadow-xl hidden md:flex">
                                    <Heart className="h-6 w-6 text-yellow-600" fill="#ca8a04" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HeroSection;
