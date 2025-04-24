import Header from './NavBar/Header';
import { Heart, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import HeroSection from './Component/HeroSection';

const Home = () => {
    return (
        <div className="font-sans bg-gray-50 min-h-screen">
            <Header />
            <main>
                <HeroSection />
            </main>

            <footer className="bg-gray-900 text-white pt-12 pb-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center mb-4">
                                <Heart className="h-8 w-8 text-yellow-500" fill="#eab308" />
                                <span className="ml-2 text-xl font-bold">ශ්‍රී ලංකාවේ මංගල යොඡනා</span>
                            </div>
                            <p className="text-gray-400 mb-4">Sri Lanka's most trusted matrimony service with thousands of success stories. Find your perfect match today.</p>
                            <div className="flex space-x-4">
                                <a href="#" className="bg-yellow-600 hover:bg-yellow-700 h-10 w-10 rounded-full flex items-center justify-center transition-colors">
                                    <Facebook className="h-5 w-5" />
                                </a>
                                <a href="#" className="bg-yellow-600 hover:bg-yellow-700 h-10 w-10 rounded-full flex items-center justify-center transition-colors">
                                    <Instagram className="h-5 w-5" />
                                </a>
                                <a href="#" className="bg-yellow-600 hover:bg-yellow-700 h-10 w-10 rounded-full flex items-center justify-center transition-colors">
                                    <Twitter className="h-5 w-5" />
                                </a>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4 text-yellow-500">Quick Links</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                                        Search Profiles
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                                        Success Stories
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                                        Premium Memberships
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                                        About Us
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                                        Blog
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4 text-yellow-500">Legal</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                                        Privacy Policy
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                                        Terms of Service
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                                        Refund Policy
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                                        Cookie Policy
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                                        Safety Tips
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                                        Report Issues
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4 text-yellow-500">Contact Us</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <Phone className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                                    <span className="text-gray-400">+94 11 234 5678</span>
                                </li>
                                <li className="flex items-start">
                                    <Mail className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                                    <span className="text-gray-400">info@srilankamamatrimony.lk</span>
                                </li>
                                <li className="flex items-start">
                                    <MapPin className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                                    <span className="text-gray-400">42 Temple Road, Colombo 03, Sri Lanka</span>
                                </li>
                            </ul>
                            <div className="mt-4 pt-4 border-t border-gray-800">
                                <h4 className="text-sm font-medium mb-2 text-yellow-500">Subscribe to Our Newsletter</h4>
                                <div className="flex">
                                    <input
                                        type="email"
                                        placeholder="Your email"
                                        className="bg-gray-800 text-white px-3 py-2 rounded-l-md w-full focus:outline-none focus:ring-1 focus:ring-yellow-500 text-sm"
                                    />
                                    <button className="bg-yellow-600 hover:bg-yellow-700 px-3 py-2 rounded-r-md text-white font-medium text-sm">Subscribe</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-gray-800 text-center text-gray-400 text-sm">
                        <p>&copy; {new Date().getFullYear()} Sri Lanka Matrimony. All rights reserved.</p>
                        <p className="mt-2">
                            Designed and developed with <Heart className="h-4 w-4 text-yellow-500 inline" fill="#eab308" /> in Sri Lanka
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
