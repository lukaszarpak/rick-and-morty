module.exports = {
  mode: 'jit',
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      padding: '1rem',
      center: true,
    },
  },
  variants: {
    extend: {
      container: [],
    },
  },
  plugins: [],
};
