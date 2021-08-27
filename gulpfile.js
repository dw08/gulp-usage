const { task, src, dest, series, parallel, watch } = require("gulp"),
      // 处理scss文件
      sass = require("gulp-sass")(require("sass")),
      // 处理js文件
      babel = require("gulp-babel"),
      // 清除文件
      del = require("del"),
      // 插入js css文件到html中
      inject = require("gulp-inject"),
      jsImport = require("gulp-js-import"),
      // 建立静态资源服务
      connect = require("gulp-connect");


/**
 * 静态服务器
 */
task("server", (done) => {
  connect.server({
    root: ["./", "dist"], // 启动目录
    livereload: true, //自动更新
    port: 9000, //端口
  });
  done();
});

task("sass", () => {
  // 1.找到src/styles下所有的scss结尾的文件
  // 2.对其经过sass处理
  // 3.输出到dist/css文件夹下
  return src("./src/styles/*.scss").pipe(sass()).pipe(dest("./dist/css")).pipe(connect.reload());
})

task("js", () => {
  // 1.找到src/js下所有的js结尾的文件
  // 2.经过gulp-js-import插件编译
  // 3.对其经过babel处理
  // 4.输出到dist/js文件夹下
  return src("./src/js/*.js").pipe(jsImport()).pipe(babel({
    presets: ["@babel/preset-env"]
  })).pipe(dest("./dist/js")).pipe(connect.reload());
})

task("html", () => {
  // 1.找到dist下的js和css资源
  // 2.注入js和css到html中
  // 3.找到/src目录下的index.html
  const sources = src(["./dist/js/*.js", "./dist/css/*.css"]);
  return src("./src/index.html").pipe(inject(sources)).pipe(dest("./dist")).pipe(connect.reload())
})

// 清空dist
task("clean", (done) => {
 del["dist"]
 done()
})

// 监听文件变化
task("watchChange", (done) => {
  // 检测js文件改动，执行js任务
  watch("./src/js/*.js", series("js"));
  // 检测scss文件改动，执行sass任务
  watch("./src/styles/*.scss", series("sass"));
  // 检测index.html文件改动，执行html任务
  watch("./src/index.html", series("html"));
  done()
})

// 开发
task("dev", series("clean", "server", parallel("js", "sass", "html") ,"watchChange"));

