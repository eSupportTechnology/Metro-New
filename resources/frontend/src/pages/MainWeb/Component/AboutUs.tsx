import React from 'react';
import { Heart, Target, Shield, Users, Award, CheckCircle, Star, Bookmark, Gift, TrendingUp, Eye, UserCheck, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../NavBar/Header';
import Footer from '../Footer/Footer';

const AboutUs: React.FC = () => {
    const navigate = useNavigate();

    const whatMakesUsDifferent = [
        {
            icon: Eye,
            title: 'Community-Specific Viewing Options',
            description: 'You can choose to view and be seen by members of your own community only, ensuring privacy and cultural compatibility.',
            color: 'blue',
        },
        {
            icon: Gift,
            title: 'Completely Free at Launch',
            description: 'We offer a 100% free platform at the beginning to help everyone connect without barriers.',
            color: 'green',
        },
        {
            icon: Globe,
            title: 'Sri Lankan-Focused',
            description: 'Built by Sri Lankans, for Sri Lankans. We understand your values, traditions, and expectations.',
            color: 'yellow',
        },
        {
            icon: UserCheck,
            title: 'Genuine Matches Only',
            description: 'We verify each profile before approval to maintain a safe and respectful environment.',
            color: 'purple',
        },
    ];

    const communities = [
        { name: 'Sinhala', color: 'bg-red-100 text-red-800' },
        { name: 'Tamil', color: 'bg-orange-100 text-orange-800' },
        { name: 'Muslim', color: 'bg-green-100 text-green-800' },
        { name: 'Burgher', color: 'bg-blue-100 text-blue-800' },
        { name: 'Others', color: 'bg-purple-100 text-purple-800' },
    ];

    return (
        <div className="font-sans bg-gradient-to-b from-yellow-50 to-white min-h-screen">
            <Header />

            <main className="pt-24 pb-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">About MyWeddingSL.com</h1>
                        <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-6">Sri Lanka's Trusted Matrimonial Platform for All Communities</p>
                        <p className="text-gray-600 max-w-4xl mx-auto">
                            At MyWeddingSL.com, we believe that marriage is a sacred bond built on love, trust, and shared values. Our mission is to bring together individuals and families from across
                            Sri Lanka who are searching for meaningful, lifelong relationships.
                        </p>
                    </div>

                    <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg shadow-md p-10 mb-16 text-white text-center">
                        <h2 className="text-2xl font-semibold mb-4">Proudly Inclusive</h2>
                        <p className="max-w-4xl mx-auto mb-6">
                            Unlike many other matrimonial websites that serve only specific ethnic or religious groups, MyWeddingSL.com is proudly inclusive. We offer a platform where people from all
                            communities can find partners who truly match their expectations and cultural preferences.
                        </p>
                        <div className="flex flex-wrap justify-center gap-3">
                            {communities.map((community, index) => (
                                <span key={index} className={`px-4 py-2 rounded-full text-sm font-medium ${community.color}`}>
                                    {community.name}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        <div className="bg-white rounded-lg shadow-md p-8 relative overflow-hidden">
                            <div className="absolute right-0 top-0 w-32 h-32 bg-yellow-100 rounded-bl-full opacity-70"></div>
                            <div className="relative">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                                    <Target className="mr-3 h-6 w-6 text-yellow-600" />
                                    Our Mission
                                </h2>
                                <p className="text-gray-600 mb-4">
                                    To create a trusted and inclusive matrimonial platform that connects individuals and families from all Sri Lankan communities, fostering meaningful and lasting
                                    relationships through transparency, cultural understanding, and user-focused innovation.
                                </p>
                                <p className="text-gray-600">We believe in bridging cultural gaps while giving each user the choice to search within their community if they wish.</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-8 relative overflow-hidden">
                            <div className="absolute right-0 top-0 w-32 h-32 bg-green-100 rounded-bl-full opacity-70"></div>
                            <div className="relative">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                                    <Bookmark className="mr-3 h-6 w-6 text-green-600" />
                                    Our Story
                                </h2>
                                <p className="text-gray-600 mb-4">
                                    MyWeddingSL.com was born out of a simple yet powerful realization - Sri Lanka needed a matrimonial platform that truly welcomes everyone, regardless of ethnicity or
                                    religion. Most existing sites focused on specific communities, leaving many people without a space to find a life partner who aligns with their values, culture, and
                                    dreams.
                                </p>
                                <p className="text-gray-600">
                                    What began as a small idea rooted in inclusivity and trust has now grown into a mission to help people across Sri Lanka find love and companionship. At
                                    MyWeddingSL.com, every love story matters - and we're honored to be part of yours.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-8 mb-16">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">What Makes Us Different?</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {whatMakesUsDifferent.map((item, index) => {
                                const Icon = item.icon;
                                const colorClasses = {
                                    blue: 'bg-blue-50 border-l-4 border-blue-400',
                                    green: 'bg-green-50 border-l-4 border-green-400',
                                    yellow: 'bg-yellow-50 border-l-4 border-yellow-400',
                                    purple: 'bg-purple-50 border-l-4 border-purple-400',
                                };
                                const iconColors = {
                                    blue: 'bg-blue-100 text-blue-600',
                                    green: 'bg-green-100 text-green-600',
                                    yellow: 'bg-yellow-100 text-yellow-600',
                                    purple: 'bg-purple-100 text-purple-600',
                                };

                                return (
                                    <div key={index} className={`p-6 rounded-md ${colorClasses[item.color as keyof typeof colorClasses]}`}>
                                        <div className="flex items-start mb-4">
                                            <div className={`p-3 rounded-md mr-4 ${iconColors[item.color as keyof typeof iconColors]}`}>
                                                <Icon className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-800 mb-2">{item.title}</h3>
                                                <p className="text-sm text-gray-600">{item.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-8 mb-16">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">Our Commitment</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="p-4 rounded-md bg-red-50 border-l-4 border-red-400">
                                <div className="flex items-center mb-3">
                                    <div className="bg-red-100 p-2 rounded-md mr-3">
                                        <Heart className="h-6 w-6 text-red-600" />
                                    </div>
                                    <h3 className="font-medium text-gray-800">Honesty & Respect</h3>
                                </div>
                                <p className="text-sm text-gray-600">To maintain honesty, privacy, and respect in every connection.</p>
                            </div>

                            <div className="p-4 rounded-md bg-blue-50 border-l-4 border-blue-400">
                                <div className="flex items-center mb-3">
                                    <div className="bg-blue-100 p-2 rounded-md mr-3">
                                        <Users className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <h3 className="font-medium text-gray-800">Customer Support</h3>
                                </div>
                                <p className="text-sm text-gray-600">To provide friendly and helpful customer support to guide you through the process.</p>
                            </div>

                            <div className="p-4 rounded-md bg-green-50 border-l-4 border-green-400">
                                <div className="flex items-center mb-3">
                                    <div className="bg-green-100 p-2 rounded-md mr-3">
                                        <TrendingUp className="h-6 w-6 text-green-600" />
                                    </div>
                                    <h3 className="font-medium text-gray-800">Continuous Improvement</h3>
                                </div>
                                <p className="text-sm text-gray-600">To continuously improve based on your feedback and needs.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-8 mb-16">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">Our Core Values</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="p-4 rounded-md bg-yellow-50 border-l-4 border-yellow-400">
                                <div className="flex items-center mb-3">
                                    <div className="bg-yellow-100 p-2 rounded-md mr-3">
                                        <Globe className="h-6 w-6 text-yellow-600" />
                                    </div>
                                    <h3 className="font-medium text-gray-800">Cultural Understanding</h3>
                                </div>
                                <p className="text-sm text-gray-600">We honor and understand Sri Lankan values, traditions, and expectations across all communities.</p>
                            </div>

                            <div className="p-4 rounded-md bg-purple-50 border-l-4 border-purple-400">
                                <div className="flex items-center mb-3">
                                    <div className="bg-purple-100 p-2 rounded-md mr-3">
                                        <Shield className="h-6 w-6 text-purple-600" />
                                    </div>
                                    <h3 className="font-medium text-gray-800">Safety & Verification</h3>
                                </div>
                                <p className="text-sm text-gray-600">Every profile is manually verified before approval to maintain a safe and respectful environment.</p>
                            </div>

                            <div className="p-4 rounded-md bg-indigo-50 border-l-4 border-indigo-400">
                                <div className="flex items-center mb-3">
                                    <div className="bg-indigo-100 p-2 rounded-md mr-3">
                                        <CheckCircle className="h-6 w-6 text-indigo-600" />
                                    </div>
                                    <h3 className="font-medium text-gray-800">Transparency</h3>
                                </div>
                                <p className="text-sm text-gray-600">We believe in clear communication and transparent processes throughout your journey.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-8 mb-16">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Why Choose MyWeddingSL.com?</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">For Everyone</h3>
                                <p className="text-gray-600 mb-4">
                                    Whether you are looking for love, a life partner, or someone who shares your dreams and values - MyWeddingSL.com is here to help. We welcome individuals from all
                                    walks of life and backgrounds.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Privacy Matters</h3>
                                <p className="text-gray-600 mb-4">
                                    With our community-specific viewing options, you have complete control over who can see your profile, ensuring your privacy while maintaining cultural
                                    compatibility.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg shadow-md p-10 text-center text-white">
                        <h2 className="text-2xl font-semibold mb-4">Let's Begin Your Journey</h2>
                        <p className="max-w-3xl mx-auto mb-6">
                            We invite you to join our growing community and take the first step towards a beautiful future together. Start your journey to find meaningful connections that honor your
                            values and cultural preferences.
                        </p>
                        <p className="max-w-2xl mx-auto mb-8 text-sm opacity-90">At MyWeddingSL.com, every love story matters - and we're honored to be part of yours.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button onClick={() => navigate('/register')} className="bg-white text-yellow-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-md transition duration-300">
                                Join Free Today
                            </button>
                            <button
                                onClick={() => navigate('/contact')}
                                className="bg-transparent border border-white text-white hover:bg-white/10 font-medium py-3 px-8 rounded-md transition duration-300"
                            >
                                Contact Us
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default AboutUs;
