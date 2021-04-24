module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
            @import "@/assets/scss/settings/_colors.scss";
          `,
      },
    },
  },
};
