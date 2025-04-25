import { Users, Lock, Star, Clock, Heart, Info } from 'lucide-react';

const Benefits = () => {
    return (
        <div>
            <section className="py-12 md:py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">
                            Featured Product <span className="text-yellow-600">Benefits</span>
                        </h2>
                        <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">Discover why thousands choose our platform to find their life partner</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-yellow-500 hover:shadow-lg transition">
                            <div className="bg-yellow-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                                <Users className="h-8 w-8 text-yellow-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Verified Profiles</h3>
                            <p className="text-gray-600">All profiles undergo a rigorous verification process to ensure authenticity and build trust.</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-yellow-500 hover:shadow-lg transition">
                            <div className="bg-yellow-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                                <Lock className="h-8 w-8 text-yellow-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Privacy Controls</h3>
                            <p className="text-gray-600">Advanced privacy settings let you control who sees your information and how to contact you.</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-yellow-500 hover:shadow-lg transition">
                            <div className="bg-yellow-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                                <Star className="h-8 w-8 text-yellow-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Matching</h3>
                            <p className="text-gray-600">Our intelligent algorithm suggests compatible matches based on your preferences and values.</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-yellow-500 hover:shadow-lg transition">
                            <div className="bg-yellow-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                                <Clock className="h-8 w-8 text-yellow-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">24/7 Support</h3>
                            <p className="text-gray-600">Our dedicated customer support team is available around the clock to assist with any questions.</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-yellow-500 hover:shadow-lg transition">
                            <div className="bg-yellow-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                                <Heart className="h-8 w-8 text-yellow-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Success Stories</h3>
                            <p className="text-gray-600">Join thousands of happy couples who found their perfect match through our platform.</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-yellow-500 hover:shadow-lg transition">
                            <div className="bg-yellow-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                                <Info className="h-8 w-8 text-yellow-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Detailed Profiles</h3>
                            <p className="text-gray-600">Comprehensive profiles with all the important details to help you make informed decisions.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Benefits;
