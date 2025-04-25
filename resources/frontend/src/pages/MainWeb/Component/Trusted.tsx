import { Star } from 'lucide-react';

const Trusted = () => {
    return (
        <div>
            <section className="py-12 md:py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-900">
                            Trusted By <span className="text-yellow-600">Thousands</span> Of Happy Customers
                        </h2>
                        <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">See what our users have to say about their experience</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                            <div className="flex items-center mb-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star key={star} className="h-5 w-5 text-yellow-500" fill="#eab308" />
                                ))}
                            </div>
                            <p className="text-gray-600 mb-6 italic">
                                "After trying multiple matrimony services, this platform stood out with its genuine profiles and excellent privacy features. I found my life partner within three
                                months!"
                            </p>
                            <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full bg-gray-200 mr-3">
                                    <img src="/api/placeholder/40/40" alt="User" className="rounded-full" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900">Ramesh Perera</h4>
                                    <p className="text-sm text-gray-500">Colombo</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                            <div className="flex items-center mb-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star key={star} className="h-5 w-5 text-yellow-500" fill="#eab308" />
                                ))}
                            </div>
                            <p className="text-gray-600 mb-6 italic">
                                "The customer service team was extremely helpful throughout my journey. They guided me through the process and helped me find the perfect match for my daughter."
                            </p>
                            <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full bg-gray-200 mr-3">
                                    <img src="/api/placeholder/40/40" alt="User" className="rounded-full" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900">Kamala Jayawardena</h4>
                                    <p className="text-sm text-gray-500">Kandy</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                            <div className="flex items-center mb-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star key={star} className="h-5 w-5 text-yellow-500" fill="#eab308" />
                                ))}
                            </div>
                            <p className="text-gray-600 mb-6 italic">
                                "As someone living abroad, I was worried about finding a partner from Sri Lanka. This platform made the process seamless with verified profiles and easy communication
                                tools."
                            </p>
                            <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full bg-gray-200 mr-3">
                                    <img src="/api/placeholder/40/40" alt="User" className="rounded-full" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900">Pradeep Fernando</h4>
                                    <p className="text-sm text-gray-500">Australia</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Trusted;
