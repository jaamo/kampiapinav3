const colors = require("tailwindcss/colors");

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        serif: ["Rokkitt", "sans-serif"],
      },
      colors: {
        apinared: { light: "#911b1b", DEFAULT: "#911b1b", dark: "#911b1b" },
        apinayellow: { light: "#fbb405", DEFAULT: "#fbb405", dark: "#fbb405" },
        gray: colors.coolGray,
      },
    },
  },
  plugins: [],
};
