import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Calendar, MapPin, GraduationCap, Briefcase, Heart, Users, Star, Globe, Home, Phone, Mail, Loader2, Check, X } from 'lucide-react';
import Header from '../NavBar/Header';
import Footer from '../Footer/Footer';
import profileService, { MatrimonyProfile } from '../../../services/Profile/ProfileService';

const ProfilePage = () => {
    const { userId } = useParams<{ userId: string }>();
    const navigate = useNavigate();
    const [profile, setProfile] = useState<MatrimonyProfile | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        if (userId) {
            fetchProfile();
        }
    }, [userId]);

    const fetchProfile = async () => {
        try {
            setIsLoading(true);
            setError('');
            const data = await profileService.getProfileByUserId(userId!);
            setProfile(data);
        } catch (err: any) {
            setError('Failed to load profile. Please try again later.');
            console.error('Error fetching profile:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const calculateAge = (birthdate: string): number => {
        const today = new Date();
        const birthDate = new Date(birthdate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header />
                <div className="pt-24 pb-16">
                    <div className="flex justify-center items-center py-32">
                        <Loader2 className="h-10 w-10 animate-spin text-yellow-600" />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (error || !profile) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header />
                <div className="pt-24 pb-16">
                    <div className="max-w-2xl mx-auto px-6 py-32 text-center">
                        <h1 className="text-3xl font-light text-gray-900 mb-4">Profile Not Found</h1>
                        <p className="text-gray-600 mb-8">{error || 'The profile you are looking for does not exist.'}</p>
                        <button onClick={() => navigate('/create-add')} className="inline-flex items-center bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg transition-colors">
                            <ArrowLeft className="h-5 w-5 mr-2" />
                            Create Profile
                        </button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <main className="pt-24 pb-16">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Navigation */}
                    <nav className="mb-8">
                        <button onClick={() => navigate('/view-add')} className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                            <ArrowLeft className="h-5 w-5 mr-2" />
                            All Profiles
                        </button>
                    </nav>

                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                <div className="relative">
                                    {profile.profile_picture ? (
                                        <img src={profile.profile_picture} alt={profile.matrimony.display_name} className="w-full h-96 object-cover" />
                                    ) : (
                                        <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                                            <User className="h-24 w-24 text-gray-400" />
                                        </div>
                                    )}
                                    {profile.matrimony.is_active && <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">Active</div>}
                                </div>

                                <div className="p-6">
                                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{profile.matrimony.display_name}</h1>
                                    <p className="text-gray-600 mb-4">
                                        {calculateAge(profile.matrimony.birthdate)} years • {profile.matrimony.gender}
                                    </p>

                                    <div className="space-y-3">
                                        <div className="flex items-center text-gray-600">
                                            <MapPin className="h-5 w-5 mr-3 text-gray-400" />
                                            <span>
                                                {profile.matrimony.city}, {profile.matrimony.state_district}
                                            </span>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <Globe className="h-5 w-5 mr-3 text-gray-400" />
                                            <span>{profile.matrimony.country_of_residence}</span>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <Heart className="h-5 w-5 mr-3 text-gray-400" />
                                            <span>{profile.matrimony.civil_status}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
                                <div className="space-y-3">
                                    <div className="flex items-center text-gray-600">
                                        <Mail className="h-5 w-5 mr-3 text-gray-400" />
                                        <span className="break-all">{profile.email}</span>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-500 mt-4">Account created by: {profile.matrimony.account_created_by}</p>
                            </div>
                        </div>

                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Details</h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-sm text-gray-500">Ethnicity</label>
                                        <p className="text-gray-900 font-medium">{profile.matrimony.ethnicity}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-500">Religion</label>
                                        <p className="text-gray-900 font-medium">{profile.matrimony.religion}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-500">Caste</label>
                                        <p className="text-gray-900 font-medium">{profile.matrimony.caste}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-500">Height</label>
                                        <p className="text-gray-900 font-medium">{profile.matrimony.height}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Education & Career</h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="flex items-start">
                                        <GraduationCap className="h-5 w-5 mr-3 text-gray-400 mt-1" />
                                        <div>
                                            <label className="text-sm text-gray-500">Education</label>
                                            <p className="text-gray-900 font-medium">{profile.matrimony.education_level}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <Briefcase className="h-5 w-5 mr-3 text-gray-400 mt-1" />
                                        <div>
                                            <label className="text-sm text-gray-500">Profession</label>
                                            <p className="text-gray-900 font-medium">{profile.matrimony.profession}</p>
                                        </div>
                                    </div>
                                </div>
                                {profile.matrimony.visa_type && (
                                    <div className="mt-4">
                                        <label className="text-sm text-gray-500">Visa Status</label>
                                        <p className="text-gray-900 font-medium">{profile.matrimony.visa_type}</p>
                                    </div>
                                )}
                            </div>

                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Lifestyle</h2>
                                <div className="grid md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="text-sm text-gray-500">Diet</label>
                                        <p className="text-gray-900 font-medium">{profile.matrimony.food_preference}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-500">Drinking</label>
                                        <p className="text-gray-900 font-medium">{profile.matrimony.drinking}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-500">Smoking</label>
                                        <p className="text-gray-900 font-medium">{profile.matrimony.smoking}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Family Details</h2>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-800 mb-4">Father's Details</h3>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="text-sm text-gray-500">Profession</label>
                                                <p className="text-gray-900">{profile.father.profession || 'Not specified'}</p>
                                            </div>
                                            <div>
                                                <label className="text-sm text-gray-500">Country of Residence</label>
                                                <p className="text-gray-900">{profile.father.country_of_residence || 'Not specified'}</p>
                                            </div>
                                            {profile.father.additional_info && (
                                                <div>
                                                    <label className="text-sm text-gray-500">Additional Info</label>
                                                    <p className="text-gray-900">{profile.father.additional_info}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-800 mb-4">Mother's Details</h3>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="text-sm text-gray-500">Profession</label>
                                                <p className="text-gray-900">{profile.mother.profession || 'Not specified'}</p>
                                            </div>
                                            <div>
                                                <label className="text-sm text-gray-500">Country of Residence</label>
                                                <p className="text-gray-900">{profile.mother.country_of_residence || 'Not specified'}</p>
                                            </div>
                                            {profile.mother.additional_info && (
                                                <div>
                                                    <label className="text-sm text-gray-500">Additional Info</label>
                                                    <p className="text-gray-900">{profile.mother.additional_info}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Horoscope Information</h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-sm text-gray-500">Birth Date</label>
                                        <p className="text-gray-900 font-medium">
                                            {profile.horoscope.birthdate
                                                ? new Date(profile.horoscope.birthdate).toLocaleDateString('en-US', {
                                                      year: 'numeric',
                                                      month: 'long',
                                                      day: 'numeric',
                                                  })
                                                : 'Not specified'}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-500">Birth Time</label>
                                        <p className="text-gray-900 font-medium">{profile.horoscope.birth_time || 'Not specified'}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-500">Birth City</label>
                                        <p className="text-gray-900 font-medium">{profile.horoscope.birth_city || 'Not specified'}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-500">Birth Country</label>
                                        <p className="text-gray-900 font-medium">{profile.horoscope.birth_country || 'Not specified'}</p>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="text-sm text-gray-500">Horoscope Matching Required</label>
                                        <div className="flex items-center mt-1">
                                            {profile.horoscope.horoscope_matching_required ? <Check className="h-5 w-5 text-green-500 mr-2" /> : <X className="h-5 w-5 text-gray-400 mr-2" />}
                                            <p className="text-gray-900 font-medium">{profile.horoscope.horoscope_matching_required ? 'Yes' : 'No'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ProfilePage;
