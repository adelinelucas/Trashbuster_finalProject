/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
    
      extend: {
        colors:{
            'lightPurple': '#805BA6',
            'brightPurple': '#7460BF',
            'brightOrange': '#F28907',
            'lightOrange':'#F28444',
            'lightRed':'#BF4F45',
            'purpleGrey':'#493E59',
            'lightGrey':'#F2F2F2',
            'brightYellow': '#F2B705',
            'brightPink': '#F291C7',
            'aquaBlue': '#004D8E',
            'greenV2': '#2F6C14',
            'greenApple': '#9DA600',
            'greenGrass': '#608000',
            'yellowV2': '#F6A834',
            'nudeV2': '#FFE3AA',
            'orangeV2': '#F2752C',
            'lightOrangeV2': '#F7A258',
            'darkGreen': '#082600',
            'popUp': '#797d7fa9',
        },
        backgroundImage: {
          'hero': "url('./images/hero.png')",
          'hero-HP': "url('./images/hero-HP.png')",
          'hero-HP2': "url('./images/hero-HPv2.png')",
        },
        backgroundSize: {
          'auto': 'auto',
          'cover': 'cover',
          'contain': 'contain',
          'heroSize': '84% 100%',
          'btnLogout': '102%',
        },
        animation: {
          'wobbleAnim': 'myAnim 1s ease 0s 1 normal forwards',
          'jelloAnim': 'myJello 1s ease 0s 1 normal forwards'
        },
        fontFamily: {
          Lato: ['Lato', 'sans-serif'],
          Permanent : ['Permanent Marker', 'cursive'],
          Amatic : ['Amatic SC', 'cursive'],
          Syne : ['Syne Mono', 'monospace'],
        },
      },
    },
    plugins: [],
  }