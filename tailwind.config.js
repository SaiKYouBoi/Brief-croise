// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      gridTemplateColumns: {
        22: 'repeat(22, minmax(0, 1fr))', // 22 equal columns
      },
      gridTemplateRows: {
        8: 'repeat(8, minmax(0, 1fr))',   // 8 equal rows
      },
    },
  },
  plugins: [],
}
