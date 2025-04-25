const Faq = () => {
    return (
        <div>
            <section className="py-12 md:py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-900">
                            Quick Answers For <span className="text-yellow-600">Curious Minds</span>
                        </h2>
                        <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">Find answers to our most frequently asked questions</p>
                    </div>

                    <div className="max-w-3xl mx-auto">
                        <div className="space-y-4">
                            {[
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
                            ].map((faq, index) => (
                                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <button className="w-full px-6 py-4 text-left font-medium text-gray-900 flex justify-between items-center" onClick={() => toggleQuestion(index)}>
                                        {faq.question}
                                        <ChevronRight className={`h-5 w-5 text-yellow-600 transition-transform ${activeQuestion === index ? 'rotate-90' : ''}`} />
                                    </button>
                                    {activeQuestion === index && (
                                        <div className="px-6 py-4 bg-yellow-50 border-t border-yellow-100">
                                            <p className="text-gray-600">{faq.answer}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="text-center mt-8">
                            <a href="#" className="inline-flex items-center text-yellow-600 font-medium hover:text-yellow-700">
                                <span>View All FAQs</span>
                                <ChevronRight className="ml-1 h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Faq;
