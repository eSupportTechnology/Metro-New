/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        container: {
            center: true,
        },
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#d4af37',
                    light: '#fff8e1',
                    'dark-light': 'rgba(212,175,55,.15)',
                },
                secondary: {
                    DEFAULT: '#b8860b',
                    light: '#fff8dc',
                    'dark-light': 'rgba(184,134,11,.15)',
                },
                success: {
                    DEFAULT: '#00ab55',
                    light: '#ddf5f0',
                    'dark-light': 'rgba(0,171,85,.15)',
                },
                danger: {
                    DEFAULT: '#e7515a',
                    light: '#fff5f5',
                    'dark-light': 'rgba(231,81,90,.15)',
                },
                warning: {
                    DEFAULT: '#ffd700',
                    light: '#fffbeb',
                    'dark-light': 'rgba(255,215,0,.15)',
                },
                info: {
                    DEFAULT: '#daa520',
                    light: '#fffaeb',
                    'dark-light': 'rgba(218,165,32,.15)',
                },
                dark: {
                    DEFAULT: '#3b3f5c',
                    light: '#eaeaec',
                    'dark-light': 'rgba(59,63,92,.15)',
                },
                black: {
                    DEFAULT: '#0e1726',
                    light: '#e3e4eb',
                    'dark-light': 'rgba(14,23,38,.15)',
                },
                white: {
                    DEFAULT: '#ffffff',
                    light: '#e0e6ed',
                    dark: '#888ea8',
                },
                gold: {
                    DEFAULT: '#d4af37',
                    light: '#fff8e1',
                    dark: '#b8860b',
                    pale: '#eee8aa',
                    bright: '#ffd700',
                    deep: '#daa520',
                    'dark-light': 'rgba(212,175,55,.15)',
                },
            },
            fontFamily: {
                nunito: ['Nunito', 'sans-serif'],
            },
            spacing: {
                4.5: '18px',
            },
            boxShadow: {
                '3xl': '0 2px 2px rgb(224 230 237 / 46%), 1px 6px 7px rgb(224 230 237 / 46%)',
                gold: '0 4px 12px rgba(212, 175, 55, 0.15), 0 1px 3px rgba(212, 175, 55, 0.3)',
            },
            typography: ({ theme }) => ({
                DEFAULT: {
                    css: {
                        '--tw-prose-invert-headings': theme('colors.white.dark'),
                        '--tw-prose-invert-links': theme('colors.white.dark'),
                        '--tw-prose-links': theme('colors.gold.DEFAULT'),
                        h1: { fontSize: '40px', marginBottom: '0.5rem', marginTop: 0 },
                        h2: { fontSize: '32px', marginBottom: '0.5rem', marginTop: 0 },
                        h3: { fontSize: '28px', marginBottom: '0.5rem', marginTop: 0 },
                        h4: { fontSize: '24px', marginBottom: '0.5rem', marginTop: 0 },
                        h5: { fontSize: '20px', marginBottom: '0.5rem', marginTop: 0 },
                        h6: { fontSize: '16px', marginBottom: '0.5rem', marginTop: 0 },
                        p: { marginBottom: '0.5rem' },
                        li: { margin: 0 },
                        img: { margin: 0 },
                    },
                },
                gold: {
                    css: {
                        '--tw-prose-body': theme('colors.gold.DEFAULT'),
                        '--tw-prose-headings': theme('colors.gold.deep'),
                        '--tw-prose-links': theme('colors.gold.DEFAULT'),
                        '--tw-prose-bold': theme('colors.gold.deep'),
                    },
                },
            }),
            backgroundColor: {
                'gold-bg-light': '#fffbeb',
                'gold-bg-dark': '#1a1608',
                'gold-sidebar-dark': '#2a2209',
                'gold-sidebar-hover': '#32290e',
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms')({
            strategy: 'class',
        }),
        require('@tailwindcss/typography'),
    ],
};
