/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          primary: '#FFFFFF',
          secondary: '#F8FAFC',
          tertiary: '#F1F5F9',
          cool: '#F4F8FB',
          warmTint: '#FFF8F1',
          tealTint: '#F0FDFA',
          blueTint: '#EFF6FF',
          greenTint: '#F0FDF4',
          orangeTint: '#FFF7ED',
          clinical: '#EEF6F7',
          dark: '#050F33',
        },
        surface: {
          page: '#F8FAFC',      // Surface 0
          card: '#FFFFFF',      // Surface 1
          brand: '#F0FDFA',     // Surface 2
          blue: '#EFF6FF',      // Surface 3
          clinical: '#EEF6F7',  // Surface 4
          dark: '#050F33',      // Surface 5
        },
        text: {
          primary: '#0F172A',
          secondary: '#334155',
          tertiary: '#475569',
          muted: '#64748B',
          placeholder: '#94A3B8',
          disabled: '#CBD5E1',
          inverse: '#FFFFFF',
        },
        border: {
          default: '#E2E8F0',
          light: '#EDF2F7',
          emphasis: '#CBD5E1',
          strong: '#CBD5E1',
          brandActive: '#99F6E4',
          blueActive: '#BFDBFE',
          dark: 'rgba(255, 255, 255, 0.12)',
        },
        brand: {
          teal: '#0EA5A4',         // Primary Teal
          tealDark: '#0F766E',     // Deep Accent
          tealHover: '#0F766E',
          blue: '#2563EB',         // Operations Blue
          blueDark: '#1D4ED8',     // Deep Operations Blue
          navy: '#050F33',         // Dark Anchor
          navyLight: '#0B2447',
          cyan: '#06B6D4',
        },
        'brand-teal': {
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#0EA5A4',
          700: '#0F766E',
          800: '#115E59',
          900: '#134E4A',
          hover: '#0F766E',
        },
        'brand-teal-hover': '#0F766E',
        'care-blue': {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          900: '#1E3A8A',
        },
        warm: {
          care: '#F59E0B',
          soft: '#FFFBEB',
        },
        status: {
          success: '#16A34A',      // Completed / Approved
          info: '#0284C7',         // Active / In Progress
          warning: '#D97706',      // Pending / Under Review
          danger: '#DC2626',       // Rejected / Cancelled
          neutral: '#64748B',      // Draft / Offline
          purple: '#7C3AED',
        }
      },
      fontFamily: {
        sans: ['Manrope', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        'btn': '10px',
        'card': '12px',
        'hero': '24px',
        'badge': '9999px',
        'control': '8px',
        'surface': '16px',
        'dialog': '18px',
      },
      boxShadow: {
        'subtle': '0 1px 2px rgba(15, 23, 42, 0.04)',
        'card': '0 8px 24px rgba(15, 23, 42, 0.06)',
        'floating': '0 16px 40px rgba(15, 23, 42, 0.10)',
        'teal-glow': '0 0 20px rgba(14, 165, 164, 0.15)',
        'blue-glow': '0 0 20px rgba(37, 99, 235, 0.15)',
      }
    },
  },
  plugins: [],
}
