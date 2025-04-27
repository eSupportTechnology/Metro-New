import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Search } from 'lucide-react';

interface FaqItem {
    question: string;
    answer: string;
}

const Faq: React.FC = () => {
    const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const toggleQuestion = (index: number): void => {
        setActiveQuestion(activeQuestion === index ? null : index);
    };

    const faqItems: FaqItem[] = [
        {
            question: 'How do I create an account?',
            answer: "Creating an account is simple! Click on the 'Register Free' button, fill in your basic details, verify your email, and complete your profile. The entire process takes less than 10 minutes.",
        },
        {
            question: 'Is my information secure on this platform?',
            answer: 'Absolutely! We implement industry-standard security protocols to protect your data. You have complete control over who can view your profile details, and we never share your contact information without your explicit permission.',
        },
        {
            question: 'How can I search for matches?',
            answer: 'Our platform offers multiple search options. You can use basic search filters like age, religion, and location, or try our advanced search with more specific preferences like education, profession, and lifestyle choices.',
        },
        {
            question: 'What is the verification process for profiles?',
            answer: 'We verify all profiles through a combination of ID verification, phone verification, and manual review. Premium members undergo additional verification checks to ensure maximum authenticity.',
        },
        {
            question: 'Are there any success stories from your platform?',
            answer: "Yes! We have thousands of success stories from couples who met through our platform. You can browse through them in our 'Success Stories' section to see how others found their perfect match.",
        },
        {
            question: 'Can I hide my profile temporarily?',
            answer: "Yes, you can! Go to 'Privacy Settings' in your account dashboard and toggle the 'Hide Profile' option. You can make your profile visible again whenever you're ready to continue your search.",
        },
        {
            question: 'What membership plans do you offer?',
            answer: "We offer three tiers: Free, Premium, and Platinum. Each plan provides different levels of access and features. Visit our 'Membership' page to compare plans and find the one that best suits your needs.",
        },
        {
            question: 'How do I cancel my subscription?',
            answer: "You can cancel your subscription anytime by going to 'Account Settings' > 'Subscription' and clicking on 'Cancel Plan'. Your premium features will remain active until the end of your current billing cycle.",
        },
    ];

    const filteredFaqs = faqItems.filter((faq) => faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || faq.answer.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div>
            <section className="py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                            Quick Answers For <span className="text-yellow-600">Curious Minds</span>
                        </h2>
                        <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">Find answers to our most frequently asked questions</p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-12 items-start">
                        <div className="w-full lg:w-1/2">
                            <div className="relative mb-8">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                                    placeholder="Search questions..."
                                    value={searchQuery}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            <div className="space-y-4">
                                {filteredFaqs.length > 0 ? (
                                    filteredFaqs.map((faq, index) => (
                                        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
                                            <button className="w-full px-6 py-4 text-left font-medium text-gray-900 flex justify-between items-center" onClick={() => toggleQuestion(index)}>
                                                <span className="pr-8">{faq.question}</span>
                                                {activeQuestion === index ? (
                                                    <ChevronDown className="h-5 w-5 text-yellow-600 transition-transform flex-shrink-0" />
                                                ) : (
                                                    <ChevronRight className="h-5 w-5 text-yellow-600 transition-transform flex-shrink-0" />
                                                )}
                                            </button>
                                            {activeQuestion === index && (
                                                <div className="px-6 py-4 bg-yellow-50 border-t border-yellow-100 animate-fadeIn">
                                                    <p className="text-gray-600">{faq.answer}</p>
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-10">
                                        <p className="text-gray-500">No matching questions found. Try a different search term.</p>
                                    </div>
                                )}
                            </div>

                            {filteredFaqs.length > 0 && searchQuery === '' && (
                                <div className="text-center mt-8">
                                    <a href="#" className="inline-flex items-center text-yellow-600 font-medium hover:text-yellow-700">
                                        <span>View All FAQs</span>
                                        <ChevronRight className="ml-1 h-5 w-5" />
                                    </a>
                                </div>
                            )}
                        </div>

                        <div className="w-full md:w-1/2 text-center md:text-left mb-12 md:mb-0">
                            <div className="relative">
                                <div className="aspect-w-4 aspect-h-5 rounded-xl overflow-hidden shadow-xl">
                                    <img src="https://blissfulplans.com/wp-content/uploads/2023/08/Sri-lanka.webp" alt="Customer support" className="object-cover w-full h-full" />
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg">
                                        <h3 className="text-xl font-semibold text-gray-900">Still have questions?</h3>
                                        <p className="mt-2 text-gray-600">Our support team is here to help you 24/7</p>
                                        <button className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
                                            Contact Support
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Faq;
