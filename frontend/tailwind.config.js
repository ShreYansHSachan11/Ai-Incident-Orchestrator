/** @type {import('tailwindcss').Config} */

// Black + lime dark theme (fintech-dashboard style).
// Every palette is "inverted": low steps (50–200) are dark tinted surfaces,
// high steps (600–950) are bright text tones. Existing light-theme classes
// such as `bg-red-50 text-red-700` therefore render as dark badges with bright text.

const navy = {     // neutral charcoal scale (name kept for the mapping below)
  50: '#0B0B0B',   // inset surface inside cards
  100: '#1F1F1F',  // raised / hover surface
  200: '#2A2A2A',  // borders
  300: '#3A3A3A',
  400: '#5C5C5C',
  500: '#8A8A8A',
  600: '#A8A8A8',
  700: '#C8C8C8',
  800: '#E4E4E4',
  900: '#F4F4F4',
  950: '#FFFFFF',
}

const green = {    // lime accent
  50: '#1A1D05',
  100: '#252A07',
  200: '#434E0C',
  300: '#7C8E14',
  400: '#B4C91F',
  500: '#CCE22A',
  600: '#DCEF2F',
  700: '#E8F57A',
  800: '#F2FAB8',
  900: '#F9FDE0',
  950: '#FCFEF0',
}

const red = {
  50: '#2D0B0E', 100: '#3E1014', 200: '#6E1A20', 300: '#A82B33', 400: '#DB3030',
  500: '#EF5752', 600: '#FF6960', 700: '#FF9F99', 800: '#FFCDC7', 900: '#FFEAE5', 950: '#FFF5F3',
}

const amber = {
  50: '#2A1E05', 100: '#3B2A06', 200: '#6B4A00', 300: '#944F01', 400: '#C28A00',
  500: '#E0A100', 600: '#FFC010', 700: '#FFD860', 800: '#FFEC9E', 900: '#FEF7DB', 950: '#FFFBEA',
}

const orange = {
  50: '#2E1607', 100: '#40200A', 200: '#6E3712', 300: '#A3521A', 400: '#D9711F',
  500: '#F2862E', 600: '#FF9B45', 700: '#FFB97D', 800: '#FFD8B5', 900: '#FFEEDF', 950: '#FFF7EF',
}

const purple = {
  50: '#1F1033', 100: '#2C1748', 200: '#4A2477', 300: '#6C35A8', 400: '#8F45D4',
  500: '#A855EC', 600: '#B45AF2', 700: '#CF8CFA', 800: '#E6C2FD', 900: '#F3E3FE', 950: '#FAF2FF',
}

const sky = {          // MongoDB blue
  50: '#031E3A', 100: '#062B52', 200: '#0B3F7A', 300: '#0E5BB0', 400: '#0E7FEF',
  500: '#0498EC', 600: '#1EB4FF', 700: '#6CCBFF', 800: '#BDE6FF', 900: '#E1F4FF', 950: '#F1FAFF',
}

const pink = {
  50: '#2E0A1D', 100: '#41102A', 200: '#701C48', 300: '#A3296A', 400: '#D9408C',
  500: '#EC5BA2', 600: '#F472B6', 700: '#F9A8D4', 800: '#FBCFE8', 900: '#FCE7F3', 950: '#FDF2F8',
}

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      inherit: 'inherit',
      white: '#161616',   // card surface (was white)
      black: '#000000',
      slate: navy, gray: navy, zinc: navy, neutral: navy, stone: navy,
      blue: green, primary: green, green, emerald: green, teal: green, lime: green,
      red, rose: red,
      amber, yellow: amber,
      orange,
      purple, violet: purple, indigo: purple, fuchsia: purple,
      sky, cyan: sky,
      pink,
      // True colours for places that need them regardless of theme
      ink: '#0B0B0B',
      snow: '#FFFFFF',
      leaf: '#DCEF2F',
    },
    extend: {
      fontFamily: {
        sans: ['"Inter Tight"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Anton', 'Impact', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        'slide-down': {
          '0%': { opacity: '0', transform: 'translateX(-50%) translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(-50%) translateY(0)' },
        },
      },
      animation: {
        'slide-down': 'slide-down 0.3s ease-out',
      },
    },
  },
  plugins: [],
}
