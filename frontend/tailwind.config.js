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
    },
    plugins: [],
};
