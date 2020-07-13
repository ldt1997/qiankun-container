const umircConfig = require("@ali-whale/umirc-dva");

const umircExport = {
  ...umircConfig,
  publicPath: "/",
  targets: { ie: 11 },
  proxy: {
    // 需要转发的API前缀
    "/api": {
      target: "http://127.0.0.1:8081", //转发接口地址
      changeOrigin: true,
      secure: false,
    },
  },
};
module.exports = umircExport;
