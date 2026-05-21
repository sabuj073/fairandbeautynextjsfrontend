import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "2rem",
        sm: "1rem",
        md: "2rem",
        lg: "3rem",
        xl: "4rem",
        '2xl': "5rem",
      },
    },
    extend: {
      backdropBlur: {
        '4': '4px',
      },
       screens: {
        'xxl': '1650px', // Custom breakpoint
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          hover: '#601390', // Hover state for primary color
          light: '#7818B4',
          light_blue: '#B47AD9',

        },
        login: '#FAE7F5',
        login_right: '#EFB5DF',
        p_light: '#E2BAFA',
        blue_light: '#F1DEFD',
        filter_light: '#E9E9E9',
        gray: '#BBBABA',
        arival: '#FBF5FF',
        arival_var: "hsl(var(--arival_var))",
        review: "hsl(var(--review))",
        neutral: {
          black: '#404042', // Neutral black color
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          lightPink: '#EFB5DF',
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        shimmer: {
          '100%': {
            transform: 'translateX(100%)',
          },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        marquee: 'marquee 1s linear infinite',
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },

      fontFamily: {
        avenir: ['Avenir LT Pro', 'sans-serif'],
        surfer: ['"Original"', 'sans-serif'],
      },
      fontWeight: {
        hairline: "100",
        thin: "200",
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        black: "900",
      },
      aspectRatio: {
        '2-64': '2.64 / 1',
      },
      gap: {
        '5': '5px',
        '9': '9px',
        '10': '10px',
        '14': '14px',
        '15': '15px',
        '20': '20px',
      },
      fontSize: {
        'xs': '0.75rem',  // 12px
        'sm': '0.875rem', // 14px
        'base': '1rem',   // 16px
        'lg': '1.125rem', // 18px
        'xl': '1.25rem',  // 20px
        '2xl': '1.5rem',  // 24px
        '3xl': '1.875rem',// 30px
        '4xl': '2.25rem', // 36px
        '5xl': '3rem',    // 48px
        '6xl': '3.75rem', // 60px
        '7xl': '4.5rem',  // 72px
        '8xl': '6rem',    // 96px
        '9xl': '8rem',    // 128px
        'customSize': '10rem', // 160px - Custom size
      },
      transitionProperty: {
        visibility: 'visibility',
      },
      transitionTimingFunction: {
        'custom-cubic': 'cubic-bezier(.3,.46,.45,.94)',
      },
      transitionDuration: {
        '200': '200ms',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config