import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, Facebook, Twitter, Instagram, Linkedin, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../NavBar/Header';
import Footer from '../Footer/Footer';

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

    const navigate = useNavigate();

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

    const contactInfo = [
        {
            icon: Phone,
            title: 'Phone',
            content: '+94 74 237 2246',
            link: 'tel:+94742372246',
        },
        {
            icon: Mail,
            title: 'Email',
            content: 'support@myweddingsl.com',
            link: 'mailto:support@myweddingsl.com',
        },
        {
            icon: MapPin,
            title: 'Address',
            content: '183/A, Peradeniya, Penideniya, Kandy',
            link: 'https://www.google.com/maps/search/183%2FA,+Peradeniya,+Penideniya,+Kandy/@7.2542464,80.585779,17z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI1MDUyMS4wIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D',
        },
        {
            icon: Clock,
            title: 'Business Hours',
            content: 'Monday to Saturday: 9:00 AM - 6:00 PM Sunday: 9:00 AM - 1:00 PM\n',
            link: null,
        },
    ];

    return (
        <div className="font-sans bg-gradient-to-b from-yellow-50 to-white min-h-screen">
            <Header />

            <main className="pt-24 pb-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8 mb-12">
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Get in Touch</h2>
                                <div className="space-y-4">
                                    {contactInfo.map((item, index) => (
                                        <div key={index} className="flex items-start p-3 rounded-md hover:bg-yellow-50 transition-colors">
                                            <div className="flex-shrink-0 mr-4">
                                                <div className="bg-yellow-100 p-2 rounded-md">
                                                    <item.icon className="h-5 w-5 text-yellow-600" />
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-gray-800">{item.title}</h3>
                                                {item.link ? (
                                                    <a href={item.link} className="text-sm text-gray-600 hover:text-yellow-600 transition-colors">
                                                        {item.content}
                                                    </a>
                                                ) : (
                                                    <p className="text-sm text-gray-600">{item.content}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">Follow Us</h3>
                                <div className="flex space-x-4">
                                    <a href="#" className="bg-blue-100 p-3 rounded-full hover:bg-blue-200 transition-colors">
                                        <Facebook className="h-5 w-5 text-blue-600" />
                                    </a>
                                    <a href="#" className="bg-blue-100 p-3 rounded-full hover:bg-blue-200 transition-colors">
                                        <Twitter className="h-5 w-5 text-blue-400" />
                                    </a>
                                    <a href="#" className="bg-pink-100 p-3 rounded-full hover:bg-pink-200 transition-colors">
                                        <Instagram className="h-5 w-5 text-pink-600" />
                                    </a>
                                    <a href="#" className="bg-blue-100 p-3 rounded-full hover:bg-blue-200 transition-colors">
                                        <Linkedin className="h-5 w-5 text-blue-700" />
                                    </a>
                                </div>
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
