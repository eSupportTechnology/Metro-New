import React, { useState } from 'react';
import { ChevronDown, ArrowLeft, Phone, Shield, UserCheck, DollarSign, Headphones, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setAuth } from '../../../store/authSlice';
import Header from '../NavBar/Header';
import Footer from '../Footer/Footer';
import { UserSignIn, sendOtp, verifyOtp, sendForgotPasswordOtp, verifyForgotPasswordOtp, resetForgotPassword } from '../../../services/authService';

const SignIn: React.FC = () => {
    const [authMethod, setAuthMethod] = useState<'phone' | 'email'>('phone');
    const [authStep, setAuthStep] = useState<'phone' | 'otp' | 'email' | 'forgot-password' | 'forgot-otp' | 'reset-password'>('phone');

    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [countryCode, setCountryCode] = useState<string>('+94');
    const [otpCode, setOtpCode] = useState<string>('');
    const [otpSent, setOtpSent] = useState<boolean>(false);
    const [otpTimer, setOtpTimer] = useState<number>(0);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    // Forgot password states
    const [forgotPhoneNumber, setForgotPhoneNumber] = useState<string>('');
    const [forgotOtpCode, setForgotOtpCode] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
    const [forgotOtpTimer, setForgotOtpTimer] = useState<number>(0);

    const [isLoading, setIsLoading] = useState<boolean>(false);

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

    React.useEffect(() => {
        let interval: NodeJS.Timeout;
        if (forgotOtpTimer > 0) {
            interval = setInterval(() => {
                setForgotOtpTimer(forgotOtpTimer - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [forgotOtpTimer]);

    const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        setPhoneNumber(value);
    };

    const handleForgotPhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        setForgotPhoneNumber(value);
    };

    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
        setOtpCode(value);
    };

    const handleForgotOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
        setForgotOtpCode(value);
    };

    const switchAuthMethod = (method: 'phone' | 'email') => {
        setAuthMethod(method);
        setAuthStep(method);
        setOtpSent(false);
        setOtpTimer(0);
    };

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const fullPhoneNumber = countryCode + phoneNumber;
            await sendOtp(fullPhoneNumber, 'login');
            setOtpSent(true);
            setAuthStep('otp');
            setOtpTimer(300);
            toast.success('OTP sent successfully to your phone!', {
                position: 'top-right',
                autoClose: 3000,
            });
        } catch (err: any) {
            toast.error(err.message || 'Failed to send OTP. Please try again.', {
                position: 'top-right',
                autoClose: 5000,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const fullPhoneNumber = countryCode + phoneNumber;
            const data = await verifyOtp(fullPhoneNumber, otpCode, 'login');
            handleSuccessfulLogin(data);
        } catch (err: any) {
            toast.error(err.message || 'Invalid OTP. Please try again.', {
                position: 'top-right',
                autoClose: 5000,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendOtp = async () => {
        setIsLoading(true);

        try {
            const fullPhoneNumber = countryCode + phoneNumber;
            await sendOtp(fullPhoneNumber, 'login');
            setOtpTimer(300);
            toast.success('OTP resent successfully!', {
                position: 'top-right',
                autoClose: 3000,
            });
        } catch (err: any) {
            toast.error(err.message || 'Failed to resend OTP.', {
                position: 'top-right',
                autoClose: 5000,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const data = await UserSignIn(email, password);
            handleSuccessfulLogin(data);
        } catch (err: any) {
            if (err.message === 'Unauthorized') {
                toast.error('Invalid credentials. Please check your details and try again.', {
                    position: 'top-right',
                    autoClose: 5000,
                });
            } else {
                toast.error('An error occurred. Please try again later.', {
                    position: 'top-right',
                    autoClose: 5000,
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendForgotPasswordOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const fullPhoneNumber = countryCode + forgotPhoneNumber;
            const data = await sendForgotPasswordOtp(fullPhoneNumber);

            setAuthStep('forgot-otp');
            setForgotOtpTimer(300);
            toast.success(data.message, {
                position: 'top-right',
                autoClose: 3000,
            });
        } catch (err: any) {
            toast.error(err.message || 'Failed to send OTP. Please try again.', {
                position: 'top-right',
                autoClose: 5000,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyForgotPasswordOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const fullPhoneNumber = countryCode + forgotPhoneNumber;
            const data = await verifyForgotPasswordOtp(fullPhoneNumber, forgotOtpCode);

            setAuthStep('reset-password');
            toast.success(data.message, {
                position: 'top-right',
                autoClose: 3000,
            });
        } catch (err: any) {
            toast.error(err.message || 'Failed to verify OTP. Please try again.', {
                position: 'top-right',
                autoClose: 5000,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        if (newPassword !== confirmNewPassword) {
            toast.error('Passwords do not match.', {
                position: 'top-right',
                autoClose: 5000,
            });
            setIsLoading(false);
            return;
        }

        try {
            const fullPhoneNumber = countryCode + forgotPhoneNumber;
            const data = await resetForgotPassword(fullPhoneNumber, forgotOtpCode, newPassword, confirmNewPassword);

            toast.success(data.message, {
                position: 'top-right',
                autoClose: 3000,
            });

            setAuthStep('email');
            setAuthMethod('email');
            setForgotPhoneNumber('');
            setForgotOtpCode('');
            setNewPassword('');
            setConfirmNewPassword('');
        } catch (err: any) {
            toast.error(err.message || 'Failed to reset password. Please try again.', {
                position: 'top-right',
                autoClose: 5000,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendForgotPasswordOtp = async () => {
        setIsLoading(true);

        try {
            const fullPhoneNumber = countryCode + forgotPhoneNumber;
            const data = await sendForgotPasswordOtp(fullPhoneNumber);

            setForgotOtpTimer(300);
            toast.success('OTP resent successfully!', {
                position: 'top-right',
                autoClose: 3000,
            });
        } catch (err: any) {
            toast.error(err.message || 'Failed to resend OTP.', {
                position: 'top-right',
                autoClose: 5000,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSuccessfulLogin = (data: any) => {
        const authData = {
            userId: data.userId || data.user?.id || '',
            userRole: data.userRole || data.user?.role_as || 0,
            token: data.token || data.access_token || '',
            firstName: data.firstName || data.user?.first_name || '',
            lastName: data.lastName || data.user?.last_name || '',
            email: data.email || data.user?.email || '',
            religion: data.religion || data.user?.religion || '',
            phone: data.phone || data.user?.phone || '',
        };

        localStorage.setItem('userId', authData.userId);
        localStorage.setItem('token', authData.token);

        if (authData.religion) {
            localStorage.setItem('religion', authData.religion);
        }

        dispatch(setAuth(authData));

        toast.success('Sign in successful! Welcome back!', {
            position: 'top-right',
            autoClose: 2000,
        });

        setTimeout(() => {
            if (authData.userRole === 1) {
                navigate('/admin/dashboard');
            } else if (authData.userRole === 2) {
                navigate(`/my-profile/${authData.userId}`);
            } else {
                navigate('/');
            }
        }, 2000);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const showForgotPassword = () => {
        setAuthStep('forgot-password');
    };

    const backToLogin = () => {
        setAuthStep('email');
        setAuthMethod('email');
        setForgotPhoneNumber('');
        setForgotOtpCode('');
        setNewPassword('');
        setConfirmNewPassword('');
        setForgotOtpTimer(0);
    };

    return (
        <div className="font-sans bg-gradient-to-b from-yellow-50 to-white min-h-screen">
            <Header />

            <main className="pt-24 pb-16 px-4">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
                    <div className="w-full max-w-md mx-auto">
                        <div className="bg-white rounded-lg shadow-md p-8">
                            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                                {authStep === 'phone' && 'Continue with Phone'}
                                {authStep === 'otp' && 'Enter Verification Code'}
                                {authStep === 'email' && 'Sign In with Email'}
                                {authStep === 'forgot-password' && 'Forgot Password'}
                                {authStep === 'forgot-otp' && 'Verify Phone Number'}
                                {authStep === 'reset-password' && 'Reset Password'}
                            </h2>

                            {authStep === 'phone' && (
                                <form onSubmit={handleSendOtp}>
                                    <div className="mb-4">
                                        <label htmlFor="phone" className="block text-gray-700 mb-2">
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
                                        Send OTP
                                    </button>

                                    <div className="text-center mb-4">
                                        <button type="button" className="text-gray-600 text-sm hover:text-gray-800 hover:underline" onClick={() => switchAuthMethod('email')}>
                                            Login with email instead
                                        </button>
                                    </div>
                                </form>
                            )}

                            {authStep === 'otp' && (
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
                                        Verify & Sign In
                                    </button>

                                    <div className="flex justify-between text-center text-sm">
                                        <button type="button" className="text-gray-600 hover:text-gray-800 hover:underline" onClick={() => setAuthStep('phone')}>
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

                            {authStep === 'email' && (
                                <form onSubmit={handleEmailLogin}>
                                    <div className="mb-4">
                                        <label htmlFor="email" className="block text-gray-700 mb-2">
                                            Email
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

                                    <div className="mb-6">
                                        <label htmlFor="password" className="block text-gray-700 mb-2">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            id="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                            placeholder="Enter your password"
                                            required
                                        />
                                        <div className="mt-1 text-right">
                                            <button type="button" className="text-xs text-yellow-600 hover:text-yellow-700 hover:underline" onClick={showForgotPassword}>
                                                Forgot Password?
                                            </button>
                                        </div>
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
                                        Sign In
                                    </button>

                                    <div className="text-center mb-4">
                                        <button type="button" className="text-gray-600 text-sm hover:text-gray-800 hover:underline" onClick={() => switchAuthMethod('phone')}>
                                            Login with phone number
                                        </button>
                                    </div>
                                </form>
                            )}

                            {authStep === 'forgot-password' && (
                                <form onSubmit={handleSendForgotPasswordOtp}>
                                    <div className="mb-4">
                                        <label htmlFor="forgot-phone" className="block text-gray-700 mb-2">
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
                                                id="forgot-phone"
                                                value={forgotPhoneNumber}
                                                onChange={handleForgotPhoneNumberChange}
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                                placeholder="Enter your phone number"
                                                required
                                            />
                                        </div>
                                        <p className="text-sm text-gray-600 mt-2">Enter the phone number associated with your account to receive a verification code.</p>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium py-2 px-4 rounded-md transition duration-300 mb-4 flex justify-center items-center"
                                        disabled={isLoading || forgotPhoneNumber.length < 9}
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

                                    <div className="text-center">
                                        <button type="button" className="text-gray-600 text-sm hover:text-gray-800 hover:underline" onClick={backToLogin}>
                                            Back to Sign In
                                        </button>
                                    </div>
                                </form>
                            )}

                            {authStep === 'forgot-otp' && (
                                <form onSubmit={handleVerifyForgotPasswordOtp}>
                                    <div className="mb-4">
                                        <label htmlFor="forgot-otp" className="block text-gray-700 mb-2">
                                            Enter 6-digit code sent to {countryCode}
                                            {forgotPhoneNumber}
                                        </label>
                                        <input
                                            type="text"
                                            id="forgot-otp"
                                            value={forgotOtpCode}
                                            onChange={handleForgotOtpChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-center text-2xl tracking-widest"
                                            placeholder="000000"
                                            maxLength={6}
                                            required
                                        />
                                    </div>

                                    {forgotOtpTimer > 0 && <div className="mb-4 text-center text-sm text-gray-600">Resend OTP in {formatTime(forgotOtpTimer)}</div>}

                                    <button
                                        type="submit"
                                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium py-2 px-4 rounded-md transition duration-300 mb-4 flex justify-center items-center"
                                        disabled={isLoading || forgotOtpCode.length !== 6}
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
                                        Verify Code
                                    </button>

                                    <div className="flex justify-between text-center text-sm">
                                        <button type="button" className="text-gray-600 hover:text-gray-800 hover:underline" onClick={() => setAuthStep('forgot-password')}>
                                            Change phone number
                                        </button>
                                        {forgotOtpTimer === 0 && (
                                            <button type="button" className="text-yellow-600 hover:text-yellow-700 hover:underline" onClick={handleResendForgotPasswordOtp} disabled={isLoading}>
                                                Resend OTP
                                            </button>
                                        )}
                                    </div>
                                </form>
                            )}

                            {authStep === 'reset-password' && (
                                <form onSubmit={handleResetPassword}>
                                    <div className="mb-4">
                                        <label htmlFor="new-password" className="block text-gray-700 mb-2">
                                            New Password
                                        </label>
                                        <input
                                            type="password"
                                            id="new-password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                            placeholder="Enter new password"
                                            minLength={8}
                                            required
                                        />
                                    </div>

                                    <div className="mb-6">
                                        <label htmlFor="confirm-new-password" className="block text-gray-700 mb-2">
                                            Confirm New Password
                                        </label>
                                        <input
                                            type="password"
                                            id="confirm-new-password"
                                            value={confirmNewPassword}
                                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                            placeholder="Confirm new password"
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
                                        Reset Password
                                    </button>

                                    <div className="text-center">
                                        <button type="button" className="text-gray-600 text-sm hover:text-gray-800 hover:underline" onClick={backToLogin}>
                                            Cancel & Back to Sign In
                                        </button>
                                    </div>
                                </form>
                            )}

                            <div className="flex items-center justify-center">
                                <button type="button" className="inline-flex items-center text-gray-600 text-sm hover:text-gray-800" onClick={() => navigate('/')}>
                                    <ArrowLeft className="mr-1 h-4 w-4" /> BACK
                                </button>
                            </div>

                            <div className="mt-6 flex items-center justify-center border border-gray-300 rounded-md p-3">
                                <Phone className="mr-2 h-5 w-5 text-gray-600" />
                                <span className="font-medium">+94 74 237 2246</span>
                            </div>
                        </div>

                        <div className="mt-6 bg-white rounded-lg shadow-md p-8">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">New to our platform?</h3>
                            <p className="text-gray-600 mb-4">Create an account to find your perfect match and access all our premium features.</p>
                            <button
                                type="button"
                                className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition duration-300"
                                onClick={() => navigate('/register')}
                            >
                                Register for Free
                            </button>
                        </div>
                    </div>

                    <div className="w-full max-w-xl mx-auto">
                        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Why Choose Our Platform?</h2>

                            <div className="space-y-6">
                                <div className="flex items-start p-3 rounded-md bg-yellow-50">
                                    <div className="flex-shrink-0 mr-4">
                                        <div className="bg-blue-100 p-2 rounded-md">
                                            <Shield className="h-6 w-6 text-blue-600" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-800">Privacy First</h3>
                                        <p className="text-sm text-gray-600">Data that reveals your identity is shared only with the profiles you accept. You are in control of your data.</p>
                                    </div>
                                </div>

                                <div className="flex items-start p-3 rounded-md bg-yellow-50">
                                    <div className="flex-shrink-0 mr-4">
                                        <div className="bg-green-100 p-2 rounded-md">
                                            <UserCheck className="h-6 w-6 text-green-600" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-800">Genuine and Verified Accounts</h3>
                                        <p className="text-sm text-gray-600">We manually review all profiles added to the website and verify the accuracy of the necessary information.</p>
                                    </div>
                                </div>

                                <div className="flex items-start p-3 rounded-md bg-yellow-50">
                                    <div className="flex-shrink-0 mr-4">
                                        <div className="bg-purple-100 p-2 rounded-md">
                                            <DollarSign className="h-6 w-6 text-purple-600" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-800">Paid Accounts Only</h3>
                                        <p className="text-sm text-gray-600">
                                            We attract only genuine seekers, and hence the selection process is efficient for our advertisers. Please check the pricing details{' '}
                                            <a href="#" className="text-blue-600 hover:underline">
                                                here
                                            </a>
                                            .
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start p-3 rounded-md bg-yellow-50">
                                    <div className="flex-shrink-0 mr-4">
                                        <div className="bg-yellow-100 p-2 rounded-md">
                                            <Headphones className="h-6 w-6 text-yellow-600" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-800">Live Support</h3>
                                        <p className="text-sm text-gray-600">We are available on Telephone, Email and on Social Media to give you a helping hand when you need us.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="relative h-48">
                                <img src="https://blissfulplans.com/wp-content/uploads/2023/08/Sri-lanka.webp" alt="Sri Lanka matrimony" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                                    <div className="p-6 text-white">
                                        <h3 className="text-xl font-bold mb-2">Find Your Perfect Match</h3>
                                        <p className="text-sm opacity-90">Join thousands of happy couples who found their life partner through our platform</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center">
                                        <Heart className="h-5 w-5 text-red-500 mr-2" fill="red" />
                                        <span className="text-gray-700 font-medium">10,000+ Success Stories</span>
                                    </div>
                                    <a href="#" className="text-yellow-600 hover:text-yellow-700 text-sm font-medium">
                                        View All
                                    </a>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">Colombo</span>
                                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">Kandy</span>
                                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">Galle</span>
                                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">Jaffna</span>
                                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">Negombo</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
        </div>
    );
};

export default SignIn;
