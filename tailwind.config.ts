/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,vue}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui'), require('@tailwindcss/typography')],
  daisyui: {
    themes: [
      {
        meLight: {
          primary: '#ac97e5',
          secondary: '#ea9979',
          accent: '#12bc8c',
          neutral: '#1b1320',
          'base-100': '#eff1f5',
          info: '#909eda',
          success: '#208362',
          warning: '#eed253',
          error: '#ed1d27',
        },
      },
      {
        meDark: {
          primary: '#2fe09c',
          secondary: '#b28fe0',
          accent: '#c6e868',
          neutral: '#222027',
          'base-100': '#1e1e2e',
          info: '#79d3ec',
          success: '#83e2a9',
          warning: '#eed763',
          error: '#f2698b',
        },
      },
    ],
    darkTheme: 'meDark',
  },
}
