/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF6B35",
        secondary: "#004E89",
        accent: "#1AC8ED",
        dark: "#0F1419",
        light: "#F5F7FA",
      },
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      fontSize: {
        cs: ["2.5rem", { lineHeight: "3rem" }],
      },
      animation: {
        fadeInUp: "fadeInUp 0.6s ease-out",
        slideIn: "slideIn 0.5s ease-out",
        pulse: "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        bounce: "bounce 1s infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      boxShadow: {
        glow: "0 0 20px rgba(255, 107, 53, 0.3)",
        "glow-xl": "0 0 40px rgba(255, 107, 53, 0.5)",
      },
    },
  },
  plugins: [],
};
