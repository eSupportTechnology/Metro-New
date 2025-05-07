import { Heart, Menu, X, User, Phone, HelpCircle, DollarSign, FileText, BookOpen, Bookmark, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
                className={`fixed top-0 right-0 h-full w-full md:w-80 bg-yellow-50 shadow-xl z-50 transform transition-transform duration-300 ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col overflow-y-auto`}
            >
                <div className="p-4 flex-none">
                    <button onClick={toggleDrawer} className="absolute top-4 left-4 text-yellow-700">
                        <X className="h-6 w-6" />
                    </button>

                    <div className="mt-12 flex gap-4">
                        <div className="flex-1 border border-yellow-300 rounded-md p-4 flex flex-col items-center justify-center hover:bg-yellow-100 cursor-pointer">
                            <User className="h-6 w-6 mb-2 text-yellow-600" />
                            <span className="text-center text-sm text-yellow-800">Create an account</span>
                        </div>
                        <div className="flex-1 border border-yellow-300 rounded-md p-4 flex flex-col items-center justify-center hover:bg-yellow-100 cursor-pointer">
                            <Phone className="h-6 w-6 mb-2 text-yellow-600" />
                            <span className="text-center text-sm text-yellow-800">Call us to create your account</span>
                        </div>
                    </div>

                    <div className="mt-8">
                        <div className="py-3 px-2 flex items-center gap-3 border-b border-yellow-200 hover:bg-yellow-100">
                            <FileText className="h-5 w-5 text-yellow-600" />
                            <span className="text-yellow-800">All Ads</span>
                        </div>
                        <div className="py-3 px-2 flex items-center gap-3 border-b border-yellow-200 hover:bg-yellow-100">
                            <User className="h-5 w-5 text-yellow-600" />
                            <span className="text-yellow-800">Login</span>
                        </div>
                        <div className="py-3 px-2 flex items-center gap-3 border-b border-yellow-200 hover:bg-yellow-100">
                            <HelpCircle className="h-5 w-5 text-yellow-600" />
                            <span className="text-yellow-800">Help</span>
                        </div>
                        <div className="py-3 px-2 flex items-center gap-3 border-b border-yellow-200 hover:bg-yellow-100">
                            <DollarSign className="h-5 w-5 text-yellow-600" />
                            <span className="text-yellow-800">Pricing</span>
                        </div>
                        <div className="py-3 px-2 flex items-center gap-3 border-b border-yellow-200 hover:bg-yellow-100">
                            <FileText className="h-5 w-5 text-yellow-600" />
                            <span className="text-yellow-800">Terms</span>
                        </div>
                        <div className="py-3 px-2 flex items-center gap-3 border-b border-yellow-200 hover:bg-yellow-100">
                            <BookOpen className="h-5 w-5 text-yellow-600" />
                            <span className="text-yellow-800">Monthly Magazine</span>
                        </div>
                        <div className="py-3 px-2 flex items-center gap-3 border-b border-yellow-200 hover:bg-yellow-100">
                            <Bookmark className="h-5 w-5 text-yellow-600" />
                            <span className="text-yellow-800">Blog</span>
                        </div>
                        <div className="py-3 px-2 flex items-center gap-3 border-b border-yellow-200 hover:bg-yellow-100">
                            <Star className="h-5 w-5 text-yellow-600" />
                            <span className="text-yellow-800">Reviews and Ratings</span>
                        </div>
                    </div>

                    <div className="mt-6 flex">
                        <button className="flex-1 bg-yellow-600 text-white py-2 hover:bg-yellow-700 transition-colors">English</button>
                        <button className="flex-1 bg-white border border-yellow-300 py-2 text-yellow-800 hover:bg-yellow-50">සිංහල</button>
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
                                ශ්‍රී ලංකාවේ<span className="text-yellow-600">මංගල යෝඡනා</span>
                            </span>
                        </div>

                        <nav className="hidden md:flex space-x-8">
                            <Link to="/" className="text-gray-700 hover:text-yellow-600 font-medium">
                                Home
                            </Link>
                            <Link to="/success-stories" className="text-gray-700 hover:text-yellow-600 font-medium">
                                Success Stories
                            </Link>
                            <Link to="/about" className="text-gray-700 hover:text-yellow-600 font-medium">
                                About Us
                            </Link>
                            <Link to="/contact" className="text-gray-700 hover:text-yellow-600 font-medium">
                                Contact
                            </Link>
                        </nav>

                        <div className="hidden md:flex items-center space-x-4">
                            <Link to="/signin" className="text-gray-800 hover:text-yellow-600 font-medium">
                                Sign In
                            </Link>
                            <Link to="/register" className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md transition duration-300 shadow-md">
                                Register Free
                            </Link>
                            <button className="p-2 rounded-full bg-yellow-100 text-yellow-700 hover:bg-yellow-200" onClick={toggleDrawer}>
                                <Menu className="h-6 w-6" />
                            </button>
                        </div>

                        <button className="md:hidden p-2 rounded-full bg-yellow-100 text-yellow-700 hover:bg-yellow-200" onClick={toggleDrawer}>
                            <Menu className="h-6 w-6" />
                        </button>
                    </div>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 right-0 bg-yellow-50 shadow-lg py-3 px-4 border-t border-yellow-100 animate-fade-in overflow-y-auto max-h-96">
                        <nav className="flex flex-col space-y-3">
                            <Link to="/" className="px-4 py-2 hover:bg-yellow-100 rounded-md text-yellow-800">
                                Home
                            </Link>
                            <Link to="/success-stories" className="px-4 py-2 hover:bg-yellow-100 rounded-md text-yellow-800">
                                Success Stories
                            </Link>
                            <Link to="/about" className="px-4 py-2 hover:bg-yellow-100 rounded-md text-yellow-800">
                                About Us
                            </Link>
                            <Link to="/contact" className="px-4 py-2 hover:bg-yellow-100 rounded-md text-yellow-800">
                                Contact
                            </Link>
                            <div className="border-t border-yellow-200 my-2"></div>
                            <Link to="/signin" className="px-4 py-2 text-yellow-800 font-medium">
                                Sign In
                            </Link>
                            <Link to="/register" className="px-4 py-2 bg-yellow-600 text-white rounded-md text-center font-medium hover:bg-yellow-700 transition">
                                Register Free
                            </Link>
                        </nav>
                    </div>
                )}
            </header>
        </div>
    );
};

export default Header;
