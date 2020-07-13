const fs = require("fs");
const path = require("path");
const tar = require("tar");
const pkg = require("../package");
const umirc = require("../.umirc");

const distName = `${pkg.name}.tar.gz`;

const outputPath = path.resolve(process.cwd(), umirc.outputPath || "./dist");

const cwd = process.cwd();

/* 创建发布目录 */
const publishDir = path.resolve(cwd, "publish");
if (!fs.existsSync(publishDir)) {
  fs.mkdirSync(publishDir);
}

tar.c(
  { gzip: true, cwd: outputPath },
  fs.readdirSync(outputPath),
).pipe(fs.createWriteStream(distName)).on("finish", () => {
  // eslint-disable-next-line no-console
  console.log(`打包完成，请查看项目publish目录下的 ${distName}`);
});


/* 复制nginx配置 */
const nginxPath = path.resolve(__dirname, "publish/nginx.conf");
if (fs.existsSync(nginxPath)) {
  fs.copyFileSync(nginxPath, path.resolve(publishDir, "nginx.conf"));
} else {
  console.warn("[Warn]未能复制nginx.conf");
}

/* 生成Dockerfile */
const dockerTemplatePath = path.resolve(__dirname, "publish/Dockerfile.template");
if (fs.existsSync(dockerTemplatePath)) {
  const fileContent = fs.readFileSync(dockerTemplatePath);
  fs.writeFileSync(path.resolve(publishDir, "Dockerfile"), fileContent.toString().replace(/@distName/g, distName));
} else {
  console.warn("[Warn]未能生成Dockerfile");
}

/* 生成启动脚本 */
const startupShellPath = path.resolve(__dirname, "publish/startup-docker-container.sh.template");
if (fs.existsSync(startupShellPath)) {
  const fileContent = fs.readFileSync(startupShellPath);
  fs.writeFileSync(path.resolve(publishDir, "startup-docker-container.sh"), fileContent.toString().replace(/@projName/g, pkg.name));
} else {
  console.warn("[Warn]未能生成Dockerfile");
}
