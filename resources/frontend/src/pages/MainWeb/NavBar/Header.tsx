import { Menu, X, User, Phone, HelpCircle, DollarSign, FileText, BookOpen, Bookmark, Star, UserCircle, ChevronDown, ArrowRight, Search } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { logoutUser } from '../../../services/authService';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const location = useLocation();
    const hideMenuPaths = ['/', '/success-stories', '/contact'];
    const shouldHideMenu = hideMenuPaths.includes(location.pathname);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    const handleLogout = async () => {
        await logoutUser(navigate);
    };

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

    useEffect(() => {
        setIsDrawerOpen(false);
    }, [location]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div>
            {isDrawerOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300" onClick={toggleDrawer} aria-hidden="true"></div>}

            <div
                className={`fixed top-0 right-0 h-full w-full sm:w-96 md:w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
                    isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
                } flex flex-col overflow-y-auto`}
                aria-hidden={!isDrawerOpen}
                role="dialog"
                aria-modal="true"
                aria-labelledby="drawer-heading"
            >
                <div className="p-6 flex-none">
                    <button
                        onClick={toggleDrawer}
                        className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded-full p-1"
                        aria-label="Close menu"
                    >
                        <X className="h-6 w-6" />
                    </button>

                    <h2 id="drawer-heading" className="text-xl font-bold text-gray-800 mt-2 mb-6 flex items-center">
                        <img className="w-8 mr-2" src="/assets/images/logo.svg" alt="" />
                        Menu
                    </h2>

                    <div className="my-6">
                        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Account</h3>

                        {!token ? (
                            <div className="grid grid-cols-2 gap-4">
                                <Link to="/signin" className="group">
                                    <div className="border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center hover:bg-yellow-50 hover:border-yellow-300 transition-all duration-200">
                                        <User className="h-6 w-6 mb-2 text-gray-500 group-hover:text-yellow-600 transition-colors" />
                                        <span className="text-center text-sm text-gray-700 group-hover:text-yellow-700">Sign In</span>
                                    </div>
                                </Link>
                                <Link to="/signin" className="group">
                                    <div className="border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center hover:bg-yellow-50 hover:border-yellow-300 transition-all duration-200">
                                        <UserCircle className="h-6 w-6 mb-2 text-gray-500 group-hover:text-yellow-600 transition-colors" />
                                        <span className="text-center text-sm text-gray-700 group-hover:text-yellow-700">Register</span>
                                    </div>
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {userId && (
                                    <Link
                                        to={`/my-profile/${userId}`}
                                        className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-yellow-50 hover:border-yellow-300 transition-all duration-200"
                                    >
                                        <div className="bg-yellow-100 rounded-full p-2">
                                            <UserCircle className="h-5 w-5 text-yellow-600" />
                                        </div>
                                        <div>
                                            <span className="text-gray-900 font-medium">My Profile</span>
                                            <p className="text-xs text-gray-500">View and edit your profile</p>
                                        </div>
                                        <ArrowRight className="h-4 w-4 text-gray-400 ml-auto" />
                                    </Link>
                                )}

                                <button
                                    onClick={handleLogout}
                                    className="w-full px-4 py-2.5 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-center font-medium transition-colors duration-200 flex justify-center items-center space-x-2"
                                >
                                    <span>Log Out</span>
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="space-y-1">
                        <Link to="/view-add" className="flex items-center px-3 py-2.5 rounded-lg text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 transition-colors duration-200">
                            <FileText className="h-5 w-5 mr-3 text-gray-500" />
                            <span>All Ads</span>
                        </Link>

                        {!token && (
                            <Link to="/signin" className="flex items-center px-3 py-2.5 rounded-lg text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 transition-colors duration-200">
                                <User className="h-5 w-5 mr-3 text-gray-500" />
                                <span>Login</span>
                            </Link>
                        )}

                        <Link to="/help" className="flex items-center px-3 py-2.5 rounded-lg text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 transition-colors duration-200">
                            <HelpCircle className="h-5 w-5 mr-3 text-gray-500" />
                            <span>Help</span>
                        </Link>

                        <Link to="/pricing" className="flex items-center px-3 py-2.5 rounded-lg text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 transition-colors duration-200">
                            <DollarSign className="h-5 w-5 mr-3 text-gray-500" />
                            <span>Pricing</span>
                        </Link>

                        <Link to="/terms" className="flex items-center px-3 py-2.5 rounded-lg text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 transition-colors duration-200">
                            <FileText className="h-5 w-5 mr-3 text-gray-500" />
                            <span>Terms</span>
                        </Link>

                        <Link to="/blog" className="flex items-center px-3 py-2.5 rounded-lg text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 transition-colors duration-200">
                            <Bookmark className="h-5 w-5 mr-3 text-gray-500" />
                            <span>Blog</span>
                        </Link>

                        <Link to="/contact" className="flex items-center px-3 py-2.5 rounded-lg text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 transition-colors duration-200">
                            <Phone className="h-5 w-5 mr-3 text-gray-500" />
                            <span>Contact Us</span>
                        </Link>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                            <Link to="/contact" className="text-yellow-600 text-sm hover:text-yellow-700 hover:underline">
                                Need Help?
                            </Link>
                            <Link to="/contact" className="text-yellow-600 text-sm hover:text-yellow-700 hover:underline">
                                Customer Support
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        <Link to="/" className="flex items-center group transition-transform duration-200 transform hover:scale-105">
                            <img className="w-10 h-10 ltr:-ml-1 rtl:-mr-1" src="/assets/images/logo.svg" alt="Sri Lanka Matrimony Logo" />
                            <div className="ml-2">
                                <span className="block text-xl font-bold text-gray-800">
                                    My<span className="text-yellow-600">WeddingSL.com</span>
                                </span>
                            </div>
                        </Link>

                        <nav className="hidden md:flex items-center space-x-1">
                            <Link
                                to="/"
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                                    location.pathname === '/' ? 'text-yellow-700 bg-yellow-50' : 'text-gray-700 hover:text-yellow-600 hover:bg-yellow-50'
                                }`}
                            >
                                Home
                            </Link>
                            <Link
                                to="/about-us"
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                                    location.pathname === '/about-us' ? 'text-yellow-700 bg-yellow-50' : 'text-gray-700 hover:text-yellow-600 hover:bg-yellow-50'
                                }`}
                            >
                                About Us
                            </Link>
                            <Link
                                to="/contact"
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                                    location.pathname === '/contact' ? 'text-yellow-700 bg-yellow-50' : 'text-gray-700 hover:text-yellow-600 hover:bg-yellow-50'
                                }`}
                            >
                                Contact
                            </Link>

                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={toggleDropdown}
                                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 transition-colors duration-200 flex items-center"
                                    aria-expanded={dropdownOpen}
                                >
                                    More
                                    <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                                        <Link to="/blog" className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-700">
                                            Blog
                                        </Link>
                                        <Link to="/help" className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-700">
                                            Help Center
                                        </Link>
                                        <Link to="/pricing" className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-700">
                                            Pricing
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </nav>

                        <div className="hidden md:flex items-center space-x-4">
                            {token ? (
                                <>
                                    {userId && (
                                        <Link
                                            to={`/my-profile/${userId}`}
                                            className="flex items-center space-x-2 px-3 py-2 border border-transparent rounded-md text-sm font-medium text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 transition-colors duration-200"
                                        >
                                            <UserCircle className="h-5 w-5 text-gray-500" />
                                            <span>My Profile</span>
                                        </Link>
                                    )}

                                    <button
                                        onClick={handleLogout}
                                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-200"
                                    >
                                        Log Out
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/signin"
                                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-200"
                                    >
                                        Sign In
                                    </Link>

                                    <Link
                                        to="/register"
                                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-200"
                                    >
                                        Register Free
                                    </Link>
                                </>
                            )}

                            {!shouldHideMenu && (
                                <button
                                    className="p-2 rounded-full text-gray-500 hover:text-yellow-600 hover:bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-200"
                                    onClick={toggleDrawer}
                                    aria-expanded={isDrawerOpen}
                                    aria-controls="mobile-menu"
                                    aria-label="Open menu"
                                >
                                    <Menu className="h-6 w-6" />
                                </button>
                            )}
                        </div>

                        <div className="md:hidden flex items-center space-x-2">
                            {!shouldHideMenu && (
                                <button
                                    className="p-2 rounded-full text-gray-500 hover:text-yellow-600 hover:bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-200"
                                    onClick={toggleDrawer}
                                    aria-expanded={isDrawerOpen}
                                    aria-controls="mobile-menu"
                                    aria-label="Open menu"
                                >
                                    <Menu className="h-6 w-6" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Header;
