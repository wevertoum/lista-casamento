const withAntdLess = require("next-plugin-antd-less");

module.exports = withAntdLess({
  lessVarsFilePath: "./src/styles/variables.less",
  lessVarsFilePathAppendToEndOfContent: true,
  pwa: {
    dest: "public",
    disable: process.env.NODE_ENV === "development",
  },

  webpack(config) {
    return config;
  },
});
