/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
      colors: {
        navy: {
          900: "#020617",
          800: "#0f172a",
          700: "#1d4ed8",
        },
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #020617, #0f172a, #1d4ed8)",
      },
      boxShadow: {
        glow: "0 20px 60px rgba(56,189,248,0.18)",
      },
    },
  },
  plugins: [],
};
