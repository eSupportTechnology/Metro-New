import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, Facebook, Twitter, Instagram, Linkedin, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../NavBar/Header';
import Footer from '../Footer/Footer';
import { ContactsSocialsService, Contact, Social } from '../../../hooks/ContactsSocials/ContactsSocialsService';
import { SiTiktok, SiWhatsapp } from 'react-icons/si';

const ContactUs: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [socials, setSocials] = useState<Social[]>([]);
    const [isDataLoading, setIsDataLoading] = useState<boolean>(true);
    const [dataError, setDataError] = useState<string>('');

    const navigate = useNavigate();

    const fetchContactData = async () => {
        setIsDataLoading(true);
        setDataError('');

        try {
            const [contactsData, socialsData] = await Promise.all([ContactsSocialsService.fetchContacts(), ContactsSocialsService.fetchSocials()]);

            setContacts(contactsData);
            setSocials(socialsData);
        } catch (error) {
            console.error('Failed to fetch contact data:', error);
            setDataError('Failed to load contact information. Please refresh the page.');
        } finally {
            setIsDataLoading(false);
        }
    };

    useEffect(() => {
        fetchContactData();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setSuccess(true);
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: '',
            });
            setTimeout(() => setSuccess(false), 5000);
        } catch (err) {
            setError('An error occurred. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const getContactInfo = () => {
        const iconMap: { [key: string]: any } = {
            phone: Phone,
            email: Mail,
            address: MapPin,
            'business hours': Clock,
            hours: Clock,
            location: MapPin,
            contact: Phone,
        };

        return contacts.map((contact, index) => {
            const lowerName = contact.name.toLowerCase();
            let icon = MessageSquare;
            for (const [key, iconComponent] of Object.entries(iconMap)) {
                if (lowerName.includes(key)) {
                    icon = iconComponent;
                    break;
                }
            }

            let link = null;
            if (lowerName.includes('phone') || lowerName.includes('contact')) {
                const cleanPhone = contact.data.replace(/[^\d+\s-()]/g, '');
                link = `tel:${cleanPhone.replace(/[\s-()]/g, '')}`;
            } else if (lowerName.includes('email')) {
                link = `mailto:${contact.data}`;
            } else if (lowerName.includes('address') || lowerName.includes('location')) {
                link = `https://www.google.com/maps/search/${encodeURIComponent(contact.data)}`;
            }

            return {
                icon,
                title: contact.name,
                content: contact.data,
                link,
            };
        });
    };

    const getSocialIcon = (name: string): React.ComponentType<{ className?: string }> => {
        const lowerName = name.toLowerCase();
        if (lowerName.includes('facebook')) return Facebook;
        if (lowerName.includes('twitter') || lowerName.includes('x')) return Twitter;
        if (lowerName.includes('instagram')) return Instagram;
        if (lowerName.includes('linkedin')) return Linkedin;
        if (lowerName.includes('whatsapp')) return SiWhatsapp as React.ComponentType<{ className?: string }>;
        if (lowerName.includes('tiktok')) return SiTiktok as React.ComponentType<{ className?: string }>;

        return Globe;
    };

    const getSocialColors = (name: string) => {
        const lowerName = name.toLowerCase();
        if (lowerName.includes('facebook')) return 'bg-blue-100 hover:bg-blue-200 text-blue-600';
        if (lowerName.includes('twitter') || lowerName.includes('x')) return 'bg-blue-100 hover:bg-blue-200 text-blue-400';
        if (lowerName.includes('instagram')) return 'bg-pink-100 hover:bg-pink-200 text-pink-600';
        if (lowerName.includes('linkedin')) return 'bg-blue-100 hover:bg-blue-200 text-blue-700';
        return 'bg-gray-100 hover:bg-gray-200 text-gray-600';
    };

    const contactInfo = getContactInfo();

    return (
        <div className="font-sans bg-gradient-to-b from-yellow-50 to-white min-h-screen">
            <Header />

            <main className="pt-24 pb-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
                    </div>

                    {dataError && (
                        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md text-center">
                            {dataError}
                            <button onClick={fetchContactData} className="ml-2 text-red-800 underline hover:no-underline">
                                Try Again
                            </button>
                        </div>
                    )}

                    <div className="grid lg:grid-cols-3 gap-8 mb-12">
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Get in Touch</h2>

                                {isDataLoading ? (
                                    <div className="flex justify-center items-center py-8"></div>
                                ) : contactInfo.length > 0 ? (
                                    <div className="space-y-4">
                                        {contactInfo.map((item, index) => (
                                            <div key={index} className="flex items-start p-3 rounded-md hover:bg-yellow-50 transition-colors">
                                                <div className="flex-shrink-0 mr-4">
                                                    <div className="bg-yellow-100 p-2 rounded-md">
                                                        <item.icon className="h-5 w-5 text-yellow-600" />
                                                    </div>
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <h3 className="font-medium text-gray-800">{item.title}</h3>
                                                    {item.link ? (
                                                        <a
                                                            href={item.link}
                                                            className="text-sm text-gray-600 hover:text-yellow-600 transition-colors break-words"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            {item.content}
                                                        </a>
                                                    ) : (
                                                        <p className="text-sm text-gray-600 whitespace-pre-line break-words">{item.content}</p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    !dataError && (
                                        <div className="text-center py-8 text-gray-500">
                                            <MessageSquare className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                                            <p>Contact information will be displayed here.</p>
                                        </div>
                                    )
                                )}
                            </div>

                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">Follow Us</h3>

                                {isDataLoading ? (
                                    <div className="flex justify-center items-center py-4"></div>
                                ) : socials.length > 0 ? (
                                    <div className="flex flex-wrap gap-3">
                                        {socials.map((social, index) => {
                                            const SocialIcon = getSocialIcon(social.name);
                                            const colorClasses = getSocialColors(social.name);

                                            return (
                                                <a
                                                    key={index}
                                                    href={social.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`p-3 rounded-full transition-colors ${colorClasses}`}
                                                    title={social.name}
                                                >
                                                    <SocialIcon className="h-5 w-5" />
                                                </a>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    !dataError && (
                                        <div className="text-center py-4 text-gray-500">
                                            <Globe className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                                            <p className="text-sm">Social media links will be displayed here.</p>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>

                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-lg shadow-md p-8">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Send us a Message</h2>

                                {success && <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-md">Your message has been sent successfully! We'll get back to you soon.</div>}

                                {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">{error}</div>}

                                <form onSubmit={handleSubmit}>
                                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label htmlFor="name" className="block text-gray-700 mb-2">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-gray-700 mb-2">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label htmlFor="phone" className="block text-gray-700 mb-2">
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="subject" className="block text-gray-700 mb-2">
                                                Subject *
                                            </label>
                                            <select
                                                id="subject"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                                required
                                            >
                                                <option value="">Select a subject</option>
                                                <option value="general">General Inquiry</option>
                                                <option value="technical">Technical Support</option>
                                                <option value="billing">Billing Question</option>
                                                <option value="complaint">Complaint</option>
                                                <option value="feedback">Feedback</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <label htmlFor="message" className="block text-gray-700 mb-2">
                                            Message *
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            rows={6}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                            required
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full md:w-auto bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium py-3 px-6 rounded-md transition duration-300 flex items-center justify-center"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    ></path>
                                                </svg>
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="mr-2 h-5 w-5" />
                                                Send Message
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ContactUs;
