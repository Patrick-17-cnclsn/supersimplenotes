/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      spacing: {
        global: '24px',
      },
      colors: {
        primary: "var(--color-primary)",
        invert: "var(--color-invert)",
        secondary: "var(--color-secondary)",
        background: "var(--color-background)",
        text: "var(--color-text)",
        "text-secondary": "var(--color-text-secondary)",
        highlight: "var(--color-highlight)",
        border: "var(--color-border)",
        darker: "var(--color-darker)",
      },
    },
  },
  plugins: [],
};
