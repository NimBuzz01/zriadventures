/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        extend: {
            keyframes: {
                'accordion-down': {
                    from: { height: 0 },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: 0 },
                },
                zoom: {
                    '0%': { transform: 'scale(100%)' },
                    '10%': { transform: 'scale(102%)' },
                    '20%': { transform: 'scale(104%)' },
                    '30%': { transform: 'scale(106%)' },
                    '40%': { transform: 'scale(108%)' },
                    '50%': { transform: 'scale(110%)' },
                    '60%': { transform: 'scale(108%)' },
                    '70%': { transform: 'scale(106%)' },
                    '80%': { transform: 'scale(104%)' },
                    '90%': { transform: 'scale(102%)' },
                    '100%': { transform: 'scale(100%)' },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'zoom-in-out': 'zoom 15s linear infinite',
            },
        },
    },
    corePlugins: {
        aspectRatio: false,
    },
    plugins: [
        require('tailwindcss-animate'),
        require('@tailwindcss/aspect-ratio'),
        require('tailwind-scrollbar'),
    ],
}
