import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    
  ],
  theme: {
    extend: {
      colors: {
        // New design system (sky-blue brand, warm cream surfaces)
        brand: {
          50: '#effaff', 100: '#d9f1ff', 200: '#b6e5ff', 300: '#7dd3fc',
          400: '#38bdf8', 500: '#0ea5e9', 600: '#0284c7', 700: '#0369a1',
          800: '#075985', 900: '#0c4a6e', DEFAULT: '#0ea5e9',
        },
        cream: { DEFAULT: '#f8f5ef', 100: '#fffdf8', 200: '#f1ece2', 300: '#e6dfd0' },
        ink: { DEFAULT: '#14213d', soft: '#4b5878', mute: '#8590a8' },
        navy: { 950: '#07122a', 900: '#0b1a3a', 800: '#10224a', 700: '#183063' },
        sun: '#ffc93c', mint: '#2dd4a4', pinky: '#ff5c8a',
        dark: {
          950: '#0a0a0f',
          900: '#0f0f1a',
          800: '#1a1a2e',
          700: '#16213e',
        },
        primary: {
          DEFAULT: '#7c3aed',
          light: '#a855f7',
          dark: '#5b21b6',
        },
        cyan: {
          neon: '#06b6d4',
          light: '#22d3ee',
        },
        amber: {
          neon: '#f59e0b',
        }
      },
      fontFamily: {
        sans: ['Nunito', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'neon-gradient': 'linear-gradient(135deg, #7c3aed, #06b6d4)',
        'purple-cyan': 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'spin-slow': 'spin 8s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'typewriter': 'typewriter 2s steps(40) forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          'from': { boxShadow: '0 0 10px rgba(124, 58, 237, 0.5)' },
          'to': { boxShadow: '0 0 30px rgba(124, 58, 237, 0.9), 0 0 60px rgba(6, 182, 212, 0.3)' },
        },
        slideUp: {
          'from': { opacity: '0', transform: 'translateY(30px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'neon-purple': '0 0 20px rgba(124, 58, 237, 0.5), 0 0 40px rgba(124, 58, 237, 0.2)',
        'neon-cyan': '0 0 20px rgba(6, 182, 212, 0.5), 0 0 40px rgba(6, 182, 212, 0.2)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.37)',
      }
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant("light", ".light &");
    }),
  ],
}
