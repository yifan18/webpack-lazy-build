const fs = require("fs");
const Koa = require("koa");
const static = require("koa-static");
const path = require("path");
const chalk = require("chalk");
const pack = require("../pack");
const webpackConfig = require("../pack/webpack.config");
const app = new Koa();
const port = process.env.PORT || 4444;

function basePath(base) {
  return function(...appends) {
    return path.resolve.apply(null, [__dirname, base, ...appends]);
  };
}
const paths = {
  public: path.resolve(__dirname, "..", "public"),
  tempalte: path.resolve(__dirname, "template")
};

console.log("building...");
pack(webpackConfig, function() {
  console.log("build completed.");

  app.use(static(paths.public));
  app.use(async function(ctx, next) {
    console.log("visit ==> ", `"${ctx.path}"`);

    ctx.res.statusCode = 200;

    const moduleKey = ctx.path.slice(1);
    if (~["blog", "about"].indexOf(moduleKey)) {

      const htmlStream = await fs.readFileSync(path.resolve(paths.tempalte, "loading.html"));
      ctx.res.write(htmlStream.toString().replace('</body>', '').replace('</html>', ''));
      // ctx.res.write(htmlStream.slice(0, -14));

      await new Promise(resolve => setTimeout(resolve, 1e3))
      await new Promise(resolve => {
        console.log(`packing module [${chalk.yellow(moduleKey)}].`);
        pack({ ...webpackConfig, entry: { [moduleKey]: `./src/${moduleKey}` } }, function() {
          console.log(`module [${chalk.yellow(moduleKey)}] ${chalk.green(`builded`)}.`);
          ctx.res.write(`<script src='./js/${moduleKey}.js'></script><script>initPage('${moduleKey}')</script>`);
          resolve()
        });
      });
      ctx.res.write(`</body></html>`);
      ctx.res.end();
    } else {
      // home or others
      const htmlStream = await fs.readFileSync(path.resolve(paths.tempalte, "index.html"));
      ctx.res.write(htmlStream.toString().replace('</body>', '').replace('</html>', ''));
      ctx.res.write(`<script src='./js/index.js'></script>`);
      ctx.res.write(`</body></html>`);
      ctx.res.end();
    }
  });

  app.listen(port);
  console.log(`Serving on ${port}!`);
});
