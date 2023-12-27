/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./src/**/*.{html,ts}"],
  theme: {
    screens: {
      xxs: "300px", // min-width
      xs: "600px", // min-width
    },
    extend: {},
  },
  plugins: [],
};
