/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF6F5C",
        secondary: "#B2D3C2",
        wwhite: "#f8f8ff",
        wdark: "#222021",
        wgray: "#363636",
        ghost: "#C3C9D5",
        "heavy-metal": "#2D2E2E",
        "charcoal-gray": "#414244",
        "davy-gray": "#525456",
        dune: "#323334",
        bittersweet: "#FF6F5C",
        "aqua-haze": "#F1F3F9",
      },
    },
  },
  plugins: [],
};

module.exports = config;
