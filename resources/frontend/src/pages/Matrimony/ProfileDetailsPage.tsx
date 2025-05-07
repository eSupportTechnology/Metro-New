import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { User, MapPin, Search, Mail, Star, ChevronLeft, AlertCircle, X } from 'lucide-react';
import Footer from '../MainWeb/Footer/Footer';
import Header from '../MainWeb/NavBar/Header';
import { ProfileData, RouteParams } from '../../utilities/types/Matrimony/IProfileDetailsPage';
import { calculateAge, formatRelativeTime, getCountryFlag } from '../../utilities/types/Matrimony/dataUtils';
import apiConfig from '../../utilities/apiConfig';

const ProfileDetailsPage = () => {
    const { profileId } = useParams() as RouteParams;
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [showContactModal, setShowContactModal] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<string>('personal');
    const [contactMessage, setContactMessage] = useState<string>('');
    const [isSendingMessage, setIsSendingMessage] = useState<boolean>(false);

    useEffect(() => {
        const fetchProfileDetails = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(apiConfig.endpoints.profile.get(profileId));
                if (response.data && response.data.status === 'success') {
                    setProfile(response.data.data);
                } else {
                    setError('Profile not found');
                }
            } catch (err) {
                setError('Error fetching profile details');
                console.error('Error fetching profile details:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfileDetails();
    }, [profileId]);

    const handleContactMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContactMessage(e.target.value);
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSendingMessage(true);
        setTimeout(() => {
            console.log(`Sending message to profile ${profileId}: ${contactMessage}`);
            setIsSendingMessage(false);
            setShowContactModal(false);
            setContactMessage('');
        }, 1500);
    };

    const ContactModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">Contact Information</h3>
                    <button onClick={() => setShowContactModal(false)} className="text-gray-500 hover:text-gray-700">
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <Mail className="h-5 w-5 text-yellow-500 mr-3" />
                        <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-medium">{profile?.email}</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSendMessage} className="mt-4">
                    <div className="mb-4">
                        <label htmlFor="message" className="block text-gray-700 mb-2">
                            Send a Message
                        </label>
                        <textarea
                            id="message"
                            value={contactMessage}
                            onChange={handleContactMessageChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                            placeholder="Write your message here..."
                            rows={3}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium py-2 px-4 rounded-md transition duration-300 mb-4 flex justify-center items-center"
                        disabled={isSendingMessage}
                    >
                        {isSendingMessage ? (
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                        ) : null}
                        Send Message
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-500">Contact details are only shared with verified users. Please use discretion when contacting.</p>
                </div>
                <button onClick={() => setShowContactModal(false)} className="mt-4 w-full py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
                    Close
                </button>
            </div>
        </div>
    );

    if (isLoading) {
        return (
            <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
                <div className="animate-spin h-12 w-12 border-4 border-yellow-400 rounded-full border-t-transparent"></div>
                <p className="mt-4 text-gray-600">Loading profile details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 p-8 rounded-lg shadow-md text-red-800 flex flex-col items-center mx-auto max-w-2xl mt-20">
                <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
                <h2 className="text-2xl font-semibold mb-2">Error Loading Profile</h2>
                <p className="text-center mb-6">{error}</p>
                <button onClick={() => window.history.back()} className="px-6 py-2 bg-red-100 text-red-800 rounded-md hover:bg-red-200 flex items-center">
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Back to Search
                </button>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="bg-yellow-50 p-8 rounded-lg shadow-md text-yellow-800 flex flex-col items-center mx-auto max-w-2xl mt-20">
                <Search className="h-16 w-16 text-yellow-500 mb-4" />
                <h2 className="text-2xl font-semibold mb-2">Profile Not Found</h2>
                <p className="text-center mb-6">We couldn't find the profile you're looking for.</p>
                <button onClick={() => window.history.back()} className="px-6 py-2 bg-yellow-100 text-yellow-800 rounded-md hover:bg-yellow-200 flex items-center">
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Back to Search
                </button>
            </div>
        );
    }

    const matrimony = profile.matrimony;

    return (
        <div className="font-sans bg-gradient-to-b from-yellow-50 to-white min-h-screen">
            <Header />
            <div className="max-w-7xl mx-auto mt-14 pt-6 px-4">
                <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center mb-3 md:mb-0">
                            <button onClick={() => window.history.back()} className="flex items-center text-gray-500 hover:text-yellow-600 transition-colors" aria-label="Go back">
                                <ChevronLeft className="h-6 w-6 mr-2" />
                                <span className="text-xl font-semibold text-yellow-600">FindYourMatch</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto pt-6 px-4">
                <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
                    <div className="h-32 bg-gradient-to-r from-yellow-400 to-amber-500"></div>
                    <div className="relative px-6 pt-16 pb-6">
                        <div className="absolute -top-12 left-6">
                            <div className="h-24 w-24 rounded-full bg-white p-1 shadow-lg">
                                {profile.profile_picture ? (
                                    <img src={profile.profile_picture} alt={matrimony.display_name} className="h-full w-full rounded-full object-cover" />
                                ) : (
                                    <div className="h-full w-full rounded-full bg-gray-100 flex items-center justify-center">
                                        <User className="h-12 w-12 text-gray-400" />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="absolute top-4 right-6 text-xs text-white bg-black bg-opacity-50 rounded-full px-3 py-1 flex items-center">
                            <span> {formatRelativeTime(matrimony.created_at)}</span>
                        </div>

                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                                    {matrimony.display_name}
                                    {matrimony.boot_post === 1 && <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full">Featured Profile</span>}
                                    {matrimony.boot_post === 0 && <span className="ml-2 bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded-full">Basic Profile</span>}
                                </h1>
                                <div className="flex items-center text-sm text-gray-600 mt-1">
                                    <MapPin className="h-4 w-4 mr-1" />
                                    <span>
                                        {matrimony.city}, {matrimony.state_district}, {matrimony.country_of_residence} ({getCountryFlag(matrimony.country_of_residence)})
                                    </span>
                                </div>
                            </div>

                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setShowContactModal(true)}
                                    className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 px-4 py-2 rounded-md transition duration-300 flex items-center text-sm"
                                >
                                    <Mail className="h-4 w-4 mr-1" />
                                    Contact
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 text-center">
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <div className="text-sm text-gray-500">Age</div>
                                <div className="font-semibold">{calculateAge(matrimony.birthdate)} years</div>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <div className="text-sm text-gray-500">Height</div>
                                <div className="font-semibold">{matrimony.height || 'Not specified'}</div>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <div className="text-sm text-gray-500">Religion</div>
                                <div className="font-semibold">{matrimony.religion || 'Not specified'}</div>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <div className="text-sm text-gray-500">Education</div>
                                <div className="font-semibold">{matrimony.education_level || 'Not specified'}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md mb-6 p-1">
                    <div className="flex border-b">
                        <button
                            onClick={() => setActiveTab('personal')}
                            className={`flex-1 py-3 text-center font-medium text-sm ${activeTab === 'personal' ? 'text-yellow-600 border-b-2 border-yellow-600' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Personal Details
                        </button>
                        <button
                            onClick={() => setActiveTab('family')}
                            className={`flex-1 py-3 text-center font-medium text-sm ${activeTab === 'family' ? 'text-yellow-600 border-b-2 border-yellow-600' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Family Background
                        </button>
                        <button
                            onClick={() => setActiveTab('horoscope')}
                            className={`flex-1 py-3 text-center font-medium text-sm ${activeTab === 'horoscope' ? 'text-yellow-600 border-b-2 border-yellow-600' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Horoscope
                        </button>
                    </div>

                    <div className="p-6">
                        {activeTab === 'personal' && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="flex">
                                            <div className="w-40 text-gray-500">Full Name</div>
                                            <div>
                                                {profile.first_name} {profile.last_name}
                                            </div>
                                        </div>
                                        <div className="flex">
                                            <div className="w-40 text-gray-500">Gender</div>
                                            <div>{matrimony.gender}</div>
                                        </div>
                                        <div className="flex">
                                            <div className="w-40 text-gray-500">Date of Birth</div>
                                            <div>
                                                {matrimony.birthdate} ({calculateAge(matrimony.birthdate)} years)
                                            </div>
                                        </div>
                                        <div className="flex">
                                            <div className="w-40 text-gray-500">Civil Status</div>
                                            <div>{matrimony.civil_status}</div>
                                        </div>
                                        <div className="flex">
                                            <div className="w-40 text-gray-500">Height</div>
                                            <div>{matrimony.height}</div>
                                        </div>
                                        <div className="flex">
                                            <div className="w-40 text-gray-500">Ethnicity</div>
                                            <div>{matrimony.ethnicity}</div>
                                        </div>
                                        <div className="flex">
                                            <div className="w-40 text-gray-500">Religion</div>
                                            <div>{matrimony.religion}</div>
                                        </div>
                                        <div className="flex">
                                            <div className="w-40 text-gray-500">Caste</div>
                                            <div>{matrimony.caste}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t pt-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Education & Career</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="flex">
                                            <div className="w-40 text-gray-500">Education</div>
                                            <div>{matrimony.education_level}</div>
                                        </div>
                                        <div className="flex">
                                            <div className="w-40 text-gray-500">Profession</div>
                                            <div>{matrimony.profession}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t pt-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Lifestyle</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="flex">
                                            <div className="w-40 text-gray-500">Diet</div>
                                            <div>{matrimony.food_preference}</div>
                                        </div>
                                        <div className="flex">
                                            <div className="w-40 text-gray-500">Smoking</div>
                                            <div>{matrimony.smoking}</div>
                                        </div>
                                        <div className="flex">
                                            <div className="w-40 text-gray-500">Drinking</div>
                                            <div>{matrimony.drinking}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t pt-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Location</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="flex">
                                            <div className="w-40 text-gray-500">Country</div>
                                            <div>{matrimony.country_of_residence}</div>
                                        </div>
                                        <div className="flex">
                                            <div className="w-40 text-gray-500">State/Province</div>
                                            <div>{matrimony.state_district}</div>
                                        </div>
                                        <div className="flex">
                                            <div className="w-40 text-gray-500">City</div>
                                            <div>{matrimony.city}</div>
                                        </div>
                                        <div className="flex">
                                            <div className="w-40 text-gray-500">Visa Status</div>
                                            <div>{matrimony.visa_type}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'family' && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Father's Information</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="flex">
                                            <div className="w-40 text-gray-500">Ethnicity</div>
                                            <div>{profile.father.ethnicity}</div>
                                        </div>
                                        <div className="flex">
                                            <div className="w-40 text-gray-500">Religion</div>
                                            <div>{profile.father.religion}</div>
                                        </div>
                                        <div className="flex">
                                            <div className="w-40 text-gray-500">Caste</div>
                                            <div>{profile.father.caste}</div>
                                        </div>
                                        <div className="flex">
                                            <div className="w-40 text-gray-500">Country</div>
                                            <div>{profile.father.country_of_residence}</div>
                                        </div>
                                        <div className="flex">
                                            <div className="w-40 text-gray-500">Profession</div>
                                            <div>{profile.father.profession}</div>
                                        </div>
                                        <div className="flex">
                                            <div className="w-40 text-gray-500">Additional Info</div>
                                            <div>{profile.father.additional_info}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t pt-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Mother's Information</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="flex">
                                            <div className="w-40 text-gray-500">Ethnicity</div>
                                            <div>{profile.mother.ethnicity}</div>
                                        </div>
                                        <div className="flex">
                                            <div className="w-40 text-gray-500">Religion</div>
                                            <div>{profile.mother.religion}</div>
                                        </div>
                                        <div className="flex">
                                            <div className="w-40 text-gray-500">Caste</div>
                                            <div>{profile.mother.caste}</div>
                                        </div>
                                        <div className="flex">
                                            <div className="w-40 text-gray-500">Country</div>
                                            <div>{profile.mother.country_of_residence}</div>
                                        </div>
                                        <div className="flex">
                                            <div className="w-40 text-gray-500">Profession</div>
                                            <div>{profile.mother.profession}</div>
                                        </div>
                                        <div className="flex">
                                            <div className="w-40 text-gray-500">Additional Info</div>
                                            <div>{profile.mother.additional_info}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'horoscope' && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Horoscope Details</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="flex">
                                            <div className="w-40 text-gray-500">Birthdate</div>
                                            <div>{profile.horoscope.birthdate}</div>
                                        </div>
                                        <div className="flex">
                                            <div className="w-40 text-gray-500">Birth Time</div>
                                            <div>{profile.horoscope.birth_time}</div>
                                        </div>
                                        <div className="flex">
                                            <div className="w-40 text-gray-500">Birth Country</div>
                                            <div>{profile.horoscope.birth_country}</div>
                                        </div>
                                        <div className="flex">
                                            <div className="w-40 text-gray-500">Birth City</div>
                                            <div>{profile.horoscope.birth_city}</div>
                                        </div>
                                        <div className="flex">
                                            <div className="w-40 text-gray-500">Matching Required</div>
                                            <div>{profile.horoscope.horoscope_matching_required ? 'Yes' : 'No'}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t pt-6">
                                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                                        <div className="flex items-start">
                                            <Star className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                                            <div>
                                                <h4 className="font-medium text-yellow-800">Horoscope Matching Service</h4>
                                                <p className="text-sm text-yellow-700 mt-1">Our astrologers can provide a detailed compatibility analysis for a small fee.</p>
                                                <button className="mt-3 bg-yellow-400 hover:bg-yellow-500 text-gray-800 px-4 py-2 text-sm rounded-md transition duration-300">
                                                    Request Horoscope Matching
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {showContactModal && <ContactModal />}
            <Footer />
        </div>
    );
};

export default ProfileDetailsPage;
