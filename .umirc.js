const umircConfig = require("@ali-whale/umirc-dva");
const { plugins, ...restConfig } = umircConfig;
plugins.push([
  "@umijs/plugin-qiankun",
  {
    master: {
      apps: [
        {
          name: "app1", // 子应用唯一 id
          entry: "http://localhost:8001/app1", // 子应用 html 地址
          base: "/app1", // 子应用路由前缀，通常跟子应用的 base 配置 一致
          mountElementId: "sub-root", // 子应用挂载到主应用的哪个 id 节点上（注意不要跟子应用的 mountElementId 一致）
        },
      ],
      jsSandbox: true, // 是否启用 js 沙箱，默认为 false
      prefetch: true, // 是否启用 prefetch 特性，默认为 true
    },
  },
]);

const umircExport = {
  ...restConfig,
  // publicPath: "/",
  mountElementId: "root-master",
  hash: false,
  targets: { ie: 11 },
  plugins,
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
