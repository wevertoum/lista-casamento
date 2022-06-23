const withAntdLess = require("next-plugin-antd-less");

module.exports = withAntdLess({
  lessVarsFilePath: "./src/styles/variables.less",
  lessVarsFilePathAppendToEndOfContent: true,
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },

  webpack(config) {
    return config;
  },
});
