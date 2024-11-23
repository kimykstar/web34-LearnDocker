/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx,tsx,ts}'],
    theme: {
        extend: {
            fontFamily: {
                pretendard: ['Pretendard', 'sans-serif'],
            },
            colors: {
                'Moby-Blue': '#1D63ED',
                'Dark-Blue': '#00084D',
                'Light-Blue': '#E5F2FC',
                'Off-Black': '#17191E',
                'Secondary-Green': '#58C126',
                'Secondary-Red': '#C12626',
            },
        },

        keyframes: {
            showAndHideFirst: {
                '0%': { opacity: '0', visibility: 'hidden' },
                '1%, 20%': { opacity: '1', visibility: 'visible' },
                '21%, 100%': { opacity: '0', visibility: 'hidden' },
            },
            showAndHideSecond: {
                '0%, 20%': { opacity: '0', visibility: 'hidden' },
                '21%, 40%': { opacity: '1', visibility: 'visible' },
                '41%, 100%': { opacity: '0', visibility: 'hidden' },
            },
            showAndHideThird: {
                '0%, 40%': { opacity: '0', visibility: 'hidden' },
                '41%, 60%': { opacity: '1', visibility: 'visible' },
                '61%, 100%': { opacity: '0', visibility: 'hidden' },
            },
            showAndHideFourth: {
                '0%, 60%': { opacity: '0', visibility: 'hidden' },
                '61%, 80%': { opacity: '1', visibility: 'visible' },
                '81%, 100%': { opacity: '0', visibility: 'hidden' },
            },
            ping: {
                '75%, 100%': {
                    transform: 'scale(2)',
                    opacity: 0,
                },
            },
        },
        animation: {
            showAndHideFirst: 'showAndHideFirst 2s linear forwards',
            showAndHideSecond: 'showAndHideSecond 2s linear forwards',
            showAndHideThird: 'showAndHideThird 2s linear forwards',
            showAndHideFourth: 'showAndHideFourth 2s linear forwards',
            ping: `ping 1s cubic-bezier(0, 0, 0.2, 1) infinite`,
        },
    },
    plugins: [],
};
