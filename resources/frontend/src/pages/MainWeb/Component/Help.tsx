import React, { useState } from 'react';
import { HelpCircle, Search, ChevronDown, ChevronRight, User, Shield, CreditCard, MessageSquare, Settings, Bell, Star, Heart, AlertCircle, Phone, Mail, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../NavBar/Header';
import Footer from '../Footer/Footer';

const Help: React.FC = () => {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState<string>('account');
    const [openFaqs, setOpenFaqs] = useState<Record<string, boolean>>({});

    const toggleFaq = (id: string) => {
        setOpenFaqs((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const helpCategories = [
        { id: 'account', name: 'Account', icon: <User className="h-5 w-5" /> },
        { id: 'privacy', name: 'Privacy & Safety', icon: <Shield className="h-5 w-5" /> },
        { id: 'billing', name: 'Billing', icon: <CreditCard className="h-5 w-5" /> },
        { id: 'messaging', name: 'Messaging', icon: <MessageSquare className="h-5 w-5" /> },
        { id: 'preferences', name: 'Preferences', icon: <Settings className="h-5 w-5" /> },
        { id: 'notifications', name: 'Notifications', icon: <Bell className="h-5 w-5" /> },
        { id: 'matching', name: 'Matching', icon: <Heart className="h-5 w-5" /> },
    ];

    const faqData = {
        account: [
            {
                id: 'account-1',
                question: 'How do I create an account?',
                answer: 'To create an account, click on the "Register" button on the homepage. Fill in your personal details, verify your email address, and complete your profile information. Once reviewed by our team, your profile will be activated.',
            },
            {
                id: 'account-2',
                question: 'How do I update my profile information?',
                answer: 'You can update your profile by logging in and navigating to "My Profile." Click on the "Edit Profile" button to update your personal information, photos, and preferences. Remember that major changes may require reverification.',
            },
            {
                id: 'account-3',
                question: 'How do I reset my password?',
                answer: 'Click on "Forgot Password" on the login page. Enter your registered email address, and we\'ll send you a password reset link. Follow the instructions in the email to set a new password.',
            },
            {
                id: 'account-4',
                question: 'Can I have multiple profiles?',
                answer: 'No, our policy allows only one profile per person. This helps maintain authenticity and trust within our community. Creating multiple profiles may result in account suspension.',
            },
            {
                id: 'account-5',
                question: 'How do I delete my account?',
                answer: 'To delete your account, go to "Account Settings" and select "Delete Account" at the bottom of the page. Follow the prompts to confirm deletion. Please note that this action is permanent and cannot be undone.',
            },
        ],
        privacy: [
            {
                id: 'privacy-1',
                question: 'Who can see my profile?',
                answer: 'By default, only registered and verified members can view your profile. You can adjust your privacy settings to control who sees your full information, photos, and contact details.',
            },
            {
                id: 'privacy-2',
                question: 'How is my personal information protected?',
                answer: 'We employ industry-standard security measures to protect your data, including encryption, secure servers, and regular security audits. We never share your personal information with third parties without your consent.',
            },
            {
                id: 'privacy-3',
                question: 'How do I report inappropriate behavior?',
                answer: 'You can report inappropriate behavior by clicking the "Report" button on the user\'s profile or in your conversation. Our team reviews all reports within 24 hours and takes appropriate action according to our community guidelines.',
            },
            {
                id: 'privacy-4',
                question: 'Can I block someone from contacting me?',
                answer: 'Yes, you can block any user by visiting their profile and clicking the "Block" button. Blocked users cannot view your profile or send you messages. You can manage your block list in your account settings.',
            },
        ],
        billing: [
            {
                id: 'billing-1',
                question: 'What payment methods do you accept?',
                answer: 'We accept all major credit/debit cards (Visa, Mastercard, American Express), bank transfers, and local payment options like eZ Cash and mCash for Sri Lankan users.',
            },
            {
                id: 'billing-2',
                question: 'How do I upgrade to a premium membership?',
                answer: 'To upgrade, go to "Membership" in your account and select "Upgrade to Premium." Choose your preferred plan and payment method, then follow the instructions to complete your purchase.',
            },
            {
                id: 'billing-3',
                question: 'Can I get a refund?',
                answer: "Refund eligibility depends on your subscription plan and timing. Generally, you can request a refund within 7 days of purchase if you haven't used premium features. Please contact our customer support for specific cases.",
            },
            {
                id: 'billing-4',
                question: 'How do I cancel my subscription?',
                answer: 'To cancel your subscription, go to "Account Settings," select "Subscription," and click on "Cancel Subscription." Your premium features will remain active until the end of your current billing period.',
            },
        ],
        messaging: [
            {
                id: 'messaging-1',
                question: 'How do I send messages to other members?',
                answer: 'You can send messages by visiting a member\'s profile and clicking the "Message" button. Free members have limited messaging capabilities, while premium members enjoy unlimited messaging.',
            },
            {
                id: 'messaging-2',
                question: "Why can't I send messages?",
                answer: 'You may be unable to send messages if you have a free account with limited messaging, if the recipient has blocked you, or if your account has been restricted due to policy violations.',
            },
            {
                id: 'messaging-3',
                question: 'Are my conversations private?',
                answer: 'Yes, your conversations are private and encrypted. Our staff can only access messages if they are reported for inappropriate content or policy violations.',
            },
        ],
        preferences: [
            {
                id: 'preferences-1',
                question: 'How do I set my partner preferences?',
                answer: 'You can set your partner preferences in the "My Preferences" section of your profile. Here, you can specify age range, location, education, profession, and other important criteria for your potential match.',
            },
            {
                id: 'preferences-2',
                question: 'How often can I update my preferences?',
                answer: 'You can update your preferences anytime and as often as you like. Changes take effect immediately and will influence the matches you receive.',
            },
        ],
        notifications: [
            {
                id: 'notifications-1',
                question: 'How do I manage my notification settings?',
                answer: 'Go to "Account Settings" and select "Notifications" to customize which notifications you receive. You can choose to receive alerts via email, SMS, or push notifications for various activities like messages, matches, and profile views.',
            },
            {
                id: 'notifications-2',
                question: 'Why am I not receiving email notifications?',
                answer: "Check if our emails are being filtered to your spam folder. Add our email address to your contacts list. Also, verify that you haven't disabled email notifications in your account settings.",
            },
        ],
        matching: [
            {
                id: 'matching-1',
                question: 'How does your matching algorithm work?',
                answer: 'Our matching algorithm considers over 100 compatibility factors based on your profile information, preferences, behavior on the platform, and success patterns from previous matches. We continuously refine our algorithm to improve match quality.',
            },
            {
                id: 'matching-2',
                question: 'Why am I not receiving enough matches?',
                answer: 'The number of matches you receive depends on your preferences, location, and the availability of compatible profiles. Consider broadening your preferences or completing more sections of your profile to improve your matching results.',
            },
            {
                id: 'matching-3',
                question: 'Can I search for matches manually?',
                answer: 'Yes, premium members can use our advanced search feature to find matches based on specific criteria, in addition to receiving algorithm-based recommendations.',
            },
        ],
    };

    const quickHelp = [
        {
            title: 'Getting Started Guide',
            description: 'New to our platform? Learn how to set up your profile and start finding matches.',
        },
        {
            title: 'Premium Features',
            description: 'Discover the benefits of our premium membership options.',
        },
        {
            title: 'Safety Tips',
            description: 'Important guidelines to ensure a safe and positive experience.',
        },
        {
            title: 'Success Stories',
            description: 'Read about couples who found their perfect match on our platform.',
        },
    ];

    return (
        <div className="font-sans bg-gradient-to-b from-yellow-50 to-white min-h-screen">
            <Header />

            <main className="pt-24 pb-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">How Can We Help You?</h1>
                        <p className="text-gray-600 max-w-xl mx-auto mb-8">Find answers to common questions and learn how to make the most of our platform.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                        {quickHelp.map((item, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
                                <h3 className="font-semibold text-gray-800 mb-2">{item.title}</h3>
                                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="grid md:grid-cols-12 gap-8">
                        <div className="md:col-span-3">
                            <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                                <h2 className="font-semibold text-gray-800 mb-4 px-2">Help Categories</h2>
                                <nav>
                                    <ul className="space-y-1">
                                        {helpCategories.map((category) => (
                                            <li key={category.id}>
                                                <button
                                                    onClick={() => setActiveCategory(category.id)}
                                                    className={`w-full flex items-center px-2 py-2 rounded-md transition duration-200 ${
                                                        activeCategory === category.id ? 'bg-yellow-100 text-yellow-700' : 'text-gray-700 hover:bg-gray-100'
                                                    }`}
                                                >
                                                    <span className="mr-3">{category.icon}</span>
                                                    {category.name}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            </div>

                            <div className="bg-yellow-100 rounded-lg shadow-md p-6">
                                <h3 className="font-semibold text-gray-800 mb-3">Need More Help?</h3>
                                <p className="text-gray-700 text-sm mb-4">Can't find what you're looking for? Our customer support team is here to help.</p>
                                <div className="space-y-3">
                                    <a href="/contact" className="flex items-center text-gray-700 hover:text-yellow-700">
                                        <Phone className="h-4 w-4 mr-2" /> Call Us
                                    </a>
                                    <a href="/contact" className="flex items-center text-gray-700 hover:text-yellow-700">
                                        <Mail className="h-4 w-4 mr-2" /> Email Support
                                    </a>
                                    <a href="/live-chat" className="flex items-center text-gray-700 hover:text-yellow-700">
                                        <MessageSquare className="h-4 w-4 mr-2" /> Live Chat
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-9">
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                                    <span className="bg-yellow-100 p-2 rounded-md mr-3">{helpCategories.find((c) => c.id === activeCategory)?.icon}</span>
                                    {helpCategories.find((c) => c.id === activeCategory)?.name} FAQs
                                </h2>

                                <div className="space-y-4">
                                    {faqData[activeCategory as keyof typeof faqData]?.map((faq) => (
                                        <div key={faq.id} className="border border-gray-200 rounded-md overflow-hidden">
                                            <button onClick={() => toggleFaq(faq.id)} className="w-full flex justify-between items-center p-4 text-left bg-gray-50 hover:bg-gray-100">
                                                <span className="font-medium text-gray-800">{faq.question}</span>
                                                {openFaqs[faq.id] ? <ChevronDown className="h-5 w-5 text-gray-500" /> : <ChevronRight className="h-5 w-5 text-gray-500" />}
                                            </button>
                                            {openFaqs[faq.id] && (
                                                <div className="p-4 bg-white">
                                                    <p className="text-gray-600">{faq.answer}</p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-8 grid md:grid-cols-2 gap-6">
                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                                        <Star className="h-5 w-5 text-yellow-500 mr-2" /> Popular Articles
                                    </h3>
                                    <ul className="space-y-3">
                                        <li>
                                            <a href="/help/profile-optimization" className="text-gray-700 hover:text-yellow-600 flex items-center">
                                                <ChevronRight className="h-4 w-4 mr-1 text-yellow-500" />
                                                How to optimize your profile for better matches
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/help/messaging-tips" className="text-gray-700 hover:text-yellow-600 flex items-center">
                                                <ChevronRight className="h-4 w-4 mr-1 text-yellow-500" />
                                                Effective messaging tips for meaningful conversations
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/help/photo-guidelines" className="text-gray-700 hover:text-yellow-600 flex items-center">
                                                <ChevronRight className="h-4 w-4 mr-1 text-yellow-500" />
                                                Photo guidelines: What works best
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/help/verification" className="text-gray-700 hover:text-yellow-600 flex items-center">
                                                <ChevronRight className="h-4 w-4 mr-1 text-yellow-500" />
                                                Understanding our verification process
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                                        <HelpCircle className="h-5 w-5 text-yellow-500 mr-2" /> Video Tutorials
                                    </h3>
                                    <ul className="space-y-3">
                                        <li>
                                            <a href="/tutorials/getting-started" className="text-gray-700 hover:text-yellow-600 flex items-center">
                                                <ExternalLink className="h-4 w-4 mr-1 text-yellow-500" />
                                                Getting started with our platform
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/tutorials/profile-setup" className="text-gray-700 hover:text-yellow-600 flex items-center">
                                                <ExternalLink className="h-4 w-4 mr-1 text-yellow-500" />
                                                Creating an attractive profile
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/tutorials/search-filters" className="text-gray-700 hover:text-yellow-600 flex items-center">
                                                <ExternalLink className="h-4 w-4 mr-1 text-yellow-500" />
                                                Using search filters effectively
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/tutorials/premium-features" className="text-gray-700 hover:text-yellow-600 flex items-center">
                                                <ExternalLink className="h-4 w-4 mr-1 text-yellow-500" />
                                                Exploring premium features
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg shadow-md p-8 text-white">
                        <div className="md:flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold mb-2">Still Need Assistance?</h2>
                                <p className="mb-4 md:mb-0 max-w-xl">Our dedicated customer support team is available 7 days a week to help you with any questions or concerns.</p>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                <button onClick={() => navigate('/contact')} className="bg-white text-yellow-600 hover:bg-gray-100 font-medium py-2 px-6 rounded-md transition duration-300">
                                    Contact Support
                                </button>
                                <button
                                    onClick={() => navigate('/live-chat')}
                                    className="bg-transparent border border-white text-white hover:bg-white/10 font-medium py-2 px-6 rounded-md transition duration-300"
                                >
                                    Start Live Chat
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 bg-white rounded-lg shadow-md p-8">
                        <div className="flex items-center mb-6">
                            <AlertCircle className="h-6 w-6 text-red-500 mr-3" />
                            <h2 className="text-2xl font-semibold text-gray-800">Common Issues & Troubleshooting</h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="border-l-4 border-red-400 bg-red-50 p-4">
                                <h3 className="font-medium text-gray-800 mb-2">Login Problems</h3>
                                <p className="text-gray-600 text-sm mb-3">If you're having trouble logging in, try these steps:</p>
                                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                                    <li>Make sure you're using the correct email/phone and password</li>
                                    <li>Clear your browser cache and cookies</li>
                                    <li>Try using a different browser or device</li>
                                    <li>Reset your password using the "Forgot Password" option</li>
                                </ul>
                            </div>

                            <div className="border-l-4 border-red-400 bg-red-50 p-4">
                                <h3 className="font-medium text-gray-800 mb-2">Payment Issues</h3>
                                <p className="text-gray-600 text-sm mb-3">For payment-related problems:</p>
                                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                                    <li>Verify that your payment method is valid and has sufficient funds</li>
                                    <li>Check if your bank is blocking the transaction</li>
                                    <li>Try using a different payment method</li>
                                    <li>Contact your bank if the charge appears but your account isn't upgraded</li>
                                </ul>
                            </div>

                            <div className="border-l-4 border-red-400 bg-red-50 p-4">
                                <h3 className="font-medium text-gray-800 mb-2">Profile Verification Delays</h3>
                                <p className="text-gray-600 text-sm mb-3">If your profile verification is taking longer than expected:</p>
                                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                                    <li>Ensure all required documents are clearly visible and valid</li>
                                    <li>Check your email for any requests for additional information</li>
                                    <li>Verification typically takes 24-48 hours; please be patient</li>
                                    <li>Contact support if it's been more than 3 days</li>
                                </ul>
                            </div>

                            <div className="border-l-4 border-red-400 bg-red-50 p-4">
                                <h3 className="font-medium text-gray-800 mb-2">App Performance Issues</h3>
                                <p className="text-gray-600 text-sm mb-3">If the website or app is running slowly:</p>
                                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                                    <li>Check your internet connection</li>
                                    <li>Clear your browser cache or app data</li>
                                    <li>Update to the latest version of the app</li>
                                    <li>Try accessing the platform at a different time</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 bg-white rounded-lg shadow-md p-8 text-center">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Help Us Improve</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
                            We're constantly working to improve our help resources. If you have suggestions or feedback on how we can make our help center better, we'd love to hear from you.
                        </p>
                        <button onClick={() => navigate('/feedback')} className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium py-2 px-6 rounded-md transition duration-300">
                            Share Feedback
                        </button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Help;
