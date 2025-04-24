import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Shield, User, Users, Search, Calendar, Star, ChevronRight, CheckCircle, Menu, X, Bell, Filter, ArrowRight, Gift, Settings,  Bookmark, Coffee } from 'lucide-react';

const Home = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeCategory, setActiveCategory] = useState('all');

    // Handle scroll event for header styling
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="font-sans bg-gray-50 min-h-screen">
            {/* Header */}
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <Heart className="h-8 w-8 text-yellow-600" fill="#ca8a04" />
                            <span className="ml-2 text-2xl font-bold text-gray-800">

ශ්‍රී ලංකාවේ<span className="text-yellow-600">මංගල යොඡනා</span>
              </span>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex space-x-8">
                            <a href="#" className="text-gray-700 hover:text-yellow-600 font-medium">Home</a>
                            <a href="#" className="text-gray-700 hover:text-yellow-600 font-medium">Search</a>
                            <a href="#" className="text-gray-700 hover:text-yellow-600 font-medium">Success Stories</a>
                            <a href="#" className="text-gray-700 hover:text-yellow-600 font-medium">About Us</a>
                            <a href="#" className="text-gray-700 hover:text-yellow-600 font-medium">Contact</a>
                        </nav>

                        {/* Desktop Auth Buttons */}
                        <div className="hidden md:flex items-center space-x-4">
                            <a href="#" className="text-gray-800 hover:text-yellow-600 font-medium">Sign In</a>
                            <a href="#" className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md transition duration-300 shadow-md">
                                Register Free
                            </a>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 rounded-full bg-gray-100 text-gray-600"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-3 px-4 border-t border-gray-100 animate-fade-in">
                        <nav className="flex flex-col space-y-3">
                            <a href="#" className="px-4 py-2 hover:bg-gray-100 rounded-md text-gray-800">Home</a>
                            <a href="#" className="px-4 py-2 hover:bg-gray-100 rounded-md text-gray-800">Search</a>
                            <a href="#" className="px-4 py-2 hover:bg-gray-100 rounded-md text-gray-800">Success Stories</a>
                            <a href="#" className="px-4 py-2 hover:bg-gray-100 rounded-md text-gray-800">About Us</a>
                            <a href="#" className="px-4 py-2 hover:bg-gray-100 rounded-md text-gray-800">Contact</a>
                            <div className="border-t border-gray-200 my-2"></div>
                            <a href="#" className="px-4 py-2 text-gray-800 font-medium">Sign In</a>
                            <a href="#" className="px-4 py-2 bg-yellow-600 text-white rounded-md text-center font-medium hover:bg-yellow-700 transition">
                                Register Free
                            </a>
                        </nav>
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main>
                {/* Hero Section */}
                <section className="relative pt-16 md:pt-24 pb-16 md:pb-32 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/10 to-yellow-900/10 z-0"></div>
                    <div className="absolute bottom-0 right-0 w-full h-full md:w-1/2 bg-yellow-50 z-0" style={{clipPath: "polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)"}}></div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="flex flex-col md:flex-row items-center">
                            <div className="w-full md:w-1/2 text-center md:text-left mb-12 md:mb-0">
                                <div className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium mb-6">
                                    Sri Lanka's #1 Matrimony Service
                                </div>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                                    Find Your Perfect <span className="text-yellow-600">Life Partner</span>
                                </h1>
                                <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg mx-auto md:mx-0">
                                    Join thousands who have found their perfect match on Sri Lanka's most trusted matrimony platform.
                                </p>
                                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
                                    <a href="#register" className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-md font-medium transition duration-300 shadow-md flex items-center justify-center">
                                        <span>Register Free</span>
                                        <ChevronRight className="ml-1 h-5 w-5" />
                                    </a>
                                    <a href="#learn" className="border border-yellow-600 text-yellow-600 hover:bg-yellow-50 px-6 py-3 rounded-md font-medium transition duration-300 flex items-center justify-center">
                                        <span>Learn More</span>
                                    </a>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/50 to-yellow-600/50 rounded-xl transform rotate-3 scale-105"></div>
                                    <img
                                        src="https://media.istockphoto.com/id/1468254680/photo/silhouettes-lovely-couple-in-love-enjoying-honeymoon-summer-on-tropical-sandy-beach-at-sunset.jpg?s=612x612&w=0&k=20&c=UArs8F_OEBL8loQCnsLqN_ULEvMsHiAdfgWaDAqJVBU="
                                        alt="Silhouette Love Moment"
                                        className="rounded-xl shadow-2xl w-full max-w-lg mx-auto relative"
                                    />
                                    <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-xl hidden md:flex">
                                        <div className="flex items-center">
                                            <div className="bg-green-100 p-2 rounded-full mr-3">
                                                <CheckCircle className="h-6 w-6 text-green-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-800">1000+ Marriages</p>
                                                <p className="text-sm text-gray-500">This Month</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute -top-4 -right-4 bg-white p-3 rounded-full shadow-xl hidden md:flex">
                                        <Heart className="h-6 w-6 text-rose-500" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Search Section */}
                <section className="py-12 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold text-gray-900">Find Matches That Matter</h2>
                            <p className="text-gray-600 mt-2">Search based on criteria that are important to you</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-xl p-6 max-w-4xl mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Looking for</label>
                                    <select
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500">
                                        <option>Bride</option>
                                        <option>Groom</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                                    <div className="flex space-x-2">
                                        <select
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500">
                                            {[...Array(43)].map((_, i) => (
                                                <option key={i}>{i + 18}</option>
                                            ))}
                                        </select>
                                        <span className="flex items-center">to</span>
                                        <select
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500">
                                            {[...Array(43)].map((_, i) => (
                                                <option key={i}>{i + 18}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                    <select
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500">
                                        <option>Any Location</option>
                                        <option>Colombo</option>
                                        <option>Kandy</option>
                                        <option>Galle</option>
                                        <option>Jaffna</option>
                                        <option>Negombo</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Religion</label>
                                    <select
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500">
                                        <option>Any Religion</option>
                                        <option>Buddhist</option>
                                        <option>Hindu</option>
                                        <option>Christian</option>
                                        <option>Muslim</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Mother Tongue</label>
                                    <select
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500">
                                        <option>Any Language</option>
                                        <option>Sinhala</option>
                                        <option>Tamil</option>
                                        <option>English</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Education</label>
                                    <select
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500">
                                        <option>Any Education</option>
                                        <option>High School</option>
                                        <option>Bachelor's Degree</option>
                                        <option>Master's Degree</option>
                                        <option>Doctorate</option>
                                    </select>
                                </div>
                            </div>

                            <div className="text-center">
                                <button
                                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-md font-medium transition duration-300 shadow-md inline-flex items-center">
                                    <Search className="mr-2 h-5 w-5"/>
                                    <span>Search Matches</span>
                                </button>
                                <p className="text-sm text-gray-500 mt-2">Advanced search options available after registration</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Profiles Section */}
                <section className="py-16 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900">Featured Profiles</h2>
                                <p className="text-gray-600 mt-2">Handpicked profiles that match your preferences</p>
                            </div>
                            <div className="mt-4 md:mt-0">
                                <div className="inline-flex rounded-md shadow-sm">
                                    <button
                                        onClick={() => setActiveCategory('all')}
                                        className={`px-4 py-2 text-sm font-medium rounded-l-md ${activeCategory === 'all' ? 'bg-yellow-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                                    >
                                        All
                                    </button>
                                    <button
                                        onClick={() => setActiveCategory('new')}
                                        className={`px-4 py-2 text-sm font-medium ${activeCategory === 'new' ? 'bg-yellow-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                                    >
                                        New
                                    </button>
                                    <button
                                        onClick={() => setActiveCategory('popular')}
                                        className={`px-4 py-2 text-sm font-medium rounded-r-md ${activeCategory === 'popular' ? 'bg-yellow-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                                    >
                                        Popular
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* Profile Card 1 */}
                            <div
                                className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1">
                                <div className="relative">
                                    <img src="/api/placeholder/300/400" alt="Profile" className="w-full h-72 object-cover"/>
                                    <div className="absolute top-3 right-3 bg-yellow-600 text-white text-xs px-2 py-1 rounded-full">
                                        Premium
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-semibold text-lg">Sarah D.</h3>
                                        <div className="flex items-center">
                                            <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                                            <span className="text-xs text-gray-500">Online</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500 mb-1">
                                        <User className="h-4 w-4 mr-1"/>
                                        <span>28 yrs, 5'6"</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500 mb-1">
                                        <Calendar className="h-4 w-4 mr-1"/>
                                        <span>Doctor</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500 mb-3">
                                        <Home className="h-4 w-4 mr-1"/>
                                        <span>Colombo, Sri Lanka</span>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded-md transition duration-300">
                                            View Profile
                                        </button>
                                        <button
                                            className="w-10 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-md flex items-center justify-center transition duration-300">
                                            <Heart className="h-5 w-5"/>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Profile Card 2 */}
                            <div
                                className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1">
                                <div className="relative">
                                    <img src="/api/placeholder/300/400" alt="Profile" className="w-full h-72 object-cover"/>
                                    <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                                        New
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-semibold text-lg">Amal K.</h3>
                                        <div className="flex items-center">
                                            <span className="text-xs text-gray-500">2 hrs ago</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500 mb-1">
                                        <User className="h-4 w-4 mr-1"/>
                                        <span>32 yrs, 5'10"</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500 mb-1">
                                        <Calendar className="h-4 w-4 mr-1"/>
                                        <span>Engineer</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500 mb-3">
                                        <Home className="h-4 w-4 mr-1"/>
                                        <span>Kandy, Sri Lanka</span>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded-md transition duration-300">
                                            View Profile
                                        </button>
                                        <button
                                            className="w-10 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-md flex items-center justify-center transition duration-300">
                                            <Heart className="h-5 w-5"/>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Profile Card 3 */}
                            <div
                                className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1">
                                <div className="relative">
                                    <img src="/api/placeholder/300/400" alt="Profile" className="w-full h-72 object-cover"/>
                                </div>
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-semibold text-lg">Priya M.</h3>
                                        <div className="flex items-center">
                                            <span className="text-xs text-gray-500">1 day ago</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500 mb-1">
                                        <User className="h-4 w-4 mr-1"/>
                                        <span>27 yrs, 5'4"</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500 mb-1">
                                        <Calendar className="h-4 w-4 mr-1"/>
                                        <span>Teacher</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500 mb-3">
                                        <Home className="h-4 w-4 mr-1"/>
                                        <span>Galle, Sri Lanka</span>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded-md transition duration-300">
                                            View Profile
                                        </button>
                                        <button
                                            className="w-10 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-md flex items-center justify-center transition duration-300">
                                            <Heart className="h-5 w-5"/>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Profile Card 4 */}
                            <div
                                className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1">
                                <div className="relative">
                                    <img src="/api/placeholder/300/400" alt="Profile" className="w-full h-72 object-cover"/>
                                    <div className="absolute top-3 right-3 bg-yellow-600 text-white text-xs px-2 py-1 rounded-full">
                                        Premium
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-semibold text-lg">Rahul T.</h3>
                                        <div className="flex items-center">
                                            <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                                            <span className="text-xs text-gray-500">Online</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500 mb-1">
                                        <User className="h-4 w-4 mr-1"/>
                                        <span>30 yrs, 5'9"</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500 mb-1">
                                        <Calendar className="h-4 w-4 mr-1"/>
                                        <span>Business Owner</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500 mb-3">
                                        <Home className="h-4 w-4 mr-1"/>
                                        <span>Negombo, Sri Lanka</span>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded-md transition duration-300">
                                            View Profile
                                        </button>
                                        <button
                                            className="w-10 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-md flex items-center justify-center transition duration-300">
                                            <Heart className="h-5 w-5"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="text-center mt-10">
                            <a href="#" className="inline-flex items-center text-yellow-600 hover:text-yellow-700 font-medium">
                                View All Profiles <ChevronRight className="ml-1 h-5 w-5"/>
                            </a>
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
                            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">Simple steps to find your perfect match on our
                                platform</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <User className="h-8 w-8 text-yellow-600"/>
                                </div>
                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <h3 className="font-bold text-xl mb-3">1. Create Profile</h3>
                                    <p className="text-gray-600">Sign up and create your detailed profile with photos and personal
                                        information</p>
                                </div>
                            </div>

                            <div className="text-center">
                                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Search className="h-8 w-8 text-yellow-600"/>
                                </div>
                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <h3 className="font-bold text-xl mb-3">2. Find Matches</h3>
                                    <p className="text-gray-600">Browse profiles or use our advanced search to find compatible
                                        partners</p>
                                </div>
                            </div>

                            <div className="text-center">
                                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <MessageCircle className="h-8 w-8 text-yellow-600"/>
                                </div>
                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <h3 className="font-bold text-xl mb-3">3. Connect & Meet</h3>
                                    <p className="text-gray-600">Send interest, chat with potential matches and arrange to meet in
                                        person</p>
                                </div>
                            </div>
                        </div>

                        <div className="text-center mt-12">
                            <a href="#"
                               className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-md font-medium transition duration-300 shadow-md inline-block">
                                Get Started Now
                            </a>
                        </div>
                    </div>
                </section>

                {/* Premium Features */}
                <section className="py-16 bg-gradient-to-r from-yellow-50 to-yellow-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                <span
                    className="inline-block bg-yellow-600 text-white text-sm font-medium px-3 py-1 rounded-full mb-3">Premium</span>
                            <h2 className="text-3xl font-bold text-gray-900">Unlock Premium Features</h2>
                            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">Enhance your matrimony experience with our premium
                                membership</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-yellow-600">
                                <div className="flex items-start mb-4">
                                    <div className="bg-yellow-100 p-3 rounded-full mr-4">
                                        <Shield className="h-6 w-6 text-yellow-600"/>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">Advanced Privacy Control</h3>
                                        <p className="text-gray-600 mt-1">Control who views your profile and hide your contact
                                            information</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-yellow-600">
                                <div className="flex items-start mb-4">
                                    <div className="bg-yellow-100 p-3 rounded-full mr-4">
                                        <MessageCircle className="h-6 w-6 text-yellow-600"/>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">Unlimited Messages</h3>
                                        <p className="text-gray-600 mt-1">Send unlimited messages to connect with potential matches</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-yellow-600">
                                <div className="flex items-start mb-4">
                                    <div className="bg-yellow-100 p-3 rounded-full mr-4">
                                        <Star className="h-6 w-6 text-yellow-600"/>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">Priority Listing</h3>
                                        <p className="text-gray-600 mt-1">Your profile gets highlighted in search results and featured
                                            sections</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-yellow-600">
                                <div className="flex items-start mb-4">
                                    <div className="bg-yellow-100 p-3 rounded-full mr-4">
                                        <Users className="h-6 w-6 text-yellow-600"/>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">View Contact Info</h3>
                                        <p className="text-gray-600 mt-1">Directly view contact information of interested profiles without
                                            restriction</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-yellow-600">
                                <div className="flex items-start mb-4">
                                    <div className="bg-yellow-100 p-3 rounded-full mr-4">
                                        <Bell className="h-6 w-6 text-yellow-600"/>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">Instant Notifications</h3>
                                        <p className="text-gray-600 mt-1">Receive instant notifications when someone shows interest in
                                            your profile</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-yellow-600">
                                <div className="flex items-start mb-4">
                                    <div className="bg-yellow-100 p-3 rounded-full mr-4">
                                        <Gift className="h-6 w-6 text-yellow-600"/>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">Personalized Assistance</h3>
                                        <p className="text-gray-600 mt-1">Get personalized assistance from our relationship advisors</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 bg-white rounded-xl shadow-xl p-8 max-w-3xl mx-auto">
                            <div className="flex flex-col md:flex-row items-center">
                                <div className="w-full md:w-2/3 mb-6 md:mb-0 md:pr-8">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Gold Premium Membership</h3>
                                    <p className="text-gray-600 mb-4">Unlock all premium features and increase your chances of finding
                                        the perfect match</p>
                                    <ul className="space-y-2">
                                        <li className="flex items-center">
                                            <CheckCircle className="h-5 w-5 text-yellow-600 mr-2"/>
                                            <span>All premium features included</span>
                                        </li>
                                        <li className="flex items-center">
                                            <CheckCircle className="h-5 w-5 text-yellow-600 mr-2"/>
                                            <span>3x more profile views</span>
                                        </li>
                                        <li className="flex items-center">
                                            <CheckCircle className="h-5 w-5 text-yellow-600 mr-2"/>
                                            <span>Priority customer support</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="w-full md:w-1/3 text-center">
                                    <div className="text-3xl font-bold text-yellow-600 mb-2">50% OFF</div>
                                    <div className="text-sm text-gray-500 mb-4">Limited Time Offer</div>
                                    <a href="#"
                                       className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-md font-medium transition duration-300 shadow-md inline-block w-full">
                                        Upgrade Now
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Success Stories */}
                <section className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900">Success Stories</h2>
                            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">Couples who found their perfect match through our
                                platform</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div
                                className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1">
                                <div className="relative h-48">
                                    <img src="/api/placeholder/400/300" alt="Success Story" className="w-full h-full object-cover"/>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 p-4 text-white">
                                        <h3 className="font-bold text-lg">Dinesh & Priya</h3>
                                        <p className="text-sm">Married April 2024</p>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <p className="text-gray-600 italic mb-4">
                                        "We connected instantly on GoldMatch. After 4 months of getting to know each other, we knew we
                                        were meant to be together forever."
                                    </p>
                                    <a href="#" className="text-yellow-600 hover:text-yellow-700 font-medium inline-flex items-center">
                                        Read More <ArrowRight className="ml-1 h-4 w-4"/>
                                    </a>
                                </div>
                            </div>

                            <div
                                className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1">
                                <div className="relative h-48">
                                    <img src="/api/placeholder/400/300" alt="Success Story" className="w-full h-full object-cover"/>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 p-4 text-white">
                                        <h3 className="font-bold text-lg">Amal & Kumari</h3>
                                        <p className="text-sm">Married January 2024</p>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <p className="text-gray-600 italic mb-4">
                                        "The matching algorithm really works! We had so many common interests and values. Our families
                                        were thrilled when they met."
                                    </p>
                                    <a href="#" className="text-yellow-600 hover:text-yellow-700 font-medium inline-flex items-center">
                                        Read More <ArrowRight className="ml-1 h-4 w-4"/>
                                    </a>
                                </div>
                            </div>

                            <div
                                className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1">
                                <div className="relative h-48">
                                    <img src="/api/placeholder/400/300" alt="Success Story" className="w-full h-full object-cover"/>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 p-4 text-white">
                                        <h3 className="font-bold text-lg">Rahul & Fathima</h3>
                                        <p className="text-sm">Married November 2023</p>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <p className="text-gray-600 italic mb-4">
                                        "Despite coming from different backgrounds, we found we shared the same values and dreams.
                                        GoldMatch helped us find our happily ever after."
                                    </p>
                                    <a href="#" className="text-yellow-600 hover:text-yellow-700 font-medium inline-flex items-center">
                                        Read More <ArrowRight className="ml-1 h-4 w-4"/>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="text-center mt-10">
                            <a href="#"
                               className="bg-transparent border-2 border-yellow-600 text-yellow-600 hover:bg-yellow-50 px-6 py-2 rounded-md font-medium transition duration-300 inline-block">
                                View All Success Stories
                            </a>
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section className="py-16 bg-gradient-to-r from-yellow-600 to-yellow-800 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold">What Our Members Say</h2>
                            <p className="mt-2 opacity-90 max-w-2xl mx-auto">Hear from our happy members who found success on our
                                platform</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                                <div className="flex items-center mb-4">
                                    <img src="/api/placeholder/60/60" alt="User"
                                         className="w-12 h-12 rounded-full object-cover border-2 border-yellow-300"/>
                                    <div className="ml-3">
                                        <h4 className="font-bold">Anika S.</h4>
                                        <div className="flex text-yellow-300">
                                            <Star className="h-4 w-4 fill-current"/>
                                            <Star className="h-4 w-4 fill-current"/>
                                            <Star className="h-4 w-4 fill-current"/>
                                            <Star className="h-4 w-4 fill-current"/>
                                            <Star className="h-4 w-4 fill-current"/>
                                        </div>
                                    </div>
                                </div>
                                <p className="italic">
                                    "I was hesitant to try online matrimony, but GoldMatch made it so easy and safe. The verification
                                    process gave me confidence in the profiles I was viewing."
                                </p>
                            </div>

                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                                <div className="flex items-center mb-4">
                                    <img src="/api/placeholder/60/60" alt="User"
                                         className="w-12 h-12 rounded-full object-cover border-2 border-yellow-300"/>
                                    <div className="ml-3">
                                        <h4 className="font-bold">Sanjay M.</h4>
                                        <div className="flex text-yellow-300">
                                            <Star className="h-4 w-4 fill-current"/>
                                            <Star className="h-4 w-4 fill-current"/>
                                            <Star className="h-4 w-4 fill-current"/>
                                            <Star className="h-4 w-4 fill-current"/>
                                            <Star className="h-4 w-4 fill-current"/>
                                        </div>
                                    </div>
                                </div>
                                <p className="italic">
                                    "The premium membership was worth every rupee. I received so many more matches and was able to
                                    communicate freely. Found my wife in just 2 months!"
                                </p>
                            </div>

                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                                <div className="flex items-center mb-4">
                                    <img src="/api/placeholder/60/60" alt="User"
                                         className="w-12 h-12 rounded-full object-cover border-2 border-yellow-300"/>
                                    <div className="ml-3">
                                        <h4 className="font-bold">Lakshmi R.</h4>
                                        <div className="flex text-yellow-300">
                                            <Star className="h-4 w-4 fill-current"/>
                                            <Star className="h-4 w-4 fill-current"/>
                                            <Star className="h-4 w-4 fill-current"/>
                                            <Star className="h-4 w-4 fill-current"/>
                                            <Star className="h-4 w-4 fill-current"/>
                                        </div>
                                    </div>
                                </div>
                                <p className="italic">
                                    "What I appreciated most was the customer support. They helped me optimize my profile and gave me
                                    great advice throughout my journey to finding love."
                                </p>
                            </div>
                        </div>

                        <div className="text-center mt-12">
                            <div className="text-4xl font-bold mb-3">1000+</div>
                            <p className="opacity-90">Happy Marriages Every Month</p>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-16 bg-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
                            <p className="text-gray-600 mt-2">Find answers to the most common questions</p>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-gray-50 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I create a profile?</h3>
                                <p className="text-gray-600">
                                    Creating a profile is simple. Click on the "Register Free" button, fill in your basic details,
                                    verify your email or phone, and then complete your profile with photos and preferences.
                                </p>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Is my information secure?</h3>
                                <p className="text-gray-600">
                                    Yes, we take privacy very seriously. Your personal information is protected with advanced security
                                    measures, and we never share your contact details without your permission.
                                </p>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">How does the matching system work?</h3>
                                <p className="text-gray-600">
                                    Our matching algorithm considers multiple factors including your preferences, background, education,
                                    profession, and interests to suggest compatible matches. Premium members receive priority matching.
                                </p>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I hide my profile from certain
                                    people?</h3>
                                <p className="text-gray-600">
                                    Yes, with our privacy settings you can hide your profile from specific users, ex-colleagues,
                                    relatives, or anyone you know. Premium members have access to advanced privacy controls.
                                </p>
                            </div>
                        </div>

                        <div className="text-center mt-10">
                            <a href="#" className="text-yellow-600 hover:text-yellow-700 font-medium inline-flex items-center">
                                View All FAQs <ArrowRight className="ml-1 h-5 w-5"/>
                            </a>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-gradient-to-r from-yellow-600 to-yellow-800 rounded-2xl shadow-xl overflow-hidden">
                            <div className="flex flex-col md:flex-row">
                                <div className="w-full md:w-3/5 p-8 md:p-12 text-white">
                                    <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Match?</h2>
                                    <p className="opacity-90 mb-8 text-lg">
                                        Join thousands of happy couples who found their life partners through GoldMatch. Register today
                                        and start your journey to a beautiful relationship.
                                    </p>
                                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                                        <a href="#"
                                           className="bg-white text-yellow-800 hover:bg-gray-100 px-6 py-3 rounded-md font-medium transition duration-300 shadow-md text-center">
                                            Register Free
                                        </a>
                                        <a href="#"
                                           className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-6 py-3 rounded-md font-medium transition duration-300 text-center">
                                            Learn More
                                        </a>
                                    </div>
                                </div>
                                <div className="w-full md:w-2/5 relative">
                                    <img
                                        src="/api/placeholder/500/400"
                                        alt="Happy Couple"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Trust Badges */}
                <section className="py-10 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
                            <div className="text-center">
                                <div className="text-gray-400 mb-2">
                                    <Shield className="h-10 w-10 mx-auto"/>
                                </div>
                                <div className="text-sm text-gray-500">Secure Payments</div>
                            </div>

                            <div className="text-center">
                                <div className="text-gray-400 mb-2">
                                    <CheckCircle className="h-10 w-10 mx-auto"/>
                                </div>
                                <div className="text-sm text-gray-500">Verified Profiles</div>
                            </div>

                            <div className="text-center">
                                <div className="text-gray-400 mb-2">
                                    <User className="h-10 w-10 mx-auto"/>
                                </div>
                                <div className="text-sm text-gray-500">1M+ Happy Users</div>
                            </div>

                            <div className="text-center">
                                <div className="text-gray-400 mb-2">
                                    <MessageCircle className="h-10 w-10 mx-auto"/>
                                </div>
                                <div className="text-sm text-gray-500">24/7 Support</div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-white pt-16 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
                        <div className="col-span-1 lg:col-span-2">
                            <div className="flex items-center mb-4">
                                <Heart className="h-8 w-8 text-yellow-500" fill="#eab308"/>
                                <span className="ml-2 text-2xl font-bold">
                  Gold<span className="text-yellow-500">Match</span>
                </span>
                            </div>
                            <p className="text-gray-400 mb-4 max-w-xs">
                                Sri Lanka's most trusted matrimony service helping singles find their perfect life partner.
                            </p>
                            <div className="flex space-x-4">
                                <a href="#" className="text-gray-400 hover:text-white transition">
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                                    </svg>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white transition">
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                    </svg>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white transition">
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-400 hover:text-white transition">Home</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition">Search</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition">Success Stories</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition">Premium Plans</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition">Contact Us</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">Information</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-400 hover:text-white transition">About Us</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition">Terms & Conditions</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition">Refund Policy</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition">FAQ</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                            <address className="text-gray-400 not-italic">
                                <p className="mb-2">123 Main Street, Colombo</p>
                                <p className="mb-2">Sri Lanka</p>
                                <p className="mb-2">Email: support@goldmatch.com</p>
                                <p>Phone: +94 11 234 5678</p>
                            </address>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 pt-8">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <p className="text-gray-400">© {new Date().getFullYear()} GoldMatch. All rights reserved.</p>
                            <div className="mt-4 md:mt-0">
                                <div className="flex items-center space-x-4">
                                    <a href="#" className="text-gray-400 hover:text-white transition">Privacy</a>
                                    <span className="text-gray-600">|</span>
                                    <a href="#" className="text-gray-400 hover:text-white transition">Terms</a>
                                    <span className="text-gray-600">|</span>
                                    <a href="#" className="text-gray-400 hover:text-white transition">Sitemap</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
