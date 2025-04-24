import React from 'react';

interface LoaderProps {
    isLoading: boolean;
}

const RingLoader: React.FC<LoaderProps> = ({ isLoading }) => {
    if (!isLoading) return null;

    const floatKeyframes = `
        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
        }
    `;

    const pulseKeyframes = `
        @keyframes pulse {
            0% { opacity: 0.6; }
            50% { opacity: 1; }
            100% { opacity: 0.6; }
        }
    `;

    const pingKeyframes = `
        @keyframes ping {
            0% { transform: scale(1); opacity: 1; }
            75%, 100% { transform: scale(2); opacity: 0; }
        }
    `;

    const floatStyle = {
        animation: 'float 3s ease-in-out infinite'
    };

    const float1Style = {
        ...floatStyle,
        animationDelay: '0.5s'
    };

    const float2Style = {
        ...floatStyle,
        animationDelay: '1.2s'
    };

    const float3Style = {
        ...floatStyle,
        animationDelay: '0.8s'
    };

    const pulseStyle = {
        animation: 'pulse 2s ease-in-out infinite'
    };

    const pingStyle = {
        animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite'
    };

    return (
        <div className="screen_loader fixed inset-0 bg-[#fffbeb] dark:bg-[#1a1608] z-[60] grid place-content-center animate__animated animate__fadeIn">
            <style>
                {floatKeyframes}
                {pulseKeyframes}
                {pingKeyframes}
            </style>
            <div className="flex flex-col items-center">
                <div className="relative h-36 w-36">
                    <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-[60%] -translate-y-1/2 rounded-full border-4 border-gold-bright shadow-lg transform-gpu rotate-12"
                         style={pulseStyle}>
                    </div>

                    <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-[40%] -translate-y-1/2 rounded-full border-4 border-gold-deep shadow-lg transform-gpu -rotate-12"
                         style={pulseStyle}>
                        <div className="absolute top-0 right-1/4 h-2 w-8 rounded-full bg-white opacity-60 rotate-45"
                             style={pingStyle}>
                        </div>
                    </div>

                    <div className="absolute top-0 left-0 h-6 w-6 opacity-80"
                         style={float1Style}>
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                  fill="#d4af37"/>
                        </svg>
                    </div>

                    <div className="absolute bottom-0 right-0 h-5 w-5 opacity-80"
                         style={float2Style}>
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                  fill="#b8860b"/>
                        </svg>
                    </div>

                    <div className="absolute top-1/2 right-0 h-4 w-4 opacity-80"
                         style={float3Style}>
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                  fill="#ffd700"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RingLoader;
