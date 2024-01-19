/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./src/**/*.{html,ts}"],
  theme: {
    screens: {
      xxxs: "300px", // min-width
      xxs: "450px", // min-width
      xs: "600px", // min-width
      lg: "900px",
    },

    extend: {},
  },
  plugins: [],
};
