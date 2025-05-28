import React from 'react';
import { Heart, Target, Shield, Users, Award, CheckCircle, Star, Bookmark, Gift, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../NavBar/Header';
import Footer from '../Footer/Footer';

const AboutUs: React.FC = () => {
    const navigate = useNavigate();

    const teamMembers = [
        {
            name: 'Sarah Perera',
            position: 'Founder & CEO',
            image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
            bio: 'With over 15 years of experience in matchmaking, Sarah founded the company with a vision to help Sri Lankans find their perfect match.',
        },
        {
            name: 'Amal Fernando',
            position: 'Chief Technology Officer',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
            bio: 'Amal leads our technology team, ensuring a seamless and secure platform for all users.',
        },
        {
            name: 'Priya Mendis',
            position: 'Head of Matchmaking',
            image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
            bio: 'Priya and her team of matchmaking specialists have helped thousands of couples find their perfect match.',
        },
        {
            name: 'Ravi Jayawardena',
            position: 'Customer Success Manager',
            image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
            bio: 'Ravi ensures that all our members receive the support they need throughout their journey.',
        },
    ];
    const stats = [
        { label: 'Years of Service', value: '10+' },
        { label: 'Happy Couples', value: '10,000+' },
        { label: 'Success Rate', value: '87%' },
        { label: 'Verified Profiles', value: '100,000+' },
    ];

    return (
        <div className="font-sans bg-gradient-to-b from-yellow-50 to-white min-h-screen">
            <Header />

            <main className="pt-24 pb-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">About Our Matchmaking Service</h1>
                        <p className="text-gray-600 max-w-3xl mx-auto">
                            Founded in 2015, we've become Sri Lanka's premier matrimonial platform, connecting thousands of compatible individuals and creating lifelong partnerships.
                        </p>
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
                                    We are committed to helping Sri Lankans find meaningful, lasting relationships based on compatibility, shared values, and cultural understanding. Our mission is to
                                    create a safe, respectful, and effective platform that honors both tradition and modernity in the matchmaking process.
                                </p>
                                <p className="text-gray-600">
                                    We believe that finding the right life partner is one of life's most important decisions, and we're dedicated to making that journey smoother, safer, and more
                                    successful for our members.
                                </p>
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
                                    Our journey began in 2015 when our founder, Sarah Perera, recognized the need for a trusted, modern approach to matchmaking that respected Sri Lankan traditions
                                    while embracing technology.
                                </p>
                                <p className="text-gray-600">
                                    What started as a small community-based service in Colombo has grown into the country's leading matrimonial platform, with success stories spanning across Sri Lanka
                                    and its diaspora worldwide. Our commitment to authenticity, privacy, and personalized matching has remained at the heart of everything we do.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-8 mb-16">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">Our Core Values</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="p-4 rounded-md bg-yellow-50 border-l-4 border-yellow-400">
                                <div className="flex items-center mb-3">
                                    <div className="bg-yellow-100 p-2 rounded-md mr-3">
                                        <Shield className="h-6 w-6 text-yellow-600" />
                                    </div>
                                    <h3 className="font-medium text-gray-800">Respect for All Communities</h3>
                                </div>
                                <p className="text-sm text-gray-600">We honor cultural and religious diversity across Sri Lanka.</p>
                            </div>

                            <div className="p-4 rounded-md bg-green-50 border-l-4 border-green-400">
                                <div className="flex items-center mb-3">
                                    <div className="bg-green-100 p-2 rounded-md mr-3">
                                        <Heart className="h-6 w-6 text-green-600" />
                                    </div>
                                    <h3 className="font-medium text-gray-800">Authenticity & Trust</h3>
                                </div>
                                <p className="text-sm text-gray-600">We promote genuine connections through verified profiles and transparency.</p>
                            </div>

                            <div className="p-4 rounded-md bg-blue-50 border-l-4 border-blue-400">
                                <div className="flex items-center mb-3">
                                    <div className="bg-blue-100 p-2 rounded-md mr-3">
                                        <Users className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <h3 className="font-medium text-gray-800">Privacy & Security</h3>
                                </div>
                                <p className="text-sm text-gray-600">We safeguard user data and ensure a safe platform experience.</p>
                            </div>

                            <div className="p-4 rounded-md bg-purple-50 border-l-4 border-purple-400">
                                <div className="flex items-center mb-3">
                                    <div className="bg-purple-100 p-2 rounded-md mr-3">
                                        <CheckCircle className="h-6 w-6 text-purple-600" />
                                    </div>
                                    <h3 className="font-medium text-gray-800">User-Centered Service</h3>
                                </div>
                                <p className="text-sm text-gray-600">We prioritize user needs with friendly, responsive, and respectful support.</p>
                            </div>

                            <div className="p-4 rounded-md bg-red-50 border-l-4 border-red-400">
                                <div className="flex items-center mb-3">
                                    <div className="bg-red-100 p-2 rounded-md mr-3">
                                        <Gift className="h-6 w-6 text-red-600" />
                                    </div>
                                    <h3 className="font-medium text-gray-800">Inclusivity</h3>
                                </div>
                                <p className="text-sm text-gray-600">We welcome individuals from all walks of life and backgrounds.</p>
                            </div>

                            <div className="p-4 rounded-md bg-indigo-50 border-l-4 border-indigo-400">
                                <div className="flex items-center mb-3">
                                    <div className="bg-indigo-100 p-2 rounded-md mr-3">
                                        <TrendingUp className="h-6 w-6 text-indigo-600" />
                                    </div>
                                    <h3 className="font-medium text-gray-800">Continuous Improvement</h3>
                                </div>
                                <p className="text-sm text-gray-600">We listen, learn, and evolve to better serve our users.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg shadow-md p-10 mb-16 text-white">
                        <h2 className="text-2xl font-semibold mb-8 text-center">Our Impact</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-4xl font-bold mb-2">{stat.value}</div>
                                    <div className="text-sm opacity-90">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mb-16">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">Meet Our Team</h2>
                        <div className="grid md:grid-cols-4 gap-6">
                            {teamMembers.map((member, index) => (
                                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <div className="h-48 relative">
                                        <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="font-bold text-gray-800">{member.name}</h3>
                                        <p className="text-yellow-600 text-sm mb-3">{member.position}</p>
                                        <p className="text-gray-600 text-sm">{member.bio}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-8 mb-16">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Our Certifications</h2>
                        <div className="flex flex-wrap justify-center gap-8 items-center">
                            <div className="text-center p-4">
                                <div className="bg-gray-100 rounded-lg p-4 mb-2 inline-block">
                                    <Award className="h-10 w-10 text-gray-700" />
                                </div>
                                <p className="text-sm font-medium text-gray-800">ISO 27001 Certified</p>
                            </div>
                            <div className="text-center p-4">
                                <div className="bg-gray-100 rounded-lg p-4 mb-2 inline-block">
                                    <Shield className="h-10 w-10 text-gray-700" />
                                </div>
                                <p className="text-sm font-medium text-gray-800">Data Privacy Compliant</p>
                            </div>
                            <div className="text-center p-4">
                                <div className="bg-gray-100 rounded-lg p-4 mb-2 inline-block">
                                    <Users className="h-10 w-10 text-gray-700" />
                                </div>
                                <p className="text-sm font-medium text-gray-800">Licensed Matchmaking Service</p>
                            </div>
                            <div className="text-center p-4">
                                <div className="bg-gray-100 rounded-lg p-4 mb-2 inline-block">
                                    <Star className="h-10 w-10 text-gray-700" />
                                </div>
                                <p className="text-sm font-medium text-gray-800">Best Service Award 2024</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg shadow-md p-10 text-center text-white">
                        <h2 className="text-2xl font-semibold mb-4">Ready to Find Your Perfect Match?</h2>
                        <p className="max-w-2xl mx-auto mb-8">
                            Join thousands of couples who found their life partners through our platform. Register today and start your journey to a meaningful relationship.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button onClick={() => navigate('/signin')} className="bg-white text-yellow-600 hover:bg-gray-100 font-medium py-3 px-6 rounded-md transition duration-300">
                                Register Free
                            </button>
                            <button
                                onClick={() => navigate('/contact')}
                                className="bg-transparent border border-white text-white hover:bg-white/10 font-medium py-3 px-6 rounded-md transition duration-300"
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
