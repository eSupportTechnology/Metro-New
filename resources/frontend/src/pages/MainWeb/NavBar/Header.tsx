import { Heart, Menu, X, User, Phone, HelpCircle, DollarSign, FileText, BookOpen, BookmarkIcon, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    return (
        <div>
            {isDrawerOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={toggleDrawer}></div>}

            <div
                className={`fixed top-0 right-0 h-full w-full md:w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}
            >
                <div className="p-4 flex-none">
                    <button onClick={toggleDrawer} className="absolute top-4 left-4">
                        <X className="h-6 w-6" />
                    </button>

                    <div className="mt-12 flex gap-4">
                        <div className="flex-1 border border-gray-300 rounded-md p-4 flex flex-col items-center justify-center hover:bg-gray-50 cursor-pointer">
                            <User className="h-6 w-6 mb-2" />
                            <span className="text-center text-sm">Create an account</span>
                        </div>
                        <div className="flex-1 border border-gray-300 rounded-md p-4 flex flex-col items-center justify-center hover:bg-gray-50 cursor-pointer">
                            <Phone className="h-6 w-6 mb-2" />
                            <span className="text-center text-sm">Call us to create your account</span>
                        </div>
                    </div>

                    <div className="mt-8">
                        <div className="py-3 px-2 flex items-center gap-3 border-b border-gray-200">
                            <FileText className="h-5 w-5 text-gray-600" />
                            <span>All Ads</span>
                        </div>
                        <div className="py-3 px-2 flex items-center gap-3 border-b border-gray-200">
                            <User className="h-5 w-5 text-gray-600" />
                            <span>Login</span>
                        </div>
                        <div className="py-3 px-2 flex items-center gap-3 border-b border-gray-200">
                            <HelpCircle className="h-5 w-5 text-gray-600" />
                            <span>Help</span>
                        </div>
                        <div className="py-3 px-2 flex items-center gap-3 border-b border-gray-200">
                            <DollarSign className="h-5 w-5 text-gray-600" />
                            <span>Pricing</span>
                        </div>
                        <div className="py-3 px-2 flex items-center gap-3 border-b border-gray-200">
                            <FileText className="h-5 w-5 text-gray-600" />
                            <span>Terms</span>
                        </div>
                        <div className="py-3 px-2 flex items-center gap-3 border-b border-gray-200">
                            <BookOpen className="h-5 w-5 text-gray-600" />
                            <span>Monthly Magazine</span>
                        </div>
                        <div className="py-3 px-2 flex items-center gap-3 border-b border-gray-200">
                            <BookmarkIcon className="h-5 w-5 text-gray-600" />
                            <span>Blog</span>
                        </div>
                        <div className="py-3 px-2 flex items-center gap-3 border-b border-gray-200">
                            <Star className="h-5 w-5 text-gray-600" />
                            <span>Reviews and Ratings</span>
                        </div>
                    </div>

                    <div className="mt-6 flex">
                        <button className="flex-1 bg-blue-500 text-white py-2">English</button>
                        <button className="flex-1 bg-white border border-gray-300 py-2">සිංහල</button>
                    </div>
                </div>

                <div className="h-6 flex-none"></div>
            </div>

            <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <Heart className="h-8 w-8 text-yellow-600" fill="#ca8a04" />
                            <span className="ml-2 text-2xl font-bold text-gray-800">
                                ශ්‍රී ලංකාවේ<span className="text-yellow-600">මංගල යොඡනා</span>
                            </span>
                        </div>

                        <nav className="hidden md:flex space-x-8">
                            <a href="#" className="text-gray-700 hover:text-yellow-600 font-medium">
                                Home
                            </a>
                            <a href="#" className="text-gray-700 hover:text-yellow-600 font-medium">
                                Search
                            </a>
                            <a href="#" className="text-gray-700 hover:text-yellow-600 font-medium">
                                Success Stories
                            </a>
                            <a href="#" className="text-gray-700 hover:text-yellow-600 font-medium">
                                About Us
                            </a>
                            <a href="#" className="text-gray-700 hover:text-yellow-600 font-medium">
                                Contact
                            </a>
                        </nav>

                        <div className="hidden md:flex items-center space-x-4">
                            <a href="#" className="text-gray-800 hover:text-yellow-600 font-medium">
                                Sign In
                            </a>
                            <a href="#" className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md transition duration-300 shadow-md">
                                Register Free
                            </a>
                            <button className="p-2 rounded-full bg-gray-100 text-gray-600" onClick={toggleDrawer}>
                                <Menu className="h-6 w-6" />
                            </button>
                        </div>

                        <button className="md:hidden p-2 rounded-full bg-gray-100 text-gray-600" onClick={toggleDrawer}>
                            <Menu className="h-6 w-6" />
                        </button>
                    </div>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-3 px-4 border-t border-gray-100 animate-fade-in">
                        <nav className="flex flex-col space-y-3">
                            <a href="#" className="px-4 py-2 hover:bg-gray-100 rounded-md text-gray-800">
                                Home
                            </a>
                            <a href="#" className="px-4 py-2 hover:bg-gray-100 rounded-md text-gray-800">
                                Search
                            </a>
                            <a href="#" className="px-4 py-2 hover:bg-gray-100 rounded-md text-gray-800">
                                Success Stories
                            </a>
                            <a href="#" className="px-4 py-2 hover:bg-gray-100 rounded-md text-gray-800">
                                About Us
                            </a>
                            <a href="#" className="px-4 py-2 hover:bg-gray-100 rounded-md text-gray-800">
                                Contact
                            </a>
                            <div className="border-t border-gray-200 my-2"></div>
                            <a href="#" className="px-4 py-2 text-gray-800 font-medium">
                                Sign In
                            </a>
                            <a href="#" className="px-4 py-2 bg-yellow-600 text-white rounded-md text-center font-medium hover:bg-yellow-700 transition">
                                Register Free
                            </a>
                        </nav>
                    </div>
                )}
            </header>
        </div>
    );
};

export default Header;
