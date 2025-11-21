import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0B6E4F',
        secondary: '#1E3932',
        accent: '#F4A261',
        background_light: '#F9FAFB',
        background_dark: '#0A0F0D',
        text_primary: '#FFFFFF',
        text_secondary: '#D1D5DB',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      fontWeight: {
        normal: 400,
        bold: 700,
      },
      lineHeight: {
        normal: 1.6,
      },
    },
  },
  plugins: [],
};

export default config;