/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#071952",
          secondary: "#133e8e",
          accent: "#b5c8f2",
          neutral: "#3a223f",
          "base-100": "#efeff1",
          info: "#3d69e1",
          success: "#1cb08b",
          warning: "#975411",
          error: "#f62a13",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
