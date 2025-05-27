import { CheckCircle, ChevronRight, Heart, Users, Star } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import groomImage from '../../../assets/Image/Groom.svg';
import brideImage from '../../../assets/Image/Bride.svg';
import heroImage from '../../../assets/Image/hero.jpg';

const HeroSection = () => {
    const [partnerType, setPartnerType] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleNavigation = (partner: string) => {
        setPartnerType(partner);
        navigate(`/view-add?partner=${partner}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f59e0b' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                ></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-100 to-amber-100 border border-yellow-200 rounded-full text-yellow-800 text-sm font-medium mb-8 shadow-lg">
                        <Star className="h-4 w-4 mr-2 fill-current" />
                        Sri Lanka's #1 Matrimony Service
                        <Star className="h-4 w-4 ml-2 fill-current" />
                    </div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                        My <span className="bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">WeddingSL</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">Welcome to MyWeddingSL.com - Sri Lanka's community-friendly matrimonial platform</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
                    <div className="order-2 lg:order-1">
                        <div className="bg-white rounded-3xl shadow-2xl p-8 backdrop-blur-sm border border-yellow-100">
                            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Find Your Perfect Match</h2>

                            <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-2xl p-6 shadow-xl mb-8">
                                <h3 className="text-white text-xl text-center mb-6 font-semibold">I am Looking For a</h3>

                                <div className="grid grid-cols-2 gap-6">
                                    <div
                                        className={`cursor-pointer transition-all duration-300 transform group ${partnerType === 'groom' ? 'scale-105' : 'hover:scale-105'}`}
                                        onClick={() => handleNavigation('groom')}
                                    >
                                        <div
                                            className={`rounded-xl p-3 transition-all duration-300 ${
                                                partnerType === 'groom' ? 'bg-yellow-500 ring-4 ring-white shadow-lg' : 'bg-yellow-500/80 group-hover:bg-yellow-500 group-hover:shadow-lg'
                                            }`}
                                        >
                                            <img src={groomImage} alt="Groom" className="w-full h-32 object-cover rounded-lg" />
                                        </div>
                                        <p className="text-white text-center mt-3 font-semibold text-lg">Groom</p>
                                    </div>

                                    <div
                                        className={`cursor-pointer transition-all duration-300 transform group ${partnerType === 'bride' ? 'scale-105' : 'hover:scale-105'}`}
                                        onClick={() => handleNavigation('bride')}
                                    >
                                        <div
                                            className={`rounded-xl p-3 transition-all duration-300 ${
                                                partnerType === 'bride' ? 'bg-yellow-500 ring-4 ring-white shadow-lg' : 'bg-yellow-500/80 group-hover:bg-yellow-500 group-hover:shadow-lg'
                                            }`}
                                        >
                                            <img src={brideImage} alt="Bride" className="w-full h-32 object-cover rounded-lg" />
                                        </div>
                                        <p className="text-white text-center mt-3 font-semibold text-lg">Bride</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    to="/signin"
                                    className="flex-1 bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center group"
                                >
                                    <span>Register Free</span>
                                    <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link
                                    to="/about-us"
                                    className="flex-1 border-2 border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center"
                                >
                                    <span>Learn More</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="order-1 lg:order-2">
                        <div className="relative group">
                            <div className="absolute -inset-6 bg-gradient-to-r from-yellow-600/20 to-amber-600/20 rounded-3xl transform rotate-3 group-hover:rotate-6 transition-all duration-500"></div>
                            <div className="absolute -inset-3 bg-gradient-to-r from-amber-600/30 to-yellow-600/30 rounded-3xl transform -rotate-3 group-hover:-rotate-6 transition-all duration-500"></div>

                            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
                                <img src={heroImage} alt="Silhouette Love Moment" className="w-full h-96 lg:h-[500px] object-cover transition-transform duration-500 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                            </div>

                            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl animate-bounce">
                                <div className="flex items-center">
                                    <div className="bg-yellow-100 p-3 rounded-full mr-3">
                                        <CheckCircle className="h-6 w-6 text-yellow-600" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-800">1000+ Marriages</p>
                                        <p className="text-sm text-gray-500">This Month</p>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute -top-4 -right-4 bg-white p-3 rounded-full shadow-xl">
                                <Heart className="h-8 w-8 text-yellow-600" fill="#ca8a04" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-yellow-100">
                    <div className="flex flex-wrap justify-center lg:justify-around items-center gap-8">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-yellow-600 mb-2">50K+</div>
                            <div className="text-gray-600 font-medium">Active Members</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-yellow-600 mb-2">10K+</div>
                            <div className="text-gray-600 font-medium">Success Stories</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-yellow-600 mb-2">15+</div>
                            <div className="text-gray-600 font-medium">Years Experience</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-yellow-600 mb-2">100%</div>
                            <div className="text-gray-600 font-medium">Verified Profiles</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
