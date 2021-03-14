const colors = require("tailwindcss/colors");

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      indigo: colors.indigo,
      red: colors.red,
      yellow: colors.amber,
      apinared: { light: "#911b1b", DEFAULT: "#911b1b", dark: "#911b1b" },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
