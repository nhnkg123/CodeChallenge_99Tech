import { Config } from 'tailwindcss';

const config: Config = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customBlue: '#1E90FF',
        customGreen: '#32CD32',
      },
    },
  },
  plugins: [],
};

export default config;