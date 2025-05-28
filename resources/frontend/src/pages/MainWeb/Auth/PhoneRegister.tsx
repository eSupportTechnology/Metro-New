import React, { useState } from 'react';
import { ChevronDown, ArrowLeft, User, Mail, Lock, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../../store/authSlice';
import Header from '../NavBar/Header';
import Footer from '../Footer/Footer';
import { sendOtp, verifyOtp, phoneRegister } from '../../../services/authService';

const PhoneRegister: React.FC = () => {
    const [registrationStep, setRegistrationStep] = useState<'phone' | 'otp' | 'details'>('phone');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [countryCode, setCountryCode] = useState<string>('+94');
    const [otpCode, setOtpCode] = useState<string>('');
    const [otpTimer, setOtpTimer] = useState<number>(0);
    const [religion, setReligion] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    React.useEffect(() => {
        let interval: NodeJS.Timeout;
        if (otpTimer > 0) {
            interval = setInterval(() => {
                setOtpTimer(otpTimer - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [otpTimer]);

    const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        setPhoneNumber(value);
    };

    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
        setOtpCode(value);
    };

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const fullPhoneNumber = countryCode + phoneNumber;
            await sendOtp(fullPhoneNumber, 'register');
            setRegistrationStep('otp');
            setOtpTimer(300);
        } catch (err: any) {
            setError(err.message || 'Failed to send OTP. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const fullPhoneNumber = countryCode + phoneNumber;
            await verifyOtp(fullPhoneNumber, otpCode, 'register');
            setRegistrationStep('details');
        } catch (err: any) {
            setError(err.message || 'Invalid OTP. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCompleteRegistration = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            setIsLoading(false);
            return;
        }

        try {
            const fullPhoneNumber = countryCode + phoneNumber;
            const data = await phoneRegister({
                phone: fullPhoneNumber,
                otp_code: otpCode,
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password,
                password_confirmation: confirmPassword,
                religion: religion,
            });

            handleSuccessfulRegistration(data);
        } catch (err: any) {
            setError(err.message || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendOtp = async () => {
        setIsLoading(true);
        setError('');

        try {
            const fullPhoneNumber = countryCode + phoneNumber;
            await sendOtp(fullPhoneNumber, 'register');
            setOtpTimer(300);
        } catch (err: any) {
            setError(err.message || 'Failed to resend OTP.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSuccessfulRegistration = (data: any) => {
        const authData = {
            userId: data.user?.id || '',
            userRole: data.user?.role_as || 2,
            token: data.access_token || '',
            firstName: data.user?.first_name || '',
            lastName: data.user?.last_name || '',
            email: data.user?.email || '',
        };

        localStorage.setItem('userId', authData.userId);
        localStorage.setItem('token', authData.token);

        dispatch(setAuth(authData));
        navigate(`/signin`);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="font-sans bg-gradient-to-b from-yellow-50 to-white min-h-screen">
            <Header />

            <main className="pt-24 pb-16 px-4">
                <div className="max-w-md mx-auto">
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                            {registrationStep === 'phone' && 'Register with Phone'}
                            {registrationStep === 'otp' && 'Verify Your Phone'}
                            {registrationStep === 'details' && 'Complete Your Profile'}
                        </h2>

                        <div className="flex justify-center mb-8">
                            <div className="flex items-center">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                        registrationStep === 'phone' ? 'bg-yellow-400 text-gray-800' : 'bg-yellow-400 text-gray-800'
                                    }`}
                                >
                                    1
                                </div>
                                <div className={`w-12 h-1 mx-2 ${registrationStep === 'otp' || registrationStep === 'details' ? 'bg-yellow-400' : 'bg-gray-300'}`}></div>
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                        registrationStep === 'otp' ? 'bg-yellow-400 text-gray-800' : registrationStep === 'details' ? 'bg-yellow-400 text-gray-800' : 'bg-gray-300 text-gray-600'
                                    }`}
                                >
                                    2
                                </div>
                                <div className={`w-12 h-1 mx-2 ${registrationStep === 'details' ? 'bg-yellow-400' : 'bg-gray-300'}`}></div>
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                        registrationStep === 'details' ? 'bg-yellow-400 text-gray-800' : 'bg-gray-300 text-gray-600'
                                    }`}
                                >
                                    3
                                </div>
                            </div>
                        </div>

                        {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">{error}</div>}

                        {registrationStep === 'phone' && (
                            <form onSubmit={handleSendOtp}>
                                <div className="mb-4">
                                    <label htmlFor="phone" className="block text-gray-700 mb-2">
                                        <Phone className="inline h-4 w-4 mr-2" />
                                        Phone Number
                                    </label>
                                    <div className="flex">
                                        <div className="relative">
                                            <button type="button" className="h-full px-3 py-2 inline-flex items-center border border-gray-300 bg-gray-100 text-gray-700 rounded-l-md">
                                                {countryCode} <ChevronDown className="ml-1 h-4 w-4" />
                                            </button>
                                        </div>
                                        <input
                                            type="tel"
                                            id="phone"
                                            value={phoneNumber}
                                            onChange={handlePhoneNumberChange}
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                            placeholder="Enter phone number"
                                            required
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium py-2 px-4 rounded-md transition duration-300 mb-4 flex justify-center items-center"
                                    disabled={isLoading || phoneNumber.length < 9}
                                >
                                    {isLoading ? (
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                    ) : null}
                                    Send Verification Code
                                </button>
                            </form>
                        )}

                        {registrationStep === 'otp' && (
                            <form onSubmit={handleVerifyOtp}>
                                <div className="mb-4">
                                    <label htmlFor="otp" className="block text-gray-700 mb-2">
                                        Enter 6-digit code sent to {countryCode}
                                        {phoneNumber}
                                    </label>
                                    <input
                                        type="text"
                                        id="otp"
                                        value={otpCode}
                                        onChange={handleOtpChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-center text-2xl tracking-widest"
                                        placeholder="000000"
                                        maxLength={6}
                                        required
                                    />
                                </div>

                                {otpTimer > 0 && <div className="mb-4 text-center text-sm text-gray-600">Resend OTP in {formatTime(otpTimer)}</div>}

                                <button
                                    type="submit"
                                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium py-2 px-4 rounded-md transition duration-300 mb-4 flex justify-center items-center"
                                    disabled={isLoading || otpCode.length !== 6}
                                >
                                    {isLoading ? (
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                    ) : null}
                                    Verify Phone Number
                                </button>

                                <div className="flex justify-between text-center text-sm">
                                    <button type="button" className="text-gray-600 hover:text-gray-800 hover:underline" onClick={() => setRegistrationStep('phone')}>
                                        Change phone number
                                    </button>
                                    {otpTimer === 0 && (
                                        <button type="button" className="text-yellow-600 hover:text-yellow-700 hover:underline" onClick={handleResendOtp} disabled={isLoading}>
                                            Resend OTP
                                        </button>
                                    )}
                                </div>
                            </form>
                        )}

                        {registrationStep === 'details' && (
                            <form onSubmit={handleCompleteRegistration}>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label htmlFor="firstName" className="block text-gray-700 mb-2">
                                            <User className="inline h-4 w-4 mr-2" />
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                            placeholder="First name"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className="block text-gray-700 mb-2">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                            placeholder="Last name"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="religion" className="block text-gray-700 mb-2">
                                        Religion
                                    </label>
                                    <select
                                        id="religion"
                                        name="religion"
                                        value={religion}
                                        onChange={(e) => setReligion(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                        required
                                    >
                                        <option value="">Select Religion</option>
                                        <option value="Buddhist">Buddhist</option>
                                        <option value="Hindu">Hindu</option>
                                        <option value="Islam">Islam</option>
                                        <option value="Christian">Christian</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-gray-700 mb-2">
                                        <Mail className="inline h-4 w-4 mr-2" />
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="password" className="block text-gray-700 mb-2">
                                        <Lock className="inline h-4 w-4 mr-2" />
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                        placeholder="Create a password"
                                        minLength={8}
                                        required
                                    />
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                        placeholder="Confirm your password"
                                        minLength={8}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium py-2 px-4 rounded-md transition duration-300 mb-4 flex justify-center items-center"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                    ) : null}
                                    Create Account
                                </button>
                            </form>
                        )}

                        <div className="flex items-center justify-center">
                            <button type="button" className="inline-flex items-center text-gray-600 text-sm hover:text-gray-800" onClick={() => navigate('/signin')}>
                                <ArrowLeft className="mr-1 h-4 w-4" /> Back to Sign In
                            </button>
                        </div>
                    </div>

                    <div className="mt-6 bg-white rounded-lg shadow-md p-6 text-center">
                        <p className="text-gray-600 text-sm">
                            Already have an account?{' '}
                            <button type="button" className="text-yellow-600 hover:text-yellow-700 font-medium" onClick={() => navigate('/signin')}>
                                Sign in here
                            </button>
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PhoneRegister;
