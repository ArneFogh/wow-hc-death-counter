/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // WoW Classic inspired color palette
        background: "#0B0F14", // Darker blue-black
        primaryText: "#FFFFFF",
        accent: {
          DEFAULT: "#FFB100", // WoW gold
          hover: "#FFD100", // Brighter gold for hover states
        },
        secondary: "#4A4FBF", // Alliance blue
        inputBg: "#151B22", // Slightly lighter than background
        border: {
          DEFAULT: "#2C374A", // Blue-tinted border
          highlight: "#4A4FBF", // Alliance blue for highlights
        },
        error: {
          DEFAULT: "#BC2F32", // WoW error red
          light: "#FF6B6B",
        },
        success: {
          DEFAULT: "#4CAF50", // WoW green
          light: "#81C784",
        },
        warning: {
          DEFAULT: "#FFA726", // WoW warning orange
          light: "#FFB74D",
        },
      },
      boxShadow: {
        wow: "0 0 10px rgba(255, 177, 0, 0.3)", // Golden glow effect
        "wow-hover": "0 0 15px rgba(255, 177, 0, 0.5)", // Stronger golden glow for hover
      },
    },
  },
  plugins: [],
};
