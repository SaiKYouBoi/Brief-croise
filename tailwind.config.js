// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      gridTemplateColumns: {
        22: 'repeat(22, minmax(0, 1fr))',
      },
      gridTemplateRows: {
        8: 'repeat(8, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
}
