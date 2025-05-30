import React, { useState, useEffect } from 'react';
import { Facebook, Heart, Instagram, Mail, MapPin, Phone, Twitter, Globe, Clock } from 'lucide-react';
import { SiTiktok, SiWhatsapp } from 'react-icons/si';
import { ContactsSocialsService, Contact, Social } from '../../../hooks/ContactsSocials/ContactsSocialsService';

const Footer: React.FC = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [socials, setSocials] = useState<Social[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    const fetchFooterData = async () => {
        setIsLoading(true);
        setError('');

        try {
            const [contactsData, socialsData] = await Promise.all([ContactsSocialsService.fetchContacts(), ContactsSocialsService.fetchSocials()]);

            setContacts(contactsData);
            setSocials(socialsData);
        } catch (error) {
            console.error('Failed to fetch footer data:', error);
            setError('Failed to load contact information.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchFooterData();
    }, []);

    const getContactIcon = (name: string): React.ComponentType<{ className?: string }> => {
        const lowerName = name.toLowerCase();
        if (lowerName.includes('phone') || lowerName.includes('contact') || lowerName.includes('mobile')) return Phone;
        if (lowerName.includes('email') || lowerName.includes('mail')) return Mail;
        if (lowerName.includes('address') || lowerName.includes('location')) return MapPin;
        if (lowerName.includes('hours') || lowerName.includes('time')) return Clock;
        return Phone;
    };

    const getSocialIcon = (name: string): React.ComponentType<{ className?: string }> => {
        const lowerName = name.toLowerCase();
        if (lowerName.includes('facebook')) return Facebook;
        if (lowerName.includes('twitter') || lowerName.includes('x')) return Twitter;
        if (lowerName.includes('instagram')) return Instagram;
        if (lowerName.includes('whatsapp')) return SiWhatsapp as React.ComponentType<{ className?: string }>;
        if (lowerName.includes('tiktok')) return SiTiktok as React.ComponentType<{ className?: string }>;
        return Globe;
    };

    const getContactLink = (contact: Contact): string | null => {
        const lowerName = contact.name.toLowerCase();
        if (lowerName.includes('phone') || lowerName.includes('contact') || lowerName.includes('mobile')) {
            const cleanPhone = contact.data.replace(/[^\d+\s-()]/g, '');
            return `tel:${cleanPhone.replace(/[\s-()]/g, '')}`;
        } else if (lowerName.includes('email') || lowerName.includes('mail')) {
            return `mailto:${contact.data}`;
        } else if (lowerName.includes('address') || lowerName.includes('location')) {
            return `https://www.google.com/maps/search/${encodeURIComponent(contact.data)}`;
        }
        return null;
    };

    const renderContactInfo = () => {
        if (isLoading) {
            return (
                <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-start animate-pulse">
                            <div className="h-5 w-5 bg-gray-700 rounded mr-2 mt-0.5"></div>
                            <div className="h-4 bg-gray-700 rounded w-32"></div>
                        </div>
                    ))}
                </div>
            );
        }

        if (error || contacts.length === 0) {
            return (
                <ul className="space-y-3">
                    <li className="flex items-start">
                        <Phone className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                        <span className="text-gray-400">+94 74 237 2246</span>
                    </li>
                    <li className="flex items-start">
                        <Mail className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                        <span className="text-gray-400">support@myweddingsl.com</span>
                    </li>
                    <li className="flex items-start">
                        <MapPin className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                        <span className="text-gray-400">183/A, Peradeniya, Penideniya, Kandy</span>
                    </li>
                </ul>
            );
        }

        return (
            <ul className="space-y-3">
                {contacts.slice(0, 3).map((contact, index) => {
                    const IconComponent = getContactIcon(contact.name);
                    const link = getContactLink(contact);

                    return (
                        <li key={index} className="flex items-start">
                            <IconComponent className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                            {link ? (
                                <a
                                    href={link}
                                    className="text-gray-400 hover:text-yellow-500 transition-colors"
                                    target={link.startsWith('http') ? '_blank' : undefined}
                                    rel={link.startsWith('http') ? 'noopener noreferrer' : undefined}
                                >
                                    {contact.data}
                                </a>
                            ) : (
                                <span className="text-gray-400">{contact.data}</span>
                            )}
                        </li>
                    );
                })}
            </ul>
        );
    };

    const renderSocialLinks = () => {
        if (isLoading) {
            return (
                <div className="flex space-x-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-10 w-10 bg-gray-700 rounded-full animate-pulse"></div>
                    ))}
                </div>
            );
        }

        if (error || socials.length === 0) {
            return (
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
            );
        }

        return (
            <div className="flex space-x-4">
                {socials.slice(0, 4).map((social, index) => {
                    const SocialIcon = getSocialIcon(social.name);

                    return (
                        <a
                            key={index}
                            href={social.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-yellow-600 hover:bg-yellow-700 h-10 w-10 rounded-full flex items-center justify-center transition-colors"
                            title={social.name}
                        >
                            <SocialIcon className="h-5 w-5" />
                        </a>
                    );
                })}
            </div>
        );
    };

    return (
        <div>
            <footer className="bg-gray-900 text-white pt-12 pb-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center mb-4">
                                <img className="w-10 h-10 ltr:-ml-1 rtl:-mr-1" src="/assets/images/logo.svg" alt="Sri Lanka Matrimony Logo" />
                                <span className="ml-2 text-xl font-bold">MyWeddingSL.com</span>
                            </div>
                            <p className="text-gray-400 mb-4">Sri Lanka's most trusted matrimony service with thousands of success stories. Find your perfect match today.</p>
                            {renderSocialLinks()}
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4 text-yellow-500">Quick Links</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="/" className="text-gray-400 hover:text-yellow-500 transition-colors">
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
                            {renderContactInfo()}
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
                        <p>&copy; {new Date().getFullYear()} MyWeddingSL. All rights reserved.</p>
                        <p className="mt-2">
                            Designed and developed with <Heart className="h-4 w-4 text-yellow-500 inline" fill="#eab308" /> in eSupport Technology
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
