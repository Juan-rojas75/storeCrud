import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        serif: ['PT Serif', 'serif']
        },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'charade': {
          '50': '#f5f7fa',
          '100': '#ebeef3',
          '200': '#d1d9e6',
          '300': '#a9b8d0',
          '400': '#7b93b5',
          '500': '#5b769c',
          '600': '#475d82',
          '700': '#3a4b6a',
          '800': '#334159',
          '900': '#2e384c',
          '950': '#1e2431',
        },
        'big-stone': {
            '50': '#f5f7fa',
            '100': '#eaedf4',
            '200': '#d1dae6',
            '300': '#a9b9d0',
            '400': '#7a94b6',
            '500': '#5a779d',
            '600': '#465f83',
            '700': '#3a4d6a',
            '800': '#334259',
            '900': '#2e394c',
            '950': '#232b3a',
        },


      },
    },
  },
  plugins: [],
} satisfies Config;
